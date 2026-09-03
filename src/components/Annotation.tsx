import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMode } from "../lib/mode";

interface AnnotationProps {
  label: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
}

/**
 * The "theory" annotations that reveal the construction beneath each section.
 *
 * Rendered only in `theory` mode. They look like archival marginalia — a
 * paper tag with a hard offset shadow and a pitched baseline — rather than a
 * tooltip, so they read as an alternative register of the page rather than a
 * UI affordance.
 */
export default function Annotation({
  label,
  children,
  className = "",
  align = "right",
}: AnnotationProps) {
  const { mode } = useMode();
  return (
    <AnimatePresence>
      {mode === "theory" && (
        <motion.div
          initial={{ opacity: 0, y: 12, rotate: align === "right" ? 2 : -2 }}
          animate={{ opacity: 1, y: 0, rotate: align === "right" ? 1.5 : -1.5 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
          className={`theory-mark relative z-30 max-w-xs bg-[#f6f1e4] text-ink p-3 shadow-[6px_6px_0_rgba(0,0,0,0.4)] font-mono text-[11px] leading-snug ${className}`}
        >
          <div className="text-[10px] tracking-widest uppercase text-critique font-bold mb-1">
            ✎ {label}
          </div>
          <div className="text-ink/80 font-serif italic text-[13px] not-italic">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
