const Lead = require('../models/model.lead');

const PUBLIC_DOMAINS = ['gmail','hotmail','yahoo','outlook','icloud','live','msn','me','proton'];
const VALID_STATUSES = ['Nuevo', 'Aprobado', 'WaitList', 'Revisión', 'Rechazado'];
const QUALIFIED_INDUSTRIES = ['financiero', 'inmobiliario', 'logistica'];

function isPublicEmail(email) {
  const domain = (email.split('@')[1] || '').split('.')[0].toLowerCase();
  return PUBLIC_DOMAINS.includes(domain);
}

function calcScore({ revenue = '', industria = '', plazo = '', iniciativa = '' }) {
  let score = 0;

  const rev = revenue.toLowerCase();
  if (rev.includes('500') || rev.includes('1b') || rev.includes('1,0')) score += 35;
  else if (rev.includes('250') || rev.includes('200')) score += 28;
  else if (rev.includes('100') || rev.includes('150')) score += 20;
  else if (rev.includes('50') || rev.includes('75')) score += 10;

  if (QUALIFIED_INDUSTRIES.includes(industria)) score += 25;

  if (plazo === '<3 meses') score += 25;
  else if (plazo === '3-6 meses') score += 15;
  else if (plazo === '6-12 meses') score += 5;

  if (iniciativa.length > 100) score += 10;
  else if (iniciativa.length > 50) score += 5;

  return Math.min(score, 95);
}

function nowLabel() {
  return new Date().toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

exports.solicitar = async (req, res) => {
  try {
    const { nombre, cargo, empresa, revenue, email, industria, iniciativa, plazo } = req.body;

    if (!nombre?.trim() || nombre.trim().length < 2)
      return res.status(400).json({ error: 'Nombre requerido.' });
    if (!cargo?.trim() || cargo.trim().length < 2)
      return res.status(400).json({ error: 'Cargo requerido.' });
    if (!empresa?.trim())
      return res.status(400).json({ error: 'Empresa requerida.' });
    if (!email || !email.includes('@'))
      return res.status(400).json({ error: 'Email inválido.' });
    if (isPublicEmail(email))
      return res.status(400).json({ error: 'Usa tu correo corporativo.' });
    if (!iniciativa || iniciativa.trim().length < 10)
      return res.status(400).json({ error: 'Describe la iniciativa Oracle (mínimo 10 caracteres).' });
    if (!plazo)
      return res.status(400).json({ error: 'Selecciona un plazo de decisión.' });

    const score = calcScore({ revenue, industria, plazo, iniciativa: iniciativa.trim() });
    const isQualified = QUALIFIED_INDUSTRIES.includes(industria);
    const status = isQualified ? 'Nuevo' : 'WaitList';

    const lead = await Lead.create({
      nombre:     nombre.trim(),
      cargo:      cargo.trim(),
      empresa:    empresa.trim(),
      revenue:    (revenue || '').trim(),
      email:      email.trim().toLowerCase(),
      industria:  industria || '',
      iniciativa: iniciativa.trim(),
      plazo,
      source:     'aplicar',
      score,
      status,
      ipAddress:  req.ip || '',
      historial:  [{ fecha: nowLabel(), estado: status, autor: 'Sistema' }],
    });

    res.status(201).json({ ok: true, data: lead });
  } catch (err) {
    console.error('leads.solicitar error:', err);
    res.status(500).json({ error: 'Error interno al guardar la solicitud.' });
  }
};

exports.listarLeads = async (req, res) => {
  try {
    const { status, industria, page = 1, limit = 100 } = req.query;
    const filter = {};
    if (status && status !== 'Todos') filter.status = status;
    if (industria && industria !== 'Todas') filter.industria = industria.toLowerCase();

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Lead.countDocuments(filter),
    ]);

    res.json({ ok: true, data, total });
  } catch (err) {
    console.error('leads.listarLeads error:', err);
    res.status(500).json({ error: 'Error listando leads.' });
  }
};

exports.actualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status))
      return res.status(400).json({ error: 'Status inválido.' });

    const lead = await Lead.findByIdAndUpdate(
      id,
      {
        status,
        $push: { historial: { fecha: nowLabel(), estado: status, autor: 'Admin' } },
      },
      { new: true },
    );

    if (!lead) return res.status(404).json({ error: 'Lead no encontrado.' });
    res.json({ ok: true, data: lead });
  } catch (err) {
    console.error('leads.actualizarStatus error:', err);
    res.status(500).json({ error: 'Error actualizando status.' });
  }
};

exports.actualizarNotas = async (req, res) => {
  try {
    const { id } = req.params;
    const { notas } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { notas: notas ?? '' }, { new: true });
    if (!lead) return res.status(404).json({ error: 'Lead no encontrado.' });
    res.json({ ok: true, data: lead });
  } catch (err) {
    console.error('leads.actualizarNotas error:', err);
    res.status(500).json({ error: 'Error actualizando notas.' });
  }
};

exports.solicitarWaitlist = async (req, res) => {
  try {
    const { nombre, empresa, email } = req.body;

    if (!nombre?.trim()) return res.status(400).json({ error: 'Nombre requerido.' });
    if (!empresa?.trim()) return res.status(400).json({ error: 'Empresa requerida.' });
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido.' });
    if (isPublicEmail(email)) return res.status(400).json({ error: 'Usa tu correo corporativo.' });

    const lead = await Lead.create({
      nombre: nombre.trim(),
      cargo:  '',
      empresa: empresa.trim(),
      email:  email.trim().toLowerCase(),
      source: 'waitlist',
      status: 'WaitList',
      ipAddress: req.ip || '',
      historial: [{ fecha: nowLabel(), estado: 'WaitList', autor: 'Sistema' }],
    });

    res.status(201).json({ ok: true, data: lead });
  } catch (err) {
    console.error('leads.solicitarWaitlist error:', err);
    res.status(500).json({ error: 'Error interno al guardar solicitud.' });
  }
};

exports.solicitarReferencia = async (req, res) => {
  try {
    const { nombre, empresa, email } = req.body;

    if (!nombre?.trim()) return res.status(400).json({ error: 'Nombre requerido.' });
    if (!empresa?.trim()) return res.status(400).json({ error: 'Empresa requerida.' });
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido.' });
    if (isPublicEmail(email)) return res.status(400).json({ error: 'Usa tu correo corporativo.' });

    const lead = await Lead.create({
      nombre:  nombre.trim(),
      cargo:   '',
      empresa: empresa.trim(),
      email:   email.trim().toLowerCase(),
      source:  'referencia',
      status:  'Nuevo',
      ipAddress: req.ip || '',
      historial: [{ fecha: nowLabel(), estado: 'Nuevo', autor: 'Sistema' }],
    });

    res.status(201).json({ ok: true, data: lead });
  } catch (err) {
    console.error('leads.solicitarReferencia error:', err);
    res.status(500).json({ error: 'Error interno al guardar solicitud.' });
  }
};
