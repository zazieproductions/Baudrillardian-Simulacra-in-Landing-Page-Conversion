# Performance

The performance model is deliberately small because the project avoids the
heavy browser APIs (Canvas, WebGL, Web Audio, continuous animation loops).

## Budget summary

| Resource | Amount | Notes |
|---|---|---|
| JS bundle | ~111 KB gzip | Single chunk, React + Framer Motion |
| CSS bundle | ~28 KB gzip | Tailwind v4 utilities + custom keyframes |
| Fonts | 3 families, per-weight woff2 | Self-hosted, loaded as used |
| Network | 1 HTML + 1 JS + 1 CSS + font files | No external CDN at runtime |
| Runtime loops | ~4 `setInterval` | Hero (2), Offer (2) |
| Animation | Framer Motion transitions | Annotation enter/exit, transcript line |

## The render path avoids rAF

The only per-frame-ish work is:

- **Scroll listener** (passive) in `SimulacraTracker`, which computes progress
  on each event and sets state. It does not run a `requestAnimationFrame`
  loop.
- **CSS animations** (`scanline`, `glitch-flicker`, `pulse-glow`) which the
  compositor handles.

The `Hero` clock uses `setInterval` at 1s (elapsed) and `LINE_ADVANCE_MS`
(transcript). The `Offer` uses 1s (countdown) and `CLAIM_TICK_MS` (claimants).
All of these are throttled by the browser in background tabs.

## What is *not* present (and why that's a win)

- **No Canvas / WebGL** — no rasterization budget, no GPU context, no DPR
  scaling concerns.
- **No Web Audio** — no `AudioContext`, no graph, no worklets.
- **No rAF-driven simulation** — no particle system, no per-frame update.

## Mobile / responsive

The page is responsive via Tailwind breakpoints (`sm`, `md`, `lg`). The fixed
chrome (TopBar, ModeToggle, SimulacraTracker) is `position: fixed`; on small
screens the content stack is single-column. The grain overlay is a single
full-viewport element, so it does not scale with content height.

## Measuring

There is no FPS instrumentation in the repo. If you need to verify the page
stays at 60fps (it should trivially), profile with DevTools Performance and
look for:
- Long tasks from React re-renders (there shouldn't be many — the tree is
  small).
- Layout thrash (the FAQ uses CSS grid rows so it doesn't measure content).
- Network waterfalls (should be a handful of requests).

## Known cost: the grain overlay

`mix-blend-mode: overlay` on a fixed, full-viewport element can be a
compositing cost on very low-end hardware because the browser has to blend the
whole viewport each frame during which it's animating. It's static (the image
doesn't move), so after the first paint it's typically cached. If you see
jank on a low-end device, the easiest lever is dropping `mix-blend-mode`
or reducing the overlay opacity.
