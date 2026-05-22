import BackButton from '../../../components/BackButton';
export default function GeneratorPage() {
  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Herramienta · FABRIC</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)', marginBottom: 24 }}>
                Doctrine Generator.<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Tus cláusulas Oracle.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Responde 6 preguntas sobre tu próximo contrato Oracle y genera un PDF con las cláusulas contractuales recomendadas para proteger tu inversión desde el SOW.
              </p>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                6 preguntas · 3 minutos · PDF descargable
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 56px' }}>

        {/* Paso actual */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 48 }}>
          Pregunta 1 de 6
        </div>

        {/* Barra de progreso */}
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 64, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '16%', height: '100%', background: 'var(--accent)' }} />
        </div>

        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: 48 }}>
          ¿Qué tipo de iniciativa Oracle estás evaluando?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 64 }}>
          {[
            'Rescate post go-live',
            'Implementación nueva de Oracle Fusion',
            'Migración desde SAP, EBS, JDE o PeopleSoft',
            'Renegociación de SOW o contrato con partner'
          ].map((opt, i) => (
            <button
              key={i}
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border)',
                padding: '20px 24px',
                textAlign: 'left',
                fontFamily: 'var(--sans)',
                fontSize: 15,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', background: 'transparent', border: '1px solid var(--accent)', padding: '14px 32px', cursor: 'pointer', opacity: 0.4 }}>
            Siguiente →
          </button>
        </div>

        {/* Nota inferior */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
          El PDF generado incluye cláusulas recomendadas basadas en doctrina FABRIC. No constituye asesoría legal. Cada caso requiere validación con tu área jurídica.
        </div>
      </div>
    </div>
  );
}
