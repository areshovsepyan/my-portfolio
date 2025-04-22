import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Sitemap({
      hostname: 'https://ara-hovsepyan.com',
      exclude: ['/admin', '/login'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['@unhead/vue/client'],
  },
});
