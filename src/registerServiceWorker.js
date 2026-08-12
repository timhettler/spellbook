import { registerSW } from 'virtual:pwa-register';

import { store } from './store';
import { setBanner } from './actions';
import { OUTDATED_CONTENT, OFFLINE_READY } from './constants/offline';

// vite-plugin-pwa generates the Workbox service worker at build time and exposes
// registration through the `virtual:pwa-register` module (configured in
// vite.config.ts). We drive the update flow through Redux so the existing
// OfflineToast banner keeps working:
//   - onNeedRefresh  -> a new version is waiting   -> "update available" banner
//   - onOfflineReady -> assets cached for offline  -> "offline ready" banner
// registerSW is a no-op in dev (unless devOptions.enabled), so calling it
// unconditionally is safe.
let updateSW = () => Promise.resolve();

export default function register() {
  updateSW = registerSW({
    onNeedRefresh() {
      store.dispatch(setBanner(OUTDATED_CONTENT));
    },
    onOfflineReady() {
      store.dispatch(setBanner(OFFLINE_READY));
    },
  });
}

// Activate the waiting service worker and reload into the new version. Wired to
// the "An update is available. Tap to refresh." toast in OfflineToast.
export function applyUpdate() {
  return updateSW(true);
}
