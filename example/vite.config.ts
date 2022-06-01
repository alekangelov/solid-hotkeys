import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    outDir: '../dist/example',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
