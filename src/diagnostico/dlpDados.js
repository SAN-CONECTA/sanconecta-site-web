// Levantamento DLP (roteiro de reunião comercial — DLP Safetica). Chaves fixas: nunca renomear nem remover
// (as regras do Firestore aceitam só as chaves geradas daqui, e dados já gravados continuam válidos).
// Tipos: text/long (livres), num (texto curto numérico), multi (várias marcações, gravado "a,b,c"), radio (uma opção),
// canal (usa? + prioridade + observação), pend (responsável + prazo).
// obs: true => campo "Observação" abaixo da marcação (chave `<k>_o`). Toda pergunta marcável tem "Validar com a SAN" (chave `<k>_v`).
// `interno` = textos de condução só para a equipe SAN (nunca exibidos ao cliente).

export const DLP_PRIORIDADE = [
  ['alta', 'Alta'],
  ['media', 'Média'],
  ['baixa', 'Baixa'],
  ['nao', 'Não se aplica'],
]

export const SN = [
  ['sim', 'Sim'],
  ['nao', 'Não'],
  ['naosei', 'Não sei'],
]
const NS = ['naosei', 'Não sei']
const OUT = ['outro', 'Outro']

const CATEGORIAS = [
  ['pessoais', 'Dados pessoais de clientes e funcionários'],
  ['contratos', 'Contratos e documentos jurídicos'],
  ['financeiro', 'Informações financeiras e bancárias'],
  ['projetos', 'Projetos, desenhos técnicos e propriedade intelectual'],
  ['comercial', 'Propostas comerciais, preços e carteira de clientes'],
  ['outros', 'Outros documentos confidenciais'],
]
const SETORES = [
  ['financeiro', 'Financeiro / Contabilidade'],
  ['rh', 'RH / Departamento pessoal'],
  ['juridico', 'Jurídico'],
  ['comercial', 'Comercial / Vendas'],
  ['engenharia', 'Engenharia / Projetos'],
  ['diretoria', 'Diretoria'],
  ['ti', 'TI'],
  ['operacoes', 'Produção / Operações'],
  ['compras', 'Compras / Suprimentos'],
  ['atendimento', 'Atendimento / Suporte'],
  OUT,
]

export const DLP_PLATAFORMAS = [
  ['google', 'Google Workspace (Gmail e Google Drive)'],
  ['m365', 'Microsoft 365 (Exchange Online, OneDrive, SharePoint e Teams)'],
  ['exchange', 'Exchange / e-mail em servidor próprio'],
  ['arquivos', 'Servidor de arquivos ou NAS local'],
  ['dropbox', 'Dropbox / Box'],
  ['zoho', 'Zoho Workplace'],
  ['hospedagem', 'E-mail de provedor de hospedagem (Locaweb, UOL, cPanel…)'],
  ['outra', 'Outra / ambiente local'],
  NS,
]

export const DLP_MODOS = [
  ['monitorar', 'Somente monitorar', 'Registrar eventos para compreender os fluxos reais.'],
  ['alertar', 'Monitorar e alertar', 'Registrar eventos e notificar os responsáveis definidos.'],
  ['bloquear', 'Também bloquear', 'Impedir ações expressamente definidas e tecnicamente suportadas.'],
  ['naosei', 'Ainda não sei', 'A SAN orienta a escolha na reunião.'],
]

export const DLP_CANAIS = [
  ['ca_email', 'E-mail corporativo ou pessoal', 'Há envio externo de anexos? Quais destinatários são autorizados?'],
  ['ca_msg', 'WhatsApp Web, Teams e outros mensageiros', 'São utilizados para compartilhar documentos? Em quais áreas?'],
  ['ca_nuvem', 'Google Drive, OneDrive, SharePoint e nuvem pessoal', 'Quais serviços e contas são corporativos ou permitidos?'],
  ['ca_usb', 'Pendrives e HDs externos', 'O uso é permitido? Existem dispositivos ou setores autorizados?'],
  ['ca_impr', 'Impressão', 'Quais documentos precisam de acompanhamento ou restrição?'],
  ['ca_ia', 'Uploads em sites e ferramentas de inteligência artificial', 'Quais serviços são usados e com quais informações?'],
  ['ca_tela', 'Captura, compartilhamento de tela e área de transferência', 'Essas situações fazem parte da preocupação do cliente?'],
]

