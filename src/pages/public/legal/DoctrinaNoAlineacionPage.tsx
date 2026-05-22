export default function DoctrinaNoAlineacionPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>

      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Doctrina · FABRIC</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)', marginBottom: 24 }}>
                Doctrina de<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>no alineación.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Lorem ipsum dolor sit amet. Contenido de la doctrina de no alineación pendiente de redacción por Julio Álvarez. Esta página define la posición de FABRIC respecto a conflictos de interés, relaciones con Oracle y alineación con clientes.
              </p>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Pendiente de redacción · Julio Álvarez · Founder
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 56px' }}>
        {[
          { num: '01', titulo: 'Lorem ipsum — Pendiente', cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contenido de este principio de doctrina pendiente de redacción por Julio Álvarez.' },
          { num: '02', titulo: 'Lorem ipsum — Pendiente', cuerpo: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Contenido pendiente.' },
          { num: '03', titulo: 'Lorem ipsum — Pendiente', cuerpo: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Contenido pendiente.' },
          { num: '04', titulo: 'Lorem ipsum — Pendiente', cuerpo: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Contenido pendiente.' },
        ].map((s) => (
          <div key={s.num} style={{ paddingBottom: 56, marginBottom: 56, borderBottom: '1px solid var(--border)', display: 'flex', gap: 32 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.15em', flexShrink: 0, marginTop: 4 }}>{s.num}</div>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 16 }}>{s.titulo}</h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.cuerpo}</p>
            </div>
          </div>
        ))}

        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
          © 2026 FABRIC SOFT MEXICO SA DE CV · Doctrina en revisión permanente
        </div>
      </div>
    </div>
  );
}
