// Oracle Fusion Rescue Assessment Wizard
var rData = { q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: '', name: '', role: '', company: '', email: '' };

var rQs = [
  { q: '¿Hace cuánto está implementado tu Oracle Fusion?',                key: 'q1',  opts: ['Menos de 3 meses', '3-6 meses', '6-12 meses', 'Más de 1 año'],                                  sc: [1, 2, 3, 4] },
  { q: '¿Cuántos días toma tu cierre contable mensual actualmente?',      key: 'q2',  opts: ['Menos de 5 días', '5-10 días', '10-15 días', 'Más de 15 días'],                                   sc: [0, 1, 2, 4] },
  { q: '¿Cuántos reportes ejecutivos se generan fuera del ERP?',          key: 'q3',  opts: ['Ninguno', '1-3 reportes', '4-7 reportes', 'Más de 7'],                                            sc: [0, 1, 2, 4] },
  { q: '¿Qué porcentaje de usuarios clave realmente usa el sistema?',     key: 'q4',  opts: ['Más del 90%', '70-90%', '50-70%', 'Menos del 50%'],                                              sc: [0, 1, 2, 4] },
  { q: '¿Cuántas incidencias críticas tienes abiertas?',                  key: 'q5',  opts: ['Ninguna', '1-3', '4-7', 'Más de 7'],                                                             sc: [0, 1, 2, 4] },
  { q: '¿Cuál es el estado de la consultora que implementó?',             key: 'q6',  opts: ['Sigue activa y respondiendo', 'Soporte limitado', 'Ya no responde', 'No aplica / interna'],       sc: [0, 1, 3, 0] },
  { q: '¿Tienes patrocinio ejecutivo activo del proyecto?',               key: 'q7',  opts: ['CFO + CTO activos', 'CFO o CTO', 'Solo área de IT', 'Sin patrocinio ejecutivo'],                  sc: [0, 1, 2, 4] },
  { q: '¿Cuál es el módulo con más problemas?',                           key: 'q8',  opts: ['Financials (GL/AP/AR)', 'Procurement / SCM', 'HCM / Nómina', 'Reporting / Analytics'],           sc: [3, 2, 2, 1] },
  { q: 'Industria de tu empresa',                                         key: 'q9',  opts: ['Servicios Financieros', 'Inmobiliario / Centros Comerciales', 'Logística / Distribución', 'Otra industria'], sc: [0, 0, 0, 0] },
  { q: 'Revenue aproximado de tu empresa',                                key: 'q10', opts: ['Menos de USD 50M', 'USD 50M – 250M', 'USD 250M – 500M', 'Más de USD 500M'],                       sc: [0, 0, 0, 0] },
  { q: '¿En qué plazo necesitas remediar la situación?',                  key: 'q11', opts: ['Inmediato (menos de 3 meses)', 'Corto plazo (3-6 meses)', 'Medio plazo (6-12 meses)', 'Sin plazo definido'], sc: [4, 2, 1, 0] }
];

var rStep = 0;
var rW = document.getElementById('rescue-wizard');
var rB = document.getElementById('rescue-body');
var rP = document.getElementById('rescue-progress');
var rSC = document.getElementById('rescue-step-counter');
var rBk = document.getElementById('rescue-btn-back');
var rNx = document.getElementById('rescue-btn-next');

function rCalcScore() {
  var s = 0;
  rQs.forEach(function (q) {
    var idx = q.opts.indexOf(rData[q.key]);
    if (idx >= 0) s += q.sc[idx];
  });
  return s;
}

function rLevel(s) {
  if (s >= 20) return { l: 'CRÍTICO', css: 'critico', desc: 'Requiere intervención inmediata',            rng: '8-12 semanas',  cost: 'USD 150-300K' };
  if (s >= 12) return { l: 'ALTO',    css: 'alto',    desc: 'Problemas graves detectados',                 rng: '12-20 semanas', cost: 'USD 80-200K'  };
  if (s >= 6)  return { l: 'MEDIO',   css: 'medio',   desc: 'Oportunidades de mejora significativas',      rng: '8-16 semanas',  cost: 'USD 50-150K'  };
  return            { l: 'BAJO',    css: 'bajo',    desc: 'Situación manejable con optimizaciones',      rng: '4-8 semanas',   cost: 'USD 30-80K'   };
}

