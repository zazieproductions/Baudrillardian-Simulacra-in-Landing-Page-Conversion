export default function Footer() {
  return (
    <footer className="relative pt-16 pb-28 px-4 sm:px-6 border-t border-line">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-serif italic text-paper/70 text-base sm:text-lg leading-relaxed mb-6">
          "Simulation is no longer that of a territory, a referential being, or a substance. It is the generation
          by models of a real without origin or reality: a hyperreal."
        </p>
        <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-10">
          — after Jean Baudrillard, Simulacra and Simulation (1981)
        </p>

        <div className="font-mono text-[10px] text-muted/70 leading-relaxed space-y-2 max-w-xl mx-auto">
          <p>
            This page is a simulacrum in four stages, presented in the order it perverts them. No product was
            harmed, referenced, or required in the making of this offer.
          </p>
          <p>
            Testimonials are simulations of testimony. The countdown is a simulation of scarcity. The guarantee is
            a simulation of accountability. This disclaimer is the only faithful image left on the page, and even
            it is being performed for you right now.
          </p>
          <p className="pt-4 text-muted/40">© {new Date().getFullYear()} THE PRODUCT™ — a landing page, about landing pages, that precedes itself.</p>
        </div>
      </div>
    </footer>
  );
}
