import { useState } from 'react'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { BLOCO_BY_ID, EVID, MATURITY, RISK, RODADAS, STATUS, blocosDe, evKey, labelOf, mtKey, rkKey, stIdx } from './catalog'
import { answered, dataOf, fmtMat, respOf } from './calc'
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

// Quantas gravações por lote: as regras do Firestore limitam as consultas a outros documentos por lote.
const POR_LOTE = 4

function BlocoDrawer({ empId, bloco, rodada, data, raw, itens, canEdit, canAnswer, email, onClose }) {
  const [form, setForm] = useState({
    status: data.status,
    risk: rkKey(data.risk),
    owner: data.owner,
    due: data.due,
    findings: data.findings,
    evidence: data.evidence,
    reco: data.reco,
    nota: mtKey(data.nota) === null ? '' : String(data.nota),
    evidStatus: evKey(data.evidStatus),
    resp: Object.fromEntries(bloco.q.map((q) => [`${q.i}|${q.id}`, respOf(itens, q.i, q.id)])),
  })
  const [openedAt] = useState(() => (raw && raw.updatedAt && raw.updatedAt.toMillis ? raw.updatedAt.toMillis() : 0))
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const nowAt = raw && raw.updatedAt && raw.updatedAt.toMillis ? raw.updatedAt.toMillis() : 0
  const changedByOther = nowAt !== openedAt && !busy
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const setResp = (key) => (e) => setForm((f) => ({ ...f, resp: { ...f.resp, [key]: e.target.value } }))

  async function save(e) {
    e.preventDefault()
    if (!canAnswer) return
    setBusy(true)
    setErr('')
    try {
      const ts = serverTimestamp()
      const ops = []

      // Respostas: um documento por item de origem, preservando as respostas das perguntas de outros blocos.
      const porItem = {}
      bloco.q.forEach((q) => {
        const key = `${q.i}|${q.id}`
        const antes = respOf(itens, q.i, q.id)
        const depois = String(form.resp[key] || '').trim()
        if (antes === depois) return
        porItem[q.i] = porItem[q.i] || []
        porItem[q.i].push({ id: q.id, antes, depois })
      })
      Object.keys(porItem).forEach((itemId) => {
        const atual = { ...(((itens && itens[itemId]) || {}).respostas || {}) }
        const mud = []
        porItem[itemId].forEach(({ id, antes, depois }) => {
          if (depois) atual[id] = depois
          else delete atual[id]
          mud.push({ c: `respostas.${itemId}.${id}`, de: antes, para: depois })
        })
        const limpo = {}
        Object.keys(atual).forEach((k) => {
          if (/^q\d\d$/.test(k)) limpo[k] = atual[k]
        })
        ops.push({ ref: doc(db, 'empresas', empId, 'itens', itemId), existe: !!(itens && itens[itemId]), campos: { respostas: limpo }, mud })
      })

      // Campos do bloco.
      const mudB = []
      const add = (c, de, para) => {
        if (de !== para) mudB.push({ c, de, para })
      }
      const txt = (v) => (v === undefined || v === null ? '' : String(v))
      if (canEdit) {
        add('status', txt(data.status), form.status)
        add('risk', rkKey(data.risk), form.risk)
        add('owner', txt(data.owner), form.owner.trim())
        add('due', txt(data.due), form.due)
        add('findings', txt(data.findings), form.findings.trim())
        add('nota', txt(mtKey(data.nota)), form.nota)
        add('evidence', txt(data.evidence), form.evidence.trim())
        add('reco', txt(data.reco), form.reco.trim())
      }
      add('evidStatus', evKey(data.evidStatus), form.evidStatus)
      if (mudB.length) {
        const campos = canEdit
          ? {
              status: form.status,
              risk: form.risk,
              owner: form.owner.trim(),
              due: form.due,
              findings: form.findings.trim(),
              evidence: form.evidence.trim(),
              reco: form.reco.trim(),
              nota: form.nota === '' ? null : Number(form.nota),
              evidStatus: form.evidStatus,
            }
          : { evidStatus: form.evidStatus }
        ops.push({ ref: doc(db, 'empresas', empId, 'blocos', bloco.id), existe: !!raw, completo: canEdit, campos, mud: mudB, bloco: true })
      }

      if (!ops.length) {
        onClose()
        return
      }

      // Cada lote leva o seu registro de log (as regras exigem o registro no mesmo lote da gravação).
      for (let i = 0; i < ops.length; i += POR_LOTE) {
        const parte = ops.slice(i, i + POR_LOTE)
        const logRef = doc(collection(db, 'empresas', empId, 'log'))
        const batch = writeBatch(db)
        parte.forEach((op) => {
          const dados = { ...op.campos, logId: logRef.id, updatedAt: ts, updatedBy: email }
          if (op.completo || !op.existe) batch.set(op.ref, dados)
          else batch.update(op.ref, dados)
        })
        batch.set(logRef, {
          item: bloco.id,
          email,
          papel: canEdit ? 'equipe' : 'cliente',
          quando: ts,
          mudancas: parte.flatMap((op) => op.mud),
        })
        await batch.commit()
      }
      onClose()
    } catch (er) {
      setErr(errMsg(er))
      setBusy(false)
    }
  }

  // Perguntas agrupadas por item e bloco de origem.
  const grupos = []
  bloco.q.forEach((q, n) => {
    const g = grupos[grupos.length - 1]
    if (g && g.i === q.i && g.o === q.o) g.l.push({ q, n })
    else grupos.push({ i: q.i, it: q.it, o: q.o, l: [{ q, n }] })
  })
  const nSel = form.nota === '' ? null : Number(form.nota)

  return (
    <>
      <div className="dg-scrim" onClick={onClose} />
      <aside className="dg-drawer" role="dialog" aria-modal="true" aria-labelledby="dg-drawer-title">
        <button className="dg-btn dg-x" type="button" onClick={onClose}>Fechar</button>
        <p className="dg-eyebrow dg-mono">
          {bloco.id} · {rodada.n}
        </p>
        <h2 id="dg-drawer-title">{bloco.n}</h2>
        <p className="dg-desc">{bloco.d}</p>
        {!canEdit && canAnswer && (
          <p className="dg-warn">
            Você pode preencher as respostas e a situação da evidência. Nota de maturidade, risco, status e recomendação são da
            equipe SAN. Cada gravação fica registrada com o seu e-mail, data e hora.
          </p>
        )}
        {!canAnswer && <p className="dg-warn">Somente leitura.</p>}
        {changedByOther && (
          <p className="dg-warn">
            Outra pessoa alterou este bloco depois que você abriu. Feche e abra de novo para ver a versão atual. Se salvar
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
              <h3>Perguntas-guia ({bloco.q.length})</h3>
              {grupos.map((g) => (
                <section className="dg-blk" key={`${g.i}-${g.o}`}>
                  <h4>
                    <span className="dg-mono dg-muted">{g.i}</span> {g.it} · {g.o}
                  </h4>
                  {g.l.map(({ q, n }) => (
                    <label className="dg-fld dg-q" key={`${q.i}|${q.id}`}>
                      <span className="dg-qt">
                        <b className="dg-mono">{n + 1}.</b> {q.t}
                      </span>
                      <textarea
                        value={form.resp[`${q.i}|${q.id}`] || ''}
                        onChange={setResp(`${q.i}|${q.id}`)}
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
              <span>Achados do bloco (resumo)</span>
              <textarea
                value={form.findings}
                onChange={set('findings')}
                disabled={!canEdit}
                maxLength={4000}
                placeholder="O que foi encontrado, com números e datas quando houver."
              />
            </label>
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
            <div className="dg-two">
              <label className="dg-fld">
                <span>Maturidade do bloco (0 a 5)</span>
                <select value={form.nota} onChange={set('nota')} disabled={!canEdit}>
                  <option value="">Não avaliado</option>
                  {MATURITY.map((m) => (
                    <option key={m.k} value={String(m.k)}>{m.l}</option>
                  ))}
                </select>
              </label>
              <label className="dg-fld">
                <span>Situação da evidência</span>
                <select value={form.evidStatus} onChange={set('evidStatus')} disabled={!canAnswer}>
                  {EVID.map((x) => (
                    <option key={x.k} value={x.k}>{x.l}</option>
                  ))}
                </select>
              </label>
            </div>
            {nSel !== null && MATURITY[nSel] && <p className="dg-muted dg-small">{MATURITY[nSel].d}</p>}
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
            Última atualização do bloco: {fmtTs(raw.updatedAt)}
            {raw.updatedBy ? ` por ${raw.updatedBy}` : ''}
          </p>
        )}
      </aside>
    </>
  )
}

export default function Rodada({ empId, rodada: rk, blocos, itens, canEdit, canAnswer, user, flt, setFlt, openId, setOpenId }) {
  const email = normEmail(user.email)
  const rodada = RODADAS.find((r) => r.k === rk)
  const q = flt.q.trim().toLowerCase()
  const today = todayStr()

  const rows = blocosDe(rk).filter((b) => {
    const d = dataOf(blocos, b.id)
    if (flt.s && d.status !== flt.s) return false
    if (flt.r && rkKey(d.risk) !== flt.r) return false
    if (q && `${b.id} ${b.n} ${d.owner} ${d.findings}`.toLowerCase().indexOf(q) < 0) return false
    return true
  })

  const openBloco = openId && BLOCO_BY_ID[openId] && BLOCO_BY_ID[openId].r === rk ? BLOCO_BY_ID[openId] : null

  return (
    <div>
      <div className="dg-rodada-h">
        <p className="dg-muted">{rodada.p}</p>
        <p className="dg-muted dg-small">Quem responde: {rodada.quem}</p>
      </div>
      <div className="dg-filters">
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

      {!rows.length && <div className="dg-empty">Nenhum bloco com esses filtros. Limpe a busca ou escolha outro status.</div>}

      <div className="dg-group">
        {rows.map((b) => {
          const d = dataOf(blocos, b.id)
          const late = d.due && d.due < today && d.status !== 'concluido'
          const nota = mtKey(d.nota)
          return (
            <button type="button" className="dg-row" key={b.id} onClick={() => setOpenId(b.id)}>
              <span className="dg-code dg-mono">{b.id}</span>
              <span className="dg-rt">{b.n}</span>
              <span className="dg-meta">
                <StatusPill k={d.status} />
                <RiskPill k={d.risk} />
                <span className="dg-mono" title="Perguntas respondidas">
                  {answered(itens, b)}/{b.q.length} resp.
                </span>
                {nota !== null && <span className="dg-mono">Mat. {fmtMat(nota)}/5</span>}
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

      {openBloco && (
        <BlocoDrawer
          key={openBloco.id}
          empId={empId}
          bloco={openBloco}
          rodada={rodada}
          data={dataOf(blocos, openBloco.id)}
          raw={blocos && blocos[openBloco.id]}
          itens={itens}
          canEdit={canEdit}
          canAnswer={canAnswer}
          email={email}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}
