import { useEffect, useState } from 'react';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { api } from '../../../config/api';

type Question = {
  id: string;
  text: string;
  options: { label: string; score: number }[];
};

const defaultQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Cuantos dias tarda hoy el cierre contable mensual en Fusion?',
    options: [
      { label: '1-5 dias', score: 0 },
      { label: '6-10 dias', score: 1 },
      { label: '11-20 dias', score: 2 },
      { label: 'Mas de 20 dias', score: 3 },
    ],
  },
  {
    id: 'q2',
    text: 'Que parte del cierre sigue ocurriendo fuera de Fusion?',
    options: [
      { label: 'Nada relevante', score: 0 },
      { label: 'Solo conciliaciones menores', score: 1 },
      { label: 'Partidas clave en Excel', score: 2 },
      { label: 'El cierre depende de procesos manuales', score: 3 },
    ],
  },
  {
    id: 'q3',
    text: 'Cuantos reportes ejecutivos o financieros se generan fuera del ERP?',
    options: [
      { label: 'Ninguno', score: 0 },
      { label: '1-3 reportes', score: 1 },
      { label: '4-10 reportes', score: 2 },
      { label: 'Mas de 10 reportes', score: 3 },
    ],
  },
  {
    id: 'q4',
    text: 'Que tan criticos son los reportes manuales que siguen activos?',
    options: [
      { label: 'No impactan decisiones', score: 0 },
      { label: 'Apoyan revisiones internas', score: 1 },
      { label: 'Se usan para direccion o auditoria', score: 2 },
      { label: 'La operacion depende de ellos', score: 3 },
    ],
  },
  {
    id: 'q5',
    text: 'Que porcentaje de usuarios clave usa Fusion como sistema principal?',
    options: [
      { label: 'Mas del 80%', score: 0 },
      { label: '60-80%', score: 1 },
      { label: '30-60%', score: 2 },
      { label: 'Menos del 30%', score: 3 },
    ],
  },
  {
    id: 'q6',
    text: 'Que tan frecuente es que los usuarios evadan Fusion con Excel, correo o sistemas paralelos?',
    options: [
      { label: 'Casi nunca', score: 0 },
      { label: 'En casos puntuales', score: 1 },
      { label: 'En procesos importantes', score: 2 },
      { label: 'Es la forma normal de operar', score: 3 },
    ],
  },
  {
    id: 'q7',
    text: 'Cuantas incidencias criticas bloqueantes estan abiertas hoy?',
    options: [
      { label: 'Ninguna', score: 0 },
      { label: '1-3', score: 1 },
      { label: '4-10', score: 2 },
      { label: 'Mas de 10', score: 3 },
    ],
  },
  {
    id: 'q8',
    text: 'Que impacto tienen esas incidencias en cierre, facturacion, compras u operacion?',
    options: [
      { label: 'Sin impacto operativo', score: 0 },
      { label: 'Molestias controladas', score: 1 },
      { label: 'Retrasan procesos criticos', score: 2 },
      { label: 'Bloquean procesos criticos', score: 3 },
    ],
  },
  {
    id: 'q9',
    text: 'Cual es el estado actual de la relacion con la consultora implementadora anterior?',
    options: [
      { label: 'Soporte activo y funcional', score: 0 },
      { label: 'Soporte parcial o lento', score: 1 },
      { label: 'Sin soporte o contrato vencido', score: 2 },
      { label: 'Conflicto contractual abierto', score: 3 },
    ],
  },
  {
    id: 'q10',
    text: 'Que tan transferido quedo el conocimiento de la consultora al equipo interno?',
    options: [
      { label: 'Documentado y transferido', score: 0 },
      { label: 'Transferencia parcial', score: 1 },
      { label: 'Dependencia alta de la consultora', score: 2 },
      { label: 'Sin transferencia real', score: 3 },
    ],
  },
  {
    id: 'q11',
    text: 'Cuanto tiempo ha pasado desde el go-live?',
    options: [
      { label: 'Mas de 18 meses y estable', score: 0 },
      { label: '6-18 meses', score: 1 },
      { label: '1-6 meses', score: 2 },
      { label: 'Menos de 1 mes o go-live reciente', score: 3 },
    ],
  },
  {
    id: 'q12',
    text: 'Que tan activo esta el patrocinio ejecutivo para resolver la situacion?',
    options: [
      { label: 'CFO/CTO activos y alineados', score: 0 },
      { label: 'Sponsor activo pero parcial', score: 1 },
      { label: 'Patrocinio delegado o intermitente', score: 2 },
      { label: 'Sin patrocinio ejecutivo', score: 3 },
    ],
  },
];

type SeverityLevel = 'BAJO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';

function getSeverity(score: number): { level: SeverityLevel; color: string; desc: string; action: string } {
  if (score <= 8) {
    return {
      level: 'BAJO',
      color: '#4ade80',
      desc: 'Tu implementacion presenta senales de estabilidad. Existen oportunidades de optimizacion, pero no hay crisis activa.',
      action: 'Conversa con FABRIC sobre optimizacion y FABRIC OS.',
    };
  }
  if (score <= 16) {
    return {
      level: 'MODERADO',
      color: '#fbbf24',
      desc: 'Senales de friccion operativa. Sin intervencion, los problemas actuales pueden escalar hacia el proximo cierre contable.',
      action: 'FABRIC recomienda diagnostico tecnico en las proximas 4 semanas.',
    };
  }
  if (score <= 24) {
    return {
      level: 'ALTO',
      color: '#f97316',
      desc: 'Tu implementacion presenta patrones de abandono post go-live. El riesgo operativo es real y documentado.',
      action: 'Rescate FABRIC estimado: 8-12 semanas · Inversion tipica: USD 150-300K.',
    };
  }
  return {
    level: 'CRÍTICO',
    color: '#ef4444',
    desc: 'Situacion de crisis operativa activa. Tu implementacion Oracle requiere intervencion inmediata de ingenieros senior.',
    action: 'Rescate de emergencia FABRIC: inicio en 72 horas · Inversion tipica: USD 200-500K.',
  };
}

