import { copyFileSync } from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

function copyMarqyCss() {
  return {
    name: 'copy-marqy-css',
    writeBundle() {
      copyFileSync('./marqy.css', './dist/marqy.css')
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    vue(),
    svelte(),
    dts({ rollupTypes: true, entryRoot: 'src' }),
    copyMarqyCss(),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        react: resolve(__dirname, 'src/react/index.tsx'),
        vue: resolve(__dirname, 'src/vue/index.ts'),
        svelte: resolve(__dirname, 'src/svelte/index.ts'),
        vanilla: resolve(__dirname, 'src/vanilla/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) =>
        `${name}.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'vue', 'svelte', /^svelte\//],
      output: {
        globals: {
          react: 'React',
          vue: 'Vue',
          svelte: 'Svelte',
        },
      },
    },
    minify: 'esbuild',
    sourcemap: true,
  },
})
