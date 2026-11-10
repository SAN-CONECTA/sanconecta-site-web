import { useState } from 'react'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { AREAS, EVID, ITEMS, MATURITY, PILLARS, pad2, RISK, STATUS, evKey, labelOf, mtKey, rkKey, stIdx } from './catalog'
import { dataOf, fmtMat, matOf } from './calc'
import { errMsg, fmtD, fmtTs, normEmail, todayStr } from './util'

function StatusPill({ k }) {
  const i = stIdx(k)
  return (
    <span className="dg-pill">
      <i className={`dg-sw s${i}`} />
      {STATUS[i].l}
    </span>
  )
}

function RiskPill({ k }) {
  const key = rkKey(k)
  return (
    <span className={`dg-pill k-${key}`}>
      <i className="dg-rdot" />
      {labelOf(RISK, key)}
    </span>
  )
}

function ItemDrawer({ empId, item, data, raw, canEdit, canAnswer, email, onClose }) {
  const [form, setForm] = useState({
    status: data.status,
    risk: rkKey(data.risk),
    owner: data.owner,
    due: data.due,
    findings: data.findings,
    evidence: data.evidence,
    reco: data.reco,
    notas: data.notas && typeof data.notas === 'object' ? data.notas : {},
    evidStatus: evKey(data.evidStatus),
    respostas: data.respostas && typeof data.respostas === 'object' ? data.respostas : {},
  })
  const [openedAt] = useState(() => (raw && raw.updatedAt && raw.updatedAt.toMillis ? raw.updatedAt.toMillis() : 0))
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const nowAt = raw && raw.updatedAt && raw.updatedAt.toMillis ? raw.updatedAt.toMillis() : 0
  const changedByOther = nowAt !== openedAt && !busy
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const setResp = (id) => (e) => setForm((f) => ({ ...f, respostas: { ...f.respostas, [id]: e.target.value } }))
  const setNota = (id) => (e) =>
    setForm((f) => {
      const notas = { ...f.notas }
      if (e.target.value === '') delete notas[id]
      else notas[id] = Number(e.target.value)
      return { ...f, notas }
    })
  const matAtual = matOf(item, { notas: form.notas, maturity: data.maturity })

  // Lista o que mudou em relação ao que foi aberto (base do log de rastreio).
  function mudancasDe() {
    const out = []
    const txt = (v) => (v === undefined || v === null ? '' : String(v))
    const add = (c, de, para) => {
      if (de !== para) out.push({ c, de, para })
    }
    if (canEdit) {
      add('status', txt(data.status), form.status)
      add('risk', rkKey(data.risk), form.risk)
      add('owner', txt(data.owner), form.owner.trim())
      add('due', txt(data.due), form.due)
      add('findings', txt(data.findings), form.findings.trim())
      add('evidence', txt(data.evidence), form.evidence.trim())
      add('reco', txt(data.reco), form.reco.trim())
      item.b.forEach((b) => {
        if (b.n) add(`notas.${b.id}`, txt((data.notas || {})[b.id]), txt(form.notas[b.id]))
      })
    }
    add('evidStatus', evKey(data.evidStatus), form.evidStatus)
    item.q.forEach((q) => add(`respostas.${q.id}`, txt((data.respostas || {})[q.id]).trim(), String(form.respostas[q.id] || '').trim()))
    return out
  }

  async function save(e) {
    e.preventDefault()
    if (!canAnswer) return
    setBusy(true)
    setErr('')
    try {
      const mudancas = mudancasDe()
      if (!mudancas.length) {
        onClose()
        return
      }
      const respostas = {}
      item.q.forEach((q) => {
        const v = String(form.respostas[q.id] || '').trim()
        if (v) respostas[q.id] = v
      })
      const notas = {}
      item.b.forEach((b) => {
        const v = form.notas[b.id]
        if (b.n && Number.isInteger(v) && v >= 0 && v <= 5) notas[b.id] = v
      })
      const logRef = doc(collection(db, 'empresas', empId, 'log'))
      const itemRef = doc(db, 'empresas', empId, 'itens', item.id)
      const batch = writeBatch(db)
      if (canEdit) {
        batch.set(itemRef, {
          status: form.status,
          risk: form.risk,
          owner: form.owner.trim(),
          due: form.due,
          findings: form.findings.trim(),
          evidence: form.evidence.trim(),
          reco: form.reco.trim(),
          maturity: mtKey(data.maturity),
          evidStatus: form.evidStatus,
          respostas,
          notas,
          logId: logRef.id,
          updatedAt: serverTimestamp(),
          updatedBy: email,
        })
      } else {
        // Cliente: só respostas e situação da evidência. update (e não merge) para que respostas apagadas sumam.
        const campos = { respostas, evidStatus: form.evidStatus, logId: logRef.id, updatedAt: serverTimestamp(), updatedBy: email }
        if (raw) batch.update(itemRef, campos)
        else batch.set(itemRef, campos)
      }
      batch.set(logRef, { item: item.id, email, papel: canEdit ? 'equipe' : 'cliente', quando: serverTimestamp(), mudancas })
      await batch.commit()
      onClose()
    } catch (er) {
      setErr(errMsg(er))
      setBusy(false)
    }
  }

  return (
    <>
      <div className="dg-scrim" onClick={onClose} />
      <aside className="dg-drawer" role="dialog" aria-modal="true" aria-labelledby="dg-drawer-title">
        <button className="dg-btn dg-x" type="button" onClick={onClose}>Fechar</button>
        <p className="dg-eyebrow dg-mono">
          {item.id} · {PILLARS[item.p - 1].t}
        </p>
        <h2 id="dg-drawer-title">{item.t}</h2>
        <p className="dg-desc">{item.d}</p>
        {!canEdit && canAnswer && (
          <p className="dg-warn">
            Você pode preencher as respostas e a situação da evidência. Nota de maturidade, risco, status e recomendação são da
            equipe SAN. Cada gravação fica registrada com o seu e-mail, data e hora.
          </p>
        )}
        {!canAnswer && <p className="dg-warn">Somente leitura.</p>}
        {changedByOther && (
          <p className="dg-warn">
            Outra pessoa alterou este item depois que você abriu. Feche e abra de novo para ver a versão atual. Se salvar
            agora, sua versão substitui a dela.
          </p>
        )}
        <form onSubmit={save}>
          <fieldset>
            <div className="dg-two">
              <label className="dg-fld">
                <span>Status da coleta</span>
                <select value={form.status} onChange={set('status')} disabled={!canEdit}>
                  {STATUS.map((s) => (
                    <option key={s.k} value={s.k}>{s.l}</option>
                  ))}
                </select>
              </label>
              <label className="dg-fld">
                <span>Nível de risco</span>
                <select value={form.risk} onChange={set('risk')} disabled={!canEdit}>
                  {RISK.map((r) => (
                    <option key={r.k} value={r.k}>{r.l}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="dg-two">
              <label className="dg-fld">
                <span>Responsável pela coleta</span>
                <input value={form.owner} onChange={set('owner')} maxLength={80} disabled={!canEdit} />
              </label>
              <label className="dg-fld">
                <span>Prazo</span>
                <input type="date" value={form.due} onChange={set('due')} disabled={!canEdit} />
              </label>
            </div>
            <div className="dg-qa">
              <h3>Perguntas-guia por bloco</h3>
              <details className="dg-scale">
                <summary>Escala de maturidade 0 a 5</summary>
                <dl>
                  {MATURITY.map((m) => (
                    <div key={m.k}>
                      <dt className="dg-mono">{m.l}</dt>
                      <dd>{m.d}</dd>
                    </div>
                  ))}
                </dl>
              </details>
              {item.b.map((b, bi) => (
                <section className="dg-blk" key={b.id}>
                  <div className="dg-blk-h">
                    <h4>
                      <span className="dg-mono dg-muted">{bi + 1}.</span> {b.t}
                    </h4>
                    {b.n ? (
                      <label className="dg-fld dg-nota">
                        <span>Maturidade do bloco</span>
                        <select value={form.notas[b.id] === undefined ? '' : String(form.notas[b.id])} onChange={setNota(b.id)} disabled={!canEdit}>
                          <option value="">Não avaliado</option>
                          {MATURITY.map((m) => (
                            <option key={m.k} value={String(m.k)}>{m.l}</option>
                          ))}
                        </select>
                      </label>
                    ) : (
                      <span className="dg-tag">Levantamento de dados, sem nota</span>
                    )}
                  </div>
                  {b.n && form.notas[b.id] !== undefined && MATURITY[form.notas[b.id]] && (
                    <p className="dg-muted dg-small">{MATURITY[form.notas[b.id]].d}</p>
                  )}
                  {b.q.map((q, i) => (
                    <label className="dg-fld dg-q" key={q.id}>
                      <span className="dg-qt">
                        <b className="dg-mono">{bi + 1}.{i + 1}</b> {q.t}
                      </span>
                      <textarea
                        value={form.respostas[q.id] || ''}
                        onChange={setResp(q.id)}
                        disabled={!canAnswer}
                        maxLength={2000}
                        placeholder="Resposta e evidência desta pergunta."
                      />
                    </label>
                  ))}
                </section>
              ))}
            </div>
            <label className="dg-fld">
              <span>Achados gerais (resumo do item)</span>
              <textarea
                value={form.findings}
                onChange={set('findings')}
                disabled={!canEdit}
                maxLength={4000}
                placeholder="O que foi encontrado, com números e datas quando houver."
              />
            </label>
            <p className="dg-mat">
              <span className="dg-muted">Maturidade do item (média dos blocos):</span>{' '}
              <b className="dg-mono">{matAtual === null ? 'sem nota' : `${fmtMat(matAtual)} / 5`}</b>
            </p>
            <label className="dg-fld">
              <span>Situação da evidência</span>
              <select value={form.evidStatus} onChange={set('evidStatus')} disabled={!canAnswer}>
                {EVID.map((e) => (
                  <option key={e.k} value={e.k}>{e.l}</option>
                ))}
              </select>
            </label>
            <label className="dg-fld">
              <span>Fonte da evidência</span>
              <input
                value={form.evidence}
                onChange={set('evidence')}
                disabled={!canEdit}
                maxLength={300}
                placeholder="Documento, entrevista, relatório ou console consultado"
              />
            </label>
            <label className="dg-fld">
              <span>Recomendação</span>
              <textarea
                value={form.reco}
                onChange={set('reco')}
                disabled={!canEdit}
                maxLength={4000}
                placeholder="O que fazer a respeito e em que ordem."
              />
            </label>
          </fieldset>
          <p className="dg-muted dg-small">Não registre senhas, chaves de acesso ou tokens. Descreva onde estão guardados.</p>
          <div className="dg-actions">
            {canAnswer && (
              <button className="dg-btn dg-primary" type="submit" disabled={busy}>
                {busy ? 'Salvando…' : 'Salvar'}
              </button>
            )}
            <button className="dg-btn" type="button" onClick={onClose}>{canAnswer ? 'Cancelar' : 'Fechar'}</button>
          </div>
          {err && <p className="dg-err" role="alert">{err}</p>}
        </form>
        {raw && raw.updatedAt && (
          <p className="dg-muted dg-small dg-upd">
            Última atualização: {fmtTs(raw.updatedAt)}
            {raw.updatedBy ? ` por ${raw.updatedBy}` : ''}
          </p>
        )}
      </aside>
    </>
  )
}

export default function Itens({ empId, itens, canEdit, canAnswer, user, flt, setFlt, openId, setOpenId, area = null }) {
  const email = normEmail(user.email)
  const q = flt.q.trim().toLowerCase()
  const today = todayStr()

  // Pilar escolhido em outra área (ao trocar de aba) é ignorado.
  const pSel = flt.p && (!area || (PILLARS[Number(flt.p) - 1] || {}).a === area) ? flt.p : ''
  const areasVisiveis = AREAS.filter((a) => !area || a.k === area)

  const rows = ITEMS.filter((it) => {
    const d = dataOf(itens, it.id)
    if (area && PILLARS[it.p - 1].a !== area) return false
    if (pSel && String(it.p) !== pSel) return false
    if (flt.s && d.status !== flt.s) return false
    if (flt.r && rkKey(d.risk) !== flt.r) return false
    if (q && `${it.id} ${it.t} ${d.owner} ${d.findings}`.toLowerCase().indexOf(q) < 0) return false
    return true
  })

  const openItem = openId ? ITEMS.find((x) => x.id === openId) : null

  return (
    <div>
      <div className="dg-filters">
        <select aria-label="Filtrar por pilar" value={pSel} onChange={(e) => setFlt({ ...flt, p: e.target.value })}>
          <option value="">Todos os pilares</option>
          {areasVisiveis.map((a) => (
            <optgroup key={a.k} label={a.l}>
              {PILLARS.filter((p) => p.a === a.k).map((p) => (
                <option key={p.id} value={String(p.id)}>{`${pad2(p.id)} ${p.n}`}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <select aria-label="Filtrar por status" value={flt.s} onChange={(e) => setFlt({ ...flt, s: e.target.value })}>
          <option value="">Todos os status</option>
          {STATUS.map((s) => (
            <option key={s.k} value={s.k}>{s.l}</option>
          ))}
        </select>
        <select aria-label="Filtrar por risco" value={flt.r} onChange={(e) => setFlt({ ...flt, r: e.target.value })}>
          <option value="">Todos os riscos</option>
          {RISK.map((r) => (
            <option key={r.k} value={r.k}>{r.l}</option>
          ))}
        </select>
        <input
          type="search"
          aria-label="Buscar"
          placeholder="Buscar por código, nome, responsável ou achado"
          value={flt.q}
          onChange={(e) => setFlt({ ...flt, q: e.target.value })}
        />
      </div>

      {!rows.length && <div className="dg-empty">Nenhum item com esses filtros. Limpe a busca ou escolha outro status.</div>}

      {areasVisiveis.map((ar) => (
        <section key={ar.k} aria-label={ar.l}>
          {!area && rows.some((it) => PILLARS[it.p - 1].a === ar.k) && <h2 className="dg-area">{ar.l}</h2>}
          {PILLARS.filter((p) => p.a === ar.k).map((p) => {
        const r = rows.filter((it) => it.p === p.id)
        if (!r.length) return null
        return (
          <div className="dg-group" key={p.id}>
            <h2>
              <span className="dg-mono dg-muted">{pad2(p.id)}</span>
              {p.n}
              <span className="dg-tag">{p.t}</span>
            </h2>
            {r.map((it) => {
              const d = dataOf(itens, it.id)
              const late = d.due && d.due < today && d.status !== 'concluido'
              return (
                <button type="button" className="dg-row" key={it.id} onClick={() => setOpenId(it.id)}>
                  <span className="dg-code dg-mono">{it.id}</span>
                  <span className="dg-rt">{it.t}</span>
                  <span className="dg-meta">
                    <StatusPill k={d.status} />
                    <RiskPill k={d.risk} />
                    <span className="dg-mono" title="Perguntas respondidas">
                      {it.q.filter((q) => String((d.respostas || {})[q.id] || '').trim()).length}/{it.q.length} resp.
                    </span>
                    {matOf(it, d) !== null && <span className="dg-mono">Mat. {fmtMat(matOf(it, d))}/5</span>}
                    {d.owner && <span>{d.owner}</span>}
                    {d.due && (
                      <span className={late ? 'dg-late' : ''}>
                        {late ? 'venceu ' : 'até '}
                        {fmtD(d.due)}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        )
      })}
        </section>
      ))}

      {openItem && (
        <ItemDrawer
          key={openItem.id}
          empId={empId}
          item={openItem}
          data={dataOf(itens, openItem.id)}
          raw={itens && itens[openItem.id]}
          canEdit={canEdit}
          canAnswer={canAnswer}
          email={email}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}
