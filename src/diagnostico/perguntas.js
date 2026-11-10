// Perguntas-guia do Diagnóstico 360°, agrupadas em blocos por item.
// Cada pergunta tem um id fixo (q01...), que é a chave da resposta gravada no banco: NUNCA reutilize nem renumere ids.
// Para incluir pergunta nova, use o próximo id livre do item (sem lacunas obrigatórias); para tirar, apague a pergunta e deixe o id sem uso.
// Blocos (b1...) recebem a nota de maturidade 0 a 5. "n: false" marca bloco de dados levantados, sem nota.
// Os ids de pergunta aceitos nas regras do Firestore vão de q01 a q40; os de bloco, de b1 a b10.

export const PILLAR_TEXT = {
  "1": {
    "n": "Infraestrutura, redes e dispositivos",
    "t": "Fundação tecnológica"
  },
  "2": {
    "n": "Sistemas, aplicações e bancos de dados",
    "t": "Plataformas"
  },
  "3": {
    "n": "Continuidade, proteção de dados e contingência",
    "t": "Sustentação"
  },
  "4": {
    "n": "Pessoas, processos e conhecimento tácito",
    "t": "Fator humano"
  },
  "5": {
    "n": "Escala e alinhamento estratégico",
    "t": "Previsibilidade e escala"
  },
  "6": {
    "n": "Estratégia e resultados",
    "t": "Direção e mercado"
  },
  "7": {
    "n": "Finanças e controle",
    "t": "Caixa e margem"
  },
  "8": {
    "n": "Comercial e clientes",
    "t": "Receita"
  },
  "9": {
    "n": "Operações, compras e estoque",
    "t": "Execução"
  },
  "10": {
    "n": "Pessoas, estrutura e conformidade",
    "t": "Organização"
  }
}

