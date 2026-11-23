import { getApp, getApps, initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { firebaseConfig } from './firebaseConfig'

// Envia ao e-mail o link para definir a senha. Se a conta ainda não existe, cria com uma senha aleatória que ninguém
// conhece (num app secundário, para não derrubar o login de quem está enviando) e o link de redefinição vira o primeiro acesso.
// A conta nasce sem e-mail verificado: sem vínculo liberado e e-mail verificado, as regras não dão acesso a nenhum dado.
function senhaAleatoria() {
  const b = new Uint8Array(24)
  crypto.getRandomValues(b)
  return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('')
}

export async function enviarEmailAcesso(mail) {
  const settings = { url: `${window.location.origin}/diagnostico360/` }
  let criada = false
  const sec = getAuth(getApps().some((a) => a.name === 'convite') ? getApp('convite') : initializeApp(firebaseConfig, 'convite'))
  try {
    await createUserWithEmailAndPassword(sec, mail, senhaAleatoria())
    criada = true
  } catch (e) {
    if (!e || e.code !== 'auth/email-already-in-use') throw e
  } finally {
    await signOut(sec).catch(() => {})
  }
  await sendPasswordResetEmail(auth, mail, settings)
  return criada
}
