// Modelo fixo do diagnóstico: duas áreas (TI e Gestão do Negócio), 10 pilares e 31 itens com perguntas-guia.
// ATENÇÃO: as respostas de cada pergunta são gravadas pela POSIÇÃO dela em "q" (r0, r1, ...). Perguntas novas só podem
// entrar no FIM da lista de um item; mudar a ordem ou inserir no meio troca as respostas de lugar.
// Os ids dos itens ("1.1" a "10.2") também são validados nas regras do Firestore.
// Duas áreas do diagnóstico: pilares 1 a 5 são de TI; 6 a 10 são de Gestão do Negócio.
export const AREAS = [
  { k: 'ti', l: 'Diagnóstico de TI' },
  { k: 'gestao', l: 'Gestão do Negócio' },
]

export const pad2 = (n) => String(n).padStart(2, '0')

export const PILLARS = [
  {
    "id": 1,
    "n": "Infraestrutura, redes e servidores",
    "t": "Run & hardware",
    "a": "ti"
  },
  {
    "id": 2,
    "n": "Sistemas, aplicações e banco de dados",
    "t": "Plataformas",
    "a": "ti"
  },
  {
    "id": 3,
    "n": "Continuidade, proteção de dados e contingência",
    "t": "Sustentação",
    "a": "ti"
  },
  {
    "id": 4,
    "n": "Pessoas, processos e conhecimento tácito",
    "t": "Fator humano",
    "a": "ti"
  },
  {
    "id": 5,
    "n": "Escala e alinhamento estratégico",
    "t": "Previsibilidade e escala",
    "a": "ti"
  },
  {
    "id": 6,
    "n": "Estratégia e resultados",
    "t": "Direção e mercado",
    "a": "gestao"
  },
  {
    "id": 7,
    "n": "Finanças e controle",
    "t": "Caixa e margem",
    "a": "gestao"
  },
  {
    "id": 8,
    "n": "Comercial e clientes",
    "t": "Receita",
    "a": "gestao"
  },
  {
    "id": 9,
    "n": "Operações, compras e estoque",
    "t": "Execução",
    "a": "gestao"
  },
  {
    "id": 10,
    "n": "Pessoas, estrutura e conformidade",
    "t": "Organização",
    "a": "gestao"
  }
]

