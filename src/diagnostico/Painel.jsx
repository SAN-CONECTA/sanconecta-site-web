import { ITEMS, PILLARS, RISK, STATUS, labelOf, rkKey, rkRank } from './catalog'
import { dataOf, stats } from './calc'
import { daysBetween, fmtD, todayStr } from './util'

function Seg({ counts, total, label, classes }) {
  if (!total) return <div className="dg-seg" />
  return (
    <div className="dg-seg" role="img" aria-label={label}>
      {counts.map((c, i) => (c ? <i key={i} className={classes[i]} style={{ width: `${(c / total) * 100}%` }} /> : null))}
    </div>
  )
}

const ST_CLASSES = ['s0', 's1', 's2', 's3']
const RK_ORDER = ['critico', 'alto', 'medio', 'baixo', 'sem']

function AttList({ title, items, extra, empty, onOpen }) {
  return (
    <div>
      <h3>{title}</h3>
      {!items.length ? (
        <p className="dg-muted">{empty}</p>
      ) : (
        <ul className="dg-att">
          {items.slice(0, 6).map((it) => (
            <li key={it.id}>
              <button type="button" onClick={() => onOpen(it.id)}>
                <span className="dg-mono dg-muted">{it.id}</span>
                <span className="dg-att-t">
                  {it.t}
                  <span className="dg-att-x">{extra(it)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 6 && <p className="dg-muted dg-small">e mais {items.length - 6} na aba Itens</p>}
    </div>
  )
}

export default function Painel({ itens, emp, onPillar, onOpen }) {
  const all = stats(itens, ITEMS)
  const today = todayStr()
  const d = (id) => dataOf(itens, id)

  const crit = ITEMS.filter((it) => ['critico', 'alto'].includes(rkKey(d(it.id).risk))).sort(
    (a, b) => rkRank(d(b.id).risk) - rkRank(d(a.id).risk),
  )
  const late = ITEMS.filter((it) => d(it.id).due && d(it.id).due < today && d(it.id).status !== 'concluido').sort((a, b) =>
    d(a.id).due < d(b.id).due ? -1 : 1,
  )
  const orphan = ITEMS.filter(
    (it) => !['nao_iniciado', 'concluido'].includes(d(it.id).status) && !String(d(it.id).owner).trim(),
  )

  const dias = emp.prazo ? daysBetween(today, emp.prazo) : null

  return (
    <div>
      <div className="dg-grid3">
        <section className="dg-card">
          <h2>Progresso</h2>
          <p className="dg-big">
            <span className="dg-num">{all.st[3]}</span>
            <span className="dg-of">de {all.total} itens concluídos</span>
          </p>
          <Seg counts={all.st} total={all.total} label="Distribuição por status" classes={ST_CLASSES} />
          <ul className="dg-legend">
            {STATUS.map((s, i) => (
              <li key={s.k}>
                <i className={`dg-sw s${i}`} />
                {s.l}
                <b>{all.st[i]}</b>
              </li>
            ))}
          </ul>
        </section>

        <section className="dg-card">
          <h2>Risco</h2>
          <p className="dg-big">
            <span className="dg-num">{all.rk.critico + all.rk.alto}</span>
            <span className="dg-of">itens com risco alto ou crítico</span>
          </p>
          <Seg
            counts={RK_ORDER.map((k) => all.rk[k])}
            total={all.total}
            label="Distribuição de risco"
            classes={RK_ORDER.map((k) => `rb-${k}`)}
          />
          <ul className="dg-legend">
            {[...RISK].reverse().map((r) => (
              <li key={r.k} className={`k-${r.k}`}>
                <i className="dg-rdot" />
                {r.l}
                <b>{all.rk[r.k]}</b>
              </li>
            ))}
          </ul>
        </section>

        <section className="dg-card">
          <h2>Prazo</h2>
          {dias === null ? (
            <p className="dg-muted">Prazo final não definido. A SAN define na aba Empresa e acessos.</p>
          ) : (
            <>
              <p className={`dg-big${dias < 0 ? ' late' : ''}`}>
                <span className="dg-num">{Math.abs(dias)}</span>
                <span className="dg-of">
                  {dias > 0 ? 'dias até o prazo final' : dias === 0 ? 'dias: o prazo termina hoje' : 'dias após o prazo final'}
                </span>
              </p>
              <dl className="dg-dl">
                <dt>Início</dt>
                <dd>{emp.inicio ? fmtD(emp.inicio) : 'não definido'}</dd>
                <dt>Prazo final</dt>
                <dd>{fmtD(emp.prazo)}</dd>
                {emp.responsavel && (
                  <>
                    <dt>Responsável SAN</dt>
                    <dd>{emp.responsavel}</dd>
                  </>
                )}
              </dl>
            </>
          )}
        </section>
      </div>

      <section className="dg-card">
        <h2>Andamento por pilar</h2>
        {PILLARS.map((p) => {
          const s = stats(itens, ITEMS.filter((it) => it.p === p.id))
          return (
            <button type="button" className="dg-prow" key={p.id} onClick={() => onPillar(String(p.id))}>
              <span className="dg-pname">
                <strong>
                  <span className="dg-mono dg-muted">0{p.id}</span> {p.n}
                </strong>
                <span className="dg-tag">{p.t}</span>
              </span>
              <span className="dg-pbar">
                <Seg counts={s.st} total={s.total} label={`Status do pilar ${p.id}`} classes={ST_CLASSES} />
              </span>
              <span className="dg-pnum">
                {s.st[3]} de {s.total}
              </span>
              <span className="dg-prisk">
                {['critico', 'alto', 'medio']
                  .filter((k) => s.rk[k])
                  .map((k) => (
                    <span key={k} className={`k-${k}`} title={labelOf(RISK, k)}>
                      <i className="dg-rdot" />
                      {s.rk[k]}
                    </span>
                  ))}
              </span>
            </button>
          )
        })}
      </section>

      <section className="dg-card">
        <h2>Pontos de atenção</h2>
        <div className="dg-attgrid">
          <AttList
            title="Risco alto ou crítico"
            items={crit}
            onOpen={onOpen}
            extra={(it) => `${labelOf(RISK, rkKey(d(it.id).risk))} · ${labelOf(STATUS, d(it.id).status)}`}
            empty="Nenhum item com risco alto ou crítico até agora."
          />
          <AttList
            title="Prazo vencido"
            items={late}
            onOpen={onOpen}
            extra={(it) => `venceu em ${fmtD(d(it.id).due)}${d(it.id).owner ? ` · ${d(it.id).owner}` : ''}`}
            empty="Nenhum item atrasado."
          />
          <AttList
            title="Em andamento sem responsável"
            items={orphan}
            onOpen={onOpen}
            extra={(it) => labelOf(STATUS, d(it.id).status)}
            empty="Todo item em andamento tem responsável."
          />
        </div>
      </section>
    </div>
  )
}
