# Testing

The project uses a **lightweight headless-browser smoke test** rather than a
large test framework — the interface is small and most of the "logic" is
artistic state, so a few high-value interaction checks are proportionately
better than a sprawling unit suite.

## What's tested

`scripts/smoke.mjs` builds the project, serves `dist/`, drives a real headless
Chromium, and asserts:

1. The page boots and the hero headline renders.
2. The app mounts (one React root).
3. The mode toggle flips to Critique (annotations appear, `aria-pressed`).
4. The player starts (the "LIVE SIMULATION" badge appears).
5. The offer claim CTA exists and produces the "ACCESS GRANTED" state.
6. No unexpected console errors on boot.

## Run it

```bash
npm test          # or npm run test:smoke
```

## Why not a unit-test framework

The state that matters is intentionally untruthful and time-based (countdowns,
incrementing counters). Unit-testing them would either assert trivial facts or
lock in the artistic values (e.g. "countdown never reaches zero"), which is
better documented than tested. The smoke test exists to catch *regressions in
the things that must keep working* — the page boots, the toggle works, the
player starts, the claim flow completes.

## Adding a check

Add to `scripts/smoke.mjs` in the appropriate section. Use the DOM
interaction style already present (click via text match, wait, assert). If a
check needs a real browser gesture, keep it in the smoke test — don't pull in
a heavier framework for one interaction.

## CI

`.github/workflows/ci.yml` runs `lint`, `typecheck`, `build`, and `test:smoke`
on push and PR. This is the gate for merges.

## Determinism note

The screenshot capture and the smoke test run in the same headless environment
(bundled Chromium). They are deterministic apart from the animated clocks,
which the scripts wait past with fixed sleeps rather than trying to freeze.
