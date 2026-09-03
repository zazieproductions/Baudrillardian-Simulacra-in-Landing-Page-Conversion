import { useState, type ReactNode } from "react";
import { ModeContext, type Mode } from "../lib/mode";

/**
 * Owns the single simulation/critique mode value and exposes it through
 * {@link ModeContext}. Kept in its own file so the provider (a component) and
 * the hook/context (non-components) satisfy React Fast Refresh's
 * "only export components" rule.
 */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("funnel");
  const toggle = () => setMode((m) => (m === "funnel" ? "theory" : "funnel"));
  return <ModeContext.Provider value={{ mode, toggle }}>{children}</ModeContext.Provider>;
}
