// Versão do sistema, gravada na hora do build (ver vite.config.js).
const versao = import.meta.env.VITE_APP_VERSION || 'dev'
const commit = import.meta.env.VITE_APP_COMMIT || 'local'
const built = import.meta.env.VITE_APP_BUILT || ''

function dataDaVersao() {
  if (!built) return ''
  const d = new Date(built)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('pt-BR', { timeZone: 'America/Cuiaba' })
}

export default function Versao() {
  const data = dataDaVersao()
  return (
    <p className="dg-version dg-mono" title={`Versão ${versao}, código ${commit}${built ? `, publicada em ${built}` : ''}`}>
      Versão {versao}
      {data ? ` · ${data}` : ''} · {commit}
    </p>
  )
}
