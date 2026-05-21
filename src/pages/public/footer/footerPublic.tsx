import { Link } from 'react-router-dom';

// Data estructurada
const footerLinks = {
  sobre: [
    { label: 'Doctrina', path: '/#doctrina' },
    { label: 'Doctrine Generator', path: '/#fabric-ai', isFuture: true },
    { label: 'FABRIC OS', path: '/#s09' },
    { label: 'Industrias', path: '/#s08' },
    { label: 'Transparencia', path: '/#s13' },
  ],
  casos: [
    { label: 'APE Plazas', path: '/casos/ape-plazas' },
    { label: 'Aplazo', path: '/casos/aplazo' },
    { label: 'Investigación', path: '/#s14', isFuture: true },
    { label: 'Benchmark Index', path: '/#s14', isFuture: true },
    { label: 'Referencias', path: '/#s12' },
  ],
  herramientas: [
    { label: 'Diagnóstico de Proyecto', path: '/#diagnostico' },
    { label: 'ERP TCO Comparator', path: '/#tco' },
    { label: 'Cloud Cost Comparator', path: '/#cloud-tco', isFuture: true },
    { label: 'Migration Roadmap', path: '/#s10', isFuture: true },
    { label: 'Readiness Score', path: '/#fabric-ai', isFuture: true },
    { label: 'RFP Template', path: '/#doctrina', isFuture: true },
  ],
  engagement: [
    { label: 'Aplicar / Wait List', path: '/#diagnostico' },
    { label: 'Office Hours', path: '/#s11' },
    { label: 'Post-Mortem Privado', path: '/#s14', isFuture: true },
    { label: 'Confidential Roundtable', path: '/#s12', isFuture: true },
    { label: 'Criterios', path: '/#criterios' },
    { label: 'Modelos de compromiso', path: '/#s10' },
  ],
};

// Íconos SVG Minimalistas
const SocialIcons = {
  LinkedIn: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  ),
  Twitter: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 3.974H5.078z" />
    </svg>
  ),
  GitHub: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fabric-footer bg-[#050505] text-[#F5F5F5]/90 border-t border-[#2A2A2A] pt-24 pb-12 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-24">

          {/* COLUMNA IZQUIERDA (Marca y Contacto) */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col">
            <h2 className="text-[#F5F5F5] font-serif text-5xl tracking-wide mb-4 transition-colors duration-300 hover:text-[#C9A96E]">
              FABRIC
            </h2>
            <p className="text-[#C9A96E] text-xs font-bold tracking-[0.2em] uppercase mb-10">
              Oracle Critical Engineering
            </p>

            <div className="space-y-3 font-mono text-sm mb-8 text-[#F5F5F5]/80">
              <p>Ciudad de México · México</p>
              <a href="mailto:contacto@fabricsoft.com.mx" className="block text-[#C9A96E] hover:text-[#C9A96E]/80 transition-colors duration-300">
                contacto@fabricsoft.com.mx
              </a>
              <a href="mailto:julio@fabricsoft.com.mx" className="block text-[#C9A96E] hover:text-[#C9A96E]/80 transition-colors duration-300">
                julio@fabricsoft.com.mx
              </a>
            </div>

            {/* REDES SOCIALES */}
            <div className="flex items-center gap-6 mb-10">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F5]/50 hover:text-[#C9A96E] transition-colors duration-300 hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <SocialIcons.LinkedIn />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F5]/50 hover:text-[#C9A96E] transition-colors duration-300 hover:scale-110">
                <span className="sr-only">Twitter / X</span>
                <SocialIcons.Twitter />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F5]/50 hover:text-[#C9A96E] transition-colors duration-300 hover:scale-110">
                <span className="sr-only">GitHub</span>
                <SocialIcons.GitHub />
              </a>
            </div>

            <div className="pt-6 border-t border-[#2A2A2A]">
              <p className="text-xs text-[#F5F5F5]/40 flex items-center gap-2">
                <span className="text-[#C9A96E]/60 animate-pulse">◆</span> Funcionalidad disponible Q3-Q4 2026
              </p>
            </div>
          </div>

          {/* COLUMNAS DE ENLACES */}
          {/* SOBRE FABRIC */}
          <div className="flex flex-col">
            <h3 className="text-[#C9A96E] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              Sobre Fabric
            </h3>
            <ul className="space-y-4">
              {footerLinks.sobre.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#F5F5F5]/60 hover:text-[#C9A96E] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[8px] text-[#C9A96E]/40 group-hover:text-[#C9A96E]">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CASOS */}
          <div className="flex flex-col">
            <h3 className="text-[#C9A96E] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              Casos
            </h3>
            <ul className="space-y-4">
              {footerLinks.casos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#F5F5F5]/60 hover:text-[#C9A96E] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[8px] text-[#C9A96E]/40 group-hover:text-[#C9A96E]">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HERRAMIENTAS */}
          <div className="flex flex-col">
            <h3 className="text-[#C9A96E] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              Herramientas
            </h3>
            <ul className="space-y-4">
              {footerLinks.herramientas.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#F5F5F5]/60 hover:text-[#C9A96E] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[8px] text-[#C9A96E]/40 group-hover:text-[#C9A96E]">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ENGAGEMENT */}
          <div className="flex flex-col">
            <h3 className="text-[#C9A96E] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              Engagement
            </h3>
            <ul className="space-y-4">
              {footerLinks.engagement.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#F5F5F5]/60 hover:text-[#C9A96E] transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[8px] text-[#C9A96E]/40 group-hover:text-[#C9A96E]">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[#F5F5F5]/40">
          <div className="flex gap-4">
            <button className="hover:text-[#F5F5F5] transition-colors duration-300">EN</button>
            <span className="text-[#C9A96E]/50">|</span>
            <button className="text-[#F5F5F5] font-bold">ES</button>
          </div>

          <p>© {currentYear} FABRIC SOFT MEXICO SA DE CV</p>
        </div>

      </div>
    </footer>
  );
}
