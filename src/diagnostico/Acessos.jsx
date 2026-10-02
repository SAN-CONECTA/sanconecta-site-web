import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import { errMsg, fmtTs, isEmail, normEmail } from './util'

const SITE_URL = 'https://sanconecta.com/diagnostico360/'

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true, () => false)
  }
  return Promise.resolve(false)
}

function DadosEmpresa({ emp, email }) {
  const [f, setF] = useState({
    nome: emp.nome || '',
    cnpj: emp.cnpj || '',
    responsavel: emp.responsavel || '',
    inicio: emp.inicio || '',
    prazo: emp.prazo || '',
    arquivada: !!emp.arquivada,
  })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  async function save(e) {
    e.preventDefault()
    if (f.nome.trim().length < 2) return setMsg({ kind: 'err', text: 'Informe o nome da empresa.' })
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      await updateDoc(doc(db, 'empresas', emp.id), {
        nome: f.nome.trim(),
        cnpj: f.cnpj.trim(),
        responsavel: f.responsavel.trim(),
        inicio: f.inicio,
        prazo: f.prazo,
        arquivada: f.arquivada,
        atualizadoEm: serverTimestamp(),
        atualizadoPor: email,
      })
      setMsg({ kind: 'ok', text: 'Dados da empresa salvos.' })
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="dg-card">
      <h2>Dados da empresa</h2>
      <form onSubmit={save}>
        <div className="dg-two">
          <label className="dg-fld">
            <span>Nome</span>
            <input value={f.nome} onChange={set('nome')} maxLength={120} />
          </label>
          <label className="dg-fld">
            <span>CNPJ</span>
            <input value={f.cnpj} onChange={set('cnpj')} maxLength={20} />
          </label>
        </div>
        <div className="dg-two">
          <label className="dg-fld">
            <span>Responsável SAN pelo diagnóstico</span>
            <input value={f.responsavel} onChange={set('responsavel')} maxLength={120} />
          </label>
          <div className="dg-two">
            <label className="dg-fld">
              <span>Início</span>
              <input type="date" value={f.inicio} onChange={set('inicio')} />
            </label>
            <label className="dg-fld">
              <span>Prazo final</span>
              <input type="date" value={f.prazo} onChange={set('prazo')} />
            </label>
          </div>
        </div>
        <label className="dg-check">
          <input type="checkbox" checked={f.arquivada} onChange={(e) => setF((x) => ({ ...x, arquivada: e.target.checked }))} />
          Arquivar esta empresa (some da lista, os dados ficam guardados)
        </label>
        {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
        <div className="dg-actions">
          <button className="dg-btn dg-primary" type="submit" disabled={busy}>{busy ? 'Salvando…' : 'Salvar dados'}</button>
        </div>
      </form>
    </section>
  )
}

function Usuarios({ emp, email }) {
  const [membros, setMembros] = useState(null)
  const [novo, setNovo] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })
  const [convite, setConvite] = useState('')
  const [confirmDel, setConfirmDel] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'membros'), where('empresaId', '==', emp.id))
    return onSnapshot(
      q,
      (s) => setMembros(s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => a.email.localeCompare(b.email))),
      (er) => {
        setMembros([])
        setMsg({ kind: 'err', text: errMsg(er) })
      },
    )
  }, [emp.id])

  // Clientes têm sempre perfil de leitura. Só a equipe SAN edita.
  const grava = (mail) =>
    setDoc(doc(db, 'membros', `${emp.id}__${mail}`), {
      empresaId: emp.id,
      email: mail,
      role: 'leitura',
      atualizadoEm: serverTimestamp(),
      atualizadoPor: email,
    })

  async function add(e) {
    e.preventDefault()
    const mail = normEmail(novo)
    if (!isEmail(mail)) return setMsg({ kind: 'err', text: 'Informe um e-mail válido.' })
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      await grava(mail)
      setNovo('')
      setConvite(
        `Olá! A SAN Conecta liberou o seu acesso de consulta ao Diagnóstico 360° de TI da ${emp.nome}.\n` +
          `1. Abra ${SITE_URL}\n2. Escolha Criar conta e use este e-mail: ${mail}\n3. Confirme o e-mail pelo link que você vai receber e entre.`,
      )
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
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
    const ok = await copyText(convite)
    setMsg({ kind: ok ? 'ok' : 'err', text: ok ? 'Mensagem copiada.' : 'Não foi possível copiar. Selecione o texto e copie.' })
  }

  return (
    <section className="dg-card">
      <h2>Usuários desta empresa</h2>
      <p className="dg-muted">
        Só quem está nesta lista enxerga os dados da empresa, e apenas para consultar. Quem edita os itens é a equipe SAN,
        que acessa todas as empresas.
      </p>
      <form onSubmit={add} className="dg-addrow">
        <label className="dg-fld">
          <span>E-mail do usuário (acesso de leitura)</span>
          <input type="email" value={novo} onChange={(e) => setNovo(e.target.value)} />
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
        <div className="dg-empty">Nenhum usuário liberado ainda. Informe o e-mail acima para dar o primeiro acesso.</div>
      ) : (
        <div className="dg-tblwrap">
          <table>
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Atualizado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {membros.map((m) => (
                <tr key={m.id}>
                  <td>{m.email}</td>
                  <td>Leitura</td>
                  <td className="dg-small dg-muted">{fmtTs(m.atualizadoEm)}</td>
                  <td>
                    {confirmDel === m.id ? (
                      <>
                        <button type="button" className="dg-btn dg-danger" onClick={() => remove(m)}>Confirmar</button>{' '}
                        <button type="button" className="dg-btn" onClick={() => setConfirmDel('')}>Cancelar</button>
                      </>
                    ) : (
                      <button type="button" className="dg-btn" onClick={() => setConfirmDel(m.id)}>Remover</button>
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

export default function Acessos({ emp, staff, email }) {
  if (!staff) {
    return (
      <section className="dg-card">
        <h2>Seu acesso</h2>
        <p>
          Perfil nesta empresa: <strong>Leitura</strong>.
        </p>
        <p className="dg-muted">
          Somente a SAN Conecta libera ou remove usuários e preenche os dados da empresa. Para incluir outra pessoa, peça à
          SAN.
        </p>
      </section>
    )
  }
  return (
    <>
      <DadosEmpresa emp={emp} email={email} />
      <Usuarios emp={emp} email={email} />
    </>
  )
}
