import { BLOCOS, EVID, RISK, RODADAS, STATUS, evKey, labelOf, mtKey, rkKey } from './catalog'
import { dataOf, respOf } from './calc'
import { GEMI_QUESTOES } from './gemiDados'
import { gemiNota } from './gemiCalc'
import { fmtD, fmtTs } from './util'

const labelOfR = (k) => (RODADAS.find((r) => r.k === k) || {}).n || ''

function csvCell(v) {
  let s = String(v == null ? '' : v)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function exportCsv(emp, blocos, itens, gemi) {
  if (emp.modo === 'rapido') {
    const head = ['Fase', 'Código', 'Pergunta', 'Tipo', 'Peso', 'Nota (0-4)', 'Pontos', 'Opção escolhida', 'Resposta / observação', 'Atualizado em']
    const rows = GEMI_QUESTOES.map((q) => {
      const nota = gemiNota(gemi, q.id)
      const g = (gemi && gemi[q.id]) || {}
      return [
        q.f,
        q.id,
        `${q.t}: ${q.p}`,
        q.tipo === 'obj' ? 'Objetiva' : 'Dissertativa',
        q.peso || '',
        nota === null ? '' : String(nota),
        nota === null ? '' : String(nota * q.peso),
        nota === null ? '' : q.op[nota],
        q.tipo === 'obj' ? g.obs || '' : g.texto || '',
        fmtTs(g.updatedAt),
      ]
    })
    csvDownload(`fase-inicial-${emp.nome}`, head, rows)
    return
  }
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
