import { useEffect, useState } from 'react'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { BLOCOS, RODADAS, blocosDe } from './catalog'
import { stats } from './calc'
import { go, normEmail } from './util'
import { exportCsv } from './exportCsv'
import Painel from './Painel'
import Rodada from './Rodada'
import Gemi from './Gemi'
import PainelGemi from './PainelGemi'
import Simulacao from './Simulacao'
import Acessos from './Acessos'
import Log from './Log'

const TABS = [
  ['painel', 'Painel'],
  ['gemi', 'Fase Inicial de Estudo'],
  ['ti', 'Maturidade de TI'],
  ['al', 'Alinhamento entre TI e negócio'],
  ['ge', 'Maturidade de gestão empresarial'],
  ['acessos', 'Empresa e acessos'],
  ['sim', 'Simulação Prejuízo'],
  ['log', 'Log de alterações'],
]
const NAV = TABS
// Endereços antigos (v1.7) continuam levando ao lugar certo.
const ANTIGAS = { gestao: 'ge', itens: 'painel' }
const SO_STAFF = ['log', 'sim']
const DO_RAPIDO = ['painel', 'gemi', 'sim', 'acessos', 'log']
const DO_COMPLETO = ['painel', 'ti', 'al', 'ge', 'sim', 'acessos', 'log']

const ICONS = {
  painel: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  ti: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  sim: <><path d="M12 2v20M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.6 7 6.5 9 9.4 12 10s5 1.4 5 3.5-2.2 3-5 3-5-1.1-5-3" /></>,
  gemi: <><path d="M13 2 3 14h9l-1 8 10-12h-9z" /></>,
  al: <><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></>,
  ge: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
  acessos: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  log: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" /></>,
  csv: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
}

function Icon({ k }) {
  return (
    <svg className="dg-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[k]}
    </svg>
  )
}

