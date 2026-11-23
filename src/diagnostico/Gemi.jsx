import { useState } from 'react'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { GEMI_ESCALA, GEMI_FASES, GEMI_QUESTOES } from './gemiDados'
import { fmtPct, gemiNota, gemiOpcoes, gemiScore, gemiTexto } from './gemiCalc'
import { errMsg, fmtTs, normEmail } from './util'

const POR_LOTE = 4

function Pergunta({ q, v, set, canEdit, canAnswer, aberta, toggle, proxima }) {
  const obj = q.tipo === 'obj'
  const feita = obj ? v.nota !== null : !!v.texto.trim() || v.opcoes.length > 0
  return (
    <div className={`dg-gq${aberta ? ' aberta' : ''}`}>
      <button type="button" className="dg-gq-h" aria-expanded={aberta} aria-controls={`gq-${q.id}`} onClick={toggle}>
        <span className="dg-gq-seta" aria-hidden="true">{aberta ? '▾' : '▸'}</span>
        <span className="dg-mono dg-muted">{q.id}</span>
        <span className="dg-gq-t">{q.t}</span>
        <span className="dg-tag">{obj ? `Objetiva · peso ${q.peso}` : 'Dissertativa'}</span>
        <span className={`dg-gq-st${feita ? ' ok' : ''}`}>{obj ? (feita ? `${v.nota} pt${v.nota === 1 ? '' : 's'}` : 'sem resposta') : feita ? 'respondida' : 'sem resposta'}</span>
      </button>
      {aberta && (
        <div id={`gq-${q.id}`} className="dg-gq-corpo">
          <p className="dg-gp">{q.p}</p>
          {obj ? (
            <>
              <div className="dg-gops" role="radiogroup" aria-label={q.t}>
                {q.op.map((txt, i) => (
                  <label className={`dg-gop${v.nota === i ? ' on' : ''}`} key={i}>
                    <input type="radio" name={`g${q.id}`} checked={v.nota === i} disabled={!canAnswer} onChange={() => set({ nota: i })} />
                    <b className="dg-mono">{i} pt{i === 1 ? '' : 's'}</b>
                    <span>{txt}</span>
                  </label>
                ))}
              </div>
              <p className="dg-muted dg-small">O que revela: {q.rev}</p>
              <label className="dg-fld">
                <span>Observação do consultor (opcional)</span>
                <textarea value={v.obs} onChange={(e) => set({ obs: e.target.value })} disabled={!canEdit} maxLength={2000} />
              </label>
            </>
          ) : (
            <>
              {q.gancho && <p className="dg-muted dg-small">Objetivo e gancho comercial: {q.gancho}</p>}
              {q.opcoes && (
                <fieldset className="dg-gchk">
                  <legend>Marque o que se aplica</legend>
                  {q.opcoes.map(([k, l]) => (
                    <label className="dg-chk" key={k}>
                      <input
                        type="checkbox"
                        checked={v.opcoes.includes(k)}
                        disabled={!canAnswer}
                        onChange={(e) => set({ opcoes: q.opcoes.map((o) => o[0]).filter((x) => (x === k ? e.target.checked : v.opcoes.includes(x))) })}
                      />
                      <span>{l}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              <label className="dg-fld">
                <span>Resposta</span>
                <textarea value={v.texto} onChange={(e) => set({ texto: e.target.value })} disabled={!canAnswer} maxLength={4000} />
              </label>
            </>
          )}
          {proxima && (
            <p>
              <button type="button" className="dg-btn dg-next" onClick={proxima}>Próxima pergunta →</button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Gemi({ empId, emp, gemi, canEdit, canAnswer, user }) {
  const email = normEmail(user.email)
  const inicial = () =>
    Object.fromEntries(
      GEMI_QUESTOES.map((q) => [q.id, { nota: gemiNota(gemi, q.id), obs: String((gemi && gemi[q.id] && gemi[q.id].obs) || ''), texto: gemiTexto(gemi, q.id), opcoes: gemiOpcoes(gemi, q) }]),
    )
  const [form, setForm] = useState(inicial)
  const [abertas, setAbertas] = useState([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })
  const setQ = (id) => (patch) => setForm((f) => ({ ...f, [id]: { ...f[id], ...patch } }))
  const alterna = (id) => setAbertas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))
  // Recolhe a pergunta atual e abre a seguinte (de qualquer fase).
  const avanca = (id) => {
    const i = GEMI_QUESTOES.findIndex((q) => q.id === id)
    const prox = GEMI_QUESTOES[i + 1]
    setAbertas((a) => [...a.filter((x) => x !== id), ...(prox ? [prox.id] : [])])
    if (prox) setTimeout(() => document.getElementById(`gq-${prox.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }
  const sc = gemiScore(Object.fromEntries(GEMI_QUESTOES.map((q) => [q.id, { nota: form[q.id].nota }])))

  async function save() {
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      const ts = serverTimestamp()
      const ops = []
      GEMI_QUESTOES.forEach((q) => {
        const a = { nota: gemiNota(gemi, q.id), obs: String((gemi && gemi[q.id] && gemi[q.id].obs) || '').trim(), texto: gemiTexto(gemi, q.id), opcoes: gemiOpcoes(gemi, q) }
        const b = { nota: form[q.id].nota, obs: form[q.id].obs.trim(), texto: form[q.id].texto.trim(), opcoes: form[q.id].opcoes }
        const mud = []
        const t = (v) => (v === null || v === undefined ? '' : String(v))
        if (q.tipo === 'obj') {
          if (a.nota !== b.nota) mud.push({ c: `gemi.${q.id}.nota`, de: t(a.nota), para: t(b.nota) })
          if (canEdit && a.obs !== b.obs) mud.push({ c: `gemi.${q.id}.obs`, de: a.obs, para: b.obs })
        } else {
          if (a.texto !== b.texto) mud.push({ c: `gemi.${q.id}.texto`, de: a.texto, para: b.texto })
          if (q.opcoes && a.opcoes.join() !== b.opcoes.join()) mud.push({ c: `gemi.${q.id}.opcoes`, de: a.opcoes.join(', '), para: b.opcoes.join(', ') })
        }
        if (!mud.length) return
        const campos = q.tipo === 'obj' ? (canEdit ? { nota: b.nota, obs: b.obs } : { nota: b.nota }) : q.opcoes ? { texto: b.texto, opcoes: b.opcoes } : { texto: b.texto }
        ops.push({ ref: doc(db, 'empresas', empId, 'gemi', q.id), campos, mud })
      })
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
        batch.set(logRef, { item: 'GEMI', email, papel: canEdit ? 'equipe' : 'cliente', quando: ts, mudancas: parte.flatMap((op) => op.mud) })
        await batch.commit()
      }
      setMsg({ kind: 'ok', text: 'Diagnóstico salvo e registrado no log.' })
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
    }
  }

  const ultima = Object.values(gemi || {})
    .map((x) => x.updatedAt)
    .filter((x) => x && x.toMillis)
    .sort((a, b) => b.toMillis() - a.toMillis())[0]

  return (
    <div>
      <p className="dg-muted">
        Fase Inicial de Estudo de {emp.nome}: 11 perguntas objetivas (nota de 0 a 4 vezes o peso) e 4 dissertativas.
        {canEdit
          ? ' A equipe SAN marca a opção que corresponde à realidade, junto com o cliente, e valida as respostas.'
          : canAnswer
            ? ' Marque a opção que melhor descreve a sua empresa e responda as perguntas abertas. A equipe SAN valida o resultado.'
            : ' Preenchido pela equipe SAN; você acompanha o resultado.'}
      </p>
      <p className="dg-actions">
        <button type="button" className="dg-btn" onClick={() => setAbertas(GEMI_QUESTOES.map((q) => q.id))}>Abrir todas</button>
        <button type="button" className="dg-btn" onClick={() => setAbertas([])}>Fechar todas</button>
      </p>
      <details className="dg-scale">
        <summary>Escala de pontuação (0 a 4)</summary>
        <dl>
          {GEMI_ESCALA.map((m) => (
            <div key={m.k}>
              <dt className="dg-mono">{m.k} pt{m.k === 1 ? '' : 's'} · {m.l}</dt>
              <dd>{m.d}</dd>
            </div>
          ))}
        </dl>
      </details>
      {GEMI_FASES.map((f) => {
        const s = sc.fases.find((x) => x.id === f.id)
        return (
          <section className="dg-card" key={f.id}>
            <h2>
              Fase {f.id} · {f.n}
              <span className="dg-tag">
                {s.pct === null ? 'sem nota' : `${fmtPct(s.pct)} · ${s.pts}/${s.max} pts`}
                {s.nResp < s.nObj && s.nResp > 0 ? ` (parcial ${s.nResp}/${s.nObj})` : ''}
              </span>
            </h2>
            <p className="dg-muted">{f.o}</p>
            {GEMI_QUESTOES.filter((q) => q.f === f.id).map((q) => (
              <Pergunta
                key={q.id}
                q={q}
                v={form[q.id]}
                set={setQ(q.id)}
                canEdit={canEdit}
                canAnswer={canAnswer}
                aberta={abertas.includes(q.id)}
                toggle={() => alterna(q.id)}
                proxima={q.id === GEMI_QUESTOES[GEMI_QUESTOES.length - 1].id ? null : () => avanca(q.id)}
              />
            ))}
          </section>
        )
      })}
      {canAnswer && (
        <div className="dg-actions">
          <button className="dg-btn dg-primary" type="button" onClick={save} disabled={busy}>
            {busy ? 'Salvando…' : 'Salvar diagnóstico'}
          </button>
        </div>
      )}
      {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
      {ultima && <p className="dg-muted dg-small">Última gravação: {fmtTs(ultima)}</p>}
    </div>
  )
}
