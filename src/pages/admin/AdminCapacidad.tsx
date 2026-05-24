import AdminLayout from './AdminLayout';
import { useState, useEffect } from 'react';
import { adminApi } from '../../config/api';

interface Slot { id: number; status: 'disponible' | 'activo' | 'reservado'; }
interface WaitlistLead {
  _id: string; nombre: string; cargo: string; empresa: string;
  industria: string; score: number; createdAt: string;
}

const SLOT_BG: Record<string, string>     = { activo: '#C9A96E', reservado: '#4a4a30', disponible: '#1a1a1a' };
const SLOT_BORDER: Record<string, string> = { activo: '#C9A96E', reservado: '#6b5a2c', disponible: '#252525' };
const SLOT_TEXT: Record<string, string>   = { activo: '#060606', reservado: '#8A8A8A', disponible: '#5A5A5A' };
const NEXT_STATUS: Record<string, Slot['status']> = {
  disponible: 'activo',
  activo:     'reservado',
  reservado:  'disponible',
};

const ADMISSION_QUARTERS = [
  { quarter: 'Q1 2026', status: 'closed',   description: '3 proyectos aceptados',      deadline: '○ Completo'       },
  { quarter: 'Q2 2026', status: 'closed',   description: '2 proyectos aceptados',      deadline: '○ Completo'       },
  { quarter: 'Q3 2026', status: 'open',     description: 'Evaluando aplicaciones',     deadline: 'Plazo · 30 julio' },
  { quarter: 'Q4 2026', status: 'upcoming', description: 'Aplicaciones desde 01 sept', deadline: '○ Próximo'        },
];

