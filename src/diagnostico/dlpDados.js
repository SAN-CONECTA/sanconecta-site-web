// Levantamento DLP (roteiro de reunião comercial — DLP Safetica). Chaves fixas: nunca renomear nem reaproveitar.
// Tipos: text (curto), long (parágrafo), multi (várias marcações, gravado como "a,b,c"), radio (uma opção), canal (prioridade + resposta).
// `interno` = textos de condução só para a equipe SAN (nunca exibidos ao cliente).

export const DLP_PRIORIDADE = [
  ['alta', 'Alta'],
  ['media', 'Média'],
  ['baixa', 'Baixa'],
  ['nao', 'Não se aplica'],
]

const CATEGORIAS = [
  ['pessoais', 'Dados pessoais de clientes e funcionários'],
  ['contratos', 'Contratos e documentos jurídicos'],
  ['financeiro', 'Informações financeiras e bancárias'],
  ['projetos', 'Projetos, desenhos técnicos e propriedade intelectual'],
  ['comercial', 'Propostas comerciais, preços e carteira de clientes'],
  ['outros', 'Outros documentos confidenciais'],
]

export const DLP_PLATAFORMAS = [
  ['google', 'Google Workspace (Gmail e Google Drive)'],
  ['m365', 'Microsoft 365 (Exchange Online, OneDrive, SharePoint e Teams)'],
  ['ambas', 'Ambas'],
  ['outra', 'Outra / ambiente local'],
]

export const DLP_MODOS = [
  ['monitorar', 'Somente monitorar', 'Registrar eventos para compreender os fluxos reais.'],
  ['alertar', 'Monitorar e alertar', 'Registrar eventos e notificar os responsáveis definidos.'],
  ['bloquear', 'Também bloquear', 'Impedir ações expressamente definidas e tecnicamente suportadas.'],
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

const L = (k, t) => ({ k, t, tipo: 'long' })
const T = (k, t) => ({ k, t, tipo: 'text' })

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
          L('mo_motivo', 'O que motivou a busca por DLP neste momento?'),
          L('mo_incid', 'Houve incidente ou suspeita de vazamento? Qual dado e canal estiveram envolvidos?'),
          L('mo_risco', 'Qual risco deve ser tratado primeiro?'),
          L('mo_sucesso', 'O que caracterizaria um projeto bem-sucedido em 90 dias?'),
          L('mo_prazo', 'Existe prazo para implantação e faixa de investimento prevista?'),
          L('mo_prior', 'Prioridade e resultado esperado'),
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
          L('da_setores', 'Quais categorias são prioritárias e quais setores as utilizam?'),
          L('da_onde', 'Onde ficam: servidor de arquivos, SharePoint, OneDrive, Google Drive, ERP, CRM, e-mail ou computadores?'),
          L('da_acesso', 'Quem pode acessar e compartilhar externamente?'),
          L('da_class', 'Existem classificações como Público, Interno e Confidencial ou rótulos do Microsoft Purview?'),
          L('da_padroes', 'Existem padrões identificáveis, como CPF, CNPJ, dados bancários, códigos de projeto ou palavras-chave?'),
          L('da_formatos', 'Quais formatos precisam de atenção: planilhas, PDF, DWG, imagens ou código-fonte?'),
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
          L('ca_legit', 'Quais compartilhamentos são legítimos e não podem ser interrompidos?'),
          L('ca_parc', 'Quais parceiros, domínios, aplicativos e destinos devem ser autorizados?'),
          L('ca_exc', 'Existem exceções por setor, como envio de propostas pelo comercial ou projetos para fornecedores?'),
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
        t: 'Plataforma',
        campos: [
          { k: 'am_plat', t: 'Plataforma de e-mail, arquivos e colaboração', tipo: 'multi', opc: DLP_PLATAFORMAS },
          T('am_outra', 'Outra / ambiente local (qual?)'),
        ],
      },
      {
        t: 'Levantamento técnico',
        campos: [
          L('am_plano', 'Qual é o plano ou licenciamento contratado em cada plataforma?'),
          L('am_usuarios', 'Quantos usuários e endpoints entrarão no projeto? Quantos participarão do piloto?'),
          L('am_so', 'Quais sistemas operacionais e versões são utilizados: Windows, macOS ou Linux?'),
          L('am_equip', 'Os equipamentos são corporativos, pessoais (BYOD) ou ambos? Existem dispositivos móveis no escopo?'),
          L('am_remoto', 'Há trabalho remoto e equipamentos que permanecem fora da rede corporativa?'),
          L('am_serv', 'Existem servidores de arquivos, sistemas legados ou documentos armazenados localmente?'),
          L('am_dir', 'Utilizam Active Directory, Entra ID ou Google Directory?'),
          L('am_agentes', 'Como são instalados os agentes: Intune, GPO, ferramenta de gestão ou procedimento manual?'),
          L('am_seg', 'Quais soluções de antivírus, EDR, MDM ou DLP já estão implantadas?'),
          L('am_autoriza', 'Quem autoriza integrações, permissões administrativas e instalação dos agentes?'),
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
      {
        t: 'Modo de atuação',
        campos: [{ k: 'po_modo', t: 'Modo de atuação na etapa inicial', tipo: 'radio', opc: DLP_MODOS.map(([v, l, d]) => [v, l, d]) }],
      },
      {
        t: 'Resposta e exceções',
        campos: [
          L('po_bloq', 'Quais ações podem ser bloqueadas sem interromper processos essenciais?'),
          L('po_justif', 'Há necessidade de justificativa do usuário ou liberação excepcional, se o recurso estiver disponível?'),
          L('po_quem', 'Quem receberá os alertas, investigará os eventos e aprovará exceções?'),
          L('po_prazo', 'Qual será o prazo de atendimento e a validade das exceções?'),
          L('po_falsos', 'Qual tolerância a falsos positivos será aceita?'),
          L('po_relat', 'Quais relatórios e indicadores serão apresentados aos gestores?'),
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
          L('re_patroc', 'Quem patrocina o projeto e decide sobre bloqueios com impacto operacional?'),
          L('re_gestores', 'Quais gestores e áreas participarão da validação das regras?'),
          L('re_comunica', 'Quem comunicará aos colaboradores o funcionamento do monitoramento?'),
          L('re_politica', 'Existe política interna de uso de dispositivos e informações?'),
          L('re_admin', 'Quem poderá administrar a solução, consultar eventos e exportar relatórios?'),
          L('re_retencao', 'Por quanto tempo os registros deverão permanecer disponíveis?'),
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
          L('pi_piloto', 'Setor piloto, usuários, equipamentos, dados de teste e cenários permitidos e proibidos'),
          L('pi_criterios', 'Critérios mensuráveis para avaliar o piloto'),
        ],
      },
      { t: 'Entregas e pendências', campos: DLP_PENDENCIAS.map(([k, t]) => ({ k, t, tipo: 'pend' })) },
      {
        t: 'Fechamento',
        campos: [
          L('pi_resumo', 'Resumo do escopo acordado'),
          L('pi_fora', 'Itens fora do escopo ou ainda não confirmados'),
          L('pi_proxima', 'Próxima reunião — data, participantes e objetivo'),
        ],
      },
    ],
  },
]

