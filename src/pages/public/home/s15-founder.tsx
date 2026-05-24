import { useEffect, useState } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { useCapacidad, useMetrica } from '../../../store/FabricContext';
import { countSlots } from '../../../store/fabricStore';
import { api } from '../../../config/api';

function useCountdown(isoDate: string) {
  const calc = () => {
    const diff = new Date(isoDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [isoDate]);
  return time;
}

function CountdownBanner({ isoDate }: { isoDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(isoDate);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="countdown-banner">
      <span className="countdown-label">Cierre Q3 2026:</span>
      <span className="countdown-time">
        {pad(days)}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
      </span>
      <span className="countdown-sub">restantes · 30 julio</span>
    </div>
  );
}

export default function S15Founder() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();

  // Fallback: datos del store (in-memory)
  const { slots: ctxSlots, waitlist, admissionQuarters, deadlineQ3: ctxDeadline } = useCapacidad();
  const metricaSlots    = useMetrica('slots');
  const metricaWaitlist = useMetrica('waitlist');

  // Override desde API cuando esté disponible
  const [apiSlots, setApiSlots]       = useState<Array<{id: number; status: string}> | null>(null);
  const [apiDeadline, setApiDeadline] = useState<string | null>(null);

  useEffect(() => {
    api.get('/capacidad')
      .then(res => {
        const d = res.data.data;
        if (d.slots?.length) setApiSlots(d.slots);
        if (d.deadlineQ3)    setApiDeadline(d.deadlineQ3);
      })
      .catch(() => {});
  }, []);

  const slots    = apiSlots ?? ctxSlots;
  const deadlineQ3 = apiDeadline ?? ctxDeadline;

  const { activos, reservados } = countSlots(slots);
  const proyectosActivos = metricaSlots?.value   ?? activos;
  const enListaEspera    = metricaWaitlist?.value ?? waitlist.length;

  // Próxima ventana abierta
  const proximaVentana = admissionQuarters.find(q => q.status === 'open')?.quarter ?? 'Q3 2026';

  return (
    <section ref={ref} id="s15" className={`demo-section s15 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="container">
        <div className="founder-manifesto">
          <div className="label" style={{ marginBottom: 24 }}>Manifiesto del Fundador</div>
          <blockquote>
            No construimos sitios bonitos.<br />
            Construimos <span className="text-[#C9A96E]">la firma de Oracle Critical Engineering</span><br />
            más seria de México y LATAM.
          </blockquote>
          <cite>— Julio Álvarez</cite>
        </div>

        {/* ── Bloque Founder ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: 80,
          alignItems: "start",
          maxWidth: 1080,
          marginInline: "auto",
          marginBottom: 80,
        }}>

          {/* Foto */}
          <div style={{ position: "relative" }}>
            {/* Línea decorativa izquierda */}
            <div style={{
              position: "absolute",
              left: -24,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
              opacity: 0.4,
            }} />
            <img
              src="/julio_alvarez.jpeg"
              alt="Julio Álvarez — Founder FABRIC"
              style={{
                width: "100%",
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(100%) contrast(1.05)",
                display: "block",
              }}
            />
            {/* Caption bajo la foto */}
            <div style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
              fontFamily: "var(--mono)",
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              display: "flex",
              justifyContent: "space-between",
            }}>
              <span>Ciudad de México · México</span>
              <span>Founder · 2026</span>
            </div>
          </div>

          {/* Bio */}
          <div style={{ paddingTop: 8 }}>
            {/* Eyebrow */}
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              Founder · FABRIC
            </div>

            {/* Nombre */}
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(48px, 5vw, 72px)",
              fontWeight: 300,
              color: "var(--text-primary)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}>
              Julio<br />Álvarez
            </div>

            {/* Bio */}
            <p style={{
              fontFamily: "var(--sans)",
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: 28,
              maxWidth: 480,
            }}>
              20+ años en arquitectura Oracle, ERP empresarial y transformación de operaciones críticas. Liderando la firma de Oracle Critical Engineering en México con expansión hacia USA.
            </p>

            {/* Nota NDA */}
            <div style={{
              borderLeft: "2px solid var(--accent)",
              paddingLeft: 16,
              marginBottom: 48,
            }}>
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: 13,
                fontStyle: "italic",
                color: "var(--text-tertiary)",
                lineHeight: 1.7,
              }}>
                Equipo senior bajo NDA hasta el primer engagement. Acceso a equipo directo se otorga tras admisión inicial.
              </p>
            </div>

            {/* Credenciales */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid var(--border)",
            }}>
              {[
                { num: "20+", lbl: "Años Oracle" },
                { num: "100%", lbl: "Senior team" },
                { num: "15+", lbl: "Certificaciones vigentes" },
              ].map((c, i) => (
                <div key={i} style={{
                  padding: "28px 0",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  paddingRight: i < 2 ? 32 : 0,
                  paddingLeft: i > 0 ? 32 : 0,
                }}>
                  <div style={{
                    fontFamily: "var(--serif)",
                    fontSize: 40,
                    fontWeight: 300,
                    color: "var(--accent)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>{c.num}</div>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: 8,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                  }}>{c.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="waitlist">
          <CountdownBanner isoDate={deadlineQ3} />

          <div className="waitlist-head">
            <div>
              <div className="label" style={{ marginBottom: 16 }}>Wait List · Q3 2026</div>
              <h3>FABRIC opera con un máximo de <span className="text-[#C9A96E]">12 proyectos simultáneos.</span></h3>
            </div>

            {/* Slots en vivo desde el store */}
            <div className="waitlist-capacity" title={`Capacidad: ${activos} ocupados · ${reservados} reservados · ${12 - activos - reservados} disponible`}>
              {slots.map((s, i) => (
                <span
                  key={i}
                  className={`slot${s.status === 'activo' ? ' filled' : s.status === 'reservado' ? ' reserved' : ''}`}
                />
              ))}
            </div>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 720 }}>
            Para garantizar entrega en primer ciclo crítico, mantenemos disciplina de capacidad. La selectividad protege la calidad operativa.
          </p>

          {/* Estadísticas en vivo */}
          <div className="waitlist-stats">
            <div className="waitlist-stat">
              <div className="num">{proyectosActivos}</div>
              <div className="lbl">Proyectos activos</div>
            </div>
            <div className="waitlist-stat">
              <div className="num small">{proximaVentana}</div>
              <div className="lbl">Próxima ventana</div>
            </div>
            <div className="waitlist-stat">
              <div className="num">{enListaEspera}</div>
              <div className="lbl">En lista de espera</div>
            </div>
          </div>

          {/* Ciclo de admisión en vivo */}
          <div className="admission">
            <div className="admission-head">Ciclo de Admisión 2026</div>
            {admissionQuarters.map(q => (
              <div className="admission-row" key={q.quarter}>
                <span className="admission-q">{q.quarter}</span>
                <span className={`admission-status ${q.status}`}>{q.label}</span>
                <span style={{ color: q.status === 'open' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {q.description}
                </span>
                <span className={`admission-deadline${q.status === 'open' ? ' active' : ''}`}>
                  {q.deadline}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a href="/aplicar" className="btn-primary">Solicitar lugar en lista →</a>
            <span className="nda-seal">Aplicación bajo NDA</span>
          </div>
        </div>

      </div>
    </section>
  );
}
