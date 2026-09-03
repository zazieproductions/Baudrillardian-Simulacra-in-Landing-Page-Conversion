# Roadmap

This is a living document. Items are grouped by how *realistic* they are given
the current architecture, not by priority. Nothing here is a commitment — it's
a map of possible directions.

## Near-term

Realistic improvements that fit the existing React/DOM architecture and don't
require re-architecting anything:

- **Persist Critique mode between visits** (with a deliberate toggle or a
  one-time reveal). Today the mode resets on refresh, which is intentional but
  is the most common question. A thoughtful implementation would persist the
  *first* critique as a one-off performance, then let the user choose.
- **Refine the scroll→order mapping** so each band aligns with a section
  boundary, making the stage label track the section you're actually in.
- **Add a "live" aria-live region** so screen readers announce stage changes
  and the toggle; extend a11y beyond the current `aria-pressed` / `aria-expanded`.
- **Harden the headless tooling** into a small reusable module and add a
  `npm run check` that runs lint + typecheck + build + smoke in one command.
- **Bundle a `404.html`** so GitHub Pages serves a branded not-found page.
- **Extract design tokens to a separate `tokens.css`** so visual language is
  explicitly versioned.

## Experimental

More ambitious but still within reach, leaning into the creative-technology
dimension:

- **Synthetic broadcast audio in Critique mode** — a Web Audio drone/whine
  that only plays when you reveal the construction. Requires a user gesture;
  would make the "is this live?" ambiguity aural.
- **Generative testimonial faces** — procedurally generated portraits (WebGL
  or seeded SVG) instead of static stock images, so the "construction" is
  visibly synthetic.
- **A "recursion depth" mechanic** — each time you claim the offer, the page
  nests another layer of itself (a page-within-a-page), encoding the
  self-reference as a spatial/UI effect.
- **Offline "rendering"** — a persistent, timed countdown that measures real
  time across sessions, making urgency *feel* continuous rather than reset.
- **A downloadable artifact** — "take a copy of this page" that generates a
  runnable `.zip`/HTML of the current state (a literal self-replication).

## Research directions

Speculative / unusual, listed without implying commitment. These may need
technologies or conceptual work beyond the current stack:

- **OSC / MIDI control** — drive the mode toggle, stage, and clocks from a
  hardware controller or a Max/MSP patch, turning the page into an instrument.
- **WebMIDI** — a native MIDI surface for live performance.
- **AudioWorklets** — the correct place for any real-time DSP if audio is ever
  pursued beyond a drone.
- **Shader systems** — a GLSL grain/glitch layer replacing the CSS texture,
  which would let the "decay" be continuous and GPU-driven.
- **Spatial audio** — a binaural rendering of the "broadcast" that must be
  heard in a specific way (headphones-only) to decode it.
- **Patch systems / modular state** — make the persuasive "modules" (countdown,
  claimants, testimonials) pluggable so curators can compose new pieces of
  persuasion.
- **Sensory input** — camera gaze, accelerometer, or ambient light to
  modulate the critique; the page could "notice" you the way a persuasion
  engine does.
- **Live performance modes** — a mode where the page is driven by an operator
  (with hidden controls) so a festival visitor experiences the mechanism being
  run in real time.

## Guiding principle

Whatever is added should deepen the *concept* — the recursion, the revealed
construction, the manufactured urgency — rather than merely decorate the
existing page. If a feature could just as easily belong on a normal SaaS
landing page, it probably doesn't belong here.
