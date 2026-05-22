export default function PrivacidadPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>

      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Legal · FABRIC SOFT MEXICO SA DE CV</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)' }}>
            Aviso de privacidad.
          </h1>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Última actualización · Pendiente · Contenido en preparación
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 56px' }}>
        {[
          { titulo: '1. Responsable del tratamiento', cuerpo: 'FABRIC SOFT MEXICO SA DE CV, con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales. Contenido completo pendiente de redacción por área legal.' },
          { titulo: '2. Datos personales recabados', cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Listado de datos recabados pendiente de definición: nombre, cargo, empresa, correo corporativo. Contenido pendiente de validación.' },
          { titulo: '3. Finalidades del tratamiento', cuerpo: 'Ut enim ad minim veniam. Finalidades primarias y secundarias pendientes de redacción conforme a LFPDPPP.' },
          { titulo: '4. Transferencias de datos', cuerpo: 'Lorem ipsum dolor sit amet. Política de transferencias pendiente de definición. FABRIC no vende ni transfiere datos a terceros para fines comerciales.' },
          { titulo: '5. Derechos ARCO', cuerpo: 'Duis aute irure dolor. Para ejercer derechos de Acceso, Rectificación, Cancelación u Oposición: contacto@fabricsoft.com.mx · Plazo de respuesta: 20 días hábiles.' },
          { titulo: '6. Contacto', cuerpo: 'Consultas sobre privacidad: contacto@fabricsoft.com.mx · FABRIC SOFT MEXICO SA DE CV · Ciudad de México, México.' },
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
