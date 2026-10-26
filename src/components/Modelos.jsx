const modelos = [
  {
    tag: 'Modelo 01',
    titulo: 'Soluções pontuais',
    desc: 'Diagnósticos, projetos de implantação, adequações e consultorias com escopo, entregas e orçamento definidos conforme a necessidade do cliente.',
    exemplo:
      'um diagnóstico tecnológico seguido da modernização dos servidores e da segmentação da rede.',
  },
  {
    tag: 'Modelo 02',
    titulo: 'Serviços recorrentes',
    desc: 'Acompanhamento contínuo com atividades periódicas, responsabilidades definidas e remuneração mensal. Hoje disponíveis em duas soluções do portfólio.',
    exemplo: 'LGPD San + Aconselhamento Executivo contínuo à liderança.',
  },
  {
    tag: 'Modelo 03',
    titulo: 'Projetos integrados',
    desc: 'Combinação de soluções de diferentes frentes para atender necessidades empresariais mais amplas. A integração é uma possibilidade comercial, não uma exigência.',
    exemplo:
      'diagnóstico MAPES → governança de riscos → políticas de TI → firewall + LGPD recorrente.',
  },
]

export default function Modelos() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#f0c75c] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#d4a93a]" />
          Como trabalhamos
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-4 max-w-[820px] text-balance leading-[1.15]">
          Três formas de contratação.{' '}
          <em className="not-italic text-[#f0c75c] font-medium">Uma só abordagem</em>.
        </h2>
        <p className="text-[17px] text-white/65 leading-relaxed max-w-[680px] mb-14">
          Partimos sempre do seu contexto e dos resultados que você busca. Depois identificamos as soluções pertinentes e construímos uma proposta sob medida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {modelos.map((m, i) => (
            <div
              key={m.tag}
              className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 rounded-3xl p-8 animate-rise"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <span className="inline-block text-[10.5px] tracking-[0.18em] text-[#5fd1e6] font-bold uppercase mb-4">
                {m.tag}
              </span>
              <h3 className="font-['Fraunces',Georgia,serif] font-semibold text-[1.4rem] text-white mb-3.5 leading-tight">
                {m.titulo}
              </h3>
              <p className="text-white/65 text-[0.94rem] leading-relaxed mb-6">{m.desc}</p>
              <div className="pt-5 border-t border-white/[0.08] text-white/50 text-[0.82rem] leading-relaxed">
                <strong className="text-[#f0c75c] font-semibold">Exemplo: </strong>
                {m.exemplo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
