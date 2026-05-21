import { useState } from 'react';
import AdminLayout from './AdminLayout';

type Lead = {
  date: string; company: string; contact: string;
  industry: 'Inmobiliario' | 'Financiero' | 'Logística';
  revenue: string; score: number;
  status: 'Nuevo' | 'Revisión' | 'Aprobado' | 'WaitList' | 'Rechazado';
  source: string;
};

const LEADS: Lead[] = [
  { date: '20 may', company: 'Inmobiliaria Mítica',   contact: 'M. Saldívar CFO', industry: 'Inmobiliario', revenue: 'USD 180M', score: 87, status: 'Nuevo',    source: 'Rescue Assessment' },
  { date: '20 may', company: 'TransLog SA',           contact: 'R. Méndez COO',   industry: 'Logística',    revenue: 'USD 240M', score: 82, status: 'Aprobado', source: 'Office Hours' },
  { date: '19 may', company: 'FinCore Bank',          contact: 'A. Torres CFO',   industry: 'Financiero',   revenue: 'USD 320M', score: 91, status: 'WaitList', source: 'Founder Line' },
  { date: '19 may', company: 'Plazas del Norte',      contact: 'C. Ríos CFO',     industry: 'Inmobiliario', revenue: 'USD 95M',  score: 74, status: 'Revisión', source: 'AI Diagnostic' },
  { date: '18 may', company: 'Aplazo Corp',           contact: 'D. Vega CTO',     industry: 'Financiero',   revenue: 'USD 150M', score: 79, status: 'Aprobado', source: 'TCO Comparator' },
  { date: '17 may', company: 'LogiMex Distribution', contact: 'P. Ruiz Director', industry: 'Logística',    revenue: 'USD 200M', score: 68, status: 'Revisión', source: 'Rescue Assessment' },
  { date: '16 may', company: 'Capital Seguro',        contact: 'L. Mora CFO',     industry: 'Financiero',   revenue: 'USD 420M', score: 94, status: 'WaitList', source: 'Founder Line' },
  { date: '15 may', company: 'Centros Alfa',          contact: 'F. Luna CTO',     industry: 'Inmobiliario', revenue: 'USD 75M',  score: 55, status: 'Rechazado', source: 'AI Diagnostic' },
  { date: '14 may', company: 'FlexCargo',             contact: 'G. Salas COO',    industry: 'Logística',    revenue: 'USD 310M', score: 88, status: 'Aprobado', source: 'Office Hours' },
  { date: '13 may', company: 'Nexo Financiero',       contact: 'H. Cruz CFO',     industry: 'Financiero',   revenue: 'USD 190M', score: 76, status: 'Nuevo',    source: 'TCO Comparator' },
  { date: '12 may', company: 'Plaza Reforma',         contact: 'I. Díaz Director', industry: 'Inmobiliario', revenue: 'USD 130M', score: 83, status: 'WaitList', source: 'Rescue Assessment' },
  { date: '11 may', company: 'TekLog Nacional',       contact: 'J. Ramos CTO',    industry: 'Logística',    revenue: 'USD 260M', score: 71, status: 'Revisión', source: 'AI Diagnostic' },
];

const STATUS_COLOR: Record<string, string> = {
  'Nuevo': '#C9A96E', 'Aprobado': '#4ade80',
  'WaitList': '#60a5fa', 'Revisión': '#fbbf24', 'Rechazado': '#B85450',
};

const FILTERS = ['Todos', 'Nuevos', 'Revisión', 'Aprobado', 'WaitList'];
const INDUSTRIES = ['Todas', 'Financiero', 'Inmobiliario', 'Logística'];

export default function AdminLeads() {
  const [filter, setFilter] = useState('Todos');
  const [industry, setIndustry] = useState('Todas');
  const [selected, setSelected] = useState<Lead | null>(null);

  const visible = LEADS.filter(l => {
    const statusOk = filter === 'Todos' || l.status === filter || (filter === 'Nuevos' && l.status === 'Nuevo');
    const indOk = industry === 'Todas' || l.industry === industry;
    return statusOk && indOk;
  });

  return (
    <AdminLayout>
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · LEADS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Leads · {LEADS.length} en evaluación
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

      <div style={{ padding: '20px 36px', display: 'flex', gap: 24, borderBottom: '1px solid #1a1a1a', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px',
            background: filter === f ? 'rgba(201,169,110,0.1)' : 'transparent',
            border: `1px solid ${filter === f ? '#C9A96E' : '#252525'}`,
            color: filter === f ? '#C9A96E' : '#5A5A5A',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {f} {f === 'Todos' ? `· ${LEADS.length}` : `· ${LEADS.filter(l => l.status === f || (f === 'Nuevos' && l.status === 'Nuevo')).length}`}
          </button>
        ))}
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

      <div style={{ padding: '0 36px 36px' }}>
        <div className="admin-table-wrap">
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
              {['Fecha', 'Compañía', 'Contacto', 'Industria', 'Revenue', 'Score', 'Fuente', 'Estado', ''].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 8, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((lead, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #111', cursor: 'pointer', transition: 'background .15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0F0F0F')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onClick={() => setSelected(lead)}
              >
                <td style={{ padding: '13px 16px', fontSize: 10, color: '#5A5A5A' }}>{lead.date}</td>
                <td style={{ padding: '13px 16px', fontSize: 11, color: '#F5F5F5', fontWeight: 500 }}>{lead.company}</td>
                <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.contact}</td>
                <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.industry}</td>
                <td style={{ padding: '13px 16px', fontSize: 10, color: '#8A8A8A' }}>{lead.revenue}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 17, fontStyle: 'italic', color: '#C9A96E' }}>
                    {lead.score}
                  </span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 9, color: '#5A5A5A', letterSpacing: '0.1em' }}>{lead.source}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{
                    fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px',
                    border: `1px solid ${STATUS_COLOR[lead.status] || '#252525'}44`,
                    color: STATUS_COLOR[lead.status] || '#8A8A8A',
                    background: `${STATUS_COLOR[lead.status] || '#252525'}10`,
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

      {/* Detail panel */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        }} onClick={() => setSelected(null)}>
          <div className="admin-detail-panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#5A5A5A', textTransform: 'uppercase' }}>Detalle del lead</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5A5A', cursor: 'pointer', fontSize: 16 }}>×</button>
            </div>
            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 26, color: '#F5F5F5' }}>{selected.company}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Contacto', selected.contact],
                ['Industria', selected.industry],
                ['Revenue', selected.revenue],
                ['Fuente', selected.source],
                ['Fecha', selected.date],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: 12 }}>
                  <span style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ fontSize: 11, color: '#F5F5F5' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 9, color: '#5A5A5A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Score FABRIC</div>
              <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 56, fontStyle: 'italic', color: '#C9A96E' }}>{selected.score}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button style={{ padding: '12px', background: '#C9A96E', border: 'none', color: '#060606', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                Aprobar → WaitList
              </button>
              <button style={{ padding: '12px', background: 'transparent', border: '1px solid #B85450', color: '#B85450', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
                Rechazar
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity:0; } to { transform: translateX(0); opacity:1; } }`}</style>
    </AdminLayout>
  );
}
