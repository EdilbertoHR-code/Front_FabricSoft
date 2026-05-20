"use client";

import Image from "next/image";

interface CalendarRow {
  quarter: string;
  status: "CERRADO" | "ABIERTO" | "PROXIMO";
  desc: string;
  detail: string;
}

export default function S15Founder() {
  const calendar: CalendarRow[] = [
    {
      quarter: "Q1 2026",
      status: "CERRADO",
      desc: "3 proyectos aceptados",
      detail: "Completo"
    },
    {
      quarter: "Q2 2026",
      status: "CERRADO",
      desc: "2 proyectos aceptados",
      detail: "Completo"
    },
    {
      quarter: "Q3 2026",
      status: "ABIERTO",
      desc: "Evaluando aplicaciones",
      detail: "Plazo: 30 julio"
    },
    {
      quarter: "Q4 2026",
      status: "PROXIMO",
      desc: "Aplicaciones desde 01 sept",
      detail: "Proximo"
    }
  ];

  return (
    <section id="s15" className="py-24 border-b border-border-sutil bg-bg-base relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S15 · Fundador
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Founder Bio Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center mb-24 border border-border-sutil p-8 bg-bg-panel/40">
          <div className="relative w-full aspect-[3/4] max-w-[320px] mx-auto border border-border-strong overflow-hidden bg-bg-base">
            <Image
              src="/julio_alvarez.png"
              alt="Julio Alvarez Portrait"
              fill
              style={{ objectFit: "cover" }}
              className="grayscale contrast-115 transition-all duration-500 hover:scale-105"
              sizes="(max-w-768px) 100vw, 320px"
              priority
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-1">
                Fundador
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-text-primary font-normal">
                Julio Alvarez
              </h2>
              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider block mt-1">
                Founder · FABRIC
              </span>
            </div>

            <p className="text-text-secondary text-base font-light leading-relaxed">
              20+ años en arquitectura Oracle, ERP empresarial y transformación de operaciones críticas. Liderando la firma de Oracle Critical Engineering en México con expansión hacia USA.
            </p>

            <div className="border-t border-border-sutil pt-4 font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
              Equipo senior bajo NDA hasta el primer engagement.
            </div>
          </div>
        </div>

        {/* Wait List Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent block">
              Wait List
            </span>
            <h3 className="font-serif text-3xl font-light text-text-primary leading-tight">
              FABRIC opera con un máximo de <em className="font-serif italic text-accent">12 proyectos simultaneos.</em>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed font-light">
              Para garantizar entrega en primer ciclo crítico, mantenemos disciplina de capacidad. La selectividad protege la calidad operativa.
            </p>

            {/* Waitlist Stats */}
            <div className="grid grid-cols-3 gap-4 border border-border-sutil divide-x divide-border-sutil bg-bg-panel/20 p-6 text-center">
              <div>
                <div className="font-serif text-3xl font-normal text-text-primary">9</div>
                <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest mt-1">Proyectos activos</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-normal text-accent pt-1">Q3 2026</div>
                <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest mt-1">Proxima ventana</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-normal text-text-primary">7</div>
                <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest mt-1">En lista de espera</div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#aplicar"
                className="inline-block border border-accent bg-accent text-bg-base px-8 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-transparent hover:text-accent transition-all duration-300"
              >
                Solicitar lugar en lista →
              </a>
            </div>
          </div>

          {/* Admission Calendar */}
          <div className="border border-border-sutil bg-bg-panel p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-6 border-b border-border-sutil pb-3">
                Ciclo de Admision 2026
              </h4>
              <div className="divide-y divide-border-sutil/50">
                {calendar.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 py-4 items-center font-mono text-xs text-text-secondary"
                  >
                    <span className="font-medium text-text-primary">{row.quarter}</span>
                    <span
                      className={`text-[9px] font-bold tracking-widest ${
                        row.status === "ABIERTO"
                          ? "text-accent"
                          : row.status === "PROXIMO"
                          ? "text-accent-2"
                          : "text-text-tertiary line-through"
                      }`}
                    >
                      {row.status}
                    </span>
                    <span className="col-span-2 text-right text-[11px] text-text-tertiary">
                      {row.desc} <span className="text-accent font-serif italic ml-1">{row.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Founder Line Direct Access */}
        <div className="border border-accent-2 bg-bg-panel/40 p-8 md:p-12 text-center relative">
          <div className="absolute inset-1 border border-dashed border-accent-2/20 pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-2 block">
              Founder Line · Acceso Directo
            </span>
            <p className="font-serif text-xl md:text-2xl font-light text-text-primary leading-relaxed">
              Si tu organización considera una iniciativa Oracle mayor a USD 1M, <em className="font-serif italic text-accent">Julio Alvarez recibe estas conversaciones directamente.</em>
            </p>
            <div className="py-2">
              <a
                href="mailto:julio@fabricsoft.com.mx"
                className="font-mono text-xl md:text-3xl text-accent hover:text-text-primary transition-colors select-all border-b border-accent/30 pb-1"
              >
                julio@fabricsoft.com.mx
              </a>
            </div>
            <p className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
              Respuesta personal en menos de 24 horas hábiles
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
