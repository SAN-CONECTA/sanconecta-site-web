import { useEffect, useState } from 'react'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { ITEMS, PILLARS, RISK, STATUS, labelOf, rkKey } from './catalog'
import { dataOf } from './calc'
import { fmtD, fmtTs, go, normEmail } from './util'
import Painel from './Painel'
import Itens from './Itens'
import Acessos from './Acessos'

const TABS = [
  ['painel', 'Painel'],
  ['itens', 'Itens'],
  ['acessos', 'Empresa e acessos'],
]

function csvCell(v) {
  let s = String(v == null ? '' : v)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function exportCsv(emp, itens) {
  const head = ['Pilar', 'Código', 'Item', 'Status', 'Risco', 'Responsável', 'Prazo', 'Achados', 'Fonte da evidência', 'Recomendação', 'Atualizado em']
  const rows = ITEMS.map((it) => {
    const d = dataOf(itens, it.id)
    return [
      PILLARS[it.p - 1].n,
      it.id,
      it.t,
      labelOf(STATUS, d.status),
      labelOf(RISK, rkKey(d.risk)),
      d.owner,
      fmtD(d.due),
      d.findings,
      d.evidence,
      d.reco,
      fmtTs(d.updatedAt),
    ]
  })
  const csv = `\uFEFF${[head, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n')}`
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  const slug = String(emp.nome || 'empresa').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  a.href = url
  a.download = `diagnostico-360-ti-${slug || 'empresa'}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function Empresa({ id, tab, session }) {
  const { user, staff } = session
  const email = normEmail(user.email)
  const [emp, setEmp] = useState(undefined)
  const [itens, setItens] = useState(null)
  const [papel, setPapel] = useState(staff ? 'staff' : undefined)
  const [flt, setFlt] = useState({ p: '', s: '', r: '', q: '' })
  const [openId, setOpenId] = useState(null)

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

  const activeTab = TABS.some((t) => t[0] === tab) ? tab : 'painel'
  const canEdit = staff

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

  const openInItens = (itemId) => {
    setFlt({ p: '', s: '', r: '', q: '' })
    setOpenId(itemId)
    go(`/e/${id}/itens`)
  }

  return (
    <div>
      <p className="dg-crumb">
        <a href="#/">← Empresas</a>
      </p>
      <header className="dg-ehead">
        <div>
          <h1>{emp.nome}</h1>
          <p className="dg-muted">
            {emp.cnpj ? `CNPJ ${emp.cnpj} · ` : ''}Perfil: {staff ? 'Administrador SAN' : 'Leitura'}
            {emp.arquivada ? ' · empresa arquivada' : ''}
          </p>
        </div>
        <button type="button" className="dg-btn" onClick={() => exportCsv(emp, itens)}>Exportar CSV</button>
      </header>

      <nav className="dg-tabs" role="tablist" aria-label="Seções">
        {TABS.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={activeTab === k} onClick={() => go(`/e/${id}/${k}`)}>
            {l}
          </button>
        ))}
      </nav>

      {activeTab === 'painel' && (
        <Painel
          itens={itens}
          emp={emp}
          onOpen={openInItens}
          onPillar={(p) => {
            setFlt({ p, s: '', r: '', q: '' })
            go(`/e/${id}/itens`)
          }}
        />
      )}
      {activeTab === 'itens' && (
        <Itens empId={id} itens={itens} canEdit={canEdit} user={user} flt={flt} setFlt={setFlt} openId={openId} setOpenId={setOpenId} />
      )}
      {activeTab === 'acessos' && <Acessos emp={emp} staff={staff} email={email} />}
    </div>
  )
}
