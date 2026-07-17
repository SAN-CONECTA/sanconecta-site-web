import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const WHATSAPP_SAN = '5566996440184'
const API_BASE = 'https://publica.cnpj.ws/cnpj/'

// ─── Máscaras ───────────────────────────────────────────────────
function maskCnpj(v) {
  const d = v.replace(/\D/g, '').slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

function maskPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

// ─── Validações ─────────────────────────────────────────────────
function validateCNPJ(cnpj) {
  const c = cnpj.replace(/\D/g, '')
  if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false
  const calc = (slice, weights) => {
    const s = slice.split('').reduce((acc, n, i) => acc + parseInt(n) * weights[i], 0)
    const r = s % 11
    return r < 2 ? 0 : 11 - r
  }
  return (
    calc(c.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]) === parseInt(c[12]) &&
    calc(c.slice(0, 13), [6,5,4,3,2,9,8,7,6,5,4,3,2]) === parseInt(c[13])
  )
}

function validatePhone(p) {
  const d = p.replace(/\D/g, '')
  return d.length === 10 || d.length === 11
}

// ─── Formatadores ────────────────────────────────────────────────
function fmtCurrency(v) {
  if (v === null || v === undefined || v === '') return '—'
  const n = typeof v === 'string' ? Number(v.replace(',', '.')) : v
  if (isNaN(n)) return String(v)
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(v) {
  if (!v) return '—'
  if (!/^\d{4}-\d{2}-\d{2}/.test(String(v))) return String(v)
  const d = new Date(v)
  return isNaN(d.getTime()) ? String(v) : d.toLocaleDateString('pt-BR')
}

function fmtCep(v) {
  if (!v) return ''
  const d = String(v).replace(/\D/g, '').slice(0, 8)
  return d.length === 8 ? d.replace(/(\d{5})(\d{3})/, '$1-$2') : v
}

// ─── Extração de campos ──────────────────────────────────────────
function extractFields(data) {
  const est = data?.estabelecimento || {}
  const razao = data?.razao_social || data?.nome || '—'
  const fantasia = est?.nome_fantasia || data?.nome_fantasia || ''
  const situacao = est?.situacao_cadastral || data?.situacao || '—'
  const ativo = /ativa/i.test(situacao)
  const cnpjRaw = est?.cnpj || data?.cnpj || ''
  const cnpjFmt = cnpjRaw ? maskCnpj(cnpjRaw) : '—'
  const abertura = fmtDate(est?.data_inicio_atividade || data?.abertura)
  const cnaeObj = est?.atividade_principal || {}
  const cnae = cnaeObj?.descricao
    ? `${cnaeObj?.subclasse || ''} — ${cnaeObj.descricao}`.replace(/^—\s*/, '')
    : (data?.cnae_fiscal_descricao || '—')
  const capital = fmtCurrency(data?.capital_social || data?.capital)
  const porte = data?.porte?.descricao || data?.porte || '—'
  const natureza = data?.natureza_juridica?.descricao || data?.natureza_juridica || '—'
  const endPartes = [
    est?.tipo_logradouro, est?.logradouro,
    est?.numero && `nº ${est.numero}`, est?.complemento, est?.bairro,
    est?.cidade?.nome && `${est.cidade.nome}/${est?.estado?.sigla || ''}`,
    est?.cep && `CEP ${fmtCep(est.cep)}`,
  ].filter(Boolean)
  const endereco = endPartes.length ? endPartes.join(', ') : '—'
  const ddd = est?.ddd1 || ''
  const tel = est?.telefone1 || data?.telefone || ''
  const telefone = ddd && tel ? `(${ddd}) ${tel}` : (tel || '—')
  const email = est?.email || data?.email || '—'
  const ieList = est?.inscricoes_estaduais || []
  const ie = ieList.length
    ? ieList.map(i => `${i?.inscricao_estadual || ''} (${i?.estado?.sigla || ''}) — ${i?.ativo === false ? 'Inativa' : 'Ativa'}`).join(' · ')
    : '—'
  const socios = (data?.socios || []).map(s => {
    const nome = s?.nome || ''
    const qual = s?.qualificacao_socio?.descricao || ''
    return qual ? `${nome} — ${qual}` : nome
  }).filter(Boolean).join(' · ') || '—'
  return { razao, fantasia, situacao, ativo, cnpjFmt, cnpjRaw, abertura, cnae, capital, porte, natureza, endereco, telefone, email, ie, socios }
}

// ─── Mensagem WhatsApp ───────────────────────────────────────────
function buildMsg(lead, f) {
  return encodeURIComponent([
    '*Nova consulta CNPJ pelo site SAN Conecta*', '',
    `*Nome:* ${lead.nome || 'não informado'}`,
    `*WhatsApp:* ${lead.whatsapp}`, '',
    `*CNPJ consultado:* ${f.cnpjFmt}`,
    `*Razão social:* ${f.razao}`,
    `*Situação:* ${f.situacao}`, '',
    'Gostaria de mais informações sobre os serviços da SAN Conecta.'
  ].join('\n'))
}

// ─── Árvore JSON ─────────────────────────────────────────────────
function TreeNode({ label, value }) {
  if (value === null || value === undefined || value === '') {
    return (
      <div className="grid gap-2 py-2.5 border-b border-white/[0.06] last:border-0" style={{ gridTemplateColumns: '220px 1fr' }}>
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">{label.replace(/_/g, ' ')}</span>
        <span className="text-white/30 text-[13px]">—</span>
      </div>
    )
  }
  if (typeof value === 'boolean') {
    return (
      <div className="grid gap-2 py-2.5 border-b border-white/[0.06] last:border-0" style={{ gridTemplateColumns: '220px 1fr' }}>
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">{label.replace(/_/g, ' ')}</span>
        <span className="text-white/85 text-[13px]">{value ? 'Sim' : 'Não'}</span>
      </div>
    )
  }
  if (Array.isArray(value)) {
    return (
      <div className="py-2.5 border-b border-white/[0.06] last:border-0">
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40 mb-2">{label.replace(/_/g, ' ')}</div>
        {value.length === 0
          ? <span className="text-white/30 text-[13px]">(vazio)</span>
          : value.map((item, i) => (
            <div key={i} className="border border-white/[0.08] rounded-xl p-3 mb-2 bg-white/[0.02]">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d4a93a] mb-2">Item {i + 1}</div>
              {typeof item === 'object' && item !== null
                ? Object.entries(item).map(([k, v]) => <TreeNode key={k} label={k} value={v} />)
                : <span className="text-white/85 text-[13px]">{String(item)}</span>}
            </div>
          ))}
      </div>
    )
  }
  if (typeof value === 'object') {
    return (
      <div className="py-2.5 border-b border-white/[0.06] last:border-0">
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40 mb-2">{label.replace(/_/g, ' ')}</div>
        <div className="border border-white/[0.08] rounded-xl p-3 bg-white/[0.02]">
          {Object.entries(value).map(([k, v]) => <TreeNode key={k} label={k} value={v} />)}
        </div>
      </div>
    )
  }
  return (
    <div className="grid gap-2 py-2.5 border-b border-white/[0.06] last:border-0" style={{ gridTemplateColumns: '220px 1fr' }}>
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">{label.replace(/_/g, ' ')}</span>
      <span className="text-white/90 text-[13px] break-words">{String(value)}</span>
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────
export default function ConsultaCNPJ() {
  const headRef = useReveal()

  const [form, setForm] = useState({ nome: '', whatsapp: '', cnpj: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [result, setResult] = useState(null)
  const [fields, setFields] = useState(null)
  const [activeTab, setActiveTab] = useState('resumo')
  const [copied, setCopied] = useState(false)
  const [waLink, setWaLink] = useState('#')

  function handleInput(e) {
    const { name, value } = e.target
    if (name === 'cnpj') setForm(f => ({ ...f, cnpj: maskCnpj(value) }))
    else if (name === 'whatsapp') setForm(f => ({ ...f, whatsapp: maskPhone(value) }))
    else setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!validatePhone(form.whatsapp)) errs.whatsapp = 'Informe um WhatsApp válido com DDD.'
    if (!validateCNPJ(form.cnpj)) {
      const digits = form.cnpj.replace(/\D/g, '')
      errs.cnpj = digits.length === 14 ? 'CNPJ inválido (dígito verificador não confere).' : 'Informe um CNPJ com 14 dígitos.'
    }
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    setApiError(null)
    setResult(null)

    try {
      const digits = form.cnpj.replace(/\D/g, '')
      const resp = await fetch(`${API_BASE}${digits}`)
      if (resp.status === 429) throw new Error('Muitas consultas em sequência. Aguarde 1 minuto e tente novamente.')
      if (resp.status === 404) throw new Error('CNPJ não encontrado na base da Receita Federal.')
      if (!resp.ok) throw new Error(`Não foi possível consultar agora (HTTP ${resp.status}).`)
      const data = await resp.json()
      if (data?.detalhes === 'CNPJ não encontrado') throw new Error('CNPJ não encontrado na base da Receita Federal.')
      const f = extractFields(data)
      setFields(f)
      setResult(data)
      setActiveTab('resumo')
      setWaLink(`https://wa.me/${WHATSAPP_SAN}?text=${buildMsg(form, f)}`)
      setTimeout(() => document.getElementById('cnpj-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setApiError(err.message || 'Erro ao consultar CNPJ.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const resumeFields = fields ? [
    { label: 'CNPJ', value: fields.cnpjFmt },
    { label: 'Abertura', value: fields.abertura },
    { label: 'CNAE Principal', value: fields.cnae, full: true },
    { label: 'Capital Social', value: fields.capital },
    { label: 'Porte', value: fields.porte },
    { label: 'Endereço', value: fields.endereco, full: true },
    { label: 'Telefone', value: fields.telefone },
    { label: 'E-mail', value: fields.email },
    { label: 'Inscrição Estadual', value: fields.ie, full: true },
    { label: 'Natureza Jurídica', value: fields.natureza, full: true },
    { label: 'Sócios', value: fields.socios, full: true },
  ] : []

  return (
    <section id="consulta" className="py-24 lg:py-32 relative border-t border-white/[0.06]"
      style={{
        background: '#000',
        backgroundImage: 'radial-gradient(60% 50% at 20% 30%, rgba(212,169,58,.10) 0%, transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(95,209,230,.08) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="reveal mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-px bg-[#d4a93a]" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#d4a93a]">Ferramenta gratuita</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-white mb-4 max-w-3xl">
            Consulta de <em className="not-italic text-[#d4a93a]">CNPJ</em> direto da Receita Federal.
          </h2>
          <p className="text-white/70 text-[16px] max-w-2xl leading-relaxed">
            Razão social, situação cadastral, CNAE, endereço, sócios e mais. Em segundos, sem cadastro complicado.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Formulário */}
          <div className="relative rounded-[18px] border border-white/[0.16] p-8 lg:p-9"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01))' }}
          >
            <div className="absolute left-0 top-7 bottom-7 w-[3px] rounded-r-[3px] bg-[#d4a93a]" />

            <div className="font-['Fraunces',Georgia,serif] italic text-[3.5rem] text-[#d4a93a] leading-none mb-1">01</div>
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/50 mb-7">Seus dados de contato</div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Nome */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-white/60 mb-2">Nome (opcional)</label>
                <input
                  name="nome" value={form.nome} onChange={handleInput}
                  placeholder="Como podemos te chamar?"
                  className="w-full rounded-[10px] px-4 py-3.5 text-[15px] text-white placeholder-white/25 outline-none border transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.16)' }}
                  onFocus={e => e.target.style.borderColor = '#d4a93a'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.16)'}
                />
              </div>

              {/* WhatsApp */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-white/60 mb-2">WhatsApp *</label>
                <input
                  name="whatsapp" value={form.whatsapp} onChange={handleInput}
                  placeholder="(00) 00000-0000" inputMode="tel"
                  className="w-full rounded-[10px] px-4 py-3.5 text-[15px] text-white placeholder-white/25 outline-none border transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,.04)', borderColor: errors.whatsapp ? '#ff8a8a' : 'rgba(255,255,255,.16)' }}
                  onFocus={e => { if (!errors.whatsapp) e.target.style.borderColor = '#d4a93a' }}
                  onBlur={e => { if (!errors.whatsapp) e.target.style.borderColor = 'rgba(255,255,255,.16)' }}
                />
                {errors.whatsapp && <p className="mt-1.5 text-[13px] text-[#ff8a8a]">{errors.whatsapp}</p>}
              </div>

              {/* CNPJ */}
              <div className="mb-5">
                <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-white/60 mb-2">CNPJ *</label>
                <input
                  name="cnpj" value={form.cnpj} onChange={handleInput}
                  placeholder="00.000.000/0000-00" inputMode="numeric"
                  className="w-full rounded-[10px] px-4 py-3.5 text-[15px] text-white placeholder-white/25 outline-none border transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,.04)', borderColor: errors.cnpj ? '#ff8a8a' : 'rgba(255,255,255,.16)' }}
                  onFocus={e => { if (!errors.cnpj) e.target.style.borderColor = '#d4a93a' }}
                  onBlur={e => { if (!errors.cnpj) e.target.style.borderColor = 'rgba(255,255,255,.16)' }}
                />
                {errors.cnpj && <p className="mt-1.5 text-[13px] text-[#ff8a8a]">{errors.cnpj}</p>}
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full mt-3 py-4 rounded-[10px] font-bold text-[14px] tracking-[0.12em] uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: '#d4a93a', color: '#07142e' }}
                onMouseEnter={e => { if (!loading) e.target.style.background = '#f0c75c' }}
                onMouseLeave={e => e.target.style.background = '#d4a93a'}
              >
                {loading ? 'Consultando...' : 'Consultar agora'}
              </button>

              <p className="mt-4 text-[12px] text-white/40 leading-relaxed">
                * Campos obrigatórios. Seu WhatsApp será usado apenas para contato comercial da SAN Conecta.
              </p>
            </form>
          </div>

          {/* Pitch */}
          <div className="pt-2">
            <h3 className="text-[1.6rem] font-semibold text-white mb-3">Por que oferecemos isso de graça?</h3>
            <p className="text-white/65 text-[15px] mb-6 leading-relaxed">
              Saber a saúde tributária de um CNPJ é o primeiro passo para identificar oportunidades de recuperação fiscal e proteção digital. Use à vontade.
            </p>

            <ul className="flex flex-col mb-6">
              {[
                'Dados oficiais da Receita Federal via API pública',
                'Situação cadastral, CNAE, endereço, sócios e capital',
                'Sem limite diário · sem cadastro · sem custo',
                'Exportável em JSON para integrar ao seu sistema',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3.5 py-3.5 border-b border-white/[0.06] last:border-0 text-[14px] text-white/80">
                  <svg className="flex-shrink-0 mt-0.5 text-[#d4a93a]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-4 pt-5 border-t border-white/[0.06]">
              <span className="font-['Fraunces',Georgia,serif] italic font-semibold text-[3rem] text-[#d4a93a] leading-none">3<span className="text-[1.5rem]">s</span></span>
              <span className="text-white/60 text-[13px] max-w-[200px]">Tempo médio de resposta da consulta</span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-4 py-10 text-white/65 text-[15px]">
            <div className="w-5 h-5 rounded-full border-2 border-[#d4a93a]/30 border-t-[#d4a93a] animate-spin" />
            Consultando Receita Federal...
          </div>
        )}

        {/* Erro */}
        {apiError && (
          <div className="mt-6 rounded-xl border border-[#ff8a8a]/30 bg-[#ff8a8a]/[0.08] text-[#ffbcbc] px-5 py-4 text-[14px]">
            {apiError}
          </div>
        )}

        {/* Resultado */}
        {result && fields && (
          <div id="cnpj-result" className="mt-14">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h3 className="text-[1.4rem] font-semibold text-white">Resultado da consulta</h3>
              <div className="inline-flex rounded-full border border-white/[0.16] bg-white/[0.04] p-1 gap-1">
                {['resumo', 'completo', 'json'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200"
                    style={activeTab === tab
                      ? { background: '#d4a93a', color: '#07142e' }
                      : { color: 'rgba(255,255,255,.5)' }}
                  >
                    {tab === 'resumo' ? 'Resumo' : tab === 'completo' ? 'Dados completos' : 'JSON'}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] border border-white/[0.16] p-6 lg:p-8"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))' }}
            >
              {/* Aba Resumo */}
              {activeTab === 'resumo' && (
                <>
                  <div className="pb-6 mb-6 border-b border-white/[0.06]">
                    <h2 className="text-[1.7rem] font-semibold text-white leading-tight mb-1">{fields.razao}</h2>
                    {fields.fantasia && <p className="text-white/55 italic text-[15px]">{fields.fantasia}</p>}
                    <span className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase ${fields.ativo ? 'bg-cyan-500/10 text-cyan-400' : 'bg-[#ff8a8a]/10 text-[#ff8a8a]'}`}>
                      <span className={`w-2 h-2 rounded-full ${fields.ativo ? 'bg-cyan-400' : 'bg-[#ff8a8a]'}`} />
                      {fields.situacao}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {resumeFields.map(({ label, value, full }) => (
                      <div key={label} className={`flex flex-col gap-1 ${full ? 'sm:col-span-2' : ''}`}>
                        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">{label}</span>
                        <span className="text-[14px] text-white/85 break-words">{value || '—'}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Aba Dados completos */}
              {activeTab === 'completo' && (
                <div className="max-h-[520px] overflow-auto pr-2 scrollbar-thin">
                  {Object.entries(result).map(([k, v]) => <TreeNode key={k} label={k} value={v} />)}
                </div>
              )}

              {/* Aba JSON */}
              {activeTab === 'json' && (
                <>
                  <div className="flex justify-end mb-3">
                    <button onClick={handleCopy}
                      className="px-4 py-2 rounded-full border text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200"
                      style={copied
                        ? { background: '#5fd1e6', color: '#07142e', borderColor: '#5fd1e6' }
                        : { background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.16)', color: 'rgba(255,255,255,.7)' }}
                    >
                      {copied ? 'Copiado!' : 'Copiar JSON'}
                    </button>
                  </div>
                  <pre className="rounded-xl border border-white/[0.08] bg-black/40 p-5 max-h-[520px] overflow-auto text-[13px] text-white/80 font-mono whitespace-pre-wrap break-words">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </>
              )}
            </div>

            {/* CTA pós-resultado */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#d4a93a]/30 px-7 py-6"
              style={{ background: 'linear-gradient(135deg, rgba(212,169,58,.14), rgba(212,169,58,.04))' }}
            >
              <div>
                <h4 className="text-[1.15rem] font-semibold text-white mb-1">Quer aproveitar esses dados?</h4>
                <p className="text-white/65 text-[14px]">A SAN Conecta interpreta a situação tributária e identifica oportunidades de recuperação fiscal.</p>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-[14px] text-white transition-all duration-200 hover:opacity-90 whitespace-nowrap"
                style={{ background: '#25d366' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar com especialista
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
