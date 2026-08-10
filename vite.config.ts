/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Absolute path to `src`, used to replicate CRA's Sass resolution.
const srcDir = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Resolves the `baseUrl: "src"` bare imports from tsconfig.json
    // (e.g. `import Button from 'components/Button'`).
    tsconfigPaths(),
  ],
  build: {
    // Firebase Hosting serves from this directory (see firebase.json).
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        // CRA added `src` to Sass's load path via tsconfig `baseUrl`, which is
        // why `@use 'utilities/scss/vars'` (no `./` or `~`) resolves. Replicate
        // that here so the SCSS keeps working untouched.
        includePaths: [srcDir],
      },
    },
    modules: {
      // Keep the original (kebab-case) class names as keys so bracket access
      // like `styles['sorting-button']` keeps working, matching CRA/css-loader.
      localsConvention: 'camelCase',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    // CRA/Jest picked up files under `__tests__`; the existing suite is named
    // `*.tests.js`, which Vitest's default glob would miss, so widen it.
    include: ['src/**/*.{test,tests,spec}.{js,jsx,ts,tsx}'],
  },
});
