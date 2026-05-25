import { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import { api } from '../../../config/api';
import { getInteractionTracking } from '../../../utils/tracking';

const CRITERIOS = [
  { num: '01', criterio: 'Empresa USD 50M+ de revenue anual' },
  { num: '02', criterio: 'Cargo CFO / CIO / CTO / Director de Transformación' },
  { num: '03', criterio: 'Iniciativa Oracle activa o planeada en los próximos 12 meses' },
  { num: '04', criterio: 'Plazo de decisión menor a 12 meses' },
];

const QUE_ESPERAR = [
  {
    fase: 'Antes',
    descripcion: 'Sintetiza tu situación Oracle actual: módulos en uso, problemática principal, plazo objetivo. La conversación empieza donde tú estás, no desde cero.',
  },
  {
    fase: 'Durante',
    descripcion: '30 minutos con Julio Álvarez. Sin pitch, sin presentación comercial. Diagnóstico directo, honestidad absoluta. Si FABRIC no es la solución correcta para tu caso, lo dirá.',
  },
  {
    fase: 'Después',
    descripcion: 'Si hay fit, recibirás una propuesta de evaluación formal. Si no lo hay, saldrás con claridad sobre qué tipo de proveedor necesitas y qué preguntas hacer.',
  },
];

const PUBLIC_DOMAINS = ['gmail', 'hotmail', 'yahoo', 'outlook', 'icloud', 'live', 'msn', 'me', 'proton'];

export default function OfficeHoursPage() {
  const [form, setForm] = useState({ nombre: '', cargo: '', empresa: '', email: '', situacion: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const enviar = async () => {
    setError('');
    if (!form.nombre.trim() || !form.cargo.trim() || !form.empresa.trim() || !form.email.trim() || !form.situacion.trim()) {
      setError('Completa todos los campos.'); return;
    }
    if (!form.email.includes('@')) { setError('Email inválido.'); return; }
    const dominio = form.email.split('@')[1]?.split('.')[0]?.toLowerCase() ?? '';
    if (PUBLIC_DOMAINS.includes(dominio)) { setError('Usa tu correo corporativo.'); return; }

    setLoading(true);
    try {
      await api.post('/leads', {
        nombre: form.nombre,
        cargo: form.cargo,
        empresa: form.empresa,
        email: form.email,
        notas: form.situacion,
        tipo: 'office-hours',
        tracking: getInteractionTracking('office-hours', 'office-hours-page'),
      });
      setSent(true);
    } catch {
      setError('No se pudo registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 56px 0' }}>
        <BackButton />
      </div>

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div className="label" style={{ marginBottom: 20 }}>FABRIC Office Hours</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.02, marginBottom: 24 }}>
                Conversación directa<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>con el fundador.</em>
              </h1>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Una vez al mes, Julio Álvarez recibe cuatro conversaciones de 30 minutos con CFOs y CTOs evaluando iniciativas Oracle. Sin pitch. Sin presentación. Diagnóstico directo.
              </p>
              <div style={{ marginTop: 24, display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>4</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>Sesiones / mes</div>
                </div>
                <div style={{ width: 1, background: 'var(--border)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>30'</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>Por sesión</div>
                </div>
                <div style={{ width: 1, background: 'var(--border)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>NDA</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>Mutuo · Día 1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cuerpo */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 56px', display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '0 64px' }}>
        {/* Contenido */}
        <div>
          {/* Criterios de acceso */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>
              Criterios de acceso
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {CRITERIOS.map((c) => (
                <div key={c.num} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', padding: '20px 28px', display: 'flex', gap: 20, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--accent)', letterSpacing: '0.12em', flexShrink: 0 }}>{c.num}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.5 }}>{c.criterio}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.15em', lineHeight: 1.8 }}>
              Si cumples los criterios, recibirás confirmación y fecha disponible en 24 horas hábiles. La capacidad es real: cuatro sesiones al mes, sin excepción.
            </div>
          </div>

          {/* Qué esperar */}
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>
              Qué esperar
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              {QUE_ESPERAR.map((q) => (
                <div key={q.fase} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', padding: '28px 24px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>{q.fase}</div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{q.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disponibilidad en el calendario */}
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
              Disponibilidad actual
            </div>
            <div style={{ padding: '28px 32px', border: '1px solid var(--border)', background: 'var(--bg-panel)', display: 'flex', alignItems: 'center', gap: 32 }}>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                  El calendario con fechas disponibles se encuentra en la página principal. Puedes revisar los slots abiertos del mes actual antes de solicitar tu sesión.
                </div>
                <a
                  href="/#s11"
                  style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.3)', paddingBottom: 2 }}
                >
                  Ver calendario de disponibilidad →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de solicitud */}
        <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-strong)', padding: 32 }}>
            {!sent ? (
              <>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
                  Solicitar sesión
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
                  Completa los datos. Si cumples los criterios, recibirás confirmación y fecha asignada en 24 horas hábiles.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {([
                    ['nombre', 'Nombre completo', 'text'],
                    ['cargo', 'Cargo', 'text'],
                    ['empresa', 'Empresa', 'text'],
                    ['email', 'Email corporativo', 'email'],
                  ] as const).map(([f, label, type]) => (
                    <div key={f}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                      <input
                        type={type}
                        value={form[f]}
                        onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                        style={{ width: '100%', padding: '11px 14px', background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>Situación Oracle (breve)</div>
                    <textarea
                      value={form.situacion}
                      onChange={e => setForm(p => ({ ...p, situacion: e.target.value }))}
                      rows={3}
                      placeholder="Módulos en uso, problemática principal, plazo objetivo..."
                      style={{ width: '100%', padding: '11px 14px', background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: 12, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                  </div>
                  {error && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#B85450' }}>{error}</div>}
                  <button
                    onClick={enviar}
                    disabled={loading}
                    style={{ marginTop: 4, padding: '13px 18px', background: loading ? 'rgba(201,169,110,0.5)' : 'var(--accent)', color: 'var(--bg-base)', border: 'none', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer' }}
                  >
                    {loading ? 'Registrando...' : 'Solicitar sesión →'}
                  </button>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.12em', lineHeight: 1.8 }}>
                    Respuesta en 24 horas hábiles · NDA mutuo desde el inicio
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--accent)', marginBottom: 12 }}>Solicitud recibida.</div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Revisaremos tu perfil y te confirmaremos disponibilidad a {form.email} en las próximas 24 horas hábiles.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Link to="/" style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    ← Volver al inicio
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 24, padding: '20px 24px', border: '1px solid var(--border)', background: 'rgba(201,169,110,0.04)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>Confidencialidad</div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>
              Todas las conversaciones están cubiertas por NDA mutuo desde el primer contacto. Lo que se discute en la sesión no sale de la sesión.
            </p>
          </div>

          <div style={{ marginTop: 12, padding: '20px 24px', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-tertiary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>¿Prefieres evaluación formal?</div>
            <Link
              to="/aplicar"
              style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Iniciar proceso de admisión →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
