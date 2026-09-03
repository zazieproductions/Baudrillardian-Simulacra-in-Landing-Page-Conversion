import { useEffect, useState } from "react";
import { Check, Lock, TrendingUp } from "lucide-react";
import Annotation from "./Annotation";
import { useMode } from "../lib/mode";
import {
  CLAIM_TICK_MS,
  DEADLINE_SECONDS,
  INITIAL_CLAIMANTS,
  OFFER_PRICE,
  OFFER_STACK,
  OFFER_TOTAL_VALUE,
} from "../content/offer";

/**
 * The offer. Order IV — Pure Simulacrum: it refers only to itself, "buy the
 * page that sold you the page."
 *
 * Three fabricated clocks run here, each a different flavor of manufactured
 * urgency:
 * - `secondsLeft`: the countdown. On reaching zero it resets to full (the
 *   scarcity is periodic, not finite).
 * - `claimed`: a slowly-incrementing "people have claimed theirs" counter.
 * - The "VERIFYING A PURCHASE" delay: a staged 1.6s processing state before
 *   "ACCESS GRANTED".
 */
export default function Offer() {
  const { mode } = useMode();
  const [secondsLeft, setSecondsLeft] = useState(DEADLINE_SECONDS);
  const [claimed, setClaimed] = useState(INITIAL_CLAIMANTS);
  const [step, setStep] = useState<"idle" | "processing" | "done">("idle");

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? DEADLINE_SECONDS : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setClaimed((c) => c + Math.floor(Math.random() * 3));
    }, CLAIM_TICK_MS);
    return () => clearInterval(t);
  }, []);

  const mm = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");

  const handleClaim = () => {
    setStep("processing");
    setTimeout(() => setStep("done"), 1600);
  };

  return (
    <section id="offer" className="relative py-24 px-4 sm:px-6">
      <Annotation
        label="Order IV — Pure Simulacrum"
        className="absolute left-2 sm:left-8 top-4"
        align="left"
      >
        The offer refers only to itself: buy the page that sold you the page. There is no outside to exit to.
      </Annotation>

      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="font-mono text-[11px] tracking-widest uppercase text-red mb-3">The Offer</p>
        <h2 className="font-display text-3xl sm:text-5xl text-paper leading-tight">
          WHAT YOU&apos;RE <span className="text-yellow">ACTUALLY</span> BUYING
        </h2>
        <p className="font-serif italic text-muted mt-4 text-lg">
          Lifetime access to this landing page. Yes — this one. The one you&apos;re reading right now.
          Own the machine that just sold it to you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div className="relative">
          <img
            src="/images/product-box.png"
            alt="The Product"
            className="w-full rounded-lg border border-line"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 rounded-b-lg">
            <p className="font-mono text-[10px] tracking-widest uppercase text-paper/70 text-center">
              contents: this page, recursively
            </p>
          </div>
        </div>

        <div className="bg-ink-2 border border-line rounded-lg p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-red">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" /> offer expires in
            </span>
            <span className="text-yellow tracking-widest text-base">
              {mm}:{ss}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {OFFER_STACK.map((item) => (
              <div key={item.name} className="flex items-start justify-between gap-4 text-sm">
                <span className="flex items-start gap-2 text-paper/90">
                  <Check size={15} className="text-yellow mt-0.5 shrink-0" />
                  {item.name}
                </span>
                <span className="font-mono text-muted shrink-0">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-4 flex items-center justify-between mb-1">
            <span className="font-mono text-xs text-muted uppercase tracking-wide">Total Value</span>
            <span className="font-mono text-muted paper-crossout">${OFFER_TOTAL_VALUE.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-lg text-paper">Today Only</span>
            <span className="font-display text-3xl text-yellow">${OFFER_PRICE}</span>
          </div>

          {step !== "done" ? (
            <button
              onClick={handleClaim}
              disabled={step === "processing"}
              className="w-full font-display text-lg tracking-wide bg-red text-paper py-4 rounded-sm hover:bg-critique transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {step === "processing" ? (
                "VERIFYING A PURCHASE THAT NEEDS NO VERIFICATION…"
              ) : (
                <>
                  <Lock size={16} /> CLAIM MY COPY OF THIS PAGE
                </>
              )}
            </button>
          ) : (
            <div className="border border-yellow/40 rounded-md p-4 text-center">
              <p className="font-display text-yellow mb-1">ACCESS GRANTED</p>
              <p className="font-serif italic text-sm text-paper/80">
                Congratulations. You now own this page. It will now try to sell itself to someone else — using you
                as the testimonial.
              </p>
            </div>
          )}

          <p className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-muted mt-4">
            <TrendingUp size={12} />
            {claimed.toLocaleString()} people have &quot;claimed&quot; theirs
            {mode === "theory" ? " (this number has never once gone down)" : " — join them"}
          </p>
        </div>
      </div>
    </section>
  );
}
