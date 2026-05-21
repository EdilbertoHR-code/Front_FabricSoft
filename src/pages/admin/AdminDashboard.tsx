import AdminLayout from './AdminLayout';

const kpis = [
  { label: 'Leads nuevos · 24h',      value: '4',    delta: '↑ 2 vs ayer' },
  { label: 'Aprobados · semana',       value: '3',    delta: '↑ 1 vs sem. ant.' },
  { label: 'Capacidad ocupada',        value: '9/12', delta: '2 reservados · 1 libre' },
  { label: 'Office Hours · esta sem.', value: '3/4',  delta: 'Próximo: jue 22 · 16:00' },
];

const pipeline = [
  { day: 'L', val: 40 },
  { day: 'M', val: 65 },
  { day: 'M', val: 30 },
  { day: 'J', val: 80 },
  { day: 'V', val: 55 },
  { day: 'S', val: 20 },
  { day: 'D', val: 10 },
];

const MAX = Math.max(...pipeline.map(p => p.val));

const recentLeads = [
  { date: '20 may', company: 'Inmobiliaria Mítica',    contact: 'M. Saldívar CFO', industry: 'Inmobiliario', revenue: 'USD 180M', score: 87, status: 'Nuevo' },
  { date: '20 may', company: 'TransLog SA',            contact: 'R. Méndez COO',  industry: 'Logística',     revenue: 'USD 240M', score: 82, status: 'Aprobado' },
  { date: '19 may', company: 'FinCore Bank',           contact: 'A. Torres CFO',  industry: 'Financiero',    revenue: 'USD 320M', score: 91, status: 'WaitList' },
];

const STATUS_COLOR: Record<string, string> = {
  'Nuevo':    '#C9A96E',
  'Aprobado': '#4ade80',
  'WaitList': '#60a5fa',
  'Revisión': '#fbbf24',
};

function AdminHeader({ title, sub }: { title: string; sub?: string }) {
  const now = new Date();
  const opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dateStr = now.toLocaleDateString('es-MX', opts);
  return (
    <div style={{
      padding: '28px 36px 24px',
      borderBottom: '1px solid #1e1e1e',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div>
        <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
          FABRIC · ADMIN · {title}
        </div>
        {sub && <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em', textAlign: 'right' }}>
        <div>{dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}</div>
        <div style={{ marginTop: 4, color: '#3A3A3A' }}>· Sincronizado</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <AdminHeader title="DASHBOARD" sub="Buenos días, Julio." />
      <div className="admin-page-body">

        {/* KPIs */}
        <div className="admin-kpi-grid">
          {kpis.map(kpi => (
            <div key={kpi.label} style={{ background: '#0F0F0F', padding: '24px 28px' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 14 }}>
                {kpi.label}
              </div>
              <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 36, color: '#C9A96E', marginBottom: 8 }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: 10, color: '#5A5A5A', letterSpacing: '0.1em' }}>
                {kpi.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline chart */}
        <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e', padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase' }}>
              Pipeline · últimos 7 días
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Semanal', 'Mensual'].map((t, i) => (
                <button key={t} style={{
                  fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '5px 12px',
                  background: i === 0 ? 'rgba(201,169,110,0.1)' : 'transparent',
                  border: `1px solid ${i === 0 ? '#C9A96E' : '#252525'}`,
                  color: i === 0 ? '#C9A96E' : '#5A5A5A',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120, borderBottom: '1px solid #1e1e1e', paddingBottom: 12 }}>
            {pipeline.map((p, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 9, color: '#5A5A5A' }}>{p.val}</div>
                <div style={{
                  width: '100%',
                  height: `${(p.val / MAX) * 90}%`,
                  background: 'linear-gradient(to top, #C9A96E, rgba(201,169,110,0.3))',
                  minHeight: 4,
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {pipeline.map((p, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: '#5A5A5A', letterSpacing: '0.1em' }}>
                {p.day}
              </div>
            ))}
          </div>
        </div>

        {/* Recent leads */}
        <div style={{ background: '#0F0F0F', border: '1px solid #1e1e1e' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#C9A96E', textTransform: 'uppercase' }}>
              Leads recientes
            </div>
            <a href="/admin/leads" style={{ fontSize: 9, letterSpacing: '0.16em', color: '#5A5A5A', textDecoration: 'none', textTransform: 'uppercase' }}>
              Ver todos →
            </a>
          </div>
          <div className="admin-table-wrap">
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                {['Fecha', 'Compañía', 'Contacto', 'Industria', 'Revenue', 'Score', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 8, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #141414' }}>
                  <td style={{ padding: '14px 20px', fontSize: 10, color: '#5A5A5A' }}>{lead.date}</td>
                  <td style={{ padding: '14px 20px', fontSize: 11, color: '#F5F5F5', fontWeight: 500 }}>{lead.company}</td>
                  <td style={{ padding: '14px 20px', fontSize: 10, color: '#8A8A8A' }}>{lead.contact}</td>
                  <td style={{ padding: '14px 20px', fontSize: 10, color: '#8A8A8A' }}>{lead.industry}</td>
                  <td style={{ padding: '14px 20px', fontSize: 10, color: '#8A8A8A' }}>{lead.revenue}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 16, fontStyle: 'italic', color: '#C9A96E' }}>
                      {lead.score}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase',
                      padding: '4px 10px', border: `1px solid ${STATUS_COLOR[lead.status] || '#252525'}33`,
                      color: STATUS_COLOR[lead.status] || '#8A8A8A',
                      background: `${STATUS_COLOR[lead.status] || '#252525'}10`,
                    }}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
