import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// Multi-page build: every route ships as a real HTML file with its own
// <title>/<meta>, so Hostinger serves 200s and crawlers never hit an SPA 404.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': resolve(root, 'src') },
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        fleet: resolve(root, 'fleet/index.html'),
        quote: resolve(root, 'quote/index.html'),
        terms: resolve(root, 'terms/index.html'),
        notfound: resolve(root, '404.html'),
      },
    },
  },
})
