// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or your framework plugin

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
