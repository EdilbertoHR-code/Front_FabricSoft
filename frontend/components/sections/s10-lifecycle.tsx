"use client";

interface Step {
  num: string;
  name: string;
  desc: string;
  highlighted?: boolean;
}

export default function S10Lifecycle() {
  const steps: Step[] = [
    {
      num: "01",
      name: "Diagnose",
      desc: "Análisis ejecutivo de situación actual sin asumir nada."
    },
    {
      num: "02",
      name: "Architect",
      desc: "Diseño técnico completo de tu Fusion en producción."
    },
    {
      num: "03",
      name: "Deploy",
      desc: "Implementación con seguridad de nivel bancario."
    },
    {
      num: "04",
      name: "Stabilize",
      desc: "Acompañamiento directo hasta que tu primer ciclo crítico opera estable en producción.",
      highlighted: true
    },
    {
      num: "05",
      name: "Optimize",
      desc: "Mejora continua con agentes de IA aplicada al proceso."
    }
  ];

  return (
    <section id="s10" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S10 · Lifecycle
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            Como Entregamos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            De diagnostico a<br />
            <em className="font-serif italic text-accent">primer ciclo critico operado.</em>
          </h2>
          <p className="text-text-secondary mt-4 font-light text-sm max-w-md mx-auto">
            Cinco fases organizadas bajo rigor de ingenieria. El hito de cierre no es el go-live, es tu estabilidad.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {/* Subtle connecting line in desktop background */}
          <div className="hidden md:block absolute top-[44px] left-10 right-10 h-[1px] bg-border-sutil z-0"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative z-10 p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 ${
                step.highlighted
                  ? "bg-bg-panel border-2 border-accent shadow-[0_0_20px_rgba(201,169,110,0.1)] -translate-y-2"
                  : "bg-bg-panel/40 border border-border-sutil hover:border-text-secondary"
              }`}
            >
              {/* Highlight Label */}
              {step.highlighted && (
                <span className="absolute -top-3 left-4 bg-accent text-bg-base text-[9px] font-mono uppercase tracking-widest px-2 py-0.5">
                  Promesa Central
                </span>
              )}

              <div>
                {/* Number Badge */}
                <div
                  className={`w-10 h-10 flex items-center justify-center font-mono text-sm border mb-6 ${
                    step.highlighted
                      ? "border-accent text-accent bg-bg-base"
                      : "border-border-strong text-text-secondary bg-bg-panel"
                  }`}
                >
                  {step.num}
                </div>

                <h3 className="font-serif text-xl font-normal text-text-primary mb-2">
                  {step.name}
                </h3>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed font-light mt-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
