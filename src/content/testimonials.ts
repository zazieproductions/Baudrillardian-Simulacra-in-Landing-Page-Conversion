/**
 * The testimonial personas.
 *
 * In `funnel` mode each card shows the "verified buyer" identity. In `theory`
 * mode the cards cycle between the buyer and the "real" identity beneath it —
 * the stock asset, the composite persona, the face on file — making explicit
 * that the social proof is manufactured. The imagery is intentionally generic
 * stock photography, because that is the point.
 */
export interface TestimonialPersona {
  img: string;
  /** index 0 = the buyer identity (funnel); index 1 = the construction (theory). */
  identities: { name: string; role: string; quote: string }[];
}

export const TESTIMONIALS: TestimonialPersona[] = [
  {
    img: "/images/testimonial-1.jpg",
    identities: [
      {
        name: "Jessica R.",
        role: "Verified Buyer, Austin TX",
        quote: "I didn't believe it until I did. Now I don't believe anything else.",
      },
      {
        name: "Model #4471-A",
        role: "Licensed stock asset, expires never",
        quote: "This likeness has appeared in 212 other testimonials since 2019.",
      },
    ],
  },
  {
    img: "/images/testimonial-2.jpg",
    identities: [
      {
        name: "Marcus T.",
        role: "Verified Buyer, 6-figure earner",
        quote: "The results speak for themselves, which is convenient, because I can't.",
      },
      {
        name: "Getty-Adjacent Face",
        role: "Royalty-free, all rights simulated",
        quote: "I was smiling before this campaign existed and I'll be smiling after.",
      },
    ],
  },
  {
    img: "/images/testimonial-3.jpg",
    identities: [
      {
        name: "Dana K.",
        role: "Verified Buyer, 'changed my life'",
        quote: "It replaced a need I didn't have with a certainty I can't shake.",
      },
      {
        name: "Composite Persona",
        role: "Assembled from focus-group data",
        quote: "My testimony was A/B tested against a warmer version of itself. I lost.",
      },
    ],
  },
  {
    img: "/images/testimonial-4.jpg",
    identities: [
      {
        name: "Harold V.",
        role: "Verified Buyer, skeptic-turned-fan",
        quote: "I came here to disprove it. The page was more convincing than my doubt.",
      },
      {
        name: "Face on File #90",
        role: "No relation to any real transaction",
        quote: "There is no purchase behind this smile. There never needed to be.",
      },
    ],
  },
];
