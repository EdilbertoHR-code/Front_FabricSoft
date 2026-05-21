
import { useEffect, useState } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';

const admissionRows = [
  ["Q1 2026", "closed", "Cerrado", "3 proyectos aceptados", "○ Completo"],
  ["Q2 2026", "closed", "Cerrado", "2 proyectos aceptados", "○ Completo"],
  ["Q3 2026", "open", "Abierto", "Evaluando aplicaciones", "Plazo · 30 julio"],
  ["Q4 2026", "upcoming", "Próximo", "Aplicaciones desde 01 sept", "○ Próximo"]
] as const;

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownBanner() {
  const deadline = new Date('2026-07-30T23:59:59-06:00');
  const { days, hours, minutes, seconds } = useCountdown(deadline);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="countdown-banner">
      <span className="countdown-emoji">⏳</span>
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

        <div className="founder-grid" style={{ gridTemplateColumns: "1fr", maxWidth: 920, marginInline: "auto" }}>
          <div className="julio-bio-block">
            <div className="julio-name">Julio Álvarez</div>
            <div className="julio-title">Founder · FABRIC</div>
            <p className="julio-bio">
              20+ años en arquitectura Oracle, ERP empresarial y transformación de operaciones críticas. Liderando la firma de Oracle Critical Engineering en México con expansión hacia USA.
            </p>
            <p className="julio-note">
              Equipo senior bajo NDA hasta el primer engagement. Acceso a equipo directo se otorga tras admisión inicial.
            </p>

            <div className="julio-credentials">
              <div className="cell">
                <div className="num">20+</div>
                <div className="lbl">Años Oracle</div>
              </div>
              <div className="cell">
                <div className="num">100%</div>
                <div className="lbl">Senior team</div>
              </div>
              <div className="cell">
                <div className="num">15+</div>
                <div className="lbl">Certificaciones vigentes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="waitlist">
          <CountdownBanner />
          <div className="waitlist-head">
            <div>
              <div className="label" style={{ marginBottom: 16 }}>Wait List · Q3 2026</div>
              <h3>FABRIC opera con un máximo de <span className="text-[#C9A96E]">12 proyectos simultáneos.</span></h3>
            </div>
            <div className="waitlist-capacity" title="Capacidad: 9 ocupados · 2 reservados · 1 disponible">
              {Array.from({ length: 9 }).map((_, index) => <span className="slot filled" key={`filled-${index}`}></span>)}
              <span className="slot reserved"></span>
              <span className="slot reserved"></span>
              <span className="slot"></span>
            </div>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 720 }}>
            Para garantizar entrega en primer ciclo crítico, mantenemos disciplina de capacidad. La selectividad protege la calidad operativa.
          </p>

          <div className="waitlist-stats">
            <div className="waitlist-stat">
              <div className="num">9</div>
              <div className="lbl">Proyectos activos</div>
            </div>
            <div className="waitlist-stat">
              <div className="num small">Q3 2026</div>
              <div className="lbl">Próxima ventana</div>
            </div>
            <div className="waitlist-stat">
              <div className="num">7</div>
              <div className="lbl">En lista de espera</div>
            </div>
          </div>

          <div className="admission">
            <div className="admission-head">Ciclo de Admisión 2026</div>
            {admissionRows.map(([quarter, statusClass, status, desc, deadline]) => (
              <div className="admission-row" key={quarter}>
                <span className="admission-q">{quarter}</span>
                <span className={`admission-status ${statusClass}`}>{status}</span>
                <span style={{ color: statusClass === "open" ? "var(--text-primary)" : "var(--text-secondary)" }}>{desc}</span>
                <span className={`admission-deadline${statusClass === "open" ? " active" : ""}`}>{deadline}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a href="#aplicar" data-interaction="waitlist" className="btn-primary">Solicitar lugar en lista →</a>
            <span className="nda-seal">Aplicación bajo NDA</span>
          </div>
        </div>

        <div className="founder-line">
          <div className="founder-line-label">Founder Line · Acceso Directo</div>
          <p className="founder-line-text">
            Si tu organización considera una iniciativa Oracle mayor a USD 1M, <span className="text-[#C9A96E]">Julio Álvarez recibe estas conversaciones directamente.</span>
          </p>
          <a className="founder-line-email" href="mailto:julio@fabricsoft.com.mx">
            <span>julio@fabricsoft.com.mx</span>
            <span className="copy-hint">Click para copiar</span>
          </a>
          <div className="founder-line-note">
            Respuesta personal en menos de 24 horas hábiles · Conversación bajo NDA mutuo
          </div>
        </div>
      </div>
    </section>
  );
}
