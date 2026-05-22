import { useParams, Link, Navigate } from 'react-router-dom';

interface TimelineItem { date: string; event: string; meta: string; }
interface CaseBlock {
  eyebrow: string;
  title: string;
  body?: string[];
  quote?: string;
  quoteAttr?: string;
  timeline?: TimelineItem[];
}

const cargoOptions = ['CFO', 'CIO', 'CTO', 'Director Transformación', 'CEO', 'Otro'];

const caseStudies: Record<string, {
  tag: string;
  client: string;
  title: string;
  deck: string;
  meta: {label:string;value:string;sub:string}[];
  blocks: CaseBlock[];
  results: {label:string;before?:string;after?:string;value?:string}[];
  pow: {icon:string;title:string;meta:string;size:string;locked:boolean}[];
  pdfAccess: { enabled: boolean; title: string; body: string; cta: string; };
}> = {
  'ape-plazas': {
    tag: "Caso Ancla · Abril 2026 · Verificable bajo NDA",
    client: "APE Plazas",
    title: "Implementación Oracle Fusion Cloud en APE Plazas.",
    deck: "Implementación Oracle Fusion Cloud para operador multi-plaza en México. Go-live el 06 abril 2026 y primer cierre contable de producción en abril 2026, operando con acompañamiento FABRIC.",
    meta: [
      { label: "Industria", value: "Inmobiliario", sub: "Centros comerciales · MX" },
      { label: "Go-live", value: "06 abril 2026", sub: "Hito verificable" },
      { label: "Primer cierre", value: "Abril 2026", sub: "Producción" },
      { label: "Estado", value: "Operando", sub: "Con acompañamiento FABRIC" },
    ],
    blocks: [
      {
        eyebrow: "01 · Contexto",
        title: "Caso ancla de implementación Oracle Fusion Cloud.",
        body: [
          "APE Plazas representa una operación inmobiliaria multi-plaza donde el primer ciclo crítico importaba más que una ceremonia de go-live.",
          "El proyecto avanzó a producción el 06 abril 2026 y operó su primer cierre contable de producción en abril 2026 con acompañamiento FABRIC.",
        ],
      },
      {
        eyebrow: "02 · Aproximación",
        title: "Doctrina FABRIC aplicada al primer ciclo crítico.",
        body: [
          "La promesa diferenciadora del sitio es que FABRIC no considera entregado el proyecto en go-live, sino cuando el primer ciclo crítico opera en producción.",
          "SOW, actas y evidencia operativa se entregan únicamente en conversaciones calificadas bajo NDA mutuo.",
        ],
        quote: "El cierre contable de abril se ejecutó sin incidencias con acompañamiento FABRIC. Ese es el momento en el que consideramos el proyecto entregado.",
        quoteAttr: "— Doctrina FABRIC · Primer ciclo crítico",
      },
      {
        eyebrow: "03 · Ejecución · Timeline",
        title: "Hitos públicos verificables.",
        timeline: [
          { date: "06 ABR 2026", event: "Go-live Oracle Fusion Cloud", meta: "Evidencia bajo NDA" },
          { date: "ABR 2026", event: "Primer cierre contable producción", meta: "Evidencia bajo NDA" },
          { date: "MAY 2026", event: "Transición operativa documentada", meta: "Acceso controlado" },
        ],
      },
    ],
    results: [
      { label: "Go-live", value: "06 abril 2026" },
      { label: "Primer cierre contable", value: "Abril 2026" },
      { label: "Estado", value: "Producción" },
      { label: "Evidencia", value: "Bajo NDA" },
    ],
    pow: [
      { icon: "NDA",   title: "Evidencia de go-live",               meta: "PDF disponible bajo NDA tras admisión", size: "Bajo NDA", locked: true },
      { icon: "NDA",   title: "Evidencia de primer cierre contable", meta: "PDF disponible bajo NDA tras admisión", size: "Bajo NDA", locked: true },
      { icon: "PAPER", title: "Paper formal de caso",               meta: "Dossier ejecutivo para conversaciones calificadas", size: "4-6 págs.", locked: true },
    ],
    pdfAccess: {
      enabled: true,
      title: "Solicitar PDF bajo NDA.",
      body: "El dossier de APE Plazas y la evidencia respaldatoria se comparten solo con prospectos calificados bajo NDA mutuo.",
      cta: "Solicitar acceso"
    },
  },
  'aplazo': {
    tag: "Referencia Reservada · Acceso bajo NDA",
    client: "Aplazo",
    title: "Rescate Oracle Fusion en Aplazo.",
    deck: "Referencia privada en servicios financieros. Por confidencialidad, los detalles operativos, métricas y evidencia se comparten únicamente en conversaciones calificadas bajo NDA mutuo.",
    meta: [
      { label: "Industria", value: "Fintech", sub: "Servicios financieros" },
      { label: "Tipo", value: "Rescate", sub: "Oracle Fusion" },
      { label: "Métricas", value: "Bajo NDA", sub: "Prospectos calificados" },
      { label: "Evidencia", value: "Restringida", sub: "Acceso controlado" },
    ],
    blocks: [
      {
        eyebrow: "01 · Contexto",
        title: "Rescate Oracle en entorno fintech.",
        body: [
          "El caso pertenece a una conversación de rescate Oracle Fusion en servicios financieros, donde la confidencialidad operativa es parte del valor.",
          "FABRIC no publica métricas sensibles, fechas internas ni documentos de cliente en abierto. El acceso se reserva a CFO, CIO y CTO evaluando una intervención real.",
        ],
      },
      {
        eyebrow: "02 · Aproximación",
        title: "Evidencia reservada para prospectos calificados.",
        body: [
          "Los rescates de misión crítica rara vez pueden exponerse en público sin comprometer información operacional.",
          "Por eso esta referencia funciona como puerta de acceso: si tu organización califica, el equipo comparte el contexto verificable bajo NDA mutuo.",
        ],
      },
    ],
    results: [
      { label: "Tipo", value: "Rescate" },
      { label: "Industria", value: "Fintech" },
      { label: "Métricas", value: "Bajo NDA" },
      { label: "Evidencia", value: "Restringida" },
    ],
    pow: [
      { icon: "NDA",  title: "Documentos de rescate", meta: "Disponibles solo para prospectos calificados", size: "Bajo NDA", locked: true },
    ],
    pdfAccess: {
      enabled: false,
      title: "Acceso reservado.",
      body: "La evidencia de esta referencia no se entrega por descarga pública. Se revisa en conversaciones privadas con organizaciones calificadas.",
      cta: "Bajo NDA"
    },
  },
};