export const DLP_PENDENCIAS = [
  ['pe1', 'Confirmar compatibilidade, cobertura e licenciamento'],
  ['pe2', 'Consolidar usuários, endpoints e grupos do piloto'],
  ['pe3', 'Definir regras, exceções e critérios de aceite'],
  ['pe4', 'Apresentar proposta e agendar validação técnica'],
]

const T = (k, t) => ({ k, t, tipo: 'text', semv: true })
const L = (k, t) => ({ k, t, tipo: 'long' })
const M = (k, t, opc, obs = false) => ({ k, t, tipo: 'multi', opc, obs })
const R = (k, t, opc, obs = false) => ({ k, t, tipo: 'radio', opc, obs })
const Y = (k, t, obs = true) => R(k, t, SN, obs)

export const DLP_SECOES = [
  {
    id: 's1',
    t: '1. Identificação e abertura',
    interno: ['Abertura sugerida: “Vamos entender quais informações precisam de proteção, por onde elas são compartilhadas e como funciona o ambiente. Com isso, definiremos um escopo inicial de DLP, sem comprometer as atividades legítimas da empresa.”'],
    grupos: [
      {
        t: 'Identificação',
        campos: [
          T('id_empresa', 'Empresa / unidade'),
          T('id_data', 'Data e horário'),
          L('id_part', 'Participantes e respectivas áreas'),
          T('id_resp', 'Responsável comercial / técnico'),
          T('id_patroc', 'Patrocinador e responsável pela decisão'),
        ],
      },
      {
        t: 'Motivação e expectativa',
        campos: [
          M('mo_motivo', 'O que motivou a busca por DLP neste momento?', [
            ['incidente', 'Incidente ou suspeita de vazamento'],
            ['contrato', 'Exigência de cliente, contrato ou seguradora'],
            ['pi', 'Proteger propriedade intelectual e projetos'],
            ['desligado', 'Saída de colaboradores com acesso a dados'],
            ['maturidade', 'Elevar a maturidade de segurança'],
            ['auditoria', 'Auditoria ou certificação'],
            OUT, NS,
          ], true),
          Y('mo_incid', 'Houve incidente ou suspeita de vazamento? (descreva dado e canal na observação)'),
          M('mo_risco', 'Qual risco deve ser tratado primeiro?', [
            ['email', 'Envio por e-mail'],
            ['nuvem', 'Nuvem pessoal'],
            ['usb', 'Pendrive / HD externo'],
            ['msg', 'Mensageiros (WhatsApp, Teams)'],
            ['ia', 'Ferramentas de IA e uploads em sites'],
            ['desligado', 'Cópia por quem está de saída'],
            ['impressao', 'Impressão'],
            OUT, NS,
          ], true),
          M('mo_sucesso', 'O que caracterizaria um projeto bem-sucedido em 90 dias?', [
            ['visibilidade', 'Enxergar para onde os dados vão'],
            ['incidentes', 'Reduzir incidentes'],
            ['bloqueio', 'Bloquear saídas não autorizadas'],
            ['relatorio', 'Relatórios compreensíveis para a gestão'],
            ['piloto', 'Piloto aprovado e pronto para ampliar'],
            OUT, NS,
          ], true),
          R('mo_prazo', 'Existe prazo para implantação?', [['30', 'Até 30 dias'], ['90', 'De 31 a 90 dias'], ['180', 'De 91 a 180 dias'], ['sem', 'Sem prazo definido'], NS], true),
          R('mo_invest', 'Há orçamento previsto? (informe a faixa na observação)', [['definido', 'Orçamento definido'], ['definicao', 'Em definição'], ['nao', 'Ainda não definido'], NS], true),
          R('mo_prior', 'Prioridade do projeto (resultado esperado na observação)', [['alta', 'Alta'], ['media', 'Média'], ['baixa', 'Baixa'], NS], true),
        ],
      },
    ],
  },
  {
    id: 's2',
    t: '2. Dados a proteger',
    lead: 'Quais informações causariam prejuízo à empresa se fossem compartilhadas sem autorização?',
    interno: ['Saída deste bloco: categorias prioritárias, localização dos dados e grupos envolvidos. O aproveitamento de rótulos e os métodos de detecção deverão ser confirmados tecnicamente.'],
    grupos: [
      {
        t: 'Categorias',
        campos: [
          { k: 'da_cat', t: 'Marque as categorias aplicáveis', tipo: 'multi', opc: CATEGORIAS },
          { k: 'da_pri', t: 'Indique as prioritárias', tipo: 'multi', opc: CATEGORIAS },
          T('da_outros', 'Outros documentos confidenciais (quais?)'),
        ],
      },
      {
        t: 'Aprofundamento',
        campos: [
          M('da_setores', 'Quais setores utilizam as categorias prioritárias?', SETORES, true),
          M('da_onde', 'Onde esses dados ficam?', [
            ['servidor', 'Servidor de arquivos / NAS'],
            ['onedrive', 'OneDrive / SharePoint'],
            ['gdrive', 'Google Drive'],
            ['email', 'E-mail'],
            ['erp', 'ERP / CRM'],
            ['local', 'Computadores locais'],
            ['pessoal', 'Nuvem pessoal'],
            ['whatsapp', 'WhatsApp'],
            OUT, NS,
          ], true),
          R('da_acesso', 'Quem pode compartilhar esses dados externamente?', [
            ['gestores', 'Só diretoria e gestores'],
            ['setores', 'Apenas setores específicos'],
            ['todos', 'Qualquer colaborador'],
            NS,
          ], true),
          R('da_class', 'Existem classificações (Público, Interno, Confidencial) ou rótulos, como no Microsoft Purview?', [
            ['formal', 'Sim, com rótulos aplicados'],
            ['informal', 'Existe, mas é informal'],
            ['nao', 'Não existe'],
            NS,
          ], true),
          M('da_padroes', 'Existem padrões identificáveis nos documentos?', [
            ['cpf', 'CPF'],
            ['cnpj', 'CNPJ'],
            ['bancario', 'Dados bancários / cartão'],
            ['projeto', 'Códigos de projeto'],
            ['contrato', 'Números de contrato'],
            ['palavra', 'Palavras-chave (ex.: “confidencial”)'],
            OUT, NS,
          ], true),
          M('da_formatos', 'Quais formatos precisam de atenção?', [
            ['planilha', 'Planilhas'],
            ['pdf', 'PDF'],
            ['word', 'Documentos de texto'],
            ['dwg', 'DWG / CAD'],
            ['imagem', 'Imagens'],
            ['codigo', 'Código-fonte'],
            ['banco', 'Bancos de dados'],
            NS,
          ], true),
        ],
      },
    ],
  },
  {
    id: 's3',
    t: '3. Canais de saída',
    lead: 'Por quais meios precisamos acompanhar ou restringir o compartilhamento de informações confidenciais?',
    interno: ['Atenção: levantar um canal não significa confirmar sua cobertura. Cada controle deverá ser validado por aplicação, sistema operacional, versão e licenciamento.'],
    grupos: [
      { t: 'Canal a avaliar', campos: DLP_CANAIS.map(([k, t, q]) => ({ k, t, q, tipo: 'canal' })) },
      {
        t: 'Fluxos legítimos',
        campos: [
          Y('ca_legit', 'Existem compartilhamentos legítimos que não podem ser interrompidos? (descreva na observação)'),
          M('ca_parc', 'Quais parceiros e destinos devem ser autorizados?', [
            ['contador', 'Escritório de contabilidade'],
            ['clientes', 'Clientes'],
            ['fornecedores', 'Fornecedores'],
            ['parceiros', 'Parceiros comerciais'],
            ['bancos', 'Bancos e órgãos públicos'],
            OUT, NS,
          ], true),
          Y('ca_exc', 'Existem exceções por setor? (ex.: propostas pelo comercial, projetos para fornecedores)'),
          L('ca_fluxos', 'Fluxos legítimos e exceções identificadas'),
        ],
      },
    ],
  },
  {
    id: 's4',
    t: '4. Ambiente técnico',
    lead: 'Qual plataforma a empresa utiliza para e-mail, arquivos e colaboração?',
    interno: ['Validação obrigatória: confirmar a cobertura contratada da Safetica para Microsoft 365 e Google Drive, distinguindo integração de nuvem e proteção de endpoint. Não presumir suporte equivalente para Gmail, Teams, dispositivos móveis ou todos os sistemas operacionais. Controle de tráfego de rede não deve ser presumido como parte do escopo.'],
    grupos: [
      {
        t: 'Plataforma e sistemas',
        campos: [
          M('am_plat', 'Plataformas de e-mail, arquivos e colaboração (marque todas que usa)', DLP_PLATAFORMAS),
          T('am_outra', 'Outra / ambiente local (qual?)'),
          M('am_sist', 'Sistemas de gestão onde ficam os dados', [
            ['protheus', 'TOTVS (Protheus, RM, Datasul)'],
            ['sap', 'SAP (Business One, S/4HANA)'],
            ['senior', 'Senior'],
            ['sankhya', 'Sankhya'],
            ['omie', 'Omie / Bling / Conta Azul'],
            ['zoho', 'Zoho (CRM, Books…)'],
            ['salesforce', 'Salesforce / HubSpot'],
            ['dynamics', 'Microsoft Dynamics'],
            ['proprio', 'Sistema próprio'],
            OUT, NS,
          ], true),
          M('am_plano', 'Plano ou licenciamento contratado', [
            ['g_biz', 'Google Workspace Business (Starter, Standard, Plus)'],
            ['g_ent', 'Google Workspace Enterprise'],
            ['m_bb', 'Microsoft 365 Business Basic / Standard'],
            ['m_bp', 'Microsoft 365 Business Premium'],
            ['m_e', 'Microsoft 365 E3 / E5'],
            ['gratis', 'Contas gratuitas ou pessoais'],
            NS,
          ], true),
        ],
      },
      {
        t: 'Levantamento técnico',
        campos: [
          R('am_usuarios', 'Quantos usuários entrarão no projeto? (nº exato e do piloto na observação)', [['25', 'Até 25'], ['50', '26 a 50'], ['100', '51 a 100'], ['250', '101 a 250'], ['mais', 'Mais de 250'], NS], true),
          M('am_so', 'Sistemas operacionais utilizados', [
            ['win', 'Windows 10 / 11'],
            ['winsrv', 'Windows Server'],
            ['mac', 'macOS'],
            ['linux', 'Linux'],
            ['android', 'Android'],
            ['ios', 'iOS'],
            NS,
          ], true),
          M('am_equip', 'Perfil dos equipamentos', [
            ['corp', 'Corporativos'],
            ['byod', 'Pessoais (BYOD)'],
            ['moveis', 'Celulares e tablets entram no escopo'],
            NS,
          ], true),
          R('am_remoto', 'Há trabalho remoto, com equipamentos fora da rede corporativa?', [['nao', 'Não'], ['parte', 'Sim, parte da equipe'], ['maioria', 'Sim, a maioria'], NS], true),
          M('am_serv', 'Onde há dados fora da nuvem?', [
            ['servidor', 'Servidor de arquivos'],
            ['nas', 'NAS'],
            ['erp', 'ERP em servidor local'],
            ['legado', 'Sistemas legados'],
            ['pcs', 'Somente nos computadores'],
            ['nenhum', 'Nenhum'],
            NS,
          ], true),
          M('am_dir', 'Diretório de usuários', [
            ['ad', 'Active Directory'],
            ['entra', 'Microsoft Entra ID'],
            ['gdir', 'Google Directory'],
            ['nenhum', 'Nenhum'],
            NS,
          ], true),
          M('am_agentes', 'Como os agentes serão instalados?', [
            ['intune', 'Microsoft Intune'],
            ['gpo', 'GPO (Active Directory)'],
            ['rmm', 'Ferramenta de gestão remota (RMM)'],
            ['manual', 'Instalação manual'],
            NS,
          ], true),
          M('am_seg', 'Soluções de segurança já implantadas', [
            ['defender', 'Microsoft Defender'],
            ['crowdstrike', 'CrowdStrike'],
            ['eset', 'ESET'],
            ['kaspersky', 'Kaspersky'],
            ['sophos', 'Sophos'],
            ['trend', 'Trend Micro'],
            ['bitdefender', 'Bitdefender'],
            ['mdm', 'MDM (Intune, Workspace ONE, Jamf)'],
            ['dlp', 'Já existe alguma solução de DLP'],
            ['nenhum', 'Nenhuma'],
            OUT, NS,
          ], true),
          M('am_autoriza', 'Quem autoriza integrações, permissões administrativas e instalação dos agentes?', [
            ['ti', 'TI interna'],
            ['terceiro', 'Prestador de TI terceirizado'],
            ['diretoria', 'Diretoria / sócio'],
            ['compliance', 'Jurídico / compliance'],
            NS,
          ], true),
          L('am_registro', 'Registro técnico e restrições'),
        ],
      },
    ],
  },
  {
    id: 's5',
    t: '5. Política de resposta e modo de atuação',
    lead: 'Na etapa inicial, a empresa quer apenas enxergar o que acontece ou também impedir ações?',
    interno: ['Orientação: preferir monitoramento inicial para ajustar regras antes de ampliar bloqueios. A duração será acordada conforme risco e resultados, sem prazo automático.'],
    grupos: [
      { t: 'Modo de atuação', campos: [{ k: 'po_modo', t: 'Modo de atuação na etapa inicial', tipo: 'radio', opc: DLP_MODOS.map((m) => [m[0], m[1], m[2]]), obs: true }] },
      {
        t: 'Resposta e exceções',
        campos: [
          M('po_bloq', 'Quais ações poderiam ser bloqueadas sem interromper processos essenciais?', [
            ['email', 'Envio externo por e-mail'],
            ['usb', 'Cópia para pendrive / HD externo'],
            ['nuvem', 'Upload em nuvem pessoal'],
            ['ia', 'Upload em sites e IA'],
            ['impressao', 'Impressão'],
            ['tela', 'Captura de tela'],
            ['nenhuma', 'Nenhuma por enquanto'],
            NS,
          ], true),
          R('po_justif', 'Haverá justificativa do usuário ou liberação excepcional?', [['usuario', 'Sim, o usuário justifica'], ['gestor', 'Sim, o gestor libera'], ['nao', 'Não é necessário'], NS], true),
          M('po_quem', 'Quem receberá alertas, investigará eventos e aprovará exceções?', [
            ['ti', 'TI interna'],
            ['gestor', 'Gestor da área'],
            ['diretoria', 'Diretoria'],
            ['compliance', 'Jurídico / compliance'],
            ['terceiro', 'Prestador de TI terceirizado'],
            ['san', 'SAN'],
            NS,
          ], true),
          R('po_prazo', 'Prazo de atendimento dos alertas (validade das exceções na observação)', [['dia', 'No mesmo dia'], ['24h', 'Até 24 horas'], ['3d', 'Até 3 dias úteis'], ['sem', 'Sem prazo definido'], NS], true),
          R('po_falsos', 'Tolerância a falsos positivos', [
            ['baixa', 'Baixa: prefere menos alertas'],
            ['media', 'Média'],
            ['alta', 'Alta: aceita muitos alertas no início para ajustar as regras'],
            NS,
          ], true),
          M('po_relat', 'Quais relatórios e indicadores serão apresentados aos gestores?', [
            ['resumo', 'Resumo executivo mensal'],
            ['usuario', 'Eventos por usuário'],
            ['canal', 'Eventos por canal'],
            ['bloqueios', 'Tentativas bloqueadas'],
            ['dados', 'Dados mais movimentados'],
            NS,
          ], true),
        ],
      },
    ],
  },
  {
    id: 's6',
    t: '6. Responsáveis e alinhamento interno',
    interno: [],
    grupos: [
      {
        t: 'Responsáveis',
        campos: [
          T('re_patroc', 'Quem patrocina o projeto e decide sobre bloqueios com impacto operacional?'),
          M('re_gestores', 'Quais áreas participarão da validação das regras?', SETORES, true),
          M('re_comunica', 'Quem comunicará aos colaboradores o funcionamento do monitoramento?', [
            ['rh', 'RH'],
            ['ti', 'TI'],
            ['diretoria', 'Diretoria'],
            ['san', 'SAN apoia a comunicação'],
            NS,
          ], true),
          R('re_politica', 'Existe política interna de uso de dispositivos e informações?', [['formal', 'Sim, formalizada'], ['informal', 'Existe, mas informal'], ['nao', 'Não existe'], NS], true),
          M('re_admin', 'Quem poderá administrar a solução, consultar eventos e exportar relatórios?', [
            ['ti', 'TI interna'],
            ['terceiro', 'Prestador de TI terceirizado'],
            ['san', 'SAN'],
            ['diretoria', 'Diretoria'],
            ['compliance', 'Jurídico / compliance'],
            NS,
          ], true),
          R('re_retencao', 'Por quanto tempo os registros deverão permanecer disponíveis?', [['30', '30 dias'], ['90', '90 dias'], ['180', '6 meses'], ['365', '1 ano ou mais'], NS], true),
          L('re_definidos', 'Responsáveis definidos'),
        ],
      },
    ],
  },
  {
    id: 's7',
    t: '7. Piloto, pendências e próximos passos',
    lead: 'Definir setor piloto, usuários, equipamentos, dados de teste e cenários permitidos e proibidos. Avaliar detecção, alertas, falsos positivos, desempenho e continuidade dos fluxos legítimos. Registrar critérios mensuráveis antes do início.',
    interno: ['Fechamento sugerido: “Vamos consolidar prioridades, validar a cobertura técnica e apresentar o escopo do piloto. A expansão e os bloqueios serão definidos a partir dos resultados e da aprovação dos responsáveis.”'],
    grupos: [
      {
        t: 'Piloto',
        campos: [
          M('pi_piloto', 'Qual setor fará o piloto? (usuários, equipamentos e cenários permitidos e proibidos na observação)', SETORES, true),
          M('pi_criterios', 'Critérios para avaliar o piloto', [
            ['eventos', 'Detectar os eventos esperados'],
            ['falsos', 'Taxa de falsos positivos aceitável'],
            ['desempenho', 'Sem impacto no desempenho dos equipamentos'],
            ['fluxos', 'Fluxos legítimos preservados'],
            ['relatorio', 'Relatório compreensível pela gestão'],
            ['aprovacao', 'Aprovação do patrocinador'],
            NS,
          ], true),
        ],
      },
      { t: 'Entregas e pendências', campos: DLP_PENDENCIAS.map(([k, t]) => ({ k, t, tipo: 'pend' })) },
      {
        t: 'Fechamento',
        campos: [
          L('pi_resumo', 'Resumo do escopo acordado'),
          L('pi_fora', 'Itens fora do escopo ou ainda não confirmados'),
          T('pi_proxima', 'Próxima reunião: data, participantes e objetivo'),
        ],
      },
    ],
  },
]

