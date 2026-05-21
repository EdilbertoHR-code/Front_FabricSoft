import { useState } from 'react';
import AdminLayout from './AdminLayout';

type Metric = {
  id: string; label: string; value: number; unit: string;
  publicLabel: string; period: string; visible: boolean;
  appearsIn: string; version: number;
};

const INITIAL: Metric[] = [
  { id: 'rescue', label: 'Rescue Counter',       value: 14, unit: 'rescates', publicLabel: 'Rescates Oracle · 2024–2026', period: '2024–2026', visible: true,  appearsIn: 'Hero · S07 · OG image', version: 12 },
  { id: 'nps',    label: 'NPS clientes activos',  value: 72, unit: 'pts',      publicLabel: 'NPS · Publicación Q4 2026',   period: 'Q1 2026',   visible: false, appearsIn: 'S13 Transparencia',     version: 1  },
  { id: 'senior', label: '% Senior consultants',  value: 100,unit: '%',        publicLabel: '100% Senior Team',            period: 'Vigente',   visible: true,  appearsIn: 'S15 Founder',           version: 3  },
  { id: 'waitlist', label: 'Wait list actual',    value: 7,  unit: 'orgs',     publicLabel: '7 organizaciones en espera',  period: 'Mayo 2026', visible: true,  appearsIn: 'S15 Founder',           version: 5  },
  { id: 'slots',  label: 'Proyectos activos',     value: 9,  unit: '/12',      publicLabel: '9 proyectos activos',         period: 'Mayo 2026', visible: true,  appearsIn: 'S15 Founder · Dashboard', version: 8 },
];

export default function AdminMetricas() {
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL);
  const [saved, setSaved] = useState(false);

  const update = (id: string, field: keyof Metric, val: number | boolean | string) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
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
              padding: '9px 22px', background: saved ? '#4ade8022' : '#C9A96E',
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

      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {metrics.map(m => (
          <div key={m.id} style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '28px 32px' }}>
            <div className="admin-metrics-card-grid">

              {/* Preview */}
              <div>
                <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>
                  {m.label} · Versión vigente v{m.version}
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
                <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>Editor</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      Total
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button onClick={() => update(m.id, 'value', Math.max(0, m.value - 1))}
                        style={{ width: 28, height: 28, background: '#1a1a1a', border: '1px solid #252525', color: '#C9A96E', cursor: 'pointer', fontSize: 16, fontFamily: 'inherit' }}>
                        −
                      </button>
                      <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 24, color: '#C9A96E', minWidth: 40, textAlign: 'center' }}>{m.value}</span>
                      <button onClick={() => update(m.id, 'value', m.value + 1)}
                        style={{ width: 28, height: 28, background: '#1a1a1a', border: '1px solid #252525', color: '#C9A96E', cursor: 'pointer', fontSize: 16, fontFamily: 'inherit' }}>
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                      Etiqueta pública
                    </label>
                    <input
                      value={m.publicLabel}
                      onChange={e => update(m.id, 'publicLabel', e.target.value)}
                      style={{
                        width: '100%', background: '#060606', border: '1px solid #252525',
                        color: '#F5F5F5', fontFamily: 'inherit', fontSize: 11,
                        padding: '8px 10px', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Toggle visible */}
              <div>
                <div style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>Visibilidad</div>
                <button
                  onClick={() => update(m.id, 'visible', !m.visible)}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
