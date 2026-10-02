import { useEffect, useState } from 'react'

export const pad = (n) => String(n).padStart(2, '0')

export function todayStr() {
  const t = new Date()
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
}

export function fmtD(s) {
  if (!s) return ''
  const p = String(s).split('-')
  return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : String(s)
}

export function fmtTs(ts) {
  try {
    const d = ts && ts.toDate ? ts.toDate() : null
    return d ? d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : ''
  } catch {
    return ''
  }
}

export function daysBetween(a, b) {
  return Math.round((new Date(`${b}T00:00:00`) - new Date(`${a}T00:00:00`)) / 864e5)
}

export const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export const normEmail = (s) => String(s || '').trim().toLowerCase()

// Mensagens de erro do Firebase Auth e do Firestore em português.
export function errMsg(e) {
  const c = (e && e.code) || ''
  const map = {
    'auth/invalid-email': 'E-mail inválido.',
    'auth/missing-password': 'Informe a senha.',
    'auth/weak-password': 'A senha precisa ter ao menos 8 caracteres.',
    'auth/email-already-in-use': 'Este e-mail já tem conta. Use Entrar ou Esqueci minha senha.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
    'auth/network-request-failed': 'Sem conexão. Confira a internet e tente de novo.',
    'auth/operation-not-allowed': 'O login por e-mail e senha não está ativado no Firebase.',
    'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase Authentication.',
    'permission-denied': 'Seu acesso não permite esta ação.',
    unavailable: 'Serviço indisponível no momento. Tente de novo.',
  }
  return map[c] || 'Algo deu errado. Tente de novo.'
}

// Rota por hash (#/e/<empresa>/<aba>), pois o GitHub Pages não redireciona caminhos novos.
function parseHash() {
  const p = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (p[0] === 'e' && p[1]) return { name: 'empresa', id: p[1], tab: p[2] || 'painel' }
  return { name: 'empresas' }
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const f = () => setRoute(parseHash())
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return route
}

export const go = (path) => {
  window.location.hash = path
}
