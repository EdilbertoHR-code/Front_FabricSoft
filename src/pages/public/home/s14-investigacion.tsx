
const papers = [
  {
    num: "Paper 01",
    tag: "Research Note · Mercado",
    title: "Por qué fallan los go-live de Oracle Fusion",
    abstract: "Análisis de 47 implementaciones LATAM. Tres patrones recurrentes de fracaso, causas raíz documentadas, modelo alternativo de entrega.",
    toc: ["El patrón \"abandono post go-live\"", "Los tres síntomas iniciales", "Modelo de entrega FABRIC"],
    meta: [["8-10 pp", "Páginas"], ["PDF · ES", "Formato"], ["15 min", "Lectura"], ["May 2026", "Publicado"]]
  },
  {
    num: "Paper 02",
    tag: "Technical Framework · IA",
    title: "IA aplicada a cierre contable en Fusion Cloud",
    abstract: "Framework FABRIC con cuatro capas operativas. Casos de aplicación por industria. Arquitectura técnica reutilizable.",
    toc: ["Anatomía del cierre contable", "Capa de agentes IA aplicables", "Casos APE Plazas + Aplazo"],
    meta: [["10-12 pp", "Páginas"], ["PDF · ES", "Formato"], ["20 min", "Lectura"], ["May 2026", "Publicado"]]
  },
  {
    num: "Paper 03",
    tag: "Doctrina Operativa · SOW",
    title: "Modelo de entrega en primer ciclo crítico",
    abstract: "La doctrina contractual de FABRIC, en cláusulas modelo. Aplicación práctica para CFO / CIO evaluando un RFP Oracle.",
    toc: ["Las 5 cláusulas doctrinales", "Cómo redactarlas en RFP", "Validación legal y contractual"],
    meta: [["6-8 pp", "Páginas"], ["PDF · ES", "Formato"], ["12 min", "Lectura"], ["May 2026", "Publicado"]]
  }
];

export default function S14Investigacion() {
  return (
    <section id="s14" className="demo-section s14">
      <div className="demo-section-marker">S14 · Investigación FABRIC</div>
      <div className="container">
        <div className="s14-intro">
          <div className="label">Investigación</div>
          <h2>Lo que aprendemos en producción.<br /><em>Lo publicamos.</em></h2>
          <p>Papers técnicos descargables. Acceso requiere registro corporativo — no formulario marketing.</p>
        </div>

        <div className="research-grid">
          {papers.map((paper) => (
            <div className="research-card" data-interaction="paper" role="button" tabIndex={0} key={paper.num}>
              <div className="research-num">{paper.num}</div>
              <div className="research-tag">{paper.tag}</div>
              <h4 className="research-title">{paper.title}</h4>
              <div className="research-abstract">{paper.abstract}</div>
              <ul className="research-toc">
                {paper.toc.map((item, index) => <li data-n={`0${index + 1}`} key={item}>{item}</li>)}
              </ul>
              <div className="research-meta">
                {paper.meta.map(([value, label]) => (
                  <div key={`${paper.num}-${label}`}><strong>{value}</strong>{label}</div>
                ))}
              </div>
              <div className="research-cta">Descargar paper</div>
            </div>
          ))}
        </div>

        <div className="research-banner">
          <div>
            <div className="label">FABRIC Benchmark Index · Anual</div>
            <h3>El Estado de las Implementaciones Oracle Fusion en <em>México y LATAM 2026</em></h3>
            <p>Reporte anual. Tasa de fracaso real del mercado, razones más comunes, best practices para CFO/CTO en RFP de Oracle. Lanzamiento Q4 2026: registro abierto para early access.</p>
          </div>
          <a href="#aplicar" data-interaction="paper" className="btn-secondary">Reservar lugar →</a>
        </div>
      </div>
    </section>
  );
}
