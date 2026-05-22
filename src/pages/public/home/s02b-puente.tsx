import { useInViewOnce } from '../../../hooks/useInViewOnce';

export default function S02bPuente() {
  const [ref, isInView] = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      id="puente"
      style={{
        background: 'var(--bg-base)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: 760,
          marginInline: 'auto',
          paddingInline: 48,
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 600ms ease, transform 600ms ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 40,
          }}
        >
          Por qué FABRIC
        </p>

        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(22px, 2.6vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--text-primary)',
            marginBottom: 0,
          }}
        >
          La mayoría de las implementaciones Oracle Fusion celebran el go-live
          y abandonan al cliente con cierres pesados, usuarios confundidos e
          incidencias abiertas.
        </p>

        <div
          style={{
            width: 40,
            height: 1,
            background: 'var(--border)',
            margin: '40px 0',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(22px, 2.6vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--text-primary)',
            marginBottom: 24,
          }}
        >
          Nosotros nos quedamos hasta el primer cierre contable operado en
          producción.
        </p>

        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(22px, 2.6vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--accent)',
          }}
        >
          Por contrato.
        </p>
      </div>
    </section>
  );
}
