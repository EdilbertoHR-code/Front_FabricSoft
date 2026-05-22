export default function TerminosPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>

      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Legal · FABRIC SOFT MEXICO SA DE CV</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)' }}>
            Términos de uso.
          </h1>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Última actualización · Pendiente · Contenido en preparación
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 56px' }}>
        {[
          { titulo: '1. Lorem ipsum — Pendiente', cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Contenido pendiente de redacción por área legal de FABRIC SOFT MEXICO SA DE CV.' },
          { titulo: '2. Lorem ipsum — Pendiente', cuerpo: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Contenido pendiente de revisión y validación legal.' },
          { titulo: '3. Lorem ipsum — Pendiente', cuerpo: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Contenido pendiente.' },
          { titulo: '4. Responsabilidad', cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Contenido de responsabilidad y limitaciones pendiente de definición por área legal.' },
          { titulo: '5. Contacto legal', cuerpo: 'Para consultas relacionadas con estos términos: contacto@fabricsoft.com.mx · FABRIC SOFT MEXICO SA DE CV · Ciudad de México, México.' },
        ].map((s, i) => (
          <div key={i} style={{ paddingBottom: 48, marginBottom: 48, borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 16 }}>{s.titulo}</h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.cuerpo}</p>
          </div>
        ))}

        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
          © 2026 FABRIC SOFT MEXICO SA DE CV · Todos los derechos reservados
        </div>
      </div>
    </div>
  );
}
