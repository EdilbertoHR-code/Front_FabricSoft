import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInViewOnce } from "../../../hooks/useInViewOnce";

const modulos = [
  {
    id: 1, icon: "F", key: "FUSION",
    nombre: "Oracle Fusion Cloud",
    tag: "Financials · Procurement · HCM · SCM · EPM",
    detalle: "Todos los módulos de Oracle Fusion Cloud: implementación, rescate post go-live, estabilización del primer ciclo crítico y transición formal a soporte.",
    estado: "Scope principal · FABRIC",
  },
  {
    id: 2, icon: "E", key: "EBS",
    nombre: "Oracle EBS",
    tag: "E-Business Suite · R12 · Migración",
    detalle: "Oracle E-Business Suite. Migraciones EBS R12 hacia Oracle Fusion Cloud con control de riesgo y entrega en primer ciclo crítico.",
    estado: "Scope · Migraciones",
  },
  {
    id: 3, icon: "J", key: "JDE",
    nombre: "Oracle JD Edwards",
    tag: "JDE · EnterpriseOne · Migración",
    detalle: "Oracle JD Edwards EnterpriseOne. Migraciones desde JDE hacia Oracle Fusion Cloud sin downtime operativo crítico.",
    estado: "Scope · Migraciones",
  },
  {
    id: 4, icon: "P", key: "PS",
    nombre: "Oracle PeopleSoft",
    tag: "PeopleSoft · HRMS · Finanzas · Migración",
    detalle: "Oracle PeopleSoft. Migraciones desde PeopleSoft hacia Oracle Fusion Cloud con estabilización documentada del primer ciclo.",
    estado: "Scope · Migraciones",
  },
  {
    id: 5, icon: "O", key: "OCI",
    nombre: "Oracle Cloud Infra",
    tag: "OCI · Tenancy · Zero-Trust · Costos",
    detalle: "Oracle Cloud Infrastructure. Diagnóstico gratuito de optimización de tenant OCI. Reducción de costo mensual documentada. Zero-Trust aplicado.",
    estado: "Scope · Optimizador OCI",
  },
  {
    id: 6, icon: "I", key: "OIC",
    nombre: "Oracle Integration Cloud",
    tag: "OIC · APIs · Conectores · Middleware",
    detalle: "Oracle Integration Cloud. Integraciones críticas entre módulos y sistemas externos. Arquitectura documentada sin dependencia de FABRIC post-transición.",
    estado: "Scope · FABRIC",
  },
  {
    id: 7, icon: "M", key: "MIG",
    nombre: "Migraciones Oracle",
    tag: "SAP · EBS · JDE · PeopleSoft → Fusion",
    detalle: "Migraciones desde cualquier ERP hacia Oracle Fusion Cloud. SAP S/4 HANA, EBS R12, JDE EnterpriseOne, PeopleSoft. Entrega en primer ciclo crítico por contrato.",
    estado: "Scope · Prioridad 2",
  },
  {
    id: 8, icon: "A", key: "IA",
    nombre: "IA Aplicada Oracle",
    tag: "Conciliación · Anomalías · CFO Assistant",
    detalle: "Aplicación de IA en procesos Oracle: conciliación automática, detección de anomalías de cierre, notas a estados financieros y predicción de partidas pendientes.",
    estado: "Scope · FABRIC OS",
  },
];

