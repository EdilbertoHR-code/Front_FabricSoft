import BackButton from '../../../components/BackButton';
export default function ReadinessScorePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Herramienta · FABRIC</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.02, marginBottom: 24 }}>
            Oracle Readiness Score.<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>15 preguntas · Score 0-100.</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560 }}>
            Evaluación rápida de gobierno, datos, arquitectura, integraciones y capacidad interna antes de comprometer presupuesto Oracle.
          </p>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Acceso temprano · Lista privada
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '80px auto', padding: '0 56px', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
        © 2026 FABRIC SOFT MEXICO SA DE CV
      </div>
    </div>
  );
}
