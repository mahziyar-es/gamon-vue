import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, {resolve } from 'path'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'


export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'plugin')}/`
    }
  },


  plugins: [
    vue(),
    dts(),
    cssInjectedByJsPlugin(),
  ],



  build: {
    lib: {
      entry: resolve(__dirname, 'plugin/index.ts'),
      formats:['es', 'cjs'],
      name: 'gamon-vue',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      },
      plugins: [
      ],
    }
  },

})
