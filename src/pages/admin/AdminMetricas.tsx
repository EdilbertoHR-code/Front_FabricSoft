import { useState } from 'react';
import { useFabric } from '../../store/FabricContext';
import type { MetricaPublica } from '../../store/fabricStore';

export default function AdminMetricas() {
  const { store, updateMetrica } = useFabric();
  const metrics = store.metricas;
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · MÉTRICAS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Métricas públicas
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/" target="_blank" rel="noreferrer" style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5A5A5A', textDecoration: 'none' }}>
            Vista previa →
          </a>
          <button
            onClick={handleSave}
            style={{
              padding: '9px 22px',
              background: saved ? '#4ade8022' : '#C9A96E',
              border: saved ? '1px solid #4ade80' : 'none',
              color: saved ? '#4ade80' : '#060606',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
            }}
          >
            {saved ? '✓ Publicado' : 'Publicar cambios'}
          </button>
        </div>
      </div>

      {/* Aviso: métricas auto-sincronizadas */}
      <div style={{ padding: '12px 36px', borderBottom: '1px solid #1a1a1a', background: 'rgba(201,169,110,0.04)' }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: '#C9A96E', textTransform: 'uppercase' }}>
          ◆ Proyectos activos y Wait list se sincronizan automáticamente desde Capacidad
        </span>
      </div>

      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {metrics.map((m: MetricaPublica) => (
          <MetricaCard key={m.id} m={m} onUpdate={updateMetrica} />
        ))}
      </div>
    </>
  );
}

function MetricaCard({
  m,
  onUpdate,
}: {
  m: MetricaPublica;
  onUpdate: (id: string, field: keyof MetricaPublica, value: number | boolean | string) => void;
}) {
  // Métricas que se sincronizan solas desde Capacidad — solo lectura aquí
  const readonly = m.id === 'slots' || m.id === 'waitlist';

  return (
    <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '28px 32px' }}>
      <div className="admin-metrics-card-grid">

        {/* Vista previa pública */}
        <div>
          <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>
            {m.label} · v{m.version}
          </div>
          <div style={{ border: '1px solid #252525', padding: '20px 24px', background: '#060606' }}>
            <div style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 8 }}>
              Vista previa pública
            </div>
            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 40, color: '#C9A96E', marginBottom: 4 }}>
              {m.value}{m.unit === '%' || m.unit === '/12' ? m.unit : ''}
            </div>
            <div style={{ fontSize: 10, color: '#8A8A8A' }}>{m.publicLabel}</div>
            <div style={{ fontSize: 8, color: '#3A3A3A', marginTop: 8, letterSpacing: '0.12em' }}>
              Aparece en: {m.appearsIn}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div>
          <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>
            {readonly ? 'Solo lectura · auto-sincronizado' : 'Editor'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Valor
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  disabled={readonly}
                  onClick={() => onUpdate(m.id, 'value', Math.max(0, m.value - 1))}
                  style={{
                    width: 28, height: 28, background: '#1a1a1a',
                    border: `1px solid ${readonly ? '#1a1a1a' : '#252525'}`,
                    color: readonly ? '#2a2a2a' : '#C9A96E',
                    cursor: readonly ? 'not-allowed' : 'pointer', fontSize: 16, fontFamily: 'inherit',
                  }}
                >−</button>
                <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 24, color: readonly ? '#4a4a4a' : '#C9A96E', minWidth: 40, textAlign: 'center' }}>
                  {m.value}
                </span>
                <button
                  disabled={readonly}
                  onClick={() => onUpdate(m.id, 'value', m.value + 1)}
                  style={{
                    width: 28, height: 28, background: '#1a1a1a',
                    border: `1px solid ${readonly ? '#1a1a1a' : '#252525'}`,
                    color: readonly ? '#2a2a2a' : '#C9A96E',
                    cursor: readonly ? 'not-allowed' : 'pointer', fontSize: 16, fontFamily: 'inherit',
                  }}
                >+</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Etiqueta pública
              </label>
              <input
                value={m.publicLabel}
                disabled={readonly}
                onChange={e => onUpdate(m.id, 'publicLabel', e.target.value)}
                style={{
                  width: '100%', background: readonly ? '#0a0a0a' : '#060606',
                  border: `1px solid ${readonly ? '#1a1a1a' : '#252525'}`,
                  color: readonly ? '#4a4a4a' : '#F5F5F5',
                  fontFamily: 'inherit', fontSize: 11,
                  padding: '8px 10px', outline: 'none', boxSizing: 'border-box',
                  cursor: readonly ? 'not-allowed' : 'text',
                }}
              />
            </div>
          </div>
        </div>

        {/* Toggle visibilidad */}
        <div>
          <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>
            Visibilidad
          </div>
          <button
            onClick={() => onUpdate(m.id, 'visible', !m.visible)}
            style={{
              padding: '10px 18px',
              background: m.visible ? 'rgba(74,222,128,0.1)' : 'rgba(90,90,90,0.1)',
              border: `1px solid ${m.visible ? '#4ade80' : '#252525'}`,
              color: m.visible ? '#4ade80' : '#5A5A5A',
              fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s',
              width: '100%',
            }}
          >
            {m.visible ? '● VISIBLE' : '○ OCULTO'}
          </button>
          <div style={{ marginTop: 8, fontSize: 8, color: '#3A3A3A', letterSpacing: '0.1em' }}>
            Período: {m.period}
          </div>
        </div>
      </div>
    </div>
  );
}