export const ITEMS_RAW = [
  {
    "id": "1.1",
    "p": 1,
    "t": "Servidores físicos e virtualização",
    "d": "Inventário, capacidade, desempenho, redundância, atualização e suporte dos servidores físicos e ambientes virtualizados.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário dos servidores",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quantos servidores físicos existem atualmente?"
          },
          {
            "id": "q02",
            "t": "Para cada servidor físico, qual é:\n- fabricante\n- modelo\n- número de série\n- ano de aquisição\n- idade aproximada\n- localização física?"
          },
          {
            "id": "q03",
            "t": "Qual é a finalidade de cada servidor?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Hardware e armazenamento",
        "n": true,
        "q": [
          {
            "id": "q04",
            "t": "Quantos processadores cada servidor possui?"
          },
          {
            "id": "q05",
            "t": "Qual é o modelo e a quantidade de núcleos dos processadores?"
          },
          {
            "id": "q06",
            "t": "Qual é a quantidade total de memória RAM instalada em cada servidor?"
          },
          {
            "id": "q07",
            "t": "Existe memória RAM disponível para expansão?"
          },
          {
            "id": "q08",
            "t": "Qual é a capacidade total de armazenamento de cada servidor?"
          },
          {
            "id": "q09",
            "t": "Qual tecnologia de armazenamento é utilizada: HDD, SSD, NVMe ou outra?"
          },
          {
            "id": "q10",
            "t": "Existe configuração RAID? Qual nível de RAID é utilizado?"
          },
          {
            "id": "q11",
            "t": "Há discos sobressalentes ou mecanismo de substituição automática em caso de falha?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Virtualização",
        "n": true,
        "q": [
          {
            "id": "q12",
            "t": "Quantos hipervisores existem no ambiente?"
          },
          {
            "id": "q13",
            "t": "Qual hipervisor é utilizado em cada servidor: Hyper-V, VMware, Proxmox ou outro?"
          },
          {
            "id": "q14",
            "t": "Qual é a versão instalada de cada hipervisor?"
          },
          {
            "id": "q15",
            "t": "A licença dos hipervisores está regular e vigente?"
          },
          {
            "id": "q16",
            "t": "Quantas máquinas virtuais existem atualmente?"
          },
          {
            "id": "q17",
            "t": "Qual sistema operacional está instalado em cada máquina virtual?"
          },
          {
            "id": "q18",
            "t": "Qual é a finalidade de cada máquina virtual?"
          },
          {
            "id": "q19",
            "t": "Quais máquinas virtuais executam serviços críticos?"
          },
          {
            "id": "q20",
            "t": "Existe recurso de alta disponibilidade ou migração automática das máquinas virtuais?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Redundância, garantia e suporte",
        "n": true,
        "q": [
          {
            "id": "q21",
            "t": "Existe redundância de fontes de energia nos servidores?"
          },
          {
            "id": "q22",
            "t": "Os servidores estão conectados a circuitos elétricos distintos?"
          },
          {
            "id": "q23",
            "t": "Existem servidores ou componentes sem suporte do fabricante?"
          },
          {
            "id": "q24",
            "t": "Quais servidores estão fora da garantia?"
          },
          {
            "id": "q25",
            "t": "Existe contrato de manutenção preventiva ou suporte técnico?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Capacidade e monitoramento",
        "n": true,
        "q": [
          {
            "id": "q26",
            "t": "Qual é a capacidade total de armazenamento disponível?"
          },
          {
            "id": "q27",
            "t": "Quanto do armazenamento está ocupado atualmente?"
          },
          {
            "id": "q28",
            "t": "Qual é a taxa média de crescimento mensal do armazenamento?"
          },
          {
            "id": "q29",
            "t": "Existe alerta de capacidade, desempenho e falha de hardware?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Sistemas operacionais e serviços críticos",
        "n": true,
        "q": [
          {
            "id": "q30",
            "t": "Os sistemas operacionais dos servidores estão atualizados?"
          },
          {
            "id": "q31",
            "t": "Os sistemas operacionais ainda possuem suporte do fabricante?"
          },
          {
            "id": "q32",
            "t": "Quais serviços críticos dependem de cada servidor?"
          }
        ]
      },
      {
        "id": "b7",
        "t": "Documentação e substituição",
        "n": true,
        "q": [
          {
            "id": "q33",
            "t": "Existe documentação atualizada da configuração dos servidores?"
          },
          {
            "id": "q34",
            "t": "Há procedimento definido para substituição de um servidor com defeito?"
          }
        ]
      }
    ]
  },
  {
    "id": "1.2",
    "p": 1,
    "t": "Ativos de rede e conectividade",
    "d": "Inventário, arquitetura, capacidade, disponibilidade e suporte dos equipamentos de rede e dos links de comunicação.",
    "b": [
      {
        "id": "b1",
        "t": "Switches e topologia",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quais equipamentos de rede existem atualmente?"
          },
          {
            "id": "q02",
            "t": "Quantos switches existem?"
          },
          {
            "id": "q03",
            "t": "Para cada switch, qual é:\n- fabricante\n- modelo\n- versão do firmware\n- quantidade de portas\n- velocidade das portas\n- idade\n- localização?"
          },
          {
            "id": "q04",
            "t": "Existem switches de camada 2 e camada 3?"
          },
          {
            "id": "q05",
            "t": "Os switches possuem capacidade suficiente para o crescimento previsto?"
          },
          {
            "id": "q06",
            "t": "Existem portas disponíveis para novas conexões?"
          },
          {
            "id": "q07",
            "t": "Há redundância entre os switches principais?"
          },
          {
            "id": "q08",
            "t": "Existe um diagrama atualizado da topologia de rede?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Roteadores e Wi-Fi",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "Quantos roteadores existem?"
          },
          {
            "id": "q10",
            "t": "Quantos pontos de acesso Wi-Fi existem?"
          },
          {
            "id": "q11",
            "t": "Para cada ponto de acesso, qual é o modelo, a versão e a localização?"
          },
          {
            "id": "q12",
            "t": "Existem redes Wi-Fi separadas para usuários, visitantes, dispositivos corporativos e equipamentos de automação?"
          },
          {
            "id": "q13",
            "t": "A cobertura Wi-Fi atende todas as áreas necessárias?"
          },
          {
            "id": "q14",
            "t": "Existem pontos com baixa intensidade ou instabilidade de sinal?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Links de internet",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Quantos links de internet estão contratados?"
          },
          {
            "id": "q16",
            "t": "Qual é a velocidade contratada de cada link?"
          },
          {
            "id": "q17",
            "t": "Qual é a velocidade média efetivamente entregue?"
          },
          {
            "id": "q18",
            "t": "Os links são fornecidos por operadoras diferentes?"
          },
          {
            "id": "q19",
            "t": "Existe balanceamento ou failover automático entre os links?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Contingência e disponibilidade (SLA)",
        "n": true,
        "q": [
          {
            "id": "q20",
            "t": "Existe um link de contingência por satélite, rádio, 4G, 5G ou outra tecnologia?"
          },
          {
            "id": "q21",
            "t": "Qual é o tempo estimado para ativação da contingência?"
          },
          {
            "id": "q22",
            "t": "Qual é o nível de disponibilidade contratado com cada operadora?"
          },
          {
            "id": "q23",
            "t": "Os contratos possuem SLA formal?"
          },
          {
            "id": "q24",
            "t": "Qual foi a quantidade de interrupções dos links nos últimos 12 meses?"
          },
          {
            "id": "q25",
            "t": "Qual foi o tempo médio de recuperação de cada interrupção?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Suporte e atualização dos equipamentos",
        "n": true,
        "q": [
          {
            "id": "q26",
            "t": "Existem equipamentos de rede fora de garantia ou sem suporte?"
          },
          {
            "id": "q27",
            "t": "Os firmwares dos equipamentos de rede estão atualizados?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Monitoramento e documentação",
        "n": true,
        "q": [
          {
            "id": "q28",
            "t": "Existe monitoramento centralizado dos equipamentos de rede?"
          },
          {
            "id": "q29",
            "t": "Há alertas para indisponibilidade, perda de pacotes, saturação e falha de equipamento?"
          },
          {
            "id": "q30",
            "t": "As configurações dos equipamentos estão documentadas e possuem cópia de segurança?"
          }
        ]
      }
    ]
  },
  {
    "id": "1.3",
    "p": 1,
    "t": "Perímetro de segurança e firewalls",
    "d": "Proteção do perímetro, regras de acesso, VPN, segmentação, atualizações e monitoramento dos firewalls.",
    "b": [
      {
        "id": "b1",
        "t": "Firewall e licenciamento",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Qual equipamento ou serviço exerce a função de firewall?"
          },
          {
            "id": "q02",
            "t": "Qual é o fabricante, modelo e versão do firewall?"
          },
          {
            "id": "q03",
            "t": "O firewall possui licença de segurança vigente?"
          },
          {
            "id": "q04",
            "t": "Quais recursos estão contratados: IPS, antivírus, filtragem web, controle de aplicações ou outros?"
          },
          {
            "id": "q05",
            "t": "Existe apenas um firewall ou há redundância?"
          },
          {
            "id": "q06",
            "t": "O firewall está configurado em alta disponibilidade?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Regras e controle de mudanças",
        "n": true,
        "q": [
          {
            "id": "q07",
            "t": "As regras de firewall estão documentadas?"
          },
          {
            "id": "q08",
            "t": "Quando foi realizada a última revisão das regras?"
          },
          {
            "id": "q09",
            "t": "Existem regras antigas, duplicadas ou sem responsável identificado?"
          },
          {
            "id": "q10",
            "t": "Existem regras que permitem acesso amplo ou irrestrito?"
          },
          {
            "id": "q11",
            "t": "Todas as regras possuem justificativa e prazo de validade?"
          },
          {
            "id": "q12",
            "t": "Quem aprova a criação, alteração ou exclusão de regras?"
          },
          {
            "id": "q13",
            "t": "Existe processo formal de controle de mudanças no firewall?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Acesso administrativo",
        "n": true,
        "q": [
          {
            "id": "q14",
            "t": "Quais usuários possuem acesso administrativo ao firewall?"
          },
          {
            "id": "q15",
            "t": "O acesso administrativo exige autenticação multifator?"
          },
          {
            "id": "q16",
            "t": "O acesso administrativo é permitido somente a partir de redes autorizadas?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "VPN e acesso remoto",
        "n": true,
        "q": [
          {
            "id": "q17",
            "t": "Existe acesso remoto por VPN?"
          },
          {
            "id": "q18",
            "t": "Quantos usuários utilizam a VPN?"
          },
          {
            "id": "q19",
            "t": "Quem está autorizado a utilizar a VPN?"
          },
          {
            "id": "q20",
            "t": "O acesso por VPN é concedido conforme a função do usuário?"
          },
          {
            "id": "q21",
            "t": "Existem perfis diferentes de acesso para funcionários, fornecedores e administradores?"
          },
          {
            "id": "q22",
            "t": "As contas de VPN são revisadas periodicamente?"
          },
          {
            "id": "q23",
            "t": "Contas de usuários desligados são bloqueadas imediatamente?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Segmentação por VLANs",
        "n": true,
        "q": [
          {
            "id": "q24",
            "t": "A rede está segmentada por VLANs?"
          },
          {
            "id": "q25",
            "t": "Quais VLANs existem atualmente?"
          },
          {
            "id": "q26",
            "t": "Há separação entre servidores, usuários, visitantes, dispositivos IoT, telefonia e administração?"
          },
          {
            "id": "q27",
            "t": "A comunicação entre VLANs é controlada por regras específicas?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Exposição à internet",
        "n": true,
        "q": [
          {
            "id": "q28",
            "t": "Existem portas ou serviços expostos diretamente à internet?"
          },
          {
            "id": "q29",
            "t": "Esses acessos externos são revisados periodicamente?"
          }
        ]
      },
      {
        "id": "b7",
        "t": "Atualização, logs e incidentes",
        "n": true,
        "q": [
          {
            "id": "q30",
            "t": "O firmware do firewall está atualizado?"
          },
          {
            "id": "q31",
            "t": "Existe rotina formal para atualização do firewall?"
          },
          {
            "id": "q32",
            "t": "Os logs do firewall são armazenados?"
          },
          {
            "id": "q33",
            "t": "Por quanto tempo os logs são mantidos?"
          },
          {
            "id": "q34",
            "t": "Quem analisa os eventos de segurança?"
          },
          {
            "id": "q35",
            "t": "Existem alertas para tentativas de invasão, bloqueios e acessos anormais?"
          },
          {
            "id": "q36",
            "t": "Já foram identificados incidentes relevantes no perímetro nos últimos 12 meses?"
          }
        ]
      }
    ]
  },
  {
    "id": "1.4",
    "p": 1,
    "t": "Energia e infraestrutura física",
    "d": "Segurança física, alimentação elétrica, autonomia, climatização, organização e disponibilidade da infraestrutura de TI.",
    "b": [
      {
        "id": "b1",
        "t": "Localização e acesso físico",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Onde estão localizados os servidores e equipamentos de rede?"
          },
          {
            "id": "q02",
            "t": "Existe uma sala técnica ou data center dedicado?"
          },
          {
            "id": "q03",
            "t": "O acesso à sala técnica é restrito?"
          },
          {
            "id": "q04",
            "t": "Existe controle ou registro de entrada e saída?"
          },
          {
            "id": "q05",
            "t": "Há risco de acesso de pessoas não autorizadas?"
          },
          {
            "id": "q06",
            "t": "Os racks estão devidamente organizados e identificados?"
          },
          {
            "id": "q07",
            "t": "Os cabos de energia e dados estão separados?"
          },
          {
            "id": "q08",
            "t": "Existe documentação da organização física dos racks?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "No-breaks",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "Quantos no-breaks existem?"
          },
          {
            "id": "q10",
            "t": "Qual é a capacidade de cada no-break?"
          },
          {
            "id": "q11",
            "t": "Qual é a carga atualmente conectada a cada no-break?"
          },
          {
            "id": "q12",
            "t": "Qual é a autonomia nominal de cada no-break?"
          },
          {
            "id": "q13",
            "t": "Qual é a autonomia real medida sob a carga atual?"
          },
          {
            "id": "q14",
            "t": "Quando foi realizado o último teste de autonomia?"
          },
          {
            "id": "q15",
            "t": "As baterias estão dentro da vida útil recomendada?"
          },
          {
            "id": "q16",
            "t": "Existe contrato de manutenção dos no-breaks?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Gerador e circuitos elétricos",
        "n": true,
        "q": [
          {
            "id": "q17",
            "t": "Há gerador de energia?"
          },
          {
            "id": "q18",
            "t": "O gerador atende todos os equipamentos críticos?"
          },
          {
            "id": "q19",
            "t": "O gerador entra em funcionamento automaticamente?"
          },
          {
            "id": "q20",
            "t": "Quando foi realizado o último teste do gerador?"
          },
          {
            "id": "q21",
            "t": "Existe redundância de circuitos elétricos?"
          },
          {
            "id": "q22",
            "t": "Os equipamentos críticos estão ligados a circuitos independentes?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Climatização e ambiente",
        "n": true,
        "q": [
          {
            "id": "q23",
            "t": "A sala técnica possui climatização exclusiva?"
          },
          {
            "id": "q24",
            "t": "A temperatura e a umidade são monitoradas?"
          },
          {
            "id": "q25",
            "t": "Existem alertas para temperatura ou umidade fora do limite?"
          },
          {
            "id": "q26",
            "t": "A climatização possui redundância?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Incêndio, riscos físicos e procedimentos",
        "n": true,
        "q": [
          {
            "id": "q27",
            "t": "Existem sensores de fumaça, incêndio, vazamento de água ou alagamento?"
          },
          {
            "id": "q28",
            "t": "Existe sistema de combate a incêndio adequado aos equipamentos eletrônicos?"
          },
          {
            "id": "q29",
            "t": "Há risco de infiltração, poeira, calor excessivo ou acesso de animais?"
          },
          {
            "id": "q30",
            "t": "Existe procedimento para atuação em caso de falha de energia ou climatização?"
          }
        ]
      }
    ]
  },
  {
    "id": "1.5",
    "p": 1,
    "t": "Estações de trabalho e endpoints",
    "d": "Inventário, segurança, atualização, manutenção e controle dos computadores, notebooks, celulares e demais dispositivos corporativos.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário dos dispositivos",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quantos computadores, notebooks e celulares corporativos existem?"
          },
          {
            "id": "q02",
            "t": "Existe inventário atualizado de todos os dispositivos?"
          },
          {
            "id": "q03",
            "t": "Para cada dispositivo, estão registrados:\n- usuário responsável\n- setor\n- localização\n- fabricante\n- modelo\n- número de série\n- data de aquisição\n- idade?"
          },
          {
            "id": "q04",
            "t": "Qual é a idade média dos equipamentos?"
          },
          {
            "id": "q05",
            "t": "Quantos equipamentos têm mais de cinco anos?"
          },
          {
            "id": "q06",
            "t": "Existem equipamentos fora da garantia?"
          },
          {
            "id": "q07",
            "t": "Existem dispositivos sem responsável definido?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Sistemas operacionais e atualização",
        "n": true,
        "q": [
          {
            "id": "q08",
            "t": "Quais sistemas operacionais estão instalados?"
          },
          {
            "id": "q10",
            "t": "As atualizações de segurança são aplicadas centralmente?"
          },
          {
            "id": "q11",
            "t": "Qual é o prazo máximo para instalação de atualizações críticas?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Antivírus ou EDR",
        "n": true,
        "q": [
          {
            "id": "q12",
            "t": "Todos os dispositivos possuem antivírus ou EDR?"
          },
          {
            "id": "q13",
            "t": "O antivírus ou EDR é gerenciado centralmente?"
          },
          {
            "id": "q14",
            "t": "Existem dispositivos sem proteção ativa?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Criptografia e bloqueio de tela",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Os notebooks possuem criptografia de disco?"
          },
          {
            "id": "q16",
            "t": "A criptografia é obrigatória para todos os equipamentos portáteis?"
          },
          {
            "id": "q17",
            "t": "Existe bloqueio automático de tela?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Privilégios e instalação de software",
        "n": true,
        "q": [
          {
            "id": "q18",
            "t": "Os usuários possuem permissão de administrador local?"
          },
          {
            "id": "q19",
            "t": "As permissões administrativas são justificadas e revisadas?"
          },
          {
            "id": "q20",
            "t": "Existe controle para instalação de softwares?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Perda, roubo e descarte",
        "n": true,
        "q": [
          {
            "id": "q21",
            "t": "Há processo para retirada, substituição e descarte de equipamentos?"
          },
          {
            "id": "q22",
            "t": "Existe procedimento para perda ou roubo de notebook ou celular?"
          },
          {
            "id": "q23",
            "t": "É possível bloquear ou apagar remotamente os dispositivos?"
          }
        ]
      },
      {
        "id": "b7",
        "t": "Celulares e dispositivos pessoais",
        "n": true,
        "q": [
          {
            "id": "q24",
            "t": "Os celulares corporativos utilizam gerenciamento centralizado?"
          },
          {
            "id": "q25",
            "t": "Existe política de uso de dispositivos pessoais para atividades corporativas?"
          }
        ]
      }
    ]
  },
  {
    "id": "2.1",
    "p": 2,
    "t": "Sistemas de gestão core — ERP, CRM e SaaS",
    "d": "Sistemas essenciais ao negócio, dependências, customizações, licenças, suporte e capacidade de crescimento.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário dos sistemas essenciais",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quais sistemas são essenciais para a operação?"
          },
          {
            "id": "q02",
            "t": "Qual é a finalidade de cada sistema?"
          },
          {
            "id": "q03",
            "t": "Quais processos críticos dependem de cada sistema?"
          },
          {
            "id": "q04",
            "t": "Quem é o responsável interno por cada sistema?"
          },
          {
            "id": "q05",
            "t": "Quem é o fornecedor ou responsável externo?"
          },
          {
            "id": "q06",
            "t": "Qual é a versão atualmente utilizada?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Suporte, licenças e capacidade",
        "n": true,
        "q": [
          {
            "id": "q07",
            "t": "O sistema está dentro do período de suporte do fabricante?"
          },
          {
            "id": "q08",
            "t": "Existem módulos contratados que não são utilizados?"
          },
          {
            "id": "q09",
            "t": "Existem processos importantes realizados fora do sistema?"
          },
          {
            "id": "q10",
            "t": "Quantos usuários utilizam cada sistema?"
          },
          {
            "id": "q11",
            "t": "Existe limite de usuários ou transações contratado?"
          },
          {
            "id": "q12",
            "t": "O sistema suporta o volume atual de operações?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Customizações",
        "n": true,
        "q": [
          {
            "id": "q14",
            "t": "Quantas customizações foram realizadas?"
          },
          {
            "id": "q15",
            "t": "Quais customizações são críticas para o negócio?"
          },
          {
            "id": "q16",
            "t": "As customizações estão documentadas?"
          },
          {
            "id": "q17",
            "t": "Quem mantém as customizações?"
          },
          {
            "id": "q18",
            "t": "As customizações dificultam a atualização do sistema?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Integrações e continuidade",
        "n": true,
        "q": [
          {
            "id": "q19",
            "t": "Existem integrações com outros sistemas?"
          },
          {
            "id": "q20",
            "t": "Existem funcionalidades ou módulos descontinuados ainda utilizados?"
          },
          {
            "id": "q21",
            "t": "Como são tratadas as indisponibilidades do sistema?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Ambientes e mudanças",
        "n": true,
        "q": [
          {
            "id": "q22",
            "t": "Existe ambiente de homologação separado do ambiente de produção?"
          },
          {
            "id": "q23",
            "t": "As alterações são testadas antes de serem publicadas?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Planejamento e impacto",
        "n": true,
        "q": [
          {
            "id": "q24",
            "t": "Existe plano para substituição ou atualização do sistema?"
          },
          {
            "id": "q25",
            "t": "Qual seria o impacto financeiro e operacional de uma indisponibilidade?"
          }
        ]
      }
    ]
  },
  {
    "id": "2.2",
    "p": 2,
    "t": "Integradores e APIs — Middleware",
    "d": "Integrações entre sistemas, APIs, conectores, sincronização de dados, dependências e pontos únicos de falha.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário das integrações",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quais sistemas estão integrados entre si?"
          },
          {
            "id": "q02",
            "t": "Qual é a finalidade de cada integração?"
          },
          {
            "id": "q03",
            "t": "Quais tecnologias são utilizadas nas integrações?"
          },
          {
            "id": "q04",
            "t": "Existem APIs, webhooks, arquivos ou processos manuais?"
          },
          {
            "id": "q05",
            "t": "Quem é o responsável por cada integração?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Documentação e características",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Existe documentação técnica atualizada das integrações?"
          },
          {
            "id": "q07",
            "t": "Quais dados são enviados ou recebidos em cada integração?"
          },
          {
            "id": "q08",
            "t": "Qual é a frequência de sincronização?"
          },
          {
            "id": "q09",
            "t": "Existem integrações em tempo real?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Criticidade e pontos únicos de falha",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Existem integrações críticas para o faturamento ou operação?"
          },
          {
            "id": "q11",
            "t": "Quais integrações representam pontos únicos de falha?"
          },
          {
            "id": "q12",
            "t": "O que acontece quando uma integração fica indisponível?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Falhas, reenvio e alertas",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "As informações são reenviadas automaticamente após uma falha?"
          },
          {
            "id": "q14",
            "t": "Existe fila de processamento ou mecanismo de retentativa?"
          },
          {
            "id": "q15",
            "t": "Como são detectadas falhas de sincronização?"
          },
          {
            "id": "q16",
            "t": "Existem alertas automáticos para erros de integração?"
          },
          {
            "id": "q17",
            "t": "Quem recebe os alertas?"
          },
          {
            "id": "q18",
            "t": "Há conciliação para identificar registros que não foram integrados?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Pessoas, credenciais e certificados",
        "n": true,
        "q": [
          {
            "id": "q19",
            "t": "Existem integrações mantidas por uma única pessoa?"
          },
          {
            "id": "q20",
            "t": "Existem credenciais ou certificados vinculados às integrações?"
          },
          {
            "id": "q21",
            "t": "Como ocorre a renovação dessas credenciais?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Testes, monitoramento e histórico",
        "n": true,
        "q": [
          {
            "id": "q22",
            "t": "Existe ambiente de testes para validar alterações?"
          },
          {
            "id": "q23",
            "t": "As integrações são monitoradas quanto a desempenho e volume?"
          },
          {
            "id": "q24",
            "t": "Há histórico de falhas e tempo de recuperação?"
          }
        ]
      }
    ]
  },
  {
    "id": "2.3",
    "p": 2,
    "t": "Bancos de dados e armazenamento",
    "d": "Inventário, versões, capacidade, desempenho, manutenção, segurança e disponibilidade dos bancos de dados.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário dos bancos de dados",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quais bancos de dados estão ativos?"
          },
          {
            "id": "q02",
            "t": "Qual é o fabricante e a versão de cada banco?"
          },
          {
            "id": "q03",
            "t": "Onde cada banco está hospedado?"
          },
          {
            "id": "q04",
            "t": "Qual sistema ou aplicação utiliza cada banco?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Capacidade e responsabilidade",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Qual é o tamanho atual de cada banco?"
          },
          {
            "id": "q06",
            "t": "Qual é a taxa de crescimento mensal?"
          },
          {
            "id": "q07",
            "t": "Quanto espaço livre ainda existe?"
          },
          {
            "id": "q08",
            "t": "Qual é o limite de capacidade previsto?"
          },
          {
            "id": "q09",
            "t": "Existem bancos de dados sem responsável definido?"
          },
          {
            "id": "q10",
            "t": "Os bancos possuem suporte e licenciamento regular?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Manutenção, desempenho e monitoramento",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Existem rotinas de manutenção periódica?"
          },
          {
            "id": "q12",
            "t": "São realizadas tarefas de indexação e atualização de estatísticas?"
          },
          {
            "id": "q13",
            "t": "Existem rotinas de limpeza ou arquivamento de dados antigos?"
          },
          {
            "id": "q14",
            "t": "Quais consultas ou processos apresentam maior lentidão?"
          },
          {
            "id": "q15",
            "t": "Quanto tempo demora o fechamento mensal?"
          },
          {
            "id": "q16",
            "t": "Quanto tempo levam os relatórios críticos?"
          },
          {
            "id": "q17",
            "t": "Existem horários de maior utilização?"
          },
          {
            "id": "q18",
            "t": "Há monitoramento de CPU, memória, disco e conexões?"
          },
          {
            "id": "q19",
            "t": "Existem alertas de lentidão ou indisponibilidade?"
          },
          {
            "id": "q20",
            "t": "Existem réplicas ou mecanismos de alta disponibilidade?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Acessos e proteção dos dados",
        "n": true,
        "q": [
          {
            "id": "q21",
            "t": "Os acessos aos bancos são individualizados?"
          },
          {
            "id": "q22",
            "t": "Existem usuários compartilhados ou contas administrativas genéricas?"
          },
          {
            "id": "q23",
            "t": "Os dados sensíveis estão protegidos?"
          },
          {
            "id": "q24",
            "t": "Existe criptografia em repouso ou em trânsito?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Backup e restauração",
        "n": true,
        "q": [
          {
            "id": "q25",
            "t": "Os bancos são incluídos nas rotinas de backup?"
          },
          {
            "id": "q26",
            "t": "Já foi realizado teste de restauração de algum banco?"
          }
        ]
      }
    ]
  },
  {
    "id": "2.4",
    "p": 2,
    "t": "Ambientes de nuvem",
    "d": "Serviços em nuvem, custos, segurança, identidades, arquitetura híbrida e monitoramento.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário e finalidade",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quais serviços ou cargas de trabalho estão hospedados na nuvem?"
          },
          {
            "id": "q02",
            "t": "Qual provedor é utilizado: AWS, Azure, GCP ou outro?"
          },
          {
            "id": "q03",
            "t": "Qual é a finalidade de cada recurso em nuvem?"
          },
          {
            "id": "q04",
            "t": "Em quais regiões os recursos estão hospedados?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Custos e orçamento",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Qual é o custo mensal de cada serviço?"
          },
          {
            "id": "q06",
            "t": "Qual foi a variação dos custos nos últimos 12 meses?"
          },
          {
            "id": "q07",
            "t": "Existem recursos sem utilização ou subutilizados?"
          },
          {
            "id": "q08",
            "t": "Existe orçamento mensal definido?"
          },
          {
            "id": "q09",
            "t": "Existem alertas de aumento de consumo ou custo?"
          },
          {
            "id": "q10",
            "t": "Quem aprova a criação de novos recursos?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Inventário e acessos",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Existe inventário atualizado dos recursos em nuvem?"
          },
          {
            "id": "q12",
            "t": "Como os usuários e administradores acessam o ambiente?"
          },
          {
            "id": "q14",
            "t": "Existem contas administrativas compartilhadas?"
          },
          {
            "id": "q15",
            "t": "As permissões seguem o princípio do menor privilégio?"
          },
          {
            "id": "q16",
            "t": "As contas de ex-funcionários e fornecedores são desativadas?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Exposição e segurança",
        "n": true,
        "q": [
          {
            "id": "q17",
            "t": "Existem recursos expostos publicamente?"
          },
          {
            "id": "q18",
            "t": "A exposição pública foi revisada e autorizada?"
          },
          {
            "id": "q19",
            "t": "Existem regras de segurança documentadas?"
          },
          {
            "id": "q20",
            "t": "Os dados armazenados na nuvem são criptografados?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Conectividade e continuidade",
        "n": true,
        "q": [
          {
            "id": "q21",
            "t": "Como a nuvem se conecta ao ambiente local?"
          },
          {
            "id": "q22",
            "t": "A conexão entre a nuvem e o ambiente local possui redundância?"
          },
          {
            "id": "q23",
            "t": "Existe monitoramento de falhas e indisponibilidades?"
          },
          {
            "id": "q24",
            "t": "Existe plano de recuperação para os serviços em nuvem?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Contratos e saída",
        "n": true,
        "q": [
          {
            "id": "q25",
            "t": "Os contratos possuem SLA e condições de saída?"
          },
          {
            "id": "q26",
            "t": "A empresa consegue exportar seus dados caso troque de provedor?"
          }
        ]
      }
    ]
  },
  {
    "id": "3.1",
    "p": 3,
    "t": "Políticas de backup e restauração",
    "d": "Frequência, cobertura, retenção, segurança, localização e efetividade dos backups.",
    "b": [
      {
        "id": "b1",
        "t": "Escopo e frequência",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quais sistemas e dados são incluídos nos backups?"
          },
          {
            "id": "q02",
            "t": "Existem dados críticos que não são copiados?"
          },
          {
            "id": "q03",
            "t": "Qual é a frequência de backup de cada sistema?"
          },
          {
            "id": "q04",
            "t": "Existem backups completos, incrementais ou diferenciais?"
          },
          {
            "id": "q05",
            "t": "Qual é o período de retenção de cada tipo de backup?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Locais e cópias protegidas",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Onde os backups são armazenados?"
          },
          {
            "id": "q07",
            "t": "Existe cópia fora do ambiente principal?"
          },
          {
            "id": "q08",
            "t": "Existe cópia em nuvem?"
          },
          {
            "id": "q09",
            "t": "Existe cópia offline ou protegida contra ransomware?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Segurança dos backups",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Os backups são criptografados?"
          },
          {
            "id": "q11",
            "t": "Quem possui acesso aos backups?"
          },
          {
            "id": "q12",
            "t": "Os backups estão protegidos contra exclusão ou alteração indevida?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Monitoramento das rotinas",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "Existe monitoramento automático das rotinas?"
          },
          {
            "id": "q14",
            "t": "Quem recebe alertas de falha?"
          },
          {
            "id": "q15",
            "t": "Qual foi a taxa de sucesso dos backups nos últimos meses?"
          },
          {
            "id": "q16",
            "t": "Quando ocorreu a última falha de backup?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Teste de restauração",
        "n": true,
        "q": [
          {
            "id": "q17",
            "t": "Quando foi realizado o último teste real de restauração?"
          },
          {
            "id": "q18",
            "t": "Qual sistema foi restaurado?"
          },
          {
            "id": "q19",
            "t": "Quanto tempo levou a restauração?"
          },
          {
            "id": "q20",
            "t": "Qual foi a quantidade de dados restaurada?"
          },
          {
            "id": "q21",
            "t": "O processo de restauração foi concluído com sucesso?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Documentação e capacidade de restaurar",
        "n": true,
        "q": [
          {
            "id": "q22",
            "t": "Existe documentação do procedimento de restauração?"
          },
          {
            "id": "q23",
            "t": "A restauração pode ser realizada por mais de uma pessoa?"
          },
          {
            "id": "q24",
            "t": "Os backups são testados contra corrupção ou inconsistência?"
          },
          {
            "id": "q25",
            "t": "O tempo de restauração atende às necessidades do negócio?"
          }
        ]
      }
    ]
  },
  {
    "id": "3.2",
    "p": 3,
    "t": "Plano de recuperação de desastres — DRP",
    "d": "Capacidade de recuperação após falhas graves, indisponibilidade de infraestrutura, desastre ou ataque cibernético.",
    "b": [
      {
        "id": "b1",
        "t": "Existência e responsabilidade",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existe um Plano de Recuperação de Desastres formal?"
          },
          {
            "id": "q02",
            "t": "Quando o plano foi criado?"
          },
          {
            "id": "q03",
            "t": "Quando foi realizada a última atualização?"
          },
          {
            "id": "q04",
            "t": "Quem é o responsável pelo plano?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Cenários contemplados",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Quais situações de desastre estão contempladas?"
          },
          {
            "id": "q06",
            "t": "O plano contempla falha de servidores?"
          },
          {
            "id": "q07",
            "t": "O plano contempla indisponibilidade de internet?"
          },
          {
            "id": "q08",
            "t": "O plano contempla ataque de ransomware?"
          },
          {
            "id": "q09",
            "t": "O plano contempla perda da sala técnica?"
          },
          {
            "id": "q10",
            "t": "O plano contempla indisponibilidade de fornecedor crítico?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Prioridades, RTO e RPO",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Quais sistemas possuem prioridade de recuperação?"
          },
          {
            "id": "q12",
            "t": "Qual é o RTO definido para cada sistema?"
          },
          {
            "id": "q13",
            "t": "Qual é o RPO definido para cada sistema?"
          },
          {
            "id": "q14",
            "t": "Os RTOs e RPOs foram aprovados pela direção?"
          },
          {
            "id": "q15",
            "t": "Os tempos definidos são compatíveis com a capacidade atual?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Ambiente alternativo e contatos",
        "n": true,
        "q": [
          {
            "id": "q16",
            "t": "Existe ambiente alternativo para operação?"
          },
          {
            "id": "q17",
            "t": "Existe infraestrutura de contingência?"
          },
          {
            "id": "q18",
            "t": "Os contatos de emergência estão atualizados?"
          },
          {
            "id": "q19",
            "t": "Existem procedimentos detalhados de acionamento?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Testes e preparo da equipe",
        "n": true,
        "q": [
          {
            "id": "q20",
            "t": "O plano já foi testado?"
          },
          {
            "id": "q21",
            "t": "Quando ocorreu o último teste?"
          },
          {
            "id": "q22",
            "t": "Quais falhas foram encontradas no teste?"
          },
          {
            "id": "q23",
            "t": "As falhas foram corrigidas?"
          },
          {
            "id": "q24",
            "t": "Existe registro formal dos resultados dos testes?"
          },
          {
            "id": "q25",
            "t": "A equipe sabe quem deve ser acionado em caso de desastre?"
          }
        ]
      }
    ]
  },
  {
    "id": "3.3",
    "p": 3,
    "t": "Identidades, acessos e certificados",
    "d": "Criação, alteração e encerramento de acessos, privilégios administrativos, autenticação multifator, senhas e certificados.",
    "b": [
      {
        "id": "b1",
        "t": "Política e concessão de acessos",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existe política formal de gestão de acessos?"
          },
          {
            "id": "q02",
            "t": "Como são solicitados novos acessos?"
          },
          {
            "id": "q03",
            "t": "Quem aprova os acessos?"
          },
          {
            "id": "q04",
            "t": "Os acessos são concedidos conforme a função do usuário?"
          },
          {
            "id": "q05",
            "t": "Existe matriz de perfis e permissões?"
          },
          {
            "id": "q06",
            "t": "Os privilégios são revisados periodicamente?"
          },
          {
            "id": "q07",
            "t": "Com que frequência ocorre a revisão?"
          },
          {
            "id": "q08",
            "t": "Quem aprova a permanência dos acessos?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Autenticação multifator",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "A autenticação multifator está habilitada?"
          },
          {
            "id": "q10",
            "t": "Em quais sistemas o MFA está ativo?"
          },
          {
            "id": "q11",
            "t": "Existem sistemas críticos sem MFA?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Acessos administrativos",
        "n": true,
        "q": [
          {
            "id": "q12",
            "t": "Quem possui perfil de administrador de domínio?"
          },
          {
            "id": "q13",
            "t": "Quem possui acesso administrativo aos servidores?"
          },
          {
            "id": "q14",
            "t": "Quem possui acesso administrativo aos bancos de dados?"
          },
          {
            "id": "q15",
            "t": "Os acessos administrativos são individualizados?"
          },
          {
            "id": "q16",
            "t": "Existem contas compartilhadas?"
          },
          {
            "id": "q17",
            "t": "As atividades administrativas são registradas?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Desligamento e terceiros",
        "n": true,
        "q": [
          {
            "id": "q18",
            "t": "As contas de funcionários desligados são desativadas no mesmo dia?"
          },
          {
            "id": "q19",
            "t": "Existe processo para bloqueio imediato em casos urgentes?"
          },
          {
            "id": "q20",
            "t": "Os acessos de terceiros possuem prazo de validade?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Senhas e cofre",
        "n": true,
        "q": [
          {
            "id": "q21",
            "t": "Existem senhas compartilhadas?"
          },
          {
            "id": "q22",
            "t": "As senhas compartilhadas são armazenadas em cofre de senhas?"
          },
          {
            "id": "q23",
            "t": "Existe política de complexidade e troca de senhas?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Certificados digitais",
        "n": true,
        "q": [
          {
            "id": "q24",
            "t": "Quais certificados digitais existem?"
          },
          {
            "id": "q25",
            "t": "Quem é responsável por cada certificado?"
          },
          {
            "id": "q26",
            "t": "Quais certificados vencerão nos próximos 90 dias?"
          },
          {
            "id": "q27",
            "t": "Existe alerta automático de vencimento?"
          },
          {
            "id": "q28",
            "t": "Onde são armazenadas as chaves privadas?"
          }
        ]
      },
      {
        "id": "b7",
        "t": "Credenciais críticas e registros",
        "n": true,
        "q": [
          {
            "id": "q29",
            "t": "Há registro das credenciais críticas e de seus responsáveis?"
          },
          {
            "id": "q30",
            "t": "Existe processo de substituição em caso de perda ou comprometimento?"
          },
          {
            "id": "q31",
            "t": "Por quanto tempo os registros de atividade são mantidos?"
          }
        ]
      }
    ]
  },
  {
    "id": "3.4",
    "p": 3,
    "t": "Cibersegurança e proteção de dados",
    "d": "Prevenção, detecção e resposta a incidentes, proteção de endpoints, LGPD, vulnerabilidades e conscientização dos usuários.",
    "b": [
      {
        "id": "b1",
        "t": "Proteção dos dispositivos e alertas",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Todos os computadores possuem antivírus ou EDR ativo?"
          },
          {
            "id": "q02",
            "t": "Existem dispositivos sem proteção ou com proteção desatualizada?"
          },
          {
            "id": "q03",
            "t": "A solução de segurança é administrada centralmente?"
          },
          {
            "id": "q04",
            "t": "Existem alertas de malware, comportamento suspeito ou ransomware?"
          },
          {
            "id": "q05",
            "t": "Quem trata os alertas de segurança?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Resposta a incidentes e governança",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Existe processo formal de resposta a incidentes?"
          },
          {
            "id": "q07",
            "t": "Existe responsável interno por segurança da informação?"
          },
          {
            "id": "q08",
            "t": "Existe política de segurança da informação aprovada?"
          },
          {
            "id": "q09",
            "t": "A política foi comunicada aos colaboradores?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Conscientização dos usuários",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Os colaboradores recebem treinamento periódico?"
          },
          {
            "id": "q11",
            "t": "São realizadas simulações de phishing?"
          },
          {
            "id": "q12",
            "t": "Os resultados das simulações são acompanhados?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Vulnerabilidades e testes",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "Quando foi realizado o último teste de vulnerabilidade?"
          },
          {
            "id": "q14",
            "t": "O teste foi interno, externo ou ambos?"
          },
          {
            "id": "q15",
            "t": "Foram identificadas vulnerabilidades críticas?"
          },
          {
            "id": "q16",
            "t": "Existe plano de correção para as vulnerabilidades?"
          },
          {
            "id": "q17",
            "t": "Qual é o prazo para corrigir vulnerabilidades críticas?"
          },
          {
            "id": "q18",
            "t": "São realizados testes de penetração?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "LGPD: inventário, política e contratos",
        "n": true,
        "q": [
          {
            "id": "q19",
            "t": "Existe inventário de dados pessoais tratados pela empresa?"
          },
          {
            "id": "q20",
            "t": "Existe identificação da finalidade de cada tratamento?"
          },
          {
            "id": "q21",
            "t": "A empresa possui política de privacidade?"
          },
          {
            "id": "q22",
            "t": "Existe encarregado ou responsável pela LGPD?"
          },
          {
            "id": "q23",
            "t": "Os contratos com fornecedores tratam da proteção de dados?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "LGPD: titulares, retenção e incidentes",
        "n": true,
        "q": [
          {
            "id": "q24",
            "t": "Existe processo para atender solicitações de titulares?"
          },
          {
            "id": "q25",
            "t": "Existe processo para comunicar incidentes de dados pessoais?"
          },
          {
            "id": "q26",
            "t": "Os dados pessoais são armazenados somente pelo período necessário?"
          },
          {
            "id": "q27",
            "t": "Existem dados sensíveis sem controle adequado?"
          },
          {
            "id": "q28",
            "t": "A empresa possui plano de resposta a vazamento de dados?"
          },
          {
            "id": "q29",
            "t": "Os incidentes são registrados e analisados após o encerramento?"
          }
        ]
      }
    ]
  },
  {
    "id": "4.1",
    "p": 4,
    "t": "Dependência de pessoas-chave",
    "d": "Dependência de profissionais, fornecedores ou conhecimentos não documentados para manter a operação.",
    "b": [
      {
        "id": "b1",
        "t": "Dependências críticas",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quais sistemas dependem de uma única pessoa?"
          },
          {
            "id": "q02",
            "t": "Quais processos dependem de uma única pessoa?"
          },
          {
            "id": "q03",
            "t": "Existem senhas ou conhecimentos que apenas uma pessoa possui?"
          },
          {
            "id": "q04",
            "t": "Existem fornecedores que somente uma pessoa interna sabe acionar?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Substituição e documentação",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Quem substitui cada pessoa-chave durante uma ausência?"
          },
          {
            "id": "q06",
            "t": "Existe documentação do conhecimento dessas pessoas?"
          },
          {
            "id": "q07",
            "t": "A pessoa substituta já foi treinada?"
          },
          {
            "id": "q08",
            "t": "Já foi realizado algum teste de substituição?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Impacto e continuidade",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "O que deixaria de funcionar se determinada pessoa saísse amanhã?"
          },
          {
            "id": "q10",
            "t": "Existem atividades críticas executadas informalmente?"
          },
          {
            "id": "q11",
            "t": "Existem rotinas que não possuem procedimento escrito?"
          },
          {
            "id": "q12",
            "t": "A empresa conseguiria operar durante 15 ou 30 dias sem essa pessoa?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Riscos e plano",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "Há risco de perda de conhecimento por aposentadoria, desligamento ou sucessão?"
          },
          {
            "id": "q14",
            "t": "Existe plano para reduzir essas dependências?"
          }
        ]
      }
    ]
  },
  {
    "id": "4.2",
    "p": 4,
    "t": "Documentação técnica e processos",
    "d": "Existência, atualização, acessibilidade e utilização da documentação técnica e operacional.",
    "b": [
      {
        "id": "b1",
        "t": "Arquitetura e ativos",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existe documentação atualizada da arquitetura de TI?"
          },
          {
            "id": "q02",
            "t": "Existe inventário documentado de ativos?"
          },
          {
            "id": "q04",
            "t": "Existe documentação dos servidores e máquinas virtuais?"
          },
          {
            "id": "q05",
            "t": "Existe documentação dos sistemas e integrações?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Procedimentos operacionais",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Existem manuais de operação para as atividades críticas?"
          },
          {
            "id": "q07",
            "t": "Existem procedimentos para backup e restauração?"
          },
          {
            "id": "q09",
            "t": "Existem procedimentos para recuperação de desastres?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Gestão dos documentos",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Os documentos possuem responsável e data de revisão?"
          },
          {
            "id": "q11",
            "t": "Onde a documentação é armazenada?"
          },
          {
            "id": "q12",
            "t": "O acesso à documentação é controlado?"
          },
          {
            "id": "q13",
            "t": "A documentação pode ser acessada durante uma indisponibilidade do ambiente principal?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Uso e atualização",
        "n": true,
        "q": [
          {
            "id": "q14",
            "t": "Os procedimentos são realmente utilizados pela equipe?"
          },
          {
            "id": "q15",
            "t": "Os procedimentos são testados periodicamente?"
          },
          {
            "id": "q16",
            "t": "Existem documentos desatualizados ou conflitantes?"
          },
          {
            "id": "q17",
            "t": "Há controle de versão dos documentos?"
          }
        ]
      }
    ]
  },
  {
    "id": "4.3",
    "p": 4,
    "t": "Terceiros e fornecedores — SLA",
    "d": "Contratos, níveis de serviço, dependência, suporte e desempenho de fornecedores críticos.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário de fornecedores e contratos",
        "n": false,
        "q": [
          {
            "id": "q01",
            "t": "Quais fornecedores prestam serviços críticos?"
          },
          {
            "id": "q02",
            "t": "Quais fornecedores fornecem hardware, software, internet ou suporte?"
          },
          {
            "id": "q03",
            "t": "Quais contratos estão vigentes?"
          },
          {
            "id": "q04",
            "t": "Qual é o prazo de cada contrato?"
          },
          {
            "id": "q05",
            "t": "Quais contratos possuem renovação automática?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "SLA e desempenho",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Quais fornecedores possuem SLA formal?"
          },
          {
            "id": "q07",
            "t": "Qual é o tempo de resposta contratado?"
          },
          {
            "id": "q08",
            "t": "Qual é o tempo de solução contratado?"
          },
          {
            "id": "q09",
            "t": "Existem penalidades por descumprimento do SLA?"
          },
          {
            "id": "q10",
            "t": "Qual foi o tempo real de resposta nos últimos incidentes?"
          },
          {
            "id": "q11",
            "t": "Qual foi o tempo real de solução?"
          },
          {
            "id": "q12",
            "t": "Os fornecedores cumprem os níveis de serviço contratados?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Dependência e alternativas",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "Existe fornecedor único para algum serviço crítico?"
          },
          {
            "id": "q14",
            "t": "Existem alternativas ou fornecedores substitutos?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Acessos e proteção de dados",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Os fornecedores possuem acesso aos sistemas internos?"
          },
          {
            "id": "q16",
            "t": "Esses acessos são controlados e revisados?"
          },
          {
            "id": "q17",
            "t": "Os contratos tratam de confidencialidade e proteção de dados?"
          },
          {
            "id": "q18",
            "t": "Os contratos definem responsabilidade em caso de incidente?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Avaliação e saída",
        "n": true,
        "q": [
          {
            "id": "q19",
            "t": "Existe processo para avaliar o desempenho dos fornecedores?"
          },
          {
            "id": "q20",
            "t": "Existe plano de saída ou transição para fornecedores críticos?"
          }
        ]
      }
    ]
  },
  {
    "id": "4.4",
    "p": 4,
    "t": "Governança do atendimento — Helpdesk e NOC",
    "d": "Registro, priorização, acompanhamento, resolução e análise dos chamados e incidentes.",
    "b": [
      {
        "id": "b1",
        "t": "Registro e abertura de chamados",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existe ferramenta formal para abertura de chamados?"
          },
          {
            "id": "q02",
            "t": "Todos os chamados são registrados?"
          },
          {
            "id": "q03",
            "t": "Como os usuários solicitam suporte?"
          },
          {
            "id": "q04",
            "t": "Quem classifica e prioriza os chamados?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Prioridades, catálogo e acordos",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Existem níveis de prioridade definidos?"
          },
          {
            "id": "q06",
            "t": "Existem prazos de atendimento por prioridade?"
          },
          {
            "id": "q07",
            "t": "Existe catálogo de serviços?"
          },
          {
            "id": "q08",
            "t": "Os usuários conhecem os serviços disponíveis?"
          },
          {
            "id": "q09",
            "t": "Existe acordo de nível de serviço com os usuários?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Volume e desempenho",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Qual é o volume médio mensal de chamados?"
          },
          {
            "id": "q11",
            "t": "Qual é o tamanho atual do backlog?"
          },
          {
            "id": "q12",
            "t": "Há chamados antigos sem solução?"
          },
          {
            "id": "q13",
            "t": "Qual é o tempo médio de primeira resposta?"
          },
          {
            "id": "q14",
            "t": "Qual é o tempo médio de resolução?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Incidentes e causa raiz",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Quais tipos de incidentes ocorrem com maior frequência?"
          },
          {
            "id": "q16",
            "t": "Existem incidentes recorrentes?"
          },
          {
            "id": "q17",
            "t": "É realizada análise de causa raiz?"
          },
          {
            "id": "q18",
            "t": "As causas raiz geram planos de ação?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Gestão e indicadores",
        "n": true,
        "q": [
          {
            "id": "q19",
            "t": "A liderança recebe relatórios periódicos?"
          },
          {
            "id": "q20",
            "t": "Os indicadores de atendimento são acompanhados?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Plantão, escalonamento e satisfação",
        "n": true,
        "q": [
          {
            "id": "q21",
            "t": "Existe plantão ou atendimento fora do horário comercial?"
          },
          {
            "id": "q22",
            "t": "Quem atende incidentes críticos?"
          },
          {
            "id": "q23",
            "t": "O processo de escalonamento está documentado?"
          },
          {
            "id": "q24",
            "t": "Os usuários avaliam a qualidade do atendimento?"
          }
        ]
      }
    ]
  },
  {
    "id": "5.1",
    "p": 5,
    "t": "Gargalos de crescimento",
    "d": "Capacidade da infraestrutura, dos sistemas, das pessoas e dos processos para suportar o crescimento da empresa.",
    "b": [
      {
        "id": "b1",
        "t": "Cenários de crescimento",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "O que ocorreria se o volume de operações dobrasse?"
          },
          {
            "id": "q02",
            "t": "Qual componente atingiria o limite primeiro?"
          },
          {
            "id": "q03",
            "t": "A infraestrutura atual suporta o dobro de usuários?"
          },
          {
            "id": "q04",
            "t": "A infraestrutura atual suporta cinco vezes o volume atual?"
          },
          {
            "id": "q05",
            "t": "A infraestrutura atual suporta dez vezes o volume atual?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Capacidade técnica",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Os sistemas suportam o crescimento previsto?"
          },
          {
            "id": "q07",
            "t": "Os bancos de dados suportam o aumento de volume?"
          },
          {
            "id": "q08",
            "t": "A rede suporta o crescimento da quantidade de usuários e dispositivos?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Equipe e processos",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "A equipe atual consegue suportar o crescimento?"
          },
          {
            "id": "q11",
            "t": "Quais áreas gerariam maior fila ou atraso?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Investimento e planejamento",
        "n": true,
        "q": [
          {
            "id": "q12",
            "t": "Quais fornecedores poderiam se tornar gargalos?"
          },
          {
            "id": "q13",
            "t": "Qual investimento seria necessário para dobrar a capacidade?"
          },
          {
            "id": "q14",
            "t": "Qual investimento seria necessário para suportar cinco vezes o volume?"
          },
          {
            "id": "q15",
            "t": "Existem limites contratuais de licenças ou usuários?"
          },
          {
            "id": "q16",
            "t": "Existe plano de capacidade para os próximos 12, 24 e 36 meses?"
          }
        ]
      }
    ]
  },
  {
    "id": "5.2",
    "p": 5,
    "t": "Dívida técnica",
    "d": "Sistemas legados, soluções improvisadas, processos manuais e arquiteturas obsoletas que aumentam o risco e o custo operacional.",
    "b": [
      {
        "id": "b1",
        "t": "Soluções improvisadas e manuais",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quais soluções provisórias se tornaram permanentes?"
          },
          {
            "id": "q02",
            "t": "Quais planilhas são essenciais para a operação?"
          },
          {
            "id": "q03",
            "t": "Quais processos dependem de controles manuais?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Legado e obsolescência",
        "n": true,
        "q": [
          {
            "id": "q04",
            "t": "Quais sistemas legados continuam em operação?"
          },
          {
            "id": "q05",
            "t": "Existem sistemas sem suporte do fabricante?"
          },
          {
            "id": "q06",
            "t": "Existem sistemas que não podem ser atualizados?"
          },
          {
            "id": "q07",
            "t": "Existem integrações frágeis ou difíceis de manter?"
          },
          {
            "id": "q08",
            "t": "Existem equipamentos obsoletos ainda essenciais?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Custo e risco",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "Quais problemas técnicos são conhecidos, mas ainda não foram corrigidos?"
          },
          {
            "id": "q10",
            "t": "Qual é o custo mensal de manutenção dessas soluções?"
          },
          {
            "id": "q11",
            "t": "Qual é o risco de uma falha nesses sistemas?"
          },
          {
            "id": "q12",
            "t": "Quanto custaria substituir ou modernizar cada solução?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Plano de redução",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "O que impede a correção ou substituição?"
          },
          {
            "id": "q14",
            "t": "Existe plano de redução da dívida técnica?"
          },
          {
            "id": "q15",
            "t": "Quais itens devem ser tratados com prioridade?"
          }
        ]
      }
    ]
  },
  {
    "id": "5.3",
    "p": 5,
    "t": "Preparação para transações corporativas — M&A e sucessão",
    "d": "Capacidade de auditar, documentar, integrar, separar ou transferir sistemas, processos e responsabilidades.",
    "b": [
      {
        "id": "b1",
        "t": "Inventário e organização",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Os ativos de tecnologia estão inventariados?"
          },
          {
            "id": "q02",
            "t": "Os contratos de software e infraestrutura estão organizados?"
          },
          {
            "id": "q03",
            "t": "Os sistemas críticos estão documentados?"
          },
          {
            "id": "q04",
            "t": "Os custos de tecnologia podem ser identificados por área ou unidade?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Auditoria e acessos",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "É possível identificar quem possui acesso a cada sistema?"
          },
          {
            "id": "q06",
            "t": "É possível auditar rapidamente os principais riscos de TI?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Integração e separação",
        "n": true,
        "q": [
          {
            "id": "q07",
            "t": "A empresa conseguiria integrar seus sistemas a outra organização?"
          },
          {
            "id": "q08",
            "t": "A empresa conseguiria separar seus sistemas de uma operação incorporada?"
          },
          {
            "id": "q09",
            "t": "Existem sistemas ou dados que dificultariam uma separação?"
          },
          {
            "id": "q10",
            "t": "Existem contratos que impedem a transferência ou alteração de controle?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Pessoas e sucessão",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Existem fornecedores dependentes de relacionamento pessoal?"
          },
          {
            "id": "q12",
            "t": "O conhecimento necessário está documentado?"
          },
          {
            "id": "q13",
            "t": "A sucessão da liderança poderia ocorrer sem perda de informações?"
          },
          {
            "id": "q14",
            "t": "O que impediria uma transição de liderança sem interrupção?"
          },
          {
            "id": "q15",
            "t": "Existe plano de transição para funções críticas?"
          }
        ]
      }
    ]
  },
  {
    "id": "6.1",
    "p": 6,
    "t": "Metas, planejamento e indicadores",
    "d": "Clareza das metas, acompanhamento dos resultados, responsabilidade dos gestores e tomada de decisão baseada em dados.",
    "b": [
      {
        "id": "b1",
        "t": "Metas anuais",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existem metas formais para o ano?"
          },
          {
            "id": "q02",
            "t": "As metas incluem faturamento?"
          },
          {
            "id": "q03",
            "t": "As metas incluem margem de lucro?"
          },
          {
            "id": "q04",
            "t": "As metas incluem quantidade de clientes?"
          },
          {
            "id": "q05",
            "t": "As metas incluem redução de custos?"
          },
          {
            "id": "q06",
            "t": "As metas incluem produtividade ou qualidade?"
          },
          {
            "id": "q07",
            "t": "Cada meta possui um responsável definido?"
          },
          {
            "id": "q08",
            "t": "Existem prazos para alcançar cada meta?"
          },
          {
            "id": "q09",
            "t": "As metas são desdobradas por área ou equipe?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Indicadores",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Quais indicadores são acompanhados semanalmente?"
          },
          {
            "id": "q11",
            "t": "Quais indicadores são acompanhados mensalmente?"
          },
          {
            "id": "q12",
            "t": "Quem acompanha cada indicador?"
          },
          {
            "id": "q13",
            "t": "De onde vêm os dados dos indicadores?"
          },
          {
            "id": "q14",
            "t": "Os dados são confiáveis e atualizados?"
          },
          {
            "id": "q15",
            "t": "Existe painel ou relatório de acompanhamento?"
          },
          {
            "id": "q16",
            "t": "Os indicadores possuem metas e limites de alerta?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Reuniões e acompanhamento",
        "n": true,
        "q": [
          {
            "id": "q17",
            "t": "Existe reunião periódica para análise dos resultados?"
          },
          {
            "id": "q18",
            "t": "As decisões tomadas nas reuniões são registradas?"
          },
          {
            "id": "q19",
            "t": "As ações definidas possuem responsáveis e prazos?"
          },
          {
            "id": "q20",
            "t": "O cumprimento das ações é acompanhado?"
          }
        ]
      }
    ]
  },
  {
    "id": "6.2",
    "p": 6,
    "t": "Mercado, clientes-alvo e concorrência",
    "d": "Conhecimento do mercado, perfil dos clientes, diferenciais competitivos e riscos externos.",
    "b": [
      {
        "id": "b1",
        "t": "Cliente-alvo e segmentos",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quem é o cliente ideal da empresa?"
          },
          {
            "id": "q02",
            "t": "Quais segmentos de clientes são atendidos?"
          },
          {
            "id": "q03",
            "t": "Quais segmentos geram maior faturamento?"
          },
          {
            "id": "q04",
            "t": "Quais segmentos geram maior margem?"
          },
          {
            "id": "q05",
            "t": "Quais segmentos apresentam maior inadimplência?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Diferenciais",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "Por que os clientes escolhem a empresa?"
          },
          {
            "id": "q07",
            "t": "Quais são os principais diferenciais percebidos?"
          },
          {
            "id": "q08",
            "t": "Essa percepção foi confirmada diretamente com os clientes?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Concorrência",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "Quem são os principais concorrentes?"
          },
          {
            "id": "q10",
            "t": "Quais concorrentes oferecem produtos ou serviços semelhantes?"
          },
          {
            "id": "q11",
            "t": "Como os preços se comparam aos concorrentes?"
          },
          {
            "id": "q12",
            "t": "Quais concorrentes estão crescendo mais rapidamente?"
          },
          {
            "id": "q13",
            "t": "Existem novos concorrentes entrando no mercado?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Tendências e riscos externos",
        "n": true,
        "q": [
          {
            "id": "q14",
            "t": "Quais mudanças tecnológicas podem afetar o negócio?"
          },
          {
            "id": "q15",
            "t": "Quais mudanças regulatórias podem afetar o negócio?"
          },
          {
            "id": "q16",
            "t": "Existem riscos relacionados à sazonalidade?"
          },
          {
            "id": "q17",
            "t": "Quais tendências podem afetar os próximos 12 meses?"
          },
          {
            "id": "q18",
            "t": "Existe plano para responder às principais mudanças do mercado?"
          }
        ]
      }
    ]
  },
  {
    "id": "7.1",
    "p": 7,
    "t": "Fluxo de caixa e controle financeiro",
    "d": "Previsibilidade financeira, controle de entradas e saídas, separação entre empresa e sócios e disciplina de aprovação.",
    "b": [
      {
        "id": "b1",
        "t": "Fluxo de caixa",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existe fluxo de caixa atualizado?"
          },
          {
            "id": "q02",
            "t": "O fluxo de caixa é projetado para quantos meses?"
          },
          {
            "id": "q03",
            "t": "A projeção é comparada com o realizado?"
          },
          {
            "id": "q04",
            "t": "As entradas previstas possuem data e valor estimados?"
          },
          {
            "id": "q05",
            "t": "As saídas previstas possuem data e valor estimados?"
          },
          {
            "id": "q06",
            "t": "Existem despesas recorrentes não registradas?"
          },
          {
            "id": "q07",
            "t": "A empresa possui reserva financeira?"
          },
          {
            "id": "q08",
            "t": "Quantos meses de operação a reserva suporta?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Separação entre empresa e sócios",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "As contas pessoais dos sócios estão separadas das contas da empresa?"
          },
          {
            "id": "q10",
            "t": "Existem pagamentos pessoais feitos pela empresa?"
          },
          {
            "id": "q11",
            "t": "Existem despesas da empresa pagas pelos sócios?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Pagamentos e separação de funções",
        "n": true,
        "q": [
          {
            "id": "q12",
            "t": "Quem registra as contas a pagar?"
          },
          {
            "id": "q13",
            "t": "Quem aprova os pagamentos?"
          },
          {
            "id": "q14",
            "t": "Quem executa os pagamentos?"
          },
          {
            "id": "q15",
            "t": "Existe separação de funções?"
          },
          {
            "id": "q16",
            "t": "Existem pagamentos sem documentação?"
          },
          {
            "id": "q17",
            "t": "Os pagamentos são conciliados com os extratos bancários?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Fechamento e análise",
        "n": true,
        "q": [
          {
            "id": "q18",
            "t": "Em quantos dias o mês é encerrado financeiramente?"
          },
          {
            "id": "q19",
            "t": "Em quantos dias o resultado contábil fica disponível?"
          },
          {
            "id": "q20",
            "t": "Quem analisa os números financeiros?"
          },
          {
            "id": "q21",
            "t": "Existem diferenças frequentes entre o fluxo previsto e o realizado?"
          },
          {
            "id": "q22",
            "t": "Essas diferenças são analisadas e explicadas?"
          }
        ]
      }
    ]
  },
  {
    "id": "7.2",
    "p": 7,
    "t": "Custos, margem e formação de preço",
    "d": "Conhecimento da rentabilidade por produto, serviço, cliente e operação.",
    "b": [
      {
        "id": "b1",
        "t": "Margem por produto, serviço e cliente",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "A empresa conhece a margem por produto?"
          },
          {
            "id": "q02",
            "t": "A empresa conhece a margem por serviço?"
          },
          {
            "id": "q03",
            "t": "A empresa conhece a margem por cliente?"
          },
          {
            "id": "q04",
            "t": "Os custos diretos são apropriados corretamente?"
          },
          {
            "id": "q05",
            "t": "Os custos indiretos são distribuídos?"
          },
          {
            "id": "q06",
            "t": "Existem produtos ou serviços vendidos com margem negativa?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Formação de preço e descontos",
        "n": true,
        "q": [
          {
            "id": "q07",
            "t": "Como os preços são definidos?"
          },
          {
            "id": "q08",
            "t": "O preço considera custo, impostos, comissão e margem?"
          },
          {
            "id": "q09",
            "t": "O preço é definido com base nos concorrentes?"
          },
          {
            "id": "q10",
            "t": "Existem descontos autorizados?"
          },
          {
            "id": "q11",
            "t": "Quem pode aprovar descontos?"
          },
          {
            "id": "q12",
            "t": "Os descontos são analisados quanto ao impacto na margem?"
          },
          {
            "id": "q13",
            "t": "Quando os preços foram revisados pela última vez?"
          },
          {
            "id": "q14",
            "t": "Os preços são revisados quando os custos aumentam?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Custos e ponto de equilíbrio",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Quais custos fixos cresceram nos últimos 12 meses?"
          },
          {
            "id": "q16",
            "t": "Quais custos variáveis cresceram nos últimos 12 meses?"
          },
          {
            "id": "q17",
            "t": "Existem custos que não são monitorados?"
          },
          {
            "id": "q18",
            "t": "A empresa sabe qual é o ponto de equilíbrio?"
          },
          {
            "id": "q19",
            "t": "Qual é o faturamento mínimo mensal necessário para cobrir os custos?"
          }
        ]
      }
    ]
  },
  {
    "id": "7.3",
    "p": 7,
    "t": "Crédito, endividamento e inadimplência",
    "d": "Nível de endividamento, dependência de crédito, vendas a prazo e capacidade de cobrança.",
    "b": [
      {
        "id": "b1",
        "t": "Endividamento",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Qual é o valor total das dívidas da empresa?"
          },
          {
            "id": "q02",
            "t": "Qual é o prazo de cada dívida?"
          },
          {
            "id": "q03",
            "t": "Qual é o custo efetivo de cada dívida?"
          },
          {
            "id": "q04",
            "t": "Qual é o valor mensal das parcelas?"
          },
          {
            "id": "q05",
            "t": "Quanto das receitas mensais é comprometido com dívidas?"
          },
          {
            "id": "q06",
            "t": "Existem dívidas vencidas?"
          },
          {
            "id": "q07",
            "t": "Existem dívidas tributárias ou trabalhistas?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Dependência de crédito",
        "n": true,
        "q": [
          {
            "id": "q08",
            "t": "A empresa depende de capital de giro?"
          },
          {
            "id": "q09",
            "t": "A empresa utiliza antecipação de recebíveis?"
          },
          {
            "id": "q10",
            "t": "A empresa depende de um único banco?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Vendas a prazo e inadimplência",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Qual é o percentual de vendas realizadas a prazo?"
          },
          {
            "id": "q12",
            "t": "Qual é o prazo médio de recebimento?"
          },
          {
            "id": "q13",
            "t": "Qual é o índice de inadimplência?"
          },
          {
            "id": "q14",
            "t": "Quais clientes possuem maior saldo em atraso?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Cobrança e proteção",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Quem é responsável pela cobrança?"
          },
          {
            "id": "q16",
            "t": "Existe procedimento formal de cobrança?"
          },
          {
            "id": "q17",
            "t": "São aplicados juros, multas ou outras medidas?"
          },
          {
            "id": "q18",
            "t": "Existem limites de crédito por cliente?"
          },
          {
            "id": "q19",
            "t": "Quem aprova vendas para clientes inadimplentes?"
          },
          {
            "id": "q20",
            "t": "A empresa possui seguro de crédito ou outra proteção?"
          }
        ]
      }
    ]
  },
  {
    "id": "8.1",
    "p": 8,
    "t": "Carteira de clientes e concentração",
    "d": "Qualidade, distribuição, histórico e dependência da carteira de clientes.",
    "b": [
      {
        "id": "b1",
        "t": "Base de clientes e concentração",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quantos clientes ativos a empresa possui?"
          },
          {
            "id": "q02",
            "t": "Quantos clientes compraram nos últimos 12 meses?"
          },
          {
            "id": "q03",
            "t": "Qual percentual do faturamento vem dos dez maiores clientes?"
          },
          {
            "id": "q04",
            "t": "Quantos clientes respondem por metade do faturamento?"
          },
          {
            "id": "q05",
            "t": "Qual é o faturamento do maior cliente?"
          },
          {
            "id": "q06",
            "t": "A perda do maior cliente seria suportável?"
          },
          {
            "id": "q07",
            "t": "Existem clientes com risco elevado de perda?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Cadastro e informação",
        "n": true,
        "q": [
          {
            "id": "q08",
            "t": "Existe cadastro completo dos clientes?"
          },
          {
            "id": "q09",
            "t": "O cadastro contém histórico de compras?"
          },
          {
            "id": "q10",
            "t": "O cadastro contém contatos e responsáveis?"
          },
          {
            "id": "q11",
            "t": "As informações estão no sistema ou dependem dos vendedores?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Retenção e recompra",
        "n": true,
        "q": [
          {
            "id": "q12",
            "t": "Qual é a taxa de recompra?"
          },
          {
            "id": "q13",
            "t": "Qual é a taxa de cancelamento ou perda de clientes?"
          },
          {
            "id": "q14",
            "t": "Qual é o custo médio para conquistar um novo cliente?"
          },
          {
            "id": "q15",
            "t": "Qual é o tempo médio de permanência dos clientes?"
          },
          {
            "id": "q16",
            "t": "Existem ações para aumentar a retenção?"
          },
          {
            "id": "q17",
            "t": "Existe plano para reduzir a concentração da receita?"
          }
        ]
      }
    ]
  },
  {
    "id": "8.2",
    "p": 8,
    "t": "Processo comercial e pós-venda",
    "d": "Geração de oportunidades, vendas, propostas, acompanhamento, entrega, suporte e fidelização.",
    "b": [
      {
        "id": "b1",
        "t": "Canais de aquisição",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quais são os principais canais de aquisição de clientes?"
          },
          {
            "id": "q02",
            "t": "Quanto cada canal gera em oportunidades?"
          },
          {
            "id": "q03",
            "t": "Quanto cada canal gera em vendas?"
          },
          {
            "id": "q04",
            "t": "O custo de cada canal é acompanhado?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Prospecção e funil de vendas",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Existe processo definido para prospecção?"
          },
          {
            "id": "q06",
            "t": "Existe registro das oportunidades comerciais?"
          },
          {
            "id": "q07",
            "t": "Quais são as etapas do processo de venda?"
          },
          {
            "id": "q08",
            "t": "Existem critérios para qualificar uma oportunidade?"
          },
          {
            "id": "q09",
            "t": "Existe padrão para elaboração de propostas?"
          },
          {
            "id": "q10",
            "t": "As propostas possuem prazo de validade?"
          },
          {
            "id": "q11",
            "t": "O motivo das vendas perdidas é registrado?"
          },
          {
            "id": "q12",
            "t": "A taxa de conversão é acompanhada?"
          },
          {
            "id": "q13",
            "t": "Qual é o tempo médio entre o primeiro contato e o fechamento?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Equipe comercial e comissões",
        "n": true,
        "q": [
          {
            "id": "q14",
            "t": "Existem metas para a equipe comercial?"
          },
          {
            "id": "q15",
            "t": "Como são definidas as comissões?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Entrega e pós-venda",
        "n": true,
        "q": [
          {
            "id": "q16",
            "t": "O que acontece após o fechamento da venda?"
          },
          {
            "id": "q17",
            "t": "Existe processo formal de entrega ou implantação?"
          },
          {
            "id": "q18",
            "t": "Como são tratadas reclamações e solicitações de garantia?"
          },
          {
            "id": "q19",
            "t": "Existe atendimento pós-venda?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Satisfação e recompra",
        "n": true,
        "q": [
          {
            "id": "q20",
            "t": "A satisfação dos clientes é medida?"
          },
          {
            "id": "q21",
            "t": "Os resultados das avaliações geram ações de melhoria?"
          },
          {
            "id": "q22",
            "t": "Existe processo de renovação ou recompra?"
          }
        ]
      }
    ]
  },
  {
    "id": "9.1",
    "p": 9,
    "t": "Processos principais e padronização",
    "d": "Padronização, responsabilidades, prazos, qualidade, retrabalho e continuidade dos processos operacionais.",
    "b": [
      {
        "id": "b1",
        "t": "Mapa dos processos",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Quais são os principais processos da empresa?"
          },
          {
            "id": "q02",
            "t": "Quais processos geram mais receita?"
          },
          {
            "id": "q03",
            "t": "Quais processos geram mais custos?"
          },
          {
            "id": "q04",
            "t": "Quais processos geram mais reclamações?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Padronização e responsáveis",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Os processos estão documentados?"
          },
          {
            "id": "q06",
            "t": "Cada processo possui um responsável?"
          },
          {
            "id": "q07",
            "t": "Cada etapa possui prazo definido?"
          },
          {
            "id": "q08",
            "t": "Existem indicadores para medir os processos?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Atrasos, erros e retrabalho",
        "n": true,
        "q": [
          {
            "id": "q09",
            "t": "Onde ocorrem os maiores atrasos?"
          },
          {
            "id": "q10",
            "t": "Onde ocorrem os maiores erros?"
          },
          {
            "id": "q11",
            "t": "Onde ocorre retrabalho?"
          },
          {
            "id": "q12",
            "t": "Qual é o custo estimado do retrabalho?"
          },
          {
            "id": "q13",
            "t": "Existem atividades realizadas em duplicidade?"
          },
          {
            "id": "q14",
            "t": "Existem aprovações que atrasam a operação?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Automação e comunicação",
        "n": true,
        "q": [
          {
            "id": "q16",
            "t": "Os processos podem ser automatizados?"
          },
          {
            "id": "q17",
            "t": "Como são comunicados os atrasos?"
          },
          {
            "id": "q18",
            "t": "A liderança recebe informações sobre problemas operacionais?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Melhoria contínua",
        "n": true,
        "q": [
          {
            "id": "q19",
            "t": "Existe plano de melhoria contínua?"
          },
          {
            "id": "q20",
            "t": "As melhorias implementadas são verificadas depois?"
          }
        ]
      }
    ]
  },
  {
    "id": "9.2",
    "p": 9,
    "t": "Compras, estoque e fornecedores",
    "d": "Planejamento de compras, controle de estoque, custos, fornecedores críticos e continuidade do abastecimento.",
    "b": [
      {
        "id": "b1",
        "t": "Planejamento e aprovação de compras",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Como são identificadas as necessidades de compra?"
          },
          {
            "id": "q02",
            "t": "Existe planejamento de compras?"
          },
          {
            "id": "q03",
            "t": "Quem solicita uma compra?"
          },
          {
            "id": "q04",
            "t": "Quem aprova uma compra?"
          },
          {
            "id": "q05",
            "t": "Existe limite de aprovação por valor?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Cotação e fornecedores",
        "n": true,
        "q": [
          {
            "id": "q06",
            "t": "São realizadas cotações com mais de um fornecedor?"
          },
          {
            "id": "q07",
            "t": "Os preços e prazos são comparados?"
          },
          {
            "id": "q08",
            "t": "Existem fornecedores preferenciais?"
          },
          {
            "id": "q09",
            "t": "Existem fornecedores únicos para itens críticos?"
          },
          {
            "id": "q10",
            "t": "Existem fornecedores alternativos?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Controle de estoque",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Como é controlado o estoque?"
          },
          {
            "id": "q12",
            "t": "O estoque físico corresponde ao estoque registrado no sistema?"
          },
          {
            "id": "q13",
            "t": "Quando foi realizado o último inventário?"
          },
          {
            "id": "q14",
            "t": "Qual foi a diferença encontrada no último inventário?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Giro, perdas e rupturas",
        "n": true,
        "q": [
          {
            "id": "q15",
            "t": "Existem produtos parados ou obsoletos?"
          },
          {
            "id": "q16",
            "t": "Existem faltas frequentes de produtos?"
          },
          {
            "id": "q17",
            "t": "Qual é o giro médio do estoque?"
          },
          {
            "id": "q18",
            "t": "Existem níveis mínimo e máximo de estoque?"
          },
          {
            "id": "q19",
            "t": "Existem perdas, avarias ou vencimentos?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Fornecimento e continuidade",
        "n": true,
        "q": [
          {
            "id": "q20",
            "t": "Os fornecedores cumprem os prazos acordados?"
          },
          {
            "id": "q21",
            "t": "Existem contratos ou SLAs com fornecedores críticos?"
          },
          {
            "id": "q22",
            "t": "O aumento de preços dos fornecedores é monitorado?"
          },
          {
            "id": "q23",
            "t": "Existe plano para interrupção do fornecimento?"
          }
        ]
      }
    ]
  },
  {
    "id": "10.1",
    "p": 10,
    "t": "Estrutura, papéis e liderança",
    "d": "Estrutura organizacional, responsabilidades, delegação, capacidade de liderança, contratação e retenção.",
    "b": [
      {
        "id": "b1",
        "t": "Estrutura e responsabilidades",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "Existe organograma atualizado?"
          },
          {
            "id": "q02",
            "t": "As responsabilidades de cada função estão documentadas?"
          },
          {
            "id": "q03",
            "t": "Existem atividades sem responsável definido?"
          },
          {
            "id": "q04",
            "t": "Existem pessoas com responsabilidades sobrepostas?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Dependência do dono e delegação",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Quantas decisões dependem diretamente do dono?"
          },
          {
            "id": "q06",
            "t": "O que deixaria de funcionar se o dono se ausentasse por 15 dias?"
          },
          {
            "id": "q07",
            "t": "Existem gestores para as áreas críticas?"
          },
          {
            "id": "q08",
            "t": "Os gestores possuem autonomia para decidir?"
          },
          {
            "id": "q09",
            "t": "Existem reuniões de acompanhamento das equipes?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Metas, avaliação e feedback",
        "n": true,
        "q": [
          {
            "id": "q10",
            "t": "Como são definidas as metas individuais?"
          },
          {
            "id": "q11",
            "t": "Como os funcionários são avaliados?"
          },
          {
            "id": "q12",
            "t": "Existe processo de feedback?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Contratação e desenvolvimento",
        "n": true,
        "q": [
          {
            "id": "q13",
            "t": "Como ocorre a contratação?"
          },
          {
            "id": "q14",
            "t": "Existe integração para novos funcionários?"
          },
          {
            "id": "q15",
            "t": "Existe treinamento periódico?"
          },
          {
            "id": "q16",
            "t": "Existe plano de desenvolvimento profissional?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Rotatividade",
        "n": true,
        "q": [
          {
            "id": "q17",
            "t": "Qual foi a rotatividade nos últimos 12 meses?"
          },
          {
            "id": "q18",
            "t": "Quais áreas apresentam maior rotatividade?"
          },
          {
            "id": "q19",
            "t": "Quais são os principais motivos de desligamento?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Funções críticas e sucessão",
        "n": true,
        "q": [
          {
            "id": "q20",
            "t": "Existem funções críticas sem substituto preparado?"
          },
          {
            "id": "q21",
            "t": "Existe plano de sucessão para funções-chave?"
          }
        ]
      }
    ]
  },
  {
    "id": "10.2",
    "p": 10,
    "t": "Obrigações legais, fiscais e trabalhistas",
    "d": "Regularidade fiscal, trabalhista, contratual, regulatória e controle de prazos legais.",
    "b": [
      {
        "id": "b1",
        "t": "Situação fiscal",
        "n": true,
        "q": [
          {
            "id": "q01",
            "t": "A empresa está regular perante os órgãos fiscais?"
          },
          {
            "id": "q02",
            "t": "Existem impostos em atraso?"
          },
          {
            "id": "q03",
            "t": "Existem parcelamentos tributários ativos?"
          },
          {
            "id": "q04",
            "t": "As certidões negativas estão válidas?"
          }
        ]
      },
      {
        "id": "b2",
        "t": "Alvarás e licenças",
        "n": true,
        "q": [
          {
            "id": "q05",
            "t": "Existem alvarás e licenças obrigatórios?"
          },
          {
            "id": "q06",
            "t": "As licenças possuem controle de vencimento?"
          },
          {
            "id": "q07",
            "t": "Existe responsável pelo acompanhamento das obrigações?"
          }
        ]
      },
      {
        "id": "b3",
        "t": "Regime tributário e passivos",
        "n": true,
        "q": [
          {
            "id": "q08",
            "t": "O regime tributário foi revisado recentemente?"
          },
          {
            "id": "q09",
            "t": "A revisão foi realizada por profissional qualificado?"
          },
          {
            "id": "q10",
            "t": "Existem passivos fiscais conhecidos?"
          }
        ]
      },
      {
        "id": "b4",
        "t": "Obrigações trabalhistas",
        "n": true,
        "q": [
          {
            "id": "q11",
            "t": "Existem processos trabalhistas em andamento?"
          },
          {
            "id": "q12",
            "t": "Existem riscos trabalhistas identificados?"
          },
          {
            "id": "q13",
            "t": "Os contratos de trabalho estão formalizados?"
          },
          {
            "id": "q14",
            "t": "Os controles de jornada estão adequados?"
          },
          {
            "id": "q15",
            "t": "As obrigações trabalhistas são entregues no prazo?"
          }
        ]
      },
      {
        "id": "b5",
        "t": "Contratos",
        "n": true,
        "q": [
          {
            "id": "q16",
            "t": "Os contratos com clientes estão formalizados?"
          },
          {
            "id": "q17",
            "t": "Os contratos com fornecedores estão formalizados?"
          },
          {
            "id": "q18",
            "t": "Os contratos possuem cláusulas de responsabilidade e proteção de dados?"
          },
          {
            "id": "q19",
            "t": "Os contratos possuem prazos de renovação controlados?"
          }
        ]
      },
      {
        "id": "b6",
        "t": "Documentos e controle de prazos",
        "n": true,
        "q": [
          {
            "id": "q20",
            "t": "Os documentos legais estão armazenados de forma organizada?"
          },
          {
            "id": "q21",
            "t": "Existe controle das obrigações e vencimentos?"
          },
          {
            "id": "q22",
            "t": "Há revisão periódica dos contratos relevantes?"
          }
        ]
      }
    ]
  }
]
