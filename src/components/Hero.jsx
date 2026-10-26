import logo from '../assets/logo.png'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(31,95,176,0.35) 0%, transparent 70%), #07142e',
      }}
    >
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={logo}
          alt=""
          className="w-[520px] h-[520px] rounded-full object-cover opacity-[0.04] blur-[2px]"
        />
      </div>

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Text content */}
        <div className="animate-rise" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400/90 tracking-[0.12em] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(95,209,230,0.8)]" />
            Canal Oficial · Sinop / MT
          </span>

          <h1 className="text-[clamp(32px,5.4vw,64px)] font-semibold text-white mb-6 leading-[1.1]">
            Soluções fiscais e de segurança digital{' '}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              ao seu alcance.
            </em>
          </h1>

          <p className="text-[17px] text-white/65 leading-relaxed mb-8 max-w-[480px]">
            Somos canal de vendas <strong className="text-white/85 font-semibold">exclusivo da TrustPanel</strong> e{' '}
            <strong className="text-white/85 font-semibold">parceiro EX Group</strong>. Conectamos empresas a tecnologias que economizam tempo, recuperam tributos e protegem certificados digitais.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1f5fb0] hover:bg-[#2eaadc] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(46,170,220,0.5)] hover:shadow-[0_8px_28px_-4px_rgba(46,170,220,0.6)] hover:-translate-y-0.5 text-[15px]"
            >
              Quero conhecer
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white/75 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-all duration-200 font-medium text-[15px] hover:bg-white/5"
            >
              Ver soluções
            </a>
          </div>
        </div>

        {/* Visual orb */}
        <div
          className="relative flex items-center justify-center animate-rise"
          style={{ animationDelay: '0.25s' }}
          aria-hidden="true"
        >
          {/* Outer ring */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" />
          {/* Inner ring */}
          <div className="absolute w-[290px] h-[290px] rounded-full border border-dashed border-blue-400/15 animate-spin-reverse" />

          {/* Glow */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/20 blur-3xl" />

          {/* Center orb */}
          <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_60px_-10px_rgba(46,170,220,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] bg-[#0a1c3a]">
            <img src={logo} alt="SAN Conecta" className="w-full h-full object-cover" />
          </div>

          {/* Float tag — EX Group */}
          <div className="absolute top-6 left-0 animate-float-1">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#07142e]/90 border border-[#d4a93a]/30 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-[#f0c75c] shadow-[0_0_8px_rgba(240,199,92,0.7)] flex-shrink-0" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#f0c75c]">EX Group</div>
                <div className="text-[11px] text-white/60 mt-0.5">+ R$ 2 bi recuperados</div>
              </div>
            </div>
          </div>

          {/* Float tag — TrustPanel */}
          <div className="absolute bottom-6 right-0 animate-float-2">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#07142e]/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(95,209,230,0.7)] flex-shrink-0" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-cyan-400">TrustPanel</div>
                <div className="text-[11px] text-white/60 mt-0.5">Gerenciamento do Certificado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07142e] to-transparent pointer-events-none" />
    </section>
  )
}
