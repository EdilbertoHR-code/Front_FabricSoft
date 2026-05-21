import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useFabric } from '../../store/FabricContext';
import type { Lead, LeadStatus } from '../../store/fabricStore';

const STATUS_COLOR: Record<LeadStatus, string> = {
  Nuevo:     '#C9A96E',
  Aprobado:  '#4ade80',
  WaitList:  '#60a5fa',
  Revisión:  '#fbbf24',
  Rechazado: '#B85450',
};

const FILTERS: Array<LeadStatus | 'Todos'> = ['Todos', 'Nuevo', 'Revisión', 'Aprobado', 'WaitList', 'Rechazado'];
const INDUSTRIES = ['Todas', 'Financiero', 'Inmobiliario', 'Logística'];

export default function AdminLeads() {
  const { store, updateLeadStatus, updateLeadNotas } = useFabric();
  const leads = store.leads;

  const [filter, setFilter]     = useState<LeadStatus | 'Todos'>('Todos');
  const [industry, setIndustry] = useState('Todas');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notasEdit, setNotasEdit] = useState('');

  const visible = leads.filter(l => {
    const statusOk   = filter === 'Todos' || l.status === filter;
    const industryOk = industry === 'Todas' || l.industry === industry;
    return statusOk && industryOk;
  });

  const openDetail = (lead: Lead) => {
    setSelected(lead);
    setNotasEdit(lead.notas ?? '');
  };

  const handleStatusChange = (id: string, status: LeadStatus) => {
    updateLeadStatus(id, status);
    // Refleja el cambio en el panel si está abierto
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const handleSaveNotas = () => {
    if (!selected) return;
    updateLeadNotas(selected.id, notasEdit);
    setSelected(prev => prev ? { ...prev, notas: notasEdit } : null);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · LEADS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Leads · {leads.length} en evaluación
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '9px 18px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', cursor: 'pointer', fontFamily: 'inherit' }}>
            Exportar CSV
          </button>
          <button style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '9px 18px', background: '#C9A96E', border: 'none', color: '#060606', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700 }}>
            + Nuevo manual
          </button>
        </div>
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
            {ind}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div style={{ padding: '0 36px 36px' }}>
        <div className="admin-table-wrap">
          <table style={{ borderCollapse: 'collapse' }}>
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
                  key={lead.id}
                  style={{ borderBottom: '1px solid #111', cursor: 'pointer', transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0F0F0F')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => openDetail(lead)}
                >
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#5A5A5A' }}>{lead.date}</td>
                  <td style={{ padding: '13px 16px', fontSize: 11, color: '#F5F5F5', fontWeight: 500 }}>{lead.company}</td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.cargo}</td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.industry}</td>
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
        </div>
      </div>

      {/* Panel de detalle */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}
        >
          <div className="admin-detail-panel" onClick={e => e.stopPropagation()} style={{ overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#5A5A5A', textTransform: 'uppercase' }}>Detalle del lead</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5A5A', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>

            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 24, color: '#F5F5F5', marginBottom: 4 }}>{selected.company}</div>
            <div style={{ fontSize: 10, color: '#8A8A8A', marginBottom: 20 }}>{selected.nombre} · {selected.cargo}</div>

            {/* Score */}
            <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>Score FABRIC</div>
              <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 52, fontStyle: 'italic', color: '#C9A96E' }}>{selected.score}</div>
            </div>

            {/* Campos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                ['Industria',  selected.industry],
                ['Revenue',    selected.revenue],
                ['Iniciativa', selected.iniciativa],
                ['Plazo',      selected.plazo],
                ['Email',      selected.email],
                ['Fuente',     selected.source],
                ['Fecha',      selected.date],
              ].map(([k, v]) => (
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
                    border: `1px solid ${STATUS_COLOR[h.estado]}33`,
                    color: STATUS_COLOR[h.estado],
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
                    onClick={() => handleStatusChange(selected.id, s)}
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
                  onClick={() => handleStatusChange(selected.id, 'Rechazado')}
                  style={{ padding: '10px', background: 'transparent', border: '1px solid #B85450', color: '#B85450', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Rechazar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
