import { useReveal } from '../hooks/useReveal'

const partners = [
  {
    name: 'TrustPanel',
    initials: 'TP',
    color: '#5fd1e6',
    bg: 'rgba(95,209,230,0.12)',
    border: 'rgba(95,209,230,0.25)',
    description: 'Certificados Digitais',
  },
  {
    name: 'EX Soluções Tributárias',
    initials: 'eX',
    color: '#f0c75c',
    bg: 'rgba(240,199,92,0.12)',
    border: 'rgba(240,199,92,0.25)',
    description: 'Recuperação Tributária',
  },
  {
    name: 'Microsoft',
    initials: 'MS',
    color: '#2eaadc',
    bg: 'rgba(46,170,220,0.12)',
    border: 'rgba(46,170,220,0.25)',
    description: 'Hyper-V & Windows Server',
  },
  {
    name: 'Intelbras',
    initials: 'IB',
    color: '#7c6fe0',
    bg: 'rgba(124,111,224,0.12)',
    border: 'rgba(124,111,224,0.25)',
    description: 'Redes & Segurança',
  },
  {
    name: 'Fortinet',
    initials: 'FT',
    color: '#e05c5c',
    bg: 'rgba(224,92,92,0.12)',
    border: 'rgba(224,92,92,0.25)',
    description: 'Firewall & Segurança',
  },
  {
    name: 'Dell Technologies',
    initials: 'DT',
    color: '#5fd1e6',
    bg: 'rgba(95,209,230,0.10)',
    border: 'rgba(95,209,230,0.20)',
    description: 'Servidores & Storage',
  },
  {
    name: 'Cisco',
    initials: 'CS',
    color: '#2eaadc',
    bg: 'rgba(46,170,220,0.10)',
    border: 'rgba(46,170,220,0.20)',
    description: 'Switching & Routing',
  },
  {
    name: 'Ubiquiti',
    initials: 'UI',
    color: '#7c6fe0',
    bg: 'rgba(124,111,224,0.10)',
    border: 'rgba(124,111,224,0.20)',
    description: 'Wi-Fi Corporativo',
  },
]

function PartnerCard({ partner }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl border mx-3 min-w-[220px]"
      style={{ background: partner.bg, borderColor: partner.border }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border font-bold text-[13px]"
        style={{ background: partner.bg, borderColor: partner.border, color: partner.color, fontFamily: 'Fraunces, Georgia, serif' }}
      >
        {partner.initials}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[14px] font-semibold text-white truncate">{partner.name}</span>
        <span className="text-[12px] mt-0.5" style={{ color: partner.color }}>{partner.description}</span>
      </div>
    </div>
  )
}

export default function Partners() {
  const headRef = useReveal()
  const doubled = [...partners, ...partners]

  return (
    <section className="py-20 bg-[#07142e] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div ref={headRef} className="reveal text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-4">
            Parcerias Estratégicas
          </span>
          <h2 className="text-[clamp(24px,3vw,38px)] font-semibold text-white mb-3">
            Trabalhamos com quem é referência.
          </h2>
          <p className="text-white/50 text-[15px] leading-relaxed">
            Parceiros homologados e marcas líderes que garantem qualidade e confiabilidade em cada projeto.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative marquee-track">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #07142e, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #07142e, transparent)' }} />

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((partner, i) => (
            <PartnerCard key={i} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
