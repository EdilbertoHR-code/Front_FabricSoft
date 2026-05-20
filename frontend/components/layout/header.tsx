import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-panel/80 backdrop-blur-md border-b border-border-sutil">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl tracking-wide text-text-primary hover:text-accent transition-colors duration-300">
          FABRIC
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#doctrina" className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300">
            Doctrina
          </Link>
          <Link href="#s07" className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300">
            Casos
          </Link>
          <Link href="#s08" className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300">
            Industrias
          </Link>
          <Link href="#s09" className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300">
            FABRIC OS
          </Link>
          <Link href="#diagnostico" className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300">
            Diagnostico
          </Link>
        </nav>

        {/* Action Button */}
        <div>
          <Link
            href="#aplicar"
            className="inline-block border border-accent text-accent px-6 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-bg-base transition-all duration-300"
          >
            Aplicar
          </Link>
        </div>
      </div>
    </header>
  );
}
