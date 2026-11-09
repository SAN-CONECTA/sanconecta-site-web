import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { errMsg, fmtD, go, normEmail } from './util'

export default function Empresas({ session }) {
  const { user, staff } = session
  const email = normEmail(user.email)
  const [state, setState] = useState({ loading: true, list: [], error: '' })

  useEffect(() => {
    let off = false
    async function load() {
      try {
        let list = []
        if (staff) {
          const s = await getDocs(collection(db, 'empresas'))
          list = s.docs.map((d) => ({ id: d.id, ...d.data() }))
        } else {
          const m = await getDocs(query(collection(db, 'membros'), where('email', '==', email)))
          const rows = await Promise.all(
            m.docs.map(async (x) => {
              const e = await getDoc(doc(db, 'empresas', x.data().empresaId))
              return e.exists() ? { id: e.id, ...e.data(), papel: x.data().role } : null
            }),
          )
          list = rows.filter(Boolean)
        }
        list.sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR'))
        if (!off) setState({ loading: false, list, error: '' })
      } catch (er) {
        if (!off) setState({ loading: false, list: [], error: errMsg(er) })
      }
    }
    load()
    return () => {
      off = true
    }
  }, [staff, email])

  const visiveis = state.list.filter((e) => !e.arquivada)

  return (
    <div>
      <h1>Empresas</h1>
      {state.loading && <p className="dg-muted">Carregando…</p>}
      {state.error && <p className="dg-err" role="alert">{state.error}</p>}
      {!state.loading && !state.error && !visiveis.length && (
        <div className="dg-empty">
          {staff
            ? 'Nenhuma empresa cadastrada.'
            : `O e-mail ${email} ainda não foi vinculado a nenhuma empresa. Peça à SAN Conecta para liberar o seu acesso com este e-mail.`}
        </div>
      )}
      <div className="dg-cards">
        {visiveis.map((e) => (
          <button type="button" key={e.id} className="dg-company" onClick={() => go(`/e/${e.id}/painel`)}>
            <strong>{e.nome}</strong>
            <span className="dg-muted dg-small">
              {e.cnpj ? `CNPJ ${e.cnpj}` : 'CNPJ não informado'}
              {e.prazo ? ` · prazo ${fmtD(e.prazo)}` : ''}
              {e.arquivada ? ' · arquivada' : ''}
            </span>
            {!staff && <span className="dg-pill">Leitura</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
