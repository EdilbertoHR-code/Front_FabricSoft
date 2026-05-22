import BackButton from '../../../components/BackButton';
import { Link } from 'react-router-dom';

// BACKEND TODO: los campos con valor null deben conectarse a DB cuando haya
// universo estadístico suficiente (10+ proyectos, Q4 2026 según brief).
const metricas = [
  { id: '01', label: 'Go-live APE Plazas en fecha contractual',      valor: '✓',    unidad: 'Verificable', metodologia: 'Go-live planeado 06 abril 2026 · Ejecutado 06 abril 2026 · Verificable bajo NDA' },
  { id: '02', label: 'Primer cierre contable APE Plazas',            valor: '✓',    unidad: 'Verificable', metodologia: 'Cierre planeado abril 2026 · Ejecutado 30 abril 2026 · Acta en firma mayo 2026' },
  { id: '03', label: 'Sin incidencias críticas post go-live',        valor: '✓',    unidad: 'APE Plazas',  metodologia: 'Cero incidencias bloqueantes al cierre del primer ciclo · Verificable bajo NDA' },
  { id: '04', label: 'Experiencia Oracle promedio del equipo',       valor: '15+',  unidad: 'años',        metodologia: 'Promedio de años de experiencia Oracle por consultor senior facturable' },
  { id: '05', label: 'Plantilla senior Oracle',                      valor: '100%', unidad: 'del equipo',  metodologia: 'Cero juniors facturables · Condición contractual en cada SOW · Verificable' },
  { id: '06', label: 'Certificaciones Oracle vigentes',              valor: '100%', unidad: 'del equipo',  metodologia: 'Certificaciones activas verificables por consultor facturable' },
];

const compromisos = [
  {
    num: '01',
    titulo: 'Publicamos solo números reales',
    cuerpo: 'Las métricas de esta página reflejan proyectos reales documentados. No proyectamos tasas de éxito ni publicamos benchmarks de mercado como si fueran propios. Si no tenemos el número, no lo publicamos.',
  },
  {
    num: '02',
    titulo: 'Metodología pública por cada métrica',
    cuerpo: 'Cada número de la sección anterior tiene una definición, un universo, y un método de cálculo documentado. Ninguna métrica es un claim sin sustento.',
  },
  {
    num: '03',
    titulo: 'Actualización trimestral',
    cuerpo: 'Las métricas se actualizan al cierre de cada trimestre. La fecha de última actualización aparece en cada dato. Preferimos retrasar una publicación a publicar un número sin validar.',
  },
];

export default function TransparenciaPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64, marginBottom: 0 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Transparencia · FABRIC</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)', marginBottom: 24 }}>
                Datos verificables.<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Metodología pública.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                En FABRIC no publicamos proyecciones comerciales como si fueran resultados. Publicamos números de proyectos reales, con metodología documentada y fecha de actualización.
              </p>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Última actualización · Mayo 2026 · Universo · 2 proyectos bajo doctrina formal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas por caso real — Nivel 1 */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 40 }}>Nivel 1 · Métricas por caso real</div>

          <div style={{ borderTop: '1px solid var(--border)' }}>
            {metricas.map(m => (
              <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '56px 1fr 160px 1fr', gap: '0 40px', padding: '28px 0', borderBottom: '1px solid var(--border)', alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.2em' }}>{m.id}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.5 }}>{m.label}</div>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--accent)', lineHeight: 1, fontWeight: 400 }}>{m.valor}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.14em', marginTop: 4 }}>{m.unidad}</div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                  {m.metodologia}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: '16px 24px', border: '1px solid var(--border)', borderLeft: '2px solid var(--accent)', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.1em', lineHeight: 1.8 }}>
            Universo: APE Plazas (abril 2026) y Aplazo (Q1 2026). Ambos proyectos bajo Doctrina FABRIC V4.0 con acta de primer ciclo firmada. Verificable bajo NDA con los clientes.
          </div>
        </div>
      </section>

      {/* Compromisos de medición — Nivel 2 */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 40 }}>Nivel 2 · Compromisos de medición</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {compromisos.map(c => (
              <div key={c.num} style={{ border: '1px solid var(--border)', padding: '32px 28px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.25em', marginBottom: 16 }}>{c.num}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.2, marginBottom: 16 }}>{c.titulo}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.cuerpo}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, padding: '28px 32px', border: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
            <div className="label" style={{ marginBottom: 16 }}>Proyección de publicación</div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 720 }}>
              FABRIC publicará métricas agregadas con universo estadístico a partir de <strong style={{ color: 'var(--text-primary)', fontWeight: 400 }}>Q4 2026</strong>, una vez completados los primeros 10 proyectos bajo Doctrina formal, con metodología auditada externamente.
            </p>
          </div>
        </div>
      </section>

      {/* Equipo — Nivel 3 */}
      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 40 }}>Nivel 3 · Datos del equipo</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {[
              { num: '8+', label: 'Años de experiencia Oracle', sub: 'Mínimo por consultor' },
              { num: '100%', label: 'Plantilla senior', sub: 'Cero juniors facturables · Por contrato' },
              { num: '20+', label: 'Años de Julio Álvarez', sub: 'Experiencia Oracle / ERP empresarial' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '40px 40px', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 56, color: 'var(--accent)', lineHeight: 1, fontWeight: 400, marginBottom: 12 }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-primary)', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link to="/aplicar" className="btn-primary">
              Aplicar a FABRIC →
            </Link>
            <Link to="/" className="cta">
              Volver al inicio <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
