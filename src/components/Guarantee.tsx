import { ShieldCheck } from "lucide-react";
import Annotation from "./Annotation";

export default function Guarantee() {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-ink-2/40 border-y border-line">
      <Annotation label="On Guarantees" className="absolute right-2 sm:right-12 top-2" align="right">
        A refund promises to restore a prior state. But there was no prior state — only the page, and then more page.
      </Annotation>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-yellow/10 border border-yellow/30 flex items-center justify-center mb-6">
          <ShieldCheck className="text-yellow" size={30} />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-paper mb-4">
          THE 100% <span className="text-yellow">HYPERREAL</span> GUARANTEE
        </h2>
        <p className="font-serif italic text-muted text-lg leading-relaxed">
          If, within 30 days, this page fails to feel more true than the truth itself, we will refund your belief
          in full. Monetary refunds are also technically available, per applicable law, for a product whose
          applicable law has not yet been written.
        </p>
        <p className="font-mono text-[10px] text-muted mt-6 tracking-wide uppercase">
          no purchase is required for the guarantee to feel real. that's the whole guarantee.
        </p>
      </div>
    </section>
  );
}
