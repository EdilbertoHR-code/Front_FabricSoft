import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';

const CASOS: Record<string, { nombre: string; hitos: { fecha: string; titulo: string; descripcion: string; verificable: boolean; pdfLabel?: string }[] }> = {
  'ape-plazas': {
    nombre: 'APE Plazas',
    hitos: [
      { fecha: '06 Abr 2026', titulo: 'Go-live Oracle Fusion Cloud', descripcion: 'Hito de salida a producción con evidencia respaldatoria disponible bajo NDA mutuo.', verificable: true, pdfLabel: 'Acta de go-live' },
      { fecha: 'Abr 2026', titulo: 'Primer cierre contable en producción', descripcion: 'Primer ciclo crítico operado en producción con acompañamiento FABRIC.', verificable: true, pdfLabel: 'Reporte FABRIC' },
      { fecha: 'Abr 2026', titulo: 'Cierre ejecutado sin incidencias', descripcion: 'La documentación de soporte se revisa únicamente con prospectos calificados bajo NDA.', verificable: true, pdfLabel: 'Acta de transición' },
      { fecha: 'May 2026', titulo: 'Dossier ejecutivo privado', descripcion: 'Resumen formal del caso preparado para conversaciones calificadas con CFO, CIO y CTO.', verificable: false },
    ],
  },
  'aplazo': {
    nombre: 'Aplazo',
    hitos: [
      { fecha: 'Reservado', titulo: 'Referencia privada de rescate', descripcion: 'Caso disponible únicamente en conversación calificada por confidencialidad operativa.', verificable: false },
      { fecha: 'Reservado', titulo: 'Métricas de rescate bajo NDA', descripcion: 'Los indicadores del rescate se comparten solo con organizaciones que atraviesan una situación comparable.', verificable: false },
      { fecha: 'Reservado', titulo: 'Evidencia bajo NDA', descripcion: 'Los documentos respaldatorios no tienen descarga pública. El acceso requiere admisión previa.', verificable: false },
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
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>

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
                {hito.pdfLabel && (
                  <a
                    href={`mailto:julio@fabricsoft.com.mx?subject=Solicitud%20PDF%20bajo%20NDA%20-%20${encodeURIComponent(caso.nombre)}%20-%20${encodeURIComponent(hito.pdfLabel)}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      marginTop: 16,
                      border: '1px solid rgba(201,169,110,0.38)',
                      padding: '9px 12px',
                      color: 'var(--accent)',
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      textDecoration: 'none'
                    }}
                  >
                    Solicitar PDF bajo NDA · {hito.pdfLabel}
                  </a>
                )}
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
