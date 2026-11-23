import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, onSnapshot, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { errMsg, fmtTs, isEmail, normEmail, PERFIS, perfilLabel } from './util'
import { enviarEmailAcesso } from './convite'
import { ONLINE_MS } from './presenca'

const SITE_URL = 'https://sanconecta.com/diagnostico360/'

const TELAS = {
  painel: 'Painel',
  ti: 'Maturidade de TI',
  al: 'Alinhamento TI e negócio',
  ge: 'Gestão empresarial',
  gemi: 'Fase Inicial',
  sim: 'Simulação Prejuízo',
  acessos: 'Empresa e acessos',
  log: 'Log',
  empresas: 'Lista de empresas',
  usuarios: 'Usuários',
}

function haQuanto(ms) {
  const m = Math.floor(ms / 60000)
  if (m < 1) return 'agora há pouco'
  if (m < 60) return `há ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `há ${h} h`
  return `há ${Math.floor(h / 24)} d`
}

// Lê presenca/ (só a equipe SAN lê) e devolve { email: { online, quando, onde } }; atualiza a cada 30 s para o "online" expirar.
function usePresencas() {
  const [docs, setDocs] = useState(null)
  const [empresas, setEmpresas] = useState({})
  const [agora, setAgora] = useState(() => Date.now())
  useEffect(() => {
    const offP = onSnapshot(collection(db, 'presenca'), (s) => setDocs(s.docs.map((d) => ({ id: d.id, ...d.data() }))), () => setDocs([]))
    const offE = onSnapshot(collection(db, 'empresas'), (s) => setEmpresas(Object.fromEntries(s.docs.map((d) => [d.id, d.data().nome || d.id]))), () => {})
    const t = setInterval(() => setAgora(Date.now()), 30000)
    return () => {
      offP()
      offE()
      clearInterval(t)
    }
  }, [])
  const mapa = {}
  ;(docs || []).forEach((p) => {
    const ms = p.visto && p.visto.toMillis ? p.visto.toMillis() : 0
    if (!ms) return
    const onde = [p.empresaId ? empresas[p.empresaId] || 'empresa' : '', TELAS[p.tela] || p.tela].filter(Boolean).join(' · ')
    mapa[p.id] = { online: agora - ms < ONLINE_MS, quando: haQuanto(agora - ms), ms, onde, nome: p.nome || '' }
  })
  return { mapa, carregando: docs === null }
}

function Status({ p }) {
  if (!p) return <span className="dg-small dg-muted">nunca entrou</span>
  return (
    <span className={`dg-small ${p.online ? 'dg-on' : 'dg-muted'}`}>
      <span className={`dg-dot${p.online ? ' on' : ''}`} aria-hidden="true" />
      {p.online ? 'Online agora' : `Visto ${p.quando}`}
    </span>
  )
}

function Online({ mapa, carregando }) {
  const lista = Object.entries(mapa).sort((a, b) => b[1].ms - a[1].ms)
  const on = lista.filter(([, p]) => p.online)
  return (
    <section className="dg-card">
      <h2>Quem está usando o sistema</h2>
      <p className="dg-muted">
        Online = abriu a aba e mandou sinal nos últimos 3 minutos (o sinal é enviado a cada minuto, só com a aba visível). A
        lista atualiza sozinha; quem fecha a aba some em até 3 minutos.
      </p>
      {carregando ? (
        <p className="dg-muted">Carregando…</p>
      ) : !lista.length ? (
        <div className="dg-empty">Ninguém registrou acesso ainda. Os registros começam depois que cada pessoa abrir o sistema com a versão nova.</div>
      ) : (
        <>
          <p><b>{on.length}</b> online agora</p>
          <ul className="dg-staff">
            {lista.map(([mail, p]) => (
              <li key={mail}>
                <span>{p.nome ? `${p.nome} · ` : ''}{mail}</span>
                <span className="dg-small dg-muted">{p.online ? p.onde : ''}</span>
                <Status p={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

function conviteTexto(nomeEmpresa, mail) {
  return (
    `Olá! A SAN Conecta liberou o seu acesso de consulta ao Diagnóstico 360° da ${nomeEmpresa}.\n` +
    `1. Abra ${SITE_URL}\n2. Escolha Criar conta e use este e-mail: ${mail}\n3. Confirme o e-mail pelo link que você vai receber e entre.`
  )
}

async function enviaAcesso(mail, setMsg, setEnv) {
  setEnv(mail)
  setMsg({ kind: '', text: '' })
  try {
    const criada = await enviarEmailAcesso(mail)
    setMsg({
      kind: 'ok',
      text: `${criada ? 'Conta criada e e-mail' : 'E-mail'} de acesso enviado para ${mail}. Peça para a pessoa abrir o link, definir a senha e olhar também o spam.`,
    })
  } catch (er) {
    setMsg({ kind: 'err', text: errMsg(er) })
  } finally {
    setEnv('')
  }
}

function AcessosClientes({ email }) {
  const [membros, setMembros] = useState(null)
  const [empresas, setEmpresas] = useState([])
  const [novo, setNovo] = useState({ email: '', empresa: '', role: 'leitura', simulacao: false })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })
  const [convite, setConvite] = useState('')
  const [edit, setEdit] = useState({ id: '', empresa: '', email: '', role: 'leitura', simulacao: false })
  const fechaEdit = () => setEdit({ id: '', empresa: '', email: '', role: 'leitura', simulacao: false })
  const [confirmDel, setConfirmDel] = useState('')
  const [env, setEnv] = useState('')

  useEffect(() => {
    const offM = onSnapshot(
      collection(db, 'membros'),
      (s) => setMembros(s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => a.email.localeCompare(b.email))),
      (er) => {
        setMembros([])
        setMsg({ kind: 'err', text: errMsg(er) })
      },
    )
    const offE = onSnapshot(
      collection(db, 'empresas'),
      (s) =>
        setEmpresas(
          s.docs
            .map((d) => ({ id: d.id, nome: d.data().nome || d.id, arquivada: !!d.data().arquivada }))
            .sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR')),
        ),
      () => setEmpresas([]),
    )
    return () => {
      offM()
      offE()
    }
  }, [])

  const nomeDe = (id) => (empresas.find((e) => e.id === id) || {}).nome || 'empresa removida'
  const ativas = empresas.filter((e) => !e.arquivada)

  const dadosMembro = (empresaId, mail, role, simulacao) => ({
    empresaId,
    email: mail,
    role,
    simulacao: !!simulacao,
    atualizadoEm: serverTimestamp(),
    atualizadoPor: email,
  })

  async function add(e) {
    e.preventDefault()
    const mail = normEmail(novo.email)
    if (!isEmail(mail)) return setMsg({ kind: 'err', text: 'Informe um e-mail válido.' })
    if (!novo.empresa) return setMsg({ kind: 'err', text: 'Escolha a empresa.' })
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      await setDoc(doc(db, 'membros', `${novo.empresa}__${mail}`), dadosMembro(novo.empresa, mail, novo.role, novo.simulacao))
      setConvite(conviteTexto(nomeDe(novo.empresa), mail))
      setNovo((n) => ({ ...n, email: '' }))
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
    }
  }

  // O id do vínculo contém empresa e e-mail: mudar um deles = criar o novo vínculo e apagar o antigo.
  async function salvar(m) {
    const mail = normEmail(edit.email)
    if (!isEmail(mail)) return setMsg({ kind: 'err', text: 'Informe um e-mail válido.' })
    if (!edit.empresa) return setMsg({ kind: 'err', text: 'Escolha a empresa.' })
    setMsg({ kind: '', text: '' })
    try {
      const novoId = `${edit.empresa}__${mail}`
      const batch = writeBatch(db)
      batch.set(doc(db, 'membros', novoId), dadosMembro(edit.empresa, mail, edit.role, edit.simulacao))
      if (novoId !== m.id) batch.delete(doc(db, 'membros', m.id))
      await batch.commit()
      if (mail !== m.email) setConvite(conviteTexto(nomeDe(edit.empresa), mail))
      fechaEdit()
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    }
  }

  async function remove(m) {
    setMsg({ kind: '', text: '' })
    try {
      await deleteDoc(doc(db, 'membros', m.id))
      setConfirmDel('')
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    }
  }

  async function copia() {
    const ok = await navigator.clipboard.writeText(convite).then(() => true, () => false)
    setMsg({ kind: ok ? 'ok' : 'err', text: ok ? 'Mensagem copiada.' : 'Não foi possível copiar. Selecione o texto e copie.' })
  }

  return (
    <section className="dg-card">
      <h2>Clientes com acesso à empresa</h2>
      <p className="dg-muted">
        A pessoa recebe o e-mail de acesso (botão Enviar e-mail de acesso) ou cria a própria conta na tela de login, usando o e-mail liberado aqui. Remover tira o acesso aos dados;
        a conta de login continua existindo e só o console do Firebase (Authentication) a apaga. Para trocar o e-mail de
        alguém, use Editar (o e-mail novo precisa criar a própria conta). "Pode responder" permite preencher respostas e a
        situação da evidência; "Somente visualizar" só consulta. A Simulação Prejuízo tem dados financeiros e fica oculta ao cliente, a menos que você marque "Ver Simulação Prejuízo" (só leitura).
      </p>
      <form onSubmit={add} className="dg-addrow">
        <label className="dg-fld">
          <span>E-mail do cliente</span>
          <input type="email" value={novo.email} onChange={(e) => setNovo((n) => ({ ...n, email: e.target.value }))} />
        </label>
        <label className="dg-fld">
          <span>Empresa</span>
          <select value={novo.empresa} onChange={(e) => setNovo((n) => ({ ...n, empresa: e.target.value }))}>
            <option value="">Escolha…</option>
            {ativas.map((e) => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>
        </label>
        <label className="dg-fld">
          <span>Perfil</span>
          <select value={novo.role} onChange={(e) => setNovo((n) => ({ ...n, role: e.target.value }))}>
            {PERFIS.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </label>
        <label className="dg-fld dg-chk">
          <input type="checkbox" checked={novo.simulacao} onChange={(e) => setNovo((n) => ({ ...n, simulacao: e.target.checked }))} />
          <span>Ver Simulação Prejuízo</span>
        </label>
        <button className="dg-btn dg-primary" type="submit" disabled={busy}>Liberar acesso</button>
      </form>
      {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
      {convite && (
        <div className="dg-note">
          <p className="dg-small dg-muted">Envie esta mensagem à pessoa (o sistema não envia e-mail de convite):</p>
          <pre className="dg-pre">{convite}</pre>
          <button type="button" className="dg-btn" onClick={copia}>Copiar mensagem</button>
        </div>
      )}
      {membros === null ? (
        <p className="dg-muted">Carregando…</p>
      ) : !membros.length ? (
        <div className="dg-empty">Nenhum cliente liberado ainda.</div>
      ) : (
        <div className="dg-tblwrap">
          <table>
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Empresa</th>
                <th>Perfil</th>
                <th>Simulação</th>
                <th>Atualizado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {membros.map((m) => (
                <tr key={m.id}>
                  <td>
                    {edit.id === m.id ? (
                      <input type="email" aria-label="E-mail" value={edit.email} onChange={(e) => setEdit((x) => ({ ...x, email: e.target.value }))} />
                    ) : (
                      m.email
                    )}
                  </td>
                  <td>
                    {edit.id === m.id ? (
                      <select aria-label="Empresa" value={edit.empresa} onChange={(e) => setEdit((x) => ({ ...x, empresa: e.target.value }))}>
                        {ativas.map((e) => (
                          <option key={e.id} value={e.id}>{e.nome}</option>
                        ))}
                      </select>
                    ) : (
                      nomeDe(m.empresaId)
                    )}
                  </td>
                  <td>
                    {edit.id === m.id ? (
                      <select aria-label="Perfil" value={edit.role} onChange={(e) => setEdit((x) => ({ ...x, role: e.target.value }))}>
                        {PERFIS.map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                      </select>
                    ) : (
                      perfilLabel(m.role)
                    )}
                  </td>
                  <td>
                    {edit.id === m.id ? (
                      <label className="dg-chk">
                        <input type="checkbox" checked={edit.simulacao} onChange={(e) => setEdit((x) => ({ ...x, simulacao: e.target.checked }))} />
                        <span>Pode ver</span>
                      </label>
                    ) : m.simulacao === true ? (
                      'Pode ver'
                    ) : (
                      'Oculta'
                    )}
                  </td>
                  <td className="dg-small dg-muted">{fmtTs(m.atualizadoEm)}</td>
                  <td>
                    {edit.id === m.id ? (
                      <>
                        <button type="button" className="dg-btn dg-primary" onClick={() => salvar(m)}>Salvar</button>{' '}
                        <button type="button" className="dg-btn" onClick={fechaEdit}>Cancelar</button>
                      </>
                    ) : confirmDel === m.id ? (
                      <>
                        <button type="button" className="dg-btn dg-danger" onClick={() => remove(m)}>Confirmar</button>{' '}
                        <button type="button" className="dg-btn" onClick={() => setConfirmDel('')}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="dg-btn" onClick={() => setEdit({ id: m.id, empresa: m.empresaId, email: m.email, role: m.role === 'visualizar' ? 'visualizar' : 'leitura', simulacao: m.simulacao === true })}>Editar</button>{' '}
                        <button type="button" className="dg-btn" disabled={env === m.email} onClick={() => enviaAcesso(m.email, setMsg, setEnv)}>
                          {env === m.email ? 'Enviando…' : 'Enviar e-mail de acesso'}
                        </button>{' '}
                        <button type="button" className="dg-btn" onClick={() => setConfirmDel(m.id)}>Remover acesso</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function EquipeSan({ email }) {
  const [lista, setLista] = useState(null)
  const [novo, setNovo] = useState('')
  const [msg, setMsg] = useState('')
  const [tick, setTick] = useState(0)
  const [confirmDel, setConfirmDel] = useState('')
  const [env, setEnv] = useState('')
  const [aviso, setAviso] = useState({ kind: '', text: '' })

  useEffect(() => {
    let off = false
    getDocs(collection(db, 'staff'))
      .then((s) => {
        if (!off) setLista(s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => a.id.localeCompare(b.id)))
      })
      .catch((er) => {
        if (!off) {
          setLista([])
          setMsg(errMsg(er))
        }
      })
    return () => {
      off = true
    }
  }, [tick])

  async function add(e) {
    e.preventDefault()
    const mail = normEmail(novo)
    if (!isEmail(mail)) return setMsg('Informe um e-mail válido.')
    setMsg('')
    try {
      await setDoc(doc(db, 'staff', mail), { email: mail, criadoEm: serverTimestamp(), criadoPor: email })
      setNovo('')
      setTick((t) => t + 1)
    } catch (er) {
      setMsg(errMsg(er))
    }
  }

  async function remove(id) {
    setMsg('')
    try {
      await deleteDoc(doc(db, 'staff', id))
      setConfirmDel('')
      setTick((t) => t + 1)
    } catch (er) {
      setMsg(errMsg(er))
    }
  }

  return (
    <section className="dg-card">
      <h2>Equipe SAN (administradores)</h2>
      <p className="dg-muted">
        Administradores da SAN veem todas as empresas, criam empresas e liberam usuários. Inclua só gente da equipe.
      </p>
      <form onSubmit={add} className="dg-addrow">
        <label className="dg-fld">
          <span>E-mail do administrador</span>
          <input type="email" value={novo} onChange={(e) => setNovo(e.target.value)} />
        </label>
        <button className="dg-btn dg-primary" type="submit">Adicionar</button>
      </form>
      {msg && <p className="dg-err" role="alert">{msg}</p>}
      {aviso.text && <p className={aviso.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{aviso.text}</p>}
      {lista === null ? (
        <p className="dg-muted">Carregando…</p>
      ) : (
        <ul className="dg-staff">
          {lista.map((s) => (
            <li key={s.id}>
              <span>{s.id}</span>
              <span className="dg-small dg-muted">{fmtTs(s.criadoEm)}</span>
              {s.id === email ? (
                <span className="dg-small dg-muted">você</span>
              ) : confirmDel === s.id ? (
                <span>
                  <button type="button" className="dg-btn dg-danger" onClick={() => remove(s.id)}>Confirmar</button>{' '}
                  <button type="button" className="dg-btn" onClick={() => setConfirmDel('')}>Cancelar</button>
                </span>
              ) : (
                <span>
                  <button type="button" className="dg-btn" disabled={env === s.id} onClick={() => enviaAcesso(s.id, setAviso, setEnv)}>
                    {env === s.id ? 'Enviando…' : 'Enviar e-mail de acesso'}
                  </button>{' '}
                  <button type="button" className="dg-btn" onClick={() => setConfirmDel(s.id)}>Remover</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function UsuariosAdmin({ email }) {
  const pres = usePresencas()
  return (
    <div>
      <div className="dg-ehead">
        <h1>Usuários</h1>
      </div>
      <Online mapa={pres.mapa} carregando={pres.carregando} />
      <AcessosClientes email={email} />
      <EquipeSan email={email} />
    </div>
  )
}
