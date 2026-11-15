const segmentos = [
  'Incorporações',
  'Contabilidades',
  'Escritórios de advocacia',
  'Concessionárias',
  'Revendas agro',
]

export default function About() {
  return (
    <section id="sobre" className="relative py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#033aca]" />
          Quem somos
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-4 max-w-[820px] text-balance leading-[1.15]">
          Uma trajetória construída no{' '}
          <em className="not-italic text-[#1e5bff] font-medium">mercado empresarial</em>.
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-5">
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              <strong className="text-white font-semibold">Fundada em 2009</strong>, a SAN Conecta construiu sua trajetória atendendo empresas de diferentes segmentos e desenvolvendo experiência na implantação e sustentação de ambientes tecnológicos corporativos.
            </p>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              Ao longo dos anos posicionou-se em atender operações empresariais de maior complexidade tecnológica e consolidou-se com <strong className="text-white font-semibold">entregas pontuais</strong>, destacando-se nos segmentos listados ao lado.
            </p>

            {/* Linha do tempo */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 relative">
                {/* Linha de conexão */}
                <div className="absolute top-[22px] left-[16%] right-[16%] h-px bg-gradient-to-r from-[#033aca]/50 via-[#4a7dff]/40 to-[#033aca]/50" aria-hidden="true" />

                {[
                  { marker: '2009', title: 'Início', sub: 'da nossa trajetória' },
                  { marker: '→', title: 'Expansão', sub: 'em operações de maior complexidade' },
                  { marker: '→', title: 'Experiência', sub: 'técnica, operacional e empresarial' },
                ].map((step, i) => (
                  <div key={i} className="relative text-center">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${i === 0 ? 'bg-[#033aca] text-white' : 'bg-[#07142e] border border-[#033aca]/50 text-[#4a7dff]'} font-['Fraunces',Georgia,serif] italic font-semibold text-[1rem] relative z-10 tabular-nums`}>
                      {step.marker}
                    </div>
                    <div className="mt-3 text-white font-semibold text-[0.95rem]">{step.title}</div>
                    <div className="text-white/50 text-[0.78rem] mt-1 leading-tight">{step.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 rounded-3xl p-9">
            <span className="absolute left-0 top-9 bottom-9 w-[3px] bg-[#033aca] rounded-r" />
            <div className="text-[10.5px] font-bold tracking-[0.22em] text-[#4a7dff] uppercase mb-3">
              Segmentos atendidos
            </div>
            <h4 className="font-['Fraunces',Georgia,serif] italic text-white text-[1.25rem] mb-6 leading-tight">
              Operações empresariais de maior complexidade tecnológica.
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-0">
              {segmentos.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 py-3 border-b border-white/[0.08] last:border-b-0 text-[0.98rem] text-white font-medium"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1e5bff]" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Um novo ciclo */}
        <div className="mt-20 pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#1e5bff] tracking-[0.22em] uppercase mb-5">
              <span className="w-7 h-px bg-[#033aca]" />
              Um novo ciclo
            </span>
            <h3 className="text-[clamp(24px,3vw,36px)] font-semibold text-white mb-5 max-w-[500px] text-balance leading-[1.15]">
              Um novo ciclo, <em className="not-italic text-[#1e5bff] font-medium">a mesma essência</em>.
            </h3>
          </div>
          <div className="space-y-5">
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              <strong className="text-white font-semibold">Em 2026</strong>, a SAN Conecta inicia um novo ciclo, unindo a experiência técnica e operacional à visão comercial e estratégica de seus sócios.
            </p>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              Essa evolução se materializa em um portfólio de soluções que integra tecnologia, inovação e visão de negócios, fortalecendo a <strong className="text-white font-semibold">segurança, a eficiência e o crescimento sustentável</strong> das empresas.
            </p>
            <p className="text-[15px] text-white/55 leading-relaxed max-w-[540px] italic">
              Uma nova fase, construída sobre a mesma essência e trajetória de confiança.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
