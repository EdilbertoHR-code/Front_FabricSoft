import BackButton from '../../../components/BackButton';
export default function BenchmarkIndexPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Investigación · FABRIC</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.02, marginBottom: 24 }}>
            FABRIC Benchmark Index.<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>El estado de Oracle Fusion 2026.</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560 }}>
            Índice privado sobre patrones de falla, costos de rescate, riesgos de go-live y decisiones que separan una implementación operativa de una presentación exitosa.
          </p>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Research privado · Acceso calificado
          </div>
        </div>
      </div>
    </div>
  );
}
