import { GEMI_ESCALA, GEMI_QUESTOES } from './gemiDados'
import { fmtPct, gemiNota, gemiScore, gemiTexto, FAIXAS } from './gemiCalc'
import { daysBetween, fmtD, todayStr } from './util'

export default function PainelGemi({ gemi, emp, onAbrir }) {
  const sc = gemiScore(gemi)
  const dias = emp.prazo ? daysBetween(todayStr(), emp.prazo) : null
  const objetivas = GEMI_QUESTOES.filter((q) => q.tipo === 'obj')
  const fracas = objetivas
    .filter((q) => gemiNota(gemi, q.id) !== null)
    .sort((a, b) => gemiNota(gemi, a.id) / 4 - gemiNota(gemi, b.id) / 4 || b.peso - a.peso)
    .filter((q) => gemiNota(gemi, q.id) <= 2)
    .slice(0, 5)
  const abertas = GEMI_QUESTOES.filter((q) => q.tipo === 'dis')

  return (
    <div>
      {sc.alertas.map((a) => (
        <div key={a.k} className={`dg-alerta a-${a.k}`} role="alert">
          <strong>{a.t}</strong>
          <span>{a.d}</span>
        </div>
      ))}
      <div className="dg-grid3">
        <section className="dg-card">
          <h2>Índice geral</h2>
          {sc.indice === null ? (
            <p className="dg-muted">Nenhuma pergunta objetiva avaliada ainda. Abra o Diagnóstico rápido para começar.</p>
          ) : (
            <>
              <p className="dg-big">
                <span className="dg-num">{fmtPct(sc.indice)}</span>
                <span className="dg-of">{sc.faixa.l}</span>
              </p>
              <p className="dg-muted dg-small">{sc.faixa.d}</p>
            </>
          )}
          <p className="dg-muted dg-small">
            {sc.total} de {sc.max} pontos · {sc.nResp} de {sc.nObj} objetivas avaliadas
            {sc.nResp < sc.nObj ? ' (resultado parcial)' : ''}
          </p>
        </section>
        <section className="dg-card">
          <h2>Por fase</h2>
          <dl className="dg-dl">
            {sc.fases.map((f) => (
              <div key={f.id} className="dg-fase">
                <dt>
                  {f.id}. {f.n} <span className="dg-muted dg-small">(peso {f.peso}%)</span>
                </dt>
                <dd>
                  {f.pct === null ? 'sem nota' : `${fmtPct(f.pct)} · ${f.pts}/${f.max} pts`}
                  {f.pct !== null && (
                    <span className="dg-gbar" aria-hidden="true">
                      <i style={{ width: `${f.pct}%` }} />
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="dg-card">
          <h2>Prazo</h2>
          {dias === null ? (
            <p className="dg-muted">Prazo final não definido. A SAN define na aba Empresa e acessos.</p>
          ) : (
            <p className={`dg-big${dias < 0 ? ' late' : ''}`}>
              <span className="dg-num">{Math.abs(dias)}</span>
              <span className="dg-of">{dias > 0 ? 'dias até o prazo final' : dias === 0 ? 'dias: o prazo termina hoje' : 'dias após o prazo final'}</span>
            </p>
          )}
          {emp.prazo && <p className="dg-muted dg-small">Prazo final: {fmtD(emp.prazo)}</p>}
        </section>
      </div>

      <section className="dg-card">
        <h2>Pontos de atenção (nota 2 ou menos)</h2>
        {!fracas.length ? (
          <p className="dg-muted">Nenhuma pergunta objetiva com nota baixa até agora.</p>
        ) : (
          <ul className="dg-att">
            {fracas.map((q) => (
              <li key={q.id}>
                <button type="button" onClick={onAbrir}>
                  <span className="dg-mono dg-muted">{q.id}</span>
                  <span className="dg-att-t">
                    {q.t} · nota {gemiNota(gemi, q.id)} de 4 (peso {q.peso})
                    <span className="dg-att-x">{q.rev}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="dg-card">
        <h2>Contexto e ganchos comerciais</h2>
        {abertas.map((q) => (
          <div key={q.id} className="dg-gq">
            <h4>
              <span className="dg-mono dg-muted">{q.id}</span> {q.t}
            </h4>
            <p className="dg-muted dg-small">{q.p}</p>
            <p className="dg-qt">{gemiTexto(gemi, q.id) || 'Ainda sem resposta.'}</p>
          </div>
        ))}
      </section>

      <section className="dg-card">
        <h2>Faixas de classificação</h2>
        <dl className="dg-dl">
          {FAIXAS.map((f) => (
            <div key={f.l}>
              <dt>{f.de}% a {f.ate}% · {f.l}</dt>
              <dd className="dg-muted">{f.d}</dd>
            </div>
          ))}
        </dl>
        <p className="dg-muted dg-small">
          Escala por pergunta: {GEMI_ESCALA.map((m) => `${m.k} ${m.l}`).join(' · ')}.
        </p>
      </section>
    </div>
  )
}
