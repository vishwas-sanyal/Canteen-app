import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      '@components': `${__dirname}/src/components`,
      '@pages': `${__dirname}/src/pages`,
      '@store': `${__dirname}/src/store`,
      '@api': `${__dirname}/src/api`,
      '@types': `${__dirname}/src/types`,
      '@hooks': `${__dirname}/src/hooks`,
      '@utils': `${__dirname}/src/utils`,
      '@data': `${__dirname}/src/data`,
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  }
})
