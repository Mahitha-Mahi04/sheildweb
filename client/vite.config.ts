import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy for local API
        secure: false,
        changeOrigin: true
      },
      '/check-url': {
        target: 'https://linkshieldapi.com', // Proxy for external API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/check-url/, '/api/v1/link/score') // Rewrite to match external API path
      },
      '/page-audit': {
        target: 'https://on-page-seo-audit.p.rapidapi.com',
        secure: true,
        changeOrigin: true
      },
    },
  },
});
