import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 8080 },
  // Phaser is a big engine; one bundle is fine for a starter — hush the size warning.
  build: { chunkSizeWarningLimit: 1500 },
});
