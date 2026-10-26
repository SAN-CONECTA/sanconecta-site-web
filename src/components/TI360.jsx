const benefits = [
  {
    title: 'Continuidade',
    desc: 'Manter a empresa operando e cumprindo seus compromissos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Eficiência',
    desc: 'Aumentar a produtividade e melhorar os resultados do negócio.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: 'Proteção',
    desc: 'Preservar informações, patrimônio e reputação da empresa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Segurança nas decisões',
    desc: 'Investir com mais clareza e controle sobre os riscos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Crescimento sustentável',
    desc: 'Preparar a empresa para evoluir e ampliar sua competitividade.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

export default function TI360() {
  return (
    <section id="ti360" className="relative py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-[780px]">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#d4a93a]/10 border border-[#d4a93a]/30 rounded-xl mb-6">
            <span className="text-[#f0c75c] font-bold text-[13px] tracking-[0.22em] uppercase">
              ◆ Portfólio TI 360
            </span>
          </div>

          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-5 leading-[1.15] text-balance">
            Uma arquitetura. <em className="not-italic text-[#f0c75c] font-medium">6 frentes</em>. 18 soluções.
          </h2>
          <p className="text-[17px] text-white/65 leading-relaxed max-w-[680px] mb-10">
            O TI 360 não é um pacote fechado. É a arquitetura comercial que organiza nosso portfólio de consultoria em frentes estratégicas, cada uma com soluções que podem ser contratadas isoladamente, combinadas ou executadas como projetos integrados — sempre partindo da realidade do seu negócio.
          </p>

          <div className="inline-flex flex-wrap gap-6 px-5 py-4 border border-dashed border-white/15 rounded-xl mb-14">
            {[
              { v: '6', l: 'frentes' },
              { v: '18', l: 'soluções' },
              { v: '16', l: 'pontuais' },
              { v: '2', l: 'recorrentes' },
            ].map((s) => (
              <div key={s.l} className="text-[12.5px] text-white/50 tracking-[0.08em] uppercase">
                <strong className="text-[#f0c75c] text-[15px] tracking-normal mr-1.5">{s.v}</strong>
                {s.l}
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-['Montserrat',system-ui,sans-serif] font-bold text-[13px] tracking-[0.18em] text-white/60 uppercase mb-6">
          Os 5 benefícios empresariais que entregamos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-[#d4a93a]/50 hover:-translate-y-1 animate-rise"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#d4a93a]/10 flex items-center justify-center text-[#f0c75c] mb-5">
                <span className="w-5 h-5 block">{b.icon}</span>
              </div>
              <h4 className="font-['Montserrat',system-ui,sans-serif] font-extrabold text-[12.5px] tracking-[0.14em] uppercase text-[#f0c75c] mb-2.5">
                {b.title}
              </h4>
              <p className="text-[0.88rem] text-white/70 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
