import { useState } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';

const layers: {
  num: string;
  name: string;
  tag: string;
  desc: string;
}[] = [
  {
    num: "04",
    name: "Agentes IA propios",
    tag: "Capacidad técnica diferencial propia.",
    desc: "Agentes de diagnóstico, lectura contractual y priorización técnica entrenados sobre doctrina FABRIC. No sustituyen al senior: aceleran la primera hipótesis y reducen ruido en la evaluación.",
  },
  {
    num: "03",
    name: "Frameworks aplicados",
    tag: "Metodologías propias aplicadas en proyecto.",
    desc: "Playbooks de rescate, estabilización y migración diseñados para operar con hitos contractuales, evidencia de avance y toma de decisiones ejecutiva.",
  },
  {
    num: "02",
    name: "FSOs paquetizados",
    tag: "Soluciones paquetizadas reutilizables.",
    desc: "Soluciones reutilizables para cierres contables, operación multi-entidad, controles fintech y migraciones legacy. Cada FSO reduce tiempo de diseño y riesgo de ejecución.",
  },
  {
    num: "01",
    name: "Doctrina de entrega",
    tag: "Cómo trabajamos. Contractualizable.",
    desc: "La entrega se mide en operación real: primer ciclo crítico, evidencia documental, ownership senior y transición formal. Go-live no es el final del proyecto.",
  },
] as const;

const fsos = [
  ["FSO-01", "Available", "available", "Rapid GL Close", "Cierre contable acelerado · 10-15 días → 3-5 días", "Validado · APE Plazas", "v1.2"],
  ["FSO-02", "Available", "available", "Multi-Entity Retail Ops", "Operación multi-plaza · Consolidación multi-entidad", "Validado · APE Plazas", "v1.0"],
  ["FSO-03", "Building", "building", "Fintech Controls Pack", "Compliance regulatorio · CNBV / CONDUSEF", "Aplicado · Aplazo", "v0.9 beta"],
  ["FSO-04", "Building", "building", "Legacy Migration Engine", "Migración SAP / EBS / JDE / PS · Zero-downtime", "En desarrollo", "v0.7 beta"],
  ["FSO-05", "Concept", "concept", "Logistics Multi-CD Ops", "Operación multi-CD multi-país · Trazabilidad fiscal", "Diseño · Q3 2026", "spec"],
  ["FSO-06", "Concept", "concept", "DR & Business Continuity", "Disaster Recovery · RPO/RTO contractuales", "Diseño · Q4 2026", "spec"]
] as const;

export default function S09FabricOS() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();
  const [openLayer, setOpenLayer] = useState<string | null>(null);

  return (
    <section ref={ref} id="s09" className={`demo-section s09 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="container">

        <div className="s09-intro">
          <div className="label">FABRIC OS</div>
          <h2>El sistema operativo de <span className="text-[#C9A96E]">cada proyecto.</span></h2>
          <p>Cuatro capas integradas. IP institucionalizada. Cada proyecto opera sobre la misma arquitectura — la entrega no depende del consultor.</p>
        </div>

        {/* Stack architecture */}
        <div className="os-stack-wrapper">
          <div className="os-stack">
            {layers.map((layer, index) => {
              const isOpen = openLayer === layer.num;
              const isBelow = openLayer !== null && layers.findIndex(l => l.num === openLayer) < index;
              return (
                <div
                  key={layer.num}
                  className={`os-stack-layer ${isOpen ? 'os-stack-layer--open' : ''} ${isBelow ? 'os-stack-layer--below' : ''}`}
                  onClick={() => setOpenLayer(isOpen ? null : layer.num)}
                  style={{ '--layer-index': index } as React.CSSProperties}
                >
                  {/* Left: number + accent bar */}
                  <div className="os-stack-num-col">
                    <span className="os-stack-num">{layer.num}</span>
                    <div className="os-stack-spine-dot" />
                  </div>

                  {/* Center: content */}
                  <div className="os-stack-content">
                    <div className="os-stack-header">
                      <div className="os-stack-name">{layer.name}</div>
                      <div className="os-stack-tag">{layer.tag}</div>
                    </div>
                    {isOpen && (
                      <div className="os-stack-detail">
                        {layer.desc}
                      </div>
                    )}
                  </div>

                  {/* Right: toggle */}
                  <div className="os-stack-toggle">
                    <span>{isOpen ? '▲ Cerrar' : '▼ Ver más'}</span>
                  </div>

                  {/* Depth shadow layers (decorative) */}
                  <div className="os-stack-depth-1" />
                  <div className="os-stack-depth-2" />
                </div>
              );
            })}
          </div>

        </div>

        {/* FSO Engine */}
        <div id="fso-engine" className="fso-section">
          <div className="fso-section-header">
            <div>
              <div className="label" style={{ marginBottom: 12 }}>FSO Engine · Soluciones paquetizadas</div>
              <h3>IP nombrada y reutilizable. <span className="text-[#C9A96E]">Cada FSO, validable.</span></h3>
            </div>
            <div className="fso-legend">
              <span className="status-badge available">Available</span>
              <span className="status-badge building">Building</span>
              <span className="status-badge concept">Concept</span>
            </div>
          </div>

          <div className="fso-grid">
            {fsos.map(([id, status, statusClass, name, desc, left, right]) => (
              <div className="fso-card" key={id}>
                <div className="fso-card-head">
                  <span className="fso-num">{id}</span>
                  <span className={`status-badge ${statusClass}`}>{status}</span>
                </div>
                <div className="fso-name">{name}</div>
                <div className="fso-desc">{desc}</div>
                <div className="fso-card-foot">
                  <span>{left}</span>
                  <span>{right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
