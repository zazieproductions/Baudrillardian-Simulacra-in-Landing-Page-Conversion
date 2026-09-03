# Interface system

The interface is a small, fixed set of components. This document maps each
component to its structural role and its conceptual job. The structural role
is conventional; the conceptual job is what makes the piece work.

## Component index

| Component | File | Structural role | Conceptual job |
|---|---|---|---|
| `ModeProvider` | `src/components/ModeProvider.tsx` | Owns the global mode | The fulcrum between funnel and critique |
| `ModeToggle` | `src/components/ModeToggle.tsx` | Fixed top-right switch | The literal lever between the two registers |
| `TopBar` | `src/App.tsx` | Fixed wordmark, top-left | Nameplate |
| `SimulacraTracker` | `src/components/SimulacraTracker.tsx` | Fixed bottom dock | Walks the visitor through Orders I–IV on scroll |
| `Hero` | `src/components/Hero.tsx` | Headline + player | The "Faithful Image" that is already a lie |
| `Testimonials` | `src/components/Testimonials.tsx` | Social proof grid | Evidence for a product no one received |
| `Offer` | `src/components/Offer.tsx` | Value stack + countdown + claim | The self-referential purchase |
| `Guarantee` | `src/components/Guarantee.tsx` | Promise | A refund for a state that never existed |
| `FAQ` | `src/components/FAQ.tsx` | Accordion | Pre-empting doubt |
| `Footer` | `src/components/Footer.tsx` | Attribution + disclaimer | The one (performed) honest note |
| `Annotation` | `src/components/Annotation.tsx` | Paper-tag note (Critique only) | Reveals the construction under each section |

## The fixed chrome

Three fixed elements frame the page, always visible:

```
TopBar (wordmark)          ModeToggle (lever)
                    ┌──── content ────┐
SimulacraTracker   └─────────────────┘ (progress + stage)
```

- **TopBar** — minimal; only its accent color changes with mode.
- **ModeToggle** — a pill with "SIMULATION ● CRITIQUE" and a literal switch.
  It is the only control that provokes a *whole-page* change.
- **SimulacraTracker** — a 3px gradient progress bar plus a stage readout
  (`STAGE I/IV`, the order name, and a definition). It is part progress bar,
  part concept display.

## Interaction surfaces

| Surface | Type | Behavior |
|---|---|---|
| Mode toggle | `<button aria-pressed>` | Toggles global mode |
| Player play/pause | `<button>` | Toggles `playing` |
| Player overlay (big play) | `<button>` | Starts the broadcast |
| Offer claim | `<button>` | `idle → processing → done` |
| FAQ item | `<button aria-expanded>` | Accordion open/close |
| "Give me instant access" | `<a href="#offer">` | In-page anchor |

## Feedback & states

- **Live simulation** — a pulsing red dot + mono label in the top-left of the
  player once it starts.
- **Offer claim** — the CTA switches to "VERIFYING A PURCHASE THAT NEEDS NO
  VERIFICATION…" for 1.6s, then to an "ACCESS GRANTED" panel.
- **Critique register** — the whole page desaturates, annotations fade in, and
  testimonial identities begin to cycle.

## Layout grid

- Sections use `max-w-2xl` to `max-w-6xl` centered containers with `px-4 sm:px-6`.
- The testimonials grid is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- The offer is a `md:grid-cols-2` split (image left, purchase panel right).
- Fixed elements use `z-50`; annotations use `z-30`; the grain overlay uses
  `z-60`.

## Naming conventions

- Components are PascalCase files (default exports).
- Content/data modules are lowercase under `src/content/`.
- Lib modules are lowercase under `src/lib/`.
- Custom CSS classes are kebab-case (`.grain`, `.scanline`, `.glitch`,
  `.theory-mark`, `.paper-crossout`, `.pulse-glow`).
