const current: [string, string][] = [
  ["Caso APE Plazas · métricas bajo NDA", "abr 2026"],
  ["Equipo 100% senior, 15+ años promedio", "auditado"],
  ["Certificaciones Oracle vigentes 100%", "vigente"],
  ["Plantilla 100% senior por contrato", "SOW"],
  ["Caso Aplazo · rescate documentado", "Q1 2026"]
];

const upcoming: [string, string][] = [
  ["NPS clientes activos", "Oct 2026"],
  ["Retención a 24 meses", "Nov 2026"],
  ["Tiempo medio respuesta crítica", "Q4 2026"],
  ["Cumplimiento Fixed-Price contractual", "Dic 2026"],
  ["Tasa proyectos en primer ciclo", "Anual"]
];

import { useInViewOnce } from '../../../hooks/useInViewOnce';

export default function S13Transparencia() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();
  return (
    <section ref={ref} id="s13" className={`demo-section s13 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="container">
        <div className="s13-intro">
          <div className="label">Transparencia Honesta</div>
          <h2>Lo que medimos hoy.<br />Lo que <span className="text-[#C9A96E]">publicaremos mañana.</span></h2>
        </div>

        <div className="transparency-grid">
          <div className="transparency-block">
            <div className="transparency-tag">Hoy · 2026</div>
            <div className="transparency-title">Lo que publicamos ahora</div>
            <ul className="transparency-list">
              {current.map(([text, meta]) => (
                <li key={text}>
                  <span>{text}</span>
                  <span className="meta verified">{meta}</span>
                </li>
              ))}
            </ul>
            <div className="methodology-note">
              <strong>Metodología</strong>
              Métricas verificables bajo NDA con auditor externo. Cifras consolidadas con CFO de cada cliente.
            </div>
          </div>

          <div className="transparency-block">
            <div className="transparency-tag">Q4 · 2026</div>
            <div className="transparency-title">Próximas publicaciones</div>
            <ul className="transparency-list">
              {upcoming.map(([text, meta]) => (
                <li key={text}>
                  <span>{text}</span>
                  <span className="meta">{meta}</span>
                </li>
              ))}
            </ul>
            <div className="methodology-note">
              <strong>Plazo de publicación</strong>
              Cada métrica se publica con metodología, periodo medido, método de cálculo y auditor que firma.
            </div>
          </div>

          <div className="transparency-block compromise">
            <div className="transparency-tag">Compromiso</div>
            <div className="transparency-title">Nuestra promesa</div>
            <p className="transparency-quote">
              Cuando publiquemos métricas, serán reales, verificables y auditadas. Hasta entonces, no inventamos números para verse bien.
            </p>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>— Doctrina FABRIC</div>
            <div className="methodology-note">
              <strong>Vinculación contractual</strong>
              Esta cláusula está en cada SOW que FABRIC firma. La transparencia es contractual, no editorial.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
