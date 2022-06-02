import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    ssr: false,
    outDir: '../dist/example',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
