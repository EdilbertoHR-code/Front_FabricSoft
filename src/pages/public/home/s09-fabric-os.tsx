import { useState } from 'react';

const layers: {
  num: string;
  name: string;
  desc: string;
  meta: React.ReactNode;
  detail: string;
}[] = [
  {
    num: "04",
    name: "Agentes IA",
    desc: "Conciliation Copilot · Anomaly Detector · CFO Assistant · Document Intelligence",
    meta: <><span>v2.4 · Operativo</span><br /><strong>4 agentes activos</strong></>,
    detail: "Cuatro agentes propios en producción: Conciliation Copilot (conciliación bancaria con precisión 95%+), Anomaly Detector (detección de partidas anormales pre-cierre), CFO Assistant (consultas en lenguaje natural sobre data Fusion) y Document Intelligence (generación automatizada de notas contables). Cada agente opera dentro del tenant del cliente — los datos nunca salen de su nube.",
  },
  {
    num: "03",
    name: "Frameworks",
    desc: "Metodologías aplicadas en cada proyecto · Gobierno · Control de cambios · Riesgos",
    meta: <><span>Aplicado en 100%</span><br /><strong>Stack 2026</strong></>,
    detail: "Tres frameworks propios aplicados en cada engagement: FABRIC Governance Framework (gobierno de proyecto con comité semanal obligatorio), Zero-Trust Change Control (control de cambios con trazabilidad completa en OCI) y Risk Stabilization Matrix (identificación y mitigación de riesgos en fase STABILIZE). Documentados y transferidos al cliente al cierre.",
  },
  {
    num: "02",
    name: "FSOs · Fabric Solution Objects",
    desc: "Soluciones paquetizadas reutilizables · Documentadas · Validadas · Vendibles en Oracle Marketplace",
    meta: <><span>6 catalogados</span><br /><strong>Catálogo abierto</strong></>,
    detail: "FSO-01 Rapid GL Close (cierre contable 10-15 días → 3-5 días, validado APE Plazas), FSO-02 Multi-Entity Retail Ops (operación multi-plaza, validado APE Plazas), FSO-03 Fintech Controls Pack (compliance CNBV/CONDUSEF, aplicado Aplazo), FSO-04 Legacy Migration Engine (SAP/EBS/JDE/PS, en desarrollo), FSO-05 Logistics Multi-CD (diseño Q3 2026), FSO-06 DR & Business Continuity (diseño Q4 2026). Cada FSO es IP nombrada y contractualizable.",
  },
  {
    num: "01",
    name: "Doctrina",
    desc: "Cinco compromisos contractuales · La base operativa de cada engagement",
    meta: <><span>Cláusula contractual</span><br /><strong>Vigente desde 2026</strong></>,
    detail: "Cinco compromisos que van en cada SOW: (1) Entrega en primer ciclo crítico — no en go-live, (2) Solo seniors, cero juniors facturables — mínimo 8 años Oracle, (3) Fixed-Price por fase — si nos atrasamos por nuestra causa, no facturamos semanas adicionales, (4) Cero reportes manuales post go-live — se resuelve sin costo hasta eliminación, (5) Transición formal con documentación viva — acta firmada por todos los stakeholders. Validados con caso APE Plazas, abril 2026.",
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
                    <div
                      style={{
                        marginTop: 14,
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: 'var(--text-secondary)',
                        borderTop: '1px solid var(--border)',
                        paddingTop: 14,
                        animation: 'fadeIn .22s ease',
                      }}
                    >
                      {layer.detail}
                    </div>
                  )}
                </div>
                <div className="os-layer-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {isOpen ? '▲ Cerrar' : '▼ Ver más'}
                  </span>
                  {layer.meta}
                </div>
              </div>
            );
          })}
        </div>

        <div className="fso-section">
          <div className="fso-section-header">
            <div>
              <div className="label" style={{ marginBottom: 12 }}>Catálogo FSO · En construcción 2026</div>
              <h3>Seis soluciones nombradas. <span className="text-[#C9A96E]">Cada una, validable.</span></h3>
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

          <div style={{ textAlign: "center", marginTop: 64 }}>
            <a href="#aplicar" data-interaction="fabric-os" className="cta">Explorar FABRIC OS completo <span className="cta-arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
