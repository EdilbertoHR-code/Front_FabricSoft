import { useInViewOnce } from '../../../hooks/useInViewOnce';

const pasos = [
  {
    num: '01',
    titulo: 'Acceso de solo lectura',
    desc: 'Compartes credenciales audit-only de tu tenant OCI. Sin acceso de escritura, sin riesgo operativo.',
  },
  {
    num: '02',
    titulo: 'Análisis automatizado FABRIC',
    desc: 'Nuestro motor analiza tu tenant en 24–72 horas. Identifica componentes sobre-aprovisionados y optimizaciones por área.',
  },
  {
    num: '03',
    titulo: 'Reporte cuantificado',
    desc: 'Recibes USD/mes de ahorro identificado por componente, sin instrucciones de ejecución.',
  },
];

export default function S02OptimizadorOCI() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      id="diagnostico"
      className={`demo-section transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 96px', alignItems: 'start' }}>

          {/* ── Columna izquierda ── */}
          <div>
            <div className="label" style={{ marginBottom: 20 }}>Lead Magnet · FABRIC</div>
            <h2 style={{ marginBottom: 24 }}>
              Auditoría OCI<br />
              <span className="text-[#C9A96E] italic">gratuita.</span>
            </h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 40, maxWidth: 460 }}>
              Recibe un diagnóstico cuantificado de ahorro sobre tu tenant Oracle Cloud Infrastructure.
            </p>

            {/* Dato de rango */}
            <div style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--accent)',
              padding: '28px 32px',
              marginBottom: 40,
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Diagnósticos anteriores
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 300, color: 'var(--accent)', lineHeight: 1.1, marginBottom: 8 }}>
                USD 2,000 – 15,000
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                de optimización mensual identificada en tenants OCI medianos
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <a
                href="/aplicar"
                className="cta"
              >
                Solicitar auditoría <span className="cta-arrow">→</span>
              </a>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Confidencialidad bajo NDA · Reporte sin compromiso
              </span>
            </div>
          </div>

          {/* ── Columna derecha: 3 pasos ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingTop: 8 }}>
            {pasos.map((paso, i) => (
              <div
                key={paso.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: '0 24px',
                  padding: '32px 0',
                  borderBottom: i < pasos.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'start',
                }}
              >
                {/* Número con línea conectora */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    border: '1px solid var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                  }}>
                    {paso.num}
                  </div>
                  {i < pasos.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 24, background: 'var(--border)', marginTop: 8 }} />
                  )}
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 20,
                    fontWeight: 400,
                    color: 'var(--text-primary)',
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}>
                    {paso.titulo}
                  </div>
                  <p style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                  }}>
                    {paso.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
