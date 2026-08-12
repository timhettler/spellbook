# Spellbook

A fast, installable **D&D 5e spellbook** — browse, search, and filter the full
5th-edition spell list, read spell details, and save favorites. It's a
single-page app with no backend that keeps working offline once loaded.

🔗 **Live:** https://spellbook-pi.vercel.app

## Features

- Browse the complete 5e spell list (virtualized for speed)
- Search by name and filter by class, casting time, school, ritual,
  concentration, material cost, upcastability, favorites, and history
- Full spell detail — casting time, range, components, duration, description
  with cross-reference links, "at higher levels", and source
- Favorite spells and a recently-viewed history, persisted locally
- Deep-linkable spell routes (`/spell/:id`)
- Installable **PWA**: works offline and shows a banner when a new version is
  available

## Tech stack

- **[Vite](https://vitejs.dev/) 6** + **[React](https://react.dev/) 19**
- **Redux** (`react-redux`, `redux-persist`, `reselect`) for state and local
  persistence
- **React Router 6** for routing
- **react-window** (virtualized list) and **react-markdown** (spell descriptions)
- **Sass** with CSS Modules
- **TypeScript** for the spell data under `src/data`
- **Vitest** for tests; **ESLint** / **Stylelint** / **Prettier** for quality
- **vite-plugin-pwa** (Workbox) for the service worker
- Hosted on **[Vercel](https://vercel.com/)**

## Requirements

- **Node ≥ 20** (the PWA build needs it — see [Deployment](#deployment))
- **Yarn** 3.4, managed by [Corepack](https://nodejs.org/api/corepack.html)

## Getting started

```sh
corepack enable   # activate the pinned Yarn version
yarn install
yarn dev          # start the dev server
```

## Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Start the Vite dev server |
| `yarn build` | Type-check (`tsc --noEmit`) then build to `dist/` |
| `yarn preview` | Serve the production build locally (needed to exercise the service worker) |
| `yarn test` | Run the Vitest suite (`yarn test:watch` to watch) |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn lint` | ESLint over `src` |
| `yarn format:css` | Stylelint over `src/**/*.scss` |

## Project structure

```
src/
  AppRoutes.jsx        routes (BrowserRouter)
  index.jsx            entry: createRoot + <Provider> + <HelmetProvider>
  store.js             redux store + redux-persist
  reducers.js
  actions.js, actionTypes.js
  components/          presentational components
  containers/          connected (Redux-aware) components
  data/                spell + class data (TypeScript) — the app's "database"
  constants/, utilities/
  registerServiceWorker.js   PWA registration (vite-plugin-pwa)
```

All spell data lives in `src/data` and is bundled at build time; there is no
server or database.

## Deployment

Hosted on **Vercel**, which builds on every push:

- **`master`** → production (`spellbook-pi.vercel.app`)
- every other branch / PR → its own preview URL

[`vercel.json`](vercel.json) rewrites all routes to `/index.html` (so deep links
like `/spell/:id` resolve on refresh) and serves `sw.js` with `no-cache` so PWA
updates are picked up. There is no deploy step in CI — Vercel's Git integration
handles it.

> **Why Node 20+?** `vite-plugin-pwa` builds the service worker in a worker
> thread that needs the Web Crypto global, which Node exposes to worker threads
> only from v20. Vercel uses Node 20+ by default; locally, run `nvm use 20` (or
> newer) before `yarn build`.
