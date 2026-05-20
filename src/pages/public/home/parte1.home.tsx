import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Partículas Sutiles (Estrellas más visibles y con resplandor) ──
function GoldenParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; isBright: boolean }[]>([]);

  useEffect(() => {
    // Generamos más estrellas (50), algunas con más brillo que otras
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // Tamaño entre 1px y 3px
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
      isBright: Math.random() > 0.5 // 50% de probabilidad de brillar más fuerte
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes floatUpFade {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { transform: translateY(-15vh); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#F5D98B]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            // Halo de luz dorado alrededor de la estrella
            boxShadow: p.isBright ? '0 0 6px 2px rgba(212,175,55,0.8)' : '0 0 3px 1px rgba(212,175,55,0.4)',
            animation: `floatUpFade ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

// ── Typewriter Principal (Titular) ──────────────────────────
function useTypewriter(text: string, speed = 40, delay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0, t: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        if (i < text.length) { setDisplayed(text.slice(0, ++i)); t = setTimeout(tick, speed); }
        else setDone(true);
      };
      tick();
    }, delay);
    return () => { clearTimeout(start); clearTimeout(t); };
  }, [text, speed, delay]);
  return { displayed, done };
}

// ── Progreso de scroll ──────────────────────────────────────
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => setP(Math.min(1, window.scrollY / (window.innerHeight * 1.5)));
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
}

// ── Carrusel Animado (Tipo Máquina de Escribir) ─────────────
const highlightPhrases = [
  { base: "Nos quedamos hasta el primer cierre contable operado en producción. ", gold: "Por contrato." },
  { base: "Garantizamos la estabilización total de los procesos críticos. ", gold: "Cero desvíos." },
  { base: "Transición a soporte sin incidencias bloqueantes abiertas. ", gold: "Sin sorpresas." }
];

function TypewriterCarousel() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = highlightPhrases[phraseIdx];
    const fullTextLength = currentPhrase.base.length + currentPhrase.gold.length;

    // Velocidad: Escribe a 45ms por letra, borra a 25ms por letra
    let typingSpeed = isDeleting ? 25 : 45;

    // Si ya escribió toda la frase, espera 2.5 segundos antes de empezar a borrar
    if (!isDeleting && charIdx === fullTextLength) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(pauseTimeout);
    }

    // Si ya borró toda la frase, pasa a la siguiente
    if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % highlightPhrases.length);
      return;
    }

    // Proceso de tecleo/borrado
    const timeout = setTimeout(() => {
      setCharIdx((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx]);

  const currentPhrase = highlightPhrases[phraseIdx];
  const typedBase = currentPhrase.base.slice(0, charIdx);
  const typedGold = charIdx > currentPhrase.base.length 
    ? currentPhrase.gold.slice(0, charIdx - currentPhrase.base.length) 
    : "";

  return (
    <div className="relative w-full mt-5 border-l-2 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-r-lg flex items-center pl-5 pr-4 h-[75px] md:h-[60px]">
      <span className="text-[#F5F5F5] font-semibold text-[14px] md:text-[15px] leading-snug drop-shadow-md">
        {typedBase}
        <span className="text-[#D4AF37]">{typedGold}</span>
        <span className="inline-block w-[2px] h-[1em] bg-[#D4AF37] ml-1 align-middle animate-[pulse_0.8s_ease-in-out_infinite]" />
      </span>
    </div>
  );
}

// ── Borde serpiente SVG (Ciclo Perfecto) ────────────────────
function SnakeBorder({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 460, h: 420 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setDims({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const R = 14;

  return (
    <div ref={wrapRef} className="relative w-full h-full rounded-[14px]" style={{ isolation: 'isolate' }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 20 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="20%"  stopColor="#8B6914" />
            <stop offset="60%"  stopColor="#D4AF37" />
            <stop offset="90%"  stopColor="#F5D98B" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect x="1" y="1" width={dims.w - 2} height={dims.h - 2} rx={R} ry={R} fill="none" stroke="#2A2A2A" strokeWidth="1.5" />
        <rect x="1" y="1" width={dims.w - 2} height={dims.h - 2} rx={R} ry={R} fill="none"
          stroke="url(#snakeGrad)" strokeWidth="2.5" strokeLinecap="round" pathLength="100" strokeDasharray="30 70" filter="url(#glow)"
          style={{ animation: 'snakeRun 4s linear infinite' }}
        />
        <style>{`
          @keyframes snakeRun { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
          @keyframes msgIn { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:translateY(0); } }
        `}</style>
      </svg>
      <div className="relative w-full h-full flex flex-col rounded-[14px] overflow-hidden bg-[#070707]" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}

// ── Avatares ────────────────────────────────────────────────
function FabricAvatar() {
  return (
    <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-[#D4AF37]/40"
      style={{ background: 'radial-gradient(circle at 40% 35%,#2a1f06 0%,#0D0900 100%)' }}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="#D4AF37">
        <path d="M8 1 L9.8 6 L15 8 L9.8 10 L8 15 L6.2 10 L1 8 L6.2 6 Z" />
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-[#3B5FDB]/50"
      style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%)' }}>
      <svg className="w-3.5 h-3.5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z"/>
      </svg>
    </div>
  );
}

// ── Chat IA ─────────────────────────────────────────────────
type Msg = { role: 'ai' | 'user'; text: string };

function HeroAIChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: 'Diagnostic Engine iniciado. ¿En qué etapa se encuentra tu implementación Oracle Fusion?' },
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(p => [...p, { role: 'user', text: input }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, {
        role: 'ai',
        text: 'Analizando variables de riesgo… Detecto posible desviación en tu ciclo crítico. Recomiendo iniciar una sesión técnica con nuestro equipo.',
      }]);
    }, 1600);
  };

  return (
    <SnakeBorder>
      <div className="shrink-0 flex items-center gap-3 px-5 py-3.5 border-b border-[#1A1A1A]" style={{ background: 'rgba(0,0,0,0.75)' }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inset-0 rounded-full bg-[#D4AF37] opacity-60" />
          <span className="relative rounded-full h-2 w-2 bg-[#C9A96E]" />
        </span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#F5F5F5]/75">FABRIC AI Diagnostic</span>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 px-5 py-5 flex flex-col gap-4 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2A2A2A transparent' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 items-end ${msg.role === 'user' ? 'flex-row-reverse' : ''}`} style={{ animation: 'msgIn 0.35s ease-out both' }}>
            {msg.role === 'ai' ? <FabricAvatar /> : <UserAvatar />}
            <div className={`max-w-[78%] px-3.5 py-2.5 text-[11px] font-sans leading-relaxed ${msg.role === 'ai' ? 'bg-[#111] text-[#F5F5F5]/82 border border-[#222] rounded-2xl rounded-bl-[4px]' : 'text-black rounded-2xl rounded-br-[4px]'}`}
              style={msg.role === 'user' ? { background: 'linear-gradient(135deg,#C9A96E 0%,#D4AF37 100%)' } : {}}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2.5 items-end" style={{ animation: 'msgIn 0.2s ease-out both' }}>
            <FabricAvatar />
            <div className="bg-[#111] border border-[#222] rounded-2xl rounded-bl-[4px] px-4 py-3 flex gap-1.5 items-center">
              {[0, 0.18, 0.36].map((d, i) => (
                <span key={i} className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={send} className="shrink-0 relative border-t border-[#181818] px-3 py-3" style={{ background: 'rgba(0,0,0,0.55)' }}>
        <input type="text" value={input} disabled={typing} onChange={e => setInput(e.target.value)} placeholder="Consulta de diagnóstico..."
          className="w-full bg-[#111] border border-[#252525] focus:border-[#C9A96E]/45 text-[#F5F5F5] placeholder-[#F5F5F5]/40 text-[10.5px] rounded-xl py-3 pl-4 pr-11 outline-none transition-colors duration-300" />
        <button type="submit" disabled={!input.trim() || typing} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C9A96E]/80 hover:text-[#D4AF37] transition-colors duration-200 disabled:opacity-25">
          <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </form>
    </SnakeBorder>
  );
}

// ── COMPONENTE PRINCIPAL ────────────────────────────────────
export default function Parte1Home() {
  const [mounted, setMounted] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const progress = useScrollProgress();

  const { displayed: line1, done: l1Done } = useTypewriter('No entregamos en go-live.', 42, 400);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (l1Done) { const t = setTimeout(() => setShowLine2(true), 180); return () => clearTimeout(t); }
  }, [l1Done]);

  // Umbrales de desaparición secuencial
  const fadeBadge      = Math.max(0, 1 - progress * 2.5);
  const fadeLine2      = Math.max(0, 1 - (progress - 0.1) * 2);
  const fadeDesc       = Math.max(0, 1 - (progress - 0.2) * 1.8);
  const fadeTags       = Math.max(0, 1 - (progress - 0.35) * 1.5);
  const fadeCtas       = Math.max(0, 1 - (progress - 0.45) * 1.5);
  const fadeChat       = Math.max(0, 1 - (progress - 0.55) * 1.5);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-screen pb-12 lg:pb-16 overflow-hidden bg-[#0A0A0A] selection:bg-[#C9A96E]/30">
      
      {/* Estrellas Visibles y Brillantes */}
      <GoldenParticles />

      <div className="relative z-10 w-full max-w-[1340px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

        {/* ── COLUMNA IZQUIERDA ── */}
        <div className="lg:col-span-7 flex flex-col items-start relative">

          {/* Badge */}
          <div className={`flex items-center gap-2.5 border border-[#C9A96E]/30 bg-[#C9A96E]/5 backdrop-blur-md px-4 py-2 rounded-full transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
               style={{ opacity: fadeBadge, transform: `translateY(${(1 - fadeBadge) * -10}px)` }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-[#D4AF37] opacity-70" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-[#C9A96E]" />
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-[#F5F5F5] font-semibold">
              Oracle Certified Partner · Critical Engineering
            </span>
          </div>

          {/* ── TITULAR ── */}
          <h1 className="mt-6 font-serif tracking-tight text-[#F5F5F5]">
            <span
              className="block leading-[1.1] lg:whitespace-nowrap"
              style={{ fontSize: 'clamp(32px, 4vw, 54px)' }}
            >
              {line1}
              {!l1Done && (
                <span className="inline-block w-[0.055em] h-[0.8em] bg-[#D4AF37] ml-1 translate-y-[0.08em] animate-[pulse_0.65s_ease-in-out_infinite]" />
              )}
            </span>
            <span
              className={`block leading-[1.1] mt-2 text-[#F5F5F5] lg:whitespace-nowrap transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${showLine2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                fontSize: 'clamp(20px, 2.5vw, 34px)',
                opacity: showLine2 ? fadeLine2 : 0,
                transform: showLine2 ? `translateY(${(1 - fadeLine2) * -8}px)` : 'translateY(24px)'
              }}
            >
              Entregamos cuando tu primer ciclo{' '}
              <em className="not-italic text-[#C9A96E]">crítico opera.</em>
            </span>
          </h1>

          {/* ── PÁRRAFO Y MÁQUINA DE ESCRIBIR ── */}
          <div className={`mt-7 w-full max-w-[540px] transition-all duration-1000 delay-[700ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{ opacity: fadeDesc, transform: `translateY(${(1 - fadeDesc) * -10}px)` }}>
            
            <p className="font-sans text-[#F5F5F5]/90 text-[15px] md:text-[16px] leading-relaxed">
              El 73% de las implementaciones Oracle Fusion celebran el go-live
              y abandonan al cliente con cierres pesados e incidencias abiertas.
            </p>

            {/* Máquina de Escribir Rotativa */}
            <TypewriterCarousel />
          </div>

          {/* ── TAGS ANIMADOS ── */}
          <div className="mt-8 flex flex-wrap gap-3"
               style={{ opacity: fadeTags, transform: `translateY(${(1 - fadeTags) * -8}px)` }}>
            {['Rescate Fusion', 'Migración SAP/EBS', 'Greenfield Oracle'].map((tag, index) => (
              <span 
                key={tag} 
                className={`relative overflow-hidden group flex items-center font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5F5F5] font-medium border border-[#D4AF37]/30 bg-[#111111]/60 backdrop-blur-md px-4 py-2 rounded-md transition-all duration-500 ease-out cursor-default hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] hover:-translate-y-1 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: mounted ? `${900 + (index * 150)}ms` : '0ms' }}
              >
                <span className="relative z-10">{tag}</span>
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-[150%] group-hover:translate-x-[50%] transition-transform duration-700 ease-out" />
              </span>
            ))}
          </div>

          {/* ── BOTÓN DE DIAGNÓSTICO ── */}
          <div className={`mt-10 transition-all duration-1000 delay-[1100ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
               style={{ opacity: fadeCtas, transform: `translateY(${(1 - fadeCtas) * -8}px)` }}>
            
            <Link to="/diagnostico"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full backdrop-blur-md transition-all duration-500 ease-out hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.5)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center font-mono text-[11.5px] tracking-[0.2em] uppercase text-[#F5F5F5] font-bold">
                Diagnóstico de proyecto
                <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-500 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>

          </div>
        </div>

      
        <div className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-[1000ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
             style={{ opacity: fadeChat, transform: `translateY(${(1 - fadeChat) * -12}px)` }}>
          <div className="w-full max-w-[460px] h-[440px]">
            <HeroAIChat />
          </div>
        </div>

      </div>
    </div>
  );
}