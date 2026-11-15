const valores = [
  {
    title: 'Conhecimento',
    sub: 'especializado',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
        <path d="M7 11l-2-1M17 11l2-1" />
      </svg>
    ),
  },
  {
    title: 'Execução',
    sub: 'de projetos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8 7l4 9M16 7l-4 9" />
      </svg>
    ),
  },
  {
    title: 'Orientação',
    sub: 'estratégica',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
        <path d="M12 12l5-3" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: 'Acompanhamento',
    sub: 'de iniciativas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V14M10 20V8M16 20V4" strokeWidth="2.5" />
        <path d="M4 20h16" />
      </svg>
    ),
  },
]

export default function Parceria() {
  return (
    <section id="parceria" className="relative py-24 lg:py-32 bg-[#050a18]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Cada empresa tem uma realidade */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center mb-24">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
              <span className="w-7 h-px bg-[#033aca]" />
              Modularidade
            </span>
            <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-5 max-w-[540px] text-balance leading-[1.15]">
              Cada empresa tem{' '}
              <em className="not-italic text-[#1e5bff] font-medium">uma realidade</em>.
            </h2>
            <div className="space-y-4 text-white/70 text-[16px] leading-relaxed max-w-[520px]">
              <p>Empresas possuem diferentes estruturas, desafios, prioridades e momentos de crescimento.</p>
              <p>Por isso, a atuação da SAN Conecta <strong className="text-white font-semibold">considera as necessidades específicas de cada organização</strong>.</p>
              <p>As soluções do TI 360 podem ser desenvolvidas de forma individual ou combinada, por meio de projetos específicos e serviços de acompanhamento contínuo, conforme o escopo contratado.</p>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-[#033aca]/10 to-transparent border border-[#033aca]/30 rounded-3xl p-9 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#033aca] flex items-center justify-center" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <p className="font-['Fraunces',Georgia,serif] text-[clamp(1.1rem,1.8vw,1.4rem)] text-white font-medium leading-[1.3] mb-3">
                  Soluções alinhadas <em className="italic text-[#1e5bff]">à sua realidade</em>, sem a necessidade de contratar todo o portfólio.
                </p>
                <p className="text-[13.5px] text-white/60 leading-relaxed">
                  Projetos específicos e serviços contínuos, de acordo com o seu momento e seus objetivos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Uma parceria que complementa */}
        <div className="pt-16 border-t border-white/10">
          <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
            <span className="w-7 h-px bg-[#033aca]" />
            Como atuamos
          </span>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-5 max-w-[760px] text-balance leading-[1.15]">
            Uma parceria que{' '}
            <em className="not-italic text-[#1e5bff] font-medium">complementa e fortalece</em>.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start mt-10">
            <div className="space-y-5 text-white/70 text-[16px] leading-relaxed max-w-[520px]">
              <p>A SAN Conecta <strong className="text-white font-semibold">atua de forma complementar</strong> às estruturas, equipes e lideranças das empresas.</p>
              <p>Nossa contribuição pode envolver conhecimento especializado, execução de projetos, orientação estratégica e acompanhamento de iniciativas, conforme as necessidades de cada organização.</p>
              <p>Buscamos fortalecer a capacidade das empresas de utilizar a tecnologia com <strong className="text-white font-semibold">segurança, eficiência e alinhamento aos seus objetivos</strong>.</p>
              <div className="mt-8 flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#033aca]/15 flex items-center justify-center text-[#4a7dff]" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l4 4 10-10" />
                    <path d="M3 19h18" />
                  </svg>
                </div>
                <p className="text-[0.95rem] text-white/85 leading-tight">
                  <strong className="text-white">Não é necessário substituir</strong> a estrutura existente para gerar valor ao negócio.
                </p>
              </div>
            </div>

            {/* 4 valores */}
            <div className="grid grid-cols-2 gap-4">
              {valores.map((v, i) => (
                <div
                  key={v.title}
                  className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 rounded-2xl p-6 animate-rise"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <div className="w-11 h-11 rounded-full bg-[#033aca]/15 flex items-center justify-center text-[#4a7dff] mb-4">
                    <span className="w-6 h-6 block">{v.icon}</span>
                  </div>
                  <div className="font-['Fraunces',Georgia,serif] font-semibold text-white text-[1.05rem] leading-tight">
                    {v.title}
                  </div>
                  <div className="text-white/55 text-[0.85rem] mt-1">{v.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fecho "Complementa estruturas. Fortalece resultados." */}
          <div className="mt-12 p-7 lg:p-8 rounded-2xl bg-gradient-to-br from-[#033aca] via-[#033aca]/90 to-[#021d6b] flex items-center gap-5 flex-wrap">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l-2.5 2.5a2 2 0 002.83 2.83L11 14M15 13l2.5-2.5a2 2 0 00-2.83-2.83L13 10M10 14l4-4" />
              </svg>
            </div>
            <div className="font-['Fraunces',Georgia,serif] text-[clamp(1.1rem,2vw,1.4rem)] text-white font-medium leading-tight">
              Complementa estruturas. <em className="italic">Fortalece resultados.</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
