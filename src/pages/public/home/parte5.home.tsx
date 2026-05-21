import { useEffect, useRef, useState, type FormEvent } from "react";

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

// --- ICONOS ---
function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- MODAL DE DIAGNÓSTICO CON HONEYPOT (Anti-Spam) ---
function DiagnosticModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Estado para atrapar bots

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setHoneypot("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // TRAMPA ANTI-SPAM (Honeypot)
    // Si el campo invisible tiene texto, es un bot. Detenemos el envío silenciosamente.
    if (honeypot.length > 0) {
      console.log("Bot detectado y bloqueado.");
      return; 
    }

    // Aquí iría tu lógica real para enviar los datos a tu backend (ej. Supabase, Email, etc.)
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-[600px] bg-[#0A0A0A] border border-[#2A2A2A] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 sm:p-10 rounded-xl overflow-hidden">
        
        {/* Glow decorativo de fondo */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#C9A96E] opacity-[0.05] blur-[80px]" />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center bg-[#111] text-[#F5F5F5]/60 border border-[#2A2A2A] rounded-full transition-all duration-300 hover:scale-110 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 z-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <div className="relative z-10 animate-[slideUp_0.4s_ease-out]">
            <div className="mb-8">
              <span className="inline-flex mb-3 border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] rounded-full">
                Paso 1 de 2 · Datos Corporativos
              </span>
              <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl tracking-tight">Iniciar Diagnóstico</h3>
              <p className="mt-2 font-sans text-sm text-[#F5F5F5]/60">
                Déjanos tus datos para generar tu ID de expediente. A continuación accederás al cuestionario técnico de 12 preguntas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* === EL CAMPO HONEYPOT (INVISIBLE PARA HUMANOS, VISIBLE PARA BOTS) === */}
              <input 
                type="text" 
                name="company_website_url_check" 
                className="opacity-0 absolute -z-10 w-0 h-0" 
                tabIndex={-1} 
                autoComplete="off" 
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
              {/* =================================================================== */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Nombre Completo</span>
                  <input required type="text" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Cargo / Rol</span>
                  <input required type="text" placeholder="Ej. CFO, Director TI" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all" />
                </label>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Correo Corporativo</span>
                  <input required type="email" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Teléfono (Opcional)</span>
                  <input type="tel" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all" />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Empresa</span>
                  <input required type="text" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all" />
                </label>
              </div>
              
              <button type="submit" className="mt-6 w-full group flex items-center justify-center gap-3 border border-[#C9A96E] bg-[#C9A96E] rounded-md px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A] transition-all duration-300 hover:bg-[#B8914A] shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:shadow-[0_0_30px_rgba(201,169,110,0.5)] active:scale-[0.98]">
                Continuar al Cuestionario Técnico
                <ArrowIcon />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-[slideUp_0.4s_ease-out] relative z-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A96E]/10 border border-[#C9A96E] text-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.3)] animate-[pulse_2s_ease-in-out_infinite]">
              <CheckIcon />
            </div>
            <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl">Expediente Creado</h3>
            <p className="mt-4 font-sans text-base text-[#F5F5F5]/60 max-w-md">
              Tus datos han sido registrados bajo estricta confidencialidad. Te enviaremos el enlace al cuestionario de 12 preguntas por correo. Entregaremos los resultados en <span className="text-[#C9A96E] font-medium">5 días hábiles</span>.
            </p>
            <button onClick={onClose} className="mt-10 border-b border-[#C9A96E]/50 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] pb-1 hover:text-[#F5F5F5] hover:border-[#F5F5F5] transition-colors duration-300">
              Cerrar portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// COMPONENTE PRINCIPAL
// =========================================================================
export default function Parte5Home() {
  const { ref: headerRef, isInView: headerInView } = useInView(0.2);
  const { ref: previewRef, isInView: previewInView } = useInView(0.2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    "Patrones de fracaso identificados según síntomas",
    "Estimación de complejidad de rescate",
    "Plan de remediación accionable",
    "Costos y plazos estimados"
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 text-[#F5F5F5] md:py-32">
      
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 bg-[#C9A96E] opacity-[0.04] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center xl:gap-20">
          
          {/* =========================================
              LEFT: COPYWRITING & CTA
              ========================================= */}
          <div ref={headerRef} className={`relative flex flex-col justify-center transition-all duration-1000 ${headerInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            
            <div className="mb-6 inline-flex w-fit items-center gap-2 border border-[#C9A96E]/30 bg-[#C9A96E]/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A96E]"></span>
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
                Lead Magnet · Rescue Diagnostic
              </span>
            </div>

            <h2 className="font-serif text-[38px] leading-[1.05] md:text-[54px] lg:text-[60px] text-[#F5F5F5] tracking-tight mb-6">
              ¿Tu Oracle Fusion está implementado pero <span className="text-[#C9A96E] italic">el negocio sigue sufriendo?</span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-[#F5F5F5]/60 mb-10 max-w-[580px]">
              Si tienes cierre contable pesado, reportes manuales paralelos, usuarios sin adopción o incidencias críticas, FABRIC realiza un <span className="text-[#F5F5F5]">diagnóstico ejecutivo en 5 días hábiles</span>.
            </p>

            <div className="space-y-4 mb-12">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E]">
                    <CheckIcon />
                  </div>
                  <p className="font-sans text-[15px] leading-relaxed text-[#F5F5F5]/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-center gap-3 border border-[#C9A96E] bg-[#C9A96E]/10 px-8 py-4 rounded-md font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#0A0A0A] shadow-[0_0_20px_rgba(201,169,110,0.1)] hover:shadow-[0_0_30px_rgba(201,169,110,0.3)] active:scale-[0.98]"
              >
                Iniciar diagnóstico
                <ArrowIcon />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#F5F5F5]/40 ml-2">
                12 preguntas · 5 minutos · Resultado en 5 días hábiles
              </p>
            </div>
          </div>

          {/* =========================================
              RIGHT: LIVE PREVIEW DASHBOARD
              ========================================= */}
          <div ref={previewRef} className={`relative flex-col justify-center lg:flex transition-all duration-1000 delay-300 ${previewInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            
            <div className="relative border border-[#2A2A2A] bg-[#0A0A0A] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:p-8 rounded-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />

              {/* Header Card */}
              <div className="mb-6 flex items-center justify-between border-b border-[#2A2A2A]/60 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
                    Live Preview
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40">Diagnostic_Report.pdf</span>
              </div>

              <div className="border border-[#2A2A2A] bg-[#111] rounded-lg overflow-hidden">
                
                {/* Severidad Alert */}
                <div className="bg-red-950/20 border-b border-red-900/30 px-6 py-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5F5]/60">Nivel de Severidad</span>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-[11px] font-bold tracking-widest text-red-400">ALTO</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-px bg-[#2A2A2A]">
                  <div className="bg-[#111] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5]/40 mb-2">Cierre Contable</p>
                    <p className="font-serif text-2xl text-red-400">&gt;15 días</p>
                  </div>
                  <div className="bg-[#111] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5]/40 mb-2">Reportes Manuales</p>
                    <p className="font-serif text-2xl text-[#F5F5F5]">12 activos</p>
                  </div>
                  <div className="bg-[#111] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5]/40 mb-2">Adopción Usuarios</p>
                    <p className="font-serif text-2xl text-red-400">42%</p>
                  </div>
                  <div className="bg-[#111] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5]/40 mb-2">Incidencias Críticas</p>
                    <p className="font-serif text-2xl text-[#F5F5F5]">7 abiertas</p>
                  </div>
                </div>

                {/* Footer Insight */}
                <div className="p-6 bg-gradient-to-br from-[#111] to-[#C9A96E]/5 border-t border-[#2A2A2A]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#C9A96E] mb-3">Patrón Detectado</p>
                  <p className="font-serif text-2xl md:text-3xl text-[#F5F5F5] mb-6">Abandono post go-live</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#2A2A2A]/60 gap-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-[#F5F5F5]/40 mb-1">Plazo remediación</p>
                      <p className="font-mono text-[11px] text-[#F5F5F5]/80">8-12 semanas</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-mono text-[8px] uppercase tracking-widest text-[#F5F5F5]/40 mb-1">Inversión Típica</p>
                      <p className="font-mono text-[11px] font-bold text-[#C9A96E]">USD 150K - 300K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DiagnosticModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}