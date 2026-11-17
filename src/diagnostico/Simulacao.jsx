import { useState } from 'react'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { SIM_PADRAO, SIM_PILARES, brl, num1, pct1, simCalc } from './simCalc'
import { errMsg, fmtTs, normEmail } from './util'

const CAMPOS = [
  ['fat', 'Faturamento mensal médio', 'R$/mês', 'Receita bruta média mensal da empresa', 'moeda'],
  ['dias', 'Dias úteis trabalhados no mês', 'dias', 'Padrão comercial: 22 dias úteis', 'int'],
  ['horas', 'Horas produtivas por dia', 'horas/dia', 'Jornada operacional diária', 'int'],
  ['colab', 'Colaboradores dependentes de TI', 'pessoas', 'Equipe que para sem ERP, rede ou internet', 'int'],
  ['custo', 'Custo médio mensal por colaborador', 'R$/pessoa', 'Salário médio + encargos (cerca de 68% a 80%)', 'moeda'],
  ['pct', '% da operação afetada na parada', '%', 'Impacto médio na produção e nas vendas', 'pct'],
  ['emerg', 'Custo emergencial por incidente', 'R$/evento', 'Técnico avulso, peças urgentes, horas extras', 'moeda'],
  ['rto', 'Tempo de parada simulado (RTO)', 'horas', 'Cenário foco para a análise detalhada', 'int'],
  ['invest', 'Investimento mensal em TI preventiva', 'R$/mês', 'Contrato gerenciado, backup em nuvem, EDR/RMM', 'moeda'],
]

// Limites iguais aos das regras do Firestore.
const LIM = {
  fat: [0, 1e10], dias: [1, 31], horas: [1, 24], colab: [0, 1e6], custo: [0, 1e7], pct: [0, 1], emerg: [0, 1e9], rto: [0, 8760], invest: [0, 1e9],
}

const toNum = (v) => {
  const n = Number(String(v).replace(',', '.'))
  return Number.isFinite(n) ? n : NaN
}

function Barras({ itens }) {
  const max = Math.max(...itens.map((i) => i.v || 0), 1)
  return (
    <div className="dg-bars">
      {itens.map((i) => (
        <div className="dg-bar" key={i.l}>
          <span className="dg-bar-l">{i.l}</span>
          <span className="dg-bar-t">
            <i className={i.k || ''} style={{ width: `${Math.max(0, ((i.v || 0) / max) * 100)}%` }} />
          </span>
          <b className="dg-mono">{brl(i.v)}</b>
        </div>
      ))}
    </div>
  )
}

