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
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L13.9 8.1L19 10L13.9 11.9L12 17L10.1 11.9L5 10L10.1 8.1L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    }, 15); // Velocidad de tipeo del agente

    return () => clearInterval(interval);
  }, [text, isTyping]);

  // FIX: Scroll estricto interno mientras tipea (evita que brinque la página)
  useEffect(() => {
    const container = document.getElementById("chat-scroll-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [visibleText]);

  return (
    <p className="text-sm leading-relaxed text-[#F5F5F5]/80 whitespace-pre-wrap">
      {visibleText}
      {isTyping && visibleText.length < text.length && (
        <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-[#C9A96E] align-middle" />
      )}
    </p>
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

  // FIX: Scroll suave solo cuando se envía un mensaje nuevo
  useEffect(() => {
    const container = document.getElementById("chat-scroll-container");
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleScenarioClick = (scenarioKey: ScenarioKey) => {
    if (isTyping) return;
    const scenario = scenarios.find(s => s.key === scenarioKey)!;
    
    // El usuario "escribe" el prompt
    setChatHistory(prev => [...prev, { role: 'user', text: scenario.prompt }]);
    setIsTyping(true);

    // El agente responde después de un breve delay
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
    <section id="fabric-ai" className="relative w-full overflow-hidden bg-[#050505] py-20 text-[#F5F5F5] md:py-28">
      
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 m-auto h-[600px] w-[600px] -translate-y-1/2 bg-[#C9A96E] opacity-[0.03] blur-[150px]" />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center xl:gap-20">
          
          {/* =========================================
              LEFT: COPYWRITING & INTRO
              ========================================= */}
          <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 border border-[#C9A96E]/30 bg-transparent px-4 py-1.5 rounded-full mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A96E]"></span>
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">
                Fabric AI · Inferencia Técnica
              </span>
            </div>

            <h2 className="font-serif text-[38px] leading-[1.05] md:text-[54px] lg:text-[60px] text-[#F5F5F5] mb-6">
              Asistente de diagnóstico <span className="text-[#C9A96E] italic">Oracle</span>.
            </h2>

            <p className="text-base leading-relaxed text-[#F5F5F5]/60 mb-10 max-w-[500px]">
              Evalúa tu infraestructura en segundos. Identifica riesgos ocultos en tu implementación Fusion o planifica migraciones sin sobrecostos usando nuestro motor de inferencia técnica.
            </p>

            {/* Badges de estado */}
            <div className="flex flex-wrap gap-4 border-l border-[#C9A96E]/30 pl-5">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-[#F5F5F5]/40 mb-1">Versión</p>
                <p className="font-mono text-xs font-bold text-[#F5F5F5]">FABRIC AI v2.4</p>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-[#F5F5F5]/40 mb-1">Estado</p>
                <p className="font-mono text-xs font-bold text-green-400">Operational</p>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              {/* FIX 2: Botón que hace auto-focus a la terminal en lugar de recargar */}
              <button 
                onClick={handleFocusChat}
                className="group inline-flex items-center justify-center gap-3 border border-[#C9A96E] bg-transparent px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] transition-all hover:bg-[#C9A96E] hover:text-black shadow-[0_0_20px_-5px_rgba(201,169,110,0.2)] hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
              >
                Diagnóstico Interactivo <ArrowIcon />
              </button>
            </div>
          </div>

          {/* =========================================
              RIGHT: CHATBOX INTERACTIVO
              ========================================= */}
          <div className={`relative w-full max-w-[700px] justify-self-center lg:justify-self-end transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative flex flex-col h-[550px] overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A] rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-300 focus-within:border-[#C9A96E]/50 focus-within:shadow-[0_30px_100px_rgba(201,169,110,0.15)]">
              
              {/* Resplandor superior */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />

              {/* Cabecera del chat */}
              <div className="flex items-center justify-between border-b border-[#2A2A2A] bg-[#111] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#C9A96E]/30 bg-[#C9A96E]/10 text-[#C9A96E]">
                    <SparkIcon />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#F5F5F5]">Diagnostic Engine</p>
                    <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#C9A96E]">Oracle ecosystem ready</p>
                  </div>
                </div>
              </div>

              {/* Historial del Chat (Id estricto para scroll nativo) */}
              <div id="chat-scroll-container" className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#2A2A2A] scroll-smooth">
                {chatHistory.map((msg, idx) => {
                  const isAgent = msg.role === 'agent';
                  // Solo animar el último mensaje del agente si está tipeando
                  const animateText = isAgent && idx === chatHistory.length - 1 && isTyping;

                  return (
                    <div key={idx} className={`flex ${isAgent ? 'justify-start' : 'justify-end'} animate-[fadeIn_0.4s_ease-out]`}>
                      <div className={`max-w-[85%] flex flex-col gap-2 ${isAgent ? 'items-start' : 'items-end'}`}>
                        
                        {/* Etiqueta del remitente */}
                        <div className="flex items-center gap-1.5 opacity-60">
                          {isAgent ? <SparkIcon /> : <UserIcon />}
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5F5]">
                            {isAgent ? 'FABRIC AI' : 'Tú'}
                          </span>
                        </div>
                        
                        {/* Burbuja del mensaje */}
                        <div className={`p-4 text-sm ${
                          isAgent 
                            ? 'bg-[#161616] border border-[#2A2A2A] rounded-xl' 
                            : 'bg-[#C9A96E]/10 border border-[#C9A96E]/30 rounded-xl text-[#F5F5F5]'
                        }`}>
                          {animateText ? (
                            <TypingEffect text={msg.text} isTyping={true} />
                          ) : (
                            <p className="text-[#F5F5F5]/80 whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Controles Inferiores (Prompts y Input) */}
              <div className="border-t border-[#2A2A2A] bg-[#111] p-4">
                
                {/* Preguntas Sugeridas */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {scenarios.map((scen) => (
                    <button
                      key={scen.key}
                      onClick={() => handleScenarioClick(scen.key)}
                      disabled={isTyping}
                      className="border border-[#2A2A2A] bg-[#0A0A0A] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#F5F5F5]/60 transition-colors hover:border-[#C9A96E]/50 hover:text-[#C9A96E] disabled:opacity-30 rounded-full"
                    >
                      {scen.shortLabel}
                    </button>
                  ))}
                </div>

                {/* Input interactivo */}
                <form onSubmit={handleManualSubmit} className="relative flex items-center">
                  <span className="absolute left-4 font-mono text-[#C9A96E]">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isTyping}
                    placeholder={isTyping ? "Diagnosticando..." : "Describe tu escenario técnico..."}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-md py-3.5 pl-8 pr-12 font-mono text-xs text-[#F5F5F5] outline-none transition-colors focus:border-[#C9A96E]/50 disabled:opacity-50 focus:shadow-[0_0_15px_rgba(201,169,110,0.1)]"
                  />
                  <button 
                    type="submit" 
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-3 text-[#C9A96E] disabled:text-[#2A2A2A] transition-colors"
                  >
                    <ArrowIcon />
                  </button>
                </form>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}