import { ModeProvider } from "./components/ModeProvider";
import { useMode } from "./lib/mode";
import ModeToggle from "./components/ModeToggle";
import SimulacraTracker from "./components/SimulacraTracker";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Offer from "./components/Offer";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

/**
 * Sticky wordmark, top-left. Only its accent color depends on the current
 * mode so the branding stays constant while the register shifts.
 */
function TopBar() {
  const { mode } = useMode();
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      <span className="font-display text-lg sm:text-xl tracking-wide text-paper">
        THE <span className={mode === "theory" ? "text-critique" : "text-yellow"}>PRODUCT</span>
        <sup className="text-[9px]">™</sup>
      </span>
    </div>
  );
}

/**
 * The four-section page. In `theory` mode the root gains the scanline overlay
 * and images are desaturated/contrasted so the critical register is legible
 * at a glance even before the annotations fade in.
 */
function Page() {
  const { mode } = useMode();
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        mode === "theory" ? "scanline relative" : ""
      }`}
    >
      <div className="grain" />
      <TopBar />
      <ModeToggle />
      <main className={mode === "theory" ? "[&_img]:grayscale [&_img]:contrast-110" : ""}>
        <Hero />
        <Testimonials />
        <Offer />
        <Guarantee />
        <FAQ />
        <Footer />
      </main>
      <SimulacraTracker />
    </div>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <Page />
    </ModeProvider>
  );
}
