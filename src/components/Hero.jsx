import TI360Diagram from './TI360Diagram'

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
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(3,58,202,0.35) 0%, transparent 70%), #07142e',
      }}
    >
      {/* Watermark 3D sutil */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/assets/logo-3d-watermark.jpg"
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90%,900px)] h-auto opacity-[0.07] blur-[1px]"
          style={{ mixBlendMode: 'screen' }}
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
          <h1 className="text-[clamp(32px,5.4vw,60px)] font-semibold text-white mb-6 leading-[1.1]">
            Tecnologia e inovação sustentando o{' '}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#4a7dff] to-[#1e5bff]">
              crescimento de Negócios
            </em>
            .
          </h1>

          <p className="text-[17px] text-white/70 leading-relaxed mb-8 max-w-[540px]">
            Porque, para nós, <strong className="text-white font-semibold">não é sobre vender tecnologia</strong>. É sobre o que o seu negócio <strong className="text-white font-semibold">pode conquistar com ela</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#ti360"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#033aca] hover:bg-[#1e5bff] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(3,58,202,0.5)] hover:shadow-[0_8px_28px_-4px_rgba(3,58,202,0.6)] hover:-translate-y-0.5 text-[15px]"
            >
              Conhecer o TI 360
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white/75 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-all duration-200 font-medium text-[15px] hover:bg-white/5"
            >
              Falar com especialista
            </a>
          </div>

          {/* Signature stats */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <div className="font-['Fraunces',Georgia,serif] italic font-semibold text-[2rem] text-[#1e5bff] leading-none tabular-nums">
                2009
              </div>
              <div className="text-[11px] text-white/60 tracking-[0.14em] uppercase mt-1.5">início da trajetória</div>
            </div>
            <div>
              <div className="font-['Fraunces',Georgia,serif] italic font-semibold text-[2rem] text-[#1e5bff] leading-none tabular-nums">05</div>
              <div className="text-[11px] text-white/60 tracking-[0.14em] uppercase mt-1.5">frentes do TI 360</div>
            </div>
            <div>
              <div className="font-['Fraunces',Georgia,serif] italic font-semibold text-[2rem] text-[#1e5bff] leading-none tabular-nums">15</div>
              <div className="text-[11px] text-white/60 tracking-[0.14em] uppercase mt-1.5">soluções no portfólio</div>
            </div>
          </div>
        </div>

        {/* Diagrama TI 360 */}
        <div
          className="relative flex items-center justify-center animate-rise"
          style={{ animationDelay: '0.25s' }}
        >
          <TI360Diagram />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07142e] to-transparent pointer-events-none" />
    </section>
  )
}
