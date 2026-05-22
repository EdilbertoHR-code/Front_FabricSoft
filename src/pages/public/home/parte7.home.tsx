import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// --- HOOK DE ANIMACIÓN ---
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); 
        }
      },
      { threshold, rootMargin: "50px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// =========================================================================
// COMPONENTES DEL RADAR
// =========================================================================

const Circle = ({ className, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className={`absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-[#C9A96E]/20 ${className}`}
    />
  );
};

const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div className={`relative flex h-20 w-20 items-center justify-center rounded-full ${className}`}>
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 8s linear infinite;
        }
      `}</style>
      
      {/* Línea de escaneo giratoria (Sweep line) */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-0 flex h-[4px] w-[500px] items-end justify-center overflow-hidden bg-transparent"
      >
        {/* Haz de luz dorado */}
        <div className="relative z-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent shadow-[0_0_20px_rgba(201,169,110,0.8)]" />
      </div>
      
      {/* Círculos concéntricos */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(201, 169, 110, ${0.15 - (idx * 0.015)})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

const IconContainer = ({
  icon,
  text,
  delay,
}: {
  icon: React.ReactNode;
  text: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay }}
      className="relative z-50 flex flex-col items-center justify-center space-y-3"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#C9A96E]/40 bg-[#0A0A0A] shadow-[0_0_20px_rgba(201,169,110,0.15)] transition-all hover:scale-110 hover:border-[#C9A96E] hover:shadow-[0_0_30px_rgba(201,169,110,0.4)] cursor-crosshair">
        {icon}
      </div>
      <div className="hidden rounded-md px-2 py-1 md:block bg-black/60 backdrop-blur-sm border border-[#2A2A2A]">
        <div className="text-center font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5]/80">
          {text}
        </div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// ICONOS PERSONALIZADOS (Módulos Oracle)
// =========================================================================
const Icons = {
  Finance: (
    <svg className="h-6 w-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  SupplyChain: (
    <svg className="h-6 w-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  HCM: (
    <svg className="h-6 w-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Database: (
    <svg className="h-6 w-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Cloud: (
    <svg className="h-6 w-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  Security: (
    <svg className="h-6 w-6 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

// =========================================================================
// COMPONENTE PRINCIPAL
// =========================================================================
export default function Parte7Home() {
  const { ref: headerRef, isInView: headerInView } = useInView(0.2);

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 md:py-32 border-t border-[#111]">
      
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.05]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12">
        
        {/* ENCABEZADO */}
        <div ref={headerRef} className={`mb-16 md:mb-24 text-center transition-all duration-1000 ${headerInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/5 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A96E]"></span>
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
              Cobertura de Ecosistema
            </span>
          </div>

          <h2 className="font-serif text-[36px] leading-[1.1] md:text-[54px] lg:text-[64px] text-[#F5F5F5] tracking-tight mb-6">
            Mapeo activo de <span className="text-[#C9A96E] italic">riesgo operativo.</span>
          </h2>
          
          <p className="mx-auto max-w-[600px] font-sans text-base md:text-lg leading-relaxed text-[#F5F5F5]/60">
            Escaneamos de forma continua las dependencias críticas entre tus módulos Oracle para prever caídas, cuellos de botella y fallas de integración antes de que impacten producción.
          </p>
        </div>

        {/* CONTENEDOR DEL RADAR Y LOS NODOS */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
          
          {/* Fila 1 */}
          <div className="mx-auto w-full max-w-3xl absolute top-10 z-10">
            <div className="flex w-full items-center justify-center space-x-12 md:justify-between md:space-x-0">
              <IconContainer delay={0.2} text="Oracle ERP (Financials)" icon={Icons.Finance} />
              <IconContainer delay={0.4} text="Oracle SCM (Supply Chain)" icon={Icons.SupplyChain} />
              <IconContainer delay={0.3} text="Oracle HCM (Human Capital)" icon={Icons.HCM} />
            </div>
          </div>
          
          {/* Fila 2 (Centro) */}
          <div className="mx-auto w-full max-w-md absolute top-1/2 -translate-y-1/2 z-10">
            <div className="flex w-full items-center justify-center space-x-32 md:justify-between md:space-x-0">
              <IconContainer delay={0.5} text="Oracle Cloud Infrastructure" icon={Icons.Cloud} />
              <IconContainer delay={0.8} text="Seguridad & Roles" icon={Icons.Security} />
            </div>
          </div>
          
          {/* Fila 3 */}
          <div className="mx-auto w-full max-w-2xl absolute bottom-16 z-10">
            <div className="flex w-full items-center justify-center space-x-20 md:justify-around md:space-x-0">
              <IconContainer delay={0.6} text="Oracle EPM (Enterprise)" icon={Icons.Database} />
              <IconContainer delay={0.7} text="Integraciones Custom" icon={Icons.Finance} />
            </div>
          </div>

          {/* El Radar en sí */}
          <Radar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          {/* Piso de sombra */}
          <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent opacity-50" />
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#050505] to-transparent z-[40]" />
        </div>

      </div>
    </section>
  );
}