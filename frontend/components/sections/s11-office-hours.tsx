"use client";

interface DateSlot {
  date: string;
  slots: string;
  isFull: boolean;
}

export default function S11OfficeHours() {
  const dates: DateSlot[] = [
    { date: "Junio 12, 2026", slots: "4 slots disponibles", isFull: false },
    { date: "Julio 10, 2026", slots: "4 slots disponibles", isFull: false },
    { date: "Agosto 14, 2026", slots: "4 slots disponibles", isFull: false },
    { date: "Mayo 15, 2026", slots: "Lleno", isFull: true }
  ];

  return (
    <section id="s11" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S11 · Office Hours
      </span>

      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-border-sutil bg-bg-panel p-8 md:p-16 relative">
          {/* Subtle outline box */}
          <div className="absolute inset-2 border border-dashed border-border-sutil pointer-events-none"></div>

          {/* Header */}
          <div className="max-w-3xl mb-12 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
              FABRIC Office Hours
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-text-primary leading-tight">
              Conversaciones directas con <em className="font-serif italic text-accent">el fundador.</em>
            </h2>
            <p className="text-text-secondary mt-6 text-base leading-relaxed font-light">
              Una vez al mes, Julio Alvarez recibe cuatro conversaciones de 30 minutos con CFO/CTO de empresas evaluando iniciativas Oracle.
            </p>
          </div>

          {/* Split Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 border-t border-border-sutil pt-10">
            {/* Criteria */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                Criterios de Acceso
              </h3>
              <ul className="space-y-4">
                {[
                  "Empresa USD 50M+ revenue anual",
                  "Cargo CFO / CIO / CTO / Director Transformacion",
                  "Iniciativa Oracle activa o planeada",
                  "Plazo de decision menor a 12 meses"
                ].map((crit, idx) => (
                  <li key={idx} className="flex items-start text-sm text-text-secondary font-light">
                    <span className="text-accent mr-3 font-mono font-medium">—</span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dates */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                Proximas Fechas
              </h3>
              <div className="divide-y divide-border-sutil/50">
                {dates.map((d, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center py-3.5 font-mono text-xs ${
                      d.isFull ? "text-text-tertiary" : "text-text-secondary"
                    }`}
                  >
                    <span>{d.date}</span>
                    <span
                      className={`px-2.5 py-0.5 border rounded-none ${
                        d.isFull
                          ? "border-border-strong text-text-tertiary bg-bg-panel/20 line-through"
                          : "border-accent/30 text-accent bg-accent-soft"
                      }`}
                    >
                      {d.slots}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-12 relative z-10">
            <a
              href="#aplicar"
              className="inline-block border border-accent bg-accent text-bg-base px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-transparent hover:text-accent transition-all duration-300"
            >
              Reservar conversacion →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
