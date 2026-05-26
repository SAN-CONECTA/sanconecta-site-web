import { useReveal } from '../hooks/useReveal'

const partners = [
  { name: 'Microsoft',       logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg' },
  { name: 'Dell',            logo: 'https://www.vectorlogo.zone/logos/dell/dell-ar21.svg' },
  { name: 'Veeam',           logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Veeam_logo.png' },
  { name: 'HP',              logo: 'https://www.vectorlogo.zone/logos/hp/hp-ar21.svg' },
  { name: 'Cisco',           logo: 'https://www.vectorlogo.zone/logos/cisco/cisco-ar21.svg' },
  { name: 'IBM',             logo: 'https://www.vectorlogo.zone/logos/ibm/ibm-ar21.svg' },
  { name: 'Lenovo',          logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Lenovo_Global_Corporate_Logo.png' },
  { name: 'Sophos',          logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Sophos_logo.svg' },
  { name: 'Kaspersky',       logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Kaspersky_logo.svg' },
  { name: 'Hyper-V',         logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Hyper-V_Logo.png' },
  { name: 'MikroTik',        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/MikroTik_Logo_%282022%29.svg' },
  { name: 'Zabbix',          logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Zabbix_logo.svg' },
  { name: 'Intelbras',       logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Intelbras_wordmark.svg' },
  { name: 'Google Workspace',logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg' },
  { name: 'Hikvision',       logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Hikvision_logo.svg/3840px-Hikvision_logo.svg.png' },
  { name: 'TP-Link',         logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/TP-Link_Logo.svg' },
]

function PartnerCard({ name, logo }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-[160px] h-[72px] mx-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      <img
        src={logo}
        alt={name}
        className="max-h-8 max-w-[120px] w-auto object-contain select-none"
        style={{ filter: 'brightness(0) invert(1)', opacity: 0.65 }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.opacity = '1' }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0) invert(1)'; e.currentTarget.style.opacity = '0.65' }}
        onError={e => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement.innerHTML = `<span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.5)">${name}</span>`
        }}
        draggable={false}
      />
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

      <div className="relative marquee-track">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #07142e, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #07142e, transparent)' }} />

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((p, i) => (
            <PartnerCard key={i} name={p.name} logo={p.logo} />
          ))}
        </div>
      </div>
    </section>
  )
}