// Textos de condução só para a equipe SAN (cabeçalho da aba).
export const DLP_INTERNO_GERAL = [
  'Objetivo: identificar os dados que precisam de proteção, os canais de saída, o ambiente técnico e o modo de atuação desejado para dimensionar a proposta e a prova de conceito (PoC). O foco é a aplicação prática do DLP, sem enquadramento em LGPD.',
  'Duração sugerida: 45 a 60 minutos. Utilize as perguntas como guia, registre as respostas e sinalize o que depender de validação técnica.',
]

// Chaves reais gravadas, por tipo: canal => k_p (prioridade) e k_r (resposta); pend => k_resp e k_prazo.
export function chavesDoCampo(c) {
  if (c.tipo === 'canal') return [{ key: `${c.k}_p`, max: 20, nome: `${c.t} (prioridade)` }, { key: `${c.k}_r`, max: 2000, nome: c.t }]
  if (c.tipo === 'pend') return [{ key: `${c.k}_resp`, max: 200, nome: `${c.t} (responsável)` }, { key: `${c.k}_prazo`, max: 200, nome: `${c.t} (prazo)` }]
  const max = c.tipo === 'long' ? 2000 : c.tipo === 'text' ? 200 : 200
  return [{ key: c.k, max, nome: c.t }]
}

export const DLP_CHAVES = DLP_SECOES.flatMap((s) => s.grupos.flatMap((g) => g.campos.flatMap((c) => chavesDoCampo(c).map((x) => ({ ...x, secao: s.id, secaoTitulo: s.t })))))
export const DLP_CHAVE_POR_NOME = Object.fromEntries(DLP_CHAVES.map((x) => [`${x.secao}.${x.key}`, x]))
