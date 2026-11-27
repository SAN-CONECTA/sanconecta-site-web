import { useMemo, useState } from 'react'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { DLP_CANAIS, DLP_COBERTURA, DLP_COB_NIVEL, DLP_INTERNO_GERAL, DLP_MODOS, DLP_OPC, DLP_PENDENCIAS, DLP_PRIORIDADE, DLP_SECOES, SN, chavesDoCampo } from './dlpDados'
import { errMsg, fmtTs, normEmail } from './util'

const POR_LOTE = 4
const ordemPri = { alta: 0, media: 1, baixa: 2, nao: 3 }
const priLabel = (v) => (DLP_PRIORIDADE.find((p) => p[0] === v) || ['', 'Sem prioridade'])[1]
const lista = (s) => String(s || '').split(',').filter(Boolean)
const rotulo = (opc, v) => (opc.find((o) => o[0] === v) || [v, v])[1]
// Rótulos legíveis de um valor (uma opção ou várias separadas por vírgula).
const rotulos = (k, v) => (DLP_OPC[k] ? lista(v).map((x) => rotulo(DLP_OPC[k], x)).join(' · ') : v)
const temNaoSei = (v) => lista(v).includes('naosei')

const valorSalvo = (dlp, sid, k) => {
  const v = dlp && dlp[sid] && dlp[sid].r ? dlp[sid].r[k] : ''
  return typeof v === 'string' ? v : ''
}

// Todas as chaves gravadas de uma seção.
const chavesDaSecao = (s) => s.grupos.flatMap((g) => g.campos.flatMap((c) => chavesDoCampo(c).map((x) => x.key)))
const chavesDoCampoSecao = (s) => s.grupos.flatMap((g) => g.campos.flatMap((c) => chavesDoCampo(c)))

function Dica({ texto }) {
  const [aberta, setAberta] = useState(false)
  return (
    <span className={`dg-dica${aberta ? ' aberta' : ''}`}>
      <button type="button" className="dg-dica-b" aria-label="Orientação" aria-expanded={aberta} onClick={() => setAberta((x) => !x)} onBlur={() => setAberta(false)}>?</button>
      <span className="dg-dica-t" role="tooltip">{texto}</span>
    </span>
  )
}