export const ITEMS = [
  {
    "id": "1.1",
    "p": 1,
    "t": "Servidores físicos e virtualização",
    "d": "Configuração e saúde dos servidores locais, hipervisores (Hyper-V, VMware), redundância de hardware e suporte do fabricante.",
    "q": [
      "Quais servidores e hipervisores existem, com modelo, versão e idade?",
      "Há redundância de hardware e de fonte de energia?",
      "Garantia e suporte do fabricante estão vigentes?",
      "Qual a capacidade total de armazenamento e quanto está em uso?",
      "Sistemas operacionais e serviços críticos dos servidores estão atualizados e com suporte?"
    ]
  },
  {
    "id": "1.2",
    "p": 1,
    "t": "Ativos de rede e conectividade",
    "d": "Topologia e capacidade de switches L2/L3, pontos de acesso, roteadores, links de internet e contingência por satélite.",
    "q": [
      "Qual a topologia e a capacidade dos switches?",
      "Existe link redundante e contingência (satélite ou outro)?",
      "Quais equipamentos de rede estão fora de suporte?"
    ]
  },
  {
    "id": "1.3",
    "p": 1,
    "t": "Perímetro de segurança e firewalls",
    "d": "Regras de firewall (FortiGate e similares), VPNs, segmentação em VLANs e proteção contra intrusões.",
    "q": [
      "As regras de firewall foram revisadas e estão documentadas?",
      "Quem tem acesso remoto por VPN e como ele é controlado?",
      "A rede de dados está segmentada em VLANs?",
      "O firmware do firewall está atualizado? Existe rotina de atualização?",
      "Os logs de segurança do perímetro são guardados e alguém os revisa?"
    ]
  },
  {
    "id": "1.4",
    "p": 1,
    "t": "Energia e infraestrutura física",
    "d": "Autonomia dos no-breaks, climatização do data center ou rack de TI e redundância de energia.",
    "q": [
      "Qual a autonomia real dos no-breaks sob a carga atual?",
      "A climatização do rack ou sala é adequada e monitorada?",
      "Há redundância de energia (gerador, circuito duplo)?"
    ]
  },
  {
    "id": "1.5",
    "p": 1,
    "t": "Estações de trabalho e endpoints",
    "d": "Parque de computadores, notebooks e celulares corporativos: idade, atualização, antivírus e controle de inventário.",
    "q": [
      "Existe inventário atualizado de computadores, notebooks e celulares, com idade e responsável?",
      "Sistema operacional e antivírus estão atualizados e gerenciados de forma central?",
      "Os discos dos notebooks são criptografados e há procedimento para perda ou roubo?"
    ]
  },
  {
    "id": "2.1",
    "p": 2,
    "t": "Sistemas de gestão core (ERP, CRM, SaaS)",
    "d": "Dependência, parametrização, customizações acumuladas e capacidade de suportar os processos vitais.",
    "q": [
      "Quais processos vitais dependem de cada sistema?",
      "Quantas customizações existem e quem as mantém?",
      "O sistema suporta o crescimento previsto?"
    ]
  },
  {
    "id": "2.2",
    "p": 2,
    "t": "Integradores e APIs (middleware)",
    "d": "Integrações entre sistemas, barramentos, conectores de e-commerce e BI, gargalos e pontos únicos de falha.",
    "q": [
      "Quais integrações existem e quem é o dono de cada uma?",
      "Qual delas é um ponto único de falha?",
      "Como uma falha de sincronização é detectada?"
    ]
  },
  {
    "id": "2.3",
    "p": 2,
    "t": "Bancos de dados e armazenamento",
    "d": "Tipos de banco ativos, rotinas de indexação, desempenho de rotinas críticas e limites de capacidade.",
    "q": [
      "Quais bancos estão ativos, em que versão e com que manutenção?",
      "Quanto tempo levam o fechamento do mês e os relatórios críticos?",
      "Quanto falta para o limite de capacidade?"
    ]
  },
  {
    "id": "2.4",
    "p": 2,
    "t": "Ambientes de nuvem",
    "d": "Workloads em AWS, Azure ou GCP, custos de tráfego e processamento, segurança de identidades e arquitetura híbrida.",
    "q": [
      "Quais cargas rodam na nuvem e quanto custam por mês?",
      "Como as identidades e os acessos são governados?",
      "Como a nuvem se conecta ao ambiente local?",
      "As configurações de segurança da nuvem (acessos, MFA, exposição pública) foram revisadas?",
      "Há monitoramento e alertas de falha, consumo e custo?"
    ]
  },
  {
    "id": "3.1",
    "p": 3,
    "t": "Políticas de backup e restore",
    "d": "Frequência das cópias, retenção off-site ou em nuvem e validação prática do tempo e da taxa de sucesso do restore.",
    "q": [
      "Qual a frequência e a retenção das cópias, e onde ficam?",
      "Quando foi o último restore testado de verdade?",
      "Qual o tempo e a taxa de sucesso medidos?"
    ]
  },
  {
    "id": "3.2",
    "p": 3,
    "t": "Plano de recuperação de desastres (DRP)",
    "d": "Plano documentado, RTO e RPO declarados contra a capacidade real da operação.",
    "q": [
      "Existe DRP documentado e atualizado?",
      "Quais RTO e RPO foram declarados?",
      "A operação consegue cumprir esses números hoje?"
    ]
  },
  {
    "id": "3.3",
    "p": 3,
    "t": "Identidades, acessos e certificados",
    "d": "Privilégios de usuários (RBAC), MFA e ciclo de vida de certificados digitais e credenciais críticas.",
    "q": [
      "Os privilégios são revisados com que frequência?",
      "Em quem o MFA está ativo?",
      "Quais certificados e credenciais vencem nos próximos 90 dias?",
      "Contas de quem saiu da empresa são desativadas no mesmo dia?",
      "Quem tem perfil de administrador de domínio ou equivalente, e isso é revisado?",
      "Senhas compartilhadas ficam em cofre de senhas?",
      "Há registro da atividade dos usuários e por quanto tempo é guardado?"
    ]
  },
  {
    "id": "3.4",
    "p": 3,
    "t": "Cibersegurança e proteção de dados",
    "d": "Antivírus e EDR, conformidade com a LGPD, testes de vulnerabilidade e gestão de vazamento de dados.",
    "q": [
      "Todos os endpoints têm antivírus ou EDR ativo?",
      "Qual o status de conformidade com a LGPD?",
      "Quando foi o último teste de vulnerabilidade e como se trata um vazamento?",
      "Os usuários recebem treinamento ou simulação de phishing?",
      "Existe política de segurança da informação escrita e comunicada?"
    ]
  },
  {
    "id": "4.1",
    "p": 4,
    "t": "Dependência de pessoas-chave",
    "d": "Sistemas, linguagens, senhas ou rotinas mantidas por um único profissional ou fornecedor.",
    "q": [
      "O que depende de uma só pessoa ou fornecedor?",
      "Quem cobre a ausência dessa pessoa?",
      "O que para se ela sair amanhã?"
    ]
  },
  {
    "id": "4.2",
    "p": 4,
    "t": "Documentação técnica e processos",
    "d": "Atualização das arquiteturas, manuais de contingência e procedimentos operacionais padrão.",
    "q": [
      "As arquiteturas estão documentadas e atualizadas?",
      "Existem manuais de contingência testados?",
      "Os procedimentos padrão são seguidos na prática?"
    ]
  },
  {
    "id": "4.3",
    "p": 4,
    "t": "Terceiros e fornecedores (SLA)",
    "d": "Consultorias externas, contratos de manutenção de software e hardware e tempo real de resposta em crises.",
    "q": [
      "Quais fornecedores e contratos de manutenção existem?",
      "Quais SLAs estão contratados?",
      "Qual o tempo de resposta real em uma crise?"
    ]
  },
  {
    "id": "4.4",
    "p": 4,
    "t": "Governança do atendimento (helpdesk e NOC)",
    "d": "Fluxo de chamados, backlog técnico, incidentes recorrentes e visibilidade do volume real de problemas para a liderança.",
    "q": [
      "Como os chamados fluem e quem os prioriza?",
      "Qual o tamanho do backlog e quais incidentes se repetem?",
      "A liderança enxerga o volume real de problemas?",
      "Há catálogo de serviços e acordo de nível de serviço com os usuários?",
      "Incidentes recorrentes passam por análise de causa raiz?"
    ]
  },
  {
    "id": "5.1",
    "p": 5,
    "t": "Gargalos de crescimento",
    "d": "Onde a TI trava se a empresa crescer 2x, 5x ou 10x em transações, lojas, unidades ou usuários.",
    "q": [
      "O que trava primeiro com 2x o volume atual?",
      "E com 5x e com 10x?",
      "Qual investimento destrava cada limite?"
    ]
  },
  {
    "id": "5.2",
    "p": 5,
    "t": "Dívida técnica",
    "d": "Gambiarras, sistemas legados descontinuados e arquiteturas obsoletas mantidas só para manter a operação rodando.",
    "q": [
      "Quais workarounds sustentam a operação hoje?",
      "Quais sistemas legados ou descontinuados continuam no ar?",
      "Qual o custo de mantê-los versus substituí-los?"
    ]
  },
  {
    "id": "5.3",
    "p": 5,
    "t": "Preparação para transações corporativas (M&A e sucessão)",
    "d": "Facilidade ou impedimento para auditar, integrar ou desacoplar sistemas em aquisição, fusão ou troca de liderança.",
    "q": [
      "Dá para auditar e documentar os sistemas rapidamente?",
      "Dá para integrar ou desacoplar sistemas e infraestrutura?",
      "O que impediria uma transição de liderança sem perdas?"
    ]
  },
  {
    "id": "6.1",
    "p": 6,
    "t": "Metas, planejamento e indicadores",
    "d": "Se a empresa sabe aonde quer chegar, como mede o caminho e quem acompanha.",
    "q": [
      "Existem metas escritas para o ano (faturamento, margem, clientes) e quem responde por cada uma?",
      "Quais 3 a 5 indicadores o dono olha toda semana ou todo mês, e de onde vêm os números?",
      "Há reunião periódica para rever resultados e decidir ações, com registro do que foi decidido?"
    ]
  },
  {
    "id": "6.2",
    "p": 6,
    "t": "Mercado, clientes-alvo e concorrência",
    "d": "Clareza sobre quem é o cliente, por que ele escolhe a empresa e quem disputa o mesmo espaço.",
    "q": [
      "Quem é o cliente ideal e quais segmentos dão mais lucro, não só mais volume?",
      "Por que o cliente compra da empresa e não do concorrente? Isso foi confirmado com clientes ou é percepção?",
      "Que mudanças de mercado (concorrente novo, preço, sazonalidade, regulação) podem afetar os próximos 12 meses?"
    ]
  },
  {
    "id": "7.1",
    "p": 7,
    "t": "Fluxo de caixa e controle financeiro",
    "d": "Previsibilidade do caixa, separação entre empresa e sócios e disciplina nos pagamentos.",
    "q": [
      "Existe projeção de caixa para as próximas semanas e meses, e ela é comparada com o realizado?",
      "As contas da empresa e as dos sócios estão separadas (PJ e PF)?",
      "Quem registra, quem aprova e quem paga? Há separação de funções nos pagamentos?",
      "Em quantos dias o mês fecha (resultado e balancete) e quem lê esses números?"
    ]
  },
  {
    "id": "7.2",
    "p": 7,
    "t": "Custos, margem e preço",
    "d": "Se a empresa sabe onde ganha e onde perde dinheiro e como forma o preço.",
    "q": [
      "A empresa conhece a margem por produto, serviço ou cliente, ou só o resultado geral?",
      "Como o preço é definido: custo mais margem, concorrência ou intuição? Quando foi revisado pela última vez?",
      "Quais custos fixos mais cresceram nos últimos 12 meses e por quê?"
    ]
  },
  {
    "id": "7.3",
    "p": 7,
    "t": "Crédito, endividamento e inadimplência",
    "d": "Peso das dívidas no caixa, risco de vender a prazo e dependência de crédito para fechar o mês.",
    "q": [
      "Qual o total de dívidas, prazos e custo, e quanto do caixa mensal elas consomem?",
      "Qual a fatia de vendas a prazo e a inadimplência, e quem cobra?",
      "A empresa depende de um único banco, de capital de giro ou de antecipação de recebíveis para fechar o mês?"
    ]
  },
  {
    "id": "8.1",
    "p": 8,
    "t": "Carteira de clientes e concentração",
    "d": "Quão distribuída e conhecida é a base de clientes e quanto a receita depende de poucos.",
    "q": [
      "Quantos clientes respondem por metade do faturamento? A perda do maior seria suportável?",
      "Existe cadastro de clientes atualizado, com histórico de compras, fora da cabeça do vendedor?",
      "Qual a taxa de clientes que voltam a comprar e quanto custa conquistar um novo?"
    ]
  },
  {
    "id": "8.2",
    "p": 8,
    "t": "Processo comercial e pós-venda",
    "d": "Como nasce uma venda, como é conduzida e o que acontece depois do fechamento.",
    "q": [
      "Como surge uma venda: indicação, prospecção ativa, anúncio? Isso é medido?",
      "Há etapas definidas de atendimento, proposta e fechamento, e se acompanha o que foi perdido e por quê?",
      "O que acontece após a venda (entrega, garantia, reclamação, assistência) e a satisfação é medida?"
    ]
  },
  {
    "id": "9.1",
    "p": 9,
    "t": "Processos principais e padronização",
    "d": "Se o trabalho que gera dinheiro (ou problema) está descrito, tem dono e roda sem improviso.",
    "q": [
      "Quais são os 3 a 5 processos que mais geram receita ou problema, e eles estão descritos?",
      "Onde ocorrem os maiores retrabalhos, atrasos ou erros, e quanto custam?",
      "Cada etapa tem responsável e prazo, e o dono fica sabendo de atrasos sem precisar perguntar?"
    ]
  },
  {
    "id": "9.2",
    "p": 9,
    "t": "Compras, estoque e fornecedores",
    "d": "Disciplina para comprar, controlar o que está em estoque e depender menos de poucos fornecedores.",
    "q": [
      "Como se decide o que e quanto comprar? Há estoque parado ou falta frequente?",
      "O estoque físico bate com o sistema? Quando foi o último inventário e qual a diferença encontrada?",
      "Quais fornecedores são críticos, existe alternativa e as condições (preço e prazo) são comparadas?"
    ]
  },
  {
    "id": "10.1",
    "p": 10,
    "t": "Estrutura, papéis e liderança",
    "d": "Se as responsabilidades são claras e se a empresa funciona sem depender de decisões do dono em tudo.",
    "q": [
      "Existe organograma com responsabilidades claras, ou cada pessoa faz de tudo um pouco?",
      "Quantas decisões do dia a dia dependem do dono? O que para se ele ficar 15 dias fora?",
      "Como se contrata, treina e avalia a equipe? Qual a rotatividade nos últimos 12 meses?"
    ]
  },
  {
    "id": "10.2",
    "p": 10,
    "t": "Obrigações legais, fiscais e trabalhistas",
    "d": "Situação regular perante o fisco, a lei trabalhista e os contratos.",
    "q": [
      "Impostos, certidões, alvarás e licenças estão em dia, e quem controla os vencimentos?",
      "O regime tributário foi revisado nos últimos anos por quem entende do assunto? Há passivos fiscais ou trabalhistas conhecidos?",
      "Contratos com clientes, fornecedores e funcionários estão formalizados, guardados e com prazos de renovação controlados?"
    ]
  }
]

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

