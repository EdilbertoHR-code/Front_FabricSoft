import BackButton from '../../../components/BackButton';
export default function RFPTemplatePage() {
  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Recurso · FABRIC</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.02, marginBottom: 24 }}>
            RFP Template Oracle.<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>47 preguntas obligatorias.</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560 }}>
            Plantilla para presionar a cualquier partner Oracle con preguntas sobre seniors reales, primer ciclo crítico, datos, integraciones y responsabilidad post go-live.
          </p>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Descarga calificada · Correo corporativo
          </div>
        </div>
      </div>
    </div>
  );
}
