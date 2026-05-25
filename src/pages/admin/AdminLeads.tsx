import { useState, useEffect } from 'react';
import { useAuthApi } from '../../config/api';

type LeadStatus = 'Nuevo' | 'Aprobado' | 'WaitList' | 'Revisión' | 'Rechazado';

interface HistorialEntry {
  fecha: string;
  estado: string;
  autor: string;
}

interface Lead {
  _id: string;
  nombre: string;
  cargo: string;
  empresa: string;
  revenue: string;
  email: string;
  industria: string;
  iniciativa: string;
  plazo: string;
  source: string;
  score: number;
  status: LeadStatus;
  notas: string;
  historial: HistorialEntry[];
  queryChat?: string;
  createdAt: string;
}

const STATUS_COLOR: Record<LeadStatus, string> = {
  Nuevo:     '#C9A96E',
  Aprobado:  '#4ade80',
  WaitList:  '#60a5fa',
  Revisión:  '#fbbf24',
  Rechazado: '#B85450',
};

const FILTERS: Array<LeadStatus | 'Todos'> = ['Todos', 'Nuevo', 'Revisión', 'Aprobado', 'WaitList', 'Rechazado'];
const INDUSTRIES = ['Todas', 'financiero', 'inmobiliario', 'logistica'];
const INDUSTRY_LABEL: Record<string, string> = {
  financiero: 'Financiero',
  inmobiliario: 'Inmobiliario',
  logistica: 'Logística',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminLeads() {
  const adminApi = useAuthApi();
  const [leads, setLeads]         = useState<Lead[]>([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<LeadStatus | 'Todos'>('Todos');
  const [industry, setIndustry]   = useState('Todas');
  const [source, setSource]       = useState('Todos');
  const [selected, setSelected]   = useState<Lead | null>(null);
  const [notasEdit, setNotasEdit] = useState('');
  const [updating, setUpdating]   = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchLeads();   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await adminApi.get('/leads/admin');
      setLeads(res.data.data);
      setTotal(res.data.total);
    } catch {
      console.error('Error cargando leads');
    } finally {
      setLoading(false);
    }
  }

  const visible = leads.filter(l => {
    const statusOk   = filter === 'Todos' || l.status === filter;
    const industryOk = industry === 'Todas' || l.industria === industry;
    const sourceOk   = source === 'Todos' || l.source === source;
    return statusOk && industryOk && sourceOk;
  });

  const openDetail = (lead: Lead) => {
    setSelected(lead);
    setNotasEdit(lead.notas ?? '');
  };

  async function handleStatusChange(id: string, status: LeadStatus) {
    setUpdating(id);
    try {
      const res = await adminApi.patch(`/leads/admin/${id}/status`, { status });
      const updated: Lead = res.data.data;
      setLeads(prev => prev.map(l => l._id === id ? updated : l));
      if (selected?._id === id) setSelected(updated);
    } catch {
      console.error('Error actualizando status');
    } finally {
      setUpdating(null);
    }
  }

  async function handleSaveNotas() {
    if (!selected) return;
    setUpdating(selected._id);
    try {
      const res = await adminApi.patch(`/leads/admin/${selected._id}/notas`, { notas: notasEdit });
      const updated: Lead = res.data.data;
      setLeads(prev => prev.map(l => l._id === selected._id ? updated : l));
      setSelected(updated);
    } catch {
      console.error('Error guardando notas');
    } finally {
      setUpdating(null);
    }
  }

  return (
      <>
      {/* Header */}
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · LEADS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Leads · {total} en evaluación
          </div>
        </div>
        <button
          onClick={fetchLeads}
          style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '9px 18px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Actualizar
        </button>
      </div>

      {/* Filtros */}
      <div style={{ padding: '20px 36px', display: 'flex', gap: 24, borderBottom: '1px solid #1a1a1a', flexWrap: 'wrap' }}>
        {FILTERS.map(f => {
          const count = f === 'Todos' ? leads.length : leads.filter(l => l.status === f).length;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px',
              background: filter === f ? 'rgba(201,169,110,0.1)' : 'transparent',
              border: `1px solid ${filter === f ? '#C9A96E' : '#252525'}`,
              color: filter === f ? '#C9A96E' : '#5A5A5A',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {f} · {count}
            </button>
          );
        })}
        <div style={{ width: 1, background: '#1e1e1e' }} />
        {INDUSTRIES.map(ind => (
          <button key={ind} onClick={() => setIndustry(ind)} style={{
            fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px',
            background: 'transparent', border: 'none',
            color: industry === ind ? '#F5F5F5' : '#3A3A3A',
            cursor: 'pointer', fontFamily: 'inherit',
            borderBottom: `1px solid ${industry === ind ? '#C9A96E' : 'transparent'}`,
          }}>
            {ind === 'Todas' ? 'Todas' : INDUSTRY_LABEL[ind]}
          </button>
        ))}
        <div style={{ width: 1, background: '#1e1e1e' }} />
        {(['Todos', 'aplicar', 'referencia', 'chat'] as const).map(s => (
          <button key={s} onClick={() => setSource(s)} style={{
            fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px',
            background: 'transparent', border: 'none',
            color: source === s ? '#C9A96E' : '#3A3A3A',
            cursor: 'pointer', fontFamily: 'inherit',
            borderBottom: `1px solid ${source === s ? '#C9A96E' : 'transparent'}`,
          }}>
            {s === 'Todos' ? 'Todas fuentes' : s}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div style={{ padding: '0 36px 36px', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '48px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>Cargando...</div>
        ) : visible.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>Sin leads con este filtro.</div>
        ) : (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                {['Fecha', 'Compañía', 'Cargo', 'Industria', 'Revenue', 'Iniciativa', 'Score', 'Fuente', 'Estado', ''].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 8, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(lead => (
                <tr
                  key={lead._id}
                  style={{ borderBottom: '1px solid #111', cursor: 'pointer', transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0F0F0F')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => openDetail(lead)}
                >
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#5A5A5A', whiteSpace: 'nowrap' }}>{fmt(lead.createdAt)}</td>
                  <td style={{ padding: '13px 16px', fontSize: 11, color: '#F5F5F5', fontWeight: 500 }}>{lead.empresa}</td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.cargo}</td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{INDUSTRY_LABEL[lead.industria] ?? lead.industria}</td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.revenue}</td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#5A5A5A', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lead.iniciativa}
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 17, fontStyle: 'italic', color: '#C9A96E' }}>
                      {lead.score}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 9, color: '#5A5A5A', letterSpacing: '0.1em' }}>{lead.source}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{
                      fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px',
                      border: `1px solid ${STATUS_COLOR[lead.status]}44`,
                      color: STATUS_COLOR[lead.status],
                      background: `${STATUS_COLOR[lead.status]}10`,
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#5A5A5A' }}>Abrir →</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Panel de detalle */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="admin-slide-panel"
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#5A5A5A', textTransform: 'uppercase' }}>Detalle del lead</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5A5A', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>

            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 24, color: '#F5F5F5', marginBottom: 4 }}>{selected.empresa}</div>
            <div style={{ fontSize: 10, color: '#8A8A8A', marginBottom: 20 }}>{selected.nombre} · {selected.cargo}</div>

            {/* Score */}
            <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Score FABRIC</div>
              <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 52, fontStyle: 'italic', color: '#C9A96E' }}>{selected.score}</div>
            </div>

            {/* Campos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {([
                ['Industria',  INDUSTRY_LABEL[selected.industria] ?? selected.industria],
                ['Revenue',    selected.revenue],
                ['Iniciativa', selected.iniciativa],
                ['Plazo',      selected.plazo],
                ['Email',      selected.email],
                ['Fuente',     selected.source],
                ['Fecha',      fmt(selected.createdAt)],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141414', paddingBottom: 10 }}>
                  <span style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ fontSize: 11, color: '#F5F5F5', maxWidth: 200, textAlign: 'right', wordBreak: 'break-word' }}>{v}</span>
                </div>
              ))}
              {selected.queryChat && (
                <div style={{ borderBottom: '1px solid #141414', paddingBottom: 10 }}>
                  <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Query AI Chat</div>
                  <div style={{ fontSize: 10, color: '#8A8A8A', fontStyle: 'italic' }}>"{selected.queryChat}"</div>
                </div>
              )}
            </div>

            {/* Historial */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Historial</div>
              {selected.historial.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 8, color: '#3A3A3A', minWidth: 60 }}>{h.fecha}</span>
                  <span style={{
                    fontSize: 8, padding: '2px 8px',
                    border: `1px solid ${STATUS_COLOR[h.estado as LeadStatus] ?? '#5A5A5A'}33`,
                    color: STATUS_COLOR[h.estado as LeadStatus] ?? '#5A5A5A',
                  }}>{h.estado}</span>
                  <span style={{ fontSize: 8, color: '#5A5A5A' }}>{h.autor}</span>
                </div>
              ))}
            </div>

            {/* Notas internas */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>Notas internas</div>
              <textarea
                value={notasEdit}
                onChange={e => setNotasEdit(e.target.value)}
                rows={3}
                style={{
                  width: '100%', background: '#060606', border: '1px solid #252525',
                  color: '#F5F5F5', fontFamily: 'inherit', fontSize: 11,
                  padding: '8px 10px', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                }}
              />
              <button
                onClick={handleSaveNotas}
                disabled={updating === selected._id}
                style={{ marginTop: 6, padding: '6px 14px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Guardar notas
              </button>
            </div>

            {/* Acciones de estado */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['Aprobado', 'WaitList', 'Revisión'] as LeadStatus[])
                .filter(s => s !== selected.status)
                .map(s => (
                  <button
                    key={s}
                    disabled={updating === selected._id}
                    onClick={() => handleStatusChange(selected._id, s)}
                    style={{
                      padding: '10px', background: `${STATUS_COLOR[s]}15`,
                      border: `1px solid ${STATUS_COLOR[s]}44`,
                      color: STATUS_COLOR[s],
                      fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    Mover a {s}
                  </button>
                ))}
              {selected.status !== 'Rechazado' && (
                <button
                  disabled={updating === selected._id}
                  onClick={() => handleStatusChange(selected._id, 'Rechazado')}
                  style={{ padding: '10px', background: 'transparent', border: '1px solid #B85450', color: '#B85450', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Rechazar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      </>
  );
}
