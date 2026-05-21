import { useEffect, useMemo, useState, useRef } from "react";

// --- HOOK PARA ANIMACIÓN AL HACER SCROLL ---
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

// --- TIPOS Y DATOS ---
type ScenarioKey = "fusion" | "migration" | "greenfield";

type Scenario = {
  key: ScenarioKey;
  shortLabel: string;
  prompt: string;
  response: string;
};

const scenarios: Scenario[] = [
  {
    key: "fusion",
    shortLabel: "Mi Fusion está fallando",
    prompt: "Mi implementación Fusion tiene 6 meses y aún tenemos cierre contable manual. ¿Qué sugieres?",
    response: "Alerta: Patrón de abandono post go-live detectado.\nDiagnóstico: Usualmente provocado por falta de estabilización técnica. Síntomas incluyen reportes paralelos, cierres lentos y baja adopción.\nAcción: Recomendamos una inyección de protocolos de ingeniería crítica. Plazo típico de remediación: 8 a 12 semanas. ¿Deseas agendar una revisión técnica?",
  },
  {
    key: "migration",
    shortLabel: "Migración SAP/EBS a Fusion",
    prompt: "Queremos migrar desde SAP/EBS a Oracle Fusion con menor riesgo.",
    response: "Escenario estratégico detectado: Migración con control de riesgo.\nDiagnóstico: Este caso requiere estricto gobierno de programa y estimación TCO antes del diseño.\nAcción: Recomendamos un assessment técnico y financiero para validar dependencias. Plazo típico de planeación: 6-10 semanas. ¿Te gustaría calcular el TCO estimado?",
  },
  {
    key: "greenfield",
    shortLabel: "Greenfield Oracle",
    prompt: "Quiero iniciar un greenfield Oracle Fusion sin sobrecostos.",
    response: "Escenario de diseño detectado: Greenfield con gobierno temprano.\nDiagnóstico: El foco crítico debe ser el diseño de arquitectura y criterios de éxito desde el día cero.\nAcción: Sugerimos ejecutar nuestra fase de discovery orientada al primer ciclo crítico. Plazo típico de diseño: 6-10 semanas.",
  },
];

