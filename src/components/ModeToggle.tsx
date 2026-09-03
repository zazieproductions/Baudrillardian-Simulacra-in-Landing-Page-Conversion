import { useMode } from "../lib/mode";

/**
 * The physical lever between the two registers of the piece.
 *
 * Left = Simulation (the funnel; the page sells). Right = Critique (the
 * theory; the page reads itself). The toggle is a literal switch because
 * the whole interface re-renders and re-colors around it, and flipping it
 * should feel like flipping a mode on an instrument, not clicking a link.
 */
export default function ModeToggle() {
  const { mode, toggle } = useMode();
  const isTheory = mode === "theory";

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-ink/90 backdrop-blur border border-line rounded-full pl-4 pr-1.5 py-1.5 shadow-lg">
      <span
        className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${
          !isTheory ? "text-yellow" : "text-muted"
        }`}
      >
        Simulation
      </span>
      <button
        onClick={toggle}
        aria-label="Toggle between simulation and critique mode"
        aria-pressed={isTheory}
        className="relative w-12 h-6 rounded-full border border-line bg-ink-2 flex items-center px-0.5 transition-colors"
      >
        <span
          className={`absolute w-5 h-5 rounded-full transition-transform duration-300 ${
            isTheory ? "translate-x-6 bg-critique" : "translate-x-0 bg-yellow"
          }`}
        />
      </button>
      <span
        className={`font-mono text-[10px] tracking-widest uppercase transition-colors pr-1 ${
          isTheory ? "text-critique" : "text-muted"
        }`}
      >
        Critique
      </span>
    </div>
  );
}
