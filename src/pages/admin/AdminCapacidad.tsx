import { useState } from 'react';
import AdminLayout from './AdminLayout';

const MAX_SLOTS = 12;
type SlotStatus = 'activo' | 'reservado' | 'libre';

const INITIAL_SLOTS: SlotStatus[] = [
  'activo','activo','activo','activo','activo','activo','activo','activo','activo',
  'reservado','reservado','libre',
];

const WAITLIST = [
  { rank: 1, company: 'FinCore Bank',        contact: 'A. Torres CFO', industry: 'Financiero',   score: 91, since: '19 may' },
  { rank: 2, company: 'Capital Seguro',       contact: 'L. Mora CFO',   industry: 'Financiero',   score: 94, since: '16 may' },
  { rank: 3, company: 'Plaza Reforma',        contact: 'I. Díaz Dir.',  industry: 'Inmobiliario', score: 83, since: '12 may' },
  { rank: 4, company: 'Inmobiliaria Mítica',  contact: 'M. Saldívar',   industry: 'Inmobiliario', score: 87, since: '20 may' },
  { rank: 5, company: 'TransLog SA',          contact: 'R. Méndez COO', industry: 'Logística',    score: 82, since: '20 may' },
  { rank: 6, company: 'FlexCargo',            contact: 'G. Salas COO',  industry: 'Logística',    score: 88, since: '14 may' },
  { rank: 7, company: 'Nexo Financiero',      contact: 'H. Cruz CFO',   industry: 'Financiero',   score: 76, since: '13 may' },
];

const SLOT_COLOR: Record<SlotStatus, string> = {
  activo:    '#C9A96E',
  reservado: '#4a4a30',
  libre:     '#1a1a1a',
};

const QUARTERS = [
  { q: 'Q1 2026', status: 'closed',   desc: '3 proyectos aceptados',   deadline: '○ Completo' },
  { q: 'Q2 2026', status: 'closed',   desc: '2 proyectos aceptados',   deadline: '○ Completo' },
  { q: 'Q3 2026', status: 'open',     desc: 'Evaluando aplicaciones',  deadline: 'Plazo · 30 julio' },
  { q: 'Q4 2026', status: 'upcoming', desc: 'Aplic. desde 01 sept',    deadline: '○ Próximo' },
];

export default function AdminCapacidad() {
  const [slots, setSlots] = useState<SlotStatus[]>(INITIAL_SLOTS);
  const [admOpen, setAdmOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  const activos   = slots.filter(s => s === 'activo').length;
  const reservados = slots.filter(s => s === 'reservado').length;
  const libres    = slots.filter(s => s === 'libre').length;

  const cycleSlot = (i: number) => {
    setSlots(prev => {
      const next = [...prev];
      const cycle: SlotStatus[] = ['activo', 'reservado', 'libre'];
      next[i] = cycle[(cycle.indexOf(next[i]) + 1) % 3];
      return next;
    });
    setSaved(false);
  };

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
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#5A5A5A' }}>
            {activos} ocupados · {reservados} reservados · {libres} disponible
          </span>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            style={{
              padding: '9px 22px', background: saved ? 'rgba(74,222,128,0.1)' : '#C9A96E',
              border: saved ? '1px solid #4ade80' : 'none',
              color: saved ? '#4ade80' : '#060606',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
            {saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Slots grid */}
        <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '28px 32px' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: 8 }}>
            Slots · capacidad Q3 2026
          </div>
          <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.14em', marginBottom: 24 }}>
            Click en un slot para cambiar su estado (Activo → Reservado → Libre)
          </div>
          <div style={{ fontSize: 8, color: '#3A3A3A', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
            {MAX_SLOTS} proyectos simultáneos · máximo
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {slots.map((s, i) => (
              <div key={i} title={`Slot ${i + 1} · ${s}`} onClick={() => cycleSlot(i)}
                style={{
                  width: 44, height: 44, background: SLOT_COLOR[s],
                  border: `1px solid ${s === 'activo' ? '#C9A96E' : s === 'reservado' ? '#6b5a2c' : '#252525'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, color: s === 'activo' ? '#060606' : '#5A5A5A',
                  cursor: 'pointer', fontWeight: 700, transition: 'all .15s',
                  userSelect: 'none',
                }}>
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {(['activo', 'reservado', 'libre'] as SlotStatus[]).map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, background: SLOT_COLOR[s], border: `1px solid ${SLOT_COLOR[s]}` }} />
                <span style={{ fontSize: 8, letterSpacing: '0.16em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)} · {slots.filter(x => x === s).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wait list + admisión */}
        <div className="admin-cap-grid">

          <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '24px 28px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: 20 }}>
              Wait list · {WAITLIST.length} organizaciones
            </div>
            <div className="admin-table-wrap">
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {['#', 'Compañía', 'Industria', 'Score', 'Desde', ''].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 7, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WAITLIST.map(w => (
                  <tr key={w.rank} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{ padding: '10px 12px', fontSize: 9, color: '#5A5A5A' }}>{w.rank}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 11, color: '#F5F5F5' }}>{w.company}</div>
                      <div style={{ fontSize: 9, color: '#5A5A5A' }}>{w.contact}</div>
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: 9, color: '#8A8A8A' }}>{w.industry}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 16, fontStyle: 'italic', color: '#C9A96E' }}>{w.score}</span>
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: 9, color: '#5A5A5A' }}>{w.since}</td>
                    <td style={{ padding: '10px 12px', fontSize: 9, color: '#C9A96E', cursor: 'pointer' }}>Invitar →</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase' }}>
              Ciclo de admisión 2026
            </div>
            {QUARTERS.map(q => (
              <div key={q.q} style={{
                borderLeft: `2px solid ${q.status === 'open' ? '#C9A96E' : '#252525'}`,
                paddingLeft: 14,
              }}>
                <div style={{ fontSize: 10, color: q.status === 'open' ? '#F5F5F5' : '#5A5A5A', marginBottom: 4 }}>{q.q}</div>
                <div style={{ fontSize: 9, color: q.status === 'open' ? '#8A8A8A' : '#3A3A3A' }}>{q.desc}</div>
                <div style={{ fontSize: 8, color: q.status === 'open' ? '#C9A96E' : '#3A3A3A', marginTop: 4, letterSpacing: '0.12em' }}>
                  {q.deadline}
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
              <div style={{ fontSize: 8, letterSpacing: '0.18em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 10 }}>
                Admisión Q3 2026
              </div>
              <button onClick={() => setAdmOpen(!admOpen)} style={{
                width: '100%', padding: '10px', cursor: 'pointer', fontFamily: 'inherit',
                background: admOpen ? 'rgba(74,222,128,0.08)' : 'rgba(90,90,90,0.08)',
                border: `1px solid ${admOpen ? '#4ade80' : '#252525'}`,
                color: admOpen ? '#4ade80' : '#5A5A5A',
                fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                {admOpen ? '● Abierta' : '○ Cerrada'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