function rRender() {
  var isC = rStep === rQs.length;
  var total = rQs.length + 1;
  var pct = ((rStep + 1) / (total + 1)) * 100;
  rP.style.width = pct + '%';
  rSC.textContent = (rStep + 1) + ' / ' + total;
  rBk.style.visibility = rStep === 0 ? 'hidden' : 'visible';
  rNx.textContent = isC ? 'Obtener diagnóstico →' : 'Continuar →';
  rNx.style.display = '';

  var html = '';
  if (!isC) {
    var q = rQs[rStep];
    html = '<div class="wizard-step-tag">Pregunta ' + (rStep + 1) + ' de ' + rQs.length + '</div>' +
      '<div class="wizard-question">' + q.q + '</div>' +
      '<div class="wizard-options cols1">';
    q.opts.forEach(function (o) { html += '<div class="wizard-option' + (rData[q.key] === o ? ' selected' : '') + '" data-val="' + o + '">' + o + '</div>'; });
    html += '</div>';
  } else {
    html = '<div class="wizard-step-tag">Paso 12 · Datos de Contacto</div>' +
      '<div class="wizard-question">Completa tus datos para recibir el diagnóstico</div>' +
      '<div>' +
        '<div class="wizard-input-label">Nombre completo</div><input class="wizard-input" id="rn" type="text" placeholder="Nombre" value="' + rData.name + '">' +
        '<div class="wizard-input-label">Cargo</div><input class="wizard-input" id="rr" type="text" placeholder="CFO / CTO / Director" value="' + rData.role + '">' +
        '<div class="wizard-input-label">Empresa</div><input class="wizard-input" id="rc" type="text" placeholder="Empresa" value="' + rData.company + '">' +
        '<div class="wizard-input-label">Correo corporativo</div><input class="wizard-input" id="re" type="email" placeholder="tu@empresa.com" value="' + rData.email + '">' +
        '<div class="wizard-error-msg" id="re-err">Correo corporativo requerido (sin gmail, hotmail, yahoo)</div>' +
      '</div>';
  }

  rB.innerHTML = html;

  if (!isC) {
    rB.querySelectorAll('.wizard-option').forEach(function (o) {
      o.addEventListener('click', function () {
        rData[rQs[rStep].key] = o.dataset.val;
        rB.querySelectorAll('.wizard-option').forEach(function (x) { x.classList.remove('selected'); });
        o.classList.add('selected');
      });
    });
  }
}

function rResult() {
  var sc = rCalcScore(), lv = rLevel(sc);
  rP.style.width = '100%';
  rSC.textContent = 'Diagnóstico';
  rBk.style.visibility = 'visible';
  rNx.style.display = 'none';
  rB.innerHTML =
    '<div class="wizard-step-tag">Diagnóstico FABRIC · Resultado</div>' +
    '<div class="score-container">' +
      '<div class="score-level-badge ' + lv.css + '">NIVEL ' + lv.l + '</div>' +
      '<div class="score-big ' + lv.css + '">' + sc + '<span style="font-size:32px;color:var(--text-tertiary)">/40</span></div>' +
      '<p style="color:var(--text-secondary);font-size:16px;margin-bottom:28px;line-height:1.6">' + lv.desc + '</p>' +
    '</div>' +
    '<div style="background:var(--bg-base);border:1px solid var(--border);padding:24px;margin-bottom:20px">' +
      '<div class="score-detail-row"><span>Plazo típico de remediación</span><span class="sval">' + lv.rng + '</span></div>' +
      '<div class="score-detail-row"><span>Inversión estimada</span><span class="sval">' + lv.cost + '</span></div>' +
      '<div class="score-detail-row"><span>Módulo crítico</span><span class="sval">' + (rData.q8 || 'N/A') + '</span></div>' +
      '<div class="score-detail-row" style="border:none"><span>Tiempo de cierre reportado</span><span class="sval">' + (rData.q2 || 'N/A') + '</span></div>' +
    '</div>' +
    '<p style="color:var(--text-secondary);font-family:var(--mono);font-size:12px;line-height:1.7;margin-bottom:16px">Un consultor senior de FABRIC revisará tu diagnóstico y te contactará en <strong style="color:var(--text-primary)">5 días hábiles</strong> con un plan de remediación accionable.</p>' +
    '<button class="wizard-btn-next" onclick="document.getElementById(\'rescue-wizard\').classList.remove(\'active\')">Entendido — espero la respuesta →</button>';
}

rNx.addEventListener('click', function () {
  var isC = rStep === rQs.length;
  if (!isC) {
    if (!rData[rQs[rStep].key]) return;
    rStep++;
    rRender();
    return;
  }
  var email = document.getElementById('re').value;
  var bad = ['gmail', 'hotmail', 'yahoo', 'outlook', 'live', 'icloud', 'msn'];
  var err = document.getElementById('re-err');
  rData.name = document.getElementById('rn').value;
  rData.role = document.getElementById('rr').value;
  rData.company = document.getElementById('rc').value;
  rData.email = email;
  if (!email || bad.some(function (d) { return email.toLowerCase().includes(d); })) {
    err.style.display = 'block';
    document.getElementById('re').classList.add('error');
    return;
  }
  rResult();
});

rBk.addEventListener('click', function () { if (rStep > 0) { rNx.style.display = ''; rStep--; rRender(); } });
document.getElementById('rescue-close').addEventListener('click', function () { rW.classList.remove('active'); rStep = 0; });
rW.addEventListener('click', function (e) { if (e.target === rW) { rW.classList.remove('active'); rStep = 0; } });

document.querySelectorAll('[data-wizard="rescue"]').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    rStep = 0;
    rNx.style.display = '';
    rW.classList.add('active');
    rRender();
  });
});

// Cerrar wizards con Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.getElementById('erp-wizard').classList.remove('active');
    document.getElementById('rescue-wizard').classList.remove('active');
  }
});
