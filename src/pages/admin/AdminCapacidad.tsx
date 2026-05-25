import { useFabric, useCapacidad } from '../../store/FabricContext';
import { countSlots } from '../../store/fabricStore';
import { useState } from 'react';

const SLOT_COLOR: Record<string, string> = {
  activo:    '#C9A96E',
  reservado: '#4a4a30',
  libre:     '#1a1a1a',
};

export default function AdminCapacidad() {
  const { setAdmissionOpen, cycleSlot } = useFabric();
  const { slots, waitlist, admissionOpen, admissionQuarters } = useCapacidad();
  const [saved, setSaved] = useState(false);

  const { activos, reservados, libres } = countSlots(slots);

  return (
    <>
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
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            style={{
              padding: '9px 22px',
              background: saved ? 'rgba(74,222,128,0.1)' : '#C9A96E',
              border: saved ? '1px solid #4ade80' : 'none',
              color: saved ? '#4ade80' : '#060606',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Grid de slots */}
        <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '28px 32px' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: 8 }}>
            Slots · capacidad Q3 2026
          </div>
          <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.14em', marginBottom: 24 }}>
            Click en un slot para cambiar su estado (Activo → Reservado → Libre). Se sincroniza con S15 y Métricas automáticamente.
          </div>
          <div style={{ fontSize: 8, color: '#3A3A3A', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
            12 proyectos simultáneos · máximo
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {slots.map((s, i) => (
              <div
                key={i}
                title={`Slot ${i + 1} · ${s}`}
                onClick={() => cycleSlot(i)}
                style={{
                  width: 44, height: 44,
                  background: SLOT_COLOR[s],
                  border: `1px solid ${s === 'activo' ? '#C9A96E' : s === 'reservado' ? '#6b5a2c' : '#252525'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, color: s === 'activo' ? '#060606' : '#5A5A5A',
                  cursor: 'pointer', fontWeight: 700, transition: 'all .15s',
                  userSelect: 'none',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {(['activo', 'reservado', 'libre'] as const).map(s => (
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

          {/* Wait list */}
          <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '24px 28px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase', marginBottom: 20 }}>
              Wait list · {waitlist.length} organizaciones
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
                  {waitlist.map(w => (
                    <tr key={w.rank} style={{ borderBottom: '1px solid #111' }}>
                      <td style={{ padding: '10px 12px', fontSize: 9, color: '#5A5A5A' }}>{w.rank}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: 11, color: '#F5F5F5' }}>{w.company}</div>
                        <div style={{ fontSize: 9, color: '#5A5A5A' }}>{w.contact}</div>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 9, color: '#8A8A8A' }}>{w.industry}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 16, fontStyle: 'italic', color: '#C9A96E' }}>
                          {w.score}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 9, color: '#5A5A5A' }}>{w.since}</td>
                      <td style={{ padding: '10px 12px', fontSize: 9, color: '#C9A96E', cursor: 'pointer' }}>Invitar →</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ciclo de admisión */}
          <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase' }}>
              Ciclo de admisión 2026
            </div>
            {admissionQuarters.map(q => (
              <div
                key={q.quarter}
                style={{ borderLeft: `2px solid ${q.status === 'open' ? '#C9A96E' : '#252525'}`, paddingLeft: 14 }}
              >
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
                Admisión Q3 2026
              </div>
              <button
                onClick={() => setAdmissionOpen(!admissionOpen)}
                style={{
                  width: '100%', padding: '10px', cursor: 'pointer', fontFamily: 'inherit',
                  background: admissionOpen ? 'rgba(74,222,128,0.08)' : 'rgba(90,90,90,0.08)',
                  border: `1px solid ${admissionOpen ? '#4ade80' : '#252525'}`,
                  color: admissionOpen ? '#4ade80' : '#5A5A5A',
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
                }}
              >
                {admissionOpen ? '● Abierta' : '○ Cerrada'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
