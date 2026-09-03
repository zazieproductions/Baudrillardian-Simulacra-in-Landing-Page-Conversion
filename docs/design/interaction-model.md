# Interaction model & concept

THIS is the creative-technology document: how the interactions *mean* what
they mean. If you want to understand the piece rather than just fix it, read
this.

## The two registers

The single most meaningful interaction is the **Simulation / Critique toggle**.
It exists because the piece is built on a premise: a persuasive landing page
and a reading of that landing page can be the *same object*. When you flip the
toggle, you are not changing pages — you are changing the register in which
you read the one page in front of you.

- **Simulation** is the performative mode. The countdown is urgent, the
  testimonials are "verified," the offer is a bargain. You are being sold to.
- **Critique** is the analytic mode. The countdown is revealed as a clock that
  resets; the testimonial faces become stock assets; the "unverifiable" badges
  appear; the images desaturate; annotations explain each section's order.

Crucially, Critique does not *replace* the funnel — it *annotates* it. The
buttons are still there; the CTA is still on screen. You can buy the page that
is explaining why you want to buy the page. That recursive collapse is the
point.

## Scrolling as a thesis

The **SimulacraTracker** makes the four orders of the simulacrum the *axis of
the page*. Scrolling is not just navigation — it's a descent through the
taxonomy. At the top you're at Order I (Faithful Image), and as you scroll
toward the offer you pass into Order IV (Pure Simulacrum). The bottom dock is
a live display of the stage you're in and its definition.

This means the *physics of reading* (scroll) is isomorphic with the *logic of
the concept* (the four orders). That isomorphism is the single strongest idea
in the project — every other system supports it.

## Staged media: the "live" broadcast

The hero player is a simulation of a live event. There is no video, no audio;
only a clock, a cycling transcript, and a progress bar. The interaction of
*clicking play* is therefore a performance — you are asked to believe a
broadcast is happening, and the page obliges by narrating it. The "remaining
time" is computed against a modulo window so it never resolves to zero: the
event is, tautologically, always still going on and always about to end.

> "*This presentation has never been watched live. It has also never not been live.*"

## User agency and its limits

The piece grants agency and then reveals it as bounded:

- You can scroll — but scrolling walks you through a fixed taxonomy.
- You can click play — but the broadcast is pre-scripted.
- You can toggle Critique — but Critique only *reveals* the construction; it
  does not exit it. There is no "outside" to go to. The offer is still there.
- You can "claim" the offer — but claiming just returns another line of copy
  that reinforces the recursion.

This bounded agency is the emotional shape of the work: the more you engage,
the more you see there is nothing behind the engagement.

## Procedural systems & generative rules

There is no random generation in the deployed build beyond the claimant
counter (`Math.floor(Math.random()*3)` every 4s). The "generative" feel comes
from *deterministic* rules that produce unpredictability in time:

- The transcript cycles on a fixed cadence.
- The testimonial identity flip is staggered per card (`2600 + index*400` ms).
- The countdown resets on a fixed threshold.

The intentional glitches (the `glitch-flicker` on constructed identities, the
scanline in Critique) are *staged*, not random — they are choreographed
instability used to signal "this is constructed."

## Feedback loops & temporality

The page has no feedback loop in the control-theory sense (no sensor reads
its own output). But it has a *conceptual* loop: the offer sells you the page
that sells the offer, and claiming it makes you the next testimonial. That
loop is the project's real "system," and it's entirely in the copy and the
states.

Temporality is produced, not measured:

- The countdown manufactures a deadline that doesn't exist.
- The "claimed" counter fabricates an audience that's growing.
- The "847,213 people are watching" figure is static yet stated as live.

## Computational constraints used artistically

The deliberate absence of real media (no audio, no video, no canvas) is itself
a constraint turned into meaning: the page *performs* a broadcast with nothing
but text and a clock. The constraint *is* the medium.

## Why "simulacrum" is not just a theme

Baudrillard's fourth order is "the generation by models of a real without
origin or reality." The page literally does this: it generates a real-feeling
offer (price, countdown, testimonials, guarantee) whose origin (no product, no
buyers, no refunds) is not just absent but *irrelevant to its operation*. The
critique mode does not give you the "real" behind the offer — it shows you
that there is none, and that the offer works anyway. That is the fourth order
in operation.