export const DLP_INTERNO_GERAL = [
  'Objetivo: identificar os dados que precisam de proteção, os canais de saída, o ambiente técnico e o modo de atuação desejado para dimensionar a proposta e a prova de conceito (PoC). O foco é a aplicação prática do DLP, sem enquadramento em LGPD.',
  'Duração sugerida: 45 a 60 minutos. Utilize as perguntas como guia, registre as respostas e sinalize o que depender de validação técnica.',
]

// Chaves reais gravadas por campo (usadas pelas regras, pela tela, pelo log e pela Avaliação).
export function chavesDoCampo(c) {
  const k = c.k
  let ks
  if (c.tipo === 'canal') {
    ks = [
      { key: `${k}_u`, max: 40, nome: `${c.t} (usa o canal?)`, opc: SN },
      { key: `${k}_p`, max: 20, nome: `${c.t} (prioridade)`, opc: DLP_PRIORIDADE },
      { key: `${k}_r`, max: 2000, nome: `${c.t} (observação)` },
    ]
  } else if (c.tipo === 'pend') {
    ks = [{ key: `${k}_resp`, max: 200, nome: `${c.t} (responsável)` }, { key: `${k}_prazo`, max: 200, nome: `${c.t} (prazo)` }]
  } else if (c.tipo === 'long') {
    ks = [{ key: k, max: 2000, nome: c.t }]
  } else if (c.tipo === 'multi') {
    ks = [{ key: k, max: 300, nome: c.t, opc: c.opc, multi: true }]
  } else if (c.tipo === 'radio') {
    ks = [{ key: k, max: 40, nome: c.t, opc: c.opc }]
  } else {
    ks = [{ key: k, max: 200, nome: c.t }]
  }
  if (c.obs) ks.push({ key: `${k}_o`, max: 2000, nome: `${c.t} (observação)` })
  if (c.tipo !== 'pend' && !c.semv && c.tipo !== 'long') ks.push({ key: `${k}_v`, max: 1, nome: `${c.t} (validar com a SAN)`, flag: true })
  return ks
}

export const DLP_CHAVES = DLP_SECOES.flatMap((s) => s.grupos.flatMap((g) => g.campos.flatMap((c) => chavesDoCampo(c).map((x) => ({ ...x, secao: s.id, secaoTitulo: s.t })))))
export const DLP_CHAVE_POR_NOME = Object.fromEntries(DLP_CHAVES.map((x) => [`${x.secao}.${x.key}`, x]))
// Opções por chave (para a Avaliação e o log): { chave: [[valor, rótulo], …] }
export const DLP_OPC = Object.fromEntries(DLP_CHAVES.filter((x) => x.opc).map((x) => [x.key, x.opc]))
