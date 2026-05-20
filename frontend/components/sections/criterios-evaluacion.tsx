const admissions = [
  ["Empresa con revenue USD 50M+ anuales", "Umbral mínimo · Verificado en SOW", "Mandatory"],
  ["Industria: Servicios Financieros, Inmobiliario o Logística", "Verticales con FSOs aplicables", "Mandatory"],
  ["Patrocinio ejecutivo CFO + CTO confirmado", "Patrocinio dual no negociable", "Mandatory"],
  ["Plazo realista (mínimo 4 meses)", "Doctrina requiere primer ciclo crítico operado", "Mandatory"],
  ["Disponibilidad de equipo interno del cliente", "Mínimo 1 PM + 2 SMEs full-time durante Deploy", "Preferred"],
  ["Presupuesto alineado con alcance real", "FABRIC publica rangos antes de SOW", "Preferred"]
] as const;

const rejections = [
  ["Plazos imposibles de cumplir con calidad", "Ej. go-live + cierre en menos de 16 semanas", "Hard"],
  ["Sin patrocinio C-level confirmado", "Sin CFO o CTO firmando · No procede", "Hard"],
  ["Alcance no estabilizable en primer ciclo crítico", "Doctrina contractual no es viable", "Hard"],
  ["Industrias fuera de especialización", "Manufactura discreta, retail B2C, healthcare", "Hard"],
  ["Presupuesto desalineado del alcance real", "No renegociamos · No comprometemos calidad", "Hard"]
] as const;

export default function CriteriosEvaluacion() {
  return (
    <section id="criterios" className="demo-section" style={{ background: "var(--bg-panel)" }}>
      <div className="demo-section-marker">Criterios de Evaluación</div>
      <div className="container">
        <div style={{ maxWidth: 820 }}>
          <div className="label">Criterios de Evaluación</div>
          <h2 style={{ fontWeight: 300 }}><em>No somos para todos.</em></h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 17, lineHeight: 1.7, marginTop: 24 }}>
            FABRIC opera con criterios claros de admisión. Aceptamos proyectos donde podemos cumplir nuestra doctrina contractual. Rechazamos los demás.
          </p>
        </div>

        <div className="criterios-grid">
          <div className="criterios-block admit">
            <div className="criterios-head">
              <h3>Criterios de Admisión</h3>
              <div className="criterios-count">06<small>Criterios</small></div>
            </div>
            <ul className="criterios-list">
              {admissions.map(([title, subtitle, weight]) => (
                <li key={title}>
                  <span className="crit-mark check">✓</span>
                  <div className="crit-text">
                    {title}
                    <small>{subtitle}</small>
                  </div>
                  <span className={`crit-weight ${weight === "Mandatory" ? "mandatory" : "preferred"}`}>{weight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="criterios-block reject">
            <div className="criterios-head">
              <h3>Razones de Rechazo</h3>
              <div className="criterios-count" style={{ color: "var(--danger)" }}>05<small>Disqualifiers</small></div>
            </div>
            <ul className="criterios-list">
              {rejections.map(([title, subtitle, weight]) => (
                <li key={title}>
                  <span className="crit-mark x">×</span>
                  <div className="crit-text">
                    {title}
                    <small>{subtitle}</small>
                  </div>
                  <span className="crit-weight disqualifying">{weight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="acceptance-banner">
          <div className="acceptance-stat">
            <div className="num">02</div>
            <div className="lbl">Proyectos aceptados · 2026</div>
          </div>
          <div className="acceptance-divider"></div>
          <div className="acceptance-stat">
            <div className="num">47</div>
            <div className="lbl">Solicitudes evaluadas</div>
          </div>
          <div className="acceptance-divider"></div>
          <div className="acceptance-quote">"Nuestra selectividad protege la calidad operativa para los clientes que sí aceptamos."</div>
        </div>
      </div>
    </section>
  );
}
