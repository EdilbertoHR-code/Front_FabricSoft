"use client";

interface OSLayer {
  num: string;
  name: string;
  desc: string;
}

interface FSOItem {
  id: string;
  name: string;
  desc: string;
}

export default function S09FabricOS() {
  const layers: OSLayer[] = [
    {
      num: "04",
      name: "Agentes IA",
      desc: "Conciliation Copilot · Anomaly Detector · CFO Assistant · Document Intelligence"
    },
    {
      num: "03",
      name: "Frameworks",
      desc: "Metodologías aplicadas en cada proyecto. Gobierno, control de cambios, riesgos."
    },
    {
      num: "02",
      name: "FSOs · Fabric Solution Objects",
      desc: "Soluciones paquetizadas reutilizables. Documentadas. Validadas. Vendibles en Oracle Marketplace."
    },
    {
      num: "01",
      name: "Doctrina",
      desc: "Cinco compromisos contractuales. La base operativa."
    }
  ];

  const fsoCatalog: FSOItem[] = [
    {
      id: "FSO-01",
      name: "Rapid GL Close",
      desc: "Cierre contable acelerado · 10-15 dias → 3-5 dias"
    },
    {
      id: "FSO-02",
      name: "Multi-Entity Retail Ops",
      desc: "Operacion multi-plaza · Validado en APE Plazas"
    },
    {
      id: "FSO-03",
      name: "Fintech Controls Pack",
      desc: "Compliance regulatorio · CNBV / CONDUSEF"
    },
    {
      id: "FSO-04",
      name: "Legacy Migration Engine",
      desc: "Migracion SAP/EBS/JDE/PS · Zero-downtime"
    },
    {
      id: "FSO-05",
      name: "Logistics Multi-CD Ops",
      desc: "Operacion multi-CD multi-pais · Trazabilidad fiscal"
    },
    {
      id: "FSO-06",
      name: "DR & Business Continuity",
      desc: "Disaster Recovery · RPO/RTO contractuales"
    }
  ];

  return (
    <section id="s09" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S09 · FABRIC OS
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            FABRIC OS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            El sistema operativo de <em className="font-serif italic text-accent">cada proyecto.</em>
          </h2>
          <p className="text-text-secondary mt-6 text-base max-w-xl mx-auto font-light">
            Cuatro capas integradas. IP institucionalizada. Cada proyecto opera sobre la misma arquitectura.
          </p>
        </div>

        {/* Layers Stack */}
        <div className="max-w-4xl mx-auto mb-20 border border-border-sutil divide-y divide-border-sutil">
          {layers.map((l, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300 hover:bg-accent-soft group"
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <span className="font-mono text-xl text-accent/60 group-hover:text-accent font-medium">
                  {l.num}
                </span>
                <span className="font-serif text-xl md:text-2xl text-text-primary">
                  {l.name}
                </span>
              </div>
              <p className="font-mono text-xs text-text-secondary md:max-w-lg leading-relaxed md:text-right">
                {l.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FSO Catalog Grid */}
        <div className="border border-border-sutil p-8 md:p-12 bg-bg-panel">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-8 border-b border-border-sutil pb-4">
            Catalogo FSO · En construccion 2026
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fsoCatalog.map((fso, idx) => (
              <div
                key={idx}
                className="p-6 border border-border-sutil bg-bg-base transition-all duration-300 hover:border-accent"
              >
                <span className="font-mono text-[10px] text-accent-2 uppercase tracking-widest block mb-2">
                  {fso.id}
                </span>
                <h4 className="font-serif text-lg text-text-primary mb-2 font-normal">
                  {fso.name}
                </h4>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed">
                  {fso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTA */}
        <div className="text-center mt-12">
          <a
            href="#aplicar"
            className="group font-mono text-[11px] uppercase tracking-widest text-accent hover:text-text-primary transition-colors inline-flex items-center"
          >
            Explorar FABRIC OS
            <span className="ml-1.5 transform transition-transform group-hover:translate-x-1 duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
