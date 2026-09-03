# Visual language

The interface is not a floating website. It is *an instrument panel under
archival lighting* — dark, dense, labeled, and just off-kilter. This document
codifies the tokens and the reasoning. The aesthetic deliberately resists the
pastel, rounded SaaS look.

## Core registers

When you toggle **Critique**, the page shifts register. The contrast between
the two registers *is* the design system:

| | Simulation | Critique |
|---|---|---|
| Color | Yellow urgency, red danger, warm ink | Same palette, but imagery desaturated + contrasted |
| Added | Funnel: countdowns, live dots, crossed-out totals | Annotations (paper tags), scanline, glitch text, "unverifiable" badges |
| Reading | You are addressed as a buyer | You are reading the production |

## Design tokens

Defined in `src/index.css` under `@theme`:

```css
--color-ink:      #0b0a08;  /* near-black, warm */
--color-ink-2:    #131109;  /* elevated surface */
--color-paper:    #f6f1e4;  /* warm off-white text */
--color-yellow:   #f4c400;  /* urgency / highlight */
--color-red:      #ff2d2d;  /* danger / CTA */
--color-critique: #ff5c4d;  /* the "theory" accent */
--color-muted:    #8b8578;  /* dimmed label text */
--color-line:     #2a2620;  /* borders / rule lines */
```

Fonts:

```css
--font-display: "Anton", "Arial Narrow", sans-serif;  /* headlines, wordmark */
--font-serif:   "Fraunces", Georgia, serif;            /* body voice */
--font-mono:    "JetBrains Mono", monospace;           /* interface labels */
```

## Typographic hierarchy

- **Display (Anton)** — the loudest voice. Tight tracking, all-caps feel,
  near-1.0 line-height. Used for `H1`, section `H2`s, the wordmark, CTA
  buttons, the "Today Only" price.
- **Serif italic (Fraunces)** — the persuasive/editorial voice. Most body
  copy, the testimonial quotes, the "live presentation" description, the
  Baudrillard quote in the footer.
- **Mono (JetBrains Mono)** — the *instrument* voice. Labels, readouts,
  countdowns, "STAGE I/IV", annotation labels, disclaimers. All uppercase and
  tracked, which makes it read as machine output.

## Uppercase mono labeling

A signature move: small, uppercase, `tracking-widest` mono text used as
section eyebrows and readouts, e.g. `SOCIAL PROOF, SO CALLED`, `THE OFFER`,
`OFFER EXPIRES IN`. This gives every block a "label plate," like panel
captions on a machine.

## Borders and rules

- `--color-line` for 1px borders on cards, the tracker bar, and section
  dividers.
- The fixed bottom tracker has a `border-t` rule and a 3px gradient progress
  bar (`yellow → red → critique`).
- Cards are flat filled panels (`ink-2`) with fine borders — no drop shadows
  except the hero player, which has a heavy `0_30px_80px` shadow to make it
  feel like a stage.

## Motion

- **Glitch-flicker** — a 6s sporadic opacity/translate jitter, applied to
  testimonial text on the constructed identity. It reads as a decode.
- **Scanline** — a 4s vertical red-tinted sweep in Critique mode. It makes the
  whole page feel like a CRT under investigation.
- **Pulse-glow** — a 2s box-shadow pulse on the "live" indicator dot.
- **Framer Motion** — annotations rise/rotate in; the transcript line slides
  in on each cycle.

## Iconography

Provided by `lucide-react`, used sparsely and only where an instrument would
need one:

- `Play`, `Pause`, `Volume2`, `Maximize2` — the player costume.
- `Star` — testimonial rating (the only "customer" icon).
- `ShieldAlert` — the "unverifiable" badge in Critique mode.
- `ShieldCheck` — the guarantee seal.
- `Check`, `Lock`, `TrendingUp` — the offer stack.
- `Plus` — the FAQ accordion.

## Texture

- **Grain** — a fixed, full-viewport SVG-noise overlay at 5% opacity with
  `mix-blend-mode: overlay`. It keys the whole thing to "analog / recovered
  media."
- **Scanline** — Critique only.

## Does this sterilize the eccentricity?

The system deliberately keeps *intentional imperfections*:

- The countdown never reaches zero.
- The "contents: this page, recursively" caption under the product box.
- The paper-tag annotations that are slightly rotated with a hard offset
  shadow (not a clean tooltip).
- Testimonial identities that flip to "Model #4471-A," "Getty-Adjacent Face."

These are not bugs to be polished away; they are the point. When extending the
design system, preserve them.
