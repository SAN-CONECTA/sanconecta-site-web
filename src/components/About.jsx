import { useReveal, useRevealAll } from '../hooks/useReveal'
import logo from '../assets/logo.png'

const stats = [
  { num: '+21', label: 'anos de experiência em TI' },
  { num: '2009', label: 'contratos ativos desde então' },
  { num: '2', label: 'parcerias estratégicas nacionais' },
  { num: '100%', label: 'foco em resultado e relacionamento' },
]

export default function About() {
  const textRef = useReveal()
  const visRef = useReveal()
  const statsRef = useRevealAll()

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div ref={textRef} className="reveal">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-4">
            Quem somos
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold text-white mb-6">
            Uma rede que conecta empresas a soluções que{' '}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              geram resultado
            </em>
            .
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-4">
            A SAN Conecta é uma unidade de negócios da SAN Tecnologia, fundada em Sinop/MT em 2005. Nossa missão é simples: aproximar empresas do que há de mais avançado em tecnologia tributária, gestão de certificados digitais e segurança da informação.
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10">
            Com mais de 21 anos de experiência em TI corporativa e relacionamentos consolidados desde 2009, atuamos como ponte estratégica entre nossos clientes e parceiros nacionais de alto nível.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/20 hover:bg-white/[0.06] transition-all duration-300`}
              >
                <div className="text-[26px] font-bold font-['Fraunces',Georgia,serif] text-white mb-1">
                  {s.num}
                </div>
                <div className="text-[13px] text-white/50 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection visualization */}
        <div ref={visRef} className="reveal relative flex items-center justify-center" aria-hidden="true">
          <div className="relative w-[360px] h-[360px]">
            {/* SVG lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lg-san-ex" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5fd1e6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#e8c074" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="lg-san-tp" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5fd1e6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#5fd1e6" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="lg-ex-cli" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8c074" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="lg-tp-cli" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5fd1e6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <line x1="200" y1="80" x2="80" y2="200" stroke="url(#lg-san-ex)" strokeWidth="1.5" strokeDasharray="4 6" />
              <line x1="200" y1="80" x2="320" y2="200" stroke="url(#lg-san-tp)" strokeWidth="1.5" strokeDasharray="4 6" />
              <line x1="80" y1="200" x2="200" y2="320" stroke="url(#lg-ex-cli)" strokeWidth="1.5" strokeDasharray="4 6" />
              <line x1="320" y1="200" x2="200" y2="320" stroke="url(#lg-tp-cli)" strokeWidth="1.5" strokeDasharray="4 6" />
            </svg>

            {/* Center node — SAN */}
            <div className="absolute top-[50px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(95,209,230,0.2)] bg-[#0a1c3a]">
                <img src={logo} alt="SAN Conecta" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-cyan-400 tracking-wide">SAN Conecta</span>
            </div>

            {/* Left node — EX */}
            <div className="absolute top-1/2 left-[20px] -translate-y-1/2 flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-[#d4a93a]/10 border border-[#d4a93a]/40 flex items-center justify-center shadow-[0_0_16px_rgba(212,169,58,0.15)]">
                <span className="text-[15px] font-bold text-[#f0c75c] font-['Fraunces',Georgia,serif]">eX</span>
              </div>
              <span className="text-[11px] font-semibold text-[#f0c75c]/80">EX Group</span>
            </div>

            {/* Right node — TrustPanel */}
            <div className="absolute top-1/2 right-[20px] -translate-y-1/2 flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_16px_rgba(95,209,230,0.15)]">
                <span className="text-[15px] font-bold text-cyan-400 font-['Fraunces',Georgia,serif]">T</span>
              </div>
              <span className="text-[11px] font-semibold text-cyan-400/80">TrustPanel</span>
            </div>

            {/* Bottom node — client */}
            <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-white/50">Sua empresa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
