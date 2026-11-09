import { AREAS, EVID, ITEMS, PILLARS, RISK, STATUS, evKey, labelOf, mtKey, rkKey } from './catalog'
import { dataOf } from './calc'
import { fmtD, fmtTs } from './util'

function csvCell(v) {
  let s = String(v == null ? '' : v)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function exportCsv(emp, itens) {
  const head = ['Área', 'Pilar', 'Código', 'Item', 'Status', 'Risco', 'Responsável', 'Prazo', 'Achados gerais', 'Respostas por pergunta', 'Maturidade (0-5)', 'Situação da evidência', 'Fonte da evidência', 'Recomendação', 'Atualizado em']
  const rows = ITEMS.map((it) => {
    const d = dataOf(itens, it.id)
    return [
      labelOf(AREAS, PILLARS[it.p - 1].a),
      PILLARS[it.p - 1].n,
      it.id,
      it.t,
      labelOf(STATUS, d.status),
      labelOf(RISK, rkKey(d.risk)),
      d.owner,
      fmtD(d.due),
      d.findings,
      it.q
        .map((q, i) => ((d.respostas || {})[`r${i}`] ? `${i + 1}) ${q} ${(d.respostas || {})[`r${i}`]}` : ''))
        .filter(Boolean)
        .join('\n'),
      mtKey(d.maturity) === null ? '' : String(d.maturity),
      labelOf(EVID, evKey(d.evidStatus)),
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
