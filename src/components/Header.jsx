import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#top', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#ti360', label: 'TI 360' },
    { href: '#frentes', label: 'Soluções' },
    { href: '#segmentos', label: 'Para seu negócio' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-[#07142e]/92 backdrop-blur-[18px] border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]'
          : 'bg-[#07142e]/75 backdrop-blur-[18px] border-white/[0.06]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between py-3.5">
        <a href="#top" className="flex items-center gap-3 group" aria-label="SAN Conecta">
          {/* Glifo (mobile + fallback) */}
          <img
            src="/assets/logo-icon.png"
            alt=""
            className="md:hidden w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {/* Logo horizontal (desktop) */}
          <img
            src="/assets/logo-horizontal.png"
            alt="SAN Conecta"
            className="hidden md:block h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          {/* Pílula TI 360 ao lado */}
          <span className="hidden md:inline-flex items-center px-2 py-1 rounded-md bg-[#033aca]/15 border border-[#033aca]/40 text-[10px] text-[#4a7dff] font-bold tracking-[0.18em] uppercase">
            TI 360
          </span>
          {/* Nome mobile */}
          <span className="md:hidden flex flex-col leading-none">
            <strong className="font-['Fraunces',Georgia,serif] text-[16px] text-white font-semibold tracking-[0.02em]">
              SAN Conecta
            </strong>
            <span className="text-[10px] text-[#4a7dff]/90 mt-1 tracking-[0.18em] uppercase font-semibold">
              TI 360
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="ml-3 px-5 py-2.5 text-sm font-semibold bg-[#033aca] hover:bg-[#1e5bff] text-white rounded-xl transition-all duration-200 shadow-[0_4px_14px_-4px_rgba(3,58,202,0.5)] hover:shadow-[0_6px_20px_-4px_rgba(3,58,202,0.7)] hover:-translate-y-0.5"
          >
            Falar com especialista
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#07142e]/95 backdrop-blur-[18px]">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="mt-2 px-5 py-3 text-sm font-semibold bg-[#033aca] hover:bg-[#1e5bff] text-white rounded-xl transition-all duration-200 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Falar com especialista
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
