import { useState } from 'react';
import { useFabric } from '../../store/FabricContext';
import type { OfficeHoursSlot } from '../../store/fabricStore';

export default function AdminOfficeHours() {
  const { store, confirmarSlot, liberarSlot } = useFabric();
  const slots = store.officeHours;

  const [selected, setSelected] = useState<OfficeHoursSlot | null>(null);
  const [saved, setSaved] = useState(false);

  const ocupados   = slots.filter(s => !s.disponible).length;
  const disponibles = slots.filter(s => s.disponible).length;
  const confirmados = slots.filter(s => s.confirmado).length;

  const handleLiberar = (id: string) => {
    liberarSlot(id);
    setSelected(null);
  };

  const handleConfirmar = (id: string) => {
    confirmarSlot(id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Actualiza el panel si está abierto
    const updated = store.officeHours.find(s => s.id === id);
    if (updated) setSelected({ ...updated, confirmado: true });
  };

  return (
    <>
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · OFFICE HOURS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Office Hours
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#5A5A5A' }}>
            {ocupados} ocupados · {disponibles} disponibles · {confirmados} confirmados
          </span>
          {saved && (
            <span style={{ fontSize: 9, letterSpacing: '0.16em', color: '#4ade80', textTransform: 'uppercase' }}>
              ✓ Confirmado
            </span>
          )}
        </div>
      </div>

      {/* Regla del brief */}
      <div style={{ padding: '12px 36px', borderBottom: '1px solid #1a1a1a', background: 'rgba(201,169,110,0.04)' }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: '#C9A96E', textTransform: 'uppercase' }}>
          ◆ 4 slots disponibles por mes · Sesiones de 30 min · Solo prospectos calificados
        </span>
      </div>

      {/* Grid de slots */}
      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {slots.map(slot => (
          <SlotRow
            key={slot.id}
            slot={slot}
            onSelect={() => setSelected(slot)}
            isSelected={selected?.id === slot.id}
          />
        ))}
      </div>

      {/* Panel de detalle */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="admin-detail-panel"
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                Detalle del slot
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5A5A', cursor: 'pointer', fontSize: 16 }}>
                ×
              </button>
            </div>

            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 22, color: '#F5F5F5', marginBottom: 4 }}>
              {selected.fecha}
            </div>

            {selected.disponible ? (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 12 }}>
                  Slot disponible
                </div>
                <p style={{ fontSize: 11, color: '#8A8A8A', marginBottom: 20 }}>
                  Este slot no tiene reserva. Se activa cuando un prospecto lo solicita desde el sitio.
                </p>
              </div>
            ) : (
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  ['Solicitante', selected.reservadoPor ?? '—'],
                  ['Empresa',    selected.empresa ?? '—'],
                  ['Email',      selected.email ?? '—'],
                  ['Estado',     selected.confirmado ? 'Confirmado' : 'Pendiente de confirmación'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: 12 }}>
                    <span style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{k}</span>
                    <span style={{ fontSize: 11, color: v === 'Confirmado' ? '#4ade80' : '#F5F5F5' }}>{v}</span>
                  </div>
                ))}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                  {!selected.confirmado && (
                    <button
                      onClick={() => handleConfirmar(selected.id)}
                      style={{
                        padding: '12px', background: '#C9A96E', border: 'none',
                        color: '#060606', fontSize: 9, fontWeight: 700,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      Confirmar sesión
                    </button>
                  )}
                  <button
                    onClick={() => handleLiberar(selected.id)}
                    style={{
                      padding: '12px', background: 'transparent',
                      border: '1px solid #B85450', color: '#B85450',
                      fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    Liberar slot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SlotRow({
  slot,
  onSelect,
  isSelected,
}: {
  slot: OfficeHoursSlot;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const borderColor = isSelected
    ? '#C9A96E'
    : slot.confirmado
      ? '#4ade8033'
      : slot.disponible
        ? '#1e1e1e'
        : '#C9A96E33';

  return (
    <div
      onClick={onSelect}
      style={{
        background: '#0F0F0F',
        border: `1px solid ${borderColor}`,
        padding: '20px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        cursor: 'pointer', transition: 'border-color .15s',
      }}
      onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.borderColor = '#C9A96E55'; }}
      onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.borderColor = borderColor; }}
    >
      {/* Fecha */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
        <div>
          <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 16, color: '#F5F5F5' }}>
            {slot.fecha}
          </div>
        </div>

        {/* Info reserva */}
        {!slot.disponible && (
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2 }}>Solicitante</div>
              <div style={{ fontSize: 11, color: '#F5F5F5' }}>{slot.reservadoPor}</div>
            </div>
            <div>
              <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2 }}>Empresa</div>
              <div style={{ fontSize: 11, color: '#8A8A8A' }}>{slot.empresa}</div>
            </div>
          </div>
        )}
      </div>

      {/* Badge estado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{
          fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px',
          border: `1px solid ${slot.confirmado ? '#4ade8044' : slot.disponible ? '#25252544' : '#C9A96E44'}`,
          color: slot.confirmado ? '#4ade80' : slot.disponible ? '#5A5A5A' : '#C9A96E',
          background: slot.confirmado ? '#4ade8010' : slot.disponible ? 'transparent' : '#C9A96E10',
        }}>
          {slot.confirmado ? 'Confirmado' : slot.disponible ? 'Disponible' : 'Reservado'}
        </span>
        <span style={{ fontSize: 10, color: '#3A3A3A' }}>Abrir →</span>
      </div>
    </div>
  );
}