function Controle({ c, sid, form, set, dis }) {
  const nome = (k) => `${sid}.${k}`
  const v = (k) => form[nome(k)] || ''
  if (c.tipo === 'text') {
    return <input value={v(c.k)} onChange={(e) => set(nome(c.k), e.target.value)} disabled={dis} maxLength={200} aria-label={c.t} />
  }
  if (c.tipo === 'long') {
    return <textarea value={v(c.k)} onChange={(e) => set(nome(c.k), e.target.value)} disabled={dis} maxLength={2000} aria-label={c.t} />
  }
  if (c.tipo === 'multi') {
    const marcados = lista(v(c.k))
    return (
      <div className="dg-dlp-opcs">
        {c.opc.map(([k, l]) => (
          <label className="dg-chk" key={k}>
            <input
              type="checkbox"
              checked={marcados.includes(k)}
              disabled={dis}
              onChange={(e) => set(nome(c.k), c.opc.map((o) => o[0]).filter((x) => (x === k ? e.target.checked : marcados.includes(x))).join(','))}
            />
            <span>{l}</span>
          </label>
        ))}
      </div>
    )
  }
  if (c.tipo === 'radio') {
    return (
      <div className="dg-dlp-opcs" role="radiogroup" aria-label={c.t}>
        {c.opc.map(([k, l, d]) => (
          <label className={`dg-chk${v(c.k) === k ? ' on' : ''}`} key={k}>
            <input type="radio" name={nome(c.k)} checked={v(c.k) === k} disabled={dis} onChange={() => set(nome(c.k), k)} />
            <span>
              {l}
              {d && <small className="dg-muted"> — {d}</small>}
            </span>
          </label>
        ))}
      </div>
    )
  }
  if (c.tipo === 'canal') {
    return (
      <div className="dg-dlp-canalgrid">
        <div>
          <span className="dg-small dg-muted">O canal é usado?</span>
          <div className="dg-dlp-opcs" role="radiogroup" aria-label={`${c.t}: o canal é usado?`}>
            {SN.map(([k, l]) => (
              <label className="dg-chk" key={k}>
                <input type="radio" name={nome(`${c.k}_u`)} checked={v(`${c.k}_u`) === k} disabled={dis} onChange={() => set(nome(`${c.k}_u`), k)} />
                <span>{l}</span>
              </label>
            ))}
          </div>
        </div>
        <label className="dg-fld">
          <span>Prioridade</span>
          <select value={v(`${c.k}_p`)} onChange={(e) => set(nome(`${c.k}_p`), e.target.value)} disabled={dis}>
            <option value="">Selecione</option>
            {DLP_PRIORIDADE.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
    )
  }
  return null
}

function Campo({ c, sid, form, set, dis, staff }) {
  const nome = (k) => `${sid}.${k}`
  if (c.tipo === 'pend') {
    return (
      <div className="dg-dlp-pend">
        <p className="dg-dlp-canal-t"><b>{c.t}</b></p>
        <label className="dg-fld">
          <span>Responsável</span>
          <input value={form[nome(`${c.k}_resp`)] || ''} onChange={(e) => set(nome(`${c.k}_resp`), e.target.value)} disabled={dis} maxLength={200} />
        </label>
        <label className="dg-fld">
          <span>Prazo</span>
          <input value={form[nome(`${c.k}_prazo`)] || ''} onChange={(e) => set(nome(`${c.k}_prazo`), e.target.value)} disabled={dis} maxLength={200} />
        </label>
      </div>
    )
  }
  const aberto = c.tipo === 'text' || c.tipo === 'long'
  const obsKey = c.tipo === 'canal' ? `${c.k}_r` : `${c.k}_o`
  const temObs = c.tipo === 'canal' || c.obs
  const temVs = c.tipo !== 'long' && !c.semv
  const vsKey = `${c.k}_v`
  const Wrap = aberto ? 'label' : 'div'
  return (
    <div className={`dg-dlp-q${aberto ? ' aberto' : ''}`}>
      <Wrap className={aberto ? 'dg-fld' : 'dg-dlp-qt'}>
        <span className={aberto ? undefined : 'dg-dlp-qtit'}>{c.t}</span>
        {c.q && <span className="dg-muted dg-small">{c.q}</span>}
        {staff && c.tipo === 'canal' && DLP_COBERTURA[c.k] && (
          <span className={`dg-cob dg-cob-${DLP_COBERTURA[c.k][0]}`}>
            <b>Cobertura esperada (só equipe): {DLP_COB_NIVEL[DLP_COBERTURA[c.k][0]]}.</b> {DLP_COBERTURA[c.k][1]}
          </span>
        )}
        <Controle c={c} sid={sid} form={form} set={set} dis={dis} />
      </Wrap>
      {temObs && (
        <label className="dg-fld dg-dlp-obs">
          <span>Observação (opcional)</span>
          <textarea value={form[nome(obsKey)] || ''} onChange={(e) => set(nome(obsKey), e.target.value)} disabled={dis} maxLength={2000} />
        </label>
      )}
      {temVs && (
        <label className="dg-chk dg-dlp-vs">
          <input type="checkbox" checked={form[nome(vsKey)] === '1'} disabled={dis} onChange={(e) => set(nome(vsKey), e.target.checked ? '1' : '')} />
          <span>Validar com a SAN</span>
        </label>
      )}
    </div>
  )
}

function respondida(dlp, s) {
  const ks = s.grupos.flatMap((g) => g.campos)
  const feitos = ks.filter((c) => chavesDoCampo(c).some((x) => !x.flag && valorSalvo(dlp, s.id, x.key).trim()))
  return { feitos: feitos.length, total: ks.length }
}

function Avaliacao({ dlp, emp, staff, notas, irPara }) {
  const g = (sid, k) => valorSalvo(dlp, sid, k)
  const secs = DLP_SECOES.map((s) => ({ s, ...respondida(dlp, s) }))
  const feitos = secs.reduce((a, x) => a + x.feitos, 0)
  const total = secs.reduce((a, x) => a + x.total, 0)
  const pct = total ? Math.round((feitos / total) * 100) : 0

  const cats = lista(g('s2', 'da_cat'))
  const pri = lista(g('s2', 'da_pri'))
  const outros = g('s2', 'da_outros')
  const canais = DLP_CANAIS.map(([k, t]) => ({ k, t, u: g('s3', `${k}_u`), p: g('s3', `${k}_p`), r: g('s3', `${k}_r`) })).sort((a, b) => (ordemPri[a.p] ?? 4) - (ordemPri[b.p] ?? 4))
  const plat = lista(g('s4', 'am_plat'))
  const modo = DLP_MODOS.find((m) => m[0] === g('s5', 'po_modo'))
  const pend = DLP_PENDENCIAS.map(([k, t]) => ({ k, t, resp: g('s7', `${k}_resp`), prazo: g('s7', `${k}_prazo`) }))
  const linha = (rot, sid, k) => (
    <p className="dg-small" key={k}>
      <b>{rot}:</b> {rotulos(k, g(sid, k)) || 'não informado'}
      {g(sid, `${k}_o`) ? <span className="dg-muted"> — {g(sid, `${k}_o`)}</span> : null}
    </p>
  )

  // Perguntas marcadas "Validar com a SAN" e respostas "Não sei".
  const validar = []
  let naoSei = 0
  DLP_SECOES.forEach((s) => s.grupos.forEach((gr) => gr.campos.forEach((c) => {
    if (valorSalvo(dlp, s.id, `${c.k}_v`) === '1') validar.push({ sid: s.id, t: c.t, sec: s.t })
    const base = c.tipo === 'canal' ? `${c.k}_u` : c.k
    if ((c.tipo === 'radio' || c.tipo === 'multi' || c.tipo === 'canal') && temNaoSei(valorSalvo(dlp, s.id, base))) naoSei += 1
  })))

  const atencao = []
  if (!cats.length) atencao.push('Nenhuma categoria de dados foi marcada.')
  if (cats.length && !pri.length) atencao.push('As categorias prioritárias ainda não foram indicadas.')
  if (canais.some((c) => !c.p)) atencao.push(`${canais.filter((c) => !c.p).length} canal(is) de saída sem prioridade definida.`)
  if (!plat.length) atencao.push('Plataforma de e-mail, arquivos e colaboração não informada.')
  if (!modo) atencao.push('Modo de atuação (monitorar, alertar ou bloquear) ainda não definido.')
  if (!g('s7', 'pi_piloto').trim()) atencao.push('Setor do piloto não definido.')
  const semDono = pend.filter((p) => !p.resp.trim() || !p.prazo.trim()).length
  if (semDono) atencao.push(`${semDono} entrega(s) sem responsável ou prazo.`)
  if (naoSei) atencao.push(`${naoSei} pergunta(s) respondidas com “Não sei”: confirmar com o cliente.`)
  if (g('s1', 'mo_incid') === 'sim') atencao.push('O cliente relatou incidente ou suspeita de vazamento: tratar como prioridade.')
  if (plat.length) atencao.push('Cobertura da Safetica para a plataforma informada ainda precisa de validação técnica.')

  // Cobertura esperada (apresentação da Safetica) dos canais que o cliente usa ou priorizou. Só equipe SAN.
  const cobCanais = staff ? canais.filter((c) => (c.p && c.p !== 'nao') || c.u === 'sim').filter((c) => DLP_COBERTURA[c.k]) : []
  const altaSemCob = cobCanais.filter((c) => c.p === 'alta' && DLP_COBERTURA[c.k][0] === 'nao')
  if (altaSemCob.length) atencao.push(`Equipe: ${altaSemCob.length} canal(is) de prioridade alta fora da cobertura apresentada (${altaSemCob.map((c) => c.t).join('; ')}). Alinhar expectativa com o cliente.`)

  const notasComTexto = staff ? DLP_SECOES.filter((s) => String((notas && notas[s.id]) || '').trim()) : []

  return (
    <div>
      <p className="dg-muted">Resumo automático do levantamento de {emp.nome}. Atualiza sozinho conforme as respostas são salvas na aba Levantamento. Não há nota numérica: o objetivo é mostrar o que já está definido e o que falta.</p>

      <section className="dg-card">
        <h2>Andamento <span className="dg-tag">{pct}% · {feitos}/{total} perguntas</span></h2>
        <div className="dg-bars">
          {secs.map(({ s, feitos: f, total: t }) => (
            <div className="dg-bar" key={s.id}>
              <button type="button" className="dg-linkmini" onClick={() => irPara(s.id)}>{s.t}</button>
              <span className="dg-bar-t"><i className={f === t ? 'ok' : ''} style={{ width: `${t ? (f / t) * 100 : 0}%` }} /></span>
              <span className="dg-mono dg-small">{f}/{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dg-card">
        <h2>Motivação</h2>
        {linha('Motivo da busca', 's1', 'mo_motivo')}
        {linha('Incidente ou suspeita de vazamento', 's1', 'mo_incid')}
        {linha('Risco a tratar primeiro', 's1', 'mo_risco')}
        {linha('Sucesso em 90 dias', 's1', 'mo_sucesso')}
        {linha('Prazo', 's1', 'mo_prazo')}
        {linha('Orçamento', 's1', 'mo_invest')}
      </section>

      <section className="dg-card">
        <h2>Dados a proteger</h2>
        {cats.length === 0 && !outros ? (
          <p className="dg-muted">Ainda não informado.</p>
        ) : (
          <ul className="dg-staff">
            {cats.map((c) => (
              <li key={c}>
                {rotulos('da_cat', c)}
                {pri.includes(c) && <span className="dg-tag dg-tag-pri">prioritária</span>}
                {c === 'outros' && outros ? `: ${outros}` : ''}
              </li>
            ))}
          </ul>
        )}
        {linha('Setores', 's2', 'da_setores')}
        {linha('Onde ficam', 's2', 'da_onde')}
        {linha('Quem compartilha externamente', 's2', 'da_acesso')}
        {linha('Classificação / rótulos', 's2', 'da_class')}
        {linha('Padrões identificáveis', 's2', 'da_padroes')}
        {linha('Formatos', 's2', 'da_formatos')}
        {g('s2', 'da_termos') && <p className="dg-small"><b>Termos e códigos:</b> {g('s2', 'da_termos')}</p>}
      </section>

      <section className="dg-card">
        <h2>Canais de saída por prioridade</h2>
        <div className="dg-tblwrap">
          <table>
            <thead><tr><th>Canal</th><th>Usado?</th><th>Prioridade</th><th>Observação</th></tr></thead>
            <tbody>
              {canais.map((c) => (
                <tr key={c.k}>
                  <td>{c.t}</td>
                  <td>{rotulos(`${c.k}_u`, c.u) || '—'}</td>
                  <td>{priLabel(c.p)}</td>
                  <td className="dg-logv">{c.r || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {linha('Assistentes de IA em uso', 's3', 'ca_ia_quais')}
        {linha('Compartilhamentos legítimos', 's3', 'ca_legit')}
        {linha('Parceiros e destinos autorizados', 's3', 'ca_parc')}
        {linha('Exceções por setor', 's3', 'ca_exc')}
      </section>

      {staff && (
        <section className="dg-card">
          <h2>Cobertura esperada dos canais <span className="dg-tag">só equipe</span></h2>
          <p className="dg-muted dg-small">Cruza os canais que o cliente usa ou priorizou com o que a apresentação da Safetica (Team Ti) informa. É uma referência para a conversa, não uma confirmação: valide por edição, sistema operacional, aplicativo e integração antes de prometer.</p>
          {cobCanais.length ? (
            <div className="dg-tblwrap">
              <table>
                <thead><tr><th>Canal</th><th>Prioridade</th><th>Cobertura</th><th>O que a apresentação diz</th></tr></thead>
                <tbody>
                  {cobCanais.map((c) => (
                    <tr key={c.k}>
                      <td>{c.t}</td>
                      <td>{priLabel(c.p)}</td>
                      <td><span className={`dg-cob-tag dg-cob-${DLP_COBERTURA[c.k][0]}`}>{DLP_COB_NIVEL[DLP_COBERTURA[c.k][0]]}</span></td>
                      <td className="dg-logv">{DLP_COBERTURA[c.k][1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="dg-muted">Marque os canais usados ou a prioridade no Levantamento para ver a cobertura esperada.</p>
          )}
        </section>
      )}

      <section className="dg-card">
        <h2>Ambiente técnico</h2>
        {linha('Plataformas', 's4', 'am_plat')}
        {g('s4', 'am_outra') && <p className="dg-small"><b>Outra:</b> {g('s4', 'am_outra')}</p>}
        {linha('Sistemas de gestão', 's4', 'am_sist')}
        {linha('Licenciamento', 's4', 'am_plano')}
        {linha('Usuários', 's4', 'am_usuarios')}
        {linha('Sistemas operacionais', 's4', 'am_so')}
        {linha('Equipamentos', 's4', 'am_equip')}
        {linha('Trabalho remoto', 's4', 'am_remoto')}
        {linha('Dados fora da nuvem', 's4', 'am_serv')}
        {linha('Diretório', 's4', 'am_dir')}
        {linha('Instalação dos agentes', 's4', 'am_agentes')}
        {linha('Navegadores', 's4', 'am_nav')}
        {linha('Integrações com a empresa', 's4', 'am_integra')}
        {linha('Segurança já implantada', 's4', 'am_seg')}
      </section>

      <section className="dg-card">
        <h2>Modo de atuação e responsáveis</h2>
        <p className="dg-small"><b>Modo inicial:</b> {modo ? `${modo[1]} — ${modo[2]}` : 'não definido'}{g('s5', 'po_modo_o') ? <span className="dg-muted"> — {g('s5', 'po_modo_o')}</span> : null}</p>
        {linha('Ações a bloquear', 's5', 'po_bloq')}
        {linha('Justificativa / liberação', 's5', 'po_justif')}
        {linha('Quem recebe alertas e aprova exceções', 's5', 'po_quem')}
        {linha('Prazo de atendimento', 's5', 'po_prazo')}
        {linha('Falsos positivos', 's5', 'po_falsos')}
        {linha('Relatórios', 's5', 'po_relat')}
        {linha('Áreas validadoras', 's6', 're_gestores')}
        {linha('Política interna', 's6', 're_politica')}
        {linha('Quem administra', 's6', 're_admin')}
        {linha('Retenção dos registros', 's6', 're_retencao')}
        {linha('Rotina de saída de colaboradores', 's6', 're_saida')}
      </section>

      <section className="dg-card">
        <h2>Piloto e entregas</h2>
        {linha('Setor do piloto', 's7', 'pi_piloto')}
        {linha('Critérios de avaliação', 's7', 'pi_criterios')}
        <div className="dg-tblwrap">
          <table>
            <thead><tr><th>Entrega</th><th>Responsável</th><th>Prazo</th></tr></thead>
            <tbody>
              {pend.map((p) => (
                <tr key={p.k}><td>{p.t}</td><td>{p.resp || '—'}</td><td>{p.prazo || '—'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        {g('s7', 'pi_proxima') && <p className="dg-small"><b>Próxima reunião:</b> {g('s7', 'pi_proxima')}</p>}
      </section>

      <section className="dg-card">
        <h2>Validar com a SAN <span className="dg-tag">{validar.length}</span></h2>
        {validar.length ? (
          <ul className="dg-staff">
            {validar.map((x) => (
              <li key={`${x.sid}${x.t}`}>
                <span>{x.t}</span>
                <button type="button" className="dg-linkmini" onClick={() => irPara(x.sid)}>{x.sec}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dg-muted">Nenhuma pergunta marcada para validação.</p>
        )}
      </section>

      <section className="dg-card">
        <h2>Pontos de atenção <span className="dg-tag">{atencao.length}</span></h2>
        {atencao.length ? <ul className="dg-staff">{atencao.map((a) => <li key={a}>{a}</li>)}</ul> : <p className="dg-ok">Nada pendente.</p>}
      </section>

      {staff && (
        <section className="dg-card">
          <h2>Notas da equipe SAN <span className="dg-tag">só equipe</span></h2>
          {notasComTexto.length ? (
            <ul className="dg-staff">
              {notasComTexto.map((s) => <li key={s.id}><b>{s.t}:</b> {notas[s.id]}</li>)}
            </ul>
          ) : (
            <p className="dg-muted">Nenhuma nota interna registrada.</p>
          )}
        </section>
      )}
    </div>
  )
}

export default function Dlp({ empId, emp, dlp, canEdit, canAnswer, user }) {
  const email = normEmail(user.email)
  const notasSalvas = useMemo(() => {
    const n = (dlp && dlp.notas && dlp.notas.n) || {}
    return Object.fromEntries(DLP_SECOES.map((s) => [s.id, typeof n[s.id] === 'string' ? n[s.id] : '']))
  }, [dlp])
  const inicial = () => {
    const f = {}
    DLP_SECOES.forEach((s) => chavesDaSecao(s).forEach((k) => {
      const v = valorSalvo(dlp, s.id, k)
      // O nome da empresa já vem preenchido a partir do cadastro.
      f[`${s.id}.${k}`] = v || (s.id === 's1' && k === 'id_empresa' ? emp.nome || '' : '')
    }))
    DLP_SECOES.forEach((s) => { f[`n.${s.id}`] = notasSalvas[s.id] })
    return f
  }
  const [form, setForm] = useState(inicial)
  const [vista, setVista] = useState('lev')
  const [abertas, setAbertas] = useState(['s1'])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const alterna = (id) => setAbertas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))
  const irPara = (id) => {
    setVista('lev')
    setAbertas((a) => (a.includes(id) ? a : [...a, id]))
    setTimeout(() => document.getElementById(`dlp-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  async function save() {
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      const ts = serverTimestamp()
      const ops = []
      DLP_SECOES.forEach((s) => {
        const r = {}
        const mud = []
        chavesDoCampoSecao(s).forEach(({ key }) => {
          const a = valorSalvo(dlp, s.id, key).trim()
          const b = String(form[`${s.id}.${key}`] || '').trim()
          if (a !== b) {
            r[key] = b
            mud.push({ c: `dlp.${s.id}.${key}`, de: a, para: b })
          }
        })
        if (mud.length) ops.push({ ref: doc(db, 'empresas', empId, 'dlp', s.id), campos: { r }, mud })
      })
      if (canEdit) {
        const n = {}
        const mud = []
        DLP_SECOES.forEach((s) => {
          const a = notasSalvas[s.id].trim()
          const b = String(form[`n.${s.id}`] || '').trim()
          if (a !== b) {
            n[s.id] = b
            mud.push({ c: `dlp.nota.${s.id}`, de: a, para: b })
          }
        })
        if (mud.length) ops.push({ ref: doc(db, 'empresas', empId, 'dlp', 'notas'), campos: { n }, mud })
      }
      if (!ops.length) {
        setMsg({ kind: 'ok', text: 'Nada mudou desde a última gravação.' })
        setBusy(false)
        return
      }
      for (let i = 0; i < ops.length; i += POR_LOTE) {
        const parte = ops.slice(i, i + POR_LOTE)
        const logRef = doc(collection(db, 'empresas', empId, 'log'))
        const batch = writeBatch(db)
        parte.forEach((op) => batch.set(op.ref, { ...op.campos, logId: logRef.id, updatedAt: ts, updatedBy: email }, { merge: true }))
        batch.set(logRef, { item: 'DLP', email, papel: canEdit ? 'equipe' : 'cliente', quando: ts, mudancas: parte.flatMap((op) => op.mud) })
        await batch.commit()
      }
      setMsg({ kind: 'ok', text: 'Levantamento salvo e registrado no log. A aba Avaliação já reflete as respostas.' })
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
    }
  }

  const ultima = Object.values(dlp || {})
    .map((x) => x.updatedAt)
    .filter((x) => x && x.toMillis)
    .sort((a, b) => b.toMillis() - a.toMillis())[0]

  return (
    <div>
      <div className="dg-seg-tabs" role="tablist" aria-label="DLP">
        <button type="button" role="tab" aria-selected={vista === 'lev'} onClick={() => setVista('lev')}>Levantamento</button>
        <button type="button" role="tab" aria-selected={vista === 'ava'} onClick={() => setVista('ava')}>Avaliação</button>
      </div>

      {vista === 'ava' ? (
        <Avaliacao dlp={dlp} emp={emp} staff={canEdit} notas={notasSalvas} irPara={irPara} />
      ) : (
        <>
          <p className="dg-muted">
            Roteiro de reunião comercial de DLP (Safetica) de {emp.nome}.
            {canEdit
              ? ' A equipe SAN e o cliente preenchem o mesmo levantamento; você complementa e corrige o que o cliente marcou.'
              : canAnswer
                ? ' Preencha o que souber. A equipe SAN complementa e valida na reunião.'
                : ' Preenchido pela equipe SAN; você acompanha as respostas.'}
          </p>
          {canEdit && (
            <p className="dg-note">
              Condução (só equipe) <Dica texto={DLP_INTERNO_GERAL.join(' ')} />
            </p>
          )}
          <p className="dg-actions">
            <button type="button" className="dg-btn" onClick={() => setAbertas(DLP_SECOES.map((s) => s.id))}>Abrir todas</button>
            <button type="button" className="dg-btn" onClick={() => setAbertas([])}>Fechar todas</button>
          </p>
          {DLP_SECOES.map((s) => {
            const aberta = abertas.includes(s.id)
            const prog = respondida(dlp, s)
            return (
              <div className={`dg-gq${aberta ? ' aberta' : ''}`} key={s.id} id={`dlp-${s.id}`}>
                <button type="button" className="dg-gq-h" aria-expanded={aberta} aria-controls={`dlpc-${s.id}`} onClick={() => alterna(s.id)}>
                  <span className="dg-gq-seta" aria-hidden="true">{aberta ? '▾' : '▸'}</span>
                  <span className="dg-gq-t">{s.t}</span>
                  <span className={`dg-gq-st${prog.feitos === prog.total ? ' ok' : ''}`}>{prog.feitos}/{prog.total}</span>
                </button>
                {aberta && (
                  <div id={`dlpc-${s.id}`} className="dg-gq-corpo">
                    {s.lead && <p className="dg-gp">{s.lead}</p>}
                    {s.grupos.map((gr) => (
                      <fieldset className="dg-dlp-grupo" key={gr.t} disabled={!canAnswer}>
                        <legend>{gr.t}</legend>
                        {gr.campos.map((c) => <Campo key={c.k} c={c} sid={s.id} form={form} set={set} dis={!canAnswer} staff={canEdit} />)}
                      </fieldset>
                    ))}
                    {canEdit && (
                      <div className="dg-dlp-interno">
                        <p className="dg-small"><b>Só equipe SAN</b></p>
                        {s.interno.map((t) => <p className="dg-muted dg-small" key={t}>{t}</p>)}
                        <label className="dg-fld">
                          <span>Nota interna desta seção</span>
                          <textarea value={form[`n.${s.id}`] || ''} onChange={(e) => set(`n.${s.id}`, e.target.value)} maxLength={4000} />
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          {canAnswer && (
            <div className="dg-actions">
              <button className="dg-btn dg-primary" type="button" onClick={save} disabled={busy}>{busy ? 'Salvando…' : 'Salvar levantamento'}</button>
            </div>
          )}
          {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
          {ultima && <p className="dg-muted dg-small">Última gravação: {fmtTs(ultima)}</p>}
        </>
      )}
    </div>
  )
}

