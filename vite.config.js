import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Versão exibida no Diagnóstico 360°: número do package.json, código do commit e data da publicação.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
let commit = 'local'
try {
  commit = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || 'local'
} catch {
  // sem git no ambiente de build: mantém "local"
}

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
    'import.meta.env.VITE_APP_COMMIT': JSON.stringify(commit),
    'import.meta.env.VITE_APP_BUILT': JSON.stringify(new Date().toISOString()),
  },
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // Duas páginas: a landing (index.html) e a área do diagnóstico (diagnostico360/index.html -> /diagnostico360/).
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        diagnostico360: fileURLToPath(new URL('./diagnostico360/index.html', import.meta.url)),
      },
    },
  },
})
