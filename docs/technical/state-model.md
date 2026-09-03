# State model

This is the single most important thing to understand before modifying the
page: **there is one piece of global state, and everything else is transient
local state that the piece does not want to preserve.**

## The one global value: `mode`

Defined in `src/lib/mode.ts`:

```ts
export type Mode = "funnel" | "theory";
```

It is created by `ModeProvider` and distributed through `ModeContext`. Any
component can read it with `useMode()`:

```tsx
const { mode, toggle } = useMode();
```

When `toggle()` runs, every consumer re-renders. That is intentional — flipping
the register is meant to transform the *entire* artifact at once, not a panel.

### Why it's a context and not a store

The page is small. A context with one value is the minimal mechanism that gives
every section access to the same signal. Bringing in a state library, a
reducer, or a persistence layer would add conceptual weight without a
corresponding benefit — and would imply the state *matters beyond the session*,
which the artwork explicitly denies (see below).

## Local state, by section

| Component | State | Purpose | Lifespan |
|---|---|---|---|
| `Hero` | `playing`, `elapsed`, `lineIdx` | Simulated broadcast | While mounted |
| `Offer` | `secondsLeft`, `claimed`, `step` | Fabricated urgency + claim flow | While mounted |
| `Testimonials` (per card) | `flip` | Identity cycle in Critique mode | While mounted |
| `FAQ` | `open` | Accordion open index | While mounted |
| `SimulacraTracker` | `progress` | Scroll → order mapping | While mounted |

None of these are lifted. There is no shared "offer state" or "hero state"
because the page never needs to coordinate them.

## The `flip` state and the effect rule

`Testimonials` is the one place where a subtle React rule had to be respected.
Previously the component called `setFlip(false)` inside a `useEffect` body when
leaving theory mode, which triggers a cascade render (flagged by the
`react-hooks/set-state-in-effect` rule).

The current implementation does **not** reset `flip` when leaving theory. It
only *reads*:

```tsx
const identityIdx = mode === "theory" ? (flip ? 1 : 0) : 0;
```

The `flip` bit is simply dormant while in Simulation mode. This is both
correct React and conceptually right: the constructed identity isn't
"destroyed" when you stop looking at the critique — it was always there,
waiting to be revealed again.

## Why the mode is not persisted

There is no `localStorage` for `mode`. Each visit starts in Simulation. This
is deliberate: the piece should re-establish its offer on every arrival. If you
want to experiment with persistence, see ROADMAP — but know that persisting
Critique mode would weaken the performance.

## The "non-truthful" invariants

Two pieces of local state are intentionally unreliable:

- **`secondsLeft`** resets to `DEADLINE_SECONDS` on reaching zero. Urgency is
  periodic, not finite.
- **`claimed`** only ever increments, by `Math.floor(Math.random()*3)` every
  4s. Scarcity is a one-way ratchet.

These are stable invariants — do not "fix" them to be truthful.
