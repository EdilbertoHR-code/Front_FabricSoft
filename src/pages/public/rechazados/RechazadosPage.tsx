import BackButton from '../../../components/BackButton';

export default function RechazadosPage() {
  const proyectos = [
    { id: 'E-2026-01', industria: 'Retail Nacional', razon: 'Sin patrocinio CFO directo. El programa era operado por TI sin visibilidad ejecutiva.', trimestre: 'Q1 2026', modulos: 'Fusion Financials · HCM' },
    { id: 'E-2026-02', industria: 'Manufactura', razon: 'Definición de alcance imposible de fijar. Tres iteraciones de SOW sin acuerdo interno del cliente.', trimestre: 'Q1 2026', modulos: 'SCM · Manufacturing' },
    { id: 'E-2026-03', industria: 'Fintech', razon: 'Plazo de 12 semanas no permite primer ciclo crítico estabilizado. Riesgo operativo inaceptable.', trimestre: 'Q2 2026', modulos: 'Fusion Financials · CNBV Compliance' },
    { id: 'E-2026-04', industria: 'Centros Comerciales', razon: 'Migración EBS sin compromiso de capacitación interna. Dependencia perpetua de consultoría externa.', trimestre: 'Q2 2026', modulos: 'Oracle EBS → Fusion' },
    { id: 'E-2026-05', industria: 'Logística / Distribución', razon: 'Presupuesto insuficiente para cubrir fase STABILIZE. Cliente quería entregar en go-live.', trimestre: 'Q1 2026', modulos: 'SCM · WMS · Transportación' },
    { id: 'E-2026-06', industria: 'Servicios Financieros', razon: 'Alcance de upgrade sin ventana operativa realista. Cierre regulatorio en conflicto con timeline propuesto.', trimestre: 'Q2 2026', modulos: 'Oracle EBS Upgrade · HCM' },
    { id: 'E-2026-07', industria: 'Inmobiliario', razon: 'Patrocinio ejecutivo insuficiente: CTO delegó a coordinador sin autoridad de decisión.', trimestre: 'Q2 2026', modulos: 'Fusion Financials · EPM · Real Estate' },
  ];

  const stats = [
    { num: '23',  label: 'Proyectos evaluados YTD' },
    { num: '30%', label: 'Tasa de rechazo · 7 de 23' },
    { num: '4',   label: 'Criterios de evaluación aplicados' },
  ];

  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: 100 }}>

      {/* ── Back button ── */}
      <div className="rechazados-wrapper" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <BackButton />
      </div>

      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div className="rechazados-wrapper">
          <div className="label" style={{ marginBottom: 20 }}>Transparencia · FABRIC</div>
          <div className="rechazados-header-grid">
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)', marginBottom: 24 }}>
                Proyectos evaluados.<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>2026.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Publicamos los proyectos que evaluamos y no aceptamos, con las razones de rechazo. La selectividad es parte de nuestra doctrina: no todos los proyectos son adecuados para el modelo FABRIC.
              </p>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                23 evaluados · {proyectos.length} rechazados · YTD 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Estadísticas ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="rechazados-wrapper rechazados-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className={`rechazados-stat${i < stats.length - 1 ? ' rechazados-stat--border' : ''}`}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 6vw, 56px)', fontWeight: 300, color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabla de proyectos ── */}
      <div className="rechazados-wrapper" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 40 }}>
          Registro anonimizado · Identidades protegidas bajo NDA
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Header de tabla — solo visible en desktop */}
          <div className="rechazados-table-header">
            <span>ID</span><span>Industria</span><span>Razón de rechazo</span><span>Trimestre</span>
          </div>

          {proyectos.map((p) => (
            <div
              key={p.id}
              className="rechazados-row"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'}
            >
              {/* Mobile: layout apilado */}
              <div className="rechazados-row-mobile">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em' }}>{p.id}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>{p.trimestre}</span>
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>{p.industria}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginBottom: 10 }}>{p.modulos}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.razon}</div>
              </div>

              {/* Desktop: grid de 4 columnas */}
              <div className="rechazados-row-desktop">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em' }}>{p.id}</div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>{p.industria}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>{p.modulos}</div>
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.razon}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>{p.trimestre}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
          Los proyectos listados han sido anonimizados. Razones de rechazo publicadas con autorización. Criterios completos de evaluación en{' '}
          <a href="/#criterios" style={{ color: 'var(--accent)' }}>Criterios de admisión →</a>
        </div>
      </div>
    </div>
  );
}
