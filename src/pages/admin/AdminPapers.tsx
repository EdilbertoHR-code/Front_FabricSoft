import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminApi } from '../../config/api';

type PaperStatus = 'pendiente' | 'enviado' | 'bloqueado';
type Tab = 'papers' | 'benchmark';

interface PaperAccess {
  _id: string;
  paperId: '01' | '02' | '03';
  email: string;
  cargo: string;
  empresa: string;
  status: PaperStatus;
  emailSent: boolean;
  createdAt: string;
}

interface BenchmarkAccess {
  _id: string;
  nombre: string;
  empresa: string;
  email: string;
  status: string;
  createdAt: string;
}

const PAPER_LABELS: Record<string, string> = {
  '01': 'Paper 01 — Go-live failures',
  '02': 'Paper 02 — IA en Fusion',
  '03': 'Paper 03 — Primer ciclo crítico',
};

const STATUS_COLOR: Record<PaperStatus, string> = {
  pendiente: '#C9A96E',
  enviado:   '#4ade80',
  bloqueado: '#B85450',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function AdminPapers() {
  const [tab, setTab]               = useState<Tab>('papers');
  const [papers, setPapers]         = useState<PaperAccess[]>([]);
  const [benchmark, setBenchmark]   = useState<BenchmarkAccess[]>([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [filterPaper, setFilterPaper] = useState<string>('Todos');
  const [filterStatus, setFilterStatus] = useState<string>('Todos');
  const [updating, setUpdating]     = useState<string | null>(null);

  useEffect(() => {
    fetchPapers();
    fetchBenchmark();
  }, []);

  async function fetchPapers() {
    setLoading(true);
    try {
      const res = await adminApi.get('/papers/admin');
      setPapers(res.data.data);
      setTotal(res.data.total);
    } catch {
      console.error('Error cargando papers');
    } finally {
      setLoading(false);
    }
  }

  async function fetchBenchmark() {
    try {
      const res = await adminApi.get('/papers/admin/benchmark');
      setBenchmark(res.data.data);
    } catch {
      console.error('Error cargando benchmark');
    }
  }

  async function handleStatusChange(id: string, status: PaperStatus) {
    setUpdating(id);
    try {
      const res = await adminApi.patch(`/papers/admin/${id}/status`, { status });
      setPapers(prev => prev.map(p => p._id === id ? res.data.data : p));
    } catch {
      console.error('Error actualizando status');
    } finally {
      setUpdating(null);
    }
  }

  const visiblePapers = papers.filter(p => {
    const byPaper  = filterPaper  === 'Todos' || p.paperId === filterPaper;
    const byStatus = filterStatus === 'Todos' || p.status  === filterStatus;
    return byPaper && byStatus;
  });

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ padding: '28px 36px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.26em', color: '#5A5A5A', textTransform: 'uppercase', marginBottom: 6 }}>
            FABRIC · ADMIN · INVESTIGACIÓN
          </div>
          <div style={{ fontSize: 22, fontFamily: 'var(--serif, Georgia, serif)', color: '#F5F5F5' }}>
            Papers · {total} solicitudes
          </div>
        </div>
        <button
          onClick={fetchPapers}
          style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '9px 18px', background: 'transparent', border: '1px solid #252525', color: '#8A8A8A', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Actualizar
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a' }}>
        {(['papers', 'benchmark'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '14px 28px', background: 'transparent', border: 'none',
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: tab === t ? '#C9A96E' : '#5A5A5A',
              borderBottom: `2px solid ${tab === t ? '#C9A96E' : 'transparent'}`,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {t === 'papers' ? `Papers (${papers.length})` : `Benchmark Early Access (${benchmark.length})`}
          </button>
        ))}
      </div>

      {tab === 'papers' && (
        <>
          {/* Filtros */}
          <div style={{ padding: '16px 36px', display: 'flex', gap: 16, borderBottom: '1px solid #1a1a1a', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Todos', '01', '02', '03'].map(f => (
              <button
                key={f}
                onClick={() => setFilterPaper(f)}
                style={{
                  fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 12px',
                  background: filterPaper === f ? 'rgba(201,169,110,0.1)' : 'transparent',
                  border: `1px solid ${filterPaper === f ? '#C9A96E' : '#252525'}`,
                  color: filterPaper === f ? '#C9A96E' : '#5A5A5A', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {f === 'Todos' ? 'Todos los papers' : PAPER_LABELS[f].split(' — ')[0]}
              </button>
            ))}
            <div style={{ width: 1, background: '#1e1e1e', height: 20 }} />
            {(['Todos', 'pendiente', 'enviado', 'bloqueado'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 12px',
                  background: 'transparent', border: 'none',
                  color: filterStatus === s ? '#F5F5F5' : '#3A3A3A',
                  borderBottom: `1px solid ${filterStatus === s ? '#C9A96E' : 'transparent'}`,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Tabla */}
          <div style={{ padding: '0 36px 36px', overflowX: 'auto' }}>
            {loading ? (
              <div style={{ padding: '48px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>Cargando...</div>
            ) : visiblePapers.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>Sin solicitudes con este filtro.</div>
            ) : (
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                    {['Fecha', 'Paper', 'Empresa', 'Cargo', 'Email', 'Estado', 'Acciones'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 8, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visiblePapers.map(p => (
                    <tr key={p._id} style={{ borderBottom: '1px solid #111' }}>
                      <td style={{ padding: '12px 16px', fontSize: 10, color: '#5A5A5A', whiteSpace: 'nowrap' }}>{fmt(p.createdAt)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 9, padding: '3px 8px', border: '1px solid #252525', color: '#C9A96E', letterSpacing: '0.1em' }}>
                          Paper {p.paperId}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 11, color: '#F5F5F5' }}>{p.empresa}</td>
                      <td style={{ padding: '12px 16px', fontSize: 10, color: '#8A8A8A' }}>{p.cargo}</td>
                      <td style={{ padding: '12px 16px', fontSize: 10, color: '#8A8A8A' }}>{p.email}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '3px 10px', border: `1px solid ${STATUS_COLOR[p.status]}44`, color: STATUS_COLOR[p.status], background: `${STATUS_COLOR[p.status]}10` }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {p.status !== 'enviado' && (
                            <button
                              disabled={updating === p._id}
                              onClick={() => handleStatusChange(p._id, 'enviado')}
                              style={{ fontSize: 8, padding: '4px 10px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
                            >
                              Marcar enviado
                            </button>
                          )}
                          {p.status !== 'bloqueado' && (
                            <button
                              disabled={updating === p._id}
                              onClick={() => handleStatusChange(p._id, 'bloqueado')}
                              style={{ fontSize: 8, padding: '4px 10px', background: 'transparent', border: '1px solid #B85450', color: '#B85450', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
                            >
                              Bloquear
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {tab === 'benchmark' && (
        <div style={{ padding: '0 36px 36px', overflowX: 'auto' }}>
          <div style={{ padding: '20px 0 16px', fontSize: 10, color: '#5A5A5A', letterSpacing: '0.14em' }}>
            {benchmark.length} registros para Benchmark Index · Q4 2026
          </div>
          {benchmark.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', fontSize: 11, color: '#5A5A5A' }}>Sin registros aún.</div>
          ) : (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {['Fecha', 'Nombre', 'Empresa', 'Email', 'Estado'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 8, letterSpacing: '0.2em', color: '#3A3A3A', textTransform: 'uppercase', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benchmark.map(b => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #111' }}>
                    <td style={{ padding: '12px 16px', fontSize: 10, color: '#5A5A5A', whiteSpace: 'nowrap' }}>{fmt(b.createdAt)}</td>
                    <td style={{ padding: '12px 16px', fontSize: 11, color: '#F5F5F5' }}>{b.nombre}</td>
                    <td style={{ padding: '12px 16px', fontSize: 11, color: '#F5F5F5' }}>{b.empresa}</td>
                    <td style={{ padding: '12px 16px', fontSize: 10, color: '#8A8A8A' }}>{b.email}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 8, padding: '3px 8px', border: '1px solid #C9A96E44', color: '#C9A96E', letterSpacing: '0.1em' }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
