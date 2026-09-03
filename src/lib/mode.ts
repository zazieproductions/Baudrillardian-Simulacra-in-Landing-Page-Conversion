import { createContext, useContext } from "react";

/**
 * The project's central mode switch.
 *
 * - `funnel`: the page behaves as a persuasive sales funnel. Every artifact
 *   (live countdown, testimonials, offer) performs its persuasive function.
 * - `theory`: the page becomes a reading of itself. Annotations appear, images
 *   desaturate, and identities/numbers are revealed as constructed. This is
 *   the Baudrillardian "critique" register, inverting the funnel into an
 *   object of study.
 *
 * The mode is deliberately a single global value owned high in the tree so
 * that any component can re-render against it (the entire page re-colors
 * and re-labels when it flips).
 */
export type Mode = "funnel" | "theory";

export interface ModeCtx {
  mode: Mode;
  toggle: () => void;
}

export const ModeContext = createContext<ModeCtx>({
  mode: "funnel",
  toggle: () => {},
});

/** Read the current simulation/critique mode from the tree. */
export function useMode(): ModeCtx {
  return useContext(ModeContext);
}
