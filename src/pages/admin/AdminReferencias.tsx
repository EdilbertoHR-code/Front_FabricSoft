import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { adminApi } from '../../config/api';

interface ReferenceItem {
  _id?: string;
  numero: string;
  title: string;
  subtitle: string;
  vertical: string;
  langs: string[];
  disponible: boolean;
  orden: number;
}

const emptyReference = (orden: number): ReferenceItem => ({
  numero: String(orden).padStart(2, '0'),
  title: '',
  subtitle: '',
  vertical: '',
  langs: ['ES'],
  disponible: true,
  orden,
});

export default function AdminReferencias() {
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [rotationWeeks, setRotationWeeks] = useState(4);
  const [publicLimit, setPublicLimit] = useState(3);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchReferences(); }, []);

  async function fetchReferences() {
    setLoading(true);
    setMessage('');
    try {
      const res = await adminApi.get('/referencias/admin');
      setReferences(res.data.data.referencias ?? []);
      setRotationWeeks(res.data.data.rotationWeeks ?? 4);
      setPublicLimit(res.data.data.publicLimit ?? 3);
    } catch {
      setMessage('Error cargando referencias.');
    } finally {
      setLoading(false);
    }
  }

  function updateReference(index: number, patch: Partial<ReferenceItem>) {
    setReferences(prev => prev.map((item, i) => i === index ? { ...item, ...patch } : item));
  }

  function toggleLang(index: number, lang: string) {
    const current = references[index]?.langs ?? ['ES'];
    const next = current.includes(lang)
      ? current.filter(item => item !== lang)
      : [...current, lang];
    updateReference(index, { langs: next.length ? next : ['ES'] });
  }

  function addReference() {
    setReferences(prev => [...prev, emptyReference(prev.length + 1)]);
  }

  function removeReference(index: number) {
    setReferences(prev => prev.filter((_, i) => i !== index).map((item, i) => ({
      ...item,
      numero: item.numero || String(i + 1).padStart(2, '0'),
      orden: i + 1,
    })));
  }

  async function save() {
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        rotationWeeks,
        publicLimit,
        referencias: references.map((item, index) => ({ ...item, orden: index + 1 })),
      };
      const res = await adminApi.put('/referencias/admin', payload);
      setReferences(res.data.data.referencias ?? []);
      setRotationWeeks(res.data.data.rotationWeeks ?? rotationWeeks);
      setPublicLimit(res.data.data.publicLimit ?? publicLimit);
      setMessage('Referencias actualizadas.');
    } catch {
      setMessage('Error guardando referencias.');
    } finally {
      setSaving(false);
    }
  }

  async function resetDefaults() {
    setSaving(true);
    setMessage('');
    try {
      const res = await adminApi.post('/referencias/admin/reset');
      setReferences(res.data.data.referencias ?? []);
      setRotationWeeks(res.data.data.rotationWeeks ?? 4);
      setPublicLimit(res.data.data.publicLimit ?? 3);
      setMessage('Defaults restaurados.');
    } catch {
      setMessage('Error restaurando defaults.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC - ADMIN - REFERENCIAS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Referencias disponibles
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={fetchReferences} style={buttonStyle}>Actualizar</button>
          <button onClick={resetDefaults} disabled={saving} style={buttonStyle}>Restaurar</button>
          <button onClick={save} disabled={saving} style={{ ...buttonStyle, borderColor: '#C9A96E', color: '#C9A96E' }}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 36px', borderBottom: '1px solid #1a1a1a', display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 9, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase' }}>
          Rotacion semanas
        </label>
        <input
          type="number"
          min={1}
          max={52}
          value={rotationWeeks}
          onChange={e => setRotationWeeks(Number(e.target.value))}
          style={inputStyle({ width: 86 })}
        />
        <label style={{ fontSize: 9, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase' }}>
          Visibles publico
        </label>
        <input
          type="number"
          min={1}
          max={references.length || 5}
          value={publicLimit}
          onChange={e => setPublicLimit(Number(e.target.value))}
          style={inputStyle({ width: 86 })}
        />
        <span style={{ fontSize: 10, color: message.includes('Error') ? '#B85450' : '#8A8A8A' }}>
          {message || 'S12 muestra una rotacion semanal de referencias disponibles.'}
        </span>
      </div>

      <div style={{ padding: '24px 36px 36px' }}>
        {loading ? (
          <div style={{ padding: '48px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>Cargando...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {references.map((item, index) => (
              <div key={item._id ?? index} style={{ border: '1px solid #1e1e1e', background: '#080808', padding: 18 }}>
                <div className="admin-reference-row">
                  <input value={item.numero} onChange={e => updateReference(index, { numero: e.target.value })} style={inputStyle()} />
                  <input value={item.title} onChange={e => updateReference(index, { title: e.target.value })} placeholder="Titulo publico" style={inputStyle()} />
                  <input value={item.subtitle} onChange={e => updateReference(index, { subtitle: e.target.value })} placeholder="Subtitulo" style={inputStyle()} />
                  <input value={item.vertical} onChange={e => updateReference(index, { vertical: e.target.value })} placeholder="Vertical" style={inputStyle()} />
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: item.disponible ? '#C9A96E' : '#5A5A5A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    <input type="checkbox" checked={item.disponible} onChange={e => updateReference(index, { disponible: e.target.checked })} />
                    Disponible
                  </label>
                </div>
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['ES', 'EN'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => toggleLang(index, lang)}
                        style={{
                          ...buttonStyle,
                          padding: '6px 10px',
                          borderColor: item.langs.includes(lang) ? '#C9A96E' : '#252525',
                          color: item.langs.includes(lang) ? '#C9A96E' : '#5A5A5A',
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => removeReference(index)} style={{ ...buttonStyle, color: '#B85450', borderColor: '#B85450' }}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <button onClick={addReference} style={{ ...buttonStyle, alignSelf: 'flex-start', marginTop: 8 }}>
              Agregar referencia
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const buttonStyle: CSSProperties = {
  fontSize: 9,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  padding: '9px 18px',
  background: 'transparent',
  border: '1px solid #252525',
  color: '#8A8A8A',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

function inputStyle(extra: CSSProperties = {}): CSSProperties {
  return {
    width: '100%',
    background: '#060606',
    border: '1px solid #252525',
    color: '#F5F5F5',
    fontFamily: 'inherit',
    fontSize: 11,
    padding: '9px 10px',
    outline: 'none',
    boxSizing: 'border-box',
    ...extra,
  };
}
