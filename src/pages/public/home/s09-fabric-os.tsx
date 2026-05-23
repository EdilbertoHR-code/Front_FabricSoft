import { useState } from 'react';

const layers: {
  num: string;
  name: string;
  desc: string;
  detail: React.ReactNode;
}[] = [
  {
    num: "04",
    name: "Agentes IA propios",
    desc: "Capacidad técnica diferencial propia.",
    detail: <span>Agentes de diagnóstico, lectura contractual y priorización técnica entrenados sobre doctrina FABRIC. No sustituyen al senior: aceleran la primera hipótesis y reducen ruido en la evaluación.</span>,
  },
  {
    num: "03",
    name: "Frameworks aplicados",
    desc: "Metodologías propias aplicadas en proyecto.",
    detail: <span>Playbooks de rescate, estabilización y migración diseñados para operar con hitos contractuales, evidencia de avance y toma de decisiones ejecutiva.</span>,
  },
  {
    num: "02",
    name: "FSOs paquetizados",
    desc: "Soluciones paquetizadas reutilizables.",
    detail: <span>Soluciones reutilizables para cierres contables, operación multi-entidad, controles fintech y migraciones legacy. Cada FSO reduce tiempo de diseño y riesgo de ejecución.</span>,
  },
  {
    num: "01",
    name: "Doctrina de entrega",
    desc: "Cómo trabajamos. Contractualizable.",
    detail: <span>La entrega se mide en operación real: primer ciclo crítico, evidencia documental, ownership senior y transición formal. Go-live no es el final del proyecto.</span>,
  },
];

const fsos = [
  ["FSO-01", "Available", "available", "Rapid GL Close", "Cierre contable acelerado · 10-15 días → 3-5 días", "Validado · APE Plazas", "v1.2"],
  ["FSO-02", "Available", "available", "Multi-Entity Retail Ops", "Operación multi-plaza · Consolidación multi-entidad", "Validado · APE Plazas", "v1.0"],
  ["FSO-03", "Building", "building", "Fintech Controls Pack", "Compliance regulatorio · CNBV / CONDUSEF", "Aplicado · Aplazo", "v0.9 beta"],
  ["FSO-04", "Building", "building", "Legacy Migration Engine", "Migración SAP / EBS / JDE / PS · Zero-downtime", "En desarrollo", "v0.7 beta"],
  ["FSO-05", "Concept", "concept", "Logistics Multi-CD Ops", "Operación multi-CD multi-país · Trazabilidad fiscal", "Diseño · Q3 2026", "spec"],
  ["FSO-06", "Concept", "concept", "DR & Business Continuity", "Disaster Recovery · RPO/RTO contractuales", "Diseño · Q4 2026", "spec"]
] as const;

import { useInViewOnce } from '../../../hooks/useInViewOnce';

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

        <div className="os-architecture">
          {layers.map((layer) => {
            const isOpen = openLayer === layer.num;
            return (
              <div
                className={`os-layer ${isOpen ? 'os-layer-open' : ''}`}
                key={layer.num}
                onClick={() => setOpenLayer(isOpen ? null : layer.num)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <div className="os-layer-num">{layer.num}</div>
                <div className="os-layer-body" style={{ flex: 1 }}>
                  <div className="os-layer-name">{layer.name}</div>
                  <div className="os-layer-desc">{layer.desc}</div>
                  {isOpen && (
                    <div style={{ marginTop: 14, borderTop: '1px solid var(--border)', paddingTop: 14, animation: 'fadeIn .22s ease', fontSize: 13, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                      {layer.detail}
                    </div>
                  )}
                </div>
                <div className="os-layer-meta">
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {isOpen ? '▲ Cerrar' : '▼ Ver más'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

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
