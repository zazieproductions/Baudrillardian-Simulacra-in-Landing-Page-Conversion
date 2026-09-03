# Audio engine — or, why there isn't one

**There is no audio engine.** That is not an omission; it is the concept.

## What the code actually contains

- No `<audio>` element.
- No Web Audio `AudioContext`, `AnalyserNode`, `OscillatorNode`, or
  `AudioWorklet`.
- No `.mp3` / `.wav` / `.ogg` files.
- No autoplay, no sound triggered on interaction.
- The `Volume2` icon in the hero player bar and the `Maximize2` icon are
  **decorative** — they have no handlers and no purpose beyond completing the
  "broadcast player" costume.

## Why silence is the choice

The hero's "presentation" is a simulation of a live event. A real audio track
would make it *a video of a talk*. Silence makes it *a page performing the
idea of a talk*. When the broadcast is staged entirely from state — a cycling
transcript string, a running clock, a progress bar — the visitor is watching
the *mechanism* of a broadcast, not consuming a recording.

This is reinforced by the copy: *"This presentation has never been watched
live. It has also never not been live."* An actual soundtrack would undercut
that. There is nothing to listen to because there is nothing being played.

## If audio is ever added

This is genuinely a future direction (see ROADMAP under "Experimental"),
but adding it should be treated as adding a **conceptual layer**, not a
polish pass. It would need to answer: *what does the broadcast sound like when
it is revealed to be a construction?* A credible approach would use Web Audio
to synthesize a drone or a distorted "broadcast tone" only in Critique mode —
so the audio is itself a revelation, not ambience.

The existing React structure has a clean seam for this: `mode` is broadcast
through `ModeContext`, and a hypothetical `AudioLayer` component could listen
to it. But do **not** add an `AudioContext` that starts on load; browsers
require a user gesture anyway, and the page should not become noisy by
default.

## Performance

Because there is no audio, there is no `AudioContext` lifecycle to manage, no
suspend/resume handling, no worklet threading, and none of the autoplay
policy workarounds. The page's only real-time work is a couple of
`setInterval` timers.
