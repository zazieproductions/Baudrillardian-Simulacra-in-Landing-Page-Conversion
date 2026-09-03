# Contributing

Thanks for wanting to work on a piece of creative technology. This project is
both software **and** an artwork, so the usual contribution rules apply *and*
there are a couple of conceptual ones.

## License — read this first

This repository is **UNLICENSED** (all rights reserved by Zazie Productions).
There is **no open-source license** on this code, artwork, or copy. That means
by default you may **not** redistribute, modify, or use it in your own work
outside of this repository without permission.

Before contributing, treat the code as rights-reserved material. If you are
considering using any part of it (including the copy, the concept, or the
images) elsewhere, ask the maintainer first.

## What counts as a good contribution

- **Bug fixes** — something is broken or behaves inconsistently.
- **Accessibility** — improving how the page reads for assistive tech.
- **Performance** — without changing the conceptual behavior.
- **Documentation** — clearer explanations, better diagrams.
- **Tooling** — better build/test/CI experience.
- **Creative direction** — ideas that deepen the concept (see ROADMAP).

## What to be careful about

1. **Do not "fix" the intentional unreliability.** The countdown resets on
   reaching zero; the claimant counter only increments; the remaining time
   never resolves. These are the point. If a change makes them *truthful*,
   it is almost certainly wrong.
2. **Do not flatten the aesthetic.** Keep the dark, archival, institutional
   visual language. Don't convert it to a generic SaaS look.
3. **Do not add audio by default.** The piece is deliberately silent. Adding
   sound without a conceptual reason (see ROADMAP) changes the piece.
4. **Preserve the recursion.** The self-reference (offer sells the page that
   sells the offer) is the core. Don't add an "exit" that resolves it.

## Workflow

1. **Open an issue** first for anything non-trivial (use the
   [ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE/)). It helps clarify intent before
   code.
2. **Branch** from `main` with a descriptive name.
3. **Make the change.** Keep it scoped; don't bundle unrelated refactors.
4. **Run the checks:**
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   npm test
   ```
5. **Commit** with a clear message.
6. **Open a pull request** using
   [PR_TEMPLATE](.github/pull_request_template.md).

## Commit message style

Concise, imperative, and descriptive. For example:

```
Fix testimonial flip reset in theory mode
```

or

```
docs: explain the countdown reset invariant
```

## Definition of done

A contribution is complete when:

- `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test` pass.
- No new console errors.
- The Simulation / Critique toggle still works.
- The page still behaves as a persuasive landing page in Simulation and as an
  annotated reading in Critique.
- If the UI changed, run `npm run capture:screenshots` and updated the images.
