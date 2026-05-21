import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'fabric2026';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('fabric_admin', '1');
        navigate('/admin');
      } else {
        setError(true);
        setPassword('');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060606',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
    }}>
      {/* Grid pattern */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400, padding: '0 24px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--serif, Georgia, serif)',
            fontSize: 42,
            color: '#F5F5F5',
            letterSpacing: '-0.02em',
            marginBottom: 6,
          }}>
            FABRIC
          </div>
          <div style={{
            fontSize: 9,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            fontWeight: 700,
          }}>
            Admin · Acceso restringido
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#0F0F0F',
          border: '1px solid #252525',
          padding: '40px 36px',
        }}>
          <div style={{
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#5A5A5A',
            marginBottom: 28,
          }}>
            Autenticación requerida
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8A8A8A',
                marginBottom: 8,
              }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                autoFocus
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  background: '#060606',
                  border: `1px solid ${error ? '#B85450' : '#252525'}`,
                  color: '#F5F5F5',
                  fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
                  fontSize: 13,
                  padding: '12px 14px',
                  outline: 'none',
                  transition: 'border-color .2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = '#C9A96E'; }}
                onBlur={e => { if (!error) e.target.style.borderColor = '#252525'; }}
              />
              {error && (
                <div style={{
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  color: '#B85450',
                  marginTop: 8,
                  textTransform: 'uppercase',
                }}>
                  Acceso denegado
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || loading}
              style={{
                marginTop: 8,
                padding: '13px 0',
                background: !password || loading ? '#1a1a1a' : '#C9A96E',
                color: !password || loading ? '#5A5A5A' : '#060606',
                border: 'none',
                fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: !password || loading ? 'not-allowed' : 'pointer',
                transition: 'all .2s',
                width: '100%',
              }}
            >
              {loading ? 'Verificando...' : 'Ingresar →'}
            </button>
          </form>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: 24,
          fontSize: 9,
          letterSpacing: '0.18em',
          color: '#3A3A3A',
          textTransform: 'uppercase',
        }}>
          fabricsoft.com.mx · Solo uso interno
        </div>
      </div>
    </div>
  );
}
