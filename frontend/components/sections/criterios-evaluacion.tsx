"use client";

export default function CriteriosEvaluacion() {
  const admissions = [
    "Empresa con revenue USD 50M+ anuales",
    "Industria: SerFin, Inmobiliario o Logistica",
    "Patrocinio ejecutivo CFO + CTO",
    "Plazo realista (minimo 4 meses)",
    "Disponibilidad de equipo interno del cliente",
    "Presupuesto alineado con alcance real"
  ];

  const rejections = [
    "Plazos imposibles de cumplir con calidad",
    "Sin patrocinio C-level confirmado",
    "Alcance no estabilizable en primer ciclo",
    "Industrias fuera de especializacion",
    "Presupuesto desalineado del alcance real"
  ];

  return (
    <section id="criterios" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        Criterios de Evaluacion
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            Criterios de Evaluacion
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            No somos <em className="font-serif italic text-accent">para todos.</em>
          </h2>
          <p className="text-text-secondary mt-6 text-base font-light leading-relaxed max-w-2xl">
            FABRIC opera con criterios claros de admisión. Aceptamos proyectos donde podemos cumplir nuestra doctrina contractual. Rechazamos los demás.
          </p>
        </div>

        {/* Grid Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admissions */}
          <div className="border border-border-sutil bg-bg-panel p-8 md:p-10 relative">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-6 border-b border-border-sutil/50 pb-3">
              Criterios de Admision
            </h3>
            <ul className="space-y-4">
              {admissions.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-text-secondary font-light">
                  <span className="text-accent mr-3 font-mono font-medium">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rejections */}
          <div className="border border-border-sutil bg-bg-panel p-8 md:p-10 relative">
            <h3 className="font-mono text-xs uppercase tracking-wider text-danger mb-6 border-b border-border-sutil/50 pb-3">
              Razones de Rechazo
            </h3>
            <ul className="space-y-4">
              {rejections.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-text-secondary font-light">
                  <span className="text-danger mr-3 font-mono font-medium">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-16 max-w-xl mx-auto">
          <p className="font-serif italic text-text-secondary text-base leading-relaxed">
            "Nuestra selectividad protege la calidad operativa para los clientes que sí aceptamos."
          </p>
        </div>
      </div>
    </section>
  );
}
