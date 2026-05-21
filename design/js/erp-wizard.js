// ERP TCO Comparator Wizard
var erpData = { erp: '', users: 150, license: 200000, infra: 80000, support: 120000, transactions: '', industry: '', name: '', role: '', company: '', email: '' };

var erpBm = {
  'SAP S/4 HANA':           { s: 0.30, b: 18 },
  'SAP ECC':                { s: 0.35, b: 16 },
  'Oracle EBS R12':         { s: 0.25, b: 14 },
  'Oracle JDE':             { s: 0.20, b: 12 },
  'Oracle PeopleSoft':      { s: 0.22, b: 14 },
  'Microsoft Dynamics 365': { s: 0.28, b: 18 },
  'NetSuite':               { s: 0.15, b: 20 },
  'Otro':                   { s: 0.30, b: 18 }
};

function calcTCO() {
  if (!erpData.erp || !erpBm[erpData.erp]) return null;
  var bm = erpBm[erpData.erp];
  var ann = erpData.license + erpData.infra + erpData.support;
  var sav = ann * bm.s;
  return { cAnn: ann, c5: ann * 5, c10: ann * 10, oAnn: ann - sav, o5: (ann - sav) * 5, o10: (ann - sav) * 10, s5: sav * 5, s10: sav * 10, be: bm.b, pct: Math.round(bm.s * 100) };
}

