import { useReveal, useRevealAll } from '../hooks/useReveal'

const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Coleta e análise de documentos fiscais, cruzamento de obrigações acessórias.',
  },
  {
    num: '02',
    title: 'Apresentação',
    desc: 'Resultados detalhados, oportunidades identificadas e potencial mapeado.',
  },
  {
    num: '03',
    title: 'Execução',
    desc: 'Revisão fiscal, retificações, homologações e compensações.',
  },
  {
    num: '04',
    title: 'Continuidade',
    desc: 'Monitoramento contínuo via plataforma EXIA e suporte do nosso time.',
  },
]

export default function Journey() {
  const headRef = useReveal()
  const stepsRef = useRevealAll()

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#f0c75c]/80 mb-4">
            Método Expert · Jornada Tributária Inteligente
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold text-white mb-4">
            Do primeiro contato ao resultado final, sem fricção.
          </h2>
          <p className="text-white/55 text-[16px] leading-relaxed">
            Para clientes da EX, organizamos toda a jornada dentro da plataforma EXIA — controle, transparência e performance em tempo real.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${i + 1} relative group p-6 rounded-3xl border border-white/[0.08] bg-[#07142e]/60 hover:border-[#d4a93a]/30 hover:bg-[#07142e]/80 transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Connector line (except last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-2 w-4 h-px bg-gradient-to-r from-[#d4a93a]/30 to-transparent z-10" />
              )}

              <span className="inline-block text-[32px] font-bold font-['Fraunces',Georgia,serif] text-[#d4a93a]/25 mb-4 group-hover:text-[#d4a93a]/40 transition-colors duration-300">
                {step.num}
              </span>
              <h4 className="text-[16px] font-semibold text-white mb-2">{step.title}</h4>
              <p className="text-[14px] text-white/50 leading-relaxed">{step.desc}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#d4a93a]/0 to-transparent group-hover:via-[#d4a93a]/30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
