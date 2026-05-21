import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../../assets/logo/logo.png';

const NAV = [
  { name: 'Doctrina',      href: '/doctrina' },
  { name: 'Casos',         href: '/casos' },
  { name: 'Industrias',    href: '/industrias' },
  { name: 'FABRIC OS',     href: '/fabric-os' },
  { name: 'Transparencia', href: '/transparencia' },
];

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const ticking  = useRef(false);
  const location = useLocation();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          flex justify-center
          transition-[padding,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled ? 'px-6 pt-4' : 'px-6 md:px-12 pt-0'}
          ${mounted  ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div
          className={`
            w-full flex items-center justify-between gap-6
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled
              ? 'max-w-[1000px] bg-[#0D0D0D]/90 backdrop-blur-2xl border border-[#C9A96E]/20 rounded-2xl px-5 py-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.75)]'
              : 'max-w-[1440px] bg-transparent border border-[#C9A96E]/0 rounded-2xl px-0 py-5'
            }
          `}
        >

          {/* ── LOGO ── */}
          <Link
            to="/"
            className={`
              flex items-center gap-3 group shrink-0
              transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}
            style={{ transitionDelay: '60ms' }}
          >
            <div className="relative overflow-hidden rounded border border-[#2A2A2A] h-8 w-8 shrink-0 group-hover:border-[#C9A96E]/60 group-hover:shadow-[0_0_15px_1px_rgba(201,169,110,0.2)] transition-all duration-500">
              <img src={logoImg} alt="FABRIC" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold tracking-[0.14em] uppercase text-[18px] text-[#F5F5F5] group-hover:text-[#C9A96E] transition-colors duration-500">
                FABRIC
              </span>
              <span className="hidden md:block font-mono tracking-[0.22em] uppercase mt-[3px] text-[7px] text-[#C9A96E]/40 group-hover:text-[#C9A96E]/80 transition-colors duration-500">
                Oracle Critical Engineering
              </span>
            </div>
          </Link>

         
          <nav
            className={`
              hidden lg:flex items-center relative p-[4px] gap-[2px]
              transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}
            `}
            style={{ transitionDelay: '180ms' }}
          >
            <div
              className={`
                absolute inset-0 bg-[#111111]/85 border border-[#2A2A2A]/70 rounded-full backdrop-blur-md pointer-events-none
                transition-opacity duration-500 ease-out
                ${scrolled ? 'opacity-0' : 'opacity-100'}
              `}
            />

            {NAV.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group relative z-10 select-none px-[16px] py-[6px] rounded-full
                    flex items-center justify-center flex-col
                    text-[12.5px] font-sans font-medium tracking-[0.05em]
                    transition-colors duration-300 ease-out
                    ${isActive
                      ? 'text-[#C9A96E]'
                      : 'text-[#F5F5F5]/60 hover:text-[#C9A96E]'
                    }
                  `}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                
                  <span 
                    className={`
                      absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-[#C9A96E] rounded-full
                      transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isActive ? 'w-[calc(100%-28px)] opacity-100' : 'w-0 opacity-0 group-hover:w-[calc(100%-28px)] group-hover:opacity-100'}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

         
          <div
            className={`
              flex items-center gap-3 shrink-0
              transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}
            style={{ transitionDelay: '480ms' }}
          >
            <Link
              to="/aplicar"
              className="hidden lg:inline-flex items-center gap-1.5 relative overflow-hidden group bg-[#C9A96E] hover:bg-[#B8914A] text-[#0A0A0A] font-mono font-bold text-[10px] tracking-[0.2em] uppercase px-[16px] py-[8px] rounded-full transition-all duration-300 shadow-[0_0_20px_-8px_rgba(201,169,110,0.5)] hover:shadow-[0_0_30px_-4px_rgba(201,169,110,0.7)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/28 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none" />
              <span className="relative">Iniciar conversación</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              className="lg:hidden p-2 -mr-1 text-[#F5F5F5]/60 hover:text-[#C9A96E] transition-colors duration-300 active:scale-90"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

        </div>
      </header>

     
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      <aside className={`fixed right-0 top-0 bottom-0 z-[110] w-full sm:w-[380px] bg-[#0D0D0D] border-l border-[#2A2A2A] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#2A2A2A]/60">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded border border-[#2A2A2A]">
              <img src={logoImg} alt="FABRIC" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif font-bold text-lg tracking-[0.15em] uppercase text-[#F5F5F5]">FABRIC</span>
          </div>
          <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="text-[#F5F5F5]/45 hover:text-[#C9A96E] p-2 -mr-2 rounded-full hover:bg-white/5 transition-all duration-300 hover:rotate-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col justify-center px-10 gap-8 overflow-y-auto">
          {NAV.map((item, i) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}
                style={{ transitionDelay: mobileOpen ? `${i * 75}ms` : '0ms' }}
                className={`group flex items-center text-[1.75rem] font-serif tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} ${isActive ? 'text-[#C9A96E]' : 'text-[#F5F5F5]/65 hover:text-[#C9A96E]'}`}
              >
                <span className={`mr-4 text-[10px] text-[#C9A96E] transition-all duration-400 ${isActive ? 'opacity-100 scale-110' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-110'}`}>◆</span>
                <span className="group-hover:translate-x-2 transition-transform duration-400 ease-out">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className={`px-8 py-6 border-t border-[#2A2A2A]/60 transition-all duration-500 ${mobileOpen ? 'opacity-100 translate-y-0 delay-[400ms]' : 'opacity-0 translate-y-4'}`}>
          <Link to="/aplicar" className="flex items-center justify-center gap-3 w-full py-[12px] relative overflow-hidden group bg-[#C9A96E] hover:bg-[#B8914A] text-[#0A0A0A] font-mono font-bold text-[10.5px] tracking-[0.22em] uppercase rounded-full transition-all duration-300 shadow-[0_0_32px_-6px_rgba(201,169,110,0.55)] active:scale-[0.97]">
            <span aria-hidden="true" className="absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none" />
            <span className="relative">Iniciar conversación</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </aside>
    </>
  );
}