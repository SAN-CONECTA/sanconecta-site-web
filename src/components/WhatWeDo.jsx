import { useReveal, useRevealAll } from '../hooks/useReveal'

const services = [
  {
    title: 'Consultoria em TI',
    desc: 'Analisamos o ambiente tecnológico da sua empresa e entregamos um plano estratégico para reduzir custos, aumentar eficiência e preparar sua infraestrutura para crescer.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12.01" />
      </svg>
    ),
  },
  {
    title: 'Outsourcing de TI',
    desc: 'Assuma o controle do seu negócio enquanto cuidamos de toda a operação de TI. Equipe técnica dedicada, SLA definido e suporte local em Sinop/MT.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Cibersegurança',
    desc: 'Proteção em camadas para redes, servidores e endpoints. Firewall, antivírus gerenciado, monitoramento de ameaças e resposta rápida a incidentes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Virtualização de Servidores',
    desc: 'Consolide servidores físicos em ambientes virtuais com Microsoft Hyper-V. Menos hardware, mais desempenho, alta disponibilidade e failover automático.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <circle cx="8" cy="7" r="1" fill="currentColor" stroke="none" />
        <circle cx="8" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Gestão de Parque Tecnológico',
    desc: 'Inventário, atualização e controle de todos os ativos de TI da sua empresa. Reduzimos retrabalho, aumentamos vida útil dos equipamentos e eliminamos surpresas.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Cabeamento Estruturado',
    desc: 'Projeto e execução de redes lógicas com cabeamento Cat6/Cat6A certificado. Organização, performance e escalabilidade para sua operação crescer sem dor de cabeça.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="4" height="6" rx="1" />
        <rect x="10" y="3" width="4" height="6" rx="1" />
        <rect x="10" y="15" width="4" height="6" rx="1" />
        <rect x="18" y="9" width="4" height="6" rx="1" />
        <path d="M6 12h4M14 6h2a2 2 0 012 2v4M14 18h2a2 2 0 002-2v-4" />
      </svg>
    ),
  },
  {
    title: 'Backup em Nuvem',
    desc: 'Seus dados protegidos com backup automatizado, criptografado e com retenção configurável. Recuperação rápida em qualquer cenário — falha de hardware, ransomware ou erro humano.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
      </svg>
    ),
  },
  {
    title: 'Projetos de CFTV',
    desc: 'Câmeras IP de alta resolução, gravação em nuvem ou local, acesso remoto e monitoramento inteligente. Segurança física integrada à sua estrutura de TI.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
]

export default function WhatWeDo() {
  const headRef = useReveal()
  const cardsRef = useRevealAll()

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">

        <div ref={headRef} className="reveal mb-14 max-w-xl">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-4">
            O que fazemos
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold text-white mb-4">
            Soluções completas para potencializar seu negócio.
          </h2>
          <p className="text-white/55 text-[16px] leading-relaxed">
            Combinamos experiência técnica com visão estratégica para entregar resultados que transformam a tecnologia em um diferencial competitivo.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <article
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} group flex flex-col gap-4 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {s.icon}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-[16px] font-semibold text-white">{s.title}</h3>
                <p className="text-[14px] text-white/55 leading-relaxed">{s.desc}</p>
              </div>

              <a
                href="#contato"
                className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.1em] uppercase text-cyan-400/70 hover:text-cyan-400 transition-colors"
              >
                Saiba mais
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