export default function Parte7Home() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  const active = modulos[activeIndex];

  React.useEffect(() => {
    if (isHovering) return;
    const t = setInterval(() => setActiveIndex(i => (i + 1) % modulos.length), 4000);
    return () => clearInterval(t);
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      id="s07-radar"
      className={`demo-section transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)", padding: "120px 0" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container">

        {/* ── Encabezado ── */}
        <div style={{ marginBottom: 72 }}>
          <div className="label" style={{ marginBottom: 16 }}>Cobertura de Ecosistema Oracle</div>
          <h2 style={{ marginBottom: 16, maxWidth: 560 }}>
            Mapeo activo de{" "}
            <span className="text-[#C9A96E] italic">riesgo operativo.</span>
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 520 }}>
            FABRIC opera en todo el ecosistema Oracle: Fusion Cloud, EBS, JDE, PeopleSoft, OCI, OIC y migraciones entre plataformas. Un scope único, dominado a profundidad.
          </p>
        </div>

        {/* ── Layout principal: grid nodos + detalle ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

          {/* ── Columna izquierda: grid de nodos ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {modulos.map((m, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={m.id}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    background: isActive
                      ? "linear-gradient(145deg, #1e1a12 0%, #16130a 100%)"
                      : "linear-gradient(145deg, #161616 0%, #101010 100%)",
                    border: `1px solid ${isActive ? "rgba(201,169,110,0.6)" : "rgba(201,169,110,0.1)"}`,
                    boxShadow: isActive
                      ? "0 0 32px rgba(201,169,110,0.15), inset 0 1px 0 rgba(201,169,110,0.12)"
                      : "inset 0 1px 0 rgba(255,255,255,0.02)",
                    transition: "all 300ms ease",
                  }}
                >
                  {/* Línea superior activa */}
                  {isActive && (
                    <motion.div
                      layoutId="active-line"
                      style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                      }}
                    />
                  )}

                  {/* Letra serif */}
                  <span style={{
                    fontFamily: "var(--serif)",
                    fontSize: 26,
                    fontWeight: 400,
                    lineHeight: 1,
                    color: isActive ? "var(--accent)" : "rgba(201,169,110,0.3)",
                    transition: "color 300ms ease",
                  }}>
                    {m.icon}
                  </span>

                  {/* Key label */}
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: 7,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isActive ? "rgba(201,169,110,0.7)" : "rgba(201,169,110,0.18)",
                    transition: "color 300ms ease",
                  }}>
                    {m.key}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* ── Columna derecha: tarjeta de detalle ── */}
          <div style={{ position: "sticky", top: 120 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  background: "linear-gradient(160deg, #1a1a1a 0%, #111 60%, #0d0d0d 100%)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  padding: "40px 40px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(201,169,110,0.06), 0 24px 64px rgba(0,0,0,0.5)",
                }}
              >
                {/* Línea top */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, var(--accent), transparent 70%)",
                }} />

                {/* Número fantasma */}
                <div style={{
                  position: "absolute", bottom: -20, right: 20,
                  fontFamily: "var(--serif)",
                  fontSize: 140,
                  fontWeight: 300,
                  color: "var(--accent)",
                  opacity: 0.04,
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}>
                  {active.icon}
                </div>

                {/* Eyebrow */}
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  marginBottom: 28,
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <span>Módulo {String(activeIndex + 1).padStart(2, "0")} / {String(modulos.length).padStart(2, "0")}</span>
                  <span style={{ color: "rgba(201,169,110,0.4)" }}>{active.key}</span>
                </div>

                {/* Nombre */}
                <div style={{
                  fontFamily: "var(--serif)",
                  fontSize: 32,
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                  marginBottom: 10,
                }}>
                  {active.nombre}
                </div>

                {/* Tag */}
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 24,
                }}>
                  {active.tag}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

                {/* Detalle */}
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: 15,
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}>
                  {active.detalle}
                </p>

                {/* Estado */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}>
                  <span style={{
                    display: "inline-block",
                    width: 5, height: 5,
                    background: "var(--accent)",
                    borderRadius: "50%",
                    flexShrink: 0,
                    boxShadow: "0 0 8px var(--accent)",
                  }} />
                  <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                  }}>
                    {active.estado}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots de navegación */}
            <div style={{ display: "flex", gap: 6, marginTop: 20, alignItems: "center" }}>
              {modulos.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.5 }}
                  style={{
                    width: i === activeIndex ? 20 : 5,
                    height: 5,
                    background: i === activeIndex ? "var(--accent)" : "var(--border)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 350ms cubic-bezier(0.4,0,0.2,1), background 200ms",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
