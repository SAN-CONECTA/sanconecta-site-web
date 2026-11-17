import { GEMI_FASES, GEMI_QUESTOES } from './gemiDados'

export const FAIXAS = [
  { de: 0, ate: 25, l: 'Nível Inicial (Sobrevivência)', d: 'Operação vulnerável, informal e reativa. Foco imediato em estancar riscos (backup, rede, segurança básica).' },
  { de: 26, ate: 50, l: 'Nível Básico (Organização)', d: 'Ferramentas existem, mas faltam padrões e integração. Foco em estruturar suporte, inventário e unificar dados.' },
  { de: 51, ate: 75, l: 'Nível Gerenciado (Eficiência)', d: 'Processos rodando bem e boa estabilidade. Foco em automação, indicadores (BI) e redução de gargalos.' },
  { de: 76, ate: 100, l: 'Nível Estratégico (Inovação)', d: 'TI e negócio caminham juntos. Foco em escalabilidade, inteligência artificial, segurança avançada e vantagem competitiva.' },
]

export const gemiNota = (g, id) => {
  const v = g && g[id] ? g[id].nota : null
  return Number.isInteger(v) && v >= 0 && v <= 4 ? v : null
}

export const gemiTexto = (g, id) => String((g && g[id] && g[id].texto) || '').trim()

export const faixaDe = (pct) => FAIXAS.find((f) => Math.round(pct) <= f.ate) || FAIXAS[FAIXAS.length - 1]

// Pontuação do diagnóstico rápido. Cada fase: pontos = soma de nota x peso; máximo = soma dos pesos x 4.
// Índice geral = média das porcentagens das fases ponderada por 40%, 35% e 25% (só entram fases com resposta).
export function gemiScore(g) {
  const fases = GEMI_FASES.map((f) => {
    const obj = GEMI_QUESTOES.filter((q) => q.f === f.id && q.tipo === 'obj')
    const resp = obj.filter((q) => gemiNota(g, q.id) !== null)
    const pts = resp.reduce((a, q) => a + gemiNota(g, q.id) * q.peso, 0)
    const max = obj.reduce((a, q) => a + q.peso * 4, 0)
    const maxResp = resp.reduce((a, q) => a + q.peso * 4, 0)
    return { ...f, pts, max, nObj: obj.length, nResp: resp.length, pct: maxResp ? (pts / maxResp) * 100 : null }
  })
  const com = fases.filter((f) => f.pct !== null)
  const somaPeso = com.reduce((a, f) => a + f.peso, 0)
  const indice = somaPeso ? com.reduce((a, f) => a + f.pct * f.peso, 0) / somaPeso : null
  const total = fases.reduce((a, f) => a + f.pts, 0)
  const max = fases.reduce((a, f) => a + f.max, 0)
  const nObj = fases.reduce((a, f) => a + f.nObj, 0)
  const nResp = fases.reduce((a, f) => a + f.nResp, 0)

  const alertas = []
  const seg = ['1.1', '1.2'].filter((id) => gemiNota(g, id) !== null && gemiNota(g, id) <= 1)
  if (seg.length) {
    alertas.push({
      k: 'critico',
      t: 'Alerta vermelho: risco crítico',
      d: `Nota 0 ou 1 em ${seg.map((id) => `${id} ${GEMI_QUESTOES.find((q) => q.id === id).t}`).join(' e ')}. Vale independentemente da média geral.`,
    })
  }
  const f1 = fases[0].pct
  const f3 = fases[2].pct
  if (f1 !== null && f3 !== null && f3 - f1 >= 25 && f3 >= 51 && f1 <= 50) {
    alertas.push({
      k: 'gestao',
      t: 'Gestão alta e TI baixa',
      d: 'Cliente maduro organizacionalmente, mas com operação travada por tecnologia obsoleta. Cenário para modernização de infraestrutura, nuvem, segurança e integração.',
    })
  }
  if (f1 !== null && f3 !== null && f1 - f3 >= 25 && f1 >= 51 && f3 <= 50) {
    alertas.push({
      k: 'ti',
      t: 'TI alta e gestão baixa',
      d: 'Cliente investiu em boas ferramentas, mas subutiliza por falta de processos internos definidos. Foco em consultoria de processos, ERP e BI.',
    })
  }
  return { fases, total, max, indice, nObj, nResp, faixa: indice === null ? null : faixaDe(indice), alertas }
}

export const fmtPct = (p) => (p === null || p === undefined ? '—' : `${Math.round(p)}%`)