// --- ICONS ---
function ArrowIcon() {
  return (
    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L13.9 8.1L19 10L13.9 11.9L12 17L10.1 11.9L5 10L10.1 8.1L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// --- TYPEWRITER EFFECT COMPONENT ---
function TypingEffect({ text, isTyping }: { text: string; isTyping: boolean }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!isTyping) {
      setVisibleText(text);
      return;
    }

    setVisibleText("");
    let i = 0;
    const interval = setInterval(() => {
      setVisibleText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [text, isTyping]);

  useEffect(() => {
    const container = document.getElementById("chat-scroll-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [visibleText]);

  return (
    <div className="font-sans text-[12px] leading-[1.7] text-[#A0A0A0] whitespace-pre-wrap">
      {visibleText}
      {isTyping && visibleText.length < text.length && (
        <span className="ml-1 inline-block h-[12px] w-[3px] animate-pulse bg-[#C9A96E] align-middle" />
      )}
    </div>
  );
}

// =========================================================================
// MAIN COMPONENT
// =========================================================================
export default function ChatIa() {
  const { ref: sectionRef, isInView } = useInView(0.15);
  
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'agent', text: string}[]>([
    { role: 'agent', text: "Sistema de diagnóstico FABRIC IA en línea.\nEscribe tu problema o selecciona un escenario predeterminado." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = document.getElementById("chat-scroll-container");
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleScenarioClick = (scenarioKey: ScenarioKey) => {
    if (isTyping) return;
    const scenario = scenarios.find(s => s.key === scenarioKey)!;
    
    setChatHistory(prev => [...prev, { role: 'user', text: scenario.prompt }]);
    setIsTyping(true);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'agent', text: scenario.response }]);
      setIsTyping(false);
    }, 600);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    setChatHistory(prev => [...prev, { role: 'user', text: inputValue }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'agent', text: "Entendido. Un ingeniero de FABRIC revisará este escenario específico. Para un análisis en profundidad, te recomendamos agendar un diagnóstico formal a través del menú superior." }]);
      setIsTyping(false);
    }, 800);
  };

  const handleFocusChat = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="fabric-ai" className="relative w-full overflow-hidden bg-[#050505] py-16 md:py-24 text-[#F5F5F5] border-t border-[#111]">
      
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 m-auto h-[500px] w-[500px] -translate-y-1/2 bg-[#C9A96E] opacity-[0.03] blur-[120px]" />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center xl:gap-16">
          
          {/* =========================================
              LEFT: COPYWRITING & INTRO
              ========================================= */}
          <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-3 py-1 rounded-sm mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A96E]"></span>
              </span>
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
                Fabric AI · Inferencia
              </span>
            </div>

            <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[50px] leading-[1.05] text-[#F5F5F5] mb-5">
              Asistente de diagnóstico <span className="text-[#C9A96E] italic">Oracle</span>.
            </h2>

            <p className="font-sans text-[13px] md:text-[14px] leading-[1.7] text-[#888] mb-8 max-w-[460px]">
              Evalúa tu infraestructura en segundos. Identifica riesgos ocultos en tu implementación Fusion o planifica migraciones sin sobrecostos usando nuestro motor técnico.
            </p>

            {/* Badges de estado */}
            <div className="flex flex-wrap gap-5 border-l border-[#2A2A2A] pl-4">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-[#555] mb-1">Versión</p>
                <p className="font-mono text-[10.5px] font-bold text-[#F5F5F5]">FABRIC AI v2.4</p>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-[#555] mb-1">Estado</p>
                <p className="font-mono text-[10.5px] font-bold text-[#C9A96E]">Operational</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleFocusChat}
                className="group inline-flex items-center gap-3 border border-[#2A2A2A] bg-transparent px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#888] transition-all duration-300 hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-[#C9A96E]/[0.04]"
              >
                Activar Consola <ArrowIcon />
              </button>
            </div>
          </div>

          {/* =========================================
              RIGHT: CHATBOX INTERACTIVO (Atelier Grade)
              ========================================= */}
          <div className={`relative w-full max-w-[640px] justify-self-center lg:justify-self-end transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Contenedor principal de la Consola con la animación del borde */}
            <div className="relative flex flex-col h-[460px] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
              
              {/* === LA LÍNEA ANIMADA DORADA QUE RECORRE EL BORDE === */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-sm bg-[#161616]">
                <div className="absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(transparent_270deg,#C9A96E_360deg)] animate-[spin_3s_linear_infinite]" />
              </div>

              {/* El interior que enmascara el centro, dejando solo un borde de 1px visible */}
              <div className="absolute inset-[1px] z-10 flex flex-col bg-[#0A0A0A] rounded-sm transition-shadow duration-500 focus-within:shadow-[inset_0_0_40px_rgba(201,169,110,0.05)]">
                
                {/* Cabecera del chat */}
                <div className="flex items-center justify-between border-b border-[#1A1A1A] bg-[#050505] px-4 py-3 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center border border-[#C9A96E]/20 bg-[#C9A96E]/5 text-[#C9A96E] rounded-sm">
                      <SparkIcon />
                    </div>
                    <div>
                      <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.15em] text-[#F5F5F5]">Diagnostic Engine</p>
                      <p className="font-mono text-[7.5px] uppercase tracking-wider text-[#555]">Oracle ecosystem ready</p>
                    </div>
                  </div>
                </div>

                {/* Historial del Chat */}
                <div id="chat-scroll-container" className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-[#1A1A1A] scrollbar-track-transparent">
                  {chatHistory.map((msg, idx) => {
                    const isAgent = msg.role === 'agent';
                    const animateText = isAgent && idx === chatHistory.length - 1 && isTyping;

                    return (
                      <div key={idx} className={`flex ${isAgent ? 'justify-start' : 'justify-end'} animate-[fadeIn_0.3s_ease-out]`}>
                        <div className={`max-w-[85%] flex flex-col gap-1.5 ${isAgent ? 'items-start' : 'items-end'}`}>
                          
                          <div className="flex items-center gap-1.5 opacity-50">
                            {isAgent ? <SparkIcon /> : <UserIcon />}
                            <span className="font-mono text-[8px] uppercase tracking-widest text-[#F5F5F5]">
                              {isAgent ? 'FABRIC AI' : 'Usuario'}
                            </span>
                          </div>
                          
                          {/* Burbuja mejorada: Textos a 12px y padding ajustado */}
                          <div className={`px-4 py-3 rounded-sm ${
                            isAgent 
                              ? 'bg-[#050505] border border-[#1A1A1A]' 
                              : 'bg-[#C9A96E]/5 border border-[#C9A96E]/20 text-[#E0E0E0] font-sans text-[12px]'
                          }`}>
                            {animateText ? (
                              <TypingEffect text={msg.text} isTyping={true} />
                            ) : (
                              <p className={`whitespace-pre-wrap leading-[1.7] ${isAgent ? 'font-sans text-[12px] text-[#A0A0A0]' : 'font-sans text-[12px]'}`}>
                                {msg.text}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Controles Inferiores */}
                <div className="border-t border-[#1A1A1A] bg-[#050505] p-3 shrink-0">
                  
                  {/* Escenarios predeterminados */}
                  <div className="mb-3 flex flex-nowrap overflow-x-auto gap-2 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {scenarios.map((scen) => (
                      <button
                        key={scen.key}
                        onClick={() => handleScenarioClick(scen.key)}
                        disabled={isTyping}
                        className="group shrink-0 relative flex items-center gap-2 border border-[#2A2A2A] bg-[#0D0D0D] px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#888] transition-all duration-300 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] hover:bg-[#C9A96E]/[0.04] disabled:opacity-30"
                      >
                        <span className="text-[#C9A96E]/40 group-hover:text-[#C9A96E] transition-colors duration-300">›</span>
                        {scen.shortLabel}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleManualSubmit} className="relative flex items-center">
                    <span className="absolute left-3 font-mono text-[10px] text-[#C9A96E]">&gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      disabled={isTyping}
                      placeholder={isTyping ? "Diagnosticando..." : "Describe tu escenario técnico..."}
                      className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-sm py-2.5 pl-7 pr-10 font-mono text-[10.5px] text-[#F5F5F5] outline-none transition-colors focus:border-[#C9A96E]/40 disabled:opacity-50 placeholder:text-[#333]"
                    />
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-3 text-[#C9A96E] disabled:text-[#333] transition-colors"
                    >
                      <ArrowIcon />
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}