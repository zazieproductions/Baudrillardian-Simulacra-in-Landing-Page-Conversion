import { useEffect, useState } from "react";
import { Star, ShieldAlert } from "lucide-react";
import Annotation from "./Annotation";
import { useMode } from "../lib/mode";
import { TESTIMONIALS } from "../content/testimonials";

/**
 * A single testimonial card.
 *
 * In `funnel` mode it always shows the "verified buyer" identity. In `theory`
 * mode it cycles on a per-card interval between the buyer and the constructed
 * identity underneath (stock model / composite persona / face on file), and
 * badges itself as "unverifiable". The glitch class is applied to the text on
 * the *constructed* identity so the reveal reads as a decoding, not a static
 * correction.
 */
function TestimonialCard({
  person,
  index,
}: {
  person: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  const { mode } = useMode();
  const [flip, setFlip] = useState(false);

  // Only run the identity-cycle while in theory mode. We don't reset `flip`
  // when leaving theory; instead the output below pins to identity 0, so the
  // flip bit is simply dormant until the visitor re-enters theory mode.
  useEffect(() => {
    if (mode !== "theory") return;
    const t = setInterval(() => setFlip((f) => !f), 2600 + index * 400);
    return () => clearInterval(t);
  }, [mode, index]);

  const identityIdx = mode === "theory" ? (flip ? 1 : 0) : 0;
  const identity = person.identities[identityIdx];

  return (
    <div className="relative bg-ink-2 border border-line rounded-lg p-5 flex flex-col gap-3">
      {mode === "theory" && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-critique/90 text-ink font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded">
          <ShieldAlert size={10} /> unverifiable
        </div>
      )}
      <div className="flex items-center gap-3">
        <img
          src={person.img}
          alt={identity.name}
          className={`w-12 h-12 rounded-full object-cover border border-line ${
            mode === "theory" ? "grayscale" : ""
          }`}
        />
        <div className={mode === "theory" && flip ? "glitch" : ""}>
          <p className="font-display text-sm text-paper tracking-wide">{identity.name}</p>
          <p className="font-mono text-[10px] text-muted">{identity.role}</p>
        </div>
      </div>
      <div className="flex gap-0.5 text-yellow">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} fill="currentColor" />
        ))}
      </div>
      <p className={`font-serif italic text-sm text-paper/90 ${mode === "theory" && flip ? "glitch" : ""}`}>
        &quot;{identity.quote}&quot;
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-ink-2/40 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <Annotation
          label="Order III — Pretense of Reality"
          className="absolute right-2 sm:right-8 -top-4"
          align="right"
        >
          These testify to satisfaction with a product no one has received. The signature is authentic; what it signs for is not.
        </Annotation>

        <div className="text-center mb-12">
          <p className="font-mono text-[11px] tracking-widest uppercase text-red mb-3">Social Proof, So Called</p>
          <h2 className="font-display text-3xl sm:text-4xl text-paper">
            REAL PEOPLE. <span className="text-yellow">REAL RESULTS.</span>*
          </h2>
          <p className="font-mono text-[10px] text-muted mt-2">*toggle critique to meet them as they actually are</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((p, i) => (
            <TestimonialCard key={i} person={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
