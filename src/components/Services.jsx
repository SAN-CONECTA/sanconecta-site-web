import { useReveal, useRevealAll } from '../hooks/useReveal'
import logo from '../assets/logo.png'

function CheckIcon({ color = '#5fd1e6' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

const services = [
  {
    accentColor: '#2eaadc',
    accentLight: 'rgba(46,170,220,0.15)',
    accentBorder: 'rgba(46,170,220,0.25)',
    badgeLabel: 'Serviço Próprio',
    title: 'SAN',
    titleHighlight: 'Infraestrutura',
    description:
      'Infraestrutura de Rede Lógica, servidores Microsoft Hyper-V, Cluster e Storage — projetos sob medida para sua operação.',
    features: [
      'Projeto e implantação de redes lógicas estruturadas (cabeamento, switches, roteadores)',
      'Servidores Windows Server com Microsoft Hyper-V — virtualização de alta performance',
      'Cluster de alta disponibilidade e failover — sua operação nunca para',
      'Storage corporativo — armazenamento seguro, escalável e com redundância',
      'Suporte e manutenção contínua com atendimento local em Sinop/MT',
    ],
    cta: 'Quero um projeto de infraestrutura',
  },
  {
    accentColor: '#7c6fe0',
    accentLight: 'rgba(124,111,224,0.15)',
    accentBorder: 'rgba(124,111,224,0.25)',
    badgeLabel: 'Serviço Próprio',
    title: 'SAN',
    titleHighlight: 'Conectividade',
    description:
      'Links de internet dedicados, redes corporativas e soluções de conectividade para empresas que não podem parar.',
    features: [
      'Links dedicados com SLA garantido e suporte 24/7',
      'Roteamento inteligente com redundância de operadoras',
      'Wi-Fi corporativo gerenciado — cobertura e segurança em toda a empresa',
      'VPN site-a-site para integração segura entre filiais',
      'Monitoramento contínuo de disponibilidade e desempenho',
    ],
    cta: 'Quero uma proposta de conectividade',
  },
]

export default function Services() {
  const headRef = useReveal()
  const cardsRef = useRevealAll()

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6">

        <div ref={headRef} className="reveal text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-4">
            Serviços SAN
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold text-white mb-4">
            Soluções de TI desenvolvidas por nós.
          </h2>
          <p className="text-white/55 text-[16px] leading-relaxed">
            Projetos próprios entregues com responsabilidade técnica do início ao fim — infraestrutura, conectividade e suporte local em Sinop/MT.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <article
              key={idx}
              className={`reveal reveal-delay-${idx + 1} group relative flex flex-col rounded-3xl border bg-gradient-to-b from-[#0d2044] to-[#07142e] p-8 transition-all duration-300 hover:-translate-y-1`}
              style={{
                borderColor: s.accentBorder,
                '--hover-shadow': `0 20px 60px -20px ${s.accentLight}`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px -20px ${s.accentLight}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${s.accentColor}55, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border overflow-hidden"
                    style={{ background: s.accentLight, borderColor: s.accentBorder }}
                  >
                    <img src={logo} alt="SAN" className="w-7 h-7 rounded-full object-cover" />
                  </div>
                  <span className="text-[19px] font-bold font-['Fraunces',Georgia,serif] text-white">
                    {s.title}<em className="not-italic" style={{ color: s.accentColor }}> {s.titleHighlight}</em>
                  </span>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase border"
                  style={{ background: s.accentLight, borderColor: s.accentBorder, color: s.accentColor }}
                >
                  <CheckIcon color={s.accentColor} />
                  {s.badgeLabel}
                </span>
              </div>

              <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                {s.description}
              </p>

              <ul className="flex flex-col flex-1 mb-8">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-white/65 py-3 border-b border-white/[0.06] last:border-0">
                    <span className="flex-shrink-0 mt-0.5">
                      <CheckIcon color={s.accentColor} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className="group/btn inline-flex items-center gap-2 text-[14px] font-semibold transition-colors"
                style={{ color: s.accentColor }}
              >
                {s.cta}
                <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