export default function Simulacao({ empId, emp, sim, user }) {
  const email = normEmail(user.email)
  const salvo = sim && sim.atual ? sim.atual : null
  const base = { ...SIM_PADRAO, ...(salvo ? Object.fromEntries(Object.keys(SIM_PADRAO).filter((k) => typeof salvo[k] === 'number').map((k) => [k, salvo[k]])) : {}) }
  const mostra = (k, v) => (k === 'pct' ? String(Math.round(v * 1000) / 10) : String(v))
  const [txt, setTxt] = useState(() => Object.fromEntries(Object.keys(SIM_PADRAO).map((k) => [k, mostra(k, base[k])])))
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })

  const valores = {}
  let erro = ''
  Object.keys(SIM_PADRAO).forEach((k) => {
    const n = toNum(txt[k])
    const v = k === 'pct' ? n / 100 : n
    if (Number.isNaN(v) || v < LIM[k][0] || v > LIM[k][1]) erro = erro || `Valor inválido em “${CAMPOS.find((c) => c[0] === k)[1]}”.`
    valores[k] = v
  })
  const ok = !erro
  const r = ok ? simCalc(valores) : null

  async function save() {
    if (!ok) return setMsg({ kind: 'err', text: erro })
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      const mud = []
      Object.keys(SIM_PADRAO).forEach((k) => {
        const antes = base[k]
        if (antes !== valores[k] || !salvo) mud.push({ c: `simulacao.${k}`, de: salvo ? String(antes) : '', para: String(valores[k]) })
      })
      if (!mud.length) {
        setMsg({ kind: 'ok', text: 'Nada mudou desde a última gravação.' })
        setBusy(false)
        return
      }
      const ts = serverTimestamp()
      const logRef = doc(collection(db, 'empresas', empId, 'log'))
      const batch = writeBatch(db)
      batch.set(doc(db, 'empresas', empId, 'simulacao', 'atual'), { ...valores, logId: logRef.id, updatedAt: ts, updatedBy: email })
      batch.set(logRef, { item: 'SIMULACAO', email, papel: 'equipe', quando: ts, mudancas: mud })
      await batch.commit()
      setMsg({ kind: 'ok', text: 'Simulação salva e registrada no log.' })
    } catch (er) {
      setMsg({ kind: 'err', text: errMsg(er) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="dg-muted">
        Simulador de impacto financeiro de indisponibilidade de TI de {emp.nome}. Preencha os dados do cliente; os cálculos e os
        gráficos atualizam sozinhos. {salvo ? '' : 'Os valores abaixo são o exemplo da planilha original: troque pelos dados do cliente e salve.'}
      </p>

      <section className="dg-card">
        <h2>1. Parâmetros operacionais e financeiros do cliente</h2>
        <div className="dg-tblwrap">
          <table className="dg-t-param">
            <thead>
              <tr><th>Parâmetro</th><th>Unidade</th><th>Valor informado</th><th>Observação</th></tr>
            </thead>
            <tbody>
              {CAMPOS.map(([k, l, u, o]) => (
                <tr key={k}>
                  <td>{l}</td>
                  <td className="dg-muted">{u}</td>
                  <td>
                    <input className="dg-sim-in" inputMode="decimal" value={txt[k]} onChange={(e) => setTxt((t) => ({ ...t, [k]: e.target.value }))} aria-label={l} />
                  </td>
                  <td className="dg-muted dg-small">{o}</td>
                </tr>
              ))}
              <tr>
                <td>Total de horas úteis no mês</td>
                <td className="dg-muted">horas/mês</td>
                <td className="dg-mono">{r ? num1(r.horasUteis) : '—'}</td>
                <td className="dg-muted dg-small">Cálculo automático (dias x horas)</td>
              </tr>
            </tbody>
          </table>
        </div>
        {erro && <p className="dg-err" role="alert">{erro}</p>}
        <div className="dg-actions">
          <button className="dg-btn dg-primary" type="button" onClick={save} disabled={busy || !ok}>
            {busy ? 'Salvando…' : 'Salvar simulação'}
          </button>
        </div>
        {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
        {salvo && salvo.updatedAt && (
          <p className="dg-muted dg-small">
            Última gravação: {fmtTs(salvo.updatedAt)}
            {salvo.updatedBy ? ` por ${salvo.updatedBy}` : ''}
          </p>
        )}
      </section>

      {r && (
        <>
          <section className="dg-card">
            <h2>2. Raio-x do prejuízo (hora parada e cenário foco de {num1(valores.rto)}h)</h2>
            <div className="dg-tblwrap">
              <table>
                <thead>
                  <tr><th>Indicador</th><th>Valor</th><th>Base de cálculo</th></tr>
                </thead>
                <tbody>
                  <tr><td>Faturamento gerado por hora</td><td className="dg-mono">{brl(r.fatHora)}</td><td className="dg-muted dg-small">Faturamento ÷ horas úteis</td></tr>
                  <tr><td>Custo total da folha por hora</td><td className="dg-mono">{brl(r.folhaHora)}</td><td className="dg-muted dg-small">(Equipe x custo médio) ÷ horas</td></tr>
                  <tr><td>Perda de faturamento por hora parada</td><td className="dg-mono">{brl(r.perdaFatH)}</td><td className="dg-muted dg-small">Fat./hora x % da operação afetada</td></tr>
                  <tr><td>Custo de ociosidade da folha por hora</td><td className="dg-mono">{brl(r.ociosH)}</td><td className="dg-muted dg-small">Folha/hora x % da operação afetada</td></tr>
                  <tr className="dg-sim-tot"><td>PREJUÍZO OPERACIONAL POR HORA</td><td className="dg-mono">{brl(r.prejHora)}</td><td className="dg-muted dg-small">Soma perdida a cada 1h</td></tr>
                  <tr><td>Perda de receita no cenário foco</td><td className="dg-mono">{brl(r.perdaCen)}</td><td className="dg-muted dg-small">Perda de fat./h x horas simuladas</td></tr>
                  <tr><td>Folha paga sem produção (cenário)</td><td className="dg-mono">{brl(r.folhaCen)}</td><td className="dg-muted dg-small">Ociosidade/h x horas simuladas</td></tr>
                  <tr><td>Custos extras e emergenciais</td><td className="dg-mono">{brl(valores.emerg)}</td><td className="dg-muted dg-small">Suporte urgente + horas extras</td></tr>
                  <tr className="dg-sim-tot"><td>PREJUÍZO TOTAL NO CENÁRIO FOCO</td><td className="dg-mono">{brl(r.totalFoco)}</td><td className="dg-muted dg-small">Impacto consolidado do incidente</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="dg-card">
            <h2>3. Simulação comparativa de cenários (4h, 8h, 24h e 48h)</h2>
            <div className="dg-tblwrap">
              <table>
                <thead>
                  <tr><th>Cenário de falha grave</th><th>Tempo parado</th><th>Faturamento cessante</th><th>Ociosidade da folha</th><th>Custo emergencial</th><th>Prejuízo total</th><th>% do fat. mensal</th><th>Dias úteis</th></tr>
                </thead>
                <tbody>
                  {r.cenarios.map((c) => (
                    <tr key={c.h}>
                      <td>{c.n}</td>
                      <td className="dg-mono">{c.h}h</td>
                      <td className="dg-mono">{brl(c.fat)}</td>
                      <td className="dg-mono">{brl(c.folha)}</td>
                      <td className="dg-mono">{brl(c.emerg)}</td>
                      <td className="dg-mono"><b>{brl(c.total)}</b></td>
                      <td className="dg-mono">{pct1(c.pctMes)}</td>
                      <td className="dg-mono">{num1(c.diasUteis)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Barras itens={r.cenarios.map((c) => ({ l: `${c.h}h`, v: c.total, k: 'risco' }))} />
          </section>

          <section className="dg-card">
            <h2>4. Análise de ROI: investimento preventivo x prejuízo</h2>
            <div className="dg-tblwrap">
              <table>
                <thead>
                  <tr><th>Parâmetro</th><th>Valor</th><th>Análise executiva</th></tr>
                </thead>
                <tbody>
                  <tr><td>Investimento mensal em TI preventiva</td><td className="dg-mono">{brl(valores.invest)}</td><td className="dg-muted dg-small">Contrato gerenciado, backup em nuvem, EDR/RMM</td></tr>
                  <tr><td>Investimento anual total (12 meses)</td><td className="dg-mono">{brl(r.invAnual)}</td><td className="dg-muted dg-small">Custo anual previsível de proteção</td></tr>
                  <tr><td>Prejuízo de 1 única parada (cenário foco)</td><td className="dg-mono">{brl(r.totalFoco)}</td><td className="dg-muted dg-small">Custo de apenas 1 incidente sem prevenção</td></tr>
                  <tr><td>Saldo líquido evitado (1 incidente por ano)</td><td className="dg-mono">{brl(r.saldo)}</td><td className="dg-muted dg-small">Economia ao evitar 1 única parada</td></tr>
                  <tr><td>ROI sobre 1 incidente evitado</td><td className="dg-mono">{pct1(r.roi)}</td><td className="dg-muted dg-small">Retorno financeiro direto sobre o contrato</td></tr>
                  <tr><td>Relação prejuízo / investimento anual</td><td className="dg-mono">{r.relacao === null ? '—' : `${num1(r.relacao)}x`}</td><td className="dg-muted dg-small">Quantos anos de TI paga 1 única parada</td></tr>
                  <tr className="dg-sim-tot"><td>Veredito executivo</td><td colSpan={2}><b>{r.veredito || '—'}</b></td></tr>
                </tbody>
              </table>
            </div>
            <h3>1 parada grave x 1 ano de investimento preventivo</h3>
            <Barras
              itens={[
                { l: 'Investimento anual em TI preventiva', v: r.invAnual, k: 'ok' },
                { l: 'Prejuízo de 1 parada (cenário foco)', v: r.totalFoco, k: 'risco' },
                { l: 'Prejuízo de 1 parada crítica (48h)', v: r.cenarios[3].total, k: 'risco' },
              ]}
            />
          </section>
        </>
      )}

      <section className="dg-card">
        <h2>Os 5 pilares do prejuízo e roteiro de argumentação para a diretoria</h2>
        <p className="dg-muted">Apoio para a reunião com sócios e diretoria: traduz riscos técnicos em impacto financeiro.</p>
        <div className="dg-tblwrap">
          <table>
            <thead>
              <tr><th>Pilar</th><th>Tipo de impacto</th><th>Como é calculado</th><th>Exemplo prático</th><th>Argumento-chave</th></tr>
            </thead>
            <tbody>
              {SIM_PILARES.map((p) => (
                <tr key={p.p}>
                  <td><b>{p.p}</b></td>
                  <td>{p.tipo}</td>
                  <td className="dg-small">{p.calc}</td>
                  <td className="dg-small">{p.ex}</td>
                  <td className="dg-small">{p.arg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
