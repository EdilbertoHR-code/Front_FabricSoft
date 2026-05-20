"use client";

import { useState } from "react";

interface MetricRow {
  label: string;
  value: string;
  subValue?: string;
  badge?: string;
  highlighted?: boolean;
}

interface CaseData {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  status: string;
  statusType: "production" | "stabilized";
  metrics: MetricRow[];
  quote: string;
  author: string;
}

export default function S07Casos() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const cases: CaseData[] = [
    {
      id: "ape-plazas",
      tag: "Caso Ancla · Abril 2026",
      title: "APE Plazas",
      subtitle: "Implementacion Oracle Fusion Cloud · Operadora de centros comerciales · MX",
      status: "En Produccion",
      statusType: "production",
      metrics: [
        { label: "Go-live planeado", value: "06 abril 2026", subValue: "Documentado" },
        { label: "Go-live ejecutado", value: "06 abril 2026", subValue: "+0 dias" },
        { label: "Primer cierre contable", value: "Abril 2026", subValue: "Sin incidencias" },
        { label: "Incidencias criticas post-GL", value: "0", subValue: "Auditado", highlighted: true },
        { label: "Transicion a soporte", value: "En firma", subValue: "Acta vigente" }
      ],
      quote: "El cierre contable de abril se ejecutó sin incidencias con acompañamiento FABRIC. Ese es el momento en el que consideramos el proyecto entregado.",
      author: "Director de Finanzas · APE Plazas · abr 2026"
    },
    {
      id: "aplazo",
      tag: "Caso Ancla · Q1 2026",
      title: "Aplazo",
      subtitle: "Rescate Oracle Fusion · Fintech regulada · Credito al consumo · MX",
      status: "Estabilizado",
      statusType: "stabilized",
      metrics: [
        { label: "Estado inicial", value: "Critico", subValue: "Pre-FABRIC", highlighted: true },
        { label: "Reportes manuales eliminados", value: "5", subValue: "12 a 7" },
        { label: "Tiempo de cierre", value: "6d", subValue: "−66% (antes 18d)", highlighted: true },
        { label: "Adopcion de usuarios", value: "95%", subValue: "42 a 95" },
        { label: "Compliance regulatorio", value: "Operativo", subValue: "CNBV" }
      ],
      quote: "FABRIC tomó una implementación abandonada y la convirtió en plataforma operativa estable en 10 semanas. Sin renegociaciones.",
      author: "CFO Controller · Aplazo · feb 2026"
    }
  ];

  return (
    <section id="s07" className="py-24 border-b border-border-sutil relative">
      <span className="absolute top-6 right-8 font-mono text-[10px] text-accent/40 tracking-widest uppercase">
        S07 · Casos
      </span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3">
            Casos Seleccionados · 2026
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
            Rescates documentados, <em className="font-serif italic text-accent">verificables bajo NDA.</em>
          </h2>
          <p className="text-text-secondary mt-6 text-lg max-w-2xl font-light">
            Dos implementaciones Oracle Fusion que llegaron a FABRIC en estado crítico. Hoy operan en producción.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 font-mono text-[11px] text-text-tertiary">
            <span>Ultima actualizacion · 19.05.2026</span>
            <span>Idioma · ES / EN</span>
            <span>Editorial · Sanity</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((c) => (
            <div
              key={c.id}
              className="bg-bg-panel border border-border-sutil border-t-2 border-t-accent p-8 md:p-10 relative transition-all duration-300 hover:border-accent hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* NDA Badge */}
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-accent-2 text-text-primary text-[10px] font-mono uppercase tracking-wider px-3 py-1 rotate-[-1deg] border border-accent/30 shadow-md">
                Verificable bajo NDA
              </div>

              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">
                      {c.tag}
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-text-primary">
                      {c.title}
                    </h3>
                    <p className="text-text-secondary text-xs font-mono mt-2 leading-relaxed max-w-sm">
                      {c.subtitle}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border rounded-none ${
                      c.statusType === "production"
                        ? "border-accent/40 text-accent bg-accent-soft"
                        : "border-accent-2/40 text-accent-2 bg-accent-soft"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                {/* Metrics Table */}
                <div className="border-t border-border-sutil pt-4 mb-8">
                  <div className="grid grid-cols-3 font-mono text-[10px] text-text-tertiary uppercase tracking-wider pb-2 border-b border-border-sutil/50">
                    <span>Metrica</span>
                    <span className="text-right">Valor</span>
                    <span className="text-right">Detalle</span>
                  </div>
                  <div className="divide-y divide-border-sutil/30">
                    {c.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 items-center py-3 font-mono text-xs text-text-secondary hover:bg-accent-soft/30 transition-colors px-1"
                      >
                        <span className="text-text-secondary">{m.label}</span>
                        <span
                          className={`text-right font-medium ${
                            m.highlighted
                              ? m.value === "Critico"
                                ? "text-danger"
                                : "text-accent font-serif italic text-sm"
                              : "text-text-primary"
                          }`}
                        >
                          {m.value}{" "}
                          <span
                            className="text-accent cursor-help inline-block ml-1"
                            onMouseEnter={() => setActiveTooltip(`${c.id}-${idx}`)}
                            onMouseLeave={() => setActiveTooltip(null)}
                          >
                            ✓
                            {activeTooltip === `${c.id}-${idx}` && (
                              <span className="absolute z-10 bg-bg-elevated border border-border-strong text-text-secondary text-[9px] normal-case tracking-normal p-2 w-32 shadow-xl mt-4 right-4 text-center">
                                Documentado bajo NDA
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="text-right text-[11px] text-text-tertiary">
                          {m.subValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="border-t border-border-sutil pt-6 mb-8 relative">
                  <span className="font-serif text-5xl text-accent/20 absolute -top-1 left-0 font-bold leading-none select-none">
                    “
                  </span>
                  <p className="font-serif italic text-text-secondary text-base leading-relaxed pl-6">
                    {c.quote}
                  </p>
                  <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mt-4 pl-6">
                    {c.author}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border-sutil pt-6 flex items-center justify-between">
                <div className="flex gap-6">
                  <a
                    href="#aplicar"
                    className="group font-mono text-[11px] uppercase tracking-widest text-accent hover:text-text-primary transition-colors flex items-center"
                  >
                    Leer caso completo
                    <span className="ml-1.5 transform transition-transform group-hover:translate-x-1 duration-300">
                      →
                    </span>
                  </a>
                  <a
                    href="#aplicar"
                    className="group font-mono text-[11px] uppercase tracking-widest text-accent hover:text-text-primary transition-colors flex items-center"
                  >
                    Proof of Work
                    <span className="ml-1.5 transform transition-transform group-hover:translate-x-1 duration-300">
                      →
                    </span>
                  </a>
                </div>
                <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest">
                  NDA · Auditado
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
