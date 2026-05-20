"use client";

interface Reference {
  num: string;
  desc: string;
  status: string;
}

export default function S12Referencias() {
  const references: Reference[] = [
    { num: "01", desc: "CFO de operadora de centros comerciales (MX)", status: "DISPONIBLE" },
    { num: "02", desc: "CTO de institucion financiera (USD 300M+)", status: "DISPONIBLE" },
    { num: "03", desc: "CFO Controller de fintech regulada de credito", status: "DISPONIBLE" },
    { num: "04", desc: "CISO / CTO de fintech de credito al consumo", status: "DISPONIBLE" },
    { num: "05", desc: "Director de Consultoria · Oracle ACS", status: "DISPONIBLE" }
  ];

  return (
    <section id="s12" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S12 · Referencias
      </span>

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Intro */}
        <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
          Referencias Disponibles
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-text-primary leading-tight max-w-2xl mx-auto">
          Habla directamente con <em className="font-serif italic text-accent">ejecutivos</em> que operan con FABRIC.
        </h2>
        <p className="text-text-secondary mt-6 text-base font-light max-w-2xl mx-auto leading-relaxed">
          La decisión de contratar Oracle Critical Engineering requiere validación directa. Prospectos calificados acceden a conversaciones con:
        </p>

        {/* References List */}
        <div className="mt-12 border border-border-sutil bg-bg-panel/40 divide-y divide-border-sutil text-left">
          {references.map((r, idx) => (
            <div
              key={idx}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between transition-colors duration-300 hover:bg-accent-soft px-6 md:px-8"
            >
              <div className="flex items-center gap-6 mb-3 sm:mb-0">
                <span className="font-mono text-xs text-accent">{r.num}</span>
                <span className="text-sm font-sans text-text-secondary font-light">
                  {r.desc}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 bg-accent-soft/20 px-2.5 py-0.5 inline-block self-start sm:self-auto">
                {r.status}
              </span>
            </div>
          ))}
        </div>

        {/* Footnote and CTA */}
        <div className="mt-12">
          <p className="text-text-tertiary text-xs font-mono tracking-wide mb-6">
            El acceso a referencias forma parte del proceso de evaluación post-admisión inicial.
          </p>
          <a
            href="#aplicar"
            className="inline-block border border-border-strong text-text-primary px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300 bg-transparent"
          >
            Iniciar evaluacion →
          </a>
        </div>
      </div>
    </section>
  );
}
