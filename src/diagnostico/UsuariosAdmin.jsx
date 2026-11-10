import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, onSnapshot, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { errMsg, fmtTs, isEmail, normEmail } from './util'

const SITE_URL = 'https://sanconecta.com/diagnostico360/'

function conviteTexto(nomeEmpresa, mail) {
  return (
    `Olá! A SAN Conecta liberou o seu acesso de consulta ao Diagnóstico 360° da ${nomeEmpresa}.\n` +
    `1. Abra ${SITE_URL}\n2. Escolha Criar conta e use este e-mail: ${mail}\n3. Confirme o e-mail pelo link que você vai receber e entre.`
  )
}

function AcessosClientes({ email }) {
  const [membros, setMembros] = useState(null)
  const [empresas, setEmpresas] = useState([])
  const [novo, setNovo] = useState({ email: '', empresa: '' })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })
  const [convite, setConvite] = useState('')
  const [edit, setEdit] = useState({ id: '', empresa: '' })
  const [confirmDel, setConfirmDel] = useState('')

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

  const dadosMembro = (empresaId, mail) => ({
    empresaId,
    email: mail,
    role: 'leitura',
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
      await setDoc(doc(db, 'membros', `${novo.empresa}__${mail}`), dadosMembro(novo.empresa, mail))
      setConvite(conviteTexto(nomeDe(novo.empresa), mail))
      setNovo((n) => ({ ...n, email: '' }))
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
    }
  }

  // O id do vínculo contém a empresa: mudar de empresa = criar o novo vínculo e apagar o antigo.
  async function mover(m) {
    if (!edit.empresa || edit.empresa === m.empresaId) return setEdit({ id: '', empresa: '' })
    setMsg({ kind: '', text: '' })
    try {
      const batch = writeBatch(db)
      batch.set(doc(db, 'membros', `${edit.empresa}__${m.email}`), dadosMembro(edit.empresa, m.email))
      batch.delete(doc(db, 'membros', m.id))
      await batch.commit()
      setEdit({ id: '', empresa: '' })
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
        A pessoa cria a própria conta e senha na tela de login, usando o e-mail liberado aqui. Remover tira o acesso aos dados;
        a conta de login continua existindo e só o console do Firebase (Authentication) a apaga. Para trocar o e-mail de
        alguém, libere o novo e remova o antigo.
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
                <th>Atualizado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {membros.map((m) => (
                <tr key={m.id}>
                  <td>{m.email}</td>
                  <td>
                    {edit.id === m.id ? (
                      <select aria-label="Nova empresa" value={edit.empresa} onChange={(e) => setEdit({ id: m.id, empresa: e.target.value })}>
                        {ativas.map((e) => (
                          <option key={e.id} value={e.id}>{e.nome}</option>
                        ))}
                      </select>
                    ) : (
                      nomeDe(m.empresaId)
                    )}
                  </td>
                  <td className="dg-small dg-muted">{fmtTs(m.atualizadoEm)}</td>
                  <td>
                    {edit.id === m.id ? (
                      <>
                        <button type="button" className="dg-btn dg-primary" onClick={() => mover(m)}>Salvar</button>{' '}
                        <button type="button" className="dg-btn" onClick={() => setEdit({ id: '', empresa: '' })}>Cancelar</button>
                      </>
                    ) : confirmDel === m.id ? (
                      <>
                        <button type="button" className="dg-btn dg-danger" onClick={() => remove(m)}>Confirmar</button>{' '}
                        <button type="button" className="dg-btn" onClick={() => setConfirmDel('')}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="dg-btn" onClick={() => setEdit({ id: m.id, empresa: m.empresaId })}>Alterar empresa</button>{' '}
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
                <button type="button" className="dg-btn" onClick={() => setConfirmDel(s.id)}>Remover</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function UsuariosAdmin({ email }) {
  return (
    <div>
      <div className="dg-ehead">
        <h1>Usuários</h1>
      </div>
      <AcessosClientes email={email} />
      <EquipeSan email={email} />
    </div>
  )
}
