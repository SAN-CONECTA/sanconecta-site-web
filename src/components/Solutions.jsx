import { useReveal, useRevealAll } from '../hooks/useReveal'

function CheckIcon({ color = 'currentColor' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7v9" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

const trustPanelFeatures = [
  'Certificados nunca baixam na máquina do colaborador — tudo em nuvem segura',
  'Alertas automáticos antes do vencimento, evitando multas e bloqueios',
  'Controle de acesso por grupos (Financeiro, Fiscal, Compras…)',
  'Compatível com Windows e macOS, em conformidade com a LGPD',
  'Auditoria completa: saiba quem acessou, quando e o que fez',
]

const exGroupFeatures = [
  'Diagnóstico tributário completo: passado, presente e futuro',
  'Recuperação de valores pagos a maior e geração de fluxo de caixa',
  'Mapeamento de benefícios fiscais não aproveitados',
  'Plataforma EXIA: jornada do cliente em tempo real',
  '+7 mil clientes · 500 cidades · R$ 2 bilhões já recuperados',
]

export default function Solutions() {
  const headRef = useReveal()
  const cardsRef = useRevealAll()

  return (
    <section id="solucoes" className="py-24 lg:py-32 bg-[#07142e]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section header */}
        <div ref={headRef} className="reveal text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-4">
            Nossas parcerias
          </span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold text-white mb-4">
            Duas soluções, um único ponto de contato.
          </h2>
          <p className="text-white/55 text-[16px] leading-relaxed">
            Trabalhamos com parceiros que já são referência no Brasil — e cuidamos de toda a jornada do cliente, do diagnóstico ao pós-venda.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* TrustPanel */}
          <article className="reveal reveal-delay-1 group relative flex flex-col rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] hover:-translate-y-1" style={{ background: '#1c271c' }}>
            {/* Top glow */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-start justify-between mb-6">
              <a
                href="https://trustpanel.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group/link"
                aria-label="Visitar site da TrustPanel"
              >
                <img src="/Logo_TrustPanel_Vertical_03.png" alt="TrustPanel" className="h-9 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-white/30 group-hover/link:text-cyan-400 transition-colors">
                  <ExternalIcon />
                </span>
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold tracking-[0.1em] uppercase text-white">
                <CheckIcon color="white" />
                Canal Exclusivo
              </span>
            </div>

            <p className="text-white/70 text-[15px] leading-relaxed mb-6">
              Gestão automatizada de certificados digitais A1 — controle, criptografia AES-256 e zero risco de vazamento.
            </p>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {trustPanelFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-white/80">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon color="white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              className="group/btn inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-white/80 transition-colors"
            >
              Quero implantar na minha empresa
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
          </article>

          {/* EX Group */}
          <article className="reveal reveal-delay-2 group relative flex flex-col rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-1" style={{ background: '#daa521' }}>
            {/* Top glow */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="flex items-start justify-between mb-6">
              <a
                href="https://exsolucoestributarias.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group/link"
                aria-label="Visitar site da EX Soluções Tributárias"
              >
                <img src="https://exsolucoestributarias.com.br/wp-content/uploads/2025/04/logo-ex-consultoria.svg" alt="EX Soluções Tributárias" className="h-9 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-white/50 group-hover/link:text-white transition-colors">
                  <ExternalIcon />
                </span>
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold tracking-[0.1em] uppercase text-white">
                <CheckIcon color="white" />
                Canal Autorizado
              </span>
            </div>

            <p className="text-white/80 text-[15px] leading-relaxed mb-6">
              Recuperação de créditos tributários, diagnóstico fiscal e Método Expert — soluções para Simples Nacional, Lucro Presumido e Lucro Real.
            </p>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {exGroupFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-white/90">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon color="white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              className="group/btn inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-white/80 transition-colors"
            >
              Quero meu diagnóstico tributário
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
