import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import logo from '../assets/logo.png'

const WHATSAPP_NUMBER = '5566996021336'

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}

function buildWhatsAppMessage({ empresa, nome, email, mensagem }) {
  const lines = [
    `Olá! Vim pelo site da *SAN Conecta* e gostaria de solicitar uma demonstração.`,
    ``,
    `*🏢 Empresa:* ${empresa}`,
    `*👤 Nome:* ${nome}`,
    `*📧 E-mail:* ${email}`,
    mensagem ? `*💬 Mensagem:* ${mensagem}` : null,
  ].filter(Boolean)

  return encodeURIComponent(lines.join('\n'))
}

const inputClass =
  'w-full px-4 py-3.5 rounded-2xl bg-black/40 border border-white/[0.08] text-white placeholder-white/25 text-[15px] outline-none focus:border-cyan-500/50 focus:bg-black/50 focus:shadow-[0_0_0_3px_rgba(95,209,230,0.08)] transition-all duration-200'

const labelClass =
  'block text-[11px] font-bold tracking-[0.18em] uppercase text-white/35 mb-2'

export default function CTA() {
  const ref = useReveal()

  const [form, setForm] = useState({ empresa: '', nome: '', email: '', mensagem: '' })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }))
  }

  function validate() {
    const next = {}
    if (!form.empresa.trim()) next.empresa = true
    if (!form.nome.trim()) next.nome = true
    if (!form.email.trim() || !form.email.includes('@')) next.email = true
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const msg = buildWhatsAppMessage(form)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contato" className="py-24 lg:py-32 bg-[#0a1c3a]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={ref}
          className="reveal relative rounded-3xl border border-white/[0.08] overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(31,95,176,0.2) 0%, transparent 65%), #07142e',
          }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — brand/info */}
            <div className="px-10 py-14 lg:py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <div className="flex items-center gap-3 mb-8" aria-hidden="true">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl scale-[2]" />
                  <img
                    src={logo}
                    alt="SAN Conecta"
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-white/10 shadow-[0_0_30px_rgba(95,209,230,0.25)]"
                  />
                </div>
                <span className="font-['Fraunces',Georgia,serif] text-[18px] font-semibold text-white">SAN Conecta</span>
              </div>

              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400/80 mb-3">
                Vamos conversar
              </span>

              <h2 className="text-[clamp(24px,3vw,38px)] font-semibold text-white mb-4 leading-tight">
                Solicite uma{' '}
                <em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  demonstração
                </em>
              </h2>

              <p className="text-white/50 text-[15px] leading-relaxed mb-8">
                Nosso time entra em contato para entender seu cenário e apresentar a solução certa — sem compromisso.
              </p>

              <div className="flex flex-col gap-3 text-[14px] text-white/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                  Resposta em até 2 horas úteis
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                  Diagnóstico gratuito, sem compromisso
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />
                  Atendimento local em Sinop / MT
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="px-10 py-14 lg:py-16">
              <p className="text-white/45 text-[14px] mb-8">
                Preencha e retornaremos em até 2 horas úteis.
              </p>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="empresa" className={labelClass}>Empresa</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Razão social"
                    value={form.empresa}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.empresa ? 'border-red-500/60 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''}`}
                    autoComplete="organization"
                  />
                  {errors.empresa && (
                    <p className="mt-1.5 text-[12px] text-red-400/80">Campo obrigatório</p>
                  )}
                </div>

                <div>
                  <label htmlFor="nome" className={labelClass}>Nome completo</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.nome ? 'border-red-500/60 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''}`}
                    autoComplete="name"
                  />
                  {errors.nome && (
                    <p className="mt-1.5 text-[12px] text-red-400/80">Campo obrigatório</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>E-mail corporativo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nome@empresa.com.br"
                    value={form.email}
                    onChange={handleChange}
                    className={`${inputClass} ${errors.email ? 'border-red-500/60 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''}`}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[12px] text-red-400/80">Informe um e-mail válido</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mensagem" className={labelClass}>Mensagem <span className="normal-case tracking-normal font-normal text-white/20">(opcional)</span></label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    placeholder="Conte-nos sobre o contexto da sua empresa..."
                    value={form.mensagem}
                    onChange={handleChange}
                    className={`${inputClass} resize-y min-h-[110px]`}
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white text-[#07142e] font-bold text-[15px] hover:bg-cyan-50 transition-all duration-200 hover:shadow-[0_8px_28px_-6px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 mt-1"
                >
                  <span className="text-[#25D366]">
                    <WhatsAppIcon size={20} />
                  </span>
                  Enviar via WhatsApp
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[12px] text-white/25 mt-1">
                  <LockIcon />
                  Dados protegidos pela LGPD
                </p>
              </form>
            </div>
          </div>

          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      </div>
    </section>
  )
}
