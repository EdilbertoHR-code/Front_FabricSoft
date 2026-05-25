import { useState, useEffect } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { api } from '../../../config/api';

// { 'YYYY-MM-DD': availableCount }
type MonthData = Record<string, number>;

function buildCalendarGrid(year: number, month: number, monthData: MonthData) {
  // Primer día del mes (weekday 0=Dom...6=Sab → ajustamos a 0=Lun)
  const firstDow = new Date(year, month - 1, 1).getDay();
  const offset   = (firstDow + 6) % 7; // cuántas celdas vacías al inicio (Lun=0)
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date().toISOString().split('T')[0];

  const cells: Array<{ day: number | null; dateStr: string | null; className: string; available: number }> = [];

  // Celdas vacías del mes anterior
  for (let i = 0; i < offset; i++) {
    cells.push({ day: null, dateStr: null, className: 'muted', available: 0 });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dow = new Date(dateStr + 'T12:00:00').getDay(); // 0=Dom 6=Sab
    const isWeekend = dow === 0 || dow === 6;
    const isToday   = dateStr === today;
    const isPast    = dateStr < today;
    const available = monthData[dateStr] ?? 0;

    let className = 'muted';
    if (!isWeekend) {
      if (isPast)            className = 'past';
      else if (available === 0) className = isToday ? 'active today' : 'active';
      else                   className = `slot${available <= 1 ? ' critical' : ''}${isToday ? ' today' : ''}`;
    }

    cells.push({ day: d, dateStr, className, available: isPast ? 0 : available });
  }

  // Completar hasta múltiplo de 7
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, dateStr: null, className: 'muted', available: 0 });
  }

  return cells;
}

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function S11OfficeHours() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();

  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [monthData, setMonthData] = useState<MonthData>({});
  const [monthFull, setMonthFull] = useState(false);
  const [monthBooked, setMonthBooked] = useState(0);
  const [loadingCal, setLoadingCal] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    setLoadingCal(true);
    api.get(`/office-hours/disponibilidad/mes?year=${year}&month=${month}`)
      .then(res => {
        setMonthData(res.data.data ?? {});
        setMonthFull(res.data.monthFull ?? false);
        setMonthBooked(res.data.booked ?? 0);
      })
      .catch(() => { setMonthData({}); setMonthFull(false); setMonthBooked(0); })
      .finally(() => setLoadingCal(false));
  }, [year, month, isInView]);

  const nowYear  = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const maxYear  = nowMonth === 12 ? nowYear + 1 : nowYear;
  const maxMonth = nowMonth === 12 ? 1 : nowMonth + 1;
  const isAtMin  = year === nowYear  && month === nowMonth;
  const isAtMax  = year === maxYear  && month === maxMonth;

  const prevMonth = () => {
    if (isAtMin) return;
    if (month === 1) { setMonth(12); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (isAtMax) return;
    if (month === 12) { setMonth(1); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };
  const goToday = () => { setYear(nowYear); setMonth(nowMonth); };

  const cells = buildCalendarGrid(year, month, monthData);

  return (
    <section ref={ref} id="s11" className={`demo-section s11 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="container">
        <div className="office-hours">
          <div className="office-hours-text">
            <div className="label">FABRIC Office Hours</div>
            <h2 className="s11-heading-desktop">Conversaciones directas con <span className="text-[#C9A96E]">el fundador.</span></h2>
            <h2 className="s11-heading-mobile">Con <span className="text-[#C9A96E]">el fundador.</span></h2>
            <p className="s11-para-desktop">Una vez al mes, Julio Álvarez recibe cuatro conversaciones de 30 minutos con CFO/CTO de empresas evaluando iniciativas Oracle.</p>
            <p className="s11-para-mobile" style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>4 slots al mes. 30 min. CFO / CTO con iniciativa Oracle activa.</p>

            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
              Criterios de Acceso
            </div>
            <ul className="criteria-list">
              <li>Empresa USD 50M+ revenue anual</li>
              <li>Cargo CFO / CIO / CTO / Director Transformación</li>
              <li>Iniciativa Oracle activa o planeada</li>
              <li>Plazo de decisión menor a 12 meses</li>
            </ul>

            <div className="office-hours-prep">
              <strong>Preparación previa</strong>
              Llega con tu situación Oracle actual sintetizada: módulos en uso, problemática principal, plazo. Treinta minutos · honestidad absoluta.
            </div>

            <div style={{ marginTop: 32 }}>
              <span className="nda-seal">Confidencial · NDA mutuo</span>
            </div>
          </div>

          <div className="calendar">
            <div className="calendar-head">
              <div className="calendar-month" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {MONTH_NAMES[month - 1]} · {year}
                {loadingCal && <span style={{ fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>↻</span>}
              </div>
              <div className="calendar-nav">
                <span style={{ cursor: isAtMin ? 'default' : 'pointer', opacity: isAtMin ? 0.25 : 1 }} onClick={prevMonth}>←</span>
                <span style={{ cursor: 'pointer' }} onClick={goToday}>Hoy</span>
                <span style={{ cursor: isAtMax ? 'default' : 'pointer', opacity: isAtMax ? 0.25 : 1 }} onClick={nextMonth}>→</span>
              </div>
            </div>

            <div className="calendar-grid">
              {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                <div className="cal-dow" key={d}>{d}</div>
              ))}
              {cells.map((cell, idx) => (
                <div
                  key={idx}
                  className={`cal-day ${cell.className}`}
                  data-slots={cell.available > 0 ? 'Disponible' : undefined}
                  data-interaction={cell.available > 0 ? "office-hours" : undefined}
                  data-date={cell.available > 0 ? cell.dateStr : undefined}
                >
                  {cell.day ?? ''}
                </div>
              ))}
            </div>

            {monthFull ? (
              <div style={{ marginTop: 14, padding: '10px 14px', border: '1px solid rgba(201,169,110,0.2)', background: 'rgba(201,169,110,0.05)', color: 'var(--text-secondary)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', lineHeight: 1.7 }}>
                SESIONES AGOTADAS · {MONTH_NAMES[month - 1].toUpperCase()} · Navega al mes siguiente →
              </div>
            ) : (
              <div style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.12em' }}>
                {4 - monthBooked} / 4 sesiones disponibles en {MONTH_NAMES[month - 1]}
              </div>
            )}

            <div className="calendar-legend">
              <span><span className="legend-swatch available"></span>Slot disponible</span>
              <span><span className="legend-swatch full"></span>Sin slots</span>
              <span><span className="legend-swatch today"></span>Hoy</span>
            </div>

            <a
              href="#office-hours"
              data-interaction="office-hours"
              className="s11-cta-mobile btn-primary"
              style={{ display: "block", textAlign: "center", marginTop: 16 }}
            >
              Reservar conversación →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
