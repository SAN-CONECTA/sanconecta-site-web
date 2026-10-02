import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
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
