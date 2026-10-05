import { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import { errMsg, fmtD, fmtTs, go, isEmail, normEmail } from './util'

function NovaEmpresa({ email, onCreated }) {
  const [f, setF] = useState({ nome: '', cnpj: '', responsavel: '', inicio: '', prazo: '' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  async function create(e) {
    e.preventDefault()
    if (f.nome.trim().length < 2) return setErr('Informe o nome da empresa.')
    setBusy(true)
    setErr('')
    try {
      const ref = await addDoc(collection(db, 'empresas'), {
        nome: f.nome.trim(),
        cnpj: f.cnpj.trim(),
        responsavel: f.responsavel.trim(),
        inicio: f.inicio,
        prazo: f.prazo,
        arquivada: false,
        criadoEm: serverTimestamp(),
        criadoPor: email,
      })
      onCreated(ref.id)
    } catch (er) {
      setErr(errMsg(er))
      setBusy(false)
    }
  }

  return (
    <section className="dg-card">
      <h2>Nova empresa cliente</h2>
      <form onSubmit={create}>
        <div className="dg-two">
          <label className="dg-fld">
            <span>Nome da empresa</span>
            <input value={f.nome} onChange={set('nome')} maxLength={120} />
          </label>
          <label className="dg-fld">
            <span>CNPJ</span>
            <input value={f.cnpj} onChange={set('cnpj')} maxLength={20} />
          </label>
        </div>
        <div className="dg-two">
          <label className="dg-fld">
            <span>Responsável SAN</span>
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
        {err && <p className="dg-err" role="alert">{err}</p>}
        <div className="dg-actions">
          <button className="dg-btn dg-primary" type="submit" disabled={busy}>{busy ? 'Criando…' : 'Criar e liberar usuários'}</button>
        </div>
      </form>
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

export default function Empresas({ session }) {
  const { user, staff } = session
  const email = normEmail(user.email)
  const [state, setState] = useState({ loading: true, list: [], error: '' })
  const [showArch, setShowArch] = useState(false)

  useEffect(() => {
    let off = false
    async function load() {
      try {
        let list = []
        if (staff) {
          const s = await getDocs(collection(db, 'empresas'))
          list = s.docs.map((d) => ({ id: d.id, ...d.data() }))
        } else {
          const m = await getDocs(query(collection(db, 'membros'), where('email', '==', email)))
          const rows = await Promise.all(
            m.docs.map(async (x) => {
              const e = await getDoc(doc(db, 'empresas', x.data().empresaId))
              return e.exists() ? { id: e.id, ...e.data(), papel: x.data().role } : null
            }),
          )
          list = rows.filter(Boolean)
        }
        list.sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR'))
        if (!off) setState({ loading: false, list, error: '' })
      } catch (er) {
        if (!off) setState({ loading: false, list: [], error: errMsg(er) })
      }
    }
    load()
    return () => {
      off = true
    }
  }, [staff, email])

  const visiveis = state.list.filter((e) => showArch || !e.arquivada)

  return (
    <div>
      <h1>Empresas</h1>
      {state.loading && <p className="dg-muted">Carregando…</p>}
      {state.error && <p className="dg-err" role="alert">{state.error}</p>}
      {!state.loading && !state.error && !visiveis.length && (
        <div className="dg-empty">
          {staff
            ? 'Nenhuma empresa cadastrada. Crie a primeira abaixo.'
            : `O e-mail ${email} ainda não foi vinculado a nenhuma empresa. Peça à SAN Conecta para liberar o seu acesso com este e-mail.`}
        </div>
      )}
      <div className="dg-cards">
        {visiveis.map((e) => (
          <button type="button" key={e.id} className="dg-company" onClick={() => go(`/e/${e.id}/painel`)}>
            <strong>{e.nome}</strong>
            <span className="dg-muted dg-small">
              {e.cnpj ? `CNPJ ${e.cnpj}` : 'CNPJ não informado'}
              {e.prazo ? ` · prazo ${fmtD(e.prazo)}` : ''}
              {e.arquivada ? ' · arquivada' : ''}
            </span>
            {!staff && <span className="dg-pill">Leitura</span>}
          </button>
        ))}
      </div>
      {staff && (
        <>
          <label className="dg-check">
            <input type="checkbox" checked={showArch} onChange={(e) => setShowArch(e.target.checked)} />
            Mostrar empresas arquivadas
          </label>
          <NovaEmpresa email={email} onCreated={(id) => go(`/e/${id}/acessos`)} />
          <EquipeSan email={email} />
        </>
      )}
    </div>
  )
}