export default function AdminCapacidad() {
  const [slots, setSlots]                 = useState<Slot[]>([]);
  const [waitlist, setWaitlist]           = useState<WaitlistLead[]>([]);
  const [deadlineQ3, setDeadlineQ3]       = useState('');
  const [deadlineDraft, setDeadlineDraft] = useState('');
  const [loading, setLoading]             = useState(true);
  const [savingDeadline, setSavingDeadline] = useState(false);
  const [savedDeadline, setSavedDeadline]   = useState(false);

  useEffect(() => {
    Promise.all([
      adminApi.get('/capacidad'),
      adminApi.get('/leads/admin?status=WaitList'),
    ]).then(([capRes, leadsRes]) => {
      setSlots(capRes.data.data.slots ?? []);
      const dl = capRes.data.data.deadlineQ3 ?? '';
      setDeadlineQ3(dl);
      setDeadlineDraft(dl);
      setWaitlist(leadsRes.data.data ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cycleSlot = async (slot: Slot) => {
    const next = NEXT_STATUS[slot.status];
    setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, status: next } : s));
    try {
      await adminApi.patch(`/capacidad/slot/${slot.id}`, { status: next });
    } catch {
      setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, status: slot.status } : s));
    }
  };

  const saveDeadline = async () => {
    setSavingDeadline(true);
    try {
      await adminApi.put('/capacidad', { deadlineQ3: deadlineDraft });
      setDeadlineQ3(deadlineDraft);
      setSavedDeadline(true);
      setTimeout(() => setSavedDeadline(false), 2000);
    } catch { /* ignore */ }
    finally { setSavingDeadline(false); }
  };

  const activos    = slots.filter(s => s.status === 'activo').length;
  const reservados = slots.filter(s => s.status === 'reservado').length;
  const libres     = slots.filter(s => s.status === 'disponible').length;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });

  return (
    <AdminLayout>
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · CAPACIDAD
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Capacidad operativa
          </div>
        </div>
        {!loading && (
          <span style={{ fontSize: 10, color: '#5A5A5A' }}>
            {activos} activos · {reservados} reservados · {libres} disponibles
          </span>
        )}
      </div>

      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Grid de slots */}
        <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '28px 32px' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: 8 }}>
            Slots · capacidad Q3 2026
          </div>
          <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.14em', marginBottom: 24 }}>
            Click para rotar estado: Disponible → Activo → Reservado. Se sincroniza con S15.
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {loading ? (
              <div style={{ fontSize: 9, color: '#5A5A5A' }}>Cargando slots...</div>
            ) : slots.map(s => (
              <div
                key={s.id}
                title={`Slot ${s.id} · ${s.status}`}
                onClick={() => cycleSlot(s)}
                style={{ width: 44, height: 44, background: SLOT_BG[s.status], border: `1px solid ${SLOT_BORDER[s.status]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: SLOT_TEXT[s.status], cursor: 'pointer', fontWeight: 700, transition: 'all .15s', userSelect: 'none' }}
              >
                {s.id}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {(['activo', 'reservado', 'disponible'] as const).map(st => (
              <div key={st} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, background: SLOT_BG[st], border: `1px solid ${SLOT_BORDER[st]}` }} />
                <span style={{ fontSize: 8, letterSpacing: '0.16em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                  {st.charAt(0).toUpperCase() + st.slice(1)} · {slots.filter(x => x.status === st).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wait list + Admisión */}
        <div className="admin-cap-grid">

          {/* Wait list real */}
          <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '24px 28px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: 20 }}>
              Wait list · {waitlist.length} leads en espera
            </div>
            <div className="admin-table-wrap">
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                    {['Empresa', 'Contacto', 'Sector', 'Score', 'Desde'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 7, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {waitlist.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '20px 12px', fontSize: 9, color: '#5A5A5A' }}>
                        Sin leads en WaitList.
                      </td>
                    </tr>
                  ) : waitlist.map(w => (
                    <tr key={w._id} style={{ borderBottom: '1px solid #111' }}>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 11, color: '#F5F5F5' }}>{w.empresa}</div>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 11, color: '#F5F5F5' }}>{w.nombre}</div>
                        <div style={{ fontSize: 9, color: '#5A5A5A' }}>{w.cargo}</div>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 9, color: '#8A8A8A' }}>{w.industria}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 16, fontStyle: 'italic', color: '#C9A96E' }}>
                          {w.score}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 9, color: '#5A5A5A' }}>{fmt(w.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ciclo de admisión + deadline editable */}
          <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase' }}>
              Ciclo de admisión 2026
            </div>
            {ADMISSION_QUARTERS.map(q => (
              <div key={q.quarter} style={{ borderLeft: `2px solid ${q.status === 'open' ? '#C9A96E' : '#252525'}`, paddingLeft: 14 }}>
                <div style={{ fontSize: 10, color: q.status === 'open' ? '#F5F5F5' : '#5A5A5A', marginBottom: 4 }}>
                  {q.quarter}
                </div>
                <div style={{ fontSize: 9, color: q.status === 'open' ? '#8A8A8A' : '#3A3A3A' }}>
                  {q.description}
                </div>
                <div style={{ fontSize: 8, color: q.status === 'open' ? '#C9A96E' : '#3A3A3A', marginTop: 4, letterSpacing: '0.12em' }}>
                  {q.deadline}
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
              <div style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 10 }}>
                Deadline Q3 (ISO · visible en countdown)
              </div>
              <input
                value={deadlineDraft}
                onChange={e => setDeadlineDraft(e.target.value)}
                placeholder="2026-07-30T23:59:59-06:00"
                style={{ width: '100%', background: '#060606', border: '1px solid #252525', color: '#F5F5F5', fontFamily: 'inherit', fontSize: 10, padding: '8px 10px', outline: 'none', boxSizing: 'border-box', marginBottom: 8 }}
              />
              <button
                onClick={saveDeadline}
                disabled={savingDeadline || deadlineDraft === deadlineQ3}
                style={{
                  width: '100%', padding: '10px', cursor: deadlineDraft === deadlineQ3 ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  background: savedDeadline ? 'rgba(74,222,128,0.08)' : deadlineDraft !== deadlineQ3 ? '#C9A96E' : 'rgba(90,90,90,0.08)',
                  border: `1px solid ${savedDeadline ? '#4ade80' : deadlineDraft !== deadlineQ3 ? 'transparent' : '#252525'}`,
                  color: savedDeadline ? '#4ade80' : deadlineDraft !== deadlineQ3 ? '#060606' : '#5A5A5A',
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
                  opacity: savingDeadline ? 0.6 : 1,
                }}
              >
                {savedDeadline ? '✓ Guardado' : savingDeadline ? 'Guardando...' : 'Guardar deadline'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
