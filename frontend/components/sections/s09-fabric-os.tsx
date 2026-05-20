"use client";

const layers = [
  ["04", "Agentes IA", "Conciliation Copilot · Anomaly Detector · CFO Assistant · Document Intelligence", <>v2.4 · Operativo<br /><strong>4 agentes activos</strong></>],
  ["03", "Frameworks", "Metodologías aplicadas en cada proyecto · Gobierno · Control de cambios · Riesgos", <>Aplicado en 100%<br /><strong>Stack 2026</strong></>],
  ["02", "FSOs · Fabric Solution Objects", "Soluciones paquetizadas reutilizables · Documentadas · Validadas · Vendibles en Oracle Marketplace", <>6 catalogados<br /><strong>Catálogo abierto</strong></>],
  ["01", "Doctrina", "Cinco compromisos contractuales · La base operativa de cada engagement", <>Cláusula contractual<br /><strong>Vigente desde 2026</strong></>]
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
  return (
    <section id="s09" className="demo-section s09">
      <div className="demo-section-marker">S09 · FABRIC OS</div>
      <div className="container">
        <div className="s09-intro">
          <div className="label">FABRIC OS</div>
          <h2>El sistema operativo de <em>cada proyecto.</em></h2>
          <p>Cuatro capas integradas. IP institucionalizada. Cada proyecto opera sobre la misma arquitectura — la entrega no depende del consultor.</p>
        </div>

        <div className="os-architecture">
          {layers.map(([num, name, desc, meta]) => (
            <div className="os-layer" key={num}>
              <div className="os-layer-num">{num}</div>
              <div className="os-layer-body">
                <div className="os-layer-name">{name}</div>
                <div className="os-layer-desc">{desc}</div>
              </div>
              <div className="os-layer-meta">{meta}</div>
            </div>
          ))}
        </div>

        <div className="fso-section">
          <div className="fso-section-header">
            <div>
              <div className="label" style={{ marginBottom: 12 }}>Catálogo FSO · En construcción 2026</div>
              <h3>Seis soluciones nombradas. <em>Cada una, validable.</em></h3>
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
