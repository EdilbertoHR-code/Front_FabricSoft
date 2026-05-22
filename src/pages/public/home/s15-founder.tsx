import { useEffect, useState } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { useCapacidad, useMetrica } from '../../../store/FabricContext';
import { countSlots } from '../../../store/fabricStore';

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

  // Datos en vivo del store — los mismos que controla el admin
  const { slots, waitlist, admissionQuarters, deadlineQ3 } = useCapacidad();
  const metricaSlots    = useMetrica('slots');
  const metricaWaitlist = useMetrica('waitlist');

  const { activos, reservados } = countSlots(slots);
  const proyectosActivos  = metricaSlots?.value    ?? activos;
  const enListaEspera     = metricaWaitlist?.value  ?? waitlist.length;

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
                  className={`slot${s === 'activo' ? ' filled' : s === 'reservado' ? ' reserved' : ''}`}
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

        <div className="founder-line">
          <div className="founder-line-label">Founder Line · Acceso Directo</div>
          <p className="founder-line-text">
            Si tu organización considera una iniciativa Oracle mayor a USD 1M,{' '}
            <span className="text-[#C9A96E]">Julio Álvarez recibe estas conversaciones directamente.</span>
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
