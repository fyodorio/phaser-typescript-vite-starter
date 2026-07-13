import { defineConfig } from 'vite';

// Vite 8 uses Rolldown as its bundler and Oxc as the default minifier, so no
// terser dependency is needed — minification is on automatically for `build`.
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        // Split the (large) Phaser runtime into its own long-cacheable chunk.
        // Rolldown (Vite 8) takes the function form of manualChunks.
        manualChunks: (id) => (id.includes('node_modules/phaser') ? 'phaser' : undefined),
      },
    },
  },
  server: {
    port: 8080,
  },
});
