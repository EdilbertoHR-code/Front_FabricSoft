const days = [
  ["26", "muted"], ["27", "muted"], ["28", "muted"], ["29", "muted"], ["30", "muted"], ["31", "muted"], ["1", "active"],
  ["2", "active"], ["3", "active"], ["4", "active"], ["5", "active"], ["12", "slot", "3/4"], ["13", "muted"], ["14", "muted"],
  ["15", "active"], ["16", "active"], ["17", "active"], ["18", "active"], ["19", "slot full", "0/4"], ["20", "muted"], ["21", "muted"],
  ["22", "active"], ["23", "active"], ["24", "active"], ["25", "active"], ["26", "slot", "1/4"], ["27", "muted"], ["28", "muted"],
  ["29", "active"], ["30", "active today"], ["1", "muted"], ["2", "muted"], ["3", "slot", "4/4"], ["4", "muted"], ["5", "muted"]
] as const;

export default function S11OfficeHours() {
  return (
    <section id="s11" className="demo-section s11">
      <div className="demo-section-marker">S11 · Office Hours</div>
      <div className="container">
        <div className="office-hours">
          <div className="office-hours-text">
            <div className="label">FABRIC Office Hours</div>
            {/* Desktop heading */}
            <h2 className="s11-heading-desktop">Conversaciones directas con <em>el fundador.</em></h2>
            {/* Mobile heading */}
            <h2 className="s11-heading-mobile">Con <em>el fundador.</em></h2>

            {/* Desktop paragraph */}
            <p className="s11-para-desktop">Una vez al mes, Julio Álvarez recibe cuatro conversaciones de 30 minutos con CFO/CTO de empresas evaluando iniciativas Oracle.</p>
            {/* Mobile paragraph */}
            <p className="s11-para-mobile" style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>4 slots al mes. 30 min. CFO / CTO con iniciativa Oracle activa.</p>

            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
              Criterios de Acceso
            </div>
            <ul className="criteria-list">
              <li>Empresa USD 50M+ revenue anual</li>
              <li>Cargo CFO / CIO / CTO / Director Transformación</li>
              <li>Iniciativa Oracle activa o planeada</li>
              <li>Plazo de decisión menor a 12 meses</li>
            </ul>

            <div className="office-hours-prep">
              <strong>Preparación previa</strong>
              Llega con tu situación Oracle actual sintetizada: módulos en uso, problemática principal, plazo. Treinta minutos · honestidad absoluta.
            </div>

            <div className="s11-cta-desktop" style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#aplicar" data-interaction="office-hours" className="btn-primary">Reservar conversación →</a>
              <span className="nda-seal">Confidencial · NDA mutuo</span>
            </div>
          </div>

          <div className="calendar">
            <div className="calendar-head">
              <div className="calendar-month">Junio · 2026</div>
              <div className="calendar-nav">
                <span>←</span>
                <span>Hoy</span>
                <span>→</span>
              </div>
            </div>

            <div className="calendar-grid">
              {["L", "M", "X", "J", "V", "S", "D"].map((day) => <div className="cal-dow" key={day}>{day}</div>)}
              {days.map(([day, className, slots], index) => (
                <div
                  className={`cal-day ${className}`}
                  data-slots={slots}
                  data-interaction={className.includes("slot") && !className.includes("full") ? "office-hours" : undefined}
                  key={`${day}-${index}`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar-legend">
              <span><span className="legend-swatch available"></span>Slot disponible</span>
              <span><span className="legend-swatch full"></span>Lleno</span>
              <span><span className="legend-swatch today"></span>Hoy</span>
            </div>

            {/* Mobile CTA inside calendar */}
            <a
              href="#aplicar"
              data-interaction="office-hours"
              className="s11-cta-mobile btn-primary"
              style={{ display: "block", textAlign: "center", marginTop: 16 }}
            >
              Reservar conversación →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
