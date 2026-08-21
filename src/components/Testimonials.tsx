import { useEffect, useState } from "react";
import { Star, ShieldAlert } from "lucide-react";
import Annotation from "./Annotation";
import { useMode } from "../lib/ModeContext";

const PEOPLE = [
  {
    img: "/images/testimonial-1.jpg",
    identities: [
      { name: "Jessica R.", role: "Verified Buyer, Austin TX", quote: "I didn't believe it until I did. Now I don't believe anything else." },
      { name: "Model #4471-A", role: "Licensed stock asset, expires never", quote: "This likeness has appeared in 212 other testimonials since 2019." },
    ],
  },
  {
    img: "/images/testimonial-2.jpg",
    identities: [
      { name: "Marcus T.", role: "Verified Buyer, 6-figure earner", quote: "The results speak for themselves, which is convenient, because I can't." },
      { name: "Getty-Adjacent Face", role: "Royalty-free, all rights simulated", quote: "I was smiling before this campaign existed and I'll be smiling after." },
    ],
  },
  {
    img: "/images/testimonial-3.jpg",
    identities: [
      { name: "Dana K.", role: "Verified Buyer, 'changed my life'", quote: "It replaced a need I didn't have with a certainty I can't shake." },
      { name: "Composite Persona", role: "Assembled from focus-group data", quote: "My testimony was A/B tested against a warmer version of itself. I lost." },
    ],
  },
  {
    img: "/images/testimonial-4.jpg",
    identities: [
      { name: "Harold V.", role: "Verified Buyer, skeptic-turned-fan", quote: "I came here to disprove it. The page was more convincing than my doubt." },
      { name: "Face on File #90", role: "No relation to any real transaction", quote: "There is no purchase behind this smile. There never needed to be." },
    ],
  },
];

function TestimonialCard({ person, index }: { person: (typeof PEOPLE)[number]; index: number }) {
  const { mode } = useMode();
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (mode !== "theory") {
      setFlip(false);
      return;
    }
    const t = setInterval(() => setFlip((f) => !f), 2600 + index * 400);
    return () => clearInterval(t);
  }, [mode, index]);

  const identity = person.identities[flip ? 1 : 0];

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
          className={`w-12 h-12 rounded-full object-cover border border-line ${mode === "theory" ? "grayscale" : ""}`}
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
        "{identity.quote}"
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-ink-2/40 border-y border-line">
      <div className="max-w-6xl mx-auto">
        <Annotation label="Order III — Pretense of Reality" className="absolute right-2 sm:right-8 -top-4" align="right">
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
          {PEOPLE.map((p, i) => (
            <TestimonialCard key={i} person={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
