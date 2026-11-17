import { BLOCOS, EVID, RISK, RODADAS, STATUS, evKey, labelOf, mtKey, rkKey } from './catalog'
import { dataOf, respOf } from './calc'
import { fmtD, fmtTs } from './util'

const labelOfR = (k) => (RODADAS.find((r) => r.k === k) || {}).n || ''

function csvCell(v) {
  let s = String(v == null ? '' : v)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function exportCsv(emp, blocos, itens) {
  const head = ['Rodada', 'Código', 'Bloco', 'Status', 'Risco', 'Responsável', 'Prazo', 'Achados do bloco', 'Respostas por pergunta', 'Maturidade do bloco (0-5)', 'Situação da evidência', 'Fonte da evidência', 'Recomendação', 'Atualizado em']
  const rows = BLOCOS.map((b) => {
    const d = dataOf(blocos, b.id)
    const nota = mtKey(d.nota)
    return [
      labelOfR(b.r),
      b.id,
      b.n,
      labelOf(STATUS, d.status),
      labelOf(RISK, rkKey(d.risk)),
      d.owner,
      fmtD(d.due),
      d.findings,
      b.q
        .map((q, i) => (respOf(itens, q.i, q.id) ? `${i + 1}) [${q.i}] ${q.t.split('\n')[0]} ${respOf(itens, q.i, q.id)}` : ''))
        .filter(Boolean)
        .join('\n'),
      nota === null ? '' : String(nota),
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
