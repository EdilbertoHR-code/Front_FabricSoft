"use client";

export default function S13Transparencia() {
  const currentMetrics = [
    "Caso APE Plazas: métricas verificables bajo NDA",
    "Equipo: 100% senior, 15+ años promedio",
    "Certificaciones Oracle vigentes: 100%",
    "Plantilla 100% senior por contrato",
    "Caso Aplazo: rescate documentado Q1 2026"
  ];

  const upcomingMetrics = [
    "NPS clientes activos (metodología auditada)",
    "Retención a 24 meses (cohort tracking)",
    "Tiempo medio de respuesta crítica",
    "Cumplimiento Fixed-Price contractual",
    "Tasa de proyectos en primer ciclo"
  ];

  return (
    <section id="s13" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S13 · Transparencia
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            Transparencia Honesta
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            Lo que medimos hoy.<br />
            <em className="font-serif italic text-accent">Lo que publicaremos mañana.</em>
          </h2>
        </div>

        {/* Grid Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-border-sutil divide-y lg:divide-y-0 lg:divide-x divide-border-sutil">
          
          {/* Block 1: Hoy */}
          <div className="p-8 md:p-10 bg-bg-panel/40 flex flex-col justify-between min-h-[350px]">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">
                Hoy
              </span>
              <h3 className="font-serif text-xl font-normal text-text-primary mb-6 border-b border-border-sutil/50 pb-2">
                Lo que publicamos ahora
              </h3>
              <ul className="space-y-4">
                {currentMetrics.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs font-mono text-text-secondary leading-relaxed">
                    <span className="text-accent mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Block 2: Q4 2026 */}
          <div className="p-8 md:p-10 bg-bg-panel/40 flex flex-col justify-between min-h-[350px]">
            <div>
              <span className="font-mono text-[10px] text-accent-2 uppercase tracking-widest block mb-1">
                Q4 2026
              </span>
              <h3 className="font-serif text-xl font-normal text-text-primary mb-6 border-b border-border-sutil/50 pb-2">
                Proximas publicaciones
              </h3>
              <ul className="space-y-4">
                {upcomingMetrics.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs font-mono text-text-secondary leading-relaxed">
                    <span className="text-accent-2 mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Block 3: Promise */}
          <div className="p-8 md:p-10 bg-bg-panel flex flex-col justify-between min-h-[350px]">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">
                Compromiso
              </span>
              <h3 className="font-serif text-xl font-normal text-text-primary mb-6 border-b border-border-sutil/50 pb-2">
                Nuestra promesa
              </h3>
              <div className="relative mt-4">
                <span className="font-serif text-5xl text-accent/20 absolute -top-4 -left-1 font-bold leading-none select-none">
                  “
                </span>
                <p className="font-serif italic text-text-secondary text-sm leading-relaxed pl-6">
                  Cuando publiquemos métricas, serán reales, verificables y auditadas. Hasta entonces, no inventamos números para verse bien.
                </p>
              </div>
            </div>
            <div className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest text-right mt-6">
              — Doctrina FABRIC
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
