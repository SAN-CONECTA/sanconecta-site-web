// Modelo do diagnóstico (v1.8): três rodadas, cada uma com blocos que reúnem perguntas de vários itens.
// As perguntas moram em perguntas.js (ids fixos q01..) e o destino de cada uma em destinos.js.
// As respostas continuam gravadas por item/id da pergunta; status, risco, nota e demais campos são gravados por BLOCO.
import { ITEMS_RAW } from './perguntas'
import { BLOCOS_META, DESTINOS } from './destinos'

export const RODADAS = [
  {
    k: 'ti',
    n: 'Maturidade de TI',
    p: 'A TI conhece, protege, opera e recupera o ambiente de forma consistente?',
    quem: 'Equipe de TI e prestadores responsáveis pela operação.',
  },
  {
    k: 'al',
    n: 'Alinhamento entre TI e negócio',
    p: 'A capacidade e as prioridades da TI atendem às necessidades e à estratégia da empresa?',
    quem: 'Liderança de TI, direção e responsáveis pelas áreas de negócio.',
  },
  {
    k: 'ge',
    n: 'Maturidade de gestão empresarial',
    p: 'A empresa possui processos, controles, indicadores e responsabilidades para alcançar seus objetivos?',
    quem: 'Direção e responsáveis por financeiro, comercial, operações, pessoas e conformidade.',
  },
]

const ITEM_BY_ID = Object.fromEntries(ITEMS_RAW.map((it) => [it.id, it]))

// Pergunta com a origem (item e bloco original) para exibir agrupada.
function perguntaDe([itemId, qid]) {
  const it = ITEM_BY_ID[itemId]
  const bk = it.b.find((b) => b.q.some((q) => q.id === qid))
  const q = bk.q.find((x) => x.id === qid)
  return { i: itemId, id: qid, t: q.t, it: it.t, o: bk.t }
}

// Blocos sem perguntas (reservados para perguntas novas) não aparecem.
export const BLOCOS = Object.keys(DESTINOS)
  .filter((id) => DESTINOS[id].length)
  .map((id) => ({ id, ...BLOCOS_META[id], q: DESTINOS[id].map(perguntaDe) }))

export const BLOCO_BY_ID = Object.fromEntries(BLOCOS.map((b) => [b.id, b]))
export const blocosDe = (r) => BLOCOS.filter((b) => b.r === r)

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

// Escala de maturidade 0 a 5, aplicada por bloco; a maturidade da rodada é a média das notas dos blocos.
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

// Campos de cada bloco (documento empresas/{id}/blocos/{codigo}).
export const BLANK = {
  status: 'nao_iniciado', risk: 'sem', owner: '', due: '', findings: '', evidence: '', reco: '',
  nota: null, evidStatus: 'nao_solicitada',
}

export const labelOf = (arr, k) => (arr.find((x) => x.k === k) || {}).l || ''
export const stIdx = (k) => Math.max(0, STATUS.findIndex((s) => s.k === k))
export const rkKey = (k) => (RISK.some((r) => r.k === k) ? k : 'sem')
export const mtKey = (v) => (Number.isInteger(v) && v >= 0 && v <= 5 ? v : null)
export const evKey = (k) => (EVID.some((e) => e.k === k) ? k : 'nao_solicitada')
export const rkRank = (k) => RISK.findIndex((r) => r.k === k)
