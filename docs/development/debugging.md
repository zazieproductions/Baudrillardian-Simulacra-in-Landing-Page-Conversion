# Debugging

## Framework & tooling

This is a standard Vite + React + TypeScript project. Use the browser DevTools
(React DevTools, Performance, Network) as you normally would.

Common commands:

```bash
npm run typecheck    # tsc -b — catches type errors
npm run lint         # eslint — catches lint + React rules
npm run build        # tsc -b + vite build — catches build/runtime issues
npm test             # headless smoke test — catches broken interactions
```

## The one global value to inspect

Nearly everything hangs off `mode`. In React DevTools, inspect the
`ModeProvider` to read `mode` and confirm `toggle` behaves. If the whole page
isn't changing when you click the toggle, check that the component calling
`useMode()` is a descendant of `ModeProvider` (all sections are).

## The "countdown never reaches zero" behavior

This is intentional. In `src/content/offer.ts`, `DEADLINE_SECONDS` resets to
full on zero. The hero remaining-time uses a modulo window. If you think the
clock is broken, read `src/content/offer.ts` and `src/content/hero.ts` first.

## The "live" player is silent

This is intentional. There is no audio track or element. The `Volume2` icon is
decorative. If you're looking for a sound source, there isn't one.

## Console errors from screenshots / smoke tests

The capture and smoke scripts filter out known benign noise (favicon 404, some
`net::ERR`). If a real error appears, it's surfaced. The headless browser runs
with `--no-sandbox` and SwiftShader; GPU-specific warnings are expected and
harmless.

## Browser-specific notes

- `backdrop-filter` (fixed chrome) degrades to a solid background on older
  browsers.
- The FAQ reveal uses CSS `grid-rows` animation — check target browsers.
- The scanline and grain overlays are `pointer-events: none`; if content
  becomes unclickable, check the overlay's z-index/pointer-events.

## When the mode toggle doesn't visually change images

The desaturation is applied via `[&_img]:grayscale` on `<main>` in `App.tsx`.
If images don't desaturate, confirm that `main` actually has that class in
theory mode and that there are `<img>` elements inside it (the hero and
testimonials and offer all have images).
