import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from './firebase'
import { errMsg, isEmail, normEmail } from './util'
import logo from '../assets/logo.png'

// Depois de confirmar o e-mail (ou redefinir a senha), a tela do Firebase oferece "Continuar" para esta página.
const continueSettings = () => ({ url: `${window.location.origin}/diagnostico360/` })

function Frame({ children }) {
  return (
    <main className="dg-auth">
      <div className="dg-auth-card">
        <img className="dg-auth-logo" src={logo} alt="SAN Conecta" />
        <p className="dg-eyebrow">Auditoria de tecnologia</p>
        <h1>Diagnóstico 360° de TI</h1>
        {children}
      </div>
    </main>
  )
}

export function Login() {
  const [mode, setMode] = useState('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })

  const switchMode = (m) => {
    setMode(m)
    setMsg({ kind: '', text: '' })
  }

  async function submit(e) {
    e.preventDefault()
    const mail = normEmail(email)
    if (!isEmail(mail)) return setMsg({ kind: 'err', text: 'Informe um e-mail válido.' })
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      if (mode === 'entrar') {
        await signInWithEmailAndPassword(auth, mail, senha)
      } else if (mode === 'criar') {
        if (nome.trim().length < 2) throw Object.assign(new Error('nome'), { code: 'nome' })
        if (senha.length < 8) throw Object.assign(new Error('senha'), { code: 'auth/weak-password' })
        const cred = await createUserWithEmailAndPassword(auth, mail, senha)
        await updateProfile(cred.user, { displayName: nome.trim() })
        await sendEmailVerification(cred.user, continueSettings())
      } else {
        await sendPasswordResetEmail(auth, mail, continueSettings())
        setMsg({ kind: 'ok', text: 'Se este e-mail tiver conta, enviamos o link para criar uma nova senha. Olhe também o spam.' })
      }
    } catch (err) {
      setMsg({ kind: 'err', text: err.code === 'nome' ? 'Informe seu nome.' : errMsg(err) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Frame>
      <div className="dg-seg-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={mode === 'entrar'} onClick={() => switchMode('entrar')}>Entrar</button>
        <button type="button" role="tab" aria-selected={mode === 'criar'} onClick={() => switchMode('criar')}>Criar conta</button>
      </div>
      <form onSubmit={submit} className="dg-form" noValidate>
        {mode === 'criar' && (
          <label className="dg-fld">
            <span>Nome</span>
            <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" maxLength={80} />
          </label>
        )}
        <label className="dg-fld">
          <span>E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        {mode !== 'esqueci' && (
          <label className="dg-fld">
            <span>Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={mode === 'entrar' ? 'current-password' : 'new-password'}
              placeholder={mode === 'criar' ? 'Mínimo de 8 caracteres' : ''}
            />
          </label>
        )}
        {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
        <button className="dg-btn dg-primary" type="submit" disabled={busy}>
          {busy ? 'Aguarde…' : mode === 'entrar' ? 'Entrar' : mode === 'criar' ? 'Criar conta' : 'Enviar link'}
        </button>
        {mode === 'entrar' && (
          <button type="button" className="dg-link" onClick={() => switchMode('esqueci')}>Esqueci minha senha</button>
        )}
        {mode === 'esqueci' && (
          <button type="button" className="dg-link" onClick={() => switchMode('entrar')}>Voltar para Entrar</button>
        )}
      </form>
      {mode === 'criar' && (
        <p className="dg-note">
          Use o mesmo e-mail que a SAN Conecta cadastrou para a sua empresa. Criar a conta não libera dados: o acesso
          depende do cadastro feito pela SAN.
        </p>
      )}
    </Frame>
  )
}

export function VerifyEmail({ user }) {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ kind: '', text: '' })

  async function confirmed() {
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      await user.reload()
      await user.getIdToken(true)
      if (!auth.currentUser.emailVerified) {
        setMsg({ kind: 'err', text: 'Ainda não consta a confirmação. Abra o link do e-mail e tente de novo.' })
      }
    } catch (err) {
      setMsg({ kind: 'err', text: errMsg(err) })
    } finally {
      setBusy(false)
    }
  }

  async function resend() {
    setBusy(true)
    setMsg({ kind: '', text: '' })
    try {
      await sendEmailVerification(user, continueSettings())
      setMsg({ kind: 'ok', text: 'E-mail reenviado. Olhe também o spam.' })
    } catch (err) {
      setMsg({ kind: 'err', text: errMsg(err) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Frame>
      <p>
        Enviamos um link de confirmação para <strong>{user.email}</strong>. Abra o e-mail, clique no link e volte aqui.
      </p>
      {msg.text && <p className={msg.kind === 'ok' ? 'dg-ok' : 'dg-err'} role="alert">{msg.text}</p>}
      <div className="dg-actions">
        <button className="dg-btn dg-primary" type="button" onClick={confirmed} disabled={busy}>Já confirmei</button>
        <button className="dg-btn" type="button" onClick={resend} disabled={busy}>Reenviar e-mail</button>
        <button className="dg-btn" type="button" onClick={() => signOut(auth)}>Sair</button>
      </div>
    </Frame>
  )
}
