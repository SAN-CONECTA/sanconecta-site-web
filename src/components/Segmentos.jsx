import { useState } from 'react'

const segmentos = {
  contabilidade: {
    label: 'Escritórios de contabilidade',
    objetivos: [
      'Crescer a carteira de clientes',
      'Aumentar a produtividade da equipe',
      'Cumprir prazos e obrigações legais',
      'Preservar a reputação e a confiança',
      'Expandir sem comprometer qualidade',
    ],
    dores: [
      'Interrupções que impedem a equipe de trabalhar',
      'Processos ineficientes que geram retrabalho',
      'Perda ou exposição de informações confidenciais',
      'Dependência de poucos profissionais-chave',
      'Falhas que comprometem prazos e entregas',
    ],
    ganhos: [
      'Continuidade e estabilidade das operações',
      'Mais produtividade e eficiência',
      'Proteção das informações suas e dos clientes',
      'Controle sobre os processos',
      'Previsibilidade para crescer',
    ],
    proposta: {
      pre: 'A SAN Conecta contribui para que escritórios de contabilidade cresçam com',
      destaque: 'produtividade, segurança e continuidade operacional',
      pos: ', preservando a confiança de seus clientes.',
    },
  },
  incorporadoras: {
    label: 'Incorporadoras',
    objetivos: [
      'Desenvolver empreendimentos com eficiência',
      'Cumprir compromissos e cronogramas',
      'Preservar margens e rentabilidade',
      'Ampliar a capacidade de novos empreendimentos',
      'Expandir com controle e previsibilidade',
    ],
    dores: [
      'Informações dispersas entre departamentos',
      'Processos desconectados que prejudicam resultados',
      'Interrupções que comprometem as operações',
      'Falta de informações confiáveis para decidir',
      'Investimentos sem clareza sobre prioridades',
    ],
    ganhos: [
      'Integração entre áreas e processos',
      'Informações confiáveis para orientar decisões',
      'Mais eficiência e controle operacional',
      'Continuidade das operações',
      'Segurança na realização de investimentos',
    ],
    proposta: {
      pre: 'A SAN Conecta contribui para que incorporadoras desenvolvam e ampliem seus negócios com',
      destaque: 'eficiência operacional, controle e segurança nas decisões',
      pos: '.',
    },
  },
}

function Column({ title, items }) {
  return (
    <div>
      <h4 className="font-['Montserrat',system-ui,sans-serif] font-extrabold text-[#f0c75c] text-[11.5px] tracking-[0.16em] uppercase mb-4 pb-3 border-b border-white/10">
        {title}
      </h4>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-white/90 text-[0.92rem] leading-[1.5] pl-5 relative"
          >
            <span
              className="absolute left-0 top-[11px] w-2.5 h-px bg-[#d4a93a]"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Segmentos() {
  const [active, setActive] = useState('contabilidade')
  const data = segmentos[active]

  return (
    <section id="segmentos" className="relative py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">
        <span className="inline-flex items-center gap-2.5 text-xs font-bold text-[#f0c75c] tracking-[0.22em] uppercase mb-5">
          <span className="w-7 h-px bg-[#d4a93a]" />
          Para seu negócio
        </span>

        <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-white mb-4 max-w-[820px] text-balance leading-[1.15]">
          A mesma proposta de valor,{' '}
          <em className="not-italic text-[#f0c75c] font-medium">contextualizada</em> ao seu segmento.
        </h2>
        <p className="text-[17px] text-white/65 leading-relaxed max-w-[680px] mb-10">
          A SAN Conecta mantém uma proposta de valor institucional única, mas adapta a conversa aos objetivos e preocupações de cada tipo de empresa. Comece pelo seu.
        </p>

        {/* Tabs */}
        <div
          className="inline-flex bg-white/[0.04] border border-white/15 rounded-full p-1 mb-9 gap-0.5"
          role="tablist"
        >
          {Object.entries(segmentos).map(([key, seg]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              role="tab"
              aria-selected={active === key}
              className={`font-['Montserrat',system-ui,sans-serif] text-[12.5px] font-bold tracking-[0.08em] uppercase px-6 py-2.5 rounded-full transition-colors ${
                active === key
                  ? 'bg-[#d4a93a] text-[#07142e]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Column title="O que você quer alcançar" items={data.objetivos} />
          <Column title="O que tira sua tranquilidade" items={data.dores} />
          <Column title="O que você ganha" items={data.ganhos} />
        </div>

        {/* Proposta de valor contextualizada */}
        <div className="mt-10 p-8 lg:px-10 bg-gradient-to-br from-[#d4a93a]/10 to-[#d4a93a]/[0.02] border border-[#d4a93a]/30 rounded-3xl">
          <div className="text-[10.5px] font-bold tracking-[0.22em] text-[#f0c75c] uppercase mb-3">
            Proposta de valor contextualizada
          </div>
          <p className="font-['Fraunces',Georgia,serif] text-[clamp(1.1rem,2vw,1.45rem)] text-white font-medium leading-[1.4] text-balance">
            {data.proposta.pre}{' '}
            <em className="italic text-[#f0c75c]">{data.proposta.destaque}</em>
            {data.proposta.pos}
          </p>
        </div>
      </div>
    </section>
  )
}
