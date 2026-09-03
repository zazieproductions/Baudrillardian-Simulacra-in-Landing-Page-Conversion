/**
 * The offer's value stack and clock parameters.
 *
 * The deadline is the project's central lie made structural: it counts down
 * from `DEADLINE_SECONDS` and, on reaching zero, instantly resets to full.
 * It is a periodic timer, not a scarcity of anything but attention. This is
 * documented in the FAQ and annotated on-screen ("remaining time recalculates
 * itself so it never quite reaches zero").
 */
export const DEADLINE_SECONDS = 15 * 60;

/** The bundled value stack, with the inflated "value" of each line item. */
export interface OfferLine {
  name: string;
  value: number;
}

export const OFFER_STACK: OfferLine[] = [
  { name: "The Core Method (a PDF describing this page, in this page)", value: 1997 },
  { name: "Bonus: Belief Reinforcement Framework™", value: 997 },
  { name: "Bonus: Access to a Community Confirming Your Purchase", value: 497 },
  { name: "Bonus: This Exact Landing Page, Yours to Redeploy", value: 1506 },
];

export const OFFER_TOTAL_VALUE = OFFER_STACK.reduce((a, b) => a + b.value, 0);

/** The "today only" price shown against the crossed-out total. */
export const OFFER_PRICE = 97;

/** How often the fabricated number of claimants ticks upward, in ms. */
export const CLAIM_TICK_MS = 4000;

/** The initial fabricated count of people who have "claimed" the offer. */
export const INITIAL_CLAIMANTS = 2847;