// Maturidade de 0 a 5 por item (escala do Assessment de TI 2023). null = ainda não avaliada.
export const MATURITY = [
  { k: 0, l: '0 · Inexistente', d: 'Não existe, ou ninguém sabe dizer.' },
  { k: 1, l: '1 · Inicial', d: 'Existe de forma informal, depende de uma pessoa, sem registro.' },
  { k: 2, l: '2 · Repetível', d: 'É feito com alguma regularidade, mas sem documentação nem revisão.' },
  { k: 3, l: '3 · Definido', d: 'Há processo documentado e responsável definido.' },
  { k: 4, l: '4 · Gerenciado', d: 'É medido e revisado periodicamente, com evidências.' },
  { k: 5, l: '5 · Otimizado', d: 'Melhoria contínua, testado e auditável.' },
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
  maturity: null, evidStatus: 'nao_solicitada', respostas: {},
}

export const labelOf = (arr, k) => (arr.find((x) => x.k === k) || {}).l || ''
export const stIdx = (k) => Math.max(0, STATUS.findIndex((s) => s.k === k))
export const rkKey = (k) => (RISK.some((r) => r.k === k) ? k : 'sem')
export const mtKey = (v) => (Number.isInteger(v) && v >= 0 && v <= 5 ? v : null)
export const evKey = (k) => (EVID.some((e) => e.k === k) ? k : 'nao_solicitada')
export const rkRank = (k) => RISK.findIndex((r) => r.k === k)
