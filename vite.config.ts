import { defineConfig } from 'vite'

const path = require('path')

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactRouterPlusPlus'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})