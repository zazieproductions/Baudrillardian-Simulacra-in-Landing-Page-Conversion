/**
 * The four "orders" of the simulacrum, following Jean Baudrillard's
 * "Simulacra and Simulation" (1981). This is the conceptual spine of the
 * whole piece: the page progresses through these stages as the visitor
 * scrolls, and each major section is annotated with the order it enacts.
 *
 * They are both the on-screen "STAGE I/IV" indicator and the conceptual
 * schema used to label the sections. Keeping them here means the taxonomy
 * can't drift between the tracker and the annotations.
 */
export interface SimulacrumOrder {
  roman: string;
  name: string;
  desc: string;
}

export const SIMULACRUM_ORDERS: SimulacrumOrder[] = [
  {
    roman: "I",
    name: "Faithful Image",
    desc: "It is the reflection of a basic reality.",
  },
  {
    roman: "II",
    name: "Perversion",
    desc: "It masks and denatures a basic reality.",
  },
  {
    roman: "III",
    name: "Pretense",
    desc: "It masks the absence of a basic reality.",
  },
  {
    roman: "IV",
    name: "Pure Simulacrum",
    desc:
      "It bears no relation to reality whatever: it is its own pure simulacrum.",
  },
];

/**
 * Given a scroll progress in [0, 1], return the index of the order currently
 * "in force". The page is divided into four equal bands; overflowing the
 * final band keeps you pinned to order IV.
 */
export function orderIndexForProgress(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(SIMULACRUM_ORDERS.length - 1, Math.floor(clamped * SIMULACRUM_ORDERS.length));
}
