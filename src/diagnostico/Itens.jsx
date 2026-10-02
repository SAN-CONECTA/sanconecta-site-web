import { useState } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { ITEMS, PILLARS, RISK, STATUS, labelOf, rkKey, stIdx } from './catalog'
import { dataOf } from './calc'
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

function ItemDrawer({ empId, item, data, raw, canEdit, email, onClose }) {
  const [form, setForm] = useState({
    status: data.status,
    risk: rkKey(data.risk),
    owner: data.owner,
    due: data.due,
    findings: data.findings,
    evidence: data.evidence,
    reco: data.reco,
  })
  const [openedAt] = useState(() => (raw && raw.updatedAt && raw.updatedAt.toMillis ? raw.updatedAt.toMillis() : 0))
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const nowAt = raw && raw.updatedAt && raw.updatedAt.toMillis ? raw.updatedAt.toMillis() : 0
  const changedByOther = nowAt !== openedAt && !busy
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function save(e) {
    e.preventDefault()
    if (!canEdit) return
    setBusy(true)
    setErr('')
    try {
      await setDoc(doc(db, 'empresas', empId, 'itens', item.id), {
        status: form.status,
        risk: form.risk,
        owner: form.owner.trim(),
        due: form.due,
        findings: form.findings.trim(),
        evidence: form.evidence.trim(),
        reco: form.reco.trim(),
        updatedAt: serverTimestamp(),
        updatedBy: email,
      })
      onClose()
    } catch (er) {
      setErr(errMsg(er))
      setBusy(false)
    }
  }

  const dis = !canEdit

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
        <div className="dg-guide">
          <h3>Perguntas-guia</h3>
          <ul>
            {item.q.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
        {!canEdit && <p className="dg-warn">Você está no modo leitura. Só a equipe SAN edita os itens.</p>}
        {changedByOther && (
          <p className="dg-warn">
            Outra pessoa alterou este item depois que você abriu. Feche e abra de novo para ver a versão atual. Se salvar
            agora, sua versão substitui a dela.
          </p>
        )}
        <form onSubmit={save}>
          <fieldset disabled={dis}>
            <div className="dg-two">
              <label className="dg-fld">
                <span>Status da coleta</span>
                <select value={form.status} onChange={set('status')}>
                  {STATUS.map((s) => (
                    <option key={s.k} value={s.k}>{s.l}</option>
                  ))}
                </select>
              </label>
              <label className="dg-fld">
                <span>Nível de risco</span>
                <select value={form.risk} onChange={set('risk')}>
                  {RISK.map((r) => (
                    <option key={r.k} value={r.k}>{r.l}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="dg-two">
              <label className="dg-fld">
                <span>Responsável pela coleta</span>
                <input value={form.owner} onChange={set('owner')} maxLength={80} />
              </label>
              <label className="dg-fld">
                <span>Prazo</span>
                <input type="date" value={form.due} onChange={set('due')} />
              </label>
            </div>
            <label className="dg-fld">
              <span>Achados</span>
              <textarea
                value={form.findings}
                onChange={set('findings')}
                maxLength={4000}
                placeholder="O que foi encontrado, com números e datas quando houver."
              />
            </label>
            <label className="dg-fld">
              <span>Fonte da evidência</span>
              <input
                value={form.evidence}
                onChange={set('evidence')}
                maxLength={300}
                placeholder="Documento, entrevista, relatório ou console consultado"
              />
            </label>
            <label className="dg-fld">
              <span>Recomendação</span>
              <textarea
                value={form.reco}
                onChange={set('reco')}
                maxLength={4000}
                placeholder="O que fazer a respeito e em que ordem."
              />
            </label>
          </fieldset>
          <p className="dg-muted dg-small">Não registre senhas, chaves de acesso ou tokens. Descreva onde estão guardados.</p>
          <div className="dg-actions">
            {canEdit && (
              <button className="dg-btn dg-primary" type="submit" disabled={busy}>
                {busy ? 'Salvando…' : 'Salvar'}
              </button>
            )}
            <button className="dg-btn" type="button" onClick={onClose}>{canEdit ? 'Cancelar' : 'Fechar'}</button>
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

export default function Itens({ empId, itens, canEdit, user, flt, setFlt, openId, setOpenId }) {
  const email = normEmail(user.email)
  const q = flt.q.trim().toLowerCase()
  const today = todayStr()

  const rows = ITEMS.filter((it) => {
    const d = dataOf(itens, it.id)
    if (flt.p && String(it.p) !== flt.p) return false
    if (flt.s && d.status !== flt.s) return false
    if (flt.r && rkKey(d.risk) !== flt.r) return false
    if (q && `${it.id} ${it.t} ${d.owner} ${d.findings}`.toLowerCase().indexOf(q) < 0) return false
    return true
  })

  const openItem = openId ? ITEMS.find((x) => x.id === openId) : null

  return (
    <div>
      <div className="dg-filters">
        <select aria-label="Filtrar por pilar" value={flt.p} onChange={(e) => setFlt({ ...flt, p: e.target.value })}>
          <option value="">Todos os pilares</option>
          {PILLARS.map((p) => (
            <option key={p.id} value={String(p.id)}>{`0${p.id} ${p.n}`}</option>
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

      {PILLARS.map((p) => {
        const r = rows.filter((it) => it.p === p.id)
        if (!r.length) return null
        return (
          <div className="dg-group" key={p.id}>
            <h2>
              <span className="dg-mono dg-muted">0{p.id}</span>
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

      {openItem && (
        <ItemDrawer
          key={openItem.id}
          empId={empId}
          item={openItem}
          data={dataOf(itens, openItem.id)}
          raw={itens && itens[openItem.id]}
          canEdit={canEdit}
          email={email}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}
