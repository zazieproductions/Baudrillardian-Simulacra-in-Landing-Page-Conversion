import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SIMULACRUM_ORDERS, orderIndexForProgress } from "../lib/simulacrum";

/**
 * A fixed progress dock along the bottom of the viewport.
 *
 * It does two things at once:
 * 1. It is a scroll-position progress bar (utilitarian).
 * 2. It maps that scroll position onto the four orders of the simulacrum,
 *    so scrolling literally walks the visitor through the Baudrillardian
 *    taxonomy the page is built from. The roman numeral is the stage; the
 *    name + quotation is its definition.
 *
 * This is the clearest single place where the conceptual thesis is exposed
 * through the interface rather than only in the copy.
 */
export default function SimulacraTracker() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      const pct =
        scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const idx = orderIndexForProgress(progress);
  const stage = SIMULACRUM_ORDERS[idx];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur border-t border-line">
      <div className="h-[3px] w-full bg-line relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow via-red to-critique"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3 sm:gap-5 overflow-hidden">
        <span className="font-mono text-critique text-xs sm:text-sm shrink-0">
          STAGE {stage.roman}/IV
        </span>
        <span className="font-display text-yellow text-xs sm:text-sm tracking-wide shrink-0 hidden sm:inline">
          {stage.name.toUpperCase()}
        </span>
        <span className="font-serif italic text-muted text-[11px] sm:text-xs truncate">
          {stage.desc}
        </span>
        <div className="hidden md:flex items-center gap-1 ml-auto shrink-0">
          {SIMULACRUM_ORDERS.map((s, i) => (
            <div
              key={s.roman}
              className={`w-6 h-1.5 rounded-full transition-colors ${
                i <= idx ? "bg-critique" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
