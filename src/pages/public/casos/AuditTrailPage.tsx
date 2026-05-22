import { useParams } from 'react-router-dom';

const CASOS: Record<string, { nombre: string; hitos: { fecha: string; titulo: string; descripcion: string; verificable: boolean }[] }> = {
  'ape-plazas': {
    nombre: 'APE Plazas',
    hitos: [
      { fecha: 'Ene 2026', titulo: 'SOW firmado bajo doctrina FABRIC', descripcion: 'Contrato Fixed-Price con cláusula de entrega en primer ciclo crítico. Lorem ipsum dolor sit amet, criterio contractual pendiente de detalle.', verificable: true },
      { fecha: 'Feb 2026', titulo: 'Fase de diseño completada', descripcion: 'Arquitectura financiera multi-entidad validada. Chart of accounts aprobado por CFO. Lorem ipsum dolor sit amet.', verificable: false },
      { fecha: '06 Abr 2026', titulo: 'Go-live Oracle Fusion Cloud', descripcion: 'Módulos Financials, Procurement y EPM en producción. Lorem ipsum dolor sit amet, detalle de go-live pendiente de validación.', verificable: true },
      { fecha: 'Abr 2026', titulo: 'Primer cierre contable en producción', descripcion: 'Cierre contable de abril ejecutado sin incidencias con acompañamiento FABRIC. Cero reportes manuales paralelos. Este es el momento en que consideramos el proyecto entregado.', verificable: true },
      { fecha: 'May 2026', titulo: 'Transición formal completada', descripcion: 'Acta de transición firmada. Documentación viva entregada. Lorem ipsum dolor sit amet, detalles bajo NDA.', verificable: false },
    ],
  },
};

export default function AuditTrailPage() {
  const { slug } = useParams<{ slug: string }>();
  const caso = CASOS[slug ?? ''];

  if (!caso) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', color: 'var(--text-tertiary)', fontSize: 12, letterSpacing: '0.2em' }}>CASO NO ENCONTRADO</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>

      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Audit Trail · {caso.nombre}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.02, color: 'var(--text-primary)', marginBottom: 24 }}>
                Timeline verificable.<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{caso.nombre}.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Registro público de los hitos del proyecto: desde SOW hasta primer ciclo crítico en producción. Los hitos verificables están disponibles bajo NDA para CFO/CTO evaluando FABRIC.
              </p>
              <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {caso.hitos.filter(h => h.verificable).length} hitos verificables · {caso.hitos.length} hitos totales
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 56px' }}>
        <div style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Línea vertical */}
          <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 1, background: 'var(--border)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {caso.hitos.map((hito, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: -40, top: 6,
                  width: 14, height: 14,
                  border: `1px solid ${hito.verificable ? 'var(--accent)' : 'var(--border)'}`,
                  background: hito.verificable ? 'var(--accent)' : 'var(--bg-base)',
                }} />

                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {hito.fecha}
                  {hito.verificable && (
                    <span style={{ marginLeft: 16, color: 'var(--accent)', opacity: 0.6 }}>◆ Verificable bajo NDA</span>
                  )}
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 12 }}>
                  {hito.titulo}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {hito.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 2 }}>
          Los hitos marcados como verificables incluyen documentación respaldatoria disponible bajo NDA mutuo. Solicitar acceso en{' '}
          <a href="mailto:julio@fabricsoft.com.mx" style={{ color: 'var(--accent)' }}>julio@fabricsoft.com.mx</a>
        </div>
      </div>
    </div>
  );
}
