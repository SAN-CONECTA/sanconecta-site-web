import { useReveal } from '../hooks/useReveal'

export default function GoldStrip() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      className="reveal py-10 border-y border-[#d4a93a]/20"
      style={{
        background: 'linear-gradient(135deg, rgba(212,169,58,0.08) 0%, rgba(7,20,46,0) 60%), #07142e',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-[clamp(18px,2.5vw,26px)] font-['Fraunces',Georgia,serif] font-semibold text-white/90 leading-tight">
              Conectando empresas a{' '}
              <em className="not-italic text-[#f0c75c]">resultados reais.</em>
            </p>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 text-center">
            {[
              { num: '+21', label: 'anos' },
              { num: '2', label: 'parcerias nacionais' },
              { num: '1', label: 'ponto de contato' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-[20px] font-bold text-[#f0c75c] font-['Fraunces',Georgia,serif]">{item.num}</span>
                <span className="text-[12px] text-white/45 leading-tight mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
