import { useState } from "react";
import { Plus } from "lucide-react";
import Annotation from "./Annotation";

const ITEMS = [
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

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6">
      <Annotation label="Objection Handling" className="absolute left-2 sm:left-10 -top-2" align="left">
        Every FAQ pre-answers a doubt before you finish forming it. This is not transparency. It is pre-emption.
      </Annotation>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] tracking-widest uppercase text-red mb-3">Frequently Suppressed Questions</p>
          <h2 className="font-display text-3xl sm:text-4xl text-paper">BEFORE YOU DOUBT IT, READ THIS</h2>
        </div>

        <div className="space-y-3">
          {ITEMS.map((item, i) => (
            <div key={i} className="border border-line rounded-lg overflow-hidden bg-ink-2/50">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-sm sm:text-base text-paper tracking-wide">{item.q}</span>
                <Plus
                  size={18}
                  className={`text-yellow shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-serif italic text-muted px-5 pb-5 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
