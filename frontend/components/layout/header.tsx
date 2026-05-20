"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "#s07", label: "Casos" },
  { href: "#s08", label: "Industrias" },
  { href: "#s09", label: "FABRIC OS" },
  { href: "#criterios", label: "Criterios" },
  { href: "#diagnostico", label: "Diagnostico", interaction: "rescue" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-panel/90 backdrop-blur-md border-b border-border-sutil">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wide text-text-primary hover:text-accent transition-colors duration-300">
          FABRIC
        </Link>

        <nav className="hidden lg:flex items-center" style={{ gap: 32 }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-interaction={item.interaction}
              className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#aplicar"
            data-interaction="waitlist"
            className="hidden sm:inline-block border border-accent text-accent px-6 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-bg-base transition-all duration-300"
          >
            Aplicar
          </Link>
          <button
            type="button"
            className="lg:hidden w-10 h-10 border border-border-strong text-text-primary font-mono text-xs uppercase tracking-widest"
            aria-expanded={open}
            aria-label="Abrir navegacion"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? "x" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border-sutil bg-bg-base">
          <nav className="px-6 py-6 grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-interaction={item.interaction}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border-sutil py-4 font-mono text-xs uppercase tracking-widest text-text-secondary"
              >
                {item.label}
                <span className="text-accent">-&gt;</span>
              </Link>
            ))}
            <Link
              href="#aplicar"
              data-interaction="waitlist"
              onClick={() => setOpen(false)}
              className="mt-5 text-center border border-accent bg-accent text-bg-base px-6 py-3 font-mono text-xs uppercase tracking-widest"
            >
              Aplicar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
