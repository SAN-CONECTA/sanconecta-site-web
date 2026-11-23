import { useEffect, useRef } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { normEmail } from './util'

// "Online" = enviou um sinal de vida nos últimos 3 minutos. O Firestore não avisa quando alguém fecha a aba,
// então o sistema grava a cada minuto (só com a aba visível) o e-mail, a empresa e a tela em presenca/{email}.
export const PRESENCA_MS = 60 * 1000
export const ONLINE_MS = 3 * 60 * 1000

export function usePresenca(user, route) {
  const ref = useRef(route)
  ref.current = route
  const email = user && user.emailVerified ? normEmail(user.email) : ''
  const nome = user ? String(user.displayName || '').slice(0, 120) : ''

  useEffect(() => {
    if (!email || !db) return undefined
    const envia = () => {
      if (document.visibilityState !== 'visible') return
      const r = ref.current || {}
      const dados = {
        email,
        nome,
        empresaId: r.name === 'empresa' ? String(r.id || '').slice(0, 80) : '',
        tela: String(r.name === 'empresa' ? r.tab || 'painel' : r.name || 'empresas').slice(0, 30),
        visto: serverTimestamp(),
      }
      setDoc(doc(db, 'presenca', email), dados).catch(() => {})
    }
    envia()
    const t = setInterval(envia, PRESENCA_MS)
    document.addEventListener('visibilitychange', envia)
    window.addEventListener('hashchange', envia)
    return () => {
      clearInterval(t)
      document.removeEventListener('visibilitychange', envia)
      window.removeEventListener('hashchange', envia)
    }
  }, [email, nome])
}
