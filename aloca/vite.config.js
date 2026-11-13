import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // caminhos relativos: o build funciona em qualquer pasta (ex.: GitHub Pages)
  base: './',
  server: {
    // Proxy: o app chama /api/salas e o Vite repassa para o JSON Server em http://localhost:8000/salas
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