export default function Empresa({ id, tab, session }) {
  const { user, staff } = session
  const email = normEmail(user.email)
  const [emp, setEmp] = useState(undefined)
  const [itens, setItens] = useState(null)
  const [blocos, setBlocos] = useState(null)
  const [gemi, setGemi] = useState(null)
  const [sim, setSim] = useState(staff ? null : {})
  const [papel, setPapel] = useState(staff ? 'staff' : undefined)
  const [flt, setFlt] = useState({ s: '', r: '', q: '' })
  const [openId, setOpenId] = useState(null)
  const [lista, setLista] = useState([])

  useEffect(() => {
    if (!staff) return undefined
    return onSnapshot(
      collection(db, 'empresas'),
      (s) =>
        setLista(
          s.docs
            .map((d) => ({ id: d.id, nome: d.data().nome || d.id, arquivada: !!d.data().arquivada }))
            .sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR')),
        ),
      () => setLista([]),
    )
  }, [staff])

  useEffect(() => {
    const onErr = () => setEmp(null)
    const offEmp = onSnapshot(doc(db, 'empresas', id), (s) => setEmp(s.exists() ? { id: s.id, ...s.data() } : null), onErr)
    const mapa = (set) => (s) => {
      const m = {}
      s.docs.forEach((d) => {
        m[d.id] = d.data()
      })
      set(m)
    }
    const offItens = onSnapshot(collection(db, 'empresas', id, 'itens'), mapa(setItens), onErr)
    const offBlocos = onSnapshot(collection(db, 'empresas', id, 'blocos'), mapa(setBlocos), onErr)
    const offGemi = onSnapshot(collection(db, 'empresas', id, 'gemi'), mapa(setGemi), onErr)
    // A simulação (dados financeiros do cliente) só é lida pela equipe SAN.
    const offSim = staff ? onSnapshot(collection(db, 'empresas', id, 'simulacao'), mapa(setSim), onErr) : () => {}
    if (!staff) {
      getDoc(doc(db, 'membros', `${id}__${email}`))
        .then((s) => setPapel(s.exists() ? s.data().role : null))
        .catch(() => setPapel(null))
    }
    return () => {
      offEmp()
      offItens()
      offBlocos()
      offGemi()
      offSim()
    }
  }, [id, staff, email])

  const tabReal = ANTIGAS[tab] || tab
  const rapido = !!emp && emp.modo === 'rapido'
  const abas = rapido ? DO_RAPIDO : DO_COMPLETO
  const activeTab = abas.includes(tabReal) && (staff || !SO_STAFF.includes(tabReal)) ? tabReal : 'painel'
  const canEdit = staff
  // Cliente vinculado à empresa preenche respostas e situação da evidência (v1.7), exceto em empresa arquivada.
  const canAnswer = !!emp && (staff || (papel === 'leitura' && !emp.arquivada))

  if (emp === undefined || ((itens === null || blocos === null || gemi === null || sim === null) && emp !== null) || papel === undefined) {
    return <p className="dg-muted">Carregando empresa…</p>
  }
  if (emp === null || (!staff && !papel)) {
    return (
      <div className="dg-empty">
        Esta empresa não existe ou o seu e-mail não tem acesso a ela.{' '}
        <a href="#/">Voltar para a lista</a>
      </div>
    )
  }

  const openBloco = (blocoId) => {
    const b = BLOCOS.find((x) => x.id === blocoId)
    setFlt({ s: '', r: '', q: '' })
    setOpenId(blocoId)
    go(`/e/${id}/${b ? b.r : 'ti'}`)
  }
  const countOf = (k) => {
    if (!RODADAS.some((r) => r.k === k)) return null
    const s = stats(blocos, blocosDe(k))
    return `${s.st[3]}/${s.total}`
  }
  const opcoes = lista.filter((e) => !e.arquivada || e.id === id)

  return (
    <div className="dg-shell">
      <aside className="dg-side">
        <div className="dg-side-co">
          <span className="dg-side-label">Empresa</span>
          {staff && opcoes.length > 1 ? (
            <select aria-label="Trocar de empresa" value={id} onChange={(e) => go(`/e/${e.target.value}/${activeTab}`)}>
              {opcoes.map((e) => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>
          ) : (
            <strong>{emp.nome}</strong>
          )}
          <a className="dg-side-all" href="#/">← Todas as empresas</a>
        </div>
        <nav className="dg-nav" aria-label="Seções">
          {NAV.filter(([k]) => abas.includes(k) && (staff || !SO_STAFF.includes(k))).map(([k, l]) => (
            <button key={k} type="button" aria-current={activeTab === k ? 'page' : undefined} onClick={() => go(`/e/${id}/${k}`)}>
              <Icon k={k} />
              <span>{l}</span>
              {countOf(k) && <span className="dg-nav-n dg-mono" title="Blocos concluídos">{countOf(k)}</span>}
            </button>
          ))}
          <button type="button" className="dg-nav-csv" onClick={() => exportCsv(emp, blocos, itens, gemi)}>
            <Icon k="csv" />
            <span>Exportar CSV</span>
          </button>
        </nav>
      </aside>

      <div className="dg-content">
        <header className="dg-ehead">
          <div>
            <h1>{emp.nome}</h1>
            <p className="dg-muted">
              {emp.cnpj ? `CNPJ ${emp.cnpj} · ` : ''}Perfil: {staff ? 'Administrador SAN' : 'Cliente (preenche as respostas)'}
              {emp.arquivada ? ' · empresa arquivada' : ''}
            </p>
          </div>
        </header>

        {activeTab === 'painel' && rapido && <PainelGemi gemi={gemi} emp={emp} onAbrir={() => go(`/e/${id}/gemi`)} />}
        {activeTab === 'painel' && !rapido && (
          <Painel
            blocos={blocos}
            emp={emp}
            onOpen={openBloco}
            onRodada={(k) => {
              setFlt({ s: '', r: '', q: '' })
              go(`/e/${id}/${k}`)
            }}
          />
        )}
        {activeTab === 'sim' && staff && <Simulacao key={emp.id} empId={id} emp={emp} sim={sim} user={user} />}
        {activeTab === 'gemi' && <Gemi key={emp.id} empId={id} emp={emp} gemi={gemi} canEdit={canEdit} canAnswer={canAnswer} user={user} />}
        {RODADAS.some((r) => r.k === activeTab) && (
          <Rodada
            key={activeTab}
            empId={id}
            rodada={activeTab}
            blocos={blocos}
            itens={itens}
            canEdit={canEdit}
            canAnswer={canAnswer}
            user={user}
            flt={flt}
            setFlt={setFlt}
            openId={openId}
            setOpenId={setOpenId}
          />
        )}
        {activeTab === 'log' && staff && <Log empId={id} emp={emp} />}
        {activeTab === 'acessos' && <Acessos emp={emp} staff={staff} email={email} />}
      </div>
    </div>
  )
}
