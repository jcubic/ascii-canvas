import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    // no platform specific imports — the bundle runs in Node and in the browser
    platform: 'neutral',
    target: ['node20.19', 'es2023'],
    dts: true,
    sourcemap: true,
    clean: true,
  },
  {
    entry: { index: 'src/index.ts' },
    format: 'umd',
    globalName: 'canvas',
    platform: 'browser',
    minify: true,
    sourcemap: true,
    clean: false,
  },
]);
