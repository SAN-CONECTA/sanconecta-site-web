import { AREAS, EVID, ITEMS, PILLARS, RISK, STATUS, evKey, labelOf, rkKey } from './catalog'
import { dataOf, fmtMat, matOf } from './calc'
import { fmtD, fmtTs } from './util'

export function csvCell(v) {
  let s = String(v == null ? '' : v)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function exportCsv(emp, itens) {
  const head = ['Área', 'Pilar', 'Código', 'Item', 'Status', 'Risco', 'Responsável', 'Prazo', 'Achados gerais', 'Respostas por pergunta', 'Maturidade do item (média 0-5)', 'Maturidade por bloco', 'Situação da evidência', 'Fonte da evidência', 'Recomendação', 'Atualizado em']
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
      it.b
        .map((b) =>
          b.q
            .map((q, i) => ((d.respostas || {})[q.id] ? `${b.id}.${i + 1}) ${q.t.split('\n')[0]} ${(d.respostas || {})[q.id]}` : ''))
            .filter(Boolean)
            .join('\n'),
        )
        .filter(Boolean)
        .join('\n'),
      fmtMat(matOf(it, d)),
      it.b
        .filter((b) => b.n && Number.isInteger((d.notas || {})[b.id]))
        .map((b) => `${b.t}: ${d.notas[b.id]}`)
        .join('\n'),
      labelOf(EVID, evKey(d.evidStatus)),
      d.evidence,
      d.reco,
      fmtTs(d.updatedAt),
    ]
  })
  csvDownload(`diagnostico-360-${emp.nome}`, head, rows)
}

export function csvDownload(nome, head, rows) {
  const csv = `\uFEFF${[head, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n')}`
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  const slug = String(nome || 'arquivo').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  a.href = url
  a.download = `${slug || 'arquivo'}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
