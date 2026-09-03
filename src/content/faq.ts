/**
 * The "Frequently Suppressed Questions" accordion. Every answer pre-empts a
 * doubt the visitor hasn't finished forming — the FAQ is a pre-emption
 * mechanism, not transparency. The copy is the point; the structure is a
 * standard accordion.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Is this a real product?",
    a: "Does it need to be? The transaction clears either way. The confirmation email arrives regardless of referent.",
  },
  {
    q: "What am I actually purchasing?",
    a: "You are purchasing this page's belief in itself — packaged, priced, and made available for 30 more minutes, forever.",
  },
  {
    q: "Will this work for me?",
    a: "It worked for the 3,482 testimonials you already believed. Ask yourself why that number felt sufficient.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "Dissatisfaction implies an original experience to be disappointed against. There isn't one to compare it to — which, functionally, is the same as a guarantee.",
  },
  {
    q: "Why does the countdown timer never reach zero?",
    a: "Because urgency is not a fact about time. It is a fact about design. The clock isn't measuring an expiration — it's producing one.",
  },
  {
    q: "Who wrote the testimonials?",
    a: "The same entity that will write yours, once you scroll back up and read that you already bought this.",
  },
];
