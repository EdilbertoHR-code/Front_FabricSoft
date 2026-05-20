"use client";

interface Paper {
  tag: string;
  title: string;
  desc: string;
  meta: string;
}

export default function S14Investigacion() {
  const papers: Paper[] = [
    {
      tag: "Paper 01 · Research Note",
      title: "Por que fallan los go-live de Oracle Fusion",
      desc: "Análisis de 47 implementaciones en LATAM. Patrones de fracaso, causas raíz, modelo alternativo.",
      meta: "Disponible · 8-10 paginas · PDF"
    },
    {
      tag: "Paper 02 · Technical Framework",
      title: "IA aplicada a cierre contable en Fusion Cloud",
      desc: "Framework FABRIC con casos de aplicación. Capa por capa. Arquitectura técnica.",
      meta: "Disponible · 10-12 paginas · PDF"
    },
    {
      tag: "Paper 03 · Doctrina Operativa",
      title: "Modelo de entrega en primer ciclo critico",
      desc: "La doctrina contractual de FABRIC. Cláusulas modelo, ejecución práctica.",
      meta: "Disponible · 6-8 paginas · PDF"
    }
  ];

  return (
    <section id="s14" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S14 · Investigacion
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            Investigacion
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            Lo que aprendemos en produccion.<br />
            <em className="font-serif italic text-accent">Lo publicamos.</em>
          </h2>
          <p className="text-text-secondary mt-4 font-light text-sm max-w-md mx-auto">
            Papers técnicos descargables. Acceso requiere registro corporativo.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {papers.map((p, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 bg-bg-panel border border-border-sutil flex flex-col justify-between min-h-[300px] hover:border-accent transition-all duration-300 group"
            >
              <div>
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-3">
                  {p.tag}
                </span>
                <h3 className="font-serif text-xl font-normal text-text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed font-light mb-6">
                  {p.desc}
                </p>
              </div>
              <div className="border-t border-border-sutil/50 pt-4 flex justify-between items-center font-mono text-[10px]">
                <span className="text-text-tertiary">{p.meta}</span>
                <a href="#aplicar" className="text-accent group-hover:underline">Descargar →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Benchmark Box */}
        <div className="border border-accent bg-bg-panel p-8 md:p-10 max-w-5xl mx-auto relative">
          {/* Dash outline */}
          <div className="absolute inset-1.5 border border-dashed border-accent/20 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-2">
                FABRIC Benchmark Index · Anual
              </span>
              <h3 className="font-serif text-2xl font-normal text-text-primary mb-3">
                El Estado de las Implementaciones Oracle Fusion en Mexico y LATAM 2026
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed font-light">
                Reporte anual. Tasa de fracaso real del mercado, razones más comunes, best practices para CFO/CTO en RFP de Oracle.
              </p>
            </div>
            <div className="lg:text-right">
              <button
                disabled
                className="inline-block border border-border-strong text-text-tertiary px-6 py-3 font-mono text-xs uppercase tracking-widest bg-bg-base cursor-not-allowed"
              >
                Proximamente Q4 2026
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
