import { useEffect } from "react";

export function DoctrinaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[800px] h-[90vh] bg-[#0A0A0A] border border-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header del documento */}
        <div className="px-8 py-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#050505]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A96E]">Documento Legal</p>
            <h2 className="font-serif text-xl text-[#F5F5F5]">Doctrina FABRIC: Manifiesto de Ingeniería</h2>
          </div>
          <button onClick={onClose} className="p-2 text-[#888] hover:text-[#C9A96E] transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Contenido (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 font-serif text-[#F5F5F5]/80 space-y-12">
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#F5F5F5]">Nuestra postura técnica y financiera.</h3>
            <p className="leading-relaxed text-lg">
              FABRIC no opera bajo el modelo tradicional de consultoría. Nuestro compromiso es la <b>estabilidad operativa absoluta</b>. No vendemos horas hombre, vendemos la garantía técnica de que tu sistema funcionará bajo los estándares de Oracle Critical Engineering.
            </p>
          </div>

          <div className="space-y-10 border-t border-[#1A1A1A] pt-12">
            {[
              { id: "01", title: "Entrega en primer ciclo crítico", desc: "El proyecto se declara finalizado únicamente cuando tu primer cierre contable o ciclo regulatorio crítico opera con estabilidad absoluta." },
              { id: "02", title: "Ingeniería Senior Exclusiva", desc: "Cero juniors facturables. Cada integrante de nuestro equipo posee mínimo 8 años de experiencia real implementando soluciones Oracle." },
              { id: "03", title: "Fixed-Price por Fase", desc: "Presupuestos cerrados. Si el retraso es atribuible a nuestra metodología, FABRIC asume el costo de las semanas adicionales." },
              { id: "04", title: "Cero Reportes Manuales", desc: "Si persiste una tarea manual en tu cierre por omisión nuestra, lo resolvemos sin costo hasta su completa automatización." },
              { id: "05", title: "Documentación Viva", desc: "Tu equipo heredará documentación auditable, actualizable y sin dependencia técnica de nuestros consultores." }
            ].map((clause) => (
              <div key={clause.id} className="flex gap-6">
                <span className="font-mono text-[#C9A96E]">{clause.id}</span>
                <div>
                  <h4 className="font-bold text-[#F5F5F5] mb-2">{clause.title}</h4>
                  <p className="text-sm leading-relaxed text-[#F5F5F5]/60">{clause.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#111] p-6 border-l-4 border-[#C9A96E] italic text-sm">
            "Este manifiesto constituye la base de nuestros Acuerdos de Nivel de Servicio (SLA) corporativos."
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-[#1A1A1A] bg-[#050505] text-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#888]">FABRIC Engineering · Copy 2026</p>
        </div>
      </div>
    </div>
  );
}