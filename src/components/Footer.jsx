export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#07142e] border-t border-white/[0.06] pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand col */}
          <div>
            <a href="#top" className="inline-flex items-center gap-3 mb-5 group" aria-label="SAN Conecta">
              <img
                src="/assets/logo-horizontal.png"
                alt="SAN Conecta"
                className="h-9 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#033aca]/15 border border-[#033aca]/40 text-[10px] text-[#4a7dff] font-bold tracking-[0.18em] uppercase">
                TI 360
              </span>
            </a>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[340px]">
              Tecnologia e inovação sustentando o crescimento de Negócios.
            </p>
            <p className="text-[12px] text-white/35 leading-relaxed max-w-[340px] mt-3 italic">
              Porque, para nós, não é sobre vender tecnologia. É sobre o que o seu negócio pode conquistar com ela.
            </p>
          </div>

          {/* Portfólio col */}
          <div>
            <h5 className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#1e5bff]/80 mb-4">Portfólio TI 360</h5>
            <div className="flex flex-col gap-2.5">
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                01 · Diagnóstico Tecnológico
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                02 · Proteção e Continuidade
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                03 · Eficiência Operacional
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                04 · Organização e Controle
              </a>
              <a href="#frentes" className="text-[14px] text-white/55 hover:text-white transition-colors duration-200">
                05 · Consultoria Tecnológica
              </a>
            </div>
          </div>

          {/* Contact col */}
          <div>
            <h5 className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#1e5bff]/80 mb-4">Contato</h5>
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
                className="text-[14px] text-white/55 hover:text-[#1e5bff] transition-colors duration-200"
              >
                Diagnóstico 360° de TI
              </a>
              <p className="text-[14px] text-white/35">Sinop · Mato Grosso · Brasil</p>
              <p className="text-[12px] text-white/25 mt-3">SAN Conecta · desde 2009</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-[13px] text-white/30">
            © {year} SAN Conecta. Todos os direitos reservados.
          </p>
          <p className="text-[13px] text-white/20">Sinop · Mato Grosso · Brasil</p>
        </div>
      </div>
    </footer>
  )
}
