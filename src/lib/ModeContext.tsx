import { createContext, useContext, useState, type ReactNode } from "react";

export type Mode = "funnel" | "theory";

interface ModeCtx {
  mode: Mode;
  toggle: () => void;
}

const Ctx = createContext<ModeCtx>({ mode: "funnel", toggle: () => {} });

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("funnel");
  const toggle = () => setMode((m) => (m === "funnel" ? "theory" : "funnel"));
  return <Ctx.Provider value={{ mode, toggle }}>{children}</Ctx.Provider>;
}

export function useMode() {
  return useContext(Ctx);
}
