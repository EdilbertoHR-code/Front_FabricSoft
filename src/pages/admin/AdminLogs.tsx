import { useState } from 'react';

type LogEntry = {
  ts: string; action: string; author: string; hash: string;
  status: 'OK' | 'WARN' | 'ERR';
  category: 'Leads' | 'Métricas' | 'Capacidad' | 'Acceso';
};

const LOGS: LogEntry[] = [
  { ts: '20 may · 09:14:22', action: 'UPDATE · Rescue counter v11 → v12',          author: 'Julio Alvarez',   hash: 'a7f4e9b2c1d8', status: 'OK',   category: 'Métricas'  },
  { ts: '20 may · 09:02:11', action: 'CREATE · Lead · Inmobiliaria Mítica',         author: 'system · Founder Line', hash: 'b8c5f1a3d7e0', status: 'OK', category: 'Leads'    },
  { ts: '20 may · 08:47:53', action: 'APPROVE · Lead · TransLog SA → Q3 2026',     author: 'Julio Alvarez',   hash: 'c2e7b4a9f6d1', status: 'OK',   category: 'Leads'     },
  { ts: '19 may · 18:32:01', action: 'LOGIN · Admin session opened',                author: 'Julio Alvarez',   hash: 'd3f8c5b2e4a7', status: 'OK',   category: 'Acceso'    },
  { ts: '19 may · 15:21:44', action: 'UPDATE · Slot 10 Activo → Reservado',        author: 'Julio Alvarez',   hash: 'e4a9d6c3f1b8', status: 'OK',   category: 'Capacidad' },
  { ts: '19 may · 14:08:17', action: 'CREATE · Lead · FinCore Bank',               author: 'system · AI Chat', hash: 'f5b0e7d4c2a9', status: 'OK',  category: 'Leads'     },
  { ts: '19 may · 11:55:33', action: 'REJECT · Lead · Centros Alfa',               author: 'Julio Alvarez',   hash: 'a6c1f8e5d3b0', status: 'OK',   category: 'Leads'     },
  { ts: '18 may · 16:40:09', action: 'UPDATE · WaitList counter 6 → 7',            author: 'system',          hash: 'b7d2a9f6c4e1', status: 'OK',   category: 'Capacidad' },
  { ts: '18 may · 10:22:55', action: 'UPDATE · NPS metric visible → hidden',       author: 'Julio Alvarez',   hash: 'c8e3b0a7d5f2', status: 'WARN', category: 'Métricas'  },
  { ts: '17 may · 09:15:01', action: 'LOGIN · Admin session opened',               author: 'Julio Alvarez',   hash: 'd9f4c1b8e6a3', status: 'OK',   category: 'Acceso'    },
  { ts: '16 may · 20:03:44', action: 'FAILED LOGIN · 3 intentos incorrectos',      author: 'unknown · IP redacted', hash: 'e0a5d2c9f7b4', status: 'ERR', category: 'Acceso' },
  { ts: '16 may · 14:47:28', action: 'APPROVE · Lead · Capital Seguro → WaitList', author: 'Julio Alvarez',   hash: 'f1b6e3a0c8d5', status: 'OK',   category: 'Leads'     },
  { ts: '15 may · 11:30:12', action: 'UPDATE · Admisión Q3 Cerrada → Abierta',    author: 'Julio Alvarez',   hash: 'a2c7f4b1e9d6', status: 'OK',   category: 'Capacidad' },
  { ts: '14 may · 09:00:00', action: 'CREATE · Lead · FlexCargo',                  author: 'system · Office Hours', hash: 'b3d8a5c2f0e7', status: 'OK', category: 'Leads' },
];

const CATS = ['Todas', 'Leads', 'Métricas', 'Capacidad', 'Acceso'];
const STATUS_COLOR: Record<string, string> = { OK: '#4ade80', WARN: '#fbbf24', ERR: '#B85450' };

export default function AdminLogs() {
  const [filter, setFilter] = useState('Todas');

  const visible = LOGS.filter(l => filter === 'Todas' || l.category === filter);

  return (
    <>
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · LOGS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Bitácora inmutable
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', color: '#5A5A5A', border: '1px solid #252525', padding: '8px 14px', textTransform: 'uppercase' }}>
            Registro · No editable
          </div>
          <button style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
            Exportar PDF
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 36px', display: 'flex', gap: 8, borderBottom: '1px solid #1a1a1a', flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '6px 14px',
            background: filter === c ? 'rgba(201,169,110,0.08)' : 'transparent',
            border: `1px solid ${filter === c ? '#C9A96E' : '#252525'}`,
            color: filter === c ? '#C9A96E' : '#5A5A5A',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {c} {c !== 'Todas' ? `· ${LOGS.filter(l => l.category === c).length}` : `· ${LOGS.length}`}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 36px 36px' }}>
        <div className="admin-table-wrap">
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
              {['Timestamp', 'Acción', 'Autor', 'Hash', 'Cat.', 'Estado'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 7, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((log, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #0e0e0e' }}>
                <td style={{ padding: '12px 14px', fontSize: 9, color: '#5A5A5A', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                  {log.ts}
                </td>
                <td style={{ padding: '12px 14px', fontSize: 10, color: log.status === 'ERR' ? '#B85450' : log.status === 'WARN' ? '#fbbf24' : '#F5F5F5', maxWidth: 320 }}>
                  {log.action}
                </td>
                <td style={{ padding: '12px 14px', fontSize: 9, color: '#8A8A8A' }}>{log.author}</td>
                <td style={{ padding: '12px 14px', fontSize: 9, color: '#3A3A3A', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em' }}>
                  {log.hash}
                </td>
                <td style={{ padding: '12px 14px', fontSize: 8, color: '#5A5A5A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {log.category}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{
                    fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 8px',
                    color: STATUS_COLOR[log.status],
                    border: `1px solid ${STATUS_COLOR[log.status]}33`,
                    background: `${STATUS_COLOR[log.status]}10`,
                  }}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}
