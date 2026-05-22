export default function ModelosPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Modelos de Compromiso · FABRIC</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.02, marginBottom: 24 }}>
            Modelos de<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>compromiso.</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contenido pendiente de especificación por Julio Álvarez.
          </p>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Próximamente Q3-Q4 2026
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '80px auto', padding: '0 56px', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
        © 2026 FABRIC SOFT MEXICO SA DE CV
      </div>
    </div>
  );
}
