import { signOut } from 'firebase/auth'
import { auth, firebaseConfigured } from './firebase'
import { Login, VerifyEmail } from './Auth'
import { useSession } from './useSession'
import { useRoute } from './util'
import Empresas from './Empresas'
import Empresa from './Empresa'
import logo from '../assets/logo.png'

function Setup() {
  return (
    <main className="dg-auth">
      <div className="dg-auth-card">
        <img className="dg-auth-logo" src={logo} alt="SAN Conecta" />
        <h1>Diagnóstico 360° de TI</h1>
        <p>
          O Firebase ainda não foi configurado. Abra <code>src/diagnostico/firebaseConfig.js</code>, cole os dados do app
          Web do projeto e publique de novo. O passo a passo está em <code>docs/DIAGNOSTICO.md</code>.
        </p>
      </div>
    </main>
  )
}

export default function App() {
  const session = useSession()
  const route = useRoute()

  if (!firebaseConfigured) return <Setup />
  if (session.loading) return <main className="dg-auth"><p className="dg-muted">Carregando…</p></main>
  if (!session.user) return <Login />
  if (!session.user.emailVerified) return <VerifyEmail user={session.user} />

  return (
    <div className="dg-app">
      <header className="dg-top">
        <a className="dg-brand" href="#/">
          <img src={logo} alt="SAN Conecta" />
          <span>Diagnóstico 360° de TI</span>
        </a>
        <div className="dg-user">
          <span className="dg-small">{session.user.displayName || session.user.email}</span>
          <span className={`dg-role ${session.staff ? 'is-staff' : ''}`}>{session.staff ? 'Administrador SAN' : 'Cliente'}</span>
          <button type="button" className="dg-btn" onClick={() => signOut(auth)}>Sair</button>
        </div>
      </header>
      <main className="dg-main">
        {route.name === 'empresa' ? (
          <Empresa key={route.id} id={route.id} tab={route.tab} session={session} />
        ) : (
          <Empresas key={`${session.user.uid}-${session.staff}`} session={session} />
        )}
      </main>
    </div>
  )
}
