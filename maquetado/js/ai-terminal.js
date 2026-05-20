// AI Terminal Interactions
var aiResponses = {
  '→ Mi Fusion está fallando': [
    { type: 'user', text: 'Mi Oracle Fusion lleva 8 meses y aún hacemos el cierre contable en Excel.' },
    { type: 'pause' },
    { type: 'bot', text: 'Patrón detectado: <strong>Post Go-Live Abandonment</strong>' },
    { type: 'bot', text: 'Síntomas compatibles:' },
    { type: 'bot', text: ' · Subledger Accounting (SLA) no configurado correctamente' },
    { type: 'bot', text: ' · Trial Balance desincronizado del GL operativo' },
    { type: 'bot', text: ' · Account Reconciliation Cloud no implementado' },
    { type: 'bot', text: '' },
    { type: 'bot', text: 'Plazo típico de remediación FABRIC: <strong style="color:var(--accent)">8-14 semanas</strong>' }
  ],
  '→ Migración SAP/EBS a Fusion': [
    { type: 'user', text: 'Operamos SAP ECC 6.0. Estamos evaluando migrar a Oracle Fusion Cloud.' },
    { type: 'pause' },
    { type: 'bot', text: 'ECC → Fusion: migración de complejidad media-alta.' },
    { type: 'bot', text: 'Consideraciones clave:' },
    { type: 'bot', text: ' · Mapeo de Cost Centers → Segments FBDI' },
    { type: 'bot', text: ' · Conversión de datos históricos (3-5 años recomendado)' },
    { type: 'bot', text: ' · Integraciones ABAP legacy → Oracle Integration Cloud (OIC)' },
    { type: 'bot', text: '' },
    { type: 'bot', text: 'Timeline estimado: <strong style="color:var(--accent)">12-18 meses</strong> para rollout completo.' }
  ],
  '→ Greenfield Oracle': [
    { type: 'user', text: 'No tenemos ERP. Operamos en Excel y QuickBooks. Revenue USD 120M.' },
    { type: 'pause' },
    { type: 'bot', text: 'Perfil compatible con Oracle Fusion Cloud Greenfield.' },
    { type: 'bot', text: 'Stack recomendado para su escala:' },
    { type: 'bot', text: ' · Oracle Financials Cloud: GL, AP, AR, FA' },
    { type: 'bot', text: ' · Oracle Cash Management Cloud' },
    { type: 'bot', text: ' · Oracle Tax Reporting Cloud (CFDI 4.0)' },
    { type: 'bot', text: '' },
    { type: 'bot', text: 'Implementación estimada: <strong style="color:var(--accent)">6-10 meses</strong> · Desde USD 250K.' }
  ]
};

var aiBody = document.querySelector('.ai-consultant-body');
var aiTyping = false;

async function playAI(lines) {
  if (aiTyping) return;
  aiTyping = true;
  aiBody.innerHTML = '';

  for (var l of lines) {
    if (l.type === 'pause') {
      var d = document.createElement('div');
      d.className = 'ai-line';
      d.innerHTML = '<span style="color:var(--accent)">▮</span> Analizando...';
      aiBody.appendChild(d);
      await new Promise(function (r) { setTimeout(r, 900); });
      d.remove();
      continue;
    }
    var div = document.createElement('div');
    div.className = 'ai-line ' + (l.type === 'user' ? 'user ai-prompt' : 'bot');
    div.innerHTML = l.text;
    div.style.opacity = '0';
    aiBody.appendChild(div);
    await new Promise(function (r) { setTimeout(r, 20); });
    div.style.transition = 'opacity 0.18s';
    div.style.opacity = '1';
    await new Promise(function (r) { setTimeout(r, 70); });
    aiBody.scrollTop = aiBody.scrollHeight;
  }

  var cur = document.createElement('div');
  cur.className = 'ai-line user ai-prompt';
  cur.textContent = '_';
  aiBody.appendChild(cur);
  aiTyping = false;
}

document.querySelectorAll('.ai-scenario').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var k = btn.textContent.trim();
    if (aiResponses[k]) playAI(aiResponses[k]);
  });
});
