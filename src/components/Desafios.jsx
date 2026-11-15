const desafios = [
  {
    title: 'Interrupções',
    desc: 'que comprometem as operações.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5M12 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Perda',
    desc: 'de informações e exposição a riscos digitais.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.5 3.5 3 8 3s8-1.5 8-3V6" />
        <path d="M4 12c0 1.5 3.5 3 8 3s8-1.5 8-3" />
        <path d="M12 17v3" />
      </svg>
    ),
  },
  {
    title: 'Dependência',
    desc: 'de conhecimentos concentrados em poucas pessoas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <path d="M14 16.5c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" />
      </svg>
    ),
  },
  {
    title: 'Investimentos',
    desc: 'tecnológicos sem prioridades claras.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V14M10 20V8M16 20V11M4 20h18" />
        <text x="12" y="6" fontSize="6" fill="currentColor" stroke="none" textAnchor="middle" fontWeight="700">$</text>
      </svg>
    ),
  },
  {
    title: 'Infraestruturas',
    desc: 'e processos que não acompanham o crescimento.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="5" rx="1" />
        <rect x="3" y="11" width="18" height="5" rx="1" />
        <circle cx="7" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="7" cy="13.5" r="0.5" fill="currentColor" />
        <path d="M14 20l4-4 4 4" />
      </svg>
    ),
  },
  {
    title: 'Decisões',
    desc: 'tomadas sem visibilidade suficiente dos riscos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M12 15h.01" />
        <circle cx="12" cy="17" r="1.5" fill="none" />
      </svg>
    ),
  },
]

export default function Desafios() {
  return (
    <section id="desafios" className="relative py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#033aca]" />
          Os desafios do crescimento
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-5 max-w-[820px] text-balance leading-[1.15]">
          O que pode <em className="not-italic text-[#1e5bff] font-medium">comprometer</em> esse crescimento?
        </h2>
        <p className="text-[17px] text-white/70 leading-relaxed max-w-[720px] mb-4">
          O crescimento de uma empresa exige mais do que conquistar novos clientes e ampliar suas operações. É necessário preservar a <strong className="text-white font-semibold">continuidade do negócio</strong>, proteger <strong className="text-white font-semibold">informações estratégicas</strong>, manter a <strong className="text-white font-semibold">eficiência operacional</strong> e tomar decisões que sustentem sua evolução.
        </p>
        <p className="text-[15px] text-white/60 leading-relaxed max-w-[720px] mb-12">
          Mesmo empresas bem administradas podem enfrentar situações que colocam seus resultados em risco. Entre os principais desafios estão:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {desafios.map((d, i) => (
            <div
              key={d.title}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#033aca]/50 transition-all duration-300 animate-rise"
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#033aca]/15 flex items-center justify-center text-[#4a7dff] mb-4">
                <span className="w-6 h-6 block">{d.icon}</span>
              </div>
              <h4 className="font-['Fraunces',Georgia,serif] font-semibold text-[1.1rem] text-white mb-1.5 leading-tight">
                {d.title}
              </h4>
              <p className="text-white/65 text-[0.9rem] leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Mensagem central */}
        <div className="mt-12 flex items-center gap-5 p-6 lg:p-7 rounded-2xl bg-gradient-to-br from-[#033aca]/10 to-transparent border border-[#033aca]/30">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#033aca] flex items-center justify-center" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <div>
            <div className="text-[10.5px] font-bold tracking-[0.22em] text-[#4a7dff] uppercase mb-1">Mensagem central</div>
            <p className="font-['Fraunces',Georgia,serif] text-[clamp(1.15rem,1.9vw,1.5rem)] text-white font-medium leading-[1.3] text-balance">
              Crescer exige <em className="italic text-[#1e5bff]">preparação, proteção</em> e <em className="italic text-[#1e5bff]">capacidade de evolução</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
