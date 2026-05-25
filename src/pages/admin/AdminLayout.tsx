import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';

const NAV = [
  { path: '/admin',                label: 'Dashboard',   badge: null },
  { path: '/admin/leads',          label: 'Leads',       badge: '8'  },
  { path: '/admin/nda',            label: 'NDA',         badge: null },
  { path: '/admin/referencias',    label: 'Referencias', badge: null },
  { path: '/admin/papers',         label: 'Papers',      badge: null },
  { path: '/admin/capacidad',      label: 'Capacidad',   badge: null },
  { path: '/admin/office-hours',   label: 'Office Hours',badge: '4'  },
  { path: '/admin/transparencia',    label: 'Transparencia',     badge: null },
  { path: '/admin/research-letters', label: 'Research Letters',  badge: null },
  { path: '/admin/metricas',       label: 'Métricas',    badge: null },
  { path: '/admin/logs',           label: 'Logs',        badge: '∞'  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  // Cerrar sidebar en cada cambio de ruta
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    signOut(() => navigate('/', { replace: true }));
  };

  const Sidebar = () => (
    <aside style={{
      width: 220, flexShrink: 0, background: '#060606',
      borderRight: '1px solid #1e1e1e',
      display: 'flex', flexDirection: 'column', padding: '24px 0',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 60,
    }}>
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 20, color: '#F5F5F5' }}>F</div>
          <div style={{ fontSize: 8, letterSpacing: '0.2em', color: '#C9A96E', marginTop: 2, textTransform: 'uppercase' }}>FABRIC Admin · v1</div>
        </div>
        {/* Close button mobile */}
        <button onClick={() => setOpen(false)} style={{
          display: 'none', background: 'none', border: 'none', color: '#5A5A5A',
          cursor: 'pointer', fontSize: 20, lineHeight: 1,
        }} className="admin-close-btn">×</button>
      </div>

      <div style={{ padding: '16px 24px 8px', fontSize: 8, letterSpacing: '0.24em', color: '#3A3A3A', textTransform: 'uppercase' }}>
        Operación
      </div>

      <nav style={{ flex: 1 }}>
        {NAV.map(({ path, label, badge }) => {
          const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
          return (
            <Link key={path} to={path} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 24px', fontSize: 11, letterSpacing: '0.12em',
              textDecoration: 'none',
              color: active ? '#C9A96E' : '#8A8A8A',
              background: active ? 'rgba(201,169,110,0.06)' : 'transparent',
              borderLeft: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
              transition: 'all .15s',
            }}>
              <span>{label}</span>
              {badge && <span style={{ fontSize: 9, color: active ? '#C9A96E' : '#5A5A5A' }}>{badge}</span>}
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid #1e1e1e', padding: '18px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: '#C9A96E', color: '#060606',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>{user?.firstName?.[0] || 'A'}</div>
          <div>
            <div style={{ fontSize: 10, color: '#F5F5F5', letterSpacing: '0.1em' }}>{user?.fullName || 'Admin FABRIC'}</div>
            <div style={{ fontSize: 8, color: '#5A5A5A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '8px 0', background: 'transparent',
          border: '1px solid #252525', color: '#5A5A5A',
          fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
          fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .admin-sidebar-fixed { display: none !important; }
          .admin-sidebar-drawer { display: flex !important; }
          .admin-close-btn { display: block !important; }
          .admin-main { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .admin-hamburger { display: none !important; }
          .admin-drawer-overlay { display: none !important; }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#060606', fontFamily: 'var(--mono, "JetBrains Mono", monospace)', color: '#F5F5F5' }}>

        {/* SIDEBAR DESKTOP — fija */}
        <div className="admin-sidebar-fixed" style={{ display: 'flex' }}>
          <Sidebar />
        </div>

        {/* SIDEBAR MOBILE — drawer */}
        {open && (
          <>
            <div className="admin-drawer-overlay" onClick={() => setOpen(false)} style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 55,
            }} />
            <div className="admin-sidebar-drawer" style={{
              display: 'none', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 60,
            }}>
              <Sidebar />
            </div>
          </>
        )}

        {/* MAIN */}
        <main className="admin-main" style={{ marginLeft: 220, flex: 1, minHeight: '100vh', background: '#0A0A0A' }}>

          {/* TOPBAR MOBILE */}
          <div className="admin-topbar" style={{
            display: 'none', position: 'sticky', top: 0, zIndex: 40,
            background: '#060606', borderBottom: '1px solid #1e1e1e',
            padding: '14px 20px', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: 'var(--serif, Georgia, serif)', fontSize: 18, color: '#F5F5F5' }}>FABRIC</div>
            <button onClick={() => setOpen(true)} style={{
              background: 'none', border: '1px solid #252525', color: '#C9A96E',
              padding: '6px 12px', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              ☰ Menú
            </button>
          </div>

          {children}
        </main>
      </div>
    </>
  );
}
