import { useEffect, useRef, useState, type FormEvent } from "react";

// --- HOOK PARA ANIMACIONES AL SCROLLEAR ---
function useInView(threshold = 0.1) {
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

// --- DATOS DE EMPRESAS EN LISTA DE ESPERA ---
const waitlistCompanies = [
  { name: "BBVA México", initials: "BB", industry: "Banca y Finanzas", status: "Evaluación técnica" },
  { name: "Grupo Banorte", initials: "BN", industry: "Servicios Financieros", status: "Prioritaria" },
  { name: "FEMSA", initials: "FM", industry: "Retail y Logística", status: "Pre-aprobado" },
  { name: "Mercado Pago", initials: "MP", industry: "Fintech", status: "Evaluación" },
  { name: "Grupo Bimbo", initials: "GB", industry: "Manufactura", status: "Due diligence" },
  { name: "Nu Holdings", initials: "NU", industry: "Banca Digital", status: "En espera" },
  { name: "Aeroméxico", initials: "AM", industry: "Aviación", status: "Evaluación" },
];

const bullets = [
  "Análisis comparativo por componente cloud",
  "Estimación de ahorro mensual y anual",
  "Inversión y plazo de breakeven exacto",
  "Consideraciones técnicas de migración a OCI",
];

const metrics = [
  { label: "Cloud actual", value: "AWS" },
  { label: "Gasto mensual", value: "$28,500" },
  { label: "Compute", value: "$12,400" },
  { label: "Storage", value: "$5,800" },
  { label: "Database (RDS)", value: "$7,200" },
  { label: "Equivalente OCI", value: "$18,900" },
];

// --- MODAL DE REGISTRO ---
function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-[550px] bg-[#0D0D0D] border border-[#2A2A2A] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 sm:p-10 rounded-xl overflow-hidden">
        
        {/* Glow decorativo */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#C9A96E] opacity-[0.05] blur-[80px]" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center bg-[#111] text-[#F5F5F5]/60 border border-[#2A2A2A] rounded-full transition-all duration-300 hover:scale-110 hover:text-[#C9A96E] hover:border-[#C9A96E]/50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <div className="relative z-10 animate-[slideUp_0.4s_ease-out]">
            <div className="mb-8">
              <span className="inline-flex mb-3 border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] rounded-full">
                Acceso Selectivo
              </span>
              <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl tracking-tight">Solicitar evaluación</h3>
              <p className="mt-2 font-sans text-sm text-[#F5F5F5]/60">
                Ingresa tus datos corporativos. Evaluaremos tu perfil para asignarte a la próxima cohorte de diagnóstico.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Nombre</span>
                  <input required type="text" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all duration-300" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Apellido</span>
                  <input required type="text" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all duration-300" />
                </label>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Correo Corporativo</span>
                  <input required type="email" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all duration-300" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Teléfono</span>
                  <input required type="tel" placeholder="+52" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all duration-300" />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Empresa</span>
                  <input required type="text" className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all duration-300" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">Cloud Actual</span>
                  <select className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all duration-300 cursor-pointer appearance-none">
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">Google Cloud (GCP)</option>
                    <option value="otros">Otro / On-Premise</option>
                  </select>
                </label>
              </div>
              
              <button type="submit" className="mt-6 w-full group flex items-center justify-center gap-3 border border-[#C9A96E] bg-[#C9A96E]/10 rounded-md px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] transition-all duration-300 hover:bg-[#C9A96E] hover:text-black shadow-[0_0_20px_rgba(201,169,110,0.15)] hover:shadow-[0_0_30px_rgba(201,169,110,0.4)] active:scale-[0.98]">
                Unirme a la lista de espera
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H19M13 6L19 12L13 18" />
                </svg>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-[slideUp_0.4s_ease-out] relative z-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A96E]/10 border border-[#C9A96E] text-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.3)] animate-[pulse_2s_ease-in-out_infinite]">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl">Solicitud Recibida</h3>
            <p className="mt-4 font-sans text-base text-[#F5F5F5]/60 max-w-sm">
              Tu perfil ha sido registrado con éxito. Nuestro comité técnico evaluará tu caso y te notificará los siguientes pasos.
            </p>
            <button onClick={onClose} className="mt-10 border-b border-[#C9A96E]/50 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] pb-1 hover:text-[#F5F5F5] hover:border-[#F5F5F5] transition-colors duration-300">
              Cerrar ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function S04TcoWaitlist() {
  const { ref: headerRef, isInView: headerInView } = useInView(0.2);
  const { ref: previewRef, isInView: previewInView } = useInView(0.2);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="cloud-tco" className="relative w-full overflow-hidden bg-[#050505] py-24 text-[#F5F5F5] md:py-32">
      
      {/* --- ESTILOS INLINE PARA ANIMACIONES --- */}
      <style>{`
        @keyframes wave-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave { animation: wave-scroll 25s linear infinite; width: 200%; }
        .animate-wave-slow { animation: wave-scroll 35s linear infinite reverse; width: 200%; }
      `}</style>

      {/* --- ONDAS DORADAS AL FONDO --- */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] w-full overflow-hidden pointer-events-none opacity-20">
        <div className="animate-wave absolute bottom-0 flex h-full items-end">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-[80px] w-full fill-none stroke-[#C9A96E] stroke-[1.5px]">
            <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 M1200,60 C1350,120 1550,0 1800,60 C2050,120 2250,0 2400,60" />
          </svg>
        </div>
        <div className="animate-wave-slow absolute bottom-0 flex h-full items-end">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-[120px] w-full fill-none stroke-[#C9A96E] stroke-[1px] opacity-50">
            <path d="M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 M1200,60 C1400,0 1600,120 1800,60 C2000,0 2200,120 2400,60" />
          </svg>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 m-auto h-[600px] w-[600px] -translate-y-1/2 bg-[#C9A96E] opacity-[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
        
        {/* ENCABEZADO CENTRADO CON TOQUES DORADOS */}
        <div 
          ref={headerRef} 
          className={`mx-auto mb-16 max-w-[800px] text-center transition-all duration-1000 ${headerInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C9A96E]/20 bg-[#C9A96E]/5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A96E]"></span>
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
              Lead Magnet · Cloud TCO
            </span>
          </div>
          
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-tight text-[#F5F5F5]">
            ¿Cuánto pagas <span className="text-[#C9A96E]">realmente</span> en AWS, GCP o Azure?
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] font-sans text-lg text-[#F5F5F5]/60 leading-relaxed">
            Estimamos el ahorro potencial y el retorno de inversión exacto de una migración estratégica hacia <span className="text-[#F5F5F5]/90">Oracle Cloud Infrastructure (OCI).</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:items-start">
          
          {/* LEFT: Dashboard Preview */}
          <div 
            ref={previewRef} 
            className={`order-2 lg:order-1 transition-all duration-1000 delay-200 ${previewInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="relative border border-[#2A2A2A] bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] md:p-8 rounded-xl hover:border-[#C9A96E]/40 transition-colors duration-500 group">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="mb-6 flex items-center justify-between border-b border-[#2A2A2A]/60 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
                    Live Preview
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40">Reporte_TCO.pdf</span>
              </div>

              <div className="border border-[#2A2A2A]/60 bg-[#111] p-6 rounded-lg">
                <div className="space-y-4">
                  {metrics.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-[#2A2A2A]/40 pb-3 last:border-b-0 last:pb-0">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5F5F5]/60">
                        {item.label}
                      </span>
                      <span className={`font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${index === metrics.length - 1 ? 'text-[#C9A96E]' : 'text-[#F5F5F5]/80'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-[#2A2A2A] pt-6 text-center bg-[#C9A96E]/[0.02] p-5 rounded-md border border-[#C9A96E]/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C9A96E]/5 to-transparent pointer-events-none" />
                  <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]/80">Ahorro anual estimado</p>
                  <p className="relative z-10 mt-2 font-serif text-4xl tracking-tight text-[#C9A96E]">$115,200</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Beneficios, CTA y Avatares */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <div className="space-y-5">
              {bullets.map((item, index) => (
                <div key={index} className="flex items-start gap-4 border-b border-[#2A2A2A]/40 pb-4">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#C9A96E]/10 border border-[#C9A96E]/30 text-[#C9A96E]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-sans text-[15px] leading-relaxed text-[#F5F5F5]/70">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 mb-8">
              <h3 className="font-serif text-[26px] leading-tight text-[#F5F5F5] mb-3">
                No abrimos esta herramienta para <span className="italic text-[#F5F5F5]/50">todos</span>.
              </h3>
              <p className="font-sans text-[15px] text-[#F5F5F5]/60 leading-relaxed mb-8">
                El acceso es exclusivo y por cohortes. Las organizaciones reciben prioridad según su complejidad técnica y encaje estratégico.
              </p>
              
              {/* Botón CTA Dorado */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-[#C9A96E] text-black px-8 py-4 rounded-md font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_-5px_rgba(201,169,110,0.4)] hover:shadow-[0_0_35px_-5px_rgba(201,169,110,0.7)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Solicitar acceso prioritario
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H19M13 6L19 12L13 18" />
                </svg>
              </button>
            </div>

            {/* AVATARES APILADOS (Totalmente responsivos y animados) */}
            <div className="border-t border-[#2A2A2A]/60 pt-8 relative z-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3 flex items-center gap-2">
                    Lista de Espera Activa
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {waitlistCompanies.slice(0, 5).map((company, i) => (
                        <div 
                          key={i} 
                          className="group relative z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111] ring-4 ring-[#050505] transition-all duration-300 hover:z-30 hover:-translate-y-1.5 hover:border-[#C9A96E] hover:shadow-[0_5px_15px_rgba(201,169,110,0.2)]"
                        >
                          <span className="font-serif text-[11px] font-bold text-[#F5F5F5]/60 transition-colors duration-300 group-hover:text-[#C9A96E]">
                            {company.initials}
                          </span>

                          {/* Tooltip Hover Exclusivo */}
                          <div className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 flex min-w-[140px] flex-col items-center border border-[#2A2A2A] bg-[#0A0A0A] px-3 py-2.5 opacity-0 backdrop-blur-md transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none z-40 rounded shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#C9A96E] mb-1 text-center">
                              {company.status}
                            </p>
                            <p className="font-sans text-[13px] font-medium text-[#F5F5F5] text-center whitespace-nowrap">
                              {company.name}
                            </p>
                            {/* Flecha del tooltip */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#2A2A2A]" />
                            <div className="absolute top-full left-1/2 -mt-[1px] -translate-x-1/2 border-[5px] border-transparent border-t-[#0A0A0A]" />
                          </div>
                        </div>
                      ))}
                      {/* Avatar extra: "+2" */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111] ring-4 ring-[#050505] transition-all duration-300 hover:border-[#C9A96E]/50">
                        <span className="font-mono text-[10px] font-bold text-[#F5F5F5]/50">
                          +{waitlistCompanies.length - 5}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="font-mono text-[14px] font-bold text-[#F5F5F5] leading-none">+{waitlistCompanies.length}</span>
                      <span className="font-sans text-[11px] text-[#F5F5F5]/50 leading-tight">Empresas en cola</span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 border-[#2A2A2A]/40 pt-4 sm:pt-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40 mb-1">Próxima Cohorte</p>
                  <p className="font-mono text-[14px] font-bold text-[#C9A96E] tracking-[0.1em]">Q3 2026</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}