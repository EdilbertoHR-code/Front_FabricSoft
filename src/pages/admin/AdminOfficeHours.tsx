import { useState, useEffect } from 'react';
import { useAuthApi } from '../../config/api';

interface Booking {
  _id: string;
  nombre: string;
  cargo?: string;
  empresa: string;
  email: string;
  revenue?: string;
  iniciativaOracle?: string;
  plazo?: string;
  dia: string;
  slot: string;
  status: 'pendiente' | 'confirmado' | 'cancelado';
  emailEnviado?: boolean;
  calendarEnviado?: boolean;
  calendarEventId?: string;
  notas?: string;
  tracking?: { sourceSection?: string; interactionType?: string; pagePath?: string; referrer?: string; locale?: string };
  createdAt: string;
}

const STATUS_COLOR: Record<string, string> = {
  pendiente:  '#C9A96E',
  confirmado: '#4ade80',
  cancelado:  '#B85450',
};
const STATUS_LABEL: Record<string, string> = {
  pendiente:  'Pendiente',
  confirmado: 'Confirmado',
  cancelado:  'Cancelado',
};

export default function AdminOfficeHours() {
  const adminApi = useAuthApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [saving, setSaving]     = useState(false);
  const [savedId, setSavedId]   = useState<string | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    adminApi.get('/office-hours/admin')
      .then(res => setBookings(res.data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchBookings();   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatus = async (id: string, status: Booking['status']) => {
    setSaving(true);
    try {
      const res = await adminApi.patch(`/office-hours/admin/${id}/status`, { status });
      const updated = res.data.data as Booking;
      setBookings(prev => prev.map(b => b._id === id ? { ...b, ...updated } : b));
      setSelected(prev => prev?._id === id ? { ...prev, ...updated } : prev);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2000);
      if (status === 'confirmado') {
        setTimeout(async () => {
          try {
            const refresh = await adminApi.get('/office-hours/admin');
            const next = (refresh.data.data ?? []) as Booking[];
            setBookings(next);
            setSelected(prev => prev ? next.find(b => b._id === prev._id) ?? prev : prev);
          } catch { /* ignore */ }
        }, 2500);
      }
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const handleRetry = async (id: string, type: 'email' | 'calendar') => {
    setSaving(true);
    try {
      const endpoint = type === 'email' ? 'retry-email' : 'retry-calendar';
      const res = await adminApi.post(`/office-hours/admin/${id}/${endpoint}`);
      const updated = res.data.data as Booking;
      setBookings(prev => prev.map(b => b._id === id ? { ...b, ...updated } : b));
      setSelected(prev => prev?._id === id ? { ...prev, ...updated } : prev);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2000);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: '2-digit' });

  const pendiente  = bookings.filter(b => b.status === 'pendiente').length;
  const confirmado = bookings.filter(b => b.status === 'confirmado').length;
  const cancelado  = bookings.filter(b => b.status === 'cancelado').length;

  return (
    <div className="fabric-admin-page">
      <div className="fabric-admin-hero">
        <div className="fabric-admin-hero-inner">
          <div>
            <div className="fabric-admin-eyebrow">FABRIC · ADMIN · OFFICE HOURS</div>
            <h1 className="fabric-admin-title">Office Hours</h1>
            <div className="fabric-admin-subtitle">Reservas calificadas · criterios de admision · email y calendar status listos para seguimiento.</div>
          </div>
          <span className="fabric-admin-pill">
            {pendiente} pendiente · {confirmado} confirmado · {cancelado} cancelado
          </span>
        </div>
      </div>

      <div style={{ padding: '12px 36px', borderBottom: '1px solid #1a1a1a', background: 'rgba(201,169,110,0.04)' }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: '#C9A96E', textTransform: 'uppercase' }}>
          ◆ Sesiones 30 min · Solo prospectos calificados · Correo corporativo obligatorio
        </span>
      </div>

      <div className="fabric-admin-content" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {loading ? (
          <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.16em' }}>Cargando reservas...</div>
        ) : bookings.length === 0 ? (
          <div style={{ fontSize: 11, color: '#5A5A5A', padding: '40px 0' }}>Sin reservas registradas todavía.</div>
        ) : (
          bookings.map(b => (
            <BookingRow
              key={b._id}
              booking={b}
              isSelected={selected?._id === b._id}
              justSaved={savedId === b._id}
              onSelect={() => setSelected(b)}
              fmt={fmt}
            />
          ))
        )}
      </div>

      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}
        >
          <div className="admin-detail-panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#5A5A5A', textTransform: 'uppercase' }}>
                Reserva · {fmt(selected.createdAt)}
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5A5A', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>

            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 20, color: '#F5F5F5', marginBottom: 4 }}>
              {selected.nombre}
            </div>
            <div style={{ fontSize: 11, color: '#8A8A8A', marginBottom: 20 }}>{selected.empresa}</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {([
                ['Email',   selected.email],
                ['Cargo',   selected.cargo || 'No especificado'],
                ['Revenue', selected.revenue || 'No especificado'],
                ['Iniciativa', selected.iniciativaOracle || 'No especificado'],
                ['Plazo',   selected.plazo || 'No especificado'],
                ['Día',     selected.dia],
                ['Horario', selected.slot],
                ['Estado',  STATUS_LABEL[selected.status]],
                ['Email confirmacion', selected.emailEnviado ? 'Enviado' : 'No enviado'],
                ['Calendar', selected.calendarEnviado ? 'Creado' : 'No creado'],
                ['Origen', [selected.tracking?.sourceSection, selected.tracking?.interactionType].filter(Boolean).join(' · ') || 'Sin tracking'],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: 12 }}>
                  <span style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ fontSize: 11, color: k === 'Estado' ? STATUS_COLOR[selected.status] : (k === 'Email confirmacion' && !selected.emailEnviado) || (k === 'Calendar' && !selected.calendarEnviado) ? '#B85450' : '#F5F5F5' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {selected.status !== 'confirmado' && (
                <button
                  onClick={() => handleStatus(selected._id, 'confirmado')}
                  disabled={saving}
                  style={{ padding: '12px', background: '#C9A96E', border: 'none', color: '#060606', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? 'Guardando...' : 'Confirmar sesión'}
                </button>
              )}
              {selected.status !== 'cancelado' && (
                <button
                  onClick={() => handleStatus(selected._id, 'cancelado')}
                  disabled={saving}
                  style={{ padding: '12px', background: 'transparent', border: '1px solid #B85450', color: '#B85450', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.6 : 1 }}
                >
                  Cancelar reserva
                </button>
              )}
              {selected.status === 'confirmado' && !selected.calendarEnviado && (
                <button
                  onClick={() => handleRetry(selected._id, 'calendar')}
                  disabled={saving}
                  style={{ padding: '12px', background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? 'Guardando...' : 'Reintentar Calendar'}
                </button>
              )}
              {selected.status === 'confirmado' && !selected.emailEnviado && (
                <button
                  onClick={() => handleRetry(selected._id, 'email')}
                  disabled={saving}
                  style={{ padding: '12px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? 'Guardando...' : 'Reintentar email'}
                </button>
              )}
              {selected.status === 'cancelado' && (
                <button
                  onClick={() => handleStatus(selected._id, 'pendiente')}
                  disabled={saving}
                  style={{ padding: '12px', background: 'transparent', border: '1px solid #252525', color: '#5A5A5A', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', opacity: saving ? 0.6 : 1 }}
                >
                  Restaurar a pendiente
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingRow({
  booking, isSelected, justSaved, onSelect, fmt,
}: {
  booking: Booking;
  isSelected: boolean;
  justSaved: boolean;
  onSelect: () => void;
  fmt: (iso: string) => string;
}) {
  const borderColor = justSaved
    ? '#4ade8055'
    : isSelected
      ? '#C9A96E'
      : STATUS_COLOR[booking.status] + '33';

  return (
    <div
      className="admin-booking-row"
      onClick={onSelect}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }}>
        <div style={{ minWidth: 120 }}>
          <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>{booking.dia}</div>
          <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 15, color: '#F5F5F5' }}>{booking.slot}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#F5F5F5' }}>{booking.nombre}</div>
          <div style={{ fontSize: 9, color: '#8A8A8A' }}>{booking.empresa}{booking.cargo ? ` · ${booking.cargo}` : ''}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${STATUS_COLOR[booking.status]}44`, color: STATUS_COLOR[booking.status], background: STATUS_COLOR[booking.status] + '10' }}>
          {STATUS_LABEL[booking.status]}
        </span>
        {booking.status === 'confirmado' && (
          <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${booking.emailEnviado ? '#4ade8044' : '#B8545044'}`, color: booking.emailEnviado ? '#4ade80' : '#B85450', background: booking.emailEnviado ? '#4ade8010' : '#B8545010' }}>
            {booking.emailEnviado ? 'Email ok' : 'Email pendiente'}
          </span>
        )}
        {booking.status === 'confirmado' && (
          <span style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${booking.calendarEnviado ? '#4ade8044' : '#B8545044'}`, color: booking.calendarEnviado ? '#4ade80' : '#B85450', background: booking.calendarEnviado ? '#4ade8010' : '#B8545010' }}>
            {booking.calendarEnviado ? 'Calendar ok' : 'Calendar pendiente'}
          </span>
        )}
        <span style={{ fontSize: 9, color: '#5A5A5A' }}>{fmt(booking.createdAt)}</span>
        <span style={{ fontSize: 10, color: '#3A3A3A' }}>Abrir →</span>
      </div>
    </div>
  );
}
