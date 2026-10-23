import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aiSre: resolve(__dirname, 'ai-sre/index.html'),
        paymentEngine: resolve(__dirname, 'payment-engine/index.html'),
        pizzaApi: resolve(__dirname, 'pizza-api/index.html'),
        insurancePrediction: resolve(__dirname, 'insurance-prediction/index.html'),
      },
    },
  },
});
