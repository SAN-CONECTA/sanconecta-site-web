export default function About() {
  const traits = [
    'Consultoria independente — sem vínculo com fabricantes',
    'Visão executiva: ligamos tecnologia a resultados empresariais',
    'Metodologia MAPES para diagnósticos de maturidade',
    'Portfólio modular — você contrata o que precisa',
    'Atendimento local em Sinop e região',
  ]

  return (
    <section id="sobre" className="relative py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#f0c75c] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#d4a93a]" />
          Quem somos
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-4 max-w-[820px] text-balance leading-[1.15]">
          Uma consultoria independente, dentro de uma empresa com{' '}
          <em className="not-italic text-[#f0c75c] font-medium">21 anos de estrada</em>.
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-5">
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              A <strong className="text-white font-semibold">SAN Tecnologia</strong> é uma empresa de Sinop/MT fundada em 2005. A <strong className="text-white font-semibold">SAN Conecta</strong> é a unidade dedicada à consultoria estratégica em tecnologia da informação, criada para apoiar lideranças empresariais em decisões sobre tecnologia, inovação e investimentos.
            </p>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              Nossa atuação é <strong className="text-white font-semibold">independente</strong> — não representamos fabricantes nem revendedores. Isso nos permite recomendar o que faz mais sentido para o seu negócio, não para quem patrocina a análise.
            </p>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-[540px]">
              Trabalhamos conectando tecnologia, processos, pessoas, governança e estratégia. Nossa referência é o <strong className="text-white font-semibold">portfólio TI 360</strong>: 6 frentes e 18 soluções que podem ser contratadas de forma pontual, recorrente ou integrada.
            </p>
          </div>

          <aside className="relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 rounded-3xl p-9">
            <span className="absolute left-0 top-9 bottom-9 w-[3px] bg-[#d4a93a] rounded-r" />
            <h4 className="font-['Fraunces',Georgia,serif] italic text-[#f0c75c] text-[1.15rem] mb-5">
              O que nos define
            </h4>
            <ul className="list-none p-0 m-0">
              {traits.map((trait, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-3 border-b border-white/[0.08] last:border-b-0 text-[0.95rem] text-white/85"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#5fd1e6] mt-2.5" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
