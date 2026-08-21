import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Maximize2 } from "lucide-react";
import Annotation from "./Annotation";

const TRANSCRIPT = [
  "...and by the time you finish watching this, you'll already believe it worked...",
  "...I'm not selling you a product. I'm selling you the feeling of having wanted one...",
  "...this presentation has never been watched live. It has also never not been live...",
  "...somewhere, a version of you already bought this. You're just catching up to her...",
  "...the results are real. The reality behind the results is optional...",
];

export default function Hero() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    const line = setInterval(() => {
      setLineIdx((i) => (i + 1) % TRANSCRIPT.length);
    }, 3200);
    return () => {
      clearInterval(id);
      clearInterval(line);
    };
  }, [playing]);

  // "Remaining" time is a fixed illusion that never resolves — it recalculates
  // toward a horizon that recedes exactly as fast as you approach it.
  const remaining = 17 * 60 + 42 - (elapsed % 90);
  const mm = Math.max(0, Math.floor(remaining / 60)).toString().padStart(2, "0");
  const ss = Math.max(0, remaining % 60).toString().padStart(2, "0");
  const emm = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const ess = (elapsed % 60).toString().padStart(2, "0");

  return (
    <section className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #f4c400 0%, transparent 60%)" }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <Annotation label="Order I — The Faithful Image" className="absolute -top-6 -left-4 sm:-left-16" align="left">
          A headline that still gestures at a referent. It claims to reflect something. This is the last honest sentence on the page.
        </Annotation>

        <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-yellow border border-yellow/40 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow pulse-glow" />
          847,213 people are "watching" right now
        </div>

        <h1 className="font-display leading-[0.95] text-[13vw] sm:text-6xl md:text-7xl tracking-tight text-paper">
          THE SECRET ISN'T
          <br />
          <span className="text-yellow">HIDDEN.</span>{" "}
          <span className="text-red">IT WAS NEVER THERE.</span>
        </h1>

        <p className="font-serif italic text-muted text-lg sm:text-xl mt-6 max-w-2xl mx-auto">
          How this exact landing page generated <span className="text-paper not-italic font-medium">$2,400,000</span> selling
          a product that does not, and has never needed to, exist — and how you can license the method for
          <span className="text-paper not-italic font-medium"> $97</span>.
        </p>

        <div className="relative mt-14 max-w-3xl mx-auto">
          <Annotation label="Order II — Perversion of Reality" className="absolute -right-6 sm:-right-56 top-10" align="right">
            A recorded video wearing the costume of a live event. The "remaining time" is not a countdown. It is choreography.
          </Annotation>

          <div className="relative rounded-lg overflow-hidden border border-line shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="relative aspect-video bg-ink-2">
              <img
                src="/images/hero-thumb.jpg"
                alt="The presentation"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  playing ? "scale-105 brightness-75" : "brightness-90"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
                >
                  <span className="w-20 h-20 rounded-full bg-red/90 group-hover:bg-red flex items-center justify-center shadow-[0_0_40px_rgba(255,45,45,0.5)] transition-transform group-hover:scale-110">
                    <Play fill="white" color="white" size={30} className="ml-1" />
                  </span>
                  <span className="font-mono text-[11px] tracking-widest uppercase text-paper/80">
                    Click to watch the presentation
                  </span>
                </button>
              ) : (
                <>
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-ink/70 rounded px-2 py-1 font-mono text-[10px] tracking-widest uppercase text-red">
                    <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" /> live simulation
                  </div>
                  <div className="absolute bottom-16 left-0 right-0 px-6">
                    <motion.p
                      key={lineIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="font-mono text-xs sm:text-sm text-paper/90 text-center"
                    >
                      {TRANSCRIPT[lineIdx]}
                    </motion.p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-ink-2 px-4 py-3 flex items-center gap-3">
              <button onClick={() => setPlaying((p) => !p)} className="text-paper/80 hover:text-yellow">
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full bg-yellow transition-all duration-1000"
                  style={{ width: playing ? `${((elapsed % 90) / 90) * 100}%` : "0%" }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted w-14 text-right">
                {emm}:{ess}
              </span>
              <span className="font-mono text-[10px] text-muted">/</span>
              <span className="font-mono text-[10px] text-red w-14">
                -{mm}:{ss}
              </span>
              <Volume2 size={15} className="text-paper/50" />
              <Maximize2 size={15} className="text-paper/50" />
            </div>
          </div>
          <p className="font-mono text-[10px] text-muted mt-3 tracking-wide">
            * remaining time recalculates itself so it never quite reaches zero. this is not a bug. this is the offer.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <a
            href="#offer"
            className="font-display text-lg sm:text-xl tracking-wide bg-yellow text-ink px-10 py-4 rounded-sm hover:bg-paper transition-colors shadow-[0_0_50px_rgba(244,196,0,0.35)]"
          >
            GIVE ME INSTANT ACCESS →
          </a>
          <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
            no product will be shipped. none is required.
          </span>
        </div>
      </div>
    </section>
  );
}
