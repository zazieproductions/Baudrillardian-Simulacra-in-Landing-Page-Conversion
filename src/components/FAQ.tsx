import { useState } from "react";
import { Plus } from "lucide-react";
import Annotation from "./Annotation";
import { FAQ_ITEMS } from "../content/faq";

/**
 * The "Frequently Suppressed Questions" accordion.
 *
 * A single open index is tracked; opening a new item closes the previous one.
 * The reveal animation uses the CSS grid `grid-rows-[0fr] -> [1fr]` technique,
 * which animates height without needing to measure content (no ResizeObserver,
 * no layout thrash).
 */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6">
      <Annotation
        label="Objection Handling"
        className="absolute left-2 sm:left-10 -top-2"
        align="left"
      >
        Every FAQ pre-answers a doubt before you finish forming it. This is not transparency. It is pre-emption.
      </Annotation>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] tracking-widest uppercase text-red mb-3">Frequently Suppressed Questions</p>
          <h2 className="font-display text-3xl sm:text-4xl text-paper">BEFORE YOU DOUBT IT, READ THIS</h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-line rounded-lg overflow-hidden bg-ink-2/50">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
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
