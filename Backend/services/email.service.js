const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.EMAIL_FROM || 'FABRIC <onboarding@resend.dev>';

// ── Utilidades ────────────────────────────────────────────────────────────────

function wrap(body) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FABRIC</title>
</head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F2;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:3px solid #C9A96E;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 48px 32px;">
              <div style="font-size:22px;font-weight:300;letter-spacing:0.08em;color:#0A0A0A;">FABRIC</div>
              <div style="font-size:9px;letter-spacing:0.26em;text-transform:uppercase;color:#8A8A8A;margin-top:4px;">Oracle Critical Engineering</div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <div style="height:1px;background:#E8E4DE;"></div>
            </td>
          </tr>

          <!-- Body -->
          ${body}

          <!-- Footer -->
          <tr>
            <td style="padding:0 48px;">
              <div style="height:1px;background:#E8E4DE;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 48px 40px;">
              <p style="margin:0;font-size:10px;color:#B0A898;letter-spacing:0.06em;line-height:1.7;">
                FABRIC SOFT MEXICO SA DE CV &nbsp;·&nbsp; fabricsoft.com.mx<br/>
                Este correo es una confirmación automática. No es necesario responder.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function label(text) {
  return `<div style="font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8A8A;margin-bottom:6px;">${text}</div>`;
}

function dataRow(key, value) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;">
      <span style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#B0A898;">${key}</span>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #F0EDE8;text-align:right;">
      <span style="font-size:12px;color:#2A2A2A;">${value}</span>
    </td>
  </tr>`;
}

// ── Templates ─────────────────────────────────────────────────────────────────

function templateAplicar({ nombre, empresa, status }) {
  const isWaitlist = status === 'WaitList';

  const body = `
  <tr>
    <td style="padding:40px 48px 20px;">
      ${label('Solicitud recibida')}
      <h1 style="margin:0 0 16px;font-size:28px;font-weight:300;color:#0A0A0A;line-height:1.2;">
        ${nombre},<br/>recibimos<br/>tu solicitud.
      </h1>
      <p style="margin:0 0 28px;font-size:14px;color:#5A5A5A;line-height:1.8;">
        ${isWaitlist
          ? `Tu perfil de <strong style="color:#2A2A2A;">${empresa}</strong> quedó registrado en nuestra lista de espera para <strong style="color:#2A2A2A;">Q3&ndash;Q4 2026</strong>. Te contactaremos cuando haya disponibilidad que se ajuste a tu proyecto.`
          : `La solicitud de <strong style="color:#2A2A2A;">${empresa}</strong> está en revisión. La evaluamos en las próximas <strong style="color:#2A2A2A;">48 horas hábiles</strong>. Si tu perfil es compatible con nuestra capacidad actual, recibirás una propuesta de agenda para una sesión inicial.`
        }
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 48px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${dataRow('Empresa', empresa)}
        ${dataRow('Contacto', nombre)}
        ${dataRow('Estado', isWaitlist ? 'Lista de espera' : 'En revisión')}
        ${dataRow('Ventana', 'Q3 2026')}
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:0 48px 40px;">
      <p style="margin:0 0 20px;font-size:12px;color:#8A8A8A;line-height:1.7;">
        FABRIC opera con un máximo de 12 proyectos simultáneos. La selectividad protege la calidad operativa para los clientes que aceptamos.
      </p>
      <a href="https://fabricsoft.com.mx/#s15"
         style="display:inline-block;padding:12px 28px;background:#C9A96E;color:#0A0A0A;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
        Ver estado de admisión →
      </a>
    </td>
  </tr>`;

  return wrap(body);
}

function templateWaitlist({ nombre, empresa }) {
  const body = `
  <tr>
    <td style="padding:40px 48px 20px;">
      ${label('Lista de espera · Q3 2026')}
      <h1 style="margin:0 0 16px;font-size:28px;font-weight:300;color:#0A0A0A;line-height:1.2;">
        Quedaste registrado<br/>en la lista de espera.
      </h1>
      <p style="margin:0 0 28px;font-size:14px;color:#5A5A5A;line-height:1.8;">
        <strong style="color:#2A2A2A;">${nombre}</strong> de <strong style="color:#2A2A2A;">${empresa}</strong>, te notificaremos cuando haya disponibilidad en Q3 o Q4 2026 que se ajuste a tu tipo de proyecto.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 48px 40px;">
      <p style="margin:0 0 20px;font-size:12px;color:#8A8A8A;line-height:1.7;">
        Si tu situación cambia o tienes urgencia operativa, completa la solicitud de admisión completa para ser evaluado con prioridad.
      </p>
      <a href="https://fabricsoft.com.mx/aplicar"
         style="display:inline-block;padding:12px 28px;background:#C9A96E;color:#0A0A0A;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
        Completar solicitud →
      </a>
    </td>
  </tr>`;

  return wrap(body);
}

function templateReferencia({ nombre, empresa }) {
  const body = `
  <tr>
    <td style="padding:40px 48px 20px;">
      ${label('Información recibida')}
      <h1 style="margin:0 0 16px;font-size:28px;font-weight:300;color:#0A0A0A;line-height:1.2;">
        Recibimos<br/>tu información.
      </h1>
      <p style="margin:0 0 28px;font-size:14px;color:#5A5A5A;line-height:1.8;">
        <strong style="color:#2A2A2A;">${nombre}</strong> de <strong style="color:#2A2A2A;">${empresa}</strong>, revisaremos tu perfil. Si hay compatibilidad con nuestra capacidad actual, te contactaremos directamente para una conversación inicial.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 48px 40px;">
      <a href="https://fabricsoft.com.mx"
         style="display:inline-block;padding:12px 28px;background:#C9A96E;color:#0A0A0A;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
        Conocer FABRIC →
      </a>
    </td>
  </tr>`;

  return wrap(body);
}

// ── Funciones públicas ────────────────────────────────────────────────────────

exports.sendConfirmacionAplicar = ({ nombre, empresa, email, status }) =>
  resend.emails.send({
    from:    FROM,
    to:      email,
    subject: status === 'WaitList'
      ? 'Lista de espera Q3 2026 — FABRIC'
      : 'Solicitud recibida — FABRIC Oracle Critical Engineering',
    html: templateAplicar({ nombre, empresa, status }),
  });

exports.sendConfirmacionWaitlist = ({ nombre, empresa, email }) =>
  resend.emails.send({
    from:    FROM,
    to:      email,
    subject: 'Lista de espera Q3 2026 — FABRIC',
    html: templateWaitlist({ nombre, empresa }),
  });

exports.sendConfirmacionReferencia = ({ nombre, empresa, email }) =>
  resend.emails.send({
    from:    FROM,
    to:      email,
    subject: 'Información recibida — FABRIC',
    html: templateReferencia({ nombre, empresa }),
  });
