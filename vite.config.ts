/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// Absolute path to `src`, used to replicate CRA's Sass resolution.
const srcDir = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Resolves the `baseUrl: "src"` bare imports from tsconfig.json
    // (e.g. `import Button from 'components/Button'`).
    tsconfigPaths(),
    // Generates a Workbox service worker (precache + SPA navigation fallback)
    // and exposes registration via `virtual:pwa-register`. We register it
    // manually in src/registerServiceWorker.js (wired to the OfflineToast
    // banners) and keep the existing public/manifest.json, so `injectRegister`
    // and `manifest` are disabled here.
    //
    // NOTE: the SW build minifies in a worker thread that needs the Web Crypto
    // global, which Node only exposes to workers from v20 on — hence the
    // "engines" >= 20 requirement in package.json.
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      manifest: false,
      workbox: {
        // Inline the Workbox runtime into a single sw.js rather than loading it
        // from a separate chunk via the off-main-thread AMD loader, which some
        // browsers refuse to register ("unknown error occurred when fetching
        // the script").
        inlineWorkboxRuntime: true,
        globPatterns: ['**/*.{js,css,html,svg}'],
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    // Static host (Vercel) serves this directory (see vercel.json).
    outDir: 'dist',
    // The `spell-data` and `vendor` chunks below are intentionally large: the
    // full spell list needs all data up front, so it can't be sub-split without
    // an app-level refactor. Raise the warning threshold above them rather than
    // flag an architecture we've chosen deliberately.
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        // Split the single ~1.2 MB bundle so that a change to app code no longer
        // invalidates the (rarely-changing) third-party libs or the bundled spell
        // data. Three chunks: app entry, `spell-data` (src/data/*), and `vendor`
        // (node_modules) — all still loaded eagerly, but cached independently.
        manualChunks(id) {
          if (id.includes('/src/data/')) return 'spell-data';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // CRA added `src` to Sass's load path via tsconfig `baseUrl`, which is
        // why `@use 'utilities/scss/vars'` (no `./` or `~`) resolves. Replicate
        // that here so the SCSS keeps working untouched. Vite 6 defaults to the
        // modern Sass API, so this uses `loadPaths` (the modern equivalent of
        // the legacy `includePaths`).
        loadPaths: [srcDir],
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
