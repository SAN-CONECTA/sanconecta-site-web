import { BLANK, evKey, mtKey, rkKey, stIdx } from './catalog'

export const dataOf = (itens, id) => ({ ...BLANK, ...((itens && itens[id]) || {}) })

export function stats(itens, list) {
  const s = { total: list.length, st: [0, 0, 0, 0], rk: { sem: 0, baixo: 0, medio: 0, alto: 0, critico: 0 }, mSum: 0, mN: 0, mAvg: null, evPend: 0 }
  list.forEach((it) => {
    const d = dataOf(itens, it.id)
    s.st[stIdx(d.status)] += 1
    s.rk[rkKey(d.risk)] += 1
    const m = mtKey(d.maturity)
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
