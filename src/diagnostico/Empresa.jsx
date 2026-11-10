import { useEffect, useState } from 'react'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { ITEMS, PILLARS } from './catalog'
import { stats } from './calc'
import { go, normEmail } from './util'
import { exportCsv } from './exportCsv'
import Painel from './Painel'
import Itens from './Itens'
import Acessos from './Acessos'
import Log from './Log'

// 'itens' continua válido (links antigos): mostra TI e Gestão juntas, sem botão próprio na barra lateral.
const TABS = [
  ['painel', 'Painel'],
  ['ti', 'Diagnóstico de TI'],
  ['gestao', 'Gestão do Negócio'],
  ['itens', 'Itens'],
  ['acessos', 'Empresa e acessos'],
  ['log', 'Log de alterações'],
]
const NAV = TABS.filter((t) => t[0] !== 'itens')
const SO_STAFF = ['log']

const ICONS = {
  painel: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  ti: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  gestao: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
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
  const [papel, setPapel] = useState(staff ? 'staff' : undefined)
  const [flt, setFlt] = useState({ p: '', s: '', r: '', q: '' })
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
    const offItens = onSnapshot(
      collection(db, 'empresas', id, 'itens'),
      (s) => {
        const m = {}
        s.docs.forEach((d) => {
          m[d.id] = d.data()
        })
        setItens(m)
      },
      onErr,
    )
    if (!staff) {
      getDoc(doc(db, 'membros', `${id}__${email}`))
        .then((s) => setPapel(s.exists() ? s.data().role : null))
        .catch(() => setPapel(null))
    }
    return () => {
      offEmp()
      offItens()
    }
  }, [id, staff, email])

  const activeTab = TABS.some((t) => t[0] === tab && (staff || !SO_STAFF.includes(t[0]))) ? tab : 'painel'
  const canEdit = staff
  // Cliente vinculado à empresa preenche respostas e situação da evidência (v1.7), exceto em empresa arquivada.
  const canAnswer = !!emp && (staff || (papel === 'leitura' && !emp.arquivada))

  if (emp === undefined || (itens === null && emp !== null) || papel === undefined) {
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

  const areaTab = (pilarId) => PILLARS[pilarId - 1].a
  const openInItens = (itemId) => {
    const it = ITEMS.find((x) => x.id === itemId)
    setFlt({ p: '', s: '', r: '', q: '' })
    setOpenId(itemId)
    go(`/e/${id}/${it ? areaTab(it.p) : 'ti'}`)
  }
  const countOf = (k) => {
    if (k !== 'ti' && k !== 'gestao') return null
    const s = stats(itens, ITEMS.filter((it) => PILLARS[it.p - 1].a === k))
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
          {NAV.filter(([k]) => staff || !SO_STAFF.includes(k)).map(([k, l]) => (
            <button key={k} type="button" aria-current={activeTab === k ? 'page' : undefined} onClick={() => go(`/e/${id}/${k}`)}>
              <Icon k={k} />
              <span>{l}</span>
              {countOf(k) && <span className="dg-nav-n dg-mono" title="Itens concluídos">{countOf(k)}</span>}
            </button>
          ))}
          <button type="button" className="dg-nav-csv" onClick={() => exportCsv(emp, itens)}>
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

        {activeTab === 'painel' && (
          <Painel
            itens={itens}
            emp={emp}
            onOpen={openInItens}
            onPillar={(p) => {
              setFlt({ p, s: '', r: '', q: '' })
              go(`/e/${id}/${areaTab(Number(p))}`)
            }}
          />
        )}
        {['ti', 'gestao', 'itens'].includes(activeTab) && (
          <Itens
            empId={id}
            itens={itens}
            canEdit={canEdit}
            canAnswer={canAnswer}
            user={user}
            flt={flt}
            setFlt={setFlt}
            openId={openId}
            setOpenId={setOpenId}
            area={activeTab === 'itens' ? null : activeTab}
          />
        )}
        {activeTab === 'log' && staff && <Log empId={id} emp={emp} />}
        {activeTab === 'acessos' && <Acessos emp={emp} staff={staff} email={email} />}
      </div>
    </div>
  )
}
