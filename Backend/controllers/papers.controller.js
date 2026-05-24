const PaperAccess     = require('../models/model.paperAccess');
const BenchmarkAccess = require('../models/model.benchmarkAccess');

const PUBLIC_DOMAINS = ['gmail', 'hotmail', 'yahoo', 'outlook', 'icloud', 'live', 'msn', 'me', 'proton', 'aol'];

function isPublicEmail(email) {
  const domain = email.split('@')[1]?.split('.')[0]?.toLowerCase() ?? '';
  return PUBLIC_DOMAINS.includes(domain);
}

const PAPER_TITLES = {
  '01': 'Por qué fallan los go-live de Oracle Fusion',
  '02': 'IA aplicada a cierre contable en Fusion Cloud',
  '03': 'Modelo de entrega en primer ciclo crítico',
};

// ─── POST /api/papers/solicitar ───────────────────────────────────────────────
exports.solicitar = async (req, res) => {
  try {
    const { paperId, email, cargo, empresa } = req.body;

    if (!paperId || !['01', '02', '03'].includes(paperId)) {
      return res.status(400).json({ error: 'Paper no válido.' });
    }
    if (!email || !cargo || !empresa) {
      return res.status(400).json({ error: 'Email, cargo y empresa son requeridos.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ error: 'Email no válido.' });
    }
    if (isPublicEmail(email)) {
      return res.status(422).json({ error: 'FABRIC trabaja con organizaciones. Usa tu correo corporativo.' });
    }

    // Anti-spam: misma persona + mismo paper en las últimas 24h
    const ventana24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const duplicado = await PaperAccess.findOne({
      email: email.toLowerCase(),
      paperId,
      createdAt: { $gte: ventana24h },
    });

    if (duplicado) {
      return res.status(200).json({
        ok: true,
        duplicate: true,
        message: 'Ya registramos tu solicitud. Revisa tu correo (incluyendo spam).',
      });
    }

    const acceso = new PaperAccess({
      paperId,
      email:     email.toLowerCase().trim(),
      cargo:     cargo.trim(),
      empresa:   empresa.trim(),
      ipAddress: req.ip ?? '',
      status:    'pendiente',
    });
    await acceso.save();

    // TODO: integrar Resend para entrega automática del PDF
    // const { sendPaperEmail } = require('../services/email.service');
    // await sendPaperEmail({ to: email, paperId, paperTitle: PAPER_TITLES[paperId] });
    // acceso.status   = 'enviado';
    // acceso.emailSent = true;
    // await acceso.save();

    console.log(`📄 Paper ${paperId} solicitado por ${email} (${empresa})`);

    return res.status(201).json({
      ok: true,
      message: `Solicitud registrada. Recibirás el Paper ${paperId} en tu correo corporativo en las próximas horas.`,
      paperId,
      paperTitle: PAPER_TITLES[paperId],
    });
  } catch (error) {
    console.error('🚨 papers.solicitar:', error);
    return res.status(500).json({ error: 'Error interno. Intenta de nuevo.' });
  }
};

// ─── POST /api/papers/benchmark ───────────────────────────────────────────────
exports.benchmarkEarlyAccess = async (req, res) => {
  try {
    const { nombre, empresa, email } = req.body;

    if (!nombre || !empresa || !email) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ error: 'Email no válido.' });
    }
    if (isPublicEmail(email)) {
      return res.status(422).json({ error: 'FABRIC trabaja con organizaciones. Usa tu correo corporativo.' });
    }

    // Email único — si ya existe, responder sin error (evitar enumeración)
    const existente = await BenchmarkAccess.findOne({ email: email.toLowerCase() });
    if (existente) {
      return res.status(200).json({
        ok: true,
        duplicate: true,
        message: 'Ya tienes reservado tu early access. Te notificaremos al lanzamiento Q4 2026.',
      });
    }

    const acceso = new BenchmarkAccess({
      nombre:    nombre.trim(),
      empresa:   empresa.trim(),
      email:     email.toLowerCase().trim(),
      ipAddress: req.ip ?? '',
    });
    await acceso.save();

    console.log(`📊 Benchmark early access: ${email} (${empresa})`);

    return res.status(201).json({
      ok: true,
      message: 'Lugar reservado. Te notificaremos cuando el Benchmark Index se publique en Q4 2026.',
    });
  } catch (error) {
    console.error('🚨 papers.benchmarkEarlyAccess:', error);
    return res.status(500).json({ error: 'Error interno. Intenta de nuevo.' });
  }
};

// ─── GET /api/admin/papers ─────────────────────────────────────────────────────
exports.listarAccesos = async (req, res) => {
  try {
    const { status, paperId, page = 1, limit = 50 } = req.query;

    const query = {};
    if (status)  query.status  = status;
    if (paperId) query.paperId = paperId;

    const total   = await PaperAccess.countDocuments(query);
    const accesos = await PaperAccess.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return res.json({ ok: true, total, page: Number(page), data: accesos });
  } catch (error) {
    console.error('🚨 papers.listarAccesos:', error);
    return res.status(500).json({ error: 'Error interno.' });
  }
};

// ─── GET /api/admin/papers/benchmark ─────────────────────────────────────────
exports.listarBenchmark = async (req, res) => {
  try {
    const total   = await BenchmarkAccess.countDocuments();
    const accesos = await BenchmarkAccess.find().sort({ createdAt: -1 }).limit(200);
    return res.json({ ok: true, total, data: accesos });
  } catch (error) {
    console.error('🚨 papers.listarBenchmark:', error);
    return res.status(500).json({ error: 'Error interno.' });
  }
};

// ─── PATCH /api/admin/papers/:id/status ──────────────────────────────────────
exports.actualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pendiente', 'enviado', 'bloqueado'].includes(status)) {
      return res.status(400).json({ error: 'Estado no válido.' });
    }

    const acceso = await PaperAccess.findByIdAndUpdate(
      id,
      { status, ...(status === 'enviado' && { emailSent: true }) },
      { new: true }
    );

    if (!acceso) return res.status(404).json({ error: 'Solicitud no encontrada.' });

    return res.json({ ok: true, data: acceso });
  } catch (error) {
    console.error('🚨 papers.actualizarStatus:', error);
    return res.status(500).json({ error: 'Error interno.' });
  }
};
