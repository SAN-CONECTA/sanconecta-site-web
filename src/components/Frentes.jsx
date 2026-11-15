import { useState } from 'react'

const frentes = [
  {
    num: '01',
    title: 'Diagnóstico Tecnológico e Inovação',
    purpose: 'Clareza sobre as condições tecnológicas atuais, os riscos, as oportunidades e a preparação para o crescimento.',
    meta: '2 soluções',
    solutions: [
      {
        name: 'Diagnóstico de Eficiência Tecnológica',
        desc: 'Avaliação dos recursos tecnológicos existentes e de sua capacidade de atender às necessidades operacionais. Identifica gargalos, limitações e oportunidades de melhoria, orientando adequações que promovam maior eficiência, estabilidade e aproveitamento dos investimentos existentes.',
      },
      {
        name: 'Diagnóstico de Maturidade Tecnológica para o Crescimento Empresarial',
        desc: 'Avaliação estratégica dos recursos tecnológicos, de sua capacidade de atender às necessidades atuais e de sua preparação para acompanhar as demandas futuras previstas pela gestão. Identifica limitações, oportunidades de inovação e necessidades de evolução, alinhando a tecnologia aos objetivos de crescimento.',
      },
    ],
  },
  {
    num: '02',
    title: 'Proteção Empresarial e Continuidade dos Negócios',
    purpose: 'Proteger informações, sistemas e operações essenciais, reduzindo riscos de interrupção e perdas empresariais.',
    meta: '5 soluções',
    solutions: [
      {
        name: 'Proteção de Dados Empresariais',
        tech: 'Implantação e configuração de soluções de backup',
        desc: 'Proteção das informações empresariais por meio de soluções de backup, permitindo sua recuperação em situações de falha, perda de dados ou interrupções.',
      },
      {
        name: 'Estruturação da Rede Lógica',
        tech: 'Configuração de VLANs',
        desc: 'Organização e segmentação da rede corporativa para controlar a comunicação entre ambientes, melhorar a segurança e reduzir riscos operacionais.',
      },
      {
        name: 'Proteção da Rede contra Ameaças Digitais',
        tech: 'Firewall',
        desc: 'Implantação e configuração de firewall para controlar o tráfego da rede, proteger as conexões corporativas e reduzir a exposição a acessos indevidos e ameaças externas.',
      },
      {
        name: 'Proteção de Equipamentos e Sistemas',
        tech: 'Antivírus',
        desc: 'Implantação e configuração de soluções de antivírus para proteger computadores e servidores contra programas maliciosos, reduzindo riscos às informações e às operações.',
      },
      {
        name: 'Gestão de Licenças',
        tech: 'Orientação e configuração de licenças',
        desc: 'Avaliação e organização do licenciamento de softwares empresariais, orientando sua utilização adequada, a conformidade e o melhor aproveitamento dos investimentos.',
      },
    ],
  },
  {
    num: '03',
    title: 'Eficiência Operacional e Preparação para o Crescimento',
    purpose: 'Melhorar o desempenho, a confiabilidade e a capacidade de expansão dos recursos tecnológicos.',
    meta: '3 soluções',
    solutions: [
      {
        name: 'Infraestrutura de Rede Empresarial',
        tech: 'Retrofit ou Implantação',
        desc: 'Adequação da estrutura física de conectividade para reduzir falhas, melhorar a confiabilidade das operações e acompanhar as necessidades de crescimento da empresa.',
      },
      {
        name: 'Desempenho e Disponibilidade de Servidores',
        tech: 'Implantação, Configuração e Modernização de Servidores',
        desc: 'Adequação dos ambientes físicos e virtuais para proporcionar maior estabilidade, capacidade de processamento e disponibilidade dos sistemas essenciais ao negócio.',
      },
      {
        name: 'Proteção e Estabilidade Energética',
        tech: 'Implantação e Configuração de Nobreaks (UPS)',
        desc: 'Proteção dos equipamentos tecnológicos contra oscilações e interrupções no fornecimento de energia, reduzindo riscos de danos, indisponibilidade dos sistemas e paralisações operacionais.',
      },
    ],
  },
  {
    num: '04',
    title: 'Organização, Controle e Segurança Empresarial',
    purpose: 'Estabelecer controles, responsabilidades e procedimentos que fortaleçam a organização e a segurança das operações.',
    meta: '2 soluções',
    solutions: [
      {
        name: 'Governança e Padronização de TI',
        tech: 'Revisão de Acessos, Definição de Políticas de TI e Criação de POPs',
        desc: 'Estruturação de regras, permissões e responsabilidades para o uso da tecnologia, com definição de normas e procedimentos operacionais padrão, reduzindo falhas e acessos indevidos e promovendo maior controle, segurança e organização nas operações empresariais.',
      },
      {
        name: 'Proteção de Dados Pessoais e Conformidade com a LGPD',
        tech: 'Implantação e Acompanhamento do Programa LGPD SAN',
        desc: 'Implementação e acompanhamento de práticas de proteção de dados pessoais, integrando tecnologia, processos e orientação consultiva para identificar riscos, organizar responsabilidades e evidências e acompanhar a evolução das ações de adequação. Contribui para reduzir riscos legais e operacionais e fortalecer a confiança nas relações empresariais.',
      },
    ],
  },
  {
    num: '05',
    title: 'Consultoria e Gestão Tecnológica de Negócios',
    purpose: 'Visão estratégica para novas oportunidades. Apoio consultivo e independente para decisões de evolução e expansão empresarial.',
    meta: '3 soluções',
    solutions: [
      {
        name: 'Aconselhamento Executivo em Tecnologia e Inovação',
        desc: 'Orientação independente para apoiar empresários e executivos em decisões sobre tecnologia, inovação e transformação digital, contribuindo para antecipar riscos, identificar oportunidades e direcionar investimentos alinhados aos objetivos e ao crescimento do negócio.',
      },
      {
        name: 'Avaliação Tecnológica para Aquisições e Expansão Empresarial',
        desc: 'Avaliação independente dos riscos, sistemas, infraestrutura e dependências tecnológicas envolvidos em aquisições, integrações e projetos de expansão, oferecendo recomendações para decisões mais seguras e maior previsibilidade na continuidade das operações.',
      },
      {
        name: 'Gestão de Projetos Tecnológicos',
        desc: 'Apoio independente na definição das necessidades tecnológicas da empresa, estruturando as soluções e especificações para orientar investimentos e contratações. Inclui avaliação de propostas, qualificação de fornecedores, acompanhamento da execução e verificação da qualidade das entregas, proporcionando maior controle sobre custos, prazos e resultados, com liberdade para contratar produtos e serviços de diferentes fornecedores.',
      },
    ],
  },
]

