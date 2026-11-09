import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // caminhos relativos: o build funciona em qualquer pasta (ex.: GitHub Pages)
  base: './',
})
