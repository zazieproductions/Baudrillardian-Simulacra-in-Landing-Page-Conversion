# Changelog

All notable changes to THE PRODUCT™ are recorded here. This project follows
[Keep a Changelog](https://keepachangelog.com/) and, once versioned, Semantic
Versioning.

## [Unreleased]

## [1.0.0] — 2026-09-03

### Added
- Repository reorganization into a professional structure:
  `docs/{architecture,design,technical,development}`,
  `.github/{workflows,ISSUE_TEMPLATE}`.
- Full documentation suite: **README**, **ARCHITECTURE.md**, **CONTRIBUTING.md**,
  **CHANGELOG.md**, **ROADMAP.md**, **SECURITY.md**, and subsystem docs under
  `docs/`.
- Self-hosted fonts via `@fontsource/{anton,fraunces,jetbrains-mono}` — no
  runtime font CDN.
- Generated on-theme artwork and stock-style testimonial images in `public/images/`.
- `scripts/` tooling: `capture-screenshots.mjs`, `smoke.mjs`,
  `build-social-preview.mjs`, and `lib/browser.mjs` (bundled-Chromium
  bootstrap for offline, reproducible screenshots & tests).
- Real screenshots in `docs/images/` (project-preview, project-active,
  project-detail) and a 1280×640 `github-social-preview.png`.
- GitHub Pages deployment workflow (`.github/workflows/deploy-pages.yml`) and
  CI workflow (`.github/workflows/ci.yml`).
- `VITE_BASE`-aware base path and `.env.example`.
- `favicon.svg` and Open Graph / social meta in `index.html`.

### Changed
- Split `ModeContext` into `lib/mode.ts` (context + hook + type) and
  `components/ModeProvider.tsx` (provider component) to satisfy React Fast
  Refresh "only export components".
- Extracted static content/data into `src/content/` (hero, testimonials,
  offer, faq + a shared `lib/simulacrum.ts` for the four orders).
- Refactored `Testimonials` so leaving Critique mode no longer triggers a
  cascade render (fixed `react-hooks/set-state-in-effect`).
- Removed the unused `raf` ref in `Hero` (fixed `no-unused-vars`).
- Removed unused `react-router-dom` dependency (the page uses fragment
  anchors, not routes) — this also cleared the `npm audit` high severity
  findings.
- Removed A/B/telemetry injection scripts from `index.html`.
- Removed the DesignArena source-tags plugin from `vite.config.ts`.

### Security
- `npm audit` now reports **0 vulnerabilities** (previously 2 high severity
  from `react-router-dom`).

## [0.0.0] — 2026-09-03

### Added
- Initial export of the project (React + Vite + TypeScript template).
- The full page: Hero, Testimonials, Offer, Guarantee, FAQ, Footer,
  ModeToggle, SimulacraTracker, Annotation.
- The Simulation / Critique mode system and the four-stage scroll tracker.
- The simulated "live" player and the self-referential offer.