function fmtUSD(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

var erpSteps = [
  { tag: 'Paso 01 · ERP Actual', q: '¿Qué ERP utilizas hoy?', type: 'opts', key: 'erp', opts: ['SAP S/4 HANA', 'SAP ECC', 'Oracle EBS R12', 'Oracle JDE', 'Oracle PeopleSoft', 'Microsoft Dynamics 365', 'NetSuite', 'Otro'] },
  { tag: 'Paso 02 · Usuarios', q: '¿Cuántos usuarios totales tiene el ERP?', type: 'slide', key: 'users', min: 10, max: 5000, def: 150, step: 10, fmt: function (v) { return v.toLocaleString() + ' usuarios'; } },
  { tag: 'Paso 03 · Licencias', q: 'Costo anual en licencias del ERP actual (USD)', type: 'slide', key: 'license', min: 10000, max: 5000000, def: 200000, step: 10000, fmt: fmtUSD },
  { tag: 'Paso 04 · Infraestructura', q: 'Costo anual en infraestructura (servidores, cloud, hosting)', type: 'slide', key: 'infra', min: 0, max: 2000000, def: 80000, step: 5000, fmt: fmtUSD },
  { tag: 'Paso 05 · Soporte', q: 'Costo anual en soporte y consultoría externa (USD)', type: 'slide', key: 'support', min: 0, max: 3000000, def: 120000, step: 5000, fmt: fmtUSD },
  { tag: 'Paso 06 · Transacciones', q: 'Volumen mensual aproximado de transacciones', type: 'opts', key: 'transactions', opts: ['Menos de 10K', '10K – 100K', '100K – 1M', 'Más de 1M'] },
  { tag: 'Paso 07 · Industria', q: '¿En qué industria opera tu empresa?', type: 'opts', key: 'industry', opts: ['Servicios Financieros', 'Inmobiliario / Centros Comerciales', 'Logística / Distribución', 'Otra industria'] },
  { tag: 'Paso 08 · Contacto', q: 'Recibe tu análisis personalizado', type: 'contact' }
];

var erpStep = 0;
var eW = document.getElementById('erp-wizard');
var eB = document.getElementById('erp-body');
var eP = document.getElementById('erp-progress');
var eSC = document.getElementById('erp-step-counter');
var eBk = document.getElementById('erp-btn-back');
var eNx = document.getElementById('erp-btn-next');

function erpRender() {
  var s = erpSteps[erpStep];
  var pct = ((erpStep + 1) / (erpSteps.length + 1)) * 100;
  eP.style.width = pct + '%';
  eSC.textContent = (erpStep + 1) + ' / ' + erpSteps.length;
  eBk.style.visibility = erpStep === 0 ? 'hidden' : 'visible';
  eNx.textContent = erpStep === erpSteps.length - 1 ? 'Ver resultado →' : 'Continuar →';
  eNx.style.display = '';

  var tco = calcTCO();
  var liveHtml = '';
  if (erpStep >= 4 && tco) {
    liveHtml = '<div class="tco-live-preview show"><div class="tco-live-title">◆ Proyección en tiempo real</div>' +
      '<div class="tco-live-row"><span>Costo actual 5 años</span><span class="lval">' + fmtUSD(tco.c5) + '</span></div>' +
      '<div class="tco-live-row"><span>Con Oracle Fusion 5 años</span><span class="lval">' + fmtUSD(tco.o5) + '</span></div>' +
      '<div class="tco-live-row"><span>Ahorro estimado 10 años</span><span class="lval">' + fmtUSD(tco.s10) + '</span></div></div>';
  }

  var html = '<div class="wizard-step-tag">' + s.tag + '</div><div class="wizard-question">' + s.q + '</div>' + liveHtml;

  if (s.type === 'opts') {
    var cols = s.opts.length > 4 ? '' : ' cols1';
    html += '<div class="wizard-options' + cols + '">';
    s.opts.forEach(function (o) { html += '<div class="wizard-option' + (erpData[s.key] === o ? ' selected' : '') + '" data-val="' + o + '">' + o + '</div>'; });
    html += '</div>';
  } else if (s.type === 'slide') {
    var v = erpData[s.key] || s.def;
    html += '<div class="wizard-slider-value" id="esv">' + s.fmt(v) + '</div>' +
      '<div class="wizard-slider-sublabel">Arrastra para ajustar</div>' +
      '<input type="range" class="wizard-slider" id="esl" min="' + s.min + '" max="' + s.max + '" value="' + v + '" step="' + s.step + '">' +
      '<div class="wizard-slider-range"><span>' + s.fmt(s.min) + '</span><span>' + s.fmt(s.max) + '</span></div>';
  } else {
    html += '<div>' +
      '<div class="wizard-input-label">Nombre completo</div><input class="wizard-input" id="en" type="text" placeholder="Ej. Carlos Herrera" value="' + erpData.name + '">' +
      '<div class="wizard-input-label">Cargo</div><input class="wizard-input" id="er" type="text" placeholder="CFO / CTO / Director" value="' + erpData.role + '">' +
      '<div class="wizard-input-label">Empresa</div><input class="wizard-input" id="ec" type="text" placeholder="Nombre de tu empresa" value="' + erpData.company + '">' +
      '<div class="wizard-input-label">Correo corporativo</div><input class="wizard-input" id="ee" type="email" placeholder="tu@empresa.com" value="' + erpData.email + '">' +
      '<div class="wizard-error-msg" id="ee-err">Correo corporativo requerido (sin gmail, hotmail, yahoo)</div></div>';
  }

  eB.innerHTML = html;

  if (s.type === 'opts') {
    eB.querySelectorAll('.wizard-option').forEach(function (o) {
      o.addEventListener('click', function () {
        erpData[s.key] = o.dataset.val;
        eB.querySelectorAll('.wizard-option').forEach(function (x) { x.classList.remove('selected'); });
        o.classList.add('selected');
      });
    });
  }
  if (s.type === 'slide') {
    var sl = document.getElementById('esl'), sv = document.getElementById('esv');
    erpData[s.key] = parseInt(sl.value);
    sl.addEventListener('input', function () { erpData[s.key] = parseInt(sl.value); sv.textContent = s.fmt(parseInt(sl.value)); });
  }
}

function erpResult() {
  var tco = calcTCO();
  if (!tco) return;
  eP.style.width = '100%';
  eSC.textContent = 'Resultado';
  eBk.style.visibility = 'visible';
  eNx.style.display = 'none';
  eB.innerHTML =
    '<div class="wizard-step-tag">Análisis TCO · Completado</div>' +
    '<div class="wizard-question" style="font-size:22px;margin-bottom:20px;">Tu escenario de migración a Oracle Fusion</div>' +
    '<div class="tco-comparison">' +
      '<div class="tco-col"><div class="tco-col-title">ERP Actual · ' + erpData.erp + '</div>' +
        '<div class="tco-row"><span>Costo Año 1</span><span class="val">' + fmtUSD(tco.cAnn) + '</span></div>' +
        '<div class="tco-row"><span>TCO 5 años</span><span class="val">' + fmtUSD(tco.c5) + '</span></div>' +
        '<div class="tco-row total"><span>TCO 10 años</span><span class="val">' + fmtUSD(tco.c10) + '</span></div></div>' +
      '<div class="tco-col oracle-col"><div class="tco-col-title">Oracle Fusion Cloud</div>' +
        '<div class="tco-row"><span>Costo Año 1</span><span class="val">' + fmtUSD(tco.oAnn) + '</span></div>' +
        '<div class="tco-row"><span>TCO 5 años</span><span class="val">' + fmtUSD(tco.o5) + '</span></div>' +
        '<div class="tco-row total"><span>TCO 10 años</span><span class="val">' + fmtUSD(tco.o10) + '</span></div></div>' +
    '</div>' +
    '<div class="tco-savings-box"><div class="tco-savings-label">Ahorro proyectado a 10 años</div>' +
      '<div class="tco-savings-amount">' + fmtUSD(tco.s10) + '</div>' +
      '<div class="tco-savings-sub">Reducción del ' + tco.pct + '% en costos totales</div></div>' +
    '<div class="tco-breakeven">Punto de breakeven estimado: <strong>' + tco.be + ' meses</strong></div>' +
    '<div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border)">' +
      '<p style="color:var(--text-secondary);font-family:var(--mono);font-size:12px;line-height:1.7;margin-bottom:16px">Un consultor senior de FABRIC revisará tu caso con datos reales y enviará análisis en 5 días hábiles.</p>' +
      '<button class="wizard-btn-next" onclick="document.getElementById(\'erp-wizard\').classList.remove(\'active\')">Solicitar análisis completo →</button></div>';
}

eNx.addEventListener('click', function () {
  var s = erpSteps[erpStep];
  if (s.type === 'opts' && !erpData[s.key]) return;
  if (s.type === 'contact') {
    var email = document.getElementById('ee').value;
    var bad = ['gmail', 'hotmail', 'yahoo', 'outlook', 'live', 'icloud', 'msn'];
    var err = document.getElementById('ee-err');
    erpData.name = document.getElementById('en').value;
    erpData.role = document.getElementById('er').value;
    erpData.company = document.getElementById('ec').value;
    erpData.email = email;
    if (!email || bad.some(function (d) { return email.toLowerCase().includes(d); })) {
      err.style.display = 'block';
      document.getElementById('ee').classList.add('error');
      return;
    }
    erpResult();
    return;
  }
  if (erpStep < erpSteps.length - 1) { erpStep++; erpRender(); }
});

eBk.addEventListener('click', function () { if (erpStep > 0) { eNx.style.display = ''; erpStep--; erpRender(); } });
document.getElementById('erp-close').addEventListener('click', function () { eW.classList.remove('active'); erpStep = 0; });
eW.addEventListener('click', function (e) { if (e.target === eW) { eW.classList.remove('active'); erpStep = 0; } });

document.querySelectorAll('[data-wizard="erp"]').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    erpStep = 0;
    eNx.style.display = '';
    eW.classList.add('active');
    erpRender();
  });
});
