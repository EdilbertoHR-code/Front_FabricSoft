import { useState } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';

type Question = {
  id: string;
  text: string;
  options: { label: string; score: number }[];
};

const questions: Question[] = [
  {
    id: 'q1',
    text: '¿Cuántos días tarda tu cierre contable mensual desde que arrancó Fusion?',
    options: [
      { label: '1–5 días', score: 0 },
      { label: '6–10 días', score: 1 },
      { label: '11–20 días', score: 2 },
      { label: 'Más de 20 días', score: 3 },
    ],
  },
  {
    id: 'q2',
    text: '¿Cuántos reportes ejecutivos o financieros se siguen generando fuera del ERP (Excel, Power BI manual)?',
    options: [
      { label: 'Ninguno', score: 0 },
      { label: '1–3 reportes', score: 1 },
      { label: '4–10 reportes', score: 2 },
      { label: 'Más de 10', score: 3 },
    ],
  },
  {
    id: 'q3',
    text: '¿Qué porcentaje de los usuarios clave usan Fusion activamente en su día a día?',
    options: [
      { label: 'Más del 80%', score: 0 },
      { label: '60–80%', score: 1 },
      { label: '30–60%', score: 2 },
      { label: 'Menos del 30%', score: 3 },
    ],
  },
  {
    id: 'q4',
    text: '¿Cuántas incidencias críticas (bloqueantes de operación) tiene abiertas hoy tu implementación?',
    options: [
      { label: 'Ninguna', score: 0 },
      { label: '1–3', score: 1 },
      { label: '4–10', score: 2 },
      { label: 'Más de 10', score: 3 },
    ],
  },
  {
    id: 'q5',
    text: '¿Cuál es el estado actual de la relación con tu consultora implementadora anterior?',
    options: [
      { label: 'Soporte activo y funcional', score: 0 },
      { label: 'Soporte parcial o lento', score: 1 },
      { label: 'Sin soporte / contrato vencido', score: 2 },
      { label: 'Conflicto contractual abierto', score: 3 },
    ],
  },
  {
    id: 'q6',
    text: '¿Cuánto tiempo llevan en producción con Fusion desde el go-live?',
    options: [
      { label: 'Más de 18 meses (estabilizado)', score: 0 },
      { label: '6–18 meses', score: 1 },
      { label: '1–6 meses', score: 2 },
      { label: 'Menos de 1 mes (reciente)', score: 3 },
    ],
  },
  {
    id: 'q7',
    text: '¿Tienen tablero ejecutivo en tiempo real dentro de Fusion que use el CFO y la Dirección General?',
    options: [
      { label: 'Sí, funcionando y actualizado', score: 0 },
      { label: 'Sí, pero incompleto o desactualizado', score: 1 },
      { label: 'En construcción', score: 2 },
      { label: 'No existe', score: 3 },
    ],
  },
  {
    id: 'q8',
    text: '¿Las conciliaciones bancarias e intercompañías se ejecutan dentro de Fusion?',
    options: [
      { label: 'Sí, completamente automatizadas', score: 0 },
      { label: 'Parcialmente en Fusion', score: 1 },
      { label: 'Mayormente manual fuera de Fusion', score: 2 },
      { label: 'Todo es manual', score: 3 },
    ],
  },
  {
    id: 'q9',
    text: '¿Tienen documentación viva del sistema (configuraciones, runbooks, matrices de roles) accesible por el equipo interno?',
    options: [
      { label: 'Sí, completa y actualizada', score: 0 },
      { label: 'Parcial', score: 1 },
      { label: 'Solo en poder de la consultora', score: 2 },
      { label: 'No existe documentación', score: 3 },
    ],
  },
  {
    id: 'q10',
    text: '¿El proyecto cuenta hoy con patrocinio activo del CFO y/o CTO?',
    options: [
      { label: 'Sí, ambos involucrados', score: 0 },
      { label: 'Solo uno de los dos', score: 1 },
      { label: 'Patrocinio delegado / inactivo', score: 2 },
      { label: 'Sin patrocinio ejecutivo', score: 3 },
    ],
  },
  {
    id: 'q11',
    text: '¿Las integraciones con sistemas satélite (bancos, nómina, e-commerce, logística) están operando correctamente?',
    options: [
      { label: 'Todas funcionando', score: 0 },
      { label: 'La mayoría, con excepciones menores', score: 1 },
      { label: 'Varias con problemas activos', score: 2 },
      { label: 'Integraciones críticas caídas', score: 3 },
    ],
  },
  {
    id: 'q12',
    text: '¿Tu organización tiene un plan concreto para resolver los problemas actuales en los próximos 90 días?',
    options: [
      { label: 'Sí, plan documentado y en ejecución', score: 0 },
      { label: 'Plan en construcción', score: 1 },
      { label: 'Sin plan definido', score: 2 },
      { label: 'La situación está paralizada', score: 3 },
    ],
  },
];

type SeverityLevel = 'BAJO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';

