import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useAuthApi } from '../../config/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Fuente {
  tipo: 'interna' | 'auditoria_externa' | 'cliente';
  descripcion: string;
}

interface Publicada {
  _id?: string;
  label: string;
  valor: string;
  unidad: string;
  metodologia: string;
  periodo: string;
  fuente: Fuente;
  verificadoPor: string;
  ultimaActualizacion: string;
  visible: boolean;
  verified: boolean;
  orden: number;
}

interface Proxima {
  _id?: string;
  label: string;
  fechaObjetivo: string;
  descripcion: string;
  visible: boolean;
  orden: number;
}

interface Compromiso {
  _id?: string;
  titulo: string;
  cuerpo: string;
  orden: number;
}

// ---------------------------------------------------------------------------
// Factories
// ---------------------------------------------------------------------------

const emptyPublicada = (orden: number): Publicada => ({
  label: '', valor: '', unidad: '', metodologia: '', periodo: '',
  fuente: { tipo: 'interna', descripcion: '' },
  verificadoPor: '',
  ultimaActualizacion: new Date().toISOString().split('T')[0],
  visible: false, verified: false, orden,
});

const emptyProxima = (orden: number): Proxima => ({
  label: '', fechaObjetivo: '', descripcion: '', visible: true, orden,
});

const emptyCompromiso = (orden: number): Compromiso => ({
  titulo: '', cuerpo: '', orden,
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type Tab = 'publicadas' | 'proximas' | 'compromisos';

export default function AdminTransparencia() {
  const adminApi = useAuthApi();
  const [tab, setTab] = useState<Tab>('publicadas');
  const [publicadas, setPublicadas]   = useState<Publicada[]>([]);
  const [proximas, setProximas]       = useState<Proxima[]>([]);
  const [compromisos, setCompromisos] = useState<Compromiso[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [message, setMessage] = useState('');
  const msgRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData();   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-clear message after 4 s
  function setMsg(msg: string) {
    setMessage(msg);
    if (msgRef.current) clearTimeout(msgRef.current);
    msgRef.current = setTimeout(() => setMessage(''), 4000);
  }

  async function fetchData() {
    setLoading(true);
    setMessage('');
    try {
      const res = await adminApi.get('/transparencia/admin');
      setPublicadas(res.data.data.publicadas ?? []);
      setProximas(res.data.data.proximas ?? []);
      setCompromisos(res.data.data.compromisos ?? []);
    } catch {
      setMsg('Error cargando datos de transparencia.');
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        publicadas:  publicadas.map((p, i) => ({ ...p, orden: i + 1 })),
        proximas:    proximas.map((p, i) => ({ ...p, orden: i + 1 })),
        compromisos: compromisos.map((c, i) => ({ ...c, orden: i + 1 })),
      };
      const res = await adminApi.put('/transparencia/admin', payload);
      setPublicadas(res.data.data.publicadas ?? []);
      setProximas(res.data.data.proximas ?? []);
      setCompromisos(res.data.data.compromisos ?? []);
      setMsg('Transparencia actualizada correctamente.');
    } catch {
      setMsg('Error guardando cambios.');
    } finally {
      setSaving(false);
    }
  }

  async function resetDefaults() {
    if (!confirm('Restaurar defaults editoriales. Continuar?')) return;
    setSaving(true);
    try {
      const res = await adminApi.post('/transparencia/admin/reset');
      setPublicadas(res.data.data.publicadas ?? []);
      setProximas(res.data.data.proximas ?? []);
      setCompromisos(res.data.data.compromisos ?? []);
      setMsg('Defaults restaurados.');
    } catch {
      setMsg('Error restaurando defaults.');
    } finally {
      setSaving(false);
    }
  }

  // -- Publicadas helpers --
  function updatePublicada(i: number, patch: Partial<Publicada>) {
    setPublicadas(prev => prev.map((p, idx) => idx === i ? { ...p, ...patch } : p));
  }
  function updatePublicadaFuente(i: number, patch: Partial<Fuente>) {
    setPublicadas(prev => prev.map((p, idx) =>
      idx === i ? { ...p, fuente: { ...p.fuente, ...patch } } : p
    ));
  }
  function addPublicada() {
    setPublicadas(prev => [...prev, emptyPublicada(prev.length + 1)]);
  }
  function removePublicada(i: number) {
    setPublicadas(prev => prev.filter((_, idx) => idx !== i).map((p, idx) => ({ ...p, orden: idx + 1 })));
  }

  // -- Proximas helpers --
  function updateProxima(i: number, patch: Partial<Proxima>) {
    setProximas(prev => prev.map((p, idx) => idx === i ? { ...p, ...patch } : p));
  }
  function addProxima() {
    setProximas(prev => [...prev, emptyProxima(prev.length + 1)]);
  }
  function removeProxima(i: number) {
    setProximas(prev => prev.filter((_, idx) => idx !== i).map((p, idx) => ({ ...p, orden: idx + 1 })));
  }

  // -- Compromisos helpers --
  function updateCompromiso(i: number, patch: Partial<Compromiso>) {
    setCompromisos(prev => prev.map((c, idx) => idx === i ? { ...c, ...patch } : c));
  }
  function addCompromiso() {
    setCompromisos(prev => [...prev, emptyCompromiso(prev.length + 1)]);
  }
  function removeCompromiso(i: number) {
    setCompromisos(prev => prev.filter((_, idx) => idx !== i).map((c, idx) => ({ ...c, orden: idx + 1 })));
  }

  const isError = message.toLowerCase().includes('error');
  const publicadasVisibles = publicadas.filter(p => p.visible && p.verified).length;
  const publicadasIncompletas = publicadas.filter(p =>
    (p.visible || p.verified) && (!p.label.trim() || !p.valor.trim() || !p.metodologia.trim() || !p.fuente.descripcion.trim())
  ).length;

  return (
      <div className="fabric-admin-page">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="fabric-admin-hero">
        <div className="fabric-admin-hero-inner">
          <div style={labelStyle}>FABRIC — ADMIN — TRANSPARENCIA</div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Transparencia Honesta
          </div>
          <div style={{ marginTop: 6, fontSize: 9, color: '#5A5A5A', letterSpacing: '0.14em' }}>
            Solo se publican métricas con{' '}
            <span style={{ color: '#C9A96E' }}>Visible + Verificada</span>{' '}
            ambas activas.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={fetchData} style={btn()}>Actualizar</button>
          <button onClick={resetDefaults} disabled={saving} style={btn()}>Restaurar</button>
          <button onClick={save} disabled={saving} style={btn({ accent: true })}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────────── */}
      {message && (
        <div style={{ padding: '10px 36px', background: isError ? 'rgba(184,84,80,0.08)' : 'rgba(201,169,110,0.06)', borderBottom: '1px solid #1a1a1a' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.12em', color: isError ? '#B85450' : '#C9A96E' }}>{message}</span>
        </div>
      )}

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div style={{ padding: '12px 36px', borderBottom: '1px solid #1a1a1a', display: 'flex', gap: 18, flexWrap: 'wrap', background: 'rgba(255,255,255,0.01)' }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: '#C9A96E', textTransform: 'uppercase' }}>
          Preview publico: {publicadasVisibles} metricas pasan gate
        </span>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: publicadasIncompletas ? '#B85450' : '#5A5A5A', textTransform: 'uppercase' }}>
          Campos incompletos: {publicadasIncompletas}
        </span>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #1e1e1e', padding: '0 36px' }}>
        {(['publicadas', 'proximas', 'compromisos'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${tab === t ? '#C9A96E' : 'transparent'}`,
            color: tab === t ? '#C9A96E' : '#5A5A5A',
            padding: '14px 20px',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all .15s',
          }}>
            {t === 'publicadas'  ? `Publicadas (${publicadas.length})`  : ''}
            {t === 'proximas'    ? `Próximas (${proximas.length})`      : ''}
            {t === 'compromisos' ? `Compromisos (${compromisos.length})`: ''}
          </button>
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="fabric-admin-content">
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>
            Cargando...
          </div>
        ) : (
          <>
            {tab === 'publicadas'  && <TabPublicadas  publicadas={publicadas}   onUpdate={updatePublicada} onFuente={updatePublicadaFuente} onRemove={removePublicada} onAdd={addPublicada} />}
            {tab === 'proximas'    && <TabProximas    proximas={proximas}       onUpdate={updateProxima}   onRemove={removeProxima}        onAdd={addProxima} />}
            {tab === 'compromisos' && <TabCompromisos compromisos={compromisos} onUpdate={updateCompromiso} onRemove={removeCompromiso}     onAdd={addCompromiso} />}
          </>
        )}
      </div>
      </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Publicadas
// ---------------------------------------------------------------------------

function TabPublicadas({ publicadas, onUpdate, onFuente, onRemove, onAdd }: {
  publicadas: Publicada[];
  onUpdate: (i: number, patch: Partial<Publicada>) => void;
  onFuente: (i: number, patch: Partial<Fuente>) => void;
  onRemove: (i: number) => void;
  onAdd: () => void;
}) {
  const verifiedCount = publicadas.filter(p => p.visible && p.verified).length;
  return (
    <div>
      <div style={{ marginBottom: 20, padding: '12px 16px', border: '1px solid #1a1a1a', background: '#080808', fontSize: 10, color: '#8A8A8A', letterSpacing: '0.1em', lineHeight: 1.7 }}>
        Métricas visibles al público:{' '}
        <span style={{ color: '#C9A96E', fontWeight: 500 }}>{verifiedCount}</span>
        {' '}/{' '}{publicadas.length} — Se publican solo las que tienen{' '}
        <span style={{ color: '#C9A96E' }}>Visible</span> y{' '}
        <span style={{ color: '#C9A96E' }}>Verificada</span> activas.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {publicadas.map((p, i) => (
          <PublicadaRow key={p._id ?? i} item={p} index={i} onUpdate={onUpdate} onFuente={onFuente} onRemove={onRemove} />
        ))}
      </div>
      <button onClick={onAdd} style={{ ...btn(), marginTop: 16 }}>+ Agregar métrica</button>
    </div>
  );
}

function PublicadaRow({ item, index, onUpdate, onFuente, onRemove }: {
  item: Publicada;
  index: number;
  onUpdate: (i: number, patch: Partial<Publicada>) => void;
  onFuente: (i: number, patch: Partial<Fuente>) => void;
  onRemove: (i: number) => void;
}) {
  const isPublic = item.visible && item.verified;
  return (
    <div style={{ border: `1px solid ${isPublic ? '#2a2315' : '#1a1a1a'}`, background: '#080808', padding: 20 }}>

      {/* Fila 1 — gate + label */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
        {/* Candados */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, paddingTop: 2 }}>
          <ToggleChip
            label="Visible"
            active={item.visible}
            color="#8A8A8A"
            onChange={v => onUpdate(index, { visible: v })}
          />
          <ToggleChip
            label="Verificada"
            active={item.verified}
            color="#C9A96E"
            onChange={v => onUpdate(index, { verified: v })}
          />
          {isPublic && (
            <div style={{ fontSize: 8, color: '#C9A96E', letterSpacing: '0.2em', textTransform: 'uppercase' }}>PUBLICA</div>
          )}
          {!isPublic && item.visible && (
            <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>sin verificar</div>
          )}
        </div>

        {/* Campos principales */}
        <div className="admin-transparencia-main-grid">
          <div>
            <FieldLabel>Label público</FieldLabel>
            <input value={item.label} onChange={e => onUpdate(index, { label: e.target.value })} placeholder="Descripción de la métrica" style={input()} />
          </div>
          <div>
            <FieldLabel>Valor</FieldLabel>
            <input value={item.valor} onChange={e => onUpdate(index, { valor: e.target.value })} placeholder="✓ / 15+ / 100%" style={input()} />
          </div>
          <div>
            <FieldLabel>Unidad</FieldLabel>
            <input value={item.unidad} onChange={e => onUpdate(index, { unidad: e.target.value })} placeholder="años / % / Verificable" style={input()} />
          </div>
          <div>
            <FieldLabel>Periodo</FieldLabel>
            <input value={item.periodo} onChange={e => onUpdate(index, { periodo: e.target.value })} placeholder="abr 2026" style={input()} />
          </div>
        </div>
      </div>

      {/* Fila 2 — metodología */}
      <div style={{ marginBottom: 12 }}>
        <FieldLabel>Metodología (aparece en /transparencia)</FieldLabel>
        <textarea
          value={item.metodologia}
          onChange={e => onUpdate(index, { metodologia: e.target.value })}
          placeholder="Cómo se calculó y qué universo tiene esta métrica..."
          rows={2}
          style={{ ...input(), resize: 'vertical' }}
        />
      </div>

      {/* Fila 3 — fuente + verificadoPor + fecha */}
      <div className="admin-transparencia-source-grid">
        <div>
          <FieldLabel>Tipo de fuente</FieldLabel>
          <select
            value={item.fuente.tipo}
            onChange={e => onFuente(index, { tipo: e.target.value as Fuente['tipo'] })}
            style={{ ...input(), cursor: 'pointer' }}
          >
            <option value="interna">Interna</option>
            <option value="auditoria_externa">Auditoría externa</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
        <div>
          <FieldLabel>Descripción de fuente</FieldLabel>
          <input value={item.fuente.descripcion} onChange={e => onFuente(index, { descripcion: e.target.value })} placeholder="CFO APE Plazas / Oracle Portal" style={input()} />
        </div>
        <div>
          <FieldLabel>Verificado por</FieldLabel>
          <input value={item.verificadoPor} onChange={e => onUpdate(index, { verificadoPor: e.target.value })} placeholder="Dirección FABRIC" style={input()} />
        </div>
        <div>
          <FieldLabel>Última actualización</FieldLabel>
          <input
            type="date"
            value={item.ultimaActualizacion?.split('T')[0] ?? ''}
            onChange={e => onUpdate(index, { ultimaActualizacion: e.target.value })}
            style={input()}
          />
        </div>
      </div>

      {/* Remove */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => onRemove(index)} style={btn({ danger: true })}>Eliminar</button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Próximas
// ---------------------------------------------------------------------------

function TabProximas({ proximas, onUpdate, onRemove, onAdd }: {
  proximas: Proxima[];
  onUpdate: (i: number, patch: Partial<Proxima>) => void;
  onRemove: (i: number) => void;
  onAdd: () => void;
}) {
  return (
    <div>
      <div style={{ marginBottom: 20, padding: '12px 16px', border: '1px solid #1a1a1a', background: '#080808', fontSize: 10, color: '#8A8A8A', letterSpacing: '0.1em' }}>
        Las próximas publicaciones visibles al público: {proximas.filter(p => p.visible).length} / {proximas.length}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {proximas.map((p, i) => (
          <div key={p._id ?? i} style={{ border: '1px solid #1a1a1a', background: '#080808', padding: 16 }}>
            <div className="admin-transparencia-next-grid">
              <div>
                <FieldLabel>Métrica pendiente</FieldLabel>
                <input value={p.label} onChange={e => onUpdate(i, { label: e.target.value })} placeholder="NPS clientes activos" style={input()} />
              </div>
              <div>
                <FieldLabel>Fecha objetivo</FieldLabel>
                <input value={p.fechaObjetivo} onChange={e => onUpdate(i, { fechaObjetivo: e.target.value })} placeholder="Q4 2026" style={input()} />
              </div>
              <div>
                <FieldLabel>Descripción (opcional)</FieldLabel>
                <input value={p.descripcion} onChange={e => onUpdate(i, { descripcion: e.target.value })} placeholder="Contexto adicional..." style={input()} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 2 }}>
                <ToggleChip label="Visible" active={p.visible} color="#8A8A8A" onChange={v => onUpdate(i, { visible: v })} />
                <button onClick={() => onRemove(i)} style={btn({ danger: true, small: true })}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onAdd} style={{ ...btn(), marginTop: 14 }}>+ Agregar próxima</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Compromisos
// ---------------------------------------------------------------------------

function TabCompromisos({ compromisos, onUpdate, onRemove, onAdd }: {
  compromisos: Compromiso[];
  onUpdate: (i: number, patch: Partial<Compromiso>) => void;
  onRemove: (i: number) => void;
  onAdd: () => void;
}) {
  return (
    <div>
      <div style={{ marginBottom: 20, padding: '12px 16px', border: '1px solid #1a1a1a', background: '#080808', fontSize: 10, color: '#8A8A8A', letterSpacing: '0.1em' }}>
        Los compromisos se muestran siempre en /transparencia. Sin candado adicional.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {compromisos.map((c, i) => (
          <div key={c._id ?? i} style={{ border: '1px solid #1a1a1a', background: '#080808', padding: 18 }}>
            <div style={{ marginBottom: 10 }}>
              <FieldLabel>Título</FieldLabel>
              <input value={c.titulo} onChange={e => onUpdate(i, { titulo: e.target.value })} placeholder="Publicamos solo números reales" style={input()} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <FieldLabel>Cuerpo</FieldLabel>
              <textarea value={c.cuerpo} onChange={e => onUpdate(i, { cuerpo: e.target.value })} placeholder="Descripción del compromiso..." rows={3} style={{ ...input(), resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => onRemove(i)} style={btn({ danger: true })}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onAdd} style={{ ...btn(), marginTop: 14 }}>+ Agregar compromiso</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Micro-components
// ---------------------------------------------------------------------------

function ToggleChip({ label, active, color, onChange }: {
  label: string;
  active: boolean;
  color: string;
  onChange: (val: boolean) => void;
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', userSelect: 'none' }}>
      <input
        type="checkbox"
        checked={active}
        onChange={e => onChange(e.target.checked)}
        style={{ accentColor: color }}
      />
      <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: active ? color : '#3A3A3A', transition: 'color .15s' }}>
        {label}
      </span>
    </label>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 8, letterSpacing: '0.18em', color: '#3A3A3A', textTransform: 'uppercase', marginBottom: 4 }}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Style helpers
// ---------------------------------------------------------------------------

const labelStyle: CSSProperties = {
  fontSize: 9,
  letterSpacing: '0.26em',
  color: '#5A5A5A',
  textTransform: 'uppercase',
  marginBottom: 6,
};

function btn(opts: { accent?: boolean; danger?: boolean; small?: boolean } = {}): CSSProperties {
  return {
    fontSize: 9,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: opts.small ? '6px 10px' : '9px 18px',
    background: 'transparent',
    border: `1px solid ${opts.danger ? '#B85450' : opts.accent ? '#C9A96E' : '#252525'}`,
    color: opts.danger ? '#B85450' : opts.accent ? '#C9A96E' : '#8A8A8A',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'opacity .15s',
  };
}

function input(extra: CSSProperties = {}): CSSProperties {
  return {
    width: '100%',
    background: '#060606',
    border: '1px solid #252525',
    color: '#F5F5F5',
    fontFamily: 'inherit',
    fontSize: 11,
    padding: '8px 10px',
    outline: 'none',
    boxSizing: 'border-box',
    ...extra,
  };
}
