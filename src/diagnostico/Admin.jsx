import { go } from './util'
import EmpresasAdmin from './EmpresasAdmin'
import UsuariosAdmin from './UsuariosAdmin'

// Área da equipe SAN fora de uma empresa: barra lateral com Empresas e Usuários.
const NAV = [
  ['empresas', 'Empresas'],
  ['usuarios', 'Usuários'],
]

const ICONS = {
  empresas: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </>
  ),
  usuarios: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
}

export default function Admin({ view, email }) {
  return (
    <div className="dg-shell">
      <aside className="dg-side">
        <span className="dg-side-label">Administração SAN</span>
        <nav className="dg-nav" aria-label="Administração">
          {NAV.map(([k, l]) => (
            <button key={k} type="button" aria-current={view === k ? 'page' : undefined} onClick={() => go(`/${k}`)}>
              <svg className="dg-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[k]}
              </svg>
              <span>{l}</span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="dg-content">{view === 'usuarios' ? <UsuariosAdmin email={email} /> : <EmpresasAdmin email={email} />}</div>
    </div>
  )
}
