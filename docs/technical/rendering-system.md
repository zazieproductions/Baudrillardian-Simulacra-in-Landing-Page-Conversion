# Rendering system

THE PRODUCT™ renders on the **DOM + CSS**, not on a canvas. This is a design
choice as much as a technical one: the interface needs to be legible as an
*archive* (crisp text, borders, labels) and its effects need to feel
*institutional*, not flashy.

## Stack

- **React 19** — component tree, JSX, reconciliation.
- **Tailwind CSS v4** — utility classes for layout, spacing, and color, via
  `@tailwindcss/vite`.
- **Framer Motion** — the animated annotations and the cycling transcript line.
- **Pure CSS** — grain, scanline, glitch, and pulse keyframes.

There is **no Canvas API, no WebGL, no SVG `<canvas>`**, and no `requestAnimationFrame`
loop for rendering.

## Layers

The page is a stack of decorative + content layers:

```
body (ink background)
 └─ #root
     └─ .grain            (fixed, z-60, pointer-events:none)
     └─ TopBar            (fixed, top-left)
     └─ ModeToggle        (fixed, top-right)
     └─ <main>            (content)
     └─ SimulacraTracker  (fixed, bottom)
```

The `.grain` overlay is a fixed, full-viewport element with `mix-blend-mode:
overlay` and a tiny inline SVG turbulence as a data URI. It sits above the
content (z-60) but ignores pointer events, so it adds texture without
intercepting interaction.

## The mode switch as a class change

The register change is almost entirely a **CSS class change on the root and
`<main>`**:

```tsx
<div className={`min-h-screen transition-colors duration-500 ${mode === "theory" ? "scanline relative" : ""}`}>
  <main className={mode === "theory" ? "[&_img]:grayscale [&_img]:contrast-110" : ""}>
```

- `scanline` adds an animated `::after` overlay (a slow red-tinted gradient
  sweep).
- `[&_img]:grayscale` desaturates every image inside `main` with a single
  selector — no per-image JS.

Because this is driven by a class, it is instant, hardware-composited where
possible, and consistent across the whole page.

## Animation primitives

All keyframes live in `src/index.css`:

```css
@keyframes glitch-flicker { /* opacity + translate jitter, 6s loop */ }
@keyframes scanline       { /* translateY -100% → 100%, 4s loop */ }
@keyframes pulse-glow     /* box-shadow pulse, 2s loop */ }
```

Framer Motion handles the *content* transitions that need to enter/exit
reactively — the `Annotation` components (driven by `AnimatePresence`) and the
transcript line (keyed by `lineIdx`, animated with a small `y`/`opacity`
shift).

## Text rendering

- Display faces (Anton) are loaded for headlines and the wordmark.
- Fraunces (serif + italic) is the body voice — it gives the page the
  "editorial/archival" tone.
- JetBrains Mono is used for interface chrome: labels, counter readouts,
  annotations, and the "STAGE I/IV" indicators.

All fonts are **self-hosted** via `@fontsource`, imported in `main.tsx`. Each
weight ships as its own `woff2`, so only the used weights are requested.

## Accessibility of the render

- Layout is semantic: `<section>`, `<h1>/<h2>`, `<main>`, `<footer>`,
  `<button>`.
- The reveal of FAQ content uses the CSS grid `grid-rows-[0fr] → [1fr]`
  technique, which animates height without a JavaScript measurement.
- The grain and scanline overlays are `pointer-events: none`, so they never
  block focus or clicks.
