// Diagnóstico rápido GEMI (v1.9): 11 perguntas objetivas ponderadas (nota 0 a 4 x peso) e 4 dissertativas.
// Fonte: documento "GEMI Diagnóstico Maturidade TI, Alinhamento e Gestão". Os códigos (1.1 a 3.5) são fixos e
// são validados nas regras do Firestore (coleção empresas/{id}/gemi/{código}).

export const GEMI_ESCALA = [
  { k: 0, l: 'Inexistente / Caótico', d: 'Não existe processo, controle ou ferramenta. Tudo é feito no improviso.' },
  { k: 1, l: 'Ad-hoc / Reativo', d: "Acontece apenas quando dá problema ('apagar incêndio'). Depende de pessoas específicas, sem documentação." },
  { k: 2, l: 'Definido / Básico', d: 'Existem ferramentas e regras básicas, mas nem sempre são seguidas ou auditadas.' },
  { k: 3, l: 'Gerenciado / Proativo', d: 'Processos padronizados, monitorados por indicadores (KPIs) e com prevenção de falhas.' },
  { k: 4, l: 'Otimizado / Estratégico', d: 'Melhoria contínua, automação, alta previsibilidade e geração direta de valor para o negócio.' },
]

export const GEMI_FASES = [
  {
    "id": 1,
    "n": "Maturidade de TI (infraestrutura, segurança e operação)",
    "o": "Avaliar a estabilidade do ambiente, mitigação de riscos, continuidade de negócios e eficiência do suporte (baseado em COBIT e ITIL).",
    "peso": 40
  },
  {
    "id": 2,
    "n": "Alinhamento entre TI e negócio",
    "o": "Medir se a TI é vista apenas como centro de custo ou como parceira estratégica que impulsiona receitas e reduz custos operacionais (baseado no modelo SAM).",
    "peso": 35
  },
  {
    "id": 3,
    "n": "Maturidade de gestão empresarial",
    "o": "Entender a saúde organizacional do cliente. Empresas sem processos claros ou indicadores financeiros dificilmente extraem valor de ferramentas avançadas de TI.",
    "peso": 25
  }
]

