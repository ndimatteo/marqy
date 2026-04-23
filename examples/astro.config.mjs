import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

export default defineConfig({
  integrations: [react(), vue(), svelte()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'AkkuratMono',
      cssVariable: '--font-akkurat-mono',
      options: {
        variants: [
          {
            src: [
              './src/fonts/Akkurat-Mono.woff2',
              './src/fonts/Akkurat-Mono.woff',
            ],
            weight: 500,
            style: 'normal',
          },
          {
            src: [
              './src/fonts/Akkurat-Mono-Bold.woff',
            ],
            weight: 700,
            style: 'normal',
          },
        ],
      },
      fallbacks: ['monospace'],
    },
    {
      provider: fontProviders.local(),
      name: 'GrtskPeta',
      cssVariable: '--font-grtsk',
      options: {
        variants: [
          {
            src: [
              './src/fonts/Grtsk-Peta-Light.woff2',
              './src/fonts/Grtsk-Peta-Light.woff',
            ],
            weight: 300,
            style: 'normal',
          },
          {
            src: [
              './src/fonts/Grtsk-Peta-Regular.woff2',
              './src/fonts/Grtsk-Peta-Regular.woff',
            ],
            weight: 400,
            style: 'normal',
          },
          {
            src: [
              './src/fonts/Grtsk-Peta-Medium.woff2',
              './src/fonts/Grtsk-Peta-Medium.woff',
            ],
            weight: 500,
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'GrtskTera',
      cssVariable: '--font-grtsk-wide',
      options: {
        variants: [
          {
            src: [
              './src/fonts/Grtsk-Tera-Medium.woff2',
              './src/fonts/Grtsk-Tera-Medium.woff',
            ],
            weight: 500,
            style: 'normal',
          },
          {
            src: [
              './src/fonts/Grtsk-Tera-Bold.woff2',
              './src/fonts/Grtsk-Tera-Bold.woff',
            ],
            weight: 700,
            style: 'normal',
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client', 'react-cool-dimensions'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    server: {
      watch: {
        ignored: ['**/node_modules/marqy/src/**'],
      },
    },
  },
})
