import { useReveal, useRevealAll } from '../hooks/useReveal'
import logo from '../assets/logo.png'

const cards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5fd1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Atendimento local',
    desc: 'Estamos em Sinop e atendemos a região do MT com proximidade real, não com call center distante.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5fd1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7l9 5 9-5-9-5z" />
        <path d="M3 17l9 5 9-5M3 12l9 5 9-5" />
      </svg>
    ),
    title: 'Parceiros referência',
    desc: 'Trabalhamos apenas com soluções consolidadas e com histórico comprovado de resultados.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5fd1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
    title: 'Resultado mensurável',
    desc: 'Tributos recuperados, certificados sob controle, riscos reduzidos. Tudo com indicadores claros.',
  },
]

export default function Why() {
  const headRef = useReveal()
  const cardsRef = useRevealAll()

  return (
    <section className="py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-16">
          <div className="flex justify-center mb-6" aria-hidden="true">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl scale-150" />
              <img
                src={logo}
                alt=""
                className="relative w-16 h-16 rounded-full object-cover border-2 border-white/10 shadow-[0_0_30px_rgba(95,209,230,0.25)]"
              />
            </div>
          </div>
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-4">
            Por que SAN Conecta
          </span>
          <h2 className="text-[clamp(24px,3vw,40px)] font-semibold text-white max-w-2xl mx-auto">
            O atendimento próximo de quem está aqui, com a força de quem é nacional.
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group p-7 rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#0a1c3a]/80 to-[#07142e] hover:border-cyan-500/20 hover:from-[#0a1c3a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-16px_rgba(95,209,230,0.08)]`}
            >
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 transition-all duration-300">
                {card.icon}
              </div>
              <h4 className="text-[17px] font-semibold text-white mb-2">{card.title}</h4>
              <p className="text-[14px] text-white/55 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