export default function Frentes() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="frentes" className="relative py-24 lg:py-32 bg-[#050a18]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#033aca]" />
          O portfólio
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-4 max-w-[820px] text-balance leading-[1.15]">
          As <em className="not-italic text-[#1e5bff] font-medium">5 frentes</em> do TI 360.
        </h2>
        <p className="text-[17px] text-white/65 leading-relaxed max-w-[720px] mb-14">
          Clique em uma frente para ver as soluções que ela organiza. Cada solução pode ser contratada individualmente ou combinada com outras conforme a realidade e as prioridades do seu negócio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frentes.map((f, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={f.num}
                className={`bg-gradient-to-b from-white/[0.03] to-white/[0.01] border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? 'border-[#033aca]/60' : 'border-white/15'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left p-7 cursor-pointer grid gap-y-1 gap-x-5 items-center"
                  style={{
                    gridTemplateColumns: 'auto 1fr auto',
                    gridTemplateAreas: '"num title chev" "num purpose chev" "num meta chev"',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-['Fraunces',Georgia,serif] italic font-semibold text-[2.75rem] text-[#1e5bff] leading-none tabular-nums self-center"
                    style={{ gridArea: 'num' }}
                  >
                    {f.num}
                  </span>
                  <span
                    className="font-['Fraunces',Georgia,serif] font-semibold text-[1.2rem] text-white leading-tight"
                    style={{ gridArea: 'title' }}
                  >
                    {f.title}
                  </span>
                  <span
                    className="text-white/65 text-[0.86rem] mt-1.5"
                    style={{ gridArea: 'purpose' }}
                  >
                    {f.purpose}
                  </span>
                  <span
                    className="text-[#5fd1e6] text-[10.5px] tracking-[0.18em] uppercase mt-2.5"
                    style={{ gridArea: 'meta' }}
                  >
                    {f.meta}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center self-center transition-all duration-200 text-lg leading-none ${
                      isOpen
                        ? 'bg-[#033aca] text-white rotate-45'
                        : 'bg-white/[0.06] text-white/60'
                    }`}
                    style={{ gridArea: 'chev' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-7 pb-7 border-t border-white/[0.08] pt-5">
                    <ul className="list-none p-0 m-0 flex flex-col">
                      {f.solutions.map((s) => (
                        <li
                          key={s.name}
                          className="py-4 border-b border-white/[0.08] last:border-b-0"
                        >
                          <div className="text-white font-semibold text-[0.95rem] mb-1">{s.name}</div>
                          {s.tech && (
                            <div className="text-[#5fd1e6] text-[0.78rem] font-semibold tracking-[0.04em] mb-2">
                              Entrega técnica: <span className="text-[#5fd1e6]/90">{s.tech}</span>
                            </div>
                          )}
                          <div className="text-white/65 text-[0.85rem] leading-relaxed">
                            {s.desc}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
