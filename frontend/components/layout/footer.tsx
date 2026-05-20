import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-panel border-t border-border-sutil py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-serif text-3xl tracking-wide text-text-primary">
            FABRIC
          </span>
          <p className="text-text-secondary text-sm mt-4 max-w-sm">
            Oracle Critical Engineering. Entregamos cuando tu primer ciclo crítico opera en producción. Ciudad de México, México.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Contenido</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="#doctrina" className="hover:text-text-primary transition-colors">Doctrina</Link></li>
            <li><Link href="#s07" className="hover:text-text-primary transition-colors">Casos</Link></li>
            <li><Link href="#s08" className="hover:text-text-primary transition-colors">Industrias</Link></li>
            <li><Link href="#s09" className="hover:text-text-primary transition-colors">FABRIC OS</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="#" className="hover:text-text-primary transition-colors">Terminos de Uso</Link></li>
            <li><Link href="#" className="hover:text-text-primary transition-colors">Privacidad</Link></li>
            <li><Link href="#" className="hover:text-text-primary transition-colors">Doctrina de no alineacion</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-border-sutil mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-tertiary font-mono">
        <span>© 2026 FABRIC SOFT MEXICO SA DE CV. Todos los derechos reservados.</span>
        <span className="mt-4 md:mt-0">Oracle Cloud, entregado en produccion.</span>
      </div>
    </footer>
  );
}
