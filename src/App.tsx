import { ModeProvider, useMode } from "./lib/ModeContext";
import ModeToggle from "./components/ModeToggle";
import SimulacraTracker from "./components/SimulacraTracker";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Offer from "./components/Offer";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

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

function Page() {
  const { mode } = useMode();
  return (
    <div className={`min-h-screen transition-colors duration-500 ${mode === "theory" ? "scanline relative" : ""}`}>
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
