// Simulador de prejuízo por indisponibilidade de TI (v1.10). Mesmas fórmulas da planilha
// "Simulador_Prejuizo_Downtime_TI_ROI.xlsx". Valores monetários em R$; % da operação afetada em fração (0 a 1).

export const SIM_PADRAO = {
  fat: 2500000, // Faturamento mensal médio (R$/mês)
  dias: 22, // Dias úteis no mês
  horas: 8, // Horas produtivas por dia
  colab: 150, // Colaboradores dependentes de TI
  custo: 4500, // Custo médio mensal por colaborador (R$)
  pct: 0.8, // % da operação afetada na parada
  emerg: 3500, // Custo emergencial por incidente (R$)
  rto: 12, // Tempo de parada simulado (horas)
  invest: 2200, // Investimento mensal em TI preventiva (R$)
}

export const SIM_CENARIOS = [
  { n: 'Falha pontual (link, switch ou servidor)', h: 4 },
  { n: 'Parada de 1 dia útil (falha de hardware ou banco)', h: 8 },
  { n: 'Incidente grave (sem backup testado)', h: 24 },
  { n: 'Crise crítica (ransomware ou sinistro no CPD)', h: 48 },
]

const div = (a, b) => (b ? a / b : null)

export function simCalc(d) {
  const horasUteis = d.dias * d.horas
  const fatHora = div(d.fat, horasUteis)
  const folhaHora = div(d.colab * d.custo, horasUteis)
  const perdaFatH = fatHora === null ? null : fatHora * d.pct
  const ociosH = folhaHora === null ? null : folhaHora * d.pct
  const prejHora = perdaFatH === null ? null : perdaFatH + ociosH
  const perdaCen = perdaFatH === null ? null : perdaFatH * d.rto
  const folhaCen = ociosH === null ? null : ociosH * d.rto
  const totalFoco = perdaCen === null ? null : perdaCen + folhaCen + d.emerg
  const cenarios = SIM_CENARIOS.map((c) => {
    if (perdaFatH === null) return { ...c, fat: null, folha: null, emerg: d.emerg, total: null, pctMes: null, diasUteis: null }
    const fat = perdaFatH * c.h
    const folha = ociosH * c.h
    const total = fat + folha + d.emerg
    return { ...c, fat, folha, emerg: d.emerg, total, pctMes: div(total, d.fat), diasUteis: div(c.h, d.horas) }
  })
  const invAnual = d.invest * 12
  const saldo = totalFoco === null ? null : totalFoco - invAnual
  const roi = saldo === null ? null : div(saldo, invAnual)
  const relacao = totalFoco === null ? null : div(totalFoco, invAnual)
  const veredito = totalFoco === null ? '' : totalFoco >= invAnual ? 'INVESTIMENTO SE PAGA EM 1 PARADA' : 'PROTEÇÃO DE CONTINUIDADE CRÍTICA'
  return { horasUteis, fatHora, folhaHora, perdaFatH, ociosH, prejHora, perdaCen, folhaCen, totalFoco, cenarios, invAnual, saldo, roi, relacao, veredito }
}

export const brl = (v) => (v === null || v === undefined || Number.isNaN(v) ? '—' : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }))
export const pct1 = (v) => (v === null || v === undefined || Number.isNaN(v) ? '—' : `${(v * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`)
export const num1 = (v) => (v === null || v === undefined || Number.isNaN(v) ? '—' : v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }))

export const SIM_PILARES = [
  {
    p: '1. Ociosidade da folha',
    tipo: 'Custo direto (caixa queimado)',
    calc: '(Nº de colaboradores x custo médio) ÷ horas úteis x % afetada x horas',
    ex: '30 pessoas paradas por 8h custam milhares de reais em salários sem produção.',
    arg: '"Mesmo sem emitir uma única nota fiscal, cada hora parada custa R$ X só de salários e encargos pagos à toa."',
  },
  {
    p: '2. Faturamento cessante',
    tipo: 'Custo direto (receita perdida)',
    calc: '(Faturamento mensal ÷ horas úteis) x % de impacto nas vendas x horas',
    ex: 'Comércio, indústria ou clínica sem sistema perde pedidos para o concorrente.',
    arg: '"Clientes que não conseguem comprar ou ser atendidos hoje dificilmente esperam o sistema voltar amanhã."',
  },
  {
    p: '3. Recuperação emergencial',
    tipo: 'Custo extra (não orçado)',
    calc: 'Chamados avulsos urgentes + compra de peças sem cotação + horas extras',
    ex: 'Técnico emergencial cobra até 3x mais; a equipe faz hora extra para redigitar notas.',
    arg: '"Resolver na urgência custa muito mais caro do que manter prevenção mensal com SLA garantido."',
  },
  {
    p: '4. Perda de dados (RPO)',
    tipo: 'Retrabalho e risco operacional',
    calc: 'Tempo entre o último backup válido e o momento da falha (ex.: 8h a 24h de dados)',
    ex: 'Servidor para às 16h e o último backup era da noite anterior: 1 dia inteiro perdido.',
    arg: '"Backup sem teste de restauração e sem imutabilidade é apenas uma falsa sensação de segurança."',
  },
  {
    p: '5. Imagem e risco jurídico',
    tipo: 'Impacto intangível (longo prazo)',
    calc: 'Desgaste comercial, multas contratuais e sanções da LGPD em caso de vazamento',
    ex: 'Atraso em entregas críticas ou sequestro de dados (ransomware) expõe a marca.',
    arg: '"Uma única crise de dados ou parada prolongada pode comprometer anos de reputação no mercado."',
  },
]
