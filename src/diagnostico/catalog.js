// Modelo fixo do diagnóstico: duas áreas (TI e Gestão do Negócio), 10 pilares, 31 itens, blocos e perguntas-guia.
// Perguntas e blocos moram em perguntas.js e têm ids fixos (as respostas e as notas são gravadas por esses ids).
// Os ids dos itens ("1.1" a "10.2") também são validados nas regras do Firestore.
import { ITEMS_RAW, PILLAR_TEXT } from './perguntas'

export const AREAS = [
  { k: 'ti', l: 'Diagnóstico de TI' },
  { k: 'gestao', l: 'Gestão do Negócio' },
]

export const pad2 = (n) => String(n).padStart(2, '0')

// Pilares 1 a 5: TI. Pilares 6 a 10: Gestão do Negócio. Textos em perguntas.js.
export const PILLARS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  n: PILLAR_TEXT[String(i + 1)].n,
  t: PILLAR_TEXT[String(i + 1)].t,
  a: i < 5 ? 'ti' : 'gestao',
}))

// Cada item tem blocos (it.b) e a lista plana de perguntas (it.q = [{ id, t }]).
export const ITEMS = ITEMS_RAW.map((it) => ({ ...it, q: it.b.flatMap((b) => b.q) }))

export const STATUS = [
  {
    "k": "nao_iniciado",
    "l": "Não iniciado"
  },
  {
    "k": "coleta",
    "l": "Em coleta"
  },
  {
    "k": "analise",
    "l": "Em análise"
  },
  {
    "k": "concluido",
    "l": "Concluído"
  }
]

export const RISK = [
  {
    "k": "sem",
    "l": "Sem avaliação"
  },
  {
    "k": "baixo",
    "l": "Baixo"
  },
  {
    "k": "medio",
    "l": "Médio"
  },
  {
    "k": "alto",
    "l": "Alto"
  },
  {
    "k": "critico",
    "l": "Crítico"
  }
]

// Escala de maturidade 0 a 5, aplicada por BLOCO de perguntas (a nota do item é a média dos blocos).
export const MATURITY = [
  { k: 0, l: '0 · Inexistente', d: 'Não existe processo, controle ou registro. Ninguém sabe informar com segurança.' },
  { k: 1, l: '1 · Inicial', d: 'Existe de maneira informal, depende de uma pessoa e não possui registro confiável.' },
  { k: 2, l: '2 · Repetível', d: 'É realizado com alguma regularidade, mas sem documentação, indicadores ou revisão formal.' },
  { k: 3, l: '3 · Definido', d: 'Existe processo documentado, responsável definido e rotina conhecida pela equipe.' },
  { k: 4, l: '4 · Gerenciado', d: 'O processo é medido, acompanhado e revisado periodicamente, com evidências.' },
  { k: 5, l: '5 · Otimizado', d: 'O processo é continuamente aprimorado, testado, auditável e baseado em indicadores.' },
]

// Situação da evidência pedida ao cliente.
export const EVID = [
  { k: 'nao_solicitada', l: 'Não solicitada' },
  { k: 'solicitada', l: 'Solicitada' },
  { k: 'parcial', l: 'Recebida parcialmente' },
  { k: 'recebida', l: 'Recebida' },
  { k: 'nao_recebida', l: 'Não recebida' },
  { k: 'nao_aplica', l: 'Não se aplica' },
]

export const BLANK = {
  status: 'nao_iniciado', risk: 'sem', owner: '', due: '', findings: '', evidence: '', reco: '',
  maturity: null, evidStatus: 'nao_solicitada', respostas: {}, notas: {},
}

export const labelOf = (arr, k) => (arr.find((x) => x.k === k) || {}).l || ''
export const stIdx = (k) => Math.max(0, STATUS.findIndex((s) => s.k === k))
export const rkKey = (k) => (RISK.some((r) => r.k === k) ? k : 'sem')
export const mtKey = (v) => (Number.isInteger(v) && v >= 0 && v <= 5 ? v : null)
export const evKey = (k) => (EVID.some((e) => e.k === k) ? k : 'nao_solicitada')
export const rkRank = (k) => RISK.findIndex((r) => r.k === k)
