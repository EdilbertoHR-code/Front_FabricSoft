import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/logo/logo.png';

const NAV = [
  { name: 'Hero', href: '/#inicio', sectionId: 'inicio' },
  { name: 'FABRIC AI', href: '/#fabric-ai', sectionId: 'fabric-ai' },
  { name: 'Diagnóstico', href: '/#diagnostico', sectionId: 'diagnostico' },
  { name: 'Doctrina', href: '/#doctrina', sectionId: 'doctrina' },
  { name: 'Casos', href: '/#s07', sectionId: 's07' },
  { name: 'Industrias', href: '/#s08', sectionId: 's08' },
  { name: 'FABRIC OS', href: '/#s09', sectionId: 's09' },
  { name: 'Lifecycle', href: '/#s10', sectionId: 's10' },
  { name: 'Referencias', href: '/#s12', sectionId: 's12' },
  { name: 'Criterios', href: '/#criterios', sectionId: 'criterios' },
  { name: 'Transparencia', href: '/#s13', sectionId: 's13' },
  { name: 'Investigación', href: '/#s14', sectionId: 's14' },
  { name: 'Aplicar', href: '/#s15', sectionId: 's15' },
];

const HEADER_SCROLL_OFFSET = 118;

function scrollToSection(sectionId: string) {
  window.setTimeout(() => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, 30);
}

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const ticking  = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => { setMobileOpen(false); }, [location.pathname, location.hash]);
  
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setMobileOpen(false);
    navigate({ pathname: '/', hash: `#${sectionId}` });
    scrollToSection(sectionId);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          flex justify-center px-6 md:px-12
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#2A2A2A] shadow-md py-3' : 'bg-transparent border-b border-transparent py-5'}
          ${mounted  ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="w-full max-w-[1440px] flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link
            to="/"
            className={`
              shrink-0 group
              transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}
            style={{ transitionDelay: '60ms' }}
          >
            <img
              src={logoImg}
              alt="FABRIC"
              className="h-28 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </Link>

          {/* ── BOTON Y MENU ── */}
          <div
            className={`
              flex items-center gap-4 shrink-0
              transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}
            style={{ transitionDelay: '180ms' }}
          >
            <Link
              to="/#diagnostico"
              onClick={(event) => handleSectionNavigation(event, 'diagnostico')}
              className="hidden sm:inline-flex items-center gap-1.5 relative overflow-hidden group bg-[#C9A96E] hover:bg-[#B8914A] text-[#0A0A0A] font-mono font-bold text-[10px] tracking-[0.2em] uppercase px-[16px] py-[8px] rounded-full transition-all duration-300 shadow-[0_0_20px_-8px_rgba(201,169,110,0.5)] hover:shadow-[0_0_30px_-4px_rgba(201,169,110,0.7)] hover:scale-[1.03] active:scale-[0.98]"
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

      {/* ── SIDEBAR MENU ── */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      <aside className={`fixed right-0 top-0 bottom-0 z-[110] w-full sm:w-[380px] bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-[#2A2A2A] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        
        {/* HEADER LATERAL */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#2A2A2A]/40">
          <div className="flex items-center">
            <img src={logoImg} alt="FABRIC" className="h-8 w-auto object-contain opacity-90" />
          </div>
          <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="text-[#F5F5F5]/40 hover:text-[#C9A96E] p-2 -mr-2 rounded-full transition-all duration-500 hover:rotate-90 active:scale-90">
            <svg className="w-6 h-6 stroke-[1.2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* LINKS DE NAVEGACION */}
        <nav className="flex-1 flex flex-col justify-start px-10 py-10 gap-2 overflow-y-auto">
          {NAV.map((item, i) => {
            const isActive = location.pathname === '/' && location.hash === `#${item.sectionId}`;
            return (
              <Link key={item.name} to={item.href}
                onClick={(event) => handleSectionNavigation(event, item.sectionId)}
                style={{ transitionDelay: mobileOpen ? `${i * 35}ms` : '0ms' }}
                className={`
                  group relative flex items-center w-full py-2.5
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                `}
              >
                <div className={`
                  absolute left-0 h-[1px] bg-[#C9A96E] transition-all duration-500 ease-out
                  ${isActive ? 'w-5 opacity-100' : 'w-0 opacity-0 group-hover:w-3 group-hover:opacity-60'}
                `} />
                <span className={`
                  font-sans text-[11px] tracking-[0.25em] uppercase font-medium
                  transition-all duration-500 ease-out
                  ${isActive ? 'pl-9 text-[#C9A96E]' : 'pl-0 text-[#F5F5F5]/50 group-hover:pl-6 group-hover:text-[#F5F5F5]'}
                `}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        
        {/* FOOTER LATERAL (CTA) */}
        <div className={`px-8 py-8 border-t border-[#2A2A2A]/40 transition-all duration-700 ${mobileOpen ? 'opacity-100 translate-y-0 delay-[500ms]' : 'opacity-0 translate-y-8'}`}>
          <Link
            to="/#diagnostico"
            onClick={(event) => handleSectionNavigation(event, 'diagnostico')}
            className="flex items-center justify-center gap-3 w-full py-3.5 relative overflow-hidden group bg-transparent border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 text-[#C9A96E] font-mono font-bold text-[10px] tracking-[0.2em] uppercase rounded-full transition-all duration-500 active:scale-[0.98]"
          >
            <span className="relative">Iniciar conversación</span>
            <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
