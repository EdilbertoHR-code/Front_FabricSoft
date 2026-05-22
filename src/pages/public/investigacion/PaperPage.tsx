import BackButton from '../../../components/BackButton';
import { useParams, Navigate } from 'react-router-dom';

const papers: Record<string, { num: string; titulo: string; subtitulo: string }> = {
  '01': {
    num: '01',
    titulo: 'Por qué fallan los go-live de Oracle Fusion',
    subtitulo: 'Research Note · FABRIC · 2026',
  },
  '02': {
    num: '02',
    titulo: 'IA aplicada a cierre contable en Fusion Cloud',
    subtitulo: 'Research Note · FABRIC · 2026',
  },
  '03': {
    num: '03',
    titulo: 'Modelo de entrega en primer ciclo crítico',
    subtitulo: 'Research Note · FABRIC · 2026',
  },
};

export default function PaperPage() {
  const { num } = useParams<{ num: string }>();
  const paper = papers[num ?? ''];

  if (!paper) return <Navigate to="/#s14" replace />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingTop: 100 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>Paper {paper.num} · FABRIC Research</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 24 }}>
            {paper.titulo}
          </h1>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
            {paper.subtitulo}
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560 }}>
            Nota técnica para equipos ejecutivos que necesitan decidir con evidencia, no con promesas de implementación. El acceso completo requiere registro corporativo.
          </p>
          <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Descarga disponible con registro · Correo corporativo requerido
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '80px auto', padding: '0 56px' }}>
        <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', padding: 40 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
            Solicitar descarga
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
            El PDF se entrega por email tras validar correo corporativo y contexto de iniciativa Oracle. No distribuimos research sensible en descarga pública.
          </p>
          <a href="/aplicar" style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bg-base)', background: 'var(--accent)', padding: '14px 32px', textDecoration: 'none' }}>
            Solicitar acceso →
          </a>
        </div>
      </div>
    </div>
  );
}
