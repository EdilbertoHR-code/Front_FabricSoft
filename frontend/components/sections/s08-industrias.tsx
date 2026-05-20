"use client";

interface Industry {
  num: string;
  monogram: string;
  name: string;
  desc: string;
  pillars: string[];
  clientRange: string;
}

export default function S08Industrias() {
  const industries: Industry[] = [
    {
      num: "01 / Industria",
      monogram: "S",
      name: "Servicios Financieros y Fintech",
      desc: "Bancos, fintech y crédito al consumo. Compliance, continuidad operativa y cierre contable regulatorio.",
      pillars: [
        "Compliance CNBV / CONDUSEF / Banxico",
        "Cierre contable diario regulatorio",
        "Reportes regulatorios automatizados",
        "Continuidad operativa · RPO/RTO contractuales"
      ],
      clientRange: "USD 100M – 500M+"
    },
    {
      num: "02 / Industria",
      monogram: "I",
      name: "Inmobiliario y Centros Comerciales",
      desc: "Operadores multi-plaza, multi-entidad. Revenue management, gestión de espacios y conciliación de rentas variables.",
      pillars: [
        "Multi-entidad · Multi-plaza consolidada",
        "Revenue management y rentas variables",
        "Conciliación de tenant billing",
        "Reportería ejecutiva por plaza / portafolio"
      ],
      clientRange: "USD 50M – 300M"
    },
    {
      num: "03 / Industria",
      monogram: "L",
      name: "Logistica y Distribucion",
      desc: "Multi-CD, multi-país, multi-modal. Supply chain, trazabilidad fiscal y conciliación de transportes.",
      pillars: [
        "Multi-CD · Multi-pais · Multi-modal",
        "Trazabilidad fiscal SAT / CFDI 4.0",
        "Conciliacion de transportes y fletes",
        "Supply chain integrado a Fusion SCM"
      ],
      clientRange: "USD 80M – 400M"
    }
  ];

  return (
    <section id="s08" className="py-24 border-b border-border-sutil relative bg-bg-base">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S08 · Industrias
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            Industrias Focales
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            Tres verticales donde el ERP es <em className="font-serif italic text-accent">columna vertebral</em> de la operación crítica.
          </h2>
        </div>

        {/* Grid (Horizontal on desktop, stacked on mobile - with clean borders, no spacing between cards style) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-border-sutil divide-y lg:divide-y-0 lg:divide-x divide-border-sutil">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 flex flex-col justify-between min-h-[500px] transition-colors duration-300 hover:bg-accent-soft"
            >
              <div>
                {/* Monogram Plate */}
                <div className="w-14 h-14 border border-accent/40 flex items-center justify-center font-serif text-3xl italic text-accent mb-8 relative">
                  {/* Subtle inner dashed border */}
                  <div className="absolute inset-0.5 border border-dashed border-accent/20"></div>
                  {ind.monogram}
                </div>

                <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest block mb-2">
                  {ind.num}
                </span>
                
                <h3 className="font-serif text-2xl font-normal text-text-primary mb-4 leading-snug">
                  {ind.name}
                </h3>
                
                <p className="text-text-secondary text-sm mb-8 leading-relaxed font-light">
                  {ind.desc}
                </p>

                {/* Pillars */}
                <ul className="space-y-3 mb-8">
                  {ind.pillars.map((pil, pIdx) => (
                    <li key={pIdx} className="font-mono text-[11px] text-text-secondary flex items-start">
                      <span className="text-accent mr-2">—</span>
                      <span>{pil}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-border-sutil/50 pt-4 flex justify-between items-center font-mono text-[10px]">
                <span className="text-text-tertiary uppercase tracking-wider">Cliente tipico</span>
                <span className="text-accent font-serif italic text-sm">{ind.clientRange}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
