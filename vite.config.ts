import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cowork: resolve(__dirname, 'cowork/index.html'),
        salt: resolve(__dirname, 'salt/index.html'),
        toddle: resolve(__dirname, 'toddle/index.html'),
        atlassian: resolve(__dirname, 'atlassian/index.html'),
      },
    },
  },
});
