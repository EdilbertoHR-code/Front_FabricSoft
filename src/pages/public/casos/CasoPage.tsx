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

const caseStudies: Record<string, { tag: string; client: string; title: string; deck: string; meta: {label:string;value:string;sub:string}[]; blocks: CaseBlock[]; results: {label:string;before?:string;after?:string;value?:string}[]; pow: {icon:string;title:string;meta:string;size:string;locked:boolean}[] }> = {
  'ape-plazas': {
    tag: "Caso Ancla · Abril 2026 · Verificable bajo NDA",
    client: "APE Plazas",
    title: "Implementación Oracle Fusion Cloud en APE Plazas.",
    deck: "Un operador de centros comerciales con presencia multi-plaza en México. Go-live en fecha planeada. Primer cierre contable sin incidencias. Transición a soporte en firma.",
    meta: [
      { label: "Industria", value: "Inmobiliario", sub: "Centros comerciales · MX" },
      { label: "Revenue range", value: "USD 100M+", sub: "Multi-plaza operativo" },
      { label: "Duración total", value: "14 semanas", sub: "Diagnose → Stabilize" },
      { label: "Estado actual", value: "En producción", sub: "Soporte L1/L2 · Acta firmada" },
    ],
    blocks: [
      {
        eyebrow: "01 · Contexto",
        title: "Un operador multi-plaza que necesitaba consolidar la operación financiera.",
        body: [
          "APE Plazas opera múltiples centros comerciales bajo entidades legales independientes. Hasta abril 2026, cada plaza tenía su propia versión de cierre contable con reportes parciales reconciliados manualmente en Excel.",
          "La meta del proyecto: una sola fuente de verdad financiera, consolidación multi-entidad nativa, y cierre contable mensual reducido de 12-15 días a menos de 5. Sin Oracle Fusion Cloud, esa meta no era alcanzable en menos de 18 meses.",
        ],
      },
      {
        eyebrow: "02 · Aproximación",
        title: "Doctrina FABRIC aplicada desde el SOW.",
        body: [
          "El SOW se cerró con las cinco cláusulas doctrinales explícitas: entrega en primer cierre contable operado, solo seniors, fixed-price por fase, cero reportes manuales post go-live, y transición formal.",
          "Sobre FABRIC OS aplicamos FSO-01 (Rapid GL Close) y FSO-02 (Multi-Entity Retail Ops). Ambos fueron validados en APE Plazas y hoy forman parte del catálogo de capacidades reusables.",
        ],
        quote: "El SOW que firmó FABRIC fue distinto desde la primera lectura. Tenía cláusulas que nuestros abogados nunca habían visto en una consultora Oracle.",
        quoteAttr: "— CIO · APE Plazas · enero 2026",
      },
      {
        eyebrow: "03 · Ejecución · Timeline",
        title: "Catorce semanas, cinco hitos documentados.",
        timeline: [
          { date: "06 ENE 2026", event: "Diagnose firmado", meta: "Auditado" },
          { date: "29 ENE 2026", event: "Blueprint técnico aprobado", meta: "Firmado" },
          { date: "10 MAR 2026", event: "Deploy completo", meta: "Documentado" },
          { date: "06 ABR 2026", event: "Go-live ejecutado en fecha", meta: "+0 días" },
          { date: "04 MAY 2026", event: "Primer cierre contable operado", meta: "Punto entrega" },
        ],
      },
    ],
    results: [
      { label: "Cierre contable", before: "12d", after: "5d" },
      { label: "Incidencias críticas post go-live", value: "0" },
      { label: "Adopción usuarios clave", value: "93%" },
      { label: "Reportes manuales eliminados", value: "7 de 7" },
    ],
    pow: [
      { icon: "SOW",   title: "SOW Fixed-Price firmado",            meta: "28 pp · ES · Cláusulas doctrinales · dic 2025", size: "2.4 MB", locked: true },
      { icon: "ACTA",  title: "Acta de primer cierre contable",     meta: "6 pp · Firmada por CFO + CTO + FABRIC · may 2026", size: "820 KB", locked: true },
      { icon: "KPI",   title: "Tablero KPI · primer ciclo crítico", meta: "Dashboard ejecutivo · Auditado externamente", size: "1.1 MB", locked: true },
      { icon: "TRANS", title: "Plan de transición a soporte",       meta: "Documentación viva · 142 pp · En firma", size: "4.2 MB", locked: true },
      { icon: "PR",    title: "Comunicado público de go-live",      meta: "2 pp · ES · Aprobado por APE Plazas · 25 may", size: "340 KB", locked: false },
    ],
  },
  'aplazo': {
    tag: "Caso Ancla · Q1 2026 · Verificable bajo NDA",
    client: "Aplazo",
    title: "Rescate Oracle Fusion para fintech regulada con operación crítica.",
    deck: "El proyecto llegó a FABRIC con señales de abandono post go-live: reportes manuales, cierre contable extendido y adopción limitada. El objetivo fue estabilizar operación, cumplimiento y cierre.",
    meta: [
      { label: "Industria", value: "Fintech", sub: "Crédito al consumo · MX" },
      { label: "Revenue range", value: "USD 80M+", sub: "Regulada CNBV" },
      { label: "Duración total", value: "10 semanas", sub: "Diagnose → Stabilize" },
      { label: "Estado actual", value: "Estabilizado", sub: "Compliance operativo · CNBV" },
    ],
    blocks: [
      {
        eyebrow: "01 · Contexto",
        title: "Una implementación Oracle abandonada post go-live.",
        body: [
          "Aplazo llegó a FABRIC con 7 meses post go-live y una operación que no había logrado su primer cierre contable limpio. Reportes manuales paralelos al ERP, adopción del 42% y 12 incidencias críticas abiertas.",
          "El riesgo: incumplimiento regulatorio CNBV en el ciclo de cierre de Q4 2025. El plazo para estabilizar era de 10 semanas antes del siguiente ciclo.",
        ],
      },
      {
        eyebrow: "02 · Aproximación",
        title: "Priorización quirúrgica: cierre primero, adopción segundo.",
        body: [
          "FABRIC aplicó FSO-03 (Fintech Controls Pack, versión beta) y redirigió el equipo senior a los tres módulos críticos: GL, AR y Compliance CNBV.",
          "La doctrina D-04 (cero reportes manuales post go-live) se aplicó con timeline de 8 semanas para eliminar los 12 reportes paralelos identificados en el diagnóstico.",
        ],
        quote: "FABRIC tomó una implementación abandonada y la convirtió en plataforma operativa estable en 10 semanas. Sin renegociaciones.",
        quoteAttr: "— CFO Controller · Aplazo · feb 2026",
      },
    ],
    results: [
      { label: "Tiempo de cierre", before: "18d", after: "6d" },
      { label: "Adopción de usuarios", value: "95%" },
      { label: "Reportes manuales eliminados", value: "5 de 12" },
      { label: "Compliance CNBV", value: "Operativo" },
    ],
    pow: [
      { icon: "DIAG",  title: "Diagnóstico inicial documentado",    meta: "Post go-live assessment · 22 pp", size: "1.8 MB", locked: true },
      { icon: "COMP",  title: "Comparativo de cierre contable",     meta: "Antes/después con evidencia Fusion", size: "640 KB", locked: true },
      { icon: "INV",   title: "Inventario de reportes manuales",    meta: "12 reportes → 7 eliminados · Auditado", size: "480 KB", locked: true },
      { icon: "CTRL",  title: "Evidencia controles regulatorios",   meta: "CNBV compliance · Q1 2026 · Firmado", size: "920 KB", locked: true },
    ],
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
        <section style={{ borderBottom: '1px solid var(--border)', padding: '80px 0', background: 'var(--bg-panel)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'clamp(120px,20vw,240px) 1fr', gap: '64px', alignItems: 'start' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.25em', textTransform: 'uppercase', paddingTop: 8, position: 'sticky', top: 100 }}>04 · Resultados verificables</div>
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 300, marginBottom: 40, lineHeight: 1.15 }}>Métricas <span style={{ color: 'var(--accent)' }}>medibles y auditadas.</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {c.results.map((r, ri) => (
                    <div key={ri} style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', padding: '28px 24px' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{r.label}</div>
                      {r.before ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>{r.before}</span>
                          <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 13 }}>→</span>
                          <span style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--accent)', lineHeight: 1 }}>{r.after}</span>
                        </div>
                      ) : (
                        <span style={{ fontFamily: 'var(--serif)', fontSize: 48, color: 'var(--accent)', lineHeight: 1 }}>{r.value}</span>
                      )}
                    </div>
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
                    <div key={doc.icon} className="pow-item" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 200ms' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                      <div style={{ width: 40, height: 48, border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', flexShrink: 0 }}>{doc.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: 16, marginBottom: 2 }}>{doc.title}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{doc.meta}</div>
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0 }}>{doc.size}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '4px 10px', border: `1px solid ${doc.locked ? 'var(--border-strong)' : 'rgba(201,169,110,0.4)'}`, color: doc.locked ? 'var(--text-tertiary)' : 'var(--accent)', flexShrink: 0 }}>
                        {doc.locked ? '🔒 NDA' : '↓ Descargar'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
