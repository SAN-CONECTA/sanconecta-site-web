// Modelo fixo do diagnóstico (v1.0): 5 pilares e 19 itens com perguntas-guia.
// Os ids dos itens ("1.1" a 5.3) também são validados nas regras do Firestore.
export const PILLARS = [
  {
    "id": 1,
    "n": "Infraestrutura, redes e servidores",
    "t": "Run & hardware"
  },
  {
    "id": 2,
    "n": "Sistemas, aplicações e banco de dados",
    "t": "Plataformas"
  },
  {
    "id": 3,
    "n": "Continuidade, proteção de dados e contingência",
    "t": "Sustentação"
  },
  {
    "id": 4,
    "n": "Pessoas, processos e conhecimento tácito",
    "t": "Fator humano"
  },
  {
    "id": 5,
    "n": "Escala e alinhamento estratégico",
    "t": "Previsibilidade e escala"
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
      "Garantia e suporte do fabricante estão vigentes?"
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
      "A rede de dados está segmentada em VLANs?"
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
      "Como a nuvem se conecta ao ambiente local?"
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
      "Quais certificados e credenciais vencem nos próximos 90 dias?"
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
      "Quando foi o último teste de vulnerabilidade e como se trata um vazamento?"
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
      "A liderança enxerga o volume real de problemas?"
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

export const BLANK = { status: 'nao_iniciado', risk: 'sem', owner: '', due: '', findings: '', evidence: '', reco: '' }

export const labelOf = (arr, k) => (arr.find((x) => x.k === k) || {}).l || ''
export const stIdx = (k) => Math.max(0, STATUS.findIndex((s) => s.k === k))
export const rkKey = (k) => (RISK.some((r) => r.k === k) ? k : 'sem')
export const rkRank = (k) => RISK.findIndex((r) => r.k === k)