export default function CasoPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !(slug in caseStudies)) {
    return <Navigate to="/" replace />;
  }

  const c = caseStudies[slug];

  return (
    <>
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh', paddingTop: 80 }}>

        {/* Hero */}
        <section style={{ borderBottom: '1px solid var(--border)', padding: '96px 0 64px' }}>
          <div className="container">
            <Link to="/#s07" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-block', marginBottom: 40 }}>
              ← Volver a casos
            </Link>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 24 }}>{c.tag}</div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, lineHeight: 1.05, marginBottom: 24, maxWidth: 900 }}>{c.title}</h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 720, marginBottom: 56 }}>{c.deck}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0, border: '1px solid var(--border)', borderBottom: 'none' }}>
              {c.meta.map((m, i) => (
                <div key={i} style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', borderRight: i < c.meta.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content blocks */}
        {c.blocks.map((block, bi) => (
          <section key={bi} style={{ borderBottom: '1px solid var(--border)', padding: '80px 0' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'clamp(120px,20vw,240px) 1fr', gap: '64px', alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.25em', textTransform: 'uppercase', paddingTop: 8, position: 'sticky', top: 100 }}>{block.eyebrow}</div>
                <div>
                  <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 300, marginBottom: 32, lineHeight: 1.15 }}>{block.title}</h2>
                  {block.body?.map((p, pi) => (
                    <p key={pi} style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>{p}</p>
                  ))}
                  {block.quote && (
                    <blockquote style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 24, margin: '32px 0', fontFamily: 'var(--serif)', fontSize: 19, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                      {block.quote}
                      <cite style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase', fontStyle: 'normal', marginTop: 12 }}>{block.quoteAttr}</cite>
                    </blockquote>
                  )}
                  {block.timeline && (
                    <div style={{ position: 'relative', paddingLeft: 32, marginTop: 24 }}>
                      <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom, var(--accent) 80%, var(--border))' }} />
                      {block.timeline.map((t, ti) => (
                        <div key={ti} style={{ position: 'relative', paddingBottom: 28 }}>
                          <div style={{ position: 'absolute', left: -29, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg-base)' }} />
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 4 }}>{t.date}</div>
                          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, marginBottom: 2 }}>{t.event}</div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>{t.meta}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Results */}
        <section className="case-results-section">
          <div className="container">
            <div className="case-results-layout">
              <div className="case-section-label">04 · Resultados verificables</div>
              <div className="case-results-content">
                <div className="case-results-heading">
                  <h2>Métricas <span>medibles y auditadas.</span></h2>
                  <p>Publicamos solo lo verificable. La evidencia completa se comparte bajo NDA mutuo.</p>
                </div>

                <div className="case-results-grid">
                  {c.results.map((r, ri) => (
                    <article key={ri} className="case-result-card">
                      <div className="case-result-label">{r.label}</div>
                      {r.before ? (
                        <div className="case-result-value case-result-delta">
                          <span>{r.before}</span>
                          <span aria-hidden="true">→</span>
                          <strong>{r.after}</strong>
                        </div>
                      ) : (
                        <div className="case-result-value">{r.value}</div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof of Work */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(120px,20vw,240px) 1fr', gap: '64px', alignItems: 'start' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.25em', textTransform: 'uppercase', paddingTop: 8, position: 'sticky', top: 100 }}>05 · Proof of Work</div>
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 300, marginBottom: 16, lineHeight: 1.15 }}>Entregables documentados, <span style={{ color: 'var(--accent)' }}>auditables.</span></h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>Cada documento está disponible bajo NDA tras evaluación post-admisión.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 40 }}>
                  {c.pow.map((doc) => (
                    <div key={doc.title} className="pow-item" style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) auto auto', alignItems: 'center', gap: 16, padding: '16px 20px', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 200ms', minWidth: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                      <div style={{ width: 40, height: 48, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', flexShrink: 0 }}>{doc.icon}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: 16, marginBottom: 2 }}>{doc.title}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{doc.meta}</div>
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0 }}>{doc.size}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '4px 10px', border: `1px solid ${doc.locked ? 'var(--border-strong)' : 'rgba(201,169,110,0.4)'}`, color: doc.locked ? 'var(--text-tertiary)' : 'var(--accent)', flexShrink: 0, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        {doc.locked ? 'Bajo NDA' : '↓ Descargar'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="nda-request-panel">
                  <div>
                    <div className="nda-request-kicker">Acceso controlado</div>
                    <h3>{c.pdfAccess.title}</h3>
                    <p>{c.pdfAccess.body}</p>
                  </div>
                  <form
                    className="nda-request-form"
                    action="mailto:julio@fabricsoft.com.mx"
                    method="post"
                    encType="text/plain"
                  >
                    <input name="empresa" placeholder="Empresa" disabled={!c.pdfAccess.enabled} required />
                    <input name="email" type="email" placeholder="Email corporativo" disabled={!c.pdfAccess.enabled} required />
                    <div className="nda-role-field">
                      <div className="nda-role-title">Selecciona cargo</div>
                      <div className="nda-role-group" aria-label="Cargo">
                        {cargoOptions.map((cargo) => (
                          <label key={cargo} className="nda-role-option">
                            <input type="radio" name="cargo" value={cargo} disabled={!c.pdfAccess.enabled} required />
                            <span>{cargo}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="nda-request-note">El acceso se formaliza bajo NDA mutuo antes de compartir evidencia.</div>
                    <button type="submit" disabled={!c.pdfAccess.enabled}>
                      {c.pdfAccess.cta}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
