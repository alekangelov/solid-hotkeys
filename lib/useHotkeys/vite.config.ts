import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [solidPlugin(), dts()],
  build: {
    outDir: '../../dist/lib',
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'solid-hotkeys',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['solid-js'],
      treeshake: true,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'solid-js': 'solidJs',
        },
      },
    },
  },
});
