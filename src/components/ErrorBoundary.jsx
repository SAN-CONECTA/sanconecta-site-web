import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })
    // Também loga no console para o DevTools
    console.error('[ErrorBoundary] Erro capturado:', error)
    console.error('[ErrorBoundary] Component stack:', info?.componentStack)
  }

  render() {
    if (this.state.error) {
      const err = this.state.error
      const stack = this.state.info?.componentStack || ''
      return (
        <div style={{
          minHeight: '100vh',
          background: '#07142e',
          color: '#e9eef7',
          padding: '48px 24px',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 14,
          lineHeight: 1.6,
        }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: 'rgba(255,138,138,0.1)',
              border: '1px solid rgba(255,138,138,0.4)',
              borderRadius: 999,
              color: '#ff8a8a',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: 18,
            }}>
              ⚠ SAN Conecta — erro de runtime capturado
            </div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 28,
              color: '#fff',
              margin: '0 0 24px',
              fontWeight: 600,
            }}>
              {err?.name || 'Error'}: {err?.message || String(err)}
            </h1>
            <p style={{ color: 'rgba(233,238,247,0.65)', margin: '0 0 24px' }}>
              Esta tela só aparece porque o site tem um Error Boundary ativo. Em vez de ficar em branco,
              mostra qual componente lançou o erro para que a correção seja direta.
            </p>
            <details open style={{ marginBottom: 24 }}>
              <summary style={{
                cursor: 'pointer',
                color: '#f0c75c',
                fontWeight: 700,
                marginBottom: 10,
              }}>Stack do erro</summary>
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: 16,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: 'rgba(233,238,247,0.9)',
              }}>{err?.stack || 'sem stack'}</pre>
            </details>
            {stack && (
              <details open>
                <summary style={{
                  cursor: 'pointer',
                  color: '#f0c75c',
                  fontWeight: 700,
                  marginBottom: 10,
                }}>Component stack (qual componente React falhou)</summary>
                <pre style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: 16,
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: 'rgba(233,238,247,0.9)',
                }}>{stack}</pre>
              </details>
            )}
            <a
              href="https://wa.me/5566996440184"
              style={{
                display: 'inline-block',
                marginTop: 32,
                padding: '12px 22px',
                background: '#d4a93a',
                color: '#07142e',
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Falar com especialista
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
