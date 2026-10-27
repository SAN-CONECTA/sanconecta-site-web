import logo from '../assets/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#07142e] border-t border-white/[0.06] pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand col */}
          <div>
            <a href="#top" className="flex items-center gap-3 mb-4 group w-fit">
              <img
                src={logo}
                alt="SAN Conecta"
                className="w-12 h-12 rounded-full object-cover bg-white border border-white/10 shadow-[0_6px_20px_-6px_rgba(212,169,58,0.3)]"
              />
              <span className="flex flex-col leading-none">
                <strong className="font-['Fraunces',Georgia,serif] text-[17px] text-white font-semibold">SAN Conecta</strong>
                <span className="text-[10.5px] text-[#f0c75c]/90 mt-1 tracking-[0.18em] uppercase font-semibold">TI 360</span>
              </span>
            </a>
            <p className="text-[13px] text-white/40 leading-relaxed max-w-[320px]">
              Unidade de consultoria estratégica em tecnologia da SAN Tecnologia. Atendimento independente em Sinop/MT e região.
            </p>
          </div>

          {/* Portfólio col */}
          <div>
            <h5 className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#f0c75c]/80 mb-4">Portfólio</h5>
            <div className="flex flex-col gap-2.5">
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                Frente 01 · Diagnóstico
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                Frente 02 · Proteção
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                Frente 03 · Eficiência
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                Frente 04 · Organização
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                Frente 05 · Decisões
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                Frente 06 · Inovação
              </a>
            </div>
          </div>

          {/* Contact col */}
          <div>
            <h5 className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#f0c75c]/80 mb-4">Contato</h5>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://wa.me/5566996440184"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-white/55 hover:text-[#25D366] transition-colors duration-200"
              >
                WhatsApp · Falar com especialista
              </a>
              <a
                href="/diagnostico360/"
                className="text-[14px] text-white/55 hover:text-[#f0c75c] transition-colors duration-200"
              >
                Diagnóstico 360° de TI
              </a>
              <p className="text-[14px] text-white/35">Sinop · Mato Grosso · Brasil</p>
              <p className="text-[12px] text-white/25 mt-3">Uma unidade da SAN Tecnologia · desde 2005</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-[13px] text-white/30">
            © {year} SAN Conecta. Todos os direitos reservados.
          </p>
          <p className="text-[13px] text-white/20">SAN Tecnologia · Sinop / MT</p>
        </div>
      </div>
    </footer>
  )
}