const symptoms = [
  'Cierre contable pesado',
  'Reportes fuera del ERP',
  'Baja adopcion de usuarios',
  'Incidencias criticas',
  'Consultora anterior ausente',
];

export default function S07bRescueAssessment() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<'quiz' | 'capture' | 'result'>('quiz');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [sending, setSending] = useState(false);
  const [severity, setSeverity] = useState<ReturnType<typeof getSeverity> | null>(null);

  useEffect(() => {
    let mounted = true;

    api.get('/rescue-assessment/questions')
      .then((res) => {
        const nextQuestions = res.data?.questions;
        if (mounted && Array.isArray(nextQuestions) && nextQuestions.length === 12) {
          setQuestions(nextQuestions);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const q = questions[current] ?? questions[0];
  const hasAnswer = q.id in answers;
  const isLast = current === questions.length - 1;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: score }));
  };

  const handleNext = () => {
    if (isLast) {
      setStep('capture');
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleSubmit = async () => {
    if (!validEmail) return;
    setSending(true);
    const answersPayload = questions.map((question) => ({ questionId: question.id, score: answers[question.id] ?? 0 }));
    try {
      await api.post('/rescue-assessment/submit', { email, nombre, empresa, answers: answersPayload });
    } catch {
      // El resultado publico no se bloquea si el email o el CRM fallan.
    } finally {
      setSeverity(getSeverity(totalScore));
      setStep('result');
      setSending(false);
    }
  };

  const handleReset = () => {
    setStep('quiz');
    setStarted(false);
    setAnswers({});
    setCurrent(0);
    setEmail('');
    setNombre('');
    setEmpresa('');
    setSeverity(null);
  };

  return (
    <section
      ref={ref}
      id="rescue-assessment"
      className={`demo-section transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0, maxWidth: 820, marginInline: 'auto' }}>
          <div className="label">Oracle Fusion Rescue Assessment</div>
          <h2>
            Que tan grave esta <span className="text-[#C9A96E]">tu implementacion?</span>
          </h2>

          {!started && (
            <>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.7, marginTop: 24 }}>
                12 preguntas · 3 minutos · Diagnostico de severidad inmediato.
              </p>
              <div className="rescue-chips" style={{ justifyContent: 'center' }}>
                {symptoms.map((symptom) => (
                  <span key={symptom} style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    {symptom}
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
                  Iniciar diagnostico →
                </button>
              </div>
            </>
          )}
        </div>

        {started && step === 'quiz' && (
          <div style={{ marginTop: 48, animation: 'fadeIn .3s ease' }}>
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

            <div key={q.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0 64px',
              alignItems: 'center',
              animation: 'fadeIn .25s ease',
            }}>
              <p style={{ fontSize: 36, lineHeight: 1.2, color: 'var(--text-primary)', fontWeight: 400, fontFamily: 'var(--serif)', margin: 0 }}>
                {q.text}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={`${q.id}-${opt.label}`}
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
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        flexShrink: 0,
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
                {isLast ? 'Ver diagnostico →' : 'Siguiente →'}
              </button>
            </div>
          </div>
        )}

        {step === 'capture' && (
          <div style={{ marginTop: 48, maxWidth: 520, marginInline: 'auto', animation: 'fadeIn .3s ease' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 16 }}>
              Un paso mas
            </div>
            <p style={{ fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 32 }}>
              Ingresa tu correo para ver el diagnostico y recibir el resultado.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <input type="email" placeholder="correo@empresa.com" value={email} onChange={(event) => setEmail(event.target.value)} style={{ padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: 13, outline: 'none' }} />
              <input type="text" placeholder="Nombre (opcional)" value={nombre} onChange={(event) => setNombre(event.target.value)} style={{ padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: 13, outline: 'none' }} />
              <input type="text" placeholder="Empresa (opcional)" value={empresa} onChange={(event) => setEmpresa(event.target.value)} style={{ padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: 13, outline: 'none' }} />
            </div>
            <button
              onClick={handleSubmit}
              disabled={sending || !validEmail}
              style={{
                padding: '14px 36px',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: validEmail ? 'var(--accent)' : 'transparent',
                border: '1px solid var(--accent)',
                color: validEmail ? '#0A0A0A' : 'var(--accent)',
                cursor: sending ? 'wait' : 'pointer',
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sending ? 'Procesando...' : 'Ver diagnostico →'}
            </button>
          </div>
        )}

        {step === 'result' && severity ? (
          <div
            className="rescue-result-card"
            style={{
              border: `1px solid ${severity.color}40`,
              background: `${severity.color}08`,
              animation: 'fadeIn .4s ease',
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Nivel de severidad
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 36, fontWeight: 900, letterSpacing: '0.1em', color: severity.color, marginBottom: 24 }}>
              {severity.level}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: 20, maxWidth: 680 }}>
              {severity.desc}
            </p>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: severity.color, letterSpacing: '0.12em', background: `${severity.color}10`, border: `1px solid ${severity.color}30`, padding: '12px 18px', marginBottom: 36, display: 'inline-block' }}>
              {severity.action}
            </div>
            <div className="rescue-result-ctas">
              <a href="#aplicar" className="btn-primary" data-interaction="rescue-assessment">
                Solicitar evaluacion detallada →
              </a>
              <button onClick={handleReset} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 20px', cursor: 'pointer' }}>
                Reiniciar
              </button>
              <span className="nda-seal">Conversacion bajo NDA mutuo</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
