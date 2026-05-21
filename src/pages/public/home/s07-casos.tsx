
import { Link } from 'react-router-dom';
import { useInViewOnce } from '../../../hooks/useInViewOnce';

interface MetricRow {
  label: string;
  value: string;
  detail: string;
  highlight?: boolean;
}

interface CaseData {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  status: string;
  metrics: MetricRow[];
  quote: string;
  author: string;
  href: string;
}

const cases: CaseData[] = [
  {
    id: "ape-plazas",
    tag: "Caso Ancla · Abril 2026",
    title: "APE Plazas",
    subtitle: "Implementación Oracle Fusion Cloud · Operadora de centros comerciales · MX",
    status: "En Producción",
    href: "/casos/ape-plazas",
    metrics: [
      { label: "Go-live planeado", value: "06 abril 2026", detail: "Documentado" },
      { label: "Go-live ejecutado", value: "06 abril 2026", detail: "+0 días" },
      { label: "Primer cierre contable", value: "Abril 2026", detail: "Sin incidencias", highlight: true },
      { label: "Incidencias críticas post-GL", value: "0", detail: "Auditado", highlight: true },
      { label: "Transición a soporte", value: "En firma", detail: "Acta vigente" }
    ],
    quote:
      "El cierre contable de abril se ejecutó sin incidencias con acompañamiento FABRIC. Ese es el momento en el que consideramos el proyecto entregado.",
    author: "Director de Finanzas · APE Plazas · abr 2026"
  },
  {
    id: "aplazo",
    tag: "Caso Ancla · Q1 2026",
    title: "Aplazo",
    subtitle: "Rescate Oracle Fusion · Fintech regulada · Crédito al consumo · MX",
    status: "Estabilizado",
    href: "/casos/aplazo",
    metrics: [
      { label: "Estado inicial", value: "Crítico", detail: "Pre-FABRIC", highlight: true },
      { label: "Reportes manuales eliminados", value: "5", detail: "12 a 7" },
      { label: "Tiempo de cierre", value: "6d", detail: "-66% (antes 18d)", highlight: true },
      { label: "Adopción de usuarios", value: "95%", detail: "42 a 95" },
      { label: "Compliance regulatorio", value: "Operativo", detail: "CNBV" }
    ],
    quote:
      "FABRIC tomó una implementación abandonada y la convirtió en plataforma operativa estable en 10 semanas. Sin renegociaciones.",
    author: "CFO Controller · Aplazo · feb 2026"
  }
];

export default function S07Casos() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();
  return (
    <section ref={ref} id="s07" className={`demo-section s07 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="container">
        <div className="s07-intro">
          <div className="label">Casos Seleccionados · 2026</div>
          <h2>
            Rescates documentados, <span className="text-[#C9A96E]">verificables bajo NDA.</span>
          </h2>
          <p>
            Dos implementaciones Oracle Fusion que llegaron a FABRIC en estado crítico.
            Hoy operan en producción.
          </p>
          <div className="s07-meta">
            <span>Última actualización · 19.05.2026</span>
            <span>Idioma · ES / EN</span>
            <span>Editorial · Sanity</span>
          </div>
        </div>

        <div className="casos-grid">
          {cases.map((item) => (
            <article className="caso-card" key={item.id}>
              <div className="nda-stamp">Verificable bajo NDA</div>
              <div className="caso-head">
                <div>
                  <div className="caso-tag">{item.tag}</div>
                  <h3 className="caso-title">{item.title}</h3>
                  <div className="caso-subtitle">{item.subtitle}</div>
                </div>
                <span className="status-badge available">{item.status}</span>
              </div>

              <div className="caso-metrics">
                {item.metrics.map((metric) => (
                  <div className="caso-metric" key={metric.label}>
                    <span className="caso-metric-label">{metric.label}</span>
                    <span className="caso-metric-val">
                      {metric.highlight ? <span className="text-[#C9A96E]">{metric.value}</span> : metric.value}
                      <span className="check">✓</span>
                    </span>
                    <span className="caso-metric-label">{metric.detail}</span>
                  </div>
                ))}
              </div>

              <blockquote className="caso-quote">
                {item.quote}
                <span className="caso-quote-attr">{item.author}</span>
              </blockquote>

              <div className="caso-footer">
                <div className="caso-ctas">
                  <Link to={item.href} className="cta">
                    Leer caso completo <span className="cta-arrow">→</span>
                  </Link>
                  <button type="button" className="cta" data-interaction="proof">
                    Proof of Work <span className="cta-arrow">→</span>
                  </button>
                </div>
                <span className="nda-seal">NDA · Auditado</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
