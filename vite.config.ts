import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// Remover:
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// @ts-ignore
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
    },
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
  build: {
    rollupOptions: {
      // Remover plugins: [rollupNodePolyFill()],
    },
  },
})
