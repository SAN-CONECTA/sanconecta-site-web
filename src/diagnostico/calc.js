import { BLANK, evKey, mtKey, rkKey, stIdx } from './catalog'

export const dataOf = (itens, id) => ({ ...BLANK, ...((itens && itens[id]) || {}) })

// Maturidade do item: média das notas dos blocos (0 a 5); sem notas, usa a nota antiga do item.
export function matOf(it, d) {
  const n = d.notas && typeof d.notas === 'object' ? d.notas : {}
  const v = it.b.filter((b) => b.n).map((b) => n[b.id]).filter((x) => Number.isInteger(x) && x >= 0 && x <= 5)
  if (v.length) return v.reduce((a, b) => a + b, 0) / v.length
  return mtKey(d.maturity)
}

export const fmtMat = (m) => (m === null ? '' : (Math.round(m * 10) / 10).toFixed(1).replace('.', ','))

export function stats(itens, list) {
  const s = { total: list.length, st: [0, 0, 0, 0], rk: { sem: 0, baixo: 0, medio: 0, alto: 0, critico: 0 }, mSum: 0, mN: 0, mAvg: null, evPend: 0 }
  list.forEach((it) => {
    const d = dataOf(itens, it.id)
    s.st[stIdx(d.status)] += 1
    s.rk[rkKey(d.risk)] += 1
    const m = matOf(it, d)
    if (m !== null) {
      s.mSum += m
      s.mN += 1
    }
    const ev = evKey(d.evidStatus)
    if (ev === 'solicitada' || ev === 'parcial' || ev === 'nao_recebida') s.evPend += 1
  })
  s.mAvg = s.mN ? s.mSum / s.mN : null
  return s
}
