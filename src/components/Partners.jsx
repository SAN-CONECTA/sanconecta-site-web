import { useRef, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

const partners = [
  { name: 'Microsoft',        logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg' },
  { name: 'Dell',             logo: 'https://www.vectorlogo.zone/logos/dell/dell-ar21.svg' },
  { name: 'Veeam',            logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Veeam_logo.png' },
  { name: 'HP',               logo: 'https://www.vectorlogo.zone/logos/hp/hp-ar21.svg' },
  { name: 'Cisco',            logo: 'https://www.vectorlogo.zone/logos/cisco/cisco-ar21.svg' },
  { name: 'IBM',              logo: 'https://www.vectorlogo.zone/logos/ibm/ibm-ar21.svg' },
  { name: 'Lenovo',           logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Lenovo_Global_Corporate_Logo.png' },
  { name: 'Sophos',           logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Sophos_logo.svg' },
  { name: 'Kaspersky',        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Kaspersky_logo.svg' },
  { name: 'Hyper-V',          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Hyper-V_Logo.png' },
  { name: 'MikroTik',         logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/MikroTik_Logo_%282022%29.svg' },
  { name: 'Zabbix',           logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Zabbix_logo.svg' },
  { name: 'Intelbras',        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Intelbras_wordmark.svg' },
  { name: 'Google Workspace', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Workspace_Logo.svg' },
  { name: 'Hikvision',        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Hikvision_logo.svg/3840px-Hikvision_logo.svg.png' },
  { name: 'TP-Link',          logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/TP-Link_Logo.svg' },
]

const AUTO_SPEED  = 0.55  // px/frame — velocidade automática
const ARROW_SPEED = 4     // px/frame — velocidade ao segurar seta

function PartnerCard({ name, logo }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-[200px] h-[88px] mx-3 rounded-2xl border border-black/[0.07] bg-white px-6 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-md">
      <img
        src={logo}
        alt={name}
        className="max-h-12 max-w-[150px] w-auto object-contain select-none"
        style={{ opacity: 0.85 }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '0.85' }}
        onError={e => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement.innerHTML = `<span style="font-size:13px;font-weight:600;color:rgba(0,0,0,0.4)">${name}</span>`
        }}
        draggable={false}
      />
    </div>
  )
}

function ArrowBtn({ dir, onStart, onStop }) {
  return (
    <button
      aria-label={dir === 'left' ? 'Anterior' : 'Próximo'}
      className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-black/10 text-black/40 shadow-md hover:bg-gray-50 hover:text-black/70 transition-all duration-200 select-none"
      style={{ [dir === 'left' ? 'left' : 'right']: '12px' }}
      onMouseDown={onStart}
      onMouseUp={onStop}
      onMouseLeave={onStop}
      onTouchStart={onStart}
      onTouchEnd={onStop}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left'
          ? <path d="M15 18l-6-6 6-6" />
          : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

export default function Partners() {
  const headRef   = useReveal()
  const trackRef  = useRef(null)
  const posRef    = useRef(0)
  const modeRef   = useRef('auto') // 'auto' | 'left' | 'right'
  const rafRef    = useRef(null)
  const doubled   = [...partners, ...partners]

  useEffect(() => {
    let halfWidth = 0

    function measure() {
      if (trackRef.current) halfWidth = trackRef.current.scrollWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)

    function tick() {
      const delta =
        modeRef.current === 'left'  ?  ARROW_SPEED :
        modeRef.current === 'right' ? -ARROW_SPEED :
                                      -AUTO_SPEED

      posRef.current += delta

      if (halfWidth > 0) {
        if (posRef.current <= -halfWidth) posRef.current += halfWidth
        if (posRef.current > 0)          posRef.current  = -(halfWidth + posRef.current) // wrap backwards
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div ref={headRef} className="reveal text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-600/80 mb-4">
            Parcerias Estratégicas
          </span>
          <h2 className="text-[clamp(24px,3vw,38px)] font-semibold text-[#07142e] mb-3">
            Trabalhamos com quem é referência.
          </h2>
          <p className="text-black/45 text-[15px] leading-relaxed">
            Parceiros homologados e marcas líderes que garantem qualidade e confiabilidade em cada projeto.
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        {/* Arrows */}
        <ArrowBtn dir="left"
          onStart={() => { modeRef.current = 'left' }}
          onStop={()  => { modeRef.current = 'auto' }}
        />
        <ArrowBtn dir="right"
          onStart={() => { modeRef.current = 'right' }}
          onStop={()  => { modeRef.current = 'auto' }}
        />

        {/* Track */}
        <div className="flex overflow-hidden">
          <div ref={trackRef} className="flex" style={{ width: 'max-content' }}>
            {doubled.map((p, i) => (
              <PartnerCard key={i} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