export const GEMI_QUESTOES = [
  {
    "id": "1.1",
    "f": 1,
    "t": "Continuidade e Backup",
    "tipo": "obj",
    "peso": 3,
    "op": [
      "Não existe rotina de backup definida ou os dados ficam apenas nos computadores locais.",
      "Backup manual/esporádico em HD externo ou nuvem gratuita, sem monitoramento.",
      "Backup automático diário (local ou nuvem), mas nunca testamos a restauração na prática.",
      "Backup automático em nuvem/híbrido com monitoramento de falhas e testes ocasionais de restauração.",
      "Backup automático em nuvem/híbrido, cópias imutáveis (anti-ransomware) e testes periódicos documentados de recuperação de desastres (DR)."
    ],
    "p": "Como são realizados os backups dos dados críticos da empresa e como é validada a recuperação?",
    "rev": "Risco existencial. Backup sem teste de restauração equivale a não ter backup."
  },
  {
    "id": "1.2",
    "f": 1,
    "t": "Segurança da Informação e Acessos",
    "tipo": "obj",
    "peso": 3,
    "op": [
      "Sem antivírus gerenciado, todos usam senha compartilhada ou perfil de administrador local.",
      "Antivírus gratuito/básico instalado individualmente e senhas simples sem troca periódica.",
      "Antivírus pago gerenciado e firewall básico, mas sem duplo fator de autenticação (MFA).",
      "Solução EDR/antivírus corporativo, firewall gerenciado, controle de permissões por perfil e MFA nos sistemas críticos.",
      "Segurança em camadas (EDR, Firewall UTM, MFA obrigatório, gestão de vulnerabilidades, políticas de LGPD e treinamento contínuo da equipe)."
    ],
    "p": "Qual o nível de proteção contra ameaças cibernéticas e controle de acessos dos usuários?",
    "rev": "Vulnerabilidade a ataques (ransomware), sequestro de dados e conformidade com a LGPD."
  },
  {
    "id": "1.3",
    "f": 1,
    "t": "Infraestrutura, Rede e Servidores",
    "tipo": "obj",
    "peso": 2,
    "op": [
      "Equipamentos antigos, cabos desorganizados, Wi-Fi doméstico e quedas constantes.",
      "Estrutura funcional no limite, com máquinas lentas e sem documentação da rede.",
      "Rede cabeada/Wi-Fi corporativo e servidor local ou nuvem estruturados, mas sem redundância (link ou energia).",
      "Ambiente organizado (rack estruturado, servidores/nuvem dimensionados, redundância de internet e nobreaks monitorados).",
      "Infraestrutura de alta disponibilidade, monitoramento proativo 24/7 (RMM) e plano de renovação tecnológica contínuo."
    ],
    "p": "Como está estruturado o ambiente físico e lógico (rack/CPD, rede, servidores/nuvem e estações)?",
    "rev": "Gargalos de performance, obsolescência de hardware e desorganização técnica."
  },
  {
    "id": "1.4",
    "f": 1,
    "t": "Suporte Técnico e Operação",
    "tipo": "obj",
    "peso": 2,
    "op": [
      "Não há suporte definido; quando algo para, alguém 'tenta resolver' ou chama um técnico avulso.",
      "Atendimento informal via WhatsApp/ligação, sem registro e sem prazo definido (SLA).",
      "Existe equipe ou empresa de suporte, mas atua apenas de forma reativa ('apagando incêndios').",
      "Sistema de chamados (tickets) implantado, com registro de histórico, priorização e SLAs definidos.",
      "Suporte proativo com indicadores de recorrência, base de conhecimento e prevenção de incidentes antes que afetem o usuário."
    ],
    "p": "Como os problemas e solicitações de TI são atendidos no dia a dia?",
    "rev": "Indica se a TI vive 'apagando incêndios' ou opera com SLA, métricas e base de conhecimento."
  },
  {
    "id": "1.5",
    "f": 1,
    "t": "Gargalos Técnicos e Incidentes Críticos",
    "tipo": "dis",
    "p": "Qual foi o pior problema tecnológico ou parada operacional que a empresa enfrentou nos últimos 12 meses, e o que hoje mais gera lentidão ou reclamação na equipe?",
    "gancho": "Capturar a 'dor latente' e o prejuízo financeiro real já sofrido pelo cliente para ancorar a proposta comercial.",
    "opcoes": [["servidor", "Foi servidor"], ["nobreak", "Foi nobreak"], ["link", "Foi link"], ["outros", "Outros"]]
  },
  {
    "id": "2.1",
    "f": 2,
    "t": "Participação da TI nas Decisões",
    "tipo": "obj",
    "peso": 3,
    "op": [
      "Nunca é envolvida; a TI só descobre depois que o problema já aconteceu.",
      "É chamada na véspera apenas para instalar cabos, computadores ou liberar acessos.",
      "É consultada apenas para cotar equipamentos quando a diretoria já decidiu o que comprar.",
      "Participa do planejamento dos projetos para avaliar viabilidade técnica, segurança e custos antes da execução.",
      "Atua como parceira estratégica, propondo soluções tecnológicas no planejamento anual para gerar vantagem competitiva."
    ],
    "p": "Em que momento a área ou consultoria de TI é envolvida nos novos projetos da empresa (abertura de filiais, novos setores, troca de sistemas)?",
    "rev": "Revela se a TI é avisada antes da expansão ou acionada de última hora quando já há gargalo."
  },
  {
    "id": "2.2",
    "f": 2,
    "t": "Integração de Sistemas e Fluxo de Dados",
    "tipo": "obj",
    "peso": 3,
    "op": [
      "Tudo é controlado em papel ou planilhas isoladas em cada setor.",
      "Existem sistemas diferentes que não se falam; a equipe precisa redigitar dados manualmente.",
      "Há exportação e importação manual de arquivos (CSV/Excel) entre sistemas.",
      "Os sistemas principais (ERP/CRM/Financeiro) são integrados via API ou banco único na maior parte dos processos.",
      "Ecossistema totalmente integrado em tempo real, com dado único e zero retrabalho de digitação."
    ],
    "p": "Como as informações trafegam entre os diferentes sistemas e setores da empresa (Comercial, Operacional, Financeiro)?",
    "rev": "Identifica 'ilhas de informação', planilhas paralelas e lentidão na consolidação de dados."
  },
  {
    "id": "2.3",
    "f": 2,
    "t": "Visão de Investimento e Orçamento de TI",
    "tipo": "obj",
    "peso": 2,
    "op": [
      "Não há verba para TI; só se gasta quando um equipamento queima.",
      "TI é vista estritamente como custo operacional e sempre se escolhe a opção mais barata.",
      "Aprovações acontecem sob demanda, avaliando custo versus benefício básico.",
      "Existe orçamento anual previsto para manutenção, licenciamento e melhorias de TI.",
      "Investimentos em TI são aprovados com base em ROI (retorno sobre investimento), ganho de produtividade e escalabilidade."
    ],
    "p": "Como a diretoria enxerga e aprova os investimentos em tecnologia?",
    "rev": "Avalia a maturidade financeira do decisor ao diferenciar despesa operacional de investimento estratégico."
  },
  {
    "id": "2.4",
    "f": 2,
    "t": "Visão de Futuro e Gargalos de Crescimento",
    "tipo": "dis",
    "p": "Se a empresa dobrasse o volume de vendas ou atendimento nos próximos 6 meses, o que na tecnologia atual seria o primeiro a travar?",
    "gancho": "Fazer o próprio cliente verbalizar onde a limitação tecnológica está travando a escala do faturamento.",
    "opcoes": [
      ["erp", "O sistema de gestão (ERP) ficaria lento ou travaria"],
      ["integracao", "Os sistemas não se integram e a equipe digitaria dados em duplicidade"],
      ["infra", "Servidor ou computadores sem capacidade para mais usuários"],
      ["link", "Internet ou link sem folga para mais demanda"],
      ["seguranca", "Segurança e backup não acompanhariam o volume maior de dados"],
      ["dependencia", "Dependência de poucas pessoas (ou de um técnico) para manter tudo funcionando"],
      ["outros", "Outros (descreva abaixo)"]
    ]
  },
  {
    "id": "2.5",
    "f": 2,
    "t": "Projetos Prioritários do Negócio",
    "tipo": "dis",
    "p": "Quais são os 2 ou 3 projetos ou mudanças mais importantes para o negócio nos próximos 12 meses e como você imagina que a tecnologia poderia acelerar isso?",
    "gancho": "Alinhar o escopo da proposta comercial diretamente com a prioridade número 1 do decisor."
  },
  {
    "id": "3.1",
    "f": 3,
    "t": "Padronização de Processos e Papéis",
    "tipo": "obj",
    "peso": 3,
    "op": [
      "Cada pessoa faz do seu jeito; quando alguém falta ou sai, o trabalho para.",
      "As regras existem apenas na cabeça dos donos ou dos funcionários mais antigos.",
      "Os processos principais são conhecidos, mas há pouca documentação e falhas frequentes na passagem de bastão entre setores.",
      "Processos mapeados, organograma claro e responsabilidades bem definidas por função.",
      "Processos documentados (POPs), auditados periodicamente e otimizados com apoio de ferramentas digitais."
    ],
    "p": "Como estão definidos os processos internos e as responsabilidades de cada cargo na empresa?",
    "rev": "Sem fluxo definido, nenhum sistema funciona bem — evita o erro de 'informatizar o caos'."
  },
  {
    "id": "3.2",
    "f": 3,
    "t": "Tomada de Decisão Baseada em Dados",
    "tipo": "obj",
    "peso": 3,
    "op": [
      "Decisões baseadas puramente na intuição ('feeling') e no saldo bancário do dia.",
      "Relatórios são montados manualmente no fim do mês e frequentemente chegam atrasados ou com divergências.",
      "Acompanha relatórios básicos extraídos do sistema, mas com pouca análise comparativa ou preditiva.",
      "Indicadores-chave (vendas, margem, inadimplência, produtividade) acompanhados semanalmente/mensalmente com dados confiáveis.",
      "Gestão orientada a dados (Data-Driven) com painéis de BI em tempo real, metas desdobradas e análise de tendências."
    ],
    "p": "Como a diretoria acompanha os indicadores de desempenho (KPIs) e toma decisões gerenciais?",
    "rev": "Revela se a gestão opera no 'achismo' ou com indicadores confiáveis (oportunidade direta para BI/ERP)."
  },
  {
    "id": "3.3",
    "f": 3,
    "t": "Gestão Financeira e Custos",
    "tipo": "obj",
    "peso": 2,
    "op": [
      "Mistura de contas pessoais com empresariais ou falta de controle básico de entradas e saídas.",
      "Controle básico de contas a pagar/receber, mas sem visibilidade clara de lucro real ou centros de custo.",
      "Fluxo de caixa e DRE gerencial acompanhados, mas com dificuldade para apurar margem por produto/serviço.",
      "Gestão financeira estruturada com DRE, fluxo de caixa projetado, centros de custo e precificação baseada em margem real.",
      "Planejamento orçamentário rigoroso (Orçado vs. Realizado), controle de indicadores financeiros e previsibilidade de caixa."
    ],
    "p": "Qual o nível de controle financeiro e de rentabilidade da operação?",
    "rev": "Mede a capacidade de orçamento para projetos e a maturidade administrativa da operação."
  },
  {
    "id": "3.4",
    "f": 3,
    "t": "Cultura Organizacional e Rituais de Gestão",
    "tipo": "obj",
    "peso": 2,
    "op": [
      "Não há reuniões de acompanhamento nem metas definidas para as equipes.",
      "Reuniões acontecem apenas quando há crise ou queda brusca nos resultados.",
      "Existem metas gerais da empresa, mas sem acompanhamento individual ou feedback estruturado.",
      "Rituais periódicos de gestão (reuniões semanais/mensais), metas claras por setor e cobrança de planos de ação.",
      "Cultura de alta performance com OKRs/KPIs transparentes, autonomia com responsabilidade e melhoria contínua."
    ],
    "p": "Como funciona a rotina de acompanhamento de metas e liderança entre gestores e equipes?",
    "rev": "Avalia a capacidade da liderança em sustentar mudanças e cobrar a adoção de novos sistemas."
  },
  {
    "id": "3.5",
    "f": 3,
    "t": "Maior Desafio de Gestão Atual",
    "tipo": "dis",
    "p": "Hoje, o que mais consome o tempo estratégico da diretoria no dia a dia que deveria estar rodando de forma autônoma pela equipe ou por sistemas?",
    "gancho": "Identificar o nível de centralização operacional nos sócios — gancho ideal para automação, ERP ou BI."
  }
]
