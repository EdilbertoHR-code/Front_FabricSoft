import { Link } from 'react-router-dom';

// Data estructurada
const footerLinks = {
  sobre: [
    { label: 'Doctrina', path: '/doctrina' },
    { label: 'Doctrine Generator', path: '/doctrine-generator', isFuture: true },
    { label: 'FABRIC OS', path: '/fabric-os' },
    { label: 'Industrias', path: '/industrias' },
    { label: 'Transparencia', path: '/transparencia' },
  ],
  casos: [
    { label: 'APE Plazas', path: '/casos/ape-plazas' },
    { label: 'Aplazo', path: '/casos/aplazo' },
    { label: 'Investigación', path: '/investigacion', isFuture: true },
    { label: 'Benchmark Index', path: '/benchmark', isFuture: true },
    { label: 'Referencias', path: '/referencias' },
  ],
  herramientas: [
    { label: 'Diagnóstico de Proyecto', path: '/diagnostico' },
    { label: 'ERP TCO Comparator', path: '/herramientas/erp-tco' },
    { label: 'Cloud Cost Comparator', path: '/herramientas/cloud-cost', isFuture: true },
    { label: 'Migration Roadmap', path: '/herramientas/roadmap', isFuture: true },
    { label: 'Readiness Score', path: '/herramientas/readiness', isFuture: true },
    { label: 'RFP Template', path: '/herramientas/rfp', isFuture: true },
  ],
  engagement: [
    { label: 'Aplicar / Wait List', path: '/aplicar' },
    { label: 'Office Hours', path: '/office-hours' },
    { label: 'Post-Mortem Privado', path: '/post-mortem', isFuture: true },
    { label: 'Confidential Roundtable', path: '/roundtable', isFuture: true },
    { label: 'Criterios', path: '/criterios' },
    { label: 'Modelos de compromiso', path: '/modelos' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fabric-footer bg-fabric-base text-fabric-text/90 border-t border-fabric-border pt-24 pb-12 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-24">
          
          {/* COLUMNA IZQUIERDA (Marca y Contacto) */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col">
            <h2 className="text-white font-sans text-5xl tracking-[0.14em] uppercase mb-4 transition-colors duration-300 hover:text-fabric-gold">
              FABRIC
            </h2>
            <p className="text-fabric-gold text-xs font-bold tracking-[0.2em] uppercase mb-10">
              Oracle Critical Engineering
            </p>

            <div className="space-y-3 font-mono text-sm mb-10 text-white/80">
              <p>Ciudad de México · México</p>
              <a href="mailto:contacto@fabricsoft.com.mx" className="block text-fabric-gold hover:text-fabric-gold/80 transition-colors duration-300">
                contacto@fabricsoft.com.mx
              </a>
              <a href="mailto:julio@fabricsoft.com.mx" className="block text-fabric-gold hover:text-fabric-gold/80 transition-colors duration-300">
                julio@fabricsoft.com.mx
              </a>
            </div>

            {/* MAPA A TODO COLOR */}
            <div className="fabric-map-frame w-full h-36 rounded-lg border border-fabric-gold/20 hover:border-fabric-gold/50 shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] transition-all duration-500 overflow-hidden mb-10">
              <iframe
                title="Sede FABRIC"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.535492476564!2d-99.1630132!3d19.3888361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff0c2b2a1a11%3A0x6b1b1b1b1b1b1b1b!2sEnrique%20R%C3%A9bsamen%20415%2C%20Narvarte%20Poniente%2C%20Benito%20Ju%C3%A1rez%2C%2003020%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'brightness(0.9) contrast(1.1)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="pt-6 border-t border-fabric-border/80">
              <p className="text-xs text-white/40 flex items-center gap-2">
                <span className="text-fabric-gold/60">◆</span> Funcionalidad disponible Q3-Q4 2026
              </p>
            </div>
          </div>

          {/* COLUMNAS DE ENLACES */}
          {/* SOBRE FABRIC */}
          <div className="flex flex-col">
            <h3 className="text-fabric-gold text-xs font-bold tracking-[0.15em] uppercase mb-8">
              Sobre Fabric
            </h3>
            <ul className="space-y-4">
              {footerLinks.sobre.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-fabric-gold transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[10px] text-fabric-gold/60">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CASOS */}
          <div className="flex flex-col">
            <h3 className="text-fabric-gold text-xs font-bold tracking-[0.15em] uppercase mb-8">
              Casos
            </h3>
            <ul className="space-y-4">
              {footerLinks.casos.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-fabric-gold transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[10px] text-fabric-gold/60">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HERRAMIENTAS */}
          <div className="flex flex-col">
            <h3 className="text-fabric-gold text-xs font-bold tracking-[0.15em] uppercase mb-8">
              Herramientas
            </h3>
            <ul className="space-y-4">
              {footerLinks.herramientas.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-fabric-gold transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[10px] text-fabric-gold/60">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ENGAGEMENT */}
          <div className="flex flex-col">
            <h3 className="text-fabric-gold text-xs font-bold tracking-[0.15em] uppercase mb-8">
              Engagement
            </h3>
            <ul className="space-y-4">
              {footerLinks.engagement.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-fabric-gold transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    {link.isFuture && (
                      <span className="text-[10px] text-fabric-gold/60">◆</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-8 border-t border-fabric-border/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/50">
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors duration-300">EN</button>
            <span className="text-fabric-gold">|</span>
            <button className="text-white font-bold">ES</button>
          </div>
          
          <p>© {currentYear} FABRIC SOFT MEXICO SA DE CV</p>
        </div>

      </div>
    </footer>
  );
}
