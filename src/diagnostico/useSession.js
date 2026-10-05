import { useEffect, useState } from 'react'
import { onIdTokenChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

// Sessão: usuário do Firebase Auth e se o e-mail dele consta na lista de administradores SAN (coleção staff).
// Só vale depois de o e-mail ser verificado: as regras do Firestore exigem email_verified.
export function useSession() {
  const [session, setSession] = useState({ loading: true, user: null, staff: false })

  useEffect(() => {
    if (!auth) return undefined
    return onIdTokenChanged(auth, async (user) => {
      let staff = false
      if (user && user.emailVerified) {
        try {
          staff = (await getDoc(doc(db, 'staff', user.email.toLowerCase()))).exists()
        } catch {
          staff = false
        }
      }
      setSession({ loading: false, user, staff })
    })
  }, [])

  return session
}
