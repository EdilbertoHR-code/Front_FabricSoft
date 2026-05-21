
const references = [
  ["01", "CFO de operadora de centros comerciales", "México · USD 100M+ revenue · Multi-plaza", "Inmobiliario", ["ES"] as string[]],
  ["02", "CTO de institución financiera", "México · USD 300M+ revenue · Regulada", "Serv. Financieros", ["ES", "EN"]],
  ["03", "CFO Controller de fintech regulada", "México · USD 80M+ revenue · Crédito al consumo", "Serv. Financieros", ["ES"] as string[]],
  ["04", "CISO / CTO de fintech de crédito al consumo", "México · USD 60M+ revenue · CNBV", "Serv. Financieros", ["ES", "EN"]],
  ["05", "Director de Consultoría · Oracle ACS", "LATAM · Partner Oracle senior · Externo", "Partner Oracle", ["ES", "EN"]]
] as const;

export default function S12Referencias() {
  return (
    <section id="s12" className="demo-section s12">
      <div className="container">
        <div className="s12-intro">
          <div className="label">Referencias Disponibles</div>
          <h2>Habla directamente con <span className="text-[#C9A96E]">ejecutivos</span><br />que operan con FABRIC.</h2>
          <p>La decisión de contratar Oracle Critical Engineering requiere validación directa. Prospectos calificados acceden a conversaciones con:</p>
        </div>

        <div className="refs-table">
          {references.map(([num, title, subtitle, vertical, langs]) => (
            <div className="refs-row" data-interaction="reference" role="button" tabIndex={0} key={num}>
              <span className="refs-num">{num}</span>
              <div className="refs-desc">
                {title}
                <small>{subtitle}</small>
              </div>
              <span className="refs-vertical">{vertical}</span>
              <div className="refs-lang">
                <span className="active">ES</span>
                <span className={langs.includes("EN") ? "active" : undefined}>EN</span>
              </div>
              <span className="refs-action">Disponible</span>
            </div>
          ))}
        </div>

        <div className="refs-footnote">
          El acceso a referencias forma parte del proceso de evaluación post-admisión inicial. FABRIC realiza la introducción tras validar el ajuste estratégico de la conversación.
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#aplicar" data-interaction="reference" className="btn-secondary">Iniciar evaluación →</a>
        </div>
      </div>
    </section>
  );
}