function getSeverity(score: number): { level: SeverityLevel; color: string; desc: string; action: string } {
  if (score <= 8)
    return {
      level: 'BAJO',
      color: '#4ade80',
      desc: 'Tu implementación presenta señales de estabilidad. Existen oportunidades de optimización pero no hay crisis activa.',
      action: 'Conversa con FABRIC sobre optimización y FABRIC OS.',
    };
  if (score <= 16)
    return {
      level: 'MODERADO',
      color: '#fbbf24',
      desc: 'Señales de fricción operativa. Sin intervención, los problemas actuales escalarán hacia el próximo cierre contable.',
      action: 'FABRIC recomienda diagnóstico técnico en las próximas 4 semanas.',
    };
  if (score <= 24)
    return {
      level: 'ALTO',
      color: '#f97316',
      desc: 'Tu implementación presenta patrones de abandono post go-live. El riesgo operativo es real y documentado.',
      action: 'Rescate FABRIC estimado: 8–12 semanas · Inversión típica: USD 150–300K.',
    };
  return {
    level: 'CRÍTICO',
    color: '#ef4444',
    desc: 'Situación de crisis operativa activa. Tu implementación Oracle requiere intervención inmediata de ingenieros senior.',
    action: 'Rescate de emergencia FABRIC: inicio en 72 horas · Inversión típica: USD 200–500K.',
  };
}

const symptoms = [
  'Cierre contable pesado o manual',
  'Reportes fuera del ERP (Excel paralelo)',
  'Baja adopción de usuarios',
  'Incidencias críticas sin resolver',
  'Consultora anterior ausente',
];

export default function S07bRescueAssessment() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const severity = submitted ? getSeverity(totalScore) : null;

  const q = questions[current];
  const hasAnswer = q.id in answers;
  const isLast = current === questions.length - 1;

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: score }));
  };

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStarted(false);
    setAnswers({});
    setCurrent(0);
  };

  return (
    <section
      ref={ref}
      id="rescue-assessment"
      className={`demo-section transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container">

        {/* ── TEASER: siempre visible ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0, maxWidth: 820, marginInline: 'auto' }}>
          <div className="label">Oracle Fusion Rescue Assessment</div>
          <h2>
            ¿Qué tan grave está <span className="text-[#C9A96E]">tu implementación?</span>
          </h2>

          {!started && (
            <>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.7, marginTop: 24 }}>
                12 preguntas · 3 minutos · Diagnóstico de severidad inmediato.
              </p>
              <div className="rescue-chips" style={{ justifyContent: 'center' }}>
                {symptoms.map((s) => (
                  <span key={s} style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() => setStarted(true)}
                  style={{
                    padding: '14px 36px',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    background: 'var(--accent)',
                    color: '#0A0A0A',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all .2s ease',
                  }}
                >
                  Iniciar diagnóstico →
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── UNA PREGUNTA A LA VEZ ── */}
        {started && !submitted && (
          <div style={{ marginTop: 48, animation: 'fadeIn .3s ease' }}>

            {/* Barra de progreso — ancho completo */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  {String(current + 1).padStart(2, '0')} / {questions.length}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.12em' }}>
                  {current} respondidas
                </span>
              </div>
              <div style={{ height: 2, background: 'var(--border)', position: 'relative' }}>
                <div style={{
                  height: '100%',
                  width: `${(current / questions.length) * 100}%`,
                  background: 'var(--accent)',
                  transition: 'width .3s ease',
                }} />
              </div>
            </div>

            {/* Dos columnas: pregunta izquierda · opciones derecha */}
            <div key={q.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0 64px',
              alignItems: 'center',
              animation: 'fadeIn .25s ease',
            }}>

              {/* IZQUIERDA — solo la pregunta, centrada contra las opciones */}
              <p style={{ fontSize: 20, lineHeight: 1.6, color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
                {q.text}
              </p>

              {/* DERECHA — opciones de respuesta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.score)}
                      style={{
                        textAlign: 'left',
                        padding: '14px 18px',
                        fontSize: 14,
                        fontFamily: 'var(--sans)',
                        background: isSelected ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                        color: isSelected ? 'var(--accent)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all .18s ease',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span style={{
                        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                        border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                        background: isSelected ? 'var(--accent)' : 'transparent',
                        transition: 'all .18s ease',
                      }} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navegación — debajo del grid */}
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
              {current > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    padding: '12px 20px',
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  ← Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!hasAnswer}
                style={{
                  padding: '13px 32px',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  background: hasAnswer ? 'var(--accent)' : 'transparent',
                  border: hasAnswer ? 'none' : '1px solid var(--border)',
                  color: hasAnswer ? '#0A0A0A' : 'var(--text-secondary)',
                  cursor: hasAnswer ? 'pointer' : 'not-allowed',
                  transition: 'all .2s ease',
                }}
              >
                {isLast ? 'Ver diagnóstico →' : 'Siguiente →'}
              </button>
            </div>
          </div>
        )}

        {/* ── RESULTADO ── */}
        {submitted && severity ? (
          <div
            className="rescue-result-card"
            style={{
              border: `1px solid ${severity.color}40`,
              background: `${severity.color}08`,
              animation: 'fadeIn .4s ease',
            }}
          >
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: 16,
            }}>
              Nivel de Severidad
            </div>

            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: '0.1em',
              color: severity.color,
              marginBottom: 24,
            }}>
              {severity.level}
            </div>

            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: 20, maxWidth: 680 }}>
              {severity.desc}
            </p>

            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: severity.color,
              letterSpacing: '0.12em',
              background: `${severity.color}10`,
              border: `1px solid ${severity.color}30`,
              padding: '12px 18px',
              marginBottom: 36,
              display: 'inline-block',
            }}>
              {severity.action}
            </div>

            <div className="rescue-result-ctas">
              <a href="#aplicar" className="btn-primary" data-interaction="rescue-assessment">
                Solicitar evaluación detallada →
              </a>
              <button
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '12px 20px',
                  cursor: 'pointer',
                }}
              >
                Reiniciar
              </button>
              <span className="nda-seal">Conversación bajo NDA mutuo</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
