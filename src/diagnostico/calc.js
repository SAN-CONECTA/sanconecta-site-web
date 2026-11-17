import { BLANK, evKey, mtKey, rkKey, stIdx } from './catalog'

export const dataOf = (blocos, id) => ({ ...BLANK, ...((blocos && blocos[id]) || {}) })

export const fmtMat = (m) => (m === null || m === undefined ? '' : (Math.round(m * 10) / 10).toFixed(1).replace('.', ','))

// Resposta gravada de uma pergunta (item + id da pergunta).
export const respOf = (itens, item, qid) => String(((itens && itens[item] && itens[item].respostas) || {})[qid] || '').trim()

export const answered = (itens, b) => b.q.filter((q) => respOf(itens, q.i, q.id)).length

export function stats(blocos, list) {
  const s = { total: list.length, st: [0, 0, 0, 0], rk: { sem: 0, baixo: 0, medio: 0, alto: 0, critico: 0 }, mSum: 0, mN: 0, mAvg: null, evPend: 0 }
  list.forEach((b) => {
    const d = dataOf(blocos, b.id)
    s.st[stIdx(d.status)] += 1
    s.rk[rkKey(d.risk)] += 1
    const m = mtKey(d.nota)
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
