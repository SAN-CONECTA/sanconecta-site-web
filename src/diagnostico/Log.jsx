import { useEffect, useMemo, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'
import { EVID, ITEMS, RISK, STATUS, evKey, labelOf, rkKey } from './catalog'
import { csvDownload } from './exportCsv'
import { errMsg, fmtTs } from './util'

const CAMPOS = {
  status: 'Status da coleta',
  risk: 'Nível de risco',
  owner: 'Responsável pela coleta',
  due: 'Prazo',
  findings: 'Achados gerais',
  evidence: 'Fonte da evidência',
  reco: 'Recomendação',
  evidStatus: 'Situação da evidência',
}

function campoLabel(itemId, c) {
  if (CAMPOS[c]) return CAMPOS[c]
  const it = ITEMS.find((x) => x.id === itemId)
  if (!it) return c
  if (c.startsWith('notas.')) {
    const b = it.b.find((x) => x.id === c.slice(6))
    return b ? `Maturidade do bloco: ${b.t}` : c
  }
  if (c.startsWith('respostas.')) {
    const id = c.slice(10)
    for (let bi = 0; bi < it.b.length; bi += 1) {
      const qi = it.b[bi].q.findIndex((q) => q.id === id)
      if (qi >= 0) return `Pergunta ${bi + 1}.${qi + 1} (${it.b[bi].t}): ${it.b[bi].q[qi].t.split('\n')[0]}`
    }
  }
  return c
}

function valorLabel(c, v) {
  if (v === '' || v === undefined) return '(vazio)'
  if (c === 'status') return labelOf(STATUS, v)
  if (c === 'risk') return labelOf(RISK, rkKey(v))
  if (c === 'evidStatus') return labelOf(EVID, evKey(v))
  return String(v)
}

const PASSO = 200

export default function Log({ empId, emp }) {
  const [n, setN] = useState(PASSO)
  const [docs, setDocs] = useState(null)
  const [err, setErr] = useState('')
  const [fU, setFU] = useState('')
  const [fI, setFI] = useState('')

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'empresas', empId, 'log'), orderBy('quando', 'desc'), limit(n)),
        (s) => {
          setErr('')
          setDocs(s.docs.map((d) => ({ id: d.id, ...d.data() })))
        },
        (e) => setErr(errMsg(e)),
      ),
    [empId, n],
  )

  const linhas = useMemo(() => {
    const out = []
    ;(docs || []).forEach((d) => {
      ;(Array.isArray(d.mudancas) ? d.mudancas : []).forEach((m, i) => {
        out.push({ k: `${d.id}-${i}`, quando: fmtTs(d.quando), email: d.email, papel: d.papel, item: d.item, c: m.c, de: m.de, para: m.para })
      })
    })
    return out
  }, [docs])

  const usuarios = [...new Set(linhas.map((l) => l.email))].sort()
  const itensLog = [...new Set(linhas.map((l) => l.item))].sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
  const vis = linhas.filter((l) => (!fU || l.email === fU) && (!fI || l.item === fI))

  function baixar() {
    const head = ['Data e hora', 'Usuário', 'Perfil', 'Item', 'Campo', 'Antes', 'Depois']
    const rows = vis.map((l) => [l.quando, l.email, l.papel === 'equipe' ? 'Equipe SAN' : 'Cliente', l.item, campoLabel(l.item, l.c), valorLabel(l.c, l.de), valorLabel(l.c, l.para)])
    csvDownload(`log-diagnostico-360-${emp.nome}`, head, rows)
  }

  if (err) return <p className="dg-err" role="alert">{err}</p>
  if (docs === null) return <p className="dg-muted">Carregando log…</p>

  return (
    <div>
      <p className="dg-muted">
        Cada gravação em um item registra quem fez, quando e o que mudou (antes e depois). Os registros não podem ser editados.
        Só a equipe SAN vê esta tela.
      </p>
      <div className="dg-filters">
        <select aria-label="Filtrar por usuário" value={fU} onChange={(e) => setFU(e.target.value)}>
          <option value="">Todos os usuários</option>
          {usuarios.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select aria-label="Filtrar por item" value={fI} onChange={(e) => setFI(e.target.value)}>
          <option value="">Todos os itens</option>
          {itensLog.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <button className="dg-btn" type="button" onClick={baixar} disabled={!vis.length}>Baixar log (CSV)</button>
      </div>
      {!vis.length && <div className="dg-empty">Nenhuma alteração registrada com esses filtros.</div>}
      {!!vis.length && (
        <div className="dg-tblwrap">
          <table className="dg-log">
            <thead>
              <tr>
                <th>Data e hora</th>
                <th>Usuário</th>
                <th>Item</th>
                <th>Campo</th>
                <th>Antes</th>
                <th>Depois</th>
              </tr>
            </thead>
            <tbody>
              {vis.map((l) => (
                <tr key={l.k}>
                  <td className="dg-mono">{l.quando}</td>
                  <td>
                    {l.email}
                    <span className="dg-tag">{l.papel === 'equipe' ? 'SAN' : 'Cliente'}</span>
                  </td>
                  <td className="dg-mono">{l.item}</td>
                  <td>{campoLabel(l.item, l.c)}</td>
                  <td className="dg-logv">{valorLabel(l.c, l.de)}</td>
                  <td className="dg-logv">{valorLabel(l.c, l.para)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {docs.length >= n && (
        <p>
          <button className="dg-btn" type="button" onClick={() => setN(n + PASSO)}>Carregar registros mais antigos</button>
        </p>
      )}
    </div>
  )
}
