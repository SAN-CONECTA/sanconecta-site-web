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
                className="w-12 h-12 rounded-full object-cover bg-white border border-white/10 shadow-[0_6px_20px_-6px_rgba(46,170,220,0.3)]"
              />
              <span className="flex flex-col leading-none">
                <strong className="font-['Fraunces',Georgia,serif] text-[17px] text-white font-semibold">SAN Conecta</strong>
                <span className="text-[11px] text-cyan-400/70 mt-0.5 tracking-[0.14em] uppercase">Conectando Empresas a Soluções</span>
              </span>
            </a>
            <p className="text-[13px] text-white/40 leading-relaxed max-w-[260px]">
              Canal de vendas exclusivo TrustPanel · Canal autorizado EX Group. Uma unidade da SAN Tecnologia.
            </p>
          </div>

          {/* Partners col */}
          <div>
            <h5 className="text-[12px] font-bold tracking-[0.15em] uppercase text-white/30 mb-4">Parceiros</h5>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://trustpanel.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-white/55 hover:text-cyan-400 transition-colors duration-200"
              >
                TrustPanel · Certificados A1
              </a>
              <a
                href="https://exsolucoestributarias.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-white/55 hover:text-[#f0c75c] transition-colors duration-200"
              >
                EX · Soluções Tributárias
              </a>
              <a
                href="#jornada"
                className="text-[14px] text-white/55 hover:text-white transition-colors duration-200"
              >
                Método Expert
              </a>
            </div>
          </div>

          {/* Contact col */}
          <div>
            <h5 className="text-[12px] font-bold tracking-[0.15em] uppercase text-white/30 mb-4">Contato</h5>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://wa.me/5566996021336"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-white/55 hover:text-[#25D366] transition-colors duration-200"
              >
                WhatsApp · Contato SAN CONECTA
              </a>
              <p className="text-[14px] text-white/35">Sinop · Mato Grosso · Brasil</p>
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
