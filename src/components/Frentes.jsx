import { useState } from 'react'

const frentes = [
  {
    num: '01',
    title: 'Diagnóstico e Planejamento',
    purpose: 'Clareza sobre as condições tecnológicas, riscos e oportunidades para orientar decisões e investimentos.',
    meta: '2 soluções · pontuais',
    solutions: [
      {
        name: 'Diagnóstico Tecnológico',
        type: 'pontual',
        desc: 'Avaliação das condições do ambiente tecnológico — infraestrutura, sistemas, conectividade e proteção — com plano de ação orientado à redução de riscos.',
      },
      {
        name: 'Diagnóstico de Maturidade MAPES',
        type: 'pontual',
        desc: 'Avaliação estratégica da maturidade tecnológica, capacidade de inovação e preparação da estrutura para sustentar o crescimento, usando a metodologia MAPES.',
      },
    ],
  },
  {
    num: '02',
    title: 'Proteção e Continuidade',
    purpose: 'Proteger informações, sistemas e operações essenciais, reduzindo riscos de interrupção e perdas empresariais.',
    meta: '5 soluções · pontuais',
    solutions: [
      {
        name: 'Backup e Continuidade',
        type: 'pontual',
        desc: 'Soluções de backup, armazenamento e recuperação de informações para reduzir riscos de perda de dados e interrupções.',
      },
      {
        name: 'Segmentação de Rede',
        type: 'pontual',
        desc: 'Proteção e segmentação da rede corporativa (VLANs), reduzindo acessos indevidos e propagação de ameaças.',
      },
      {
        name: 'Firewall Corporativo',
        type: 'pontual',
        desc: 'Implantação e configuração de firewall Fortinet e mecanismos especializados de proteção digital.',
      },
      {
        name: 'Segurança Cibernética',
        type: 'pontual',
        desc: 'Prevenção, identificação e mitigação de ameaças cibernéticas, protegendo ativos digitais e operações.',
      },
      {
        name: 'Gestão de Licenças',
        type: 'pontual',
        desc: 'Adequação do licenciamento de softwares, otimização de custos e redução de riscos.',
      },
    ],
  },
  {
    num: '03',
    title: 'Eficiência Operacional',
    purpose: 'Melhorar o desempenho e a confiabilidade dos recursos tecnológicos, preparando a estrutura para novas demandas.',
    meta: '3 soluções · pontuais',
    solutions: [
      {
        name: 'Infraestrutura Física de Rede',
        type: 'pontual',
        desc: 'Modernização da infraestrutura física de conectividade, promovendo organização, confiabilidade e capacidade de expansão.',
      },
      {
        name: 'Reestruturação Lógica de Rede',
        type: 'pontual',
        desc: 'Reorganização da comunicação entre sistemas e ambientes, reduzindo falhas e gargalos de desempenho.',
      },
      {
        name: 'Servidores e Virtualização',
        type: 'pontual',
        desc: 'Implantação e otimização de servidores e ambientes de processamento (Hyper-V, Cluster, Storage).',
      },
    ],
  },
  {
    num: '04',
    title: 'Organização, Controle e Segurança',
    purpose: 'Estabelecer controles, responsabilidades e procedimentos que fortaleçam a organização e a segurança das operações.',
    meta: '4 soluções · 1 recorrente',
    solutions: [
      {
        name: 'Controle de Acessos',
        type: 'pontual',
        desc: 'Definição e aprimoramento dos controles sobre quem pode acessar sistemas, ambientes e informações.',
      },
      {
        name: 'Políticas e Normas de TI',
        type: 'pontual',
        desc: 'Estruturação de normas e diretrizes para o uso responsável e seguro da tecnologia.',
      },
      {
        name: 'Procedimentos Operacionais (POPs)',
        type: 'pontual',
        desc: 'Elaboração de procedimentos padrão, manuais e documentação de processos tecnológicos.',
      },
      {
        name: 'LGPD San',
        type: 'recorrente',
        desc: 'Gestão continuada da conformidade com a LGPD, com plataforma de apoio, execução mensal e reuniões de acompanhamento.',
      },
    ],
  },
  {
    num: '05',
    title: 'Segurança nas Decisões',
    purpose: 'Oferecer à liderança uma visão independente sobre investimentos, riscos e prioridades estratégicas.',
    meta: '2 soluções · pontuais',
    solutions: [
      {
        name: 'Governança de Investimentos em TI',
        type: 'pontual',
        desc: 'Consultoria para planejamento, avaliação e acompanhamento de iniciativas e investimentos estratégicos em tecnologia.',
      },
      {
        name: 'Governança de Riscos Tecnológicos',
        type: 'pontual',
        desc: 'Identificação, avaliação e priorização de riscos tecnológicos, com orientação sobre seu tratamento.',
      },
    ],
  },
  {
    num: '06',
    title: 'Inovação e Crescimento',
    purpose: 'Apoiar a liderança na inovação, evolução empresarial e preparação para novos ciclos de crescimento.',
    meta: '2 soluções · 1 recorrente',
    solutions: [
      {
        name: 'Aconselhamento Executivo',
        type: 'recorrente',
        desc: 'Aconselhamento estratégico contínuo e independente à alta liderança sobre tecnologia, inovação, investimentos e crescimento.',
      },
      {
        name: 'Due Diligence Tecnológica',
        type: 'pontual',
        desc: 'Avaliação independente de riscos e desafios tecnológicos em aquisições, integrações e expansão empresarial.',
      },
    ],
  },
]

function TypeBadge({ type }) {
  if (type === 'recorrente') {
    return (
      <span className="inline-block text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full uppercase bg-[#5fd1e6]/15 text-[#5fd1e6]">
        Recorrente
      </span>
    )
  }
  return (
    <span className="inline-block text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full uppercase bg-white/[0.06] text-white/50">
      Pontual
    </span>
  )
}

export default function Frentes() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="frentes" className="relative py-24 lg:py-32 bg-[#050a18]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#f0c75c] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#d4a93a]" />
          O portfólio
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-4 max-w-[820px] text-balance leading-[1.15]">
          As <em className="not-italic text-[#f0c75c] font-medium">6 frentes</em> do TI 360.
        </h2>
        <p className="text-[17px] text-white/65 leading-relaxed max-w-[680px] mb-14">
          Clique em uma frente para ver as soluções que ela organiza. Cada solução pode ser contratada individualmente ou combinada com outras conforme a necessidade identificada.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frentes.map((f, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={f.num}
                className={`bg-gradient-to-b from-white/[0.03] to-white/[0.01] border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? 'border-[#d4a93a]/60' : 'border-white/15'
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
                    className="font-['Fraunces',Georgia,serif] italic font-semibold text-[2.75rem] text-[#f0c75c] leading-none tabular-nums self-center"
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
                        ? 'bg-[#d4a93a] text-[#07142e] rotate-45'
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
                          className="py-4 border-b border-white/[0.08] last:border-b-0 grid grid-cols-[1fr_auto] gap-y-1.5 gap-x-4 items-baseline"
                        >
                          <span className="text-white font-semibold text-[0.95rem]">{s.name}</span>
                          <TypeBadge type={s.type} />
                          <span className="col-span-full text-white/65 text-[0.85rem] leading-relaxed">
                            {s.desc}
                          </span>
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
