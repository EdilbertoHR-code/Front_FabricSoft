import { useEffect, useState } from "react";

type InteractionType = "proof" | "office-hours" | "reference" | "paper" | "waitlist" | "fabric-os" | "benchmark" | null;

const powDocs = [
  { icon: "SOW",   title: "SOW Fixed-Price firmado",           meta: "28 pp · ES · Cláusulas doctrinales explícitas · dic 2025", size: "2.4 MB", access: "locked" },
  { icon: "ACTA",  title: "Acta de primer cierre contable",    meta: "6 pp · Firmada por CFO + CTO + FABRIC · may 2026",         size: "820 KB", access: "locked" },
  { icon: "KPI",   title: "Tablero KPI · primer ciclo crítico",meta: "Dashboard ejecutivo · Auditado externamente · may 2026",    size: "1.1 MB", access: "locked" },
  { icon: "TRANS", title: "Plan de transición a soporte",      meta: "Documentación viva · 142 pp · En firma · may 2026",        size: "4.2 MB", access: "locked" },
  { icon: "PR",    title: "Comunicado público de go-live",     meta: "2 pp · ES · Aprobado por APE Plazas · 25 may 2026",        size: "340 KB", access: "public" },
];

const slots = [
  { time: "09:00", taken: false }, { time: "09:30", taken: true },
  { time: "10:00", taken: false }, { time: "10:30", taken: true },
  { time: "11:00", taken: false }, { time: "11:30", taken: false },
  { time: "14:00", taken: true  }, { time: "14:30", taken: false },
  { time: "15:00", taken: false }, { time: "16:00", taken: true  },
];

const days = ["LUN 02", "MAR 03", "MIÉ 04", "JUE 05", "VIE 06"];

const papers = [
  { num: "Paper 01", tag: "Research Note · Mercado", title: "Por qué fallan los go-live de Oracle Fusion", abstract: "Análisis de 47 implementaciones LATAM. Tres patrones recurrentes de fracaso, causas raíz documentadas, modelo alternativo de entrega.", meta: "8-10 pp · PDF ES · 15 min · May 2026" },
  { num: "Paper 02", tag: "Technical Framework · IA", title: "IA aplicada a cierre contable en Fusion Cloud", abstract: "Framework FABRIC con 4 capas operativas. Casos APE Plazas + Aplazo. Benchmarks de reducción de tiempo de cierre.", meta: "10-12 pp · PDF ES · 20 min · May 2026" },
  { num: "Paper 03", tag: "Doctrina Operativa · SOW", title: "Modelo de entrega en primer ciclo crítico", abstract: "Las 5 cláusulas doctrinales aplicadas. Redacción de RFP con criterios FABRIC. Validación post go-live documentada.", meta: "6-8 pp · PDF ES · 12 min · May 2026" },
];

