# Setup

## Requirements

- **Node.js 20+** (tested with 22)
- **npm 9+**

The app has no other system dependencies to run. It is a Vite + React project.

## Install

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Vite will print a local URL (default `http://localhost:5173`). The page
renders immediately with HMR — edit a component and it updates in place.

## No required environment variables

The app runs with zero configuration. Optional env vars (see `.env.example`):

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Annotate the deployed origin (documentation only) |
| `VITE_BASE` | Override the Vite base path (e.g. `/repo/`) |

## Headless-browser tooling (for screenshots & tests)

`scripts/` (screenshots, smoke tests, social preview) use
`@sparticuz/chromium` + `puppeteer-core`. These are **devDependencies** and do
not affect the shipped bundle. The Chromium binary ships inside the npm
package, so no browser download is needed — this is why the scripts work in
offline/CI environments.

```bash
npm run capture:screenshots   # rebuild + serve dist + capture to docs/images/
npm run build-social-preview  # compose the 1280x640 GitHub social card
npm test                      # build + headless smoke test
```

If you need to run the scripts on a machine that already has system libs for
Chromium, they will still work — the bootstrap extracts the bundled Amazon
Linux 2023 NSS libraries and points `LD_LIBRARY_PATH` at them so the binary
loads.

## Verify your setup

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

All four should pass. `npm test` is the slowest because it builds and drives a
browser.
