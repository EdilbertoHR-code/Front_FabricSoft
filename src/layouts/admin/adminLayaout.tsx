import { useEffect, useState, type ReactNode } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Bot,
  CalendarClock,
  ClipboardList,
  Eye,
  FileText,
  Gauge,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Menu,
  MessageSquareText,
  PanelLeftClose,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

const NAV = [
  { path: '/admin',                    label: 'Dashboard',          badge: null,    icon: LayoutDashboard },
  { path: '/admin/leads',              label: 'Leads',              badge: null,    icon: UsersRound },
  { path: '/admin/agente-ia',          label: 'Agente IA',          badge: 'Beta',  icon: Bot },
  { path: '/admin/conversaciones-ia',  label: 'Conversaciones IA',  badge: 'New',   icon: MessageSquareText },
  { path: '/admin/diagnosticos-oracle',label: 'Diagnósticos Oracle',badge: null,    icon: ClipboardList },
  { path: '/admin/office-hours',       label: 'Office Hours',       badge: null,    icon: CalendarClock },
  { path: '/admin/capacidad',          label: 'Capacidad',          badge: null,    icon: Gauge },
  { path: '/admin/papers',             label: 'Papers',             badge: null,    icon: FileText },
  { path: '/admin/nda',                label: 'NDA',                badge: null,    icon: ShieldCheck },
  { path: '/admin/referencias',        label: 'Referencias',        badge: null,    icon: Link2 },
  { path: '/admin/transparencia',      label: 'Transparencia',      badge: null,    icon: Eye },
  { path: '/admin/research-letters',   label: 'Research Letters',   badge: null,    icon: Mail },
  { path: '/admin/metricas',           label: 'Métricas',           badge: null,    icon: BarChart3 },
  { path: '/admin/logs',               label: 'Logs',               badge: '∞',     icon: Activity },
];

export default function AdminLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const displayName = user?.fullName || user?.firstName || 'Admin FABRIC';
  const email = user?.primaryEmailAddress?.emailAddress || 'Acceso administrativo';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    await signOut({ redirectUrl: '/acceso' });
  };

  const Sidebar = () => (
    <aside className="flex h-full w-[280px] flex-col border-r border-zinc-800 bg-[#111214] text-zinc-100 shadow-[22px_0_70px_rgba(0,0,0,0.32)]">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="group relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-amber-400/35 bg-amber-400/10 font-serif text-2xl text-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.08)] transition duration-300 hover:border-amber-300/60 hover:shadow-[0_0_34px_rgba(251,191,36,0.22)]">
            <span className="absolute inset-y-0 -left-10 w-7 rotate-12 bg-amber-200/20 blur-sm transition-transform duration-700 group-hover:translate-x-24" />
            <span className="relative">F</span>
          </div>
          <div className="min-w-0">
            <div className="truncate text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-50">
              FABRIC
            </div>
            <div className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Admin Console
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-800 lg:hidden"
          aria-label="Cerrar menú"
        >
          <PanelLeftClose size={17} />
        </button>
      </div>

      <div className="px-4 py-5">
        <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Operación
        </div>

        <nav className="space-y-1">
          {NAV.map(({ path, label, badge, icon: Icon }) => {
            const active =
              location.pathname === path ||
              (path !== '/admin' && location.pathname.startsWith(path));

            return (
              <Link
                key={path}
                to={path}
                className={[
                  'group relative grid min-h-11 grid-cols-[22px_1fr_auto] items-center gap-3 overflow-hidden rounded-md border px-3 text-[12px] font-medium tracking-[0.03em] transition-all duration-200',
                  active
                    ? 'border-amber-400/35 bg-amber-400/10 text-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.08)]'
                    : 'border-transparent text-zinc-400 hover:border-amber-400/20 hover:bg-zinc-800/70 hover:text-zinc-100 hover:shadow-[0_0_20px_rgba(251,191,36,0.05)]',
                ].join(' ')}
              >
                <span
                  className={[
                    'absolute inset-y-1 left-1 w-1 rounded-full bg-amber-300 transition-all duration-300',
                    active ? 'opacity-100 shadow-[0_0_16px_rgba(251,191,36,0.55)]' : 'opacity-0 group-hover:opacity-40',
                  ].join(' ')}
                />
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,191,36,0.12),transparent_42%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={[
                    'relative transition duration-200',
                    active ? 'text-amber-300 drop-shadow-[0_0_7px_rgba(251,191,36,0.35)]' : 'text-zinc-500 group-hover:text-amber-200',
                  ].join(' ')}
                />
                <span className="relative truncate">{label}</span>
                {badge && (
                  <span
                    className={[
                      'relative flex h-5 min-w-6 items-center justify-center rounded-full px-2 text-[10px] transition duration-200',
                      active
                        ? 'border border-amber-400/30 bg-[#171511] text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.12)]'
                        : 'border border-zinc-700 bg-zinc-900 text-zinc-400 group-hover:border-amber-400/20 group-hover:text-amber-200',
                    ].join(' ')}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-zinc-800 p-4">
        <div className="rounded-lg border border-zinc-800 bg-[#18191C] p-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-300 text-[12px] font-bold text-zinc-950">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold text-zinc-100">{displayName}</div>
              <div className="mt-0.5 truncate text-[10px] text-zinc-500">{email}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.05)]">
            <ShieldCheck size={13} />
            Sesión protegida
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isSigningOut}
          className={[
            'mt-3 flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-md border text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-200',
            isSigningOut
              ? 'cursor-wait border-amber-400/35 bg-amber-400/10 text-amber-200 shadow-[0_0_26px_rgba(251,191,36,0.12)]'
              : 'border-zinc-800 bg-[#141518] text-zinc-400 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300 active:scale-[0.98]',
          ].join(' ')}
        >
          {isSigningOut ? (
            <span className="h-3.5 w-3.5 rounded-full border border-amber-300/30 border-t-amber-200 animate-spin" />
          ) : (
            <LogOut size={15} />
          )}
          {isSigningOut ? 'Cerrando...' : 'Cerrar sesión'}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#17181B] text-zinc-100">
      <style>{`
        @keyframes admin-content-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gold-pulse {
          0%, 100% {
            opacity: .55;
            transform: scaleX(.86);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .admin-content-shell {
          animation: admin-content-in 360ms ease-out both;
        }

        .admin-gold-line {
          animation: gold-pulse 2.8s ease-in-out infinite;
          transform-origin: left;
        }
      `}</style>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar />
          </div>
        </div>
      )}

      <main className="min-h-screen lg:pl-[280px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#111214]/92 px-4 backdrop-blur-md sm:px-6 lg:hidden">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-50">
              FABRIC
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Admin Console
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 text-amber-300 shadow-sm transition hover:bg-zinc-800"
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </button>
        </header>

        <section className="relative min-h-screen overflow-hidden bg-[#17181B]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-800" />
          <div className="admin-gold-line pointer-events-none absolute left-0 top-0 h-px w-2/5 bg-gradient-to-r from-amber-500 via-amber-200 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-amber-400/[0.035] blur-3xl" />
          <div className="admin-content-shell relative">
            {children ?? <Outlet />}
          </div>
        </section>
      </main>
    </div>
  );
}