export default function InteractionManager() {
  const [active, setActive] = useState<InteractionType>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedPaper, setSelectedPaper] = useState(0);
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-interaction]") as HTMLElement | null;
      if (!target) return;
      const type = target.getAttribute("data-interaction") as InteractionType;
      if (type) {
        e.preventDefault();
        setActive(type);
        setSubmitted(false);
        setSelectedSlot(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  if (!active) return null;

  const close = () => setActive(null);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(6,6,6,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 200ms ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: none; } }
        .im-modal { animation: slideUp 220ms cubic-bezier(0.16,1,0.3,1); }
        .im-doc-row:hover { border-color: var(--accent) !important; }
        .im-slot-btn:hover:not(:disabled) { border-color: var(--accent) !important; color: var(--accent) !important; }
        .im-slot-btn.selected { background: var(--accent) !important; color: var(--bg-base) !important; border-color: var(--accent) !important; }
        .im-day-btn.active { color: var(--accent) !important; border-color: var(--accent) !important; }
        .im-ref-row:hover { border-color: var(--accent) !important; background: rgba(201,169,110,0.04) !important; }
        .im-paper-tab.active { border-bottom: 2px solid var(--accent) !important; color: var(--accent) !important; }
      `}</style>

      {/* ── PROOF OF WORK (I02) ── */}
      {active === "proof" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 720, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "28px 32px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 48, background: "var(--accent)" }} />
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>Proof of Work · APE Plazas</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1.1 }}>Documentación <em style={{ color: "var(--accent)" }}>verificable.</em></div>
            </div>
            <button onClick={close} style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 18, cursor: "pointer", flexShrink: 0 }}>×</button>
          </div>

          <div style={{ padding: "24px 32px", overflowY: "auto", flex: 1 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Cinco documentos producidos durante el engagement APE Plazas. Acceso público a comunicados; el resto bajo NDA tras evaluación post-admisión.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {powDocs.map((doc) => (
                <div key={doc.icon} className="im-doc-row" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", border: "1px solid var(--border)", background: "var(--bg-base)", cursor: "pointer", transition: "border-color 200ms" }}>
                  <div style={{ width: 40, height: 48, border: "1px solid rgba(201,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 9, color: "var(--accent)", flexShrink: 0, letterSpacing: "0.1em" }}>{doc.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{doc.title}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", marginTop: 3, letterSpacing: "0.05em" }}>{doc.meta}</div>
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-tertiary)", flexShrink: 0 }}>{doc.size}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, padding: "4px 10px", border: `1px solid ${doc.access === "public" ? "rgba(201,169,110,0.4)" : "var(--border-strong)"}`, color: doc.access === "public" ? "var(--accent)" : "var(--text-tertiary)", flexShrink: 0, letterSpacing: "0.1em" }}>
                    {doc.access === "public" ? "↓ Descargar" : "🔒 NDA"}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "16px 20px", background: "var(--bg-base)", border: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 6, fontSize: 10 }}>Proceso de Acceso</strong>
              El acceso a documentos bajo NDA se otorga tras evaluación inicial. FABRIC valida ajuste estratégico (revenue, industria, patrocinio) y envía NDA mutuo. Tiempo típico: 3 días hábiles.
            </div>
          </div>

          <div style={{ padding: "16px 32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.1em" }}>5 documentos · 8.9 MB total · 1 público</span>
            <button onClick={() => setActive("waitlist")} style={{ padding: "12px 24px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
              Solicitar acceso completo →
            </button>
          </div>
        </div>
      )}

      {/* ── OFFICE HOURS / RESERVAR CONVERSACIÓN (I04) ── */}
      {active === "office-hours" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 760, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 40, background: "var(--accent)" }} />
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>FABRIC Office Hours</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26 }}>Reservar <em style={{ color: "var(--accent)" }}>conversación.</em></div>
            </div>
            <button onClick={close} style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          <div style={{ display: "flex", flex: 1, overflow: "hidden", flexWrap: "wrap" }}>
            {/* Left panel */}
            <div style={{ width: 240, borderRight: "1px solid var(--border)", padding: "24px 20px", overflowY: "auto", flexShrink: 0 }}>
              <div style={{ width: 48, height: 48, border: "1px solid var(--accent)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: 24, color: "var(--accent)", fontStyle: "italic", marginBottom: 16 }}>J</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 18, marginBottom: 4 }}>Julio Álvarez</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-secondary)", letterSpacing: "0.1em", marginBottom: 20 }}>Founder · FABRIC</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>30 min · Video call</div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Criterios de acceso</div>
                {["USD 50M+ revenue anual", "CFO / CIO / CTO / Dir. Transformación", "Iniciativa Oracle activa o planeada", "Decisión en menos de 12 meses"].map(c => (
                  <div key={c} style={{ display: "flex", gap: 8, marginBottom: 8, fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span>{c}
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", padding: "8px 12px", border: "1px solid var(--border)", letterSpacing: "0.05em", lineHeight: 1.5 }}>
                Confidencial · NDA mutuo al confirmar
              </div>
            </div>

            {/* Right: slot picker */}
            <div style={{ flex: 1, padding: "24px 20px", overflowY: "auto", minWidth: 0 }}>
              {!selectedSlot ? (
                <>
                  <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                    {days.map((d, i) => (
                      <button key={d} className={`im-day-btn${selectedDay === i ? " active" : ""}`} onClick={() => setSelectedDay(i)}
                        style={{ padding: "8px 14px", border: "1px solid var(--border)", background: "transparent", fontFamily: "var(--mono)", fontSize: 10, color: selectedDay === i ? "var(--accent)" : "var(--text-secondary)", cursor: "pointer", transition: "all 200ms", letterSpacing: "0.1em" }}>
                        {d}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>JULIO 2026 · CDMX</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    {slots.map((slot) => (
                      <button key={slot.time} disabled={slot.taken} onClick={() => setSelectedSlot(slot.time)}
                        className={`im-slot-btn${selectedSlot === slot.time ? " selected" : ""}`}
                        style={{ padding: "12px 8px", border: "1px solid var(--border)", background: "transparent", fontFamily: "var(--mono)", fontSize: 12, color: slot.taken ? "var(--text-tertiary)" : "var(--text-secondary)", cursor: slot.taken ? "not-allowed" : "pointer", textDecoration: slot.taken ? "line-through" : "none", transition: "all 200ms", letterSpacing: "0.05em" }}>
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  {!submitted ? (
                    <>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.2em", marginBottom: 16, textTransform: "uppercase" }}>
                        Slot seleccionado · {days[selectedDay]} · {selectedSlot}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {(["nombre", "empresa", "email"] as const).map((field) => (
                          <div key={field}>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{field}</div>
                            <input type={field === "email" ? "email" : "text"} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                              style={{ width: "100%", padding: "12px 14px", background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "var(--mono)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                          </div>
                        ))}
                        <button onClick={() => setSubmitted(true)} style={{ marginTop: 8, padding: "13px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                          Confirmar reserva →
                        </button>
                        <button onClick={() => setSelectedSlot(null)} style={{ padding: "10px", background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer", letterSpacing: "0.1em" }}>
                          ← Cambiar horario
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <div style={{ fontFamily: "var(--serif)", fontSize: 48, color: "var(--accent)", marginBottom: 16 }}>✓</div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 12 }}>Conversación <em>agendada.</em></div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        Recibirás confirmación en {formData.email || "tu email"}.<br />
                        Julio revisará tus criterios antes de la llamada.<br />
                        NDA mutuo se enviará 24h antes.
                      </div>
                      <button onClick={close} style={{ marginTop: 24, padding: "12px 24px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        Cerrar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: "12px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.1em" }}>America/Mexico_City · 4 slots / mes</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em" }}>Confidencial · NDA</span>
          </div>
        </div>
      )}

      {/* ── REFERENCIAS / INICIAR EVALUACIÓN (I05) ── */}
      {active === "reference" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 640, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 40, background: "var(--accent)" }} />
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>Referencias · Acceso verificado</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26 }}>Iniciar <em style={{ color: "var(--accent)" }}>evaluación.</em></div>
            </div>
            <button onClick={close} style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Las referencias ejecutivas se facilitan únicamente durante el proceso de evaluación post-admisión inicial. Acceso al contacto directo, no a un broker.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(["nombre", "empresa", "email"] as const).map((field) => (
                <div key={field}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{field === "email" ? "Email corporativo" : field}</div>
                  <input type={field === "email" ? "email" : "text"} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "var(--mono)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ padding: "14px 16px", background: "var(--bg-base)", border: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 4 }}>
                FABRIC revisará ajuste estratégico (revenue, industria, patrocinio ejecutivo) antes de facilitar el contacto. Tiempo de respuesta: 3 días hábiles.
              </div>
            </div>
          </div>
          <div style={{ padding: "16px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
            {!submitted ? (
              <button onClick={() => setSubmitted(true)} style={{ padding: "13px 28px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Iniciar evaluación →
              </button>
            ) : (
              <div style={{ textAlign: "center", width: "100%" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 8 }}>Solicitud <em style={{ color: "var(--accent)" }}>recibida.</em></div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)" }}>Respuesta en 3 días hábiles · Proceso bajo NDA mutuo</div>
                <button onClick={close} style={{ marginTop: 16, padding: "10px 20px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase" }}>Cerrar</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── DESCARGAR PAPER (I06) ── */}
      {active === "paper" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 680, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 40, background: "var(--accent)" }} />
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>Investigación FABRIC · Acceso gated</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26 }}>Descargar <em style={{ color: "var(--accent)" }}>paper.</em></div>
            </div>
            <button onClick={close} style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          {!submitted ? (
            <>
              <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                {papers.map((p, i) => (
                  <button key={i} className={`im-paper-tab${selectedPaper === i ? " active" : ""}`} onClick={() => setSelectedPaper(i)}
                    style={{ flex: 1, padding: "12px 8px", background: "transparent", border: "none", borderBottom: selectedPaper === i ? "2px solid var(--accent)" : "2px solid transparent", fontFamily: "var(--mono)", fontSize: 10, color: selectedPaper === i ? "var(--accent)" : "var(--text-tertiary)", cursor: "pointer", letterSpacing: "0.1em", transition: "all 200ms" }}>
                    {p.num}
                  </button>
                ))}
              </div>
              <div style={{ padding: "24px 28px", flex: 1, overflowY: "auto" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{papers[selectedPaper].tag}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.15, marginBottom: 12 }}>{papers[selectedPaper].title}</div>
                <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{papers[selectedPaper].abstract}</p>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.1em", marginBottom: 24 }}>{papers[selectedPaper].meta}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(["nombre", "empresa", "email"] as const).map((field) => (
                    <div key={field}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{field === "email" ? "Email corporativo" : field}</div>
                      <input type={field === "email" ? "email" : "text"} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                        style={{ width: "100%", padding: "11px 14px", background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "var(--mono)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "16px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setSubmitted(true)} style={{ padding: "13px 28px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                  Recibir paper →
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: "48px 28px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 48, color: "var(--accent)", marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 12 }}>{papers[selectedPaper].num} <em>enviado.</em></div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Recibirás el PDF en {formData.email || "tu email"}.<br />Solo emails corporativos. Tiempo: minutos.
              </div>
              <button onClick={close} style={{ marginTop: 24, padding: "10px 24px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer", letterSpacing: "0.2em", textTransform: "uppercase" }}>Cerrar</button>
            </div>
          )}
        </div>
      )}

      {/* ── WAIT LIST (I07) ── */}
      {active === "waitlist" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 600, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 40, background: "var(--accent)" }} />
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>Wait List · Q3 2026 · 1 lugar disponible</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26 }}>Solicitar <em style={{ color: "var(--accent)" }}>lugar.</em></div>
            </div>
            <button onClick={close} style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          {!submitted ? (
            <>
              <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  FABRIC evalúa ajuste estratégico antes de aceptar un lugar en lista. La selección protege la capacidad operativa del equipo.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { field: "nombre" as const, label: "Nombre completo" },
                    { field: "empresa" as const, label: "Empresa" },
                    { field: "email" as const, label: "Email corporativo" },
                  ].map(({ field, label }) => (
                    <div key={field}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                      <input type={field === "email" ? "email" : "text"} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                        style={{ width: "100%", padding: "12px 14px", background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "var(--mono)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div style={{ padding: "14px 16px", background: "var(--bg-base)", border: "1px solid var(--border)", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 4 }}>
                    <strong style={{ color: "var(--accent)", display: "block", marginBottom: 4, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Criterios mínimos</strong>
                    Revenue anual USD 50M+ · Iniciativa Oracle activa · Patrocinio ejecutivo C-level · Plazo de decisión menor a 12 meses
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.05em" }}>Aplicación bajo NDA mutuo</span>
                <button onClick={() => setSubmitted(true)} style={{ padding: "13px 28px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                  Solicitar lugar →
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: "48px 28px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 48, color: "var(--accent)", marginBottom: 16 }}>✓</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 12 }}>Solicitud <em>recibida.</em></div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                FABRIC revisará tu perfil en 5 días hábiles.<br />
                Recibirás respuesta en {formData.email || "tu email"}.<br />
                Si califica, se enviará NDA mutuo.
              </div>
              <button onClick={close} style={{ marginTop: 24, padding: "10px 24px", background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 10, cursor: "pointer", letterSpacing: "0.2em", textTransform: "uppercase" }}>Cerrar</button>
            </div>
          )}
        </div>
      )}

      {/* ── BENCHMARK INDEX — early access ── */}
      {active === "benchmark" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 600, width: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 40, background: "var(--accent)" }} />
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>FABRIC Benchmark Index · Anual · Q4 2026</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26 }}>Early access al <em style={{ color: "var(--accent)" }}>reporte.</em></div>
            </div>
            <button onClick={close} style={{ width: 36, height: 36, border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>

          <div style={{ padding: "24px 28px", flex: 1 }}>
            <div style={{ padding: "16px 20px", border: "1px solid var(--border)", marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {[
                "% de implementaciones Oracle que fallan",
                "Razones más comunes de fracaso",
                "Tiempo promedio de cierre post go-live",
                "Comparativo de consultoras (sin nombrar)",
                "Best practices para CFO/CTO en RFP Oracle",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span>{item}
                </div>
              ))}
            </div>

            {!submitted ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {(["nombre", "empresa", "email"] as const).map((field) => (
                  <div key={field}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
                      {field === "email" ? "Email corporativo" : field}
                    </div>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "var(--mono)", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-tertiary)", lineHeight: 1.6, marginTop: 4 }}>
                  Reporte gratuito. Acceso gateado por email corporativo — no gmail, hotmail, yahoo.
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 42, color: "var(--accent)", marginBottom: 12 }}>✓</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 10 }}>Lugar <em>reservado.</em></div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Recibirás el reporte en {formData.email || "tu email"} al lanzamiento Q4 2026.<br />
                  Solo correos corporativos verificados.
                </div>
              </div>
            )}
          </div>

          {!submitted && (
            <div style={{ padding: "16px 28px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSubmitted(true)}
                style={{ padding: "13px 28px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Reservar early access →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── FABRIC OS (I03) — redirige internamente ── */}
      {active === "fabric-os" && (
        <div className="im-modal" style={{ background: "var(--bg-panel)", border: "1px solid var(--border-strong)", maxWidth: 520, width: "100%", padding: "40px 36px" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>FABRIC OS · Arquitectura completa</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 30, marginBottom: 16 }}>El manual técnico <em style={{ color: "var(--accent)" }}>completo.</em></div>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            La página /fabric-os documenta las 4 capas en detalle con stack técnico, catálogo FSO extendido y roadmap de agentes IA. Disponible en Q3 2026.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setActive("waitlist")} style={{ padding: "12px 24px", background: "var(--accent)", color: "var(--bg-base)", border: "none", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
              Solicitar acceso anticipado →
            </button>
            <button onClick={close} style={{ padding: "12px 20px", background: "transparent", border: "1px solid var(--border-strong)", color: "var(--text-secondary)", fontFamily: "var(--mono)", fontSize: 11, cursor: "pointer", letterSpacing: "0.1em" }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
