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
// --- MODAL DE DIAGNÓSTICO CON HONEYPOT + CAPTCHA ---
function DiagnosticModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const createCaptcha = () => {
    const a = Math.floor(Math.random() * 8) + 3;
    const b = Math.floor(Math.random() * 7) + 2;
    return { a, b, answer: a + b };
  };

  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setHoneypot("");
      setCaptcha(createCaptcha());
      setCaptchaAnswer("");
      setAuthorized(false);
      setFormError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const refreshCaptcha = () => {
    setCaptcha(createCaptcha());
    setCaptchaAnswer("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (honeypot.length > 0) {
      console.log("Bot detectado y bloqueado.");
      return;
    }

    if (Number(captchaAnswer) !== captcha.answer) {
      setFormError("La validación anti-bot no coincide. Inténtalo nuevamente.");
      refreshCaptcha();
      return;
    }

    if (!authorized) {
      setFormError("Debes aceptar que FABRIC revise la información enviada.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="relative max-h-[92vh] w-full max-w-[680px] overflow-y-auto bg-[#0A0A0A] border border-[#2A2A2A] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 sm:p-10 rounded-xl">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#C9A96E] opacity-[0.05] blur-[80px]" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center bg-[#111] text-[#F5F5F5]/60 border border-[#2A2A2A] rounded-full transition-all duration-300 hover:scale-110 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 z-50"
          aria-label="Cerrar modal"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <div className="relative z-10 animate-[slideUp_0.4s_ease-out]">
            <div className="mb-8">
              <span className="inline-flex mb-3 border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] rounded-full">
                Acceso selectivo · Evaluación inicial
              </span>

              <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl tracking-tight">
                Solicitar revisión FABRIC
              </h3>

              <p className="mt-2 font-sans text-sm text-[#F5F5F5]/60">
                Comparte tus datos corporativos para crear un expediente inicial. Nuestro equipo técnico revisará si el caso encaja con la especialidad, capacidad y estándares de entrega de FABRIC.
              </p>

              <p className="mt-4 border-l border-[#C9A96E]/60 bg-[#C9A96E]/5 px-4 py-3 font-sans text-xs leading-6 text-[#F5F5F5]/55">
                No todos los proyectos pasan a revisión ejecutiva. Priorizamos escenarios donde podemos aportar valor medible, operar con equipo senior y proteger la calidad de entrega.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="company_website_url_check"
                className="opacity-0 absolute -z-10 w-0 h-0"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Nombre completo
                  </span>
                  <input
                    required
                    type="text"
                    className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Cargo / rol
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="Ej. CFO, Director TI"
                    className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Correo corporativo
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="nombre@empresa.com"
                    className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Teléfono
                  </span>
                  <input
                    type="tel"
                    className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                  Empresa
                </span>
                <input
                  required
                  type="text"
                  className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Tipo de proyecto
                  </span>
                  <select
                    required
                    defaultValue=""
                    className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="rescate-fusion">Rescate Oracle Fusion</option>
                    <option value="sap-ebs-fusion">Migración SAP/EBS a Fusion</option>
                    <option value="greenfield-oracle">Greenfield Oracle</option>
                    <option value="cloud-oci">Cloud / OCI</option>
                    <option value="otro">Otro</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Urgencia del caso
                  </span>
                  <select
                    required
                    defaultValue=""
                    className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="critico">Crítico · Operación detenida</option>
                    <option value="alto">Alto · Cierre/reportes afectados</option>
                    <option value="medio">Medio · Planeación de migración</option>
                    <option value="exploratorio">Exploratorio</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                  Describe brevemente el escenario
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="Ej. Tenemos cierre contable manual, reportes fuera del ERP, baja adopción o incidencias críticas..."
                  className="w-full resize-none bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm leading-6 text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_160px] sm:items-end">
                <div className="rounded-md border border-[#2A2A2A] bg-[#111]/80 px-4 py-3">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">
                    Validación anti-bot
                  </span>
                  <p className="mt-2 text-sm text-[#F5F5F5]/65">
                    Resuelve:{" "}
                    <span className="font-mono font-bold text-[#C9A96E]">
                      {captcha.a} + {captcha.b}
                    </span>
                  </p>
                </div>

                <input
                  required
                  type="number"
                  inputMode="numeric"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Respuesta"
                  className="w-full bg-[#111] border border-[#2A2A2A] rounded-md px-4 py-3 text-sm text-[#F5F5F5] outline-none focus:border-[#C9A96E] focus:bg-black transition-all"
                />
              </div>

              <label className="flex items-start gap-3 rounded-md border border-[#2A2A2A] bg-[#111]/60 px-4 py-3">
                <input
                  required
                  type="checkbox"
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#C9A96E]"
                />

                <span className="text-xs leading-6 text-[#F5F5F5]/55">
                  Acepto que FABRIC revise la información enviada para determinar si el caso califica para una evaluación ejecutiva.
                </span>
              </label>

              {formError ? (
                <p className="rounded-md border border-[#B85450]/40 bg-[#B85450]/10 px-4 py-3 text-xs leading-6 text-[#E7A09D]">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-6 w-full group flex items-center justify-center gap-3 border border-[#C9A96E] bg-[#C9A96E] rounded-md px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0A0A0A] transition-all duration-300 hover:bg-[#B8914A] shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:shadow-[0_0_30px_rgba(201,169,110,0.5)] active:scale-[0.98]"
              >
                Solicitar evaluación ejecutiva
                <ArrowIcon />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-[slideUp_0.4s_ease-out] relative z-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A96E]/10 border border-[#C9A96E] text-[#C9A96E] shadow-[0_0_30px_rgba(201,169,110,0.3)] animate-[pulse_2s_ease-in-out_infinite]">
              <CheckIcon />
            </div>

            <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl">
              Expediente recibido
            </h3>

            <p className="mt-4 font-sans text-base text-[#F5F5F5]/60 max-w-md">
              Gracias. Tu solicitud entrará a revisión inicial por el equipo técnico de FABRIC.
            </p>

            <p className="mt-4 font-sans text-sm leading-7 text-[#F5F5F5]/55 max-w-md">
              Validaremos empresa, contexto Oracle, urgencia operativa, patrocinio ejecutivo y posibilidad real de impacto. Si el caso califica, recibirás una respuesta al correo corporativo registrado con los siguientes pasos.
            </p>

            <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-[#2A2A2A] bg-[#111] px-4 py-3">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#C9A96E]">
                  01
                </p>
                <p className="mt-2 text-xs leading-5 text-[#F5F5F5]/55">
                  Filtro ejecutivo
                </p>
              </div>

              <div className="rounded-md border border-[#2A2A2A] bg-[#111] px-4 py-3">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#C9A96E]">
                  02
                </p>
                <p className="mt-2 text-xs leading-5 text-[#F5F5F5]/55">
                  Revisión técnica
                </p>
              </div>

              <div className="rounded-md border border-[#2A2A2A] bg-[#111] px-4 py-3">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#C9A96E]">
                  03
                </p>
                <p className="mt-2 text-xs leading-5 text-[#F5F5F5]/55">
                  Respuesta por correo
                </p>
              </div>
            </div>

            <p className="mt-5 border border-[#C9A96E]/25 bg-[#C9A96E]/5 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#C9A96E]">
              FABRIC abre capacidad solo para proyectos donde puede sostener calidad senior.
            </p>

            <button
              onClick={onClose}
              className="mt-10 border-b border-[#C9A96E]/50 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] pb-1 hover:text-[#F5F5F5] hover:border-[#F5F5F5] transition-colors duration-300"
            >
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
    <section id="diagnostico" className="relative w-full overflow-hidden bg-[#050505] py-24 text-[#F5F5F5] md:py-32">
      
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