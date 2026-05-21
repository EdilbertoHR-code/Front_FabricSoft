import { useEffect, useRef, useState } from "react";
import { DoctrinaModal } from "./DoctrinaModal";

// --- HOOK DE ANIMACIÓN ---
function useInView(threshold = 0.15) {
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

// --- ICONOS ---
function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// --- DATOS DE LA DOCTRINA ---
const clauses = [
  {
    id: "01",
    title: "Entrega en primer ciclo crítico.",
    description: "El proyecto se entrega cuando tu primer cierre contable, primer ciclo operativo o primer ciclo regulatorio crítico opera en producción con estabilidad documentada.",
    tag: "VALIDADO · APE PLAZAS",
    type: "validated"
  },
  {
    id: "02",
    title: "Solo seniors. Cero juniors facturables.",
    description: "Cada consultor de FABRIC tiene mínimo 8 años de experiencia real en Oracle. Sin excepciones.",
    tag: "CONTRACTUAL",
    type: "contractual"
  },
  {
    id: "03",
    title: "Fixed-Price por fase. Cero sorpresas.",
    description: "Operamos con presupuestos cerrados. Si nos atrasamos por nuestra causa, no facturamos las semanas adicionales.",
    tag: "CONTRACTUAL",
    type: "contractual"
  },
  {
    id: "04",
    title: "Cero reportes manuales post go-live.",
    description: "Si subsiste un reporte manual paralelo por causa atribuible a FABRIC, se resuelve sin costo adicional hasta su eliminación.",
    tag: "VALIDADO · APE PLAZAS",
    type: "validated"
  },
  {
    id: "05",
    title: "Transición formal con documentación viva.",
    description: "Acta firmada por todos los stakeholders, tablero de KPIs verificado, y documentación auditable y actualizable por el cliente sin dependencia de FABRIC.",
    tag: "VALIDADO · APE PLAZAS",
    type: "validated"
  }
];

// =========================================================================
// COMPONENTE PRINCIPAL
// =========================================================================
export default function S06Doctrina() {
  const { ref: headerRef, isInView: headerInView } = useInView(0.2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="doctrina" className="relative w-full overflow-hidden bg-[#050505] py-24 md:py-32 border-t border-[#111]">
      
      {/* --- FONDOS Y EFECTOS --- */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/4 bg-[#C9A96E] opacity-[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1000px] px-6 md:px-12">
        
        {/* ENCABEZADO */}
        <div ref={headerRef} className={`mb-20 transition-all duration-1000 ${headerInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#2A2A2A] bg-black/40 backdrop-blur-md">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
              Doctrina FABRIC
            </span>
          </div>

          <h2 className="font-serif text-[38px] leading-[1.05] md:text-[54px] lg:text-[64px] text-[#F5F5F5] tracking-tight">
            No somos consultores.<br />
            Somos ingenieros que asumen <br className="hidden md:block" />
            <span className="text-[#C9A96E] italic">riesgo técnico y financiero</span><br />
            por contrato.
          </h2>
        </div>

        {/* LISTA DE CLÁUSULAS (Estilo Contrato) */}
        <div className="relative">
          {/* Línea vertical conectora (solo desktop) */}
          <div className="hidden md:block absolute left-[38px] top-4 bottom-4 w-px bg-gradient-to-b from-[#C9A96E] via-[#2A2A2A] to-transparent opacity-30" />

          <div className="space-y-0">
            {clauses.map((clause, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { ref, isInView } = useInView(0.2);
              const isContractual = clause.type === "contractual";

              return (
                <div 
                  key={clause.id}
                  ref={ref}
                  className={`group relative flex flex-col md:flex-row gap-6 md:gap-12 border-b border-[#2A2A2A]/50 py-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#111111]/40 hover:px-6 -mx-6 px-6 sm:mx-0 sm:px-0 sm:hover:px-8 sm:-mx-8 rounded-xl
                    ${isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Número de Cláusula */}
                  <div className="flex items-start">
                    <div className={`font-mono text-3xl md:text-5xl font-light tracking-tighter transition-colors duration-500
                      ${isContractual ? 'text-[#C9A96E]/80 group-hover:text-[#C9A96E]' : 'text-[#F5F5F5]/20 group-hover:text-[#F5F5F5]/50'}`}>
                      {clause.id}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 md:pt-2">
                    <h3 className="text-xl md:text-2xl font-serif text-[#F5F5F5] mb-4 tracking-tight group-hover:text-[#C9A96E] transition-colors duration-300">
                      {clause.title}
                    </h3>
                    <p className="text-[#F5F5F5]/60 font-sans text-base leading-relaxed max-w-[600px]">
                      {clause.description}
                    </p>
                  </div>

                  {/* Etiqueta Contractual/Validada */}
                  <div className="md:w-48 flex items-start md:justify-end md:pt-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-sm font-mono text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300
                      ${isContractual 
                        ? 'border-[#C9A96E]/30 bg-[#C9A96E]/10 text-[#C9A96E] shadow-[0_0_15px_rgba(201,169,110,0.1)] group-hover:bg-[#C9A96E] group-hover:text-[#0A0A0A]' 
                        : 'border-[#2A2A2A] bg-[#111] text-[#F5F5F5]/50 group-hover:border-[#F5F5F5]/30 group-hover:text-[#F5F5F5]/80'
                      }`}
                    >
                      {isContractual ? <ShieldIcon /> : <CheckCircleIcon />}
                      {clause.tag}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA INFERIOR */}
        <div className="mt-20 pt-10 border-t border-[#111] flex justify-center">
         <button 
        onClick={() => setIsModalOpen(true)}
        className="group flex items-center justify-center gap-3 bg-[#C9A96E] text-[#0A0A0A] px-10 py-5 rounded-md font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#B8914A]"
      >
        Leer doctrina completa
        <ArrowIcon />
      </button>
        </div>

      </div>
      <DoctrinaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
