import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/solid-hotkeys',
  build: {
    ssr: false,
    outDir: '../dist/example',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
