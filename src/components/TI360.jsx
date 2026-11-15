export default function TI360() {
  return (
    <section id="ti360" className="relative py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Esquerda: proposta de valor */}
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
              <span className="w-7 h-px bg-[#033aca]" />
              Nossa proposta de valor
            </span>

            <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-6 max-w-[520px] text-balance leading-[1.15]">
              Para empresas crescerem com{' '}
              <em className="not-italic text-[#1e5bff] font-medium">segurança, eficiência e vantagem competitiva</em>.
            </h2>

            <p className="text-[17px] text-white/70 leading-relaxed max-w-[520px] mb-6">
              A SAN Conecta contribui para que empresas <strong className="text-white font-semibold">cresçam com segurança, eficiência e vantagem competitiva</strong>, fortalecendo suas operações, protegendo seus negócios e criando condições para um crescimento empresarial sustentável.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-3 bg-[#033aca]/10 border border-[#033aca]/30 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#033aca] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <p className="text-[0.95rem] text-white leading-tight">
                <strong className="font-semibold">Não é sobre vender tecnologia.</strong>
                <br />
                <span className="text-white/70">É sobre o que o seu negócio pode conquistar com ela.</span>
              </p>
            </div>
          </div>

          {/* Direita: destaque TI 360 */}
          <div className="bg-gradient-to-br from-[#033aca]/15 via-[#112a55]/30 to-[#07142e] border border-[#033aca]/40 rounded-3xl p-9 lg:p-11 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#033aca]/20 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-['Fraunces',Georgia,serif] font-bold text-white text-[clamp(3rem,6vw,5rem)] leading-none">TI</span>
                <span className="font-['Fraunces',Georgia,serif] font-bold text-[#1e5bff] text-[clamp(3rem,6vw,5rem)] leading-none">360</span>
              </div>

              <p className="text-white/80 text-[1.05rem] leading-relaxed mb-6">
                Tecnologia e inovação sustentando o crescimento de Negócios.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { n: '05', l: 'frentes estratégicas' },
                  { n: '15', l: 'soluções no portfólio' },
                ].map((s) => (
                  <div key={s.l} className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="font-['Fraunces',Georgia,serif] italic font-semibold text-[1.75rem] text-[#1e5bff] leading-none tabular-nums">
                      {s.n}
                    </div>
                    <div className="text-[11px] text-white/60 tracking-[0.12em] uppercase mt-2">{s.l}</div>
                  </div>
                ))}
              </div>

              <p className="text-[13.5px] text-white/60 leading-relaxed border-t border-white/10 pt-5">
                As soluções do TI 360 podem ser contratadas <strong className="text-white/85">de forma individual ou combinada</strong>, por meio de projetos específicos e serviços de acompanhamento contínuo, conforme o escopo contratado.
              </p>

              <a
                href="#frentes"
                className="group mt-7 inline-flex items-center gap-2.5 text-[#1e5bff] hover:text-[#4a7dff] font-semibold text-[0.95rem] transition-colors"
              >
                Ver as 5 frentes
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
