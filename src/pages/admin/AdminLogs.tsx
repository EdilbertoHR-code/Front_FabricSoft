import { useEffect, useState, useRef } from 'react';
import { useAuthApi } from '../../config/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LogEntry {
  _id: string;
  accion: string;
  categoria: string;
  autor: string;
  status: 'OK' | 'WARN' | 'ERR';
  detalle: string;
  createdAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  OK:   '#4ade80',
  WARN: '#fbbf24',
  ERR:  '#B85450',
};

const CATS = ['Todas', 'Leads', 'Papers', 'Office Hours', 'Research Letters', 'NDA', 'Capacidad', 'Sistema'];

const S = { fontFamily: 'var(--mono, "JetBrains Mono", monospace)' };

function formatTs(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }) +
    ' · ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function shortId(id: string) {
  return id.slice(-12);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminLogs() {
  const api = useAuthApi();
  const [logs, setLogs]       = useState<LogEntry[]>([]);
  const [filter, setFilter]   = useState('Todas');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cargar = async (cat: string) => {
    setLoading(true);
    setError('');
    try {
      const params = cat !== 'Todas' ? `?categoria=${encodeURIComponent(cat)}` : '';
      const res = await api.get(`/logs/admin${params}`);
      setLogs(res.data.data || []);
    } catch {
      setError('Error cargando logs.');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { cargar('Todas');   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aplicarFiltro = (cat: string) => {
    setFilter(cat);
    cargar(cat);
  };

  // Auto-refresh cada 30 s
  useEffect(() => {
    timerRef.current = setInterval(() => cargar(filter), 30_000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [filter]);

  const counts = CATS.reduce<Record<string, number>>((acc, c) => {
    acc[c] = c === 'Todas' ? logs.length : logs.filter(l => l.categoria === c).length;
    return acc;
  }, {});

  return (
      <>
      {/* Header */}
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...S, fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · LOGS
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Bitácora inmutable
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ ...S, fontSize: 9, letterSpacing: '0.14em', color: '#3A3A3A', border: '1px solid #1A1A1A', padding: '8px 14px', textTransform: 'uppercase' }}>
            Registro · No editable
          </div>
          <button
            onClick={() => cargar(filter)}
            style={{ ...S, padding: '8px 18px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ padding: '16px 36px', display: 'flex', gap: 8, borderBottom: '1px solid #1a1a1a', flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => aplicarFiltro(c)} style={{
            ...S, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '6px 14px',
            background: filter === c ? 'rgba(201,169,110,0.08)' : 'transparent',
            border: `1px solid ${filter === c ? '#C9A96E' : '#252525'}`,
            color: filter === c ? '#C9A96E' : '#5A5A5A',
            cursor: 'pointer',
          }}>
            {c} · {counts[c] ?? 0}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div style={{ padding: '0 36px 36px' }}>
        {loading ? (
          <div style={{ ...S, fontSize: 10, color: '#3A3A3A', padding: '60px 0', textAlign: 'center' }}>Cargando...</div>
        ) : error ? (
          <div style={{ ...S, fontSize: 10, color: '#E57373', padding: '60px 0', textAlign: 'center' }}>{error}</div>
        ) : logs.length === 0 ? (
          <div style={{ ...S, fontSize: 10, color: '#3A3A3A', padding: '60px 0', textAlign: 'center' }}>
            Sin registros. Los logs aparecen cuando hay actividad en el sistema.
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {['Timestamp', 'Acción', 'Detalle', 'Autor', 'Hash', 'Cat.', 'Estado'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 7, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400, whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map(entry => (
                  <tr key={entry._id} style={{ borderBottom: '1px solid #0e0e0e' }}>
                    <td style={{ ...S, padding: '12px 14px', fontSize: 9, color: '#5A5A5A', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                      {formatTs(entry.createdAt)}
                    </td>
                    <td style={{ ...S, padding: '12px 14px', fontSize: 10, color: entry.status === 'ERR' ? '#B85450' : entry.status === 'WARN' ? '#fbbf24' : '#F5F5F5', maxWidth: 280 }}>
                      {entry.accion}
                    </td>
                    <td style={{ ...S, padding: '12px 14px', fontSize: 9, color: '#5A5A5A', maxWidth: 200 }}>
                      {entry.detalle || '—'}
                    </td>
                    <td style={{ ...S, padding: '12px 14px', fontSize: 9, color: '#8A8A8A', whiteSpace: 'nowrap' }}>
                      {entry.autor}
                    </td>
                    <td style={{ ...S, padding: '12px 14px', fontSize: 9, color: '#2A2A2A', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em' }}>
                      {shortId(entry._id)}
                    </td>
                    <td style={{ ...S, padding: '12px 14px', fontSize: 8, color: '#5A5A5A', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {entry.categoria}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        ...S, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 8px',
                        color: STATUS_COLOR[entry.status] ?? '#4ade80',
                        border: `1px solid ${STATUS_COLOR[entry.status] ?? '#4ade80'}33`,
                        background: `${STATUS_COLOR[entry.status] ?? '#4ade80'}10`,
                      }}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
  );
}
