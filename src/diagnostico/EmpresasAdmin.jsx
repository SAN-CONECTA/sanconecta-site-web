import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, where, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { DadosEmpresa } from './Acessos'
import { exportCsv } from './exportCsv'
import { errMsg, fmtD, go } from './util'

function NovaEmpresa({ email, onCreated, onCancel }) {
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
          <button className="dg-btn" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </section>
  )
}

// O Firestore limita as consultas de regras por lote (20 acessos a outros documentos): apaga em lotes pequenos,
// com a empresa por último. Se a rede cair no meio, a empresa continua arquivada e dá para repetir a exclusão.
const LOTE = 8

async function excluirEmpresa(emp) {
  const itens = await getDocs(collection(db, 'empresas', emp.id, 'itens'))
  const membros = await getDocs(query(collection(db, 'membros'), where('empresaId', '==', emp.id)))
  const refs = [...itens.docs.map((d) => d.ref), ...membros.docs.map((d) => d.ref), doc(db, 'empresas', emp.id)]
  for (let i = 0; i < refs.length; i += LOTE) {
    const batch = writeBatch(db)
    refs.slice(i, i + LOTE).forEach((r) => batch.delete(r))
    await batch.commit()
  }
}

function ExcluirEmpresa({ emp, onClose }) {
  const [txt, setTxt] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const confere = txt.trim().toLowerCase() === String(emp.nome).trim().toLowerCase()

  async function baixaCsv() {
    setErr('')
    try {
      const s = await getDocs(collection(db, 'empresas', emp.id, 'itens'))
      const m = {}
      s.docs.forEach((d) => {
        m[d.id] = d.data()
      })
      exportCsv(emp, m)
    } catch (er) {
      setErr(errMsg(er))
    }
  }

  async function apagar() {
    if (!confere) return
    setBusy(true)
    setErr('')
    try {
      await excluirEmpresa(emp)
      onClose()
    } catch (er) {
      setErr(errMsg(er))
      setBusy(false)
    }
  }

  return (
    <div className="dg-note dg-warn">
      <p>
        <strong>Excluir definitivamente {emp.nome}?</strong> Isso apaga a empresa, todos os 31 itens preenchidos e os acessos
        dos clientes. Não há como desfazer e não existe cópia de segurança automática.
      </p>
      <p>
        <button type="button" className="dg-btn" onClick={baixaCsv}>Baixar o CSV desta empresa antes</button>
      </p>
      <label className="dg-fld">
        <span>Para confirmar, digite o nome da empresa</span>
        <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder={emp.nome} />
      </label>
      {err && <p className="dg-err" role="alert">{err}</p>}
      <div className="dg-actions">
        <button type="button" className="dg-btn dg-danger" disabled={!confere || busy} onClick={apagar}>
          {busy ? 'Excluindo…' : 'Excluir definitivamente'}
        </button>
        <button type="button" className="dg-btn" onClick={onClose} disabled={busy}>Cancelar</button>
      </div>
    </div>
  )
}

export default function EmpresasAdmin({ email }) {
  const [state, setState] = useState({ loading: true, list: [], error: '' })
  const [showArch, setShowArch] = useState(false)
  const [novo, setNovo] = useState(false)
  const [edit, setEdit] = useState('')
  const [del, setDel] = useState('')

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'empresas'),
        (s) =>
          setState({
            loading: false,
            error: '',
            list: s.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR')),
          }),
        (er) => setState({ loading: false, list: [], error: errMsg(er) }),
      ),
    [],
  )

  const visiveis = state.list.filter((e) => showArch || !e.arquivada)

  return (
    <div>
      <div className="dg-ehead">
        <h1>Empresas</h1>
        <button type="button" className="dg-btn dg-primary" onClick={() => setNovo((v) => !v)}>
          {novo ? 'Fechar formulário' : 'Nova empresa'}
        </button>
      </div>

      {novo && <NovaEmpresa email={email} onCreated={(id) => go(`/e/${id}/acessos`)} onCancel={() => setNovo(false)} />}

      {state.loading && <p className="dg-muted">Carregando…</p>}
      {state.error && <p className="dg-err" role="alert">{state.error}</p>}
      {!state.loading && !state.error && !visiveis.length && (
        <div className="dg-empty">Nenhuma empresa cadastrada. Use “Nova empresa”.</div>
      )}

      {visiveis.map((e) => (
        <section className="dg-card" key={e.id}>
          <div className="dg-erow">
            <div>
              <strong>{e.nome}</strong>
              <p className="dg-muted dg-small">
                {e.cnpj ? `CNPJ ${e.cnpj}` : 'CNPJ não informado'}
                {e.prazo ? ` · prazo ${fmtD(e.prazo)}` : ''}
                {e.responsavel ? ` · ${e.responsavel}` : ''}
                {e.arquivada ? ' · arquivada' : ''}
              </p>
            </div>
            <div className="dg-erow-act">
              <button type="button" className="dg-btn dg-primary" onClick={() => go(`/e/${e.id}/painel`)}>Abrir</button>
              <button type="button" className="dg-btn" onClick={() => setEdit(edit === e.id ? '' : e.id)}>
                {edit === e.id ? 'Fechar edição' : 'Editar'}
              </button>
              {e.arquivada && (
                <button type="button" className="dg-btn dg-danger" onClick={() => setDel(del === e.id ? '' : e.id)}>Excluir</button>
              )}
            </div>
          </div>
          {edit === e.id && <DadosEmpresa key={`${e.id}-${e.atualizadoEm ? e.atualizadoEm.seconds : 0}`} emp={e} email={email} />}
          {del === e.id && e.arquivada && <ExcluirEmpresa emp={e} onClose={() => setDel('')} />}
          {!e.arquivada && (
            <p className="dg-muted dg-small">Para excluir, primeiro arquive a empresa em “Editar”.</p>
          )}
        </section>
      ))}

      <label className="dg-check">
        <input type="checkbox" checked={showArch} onChange={(e) => setShowArch(e.target.checked)} />
        Mostrar empresas arquivadas
      </label>
    </div>
  )
}
