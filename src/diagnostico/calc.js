import { BLANK, rkKey, stIdx } from './catalog'

export const dataOf = (itens, id) => ({ ...BLANK, ...((itens && itens[id]) || {}) })

export function stats(itens, list) {
  const s = { total: list.length, st: [0, 0, 0, 0], rk: { sem: 0, baixo: 0, medio: 0, alto: 0, critico: 0 } }
  list.forEach((it) => {
    const d = dataOf(itens, it.id)
    s.st[stIdx(d.status)] += 1
    s.rk[rkKey(d.risk)] += 1
  })
  return s
}
