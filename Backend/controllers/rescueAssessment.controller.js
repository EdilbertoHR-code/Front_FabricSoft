const RescueAssessment = require('../models/model.rescueAssessment');
const RescueAssessmentQuestionSet = require('../models/model.rescueAssessmentQuestionSet');
const { sendRescueAssessmentResultado } = require('../services/email.service');
const { log } = require('../services/log.service');
const { sanitizeTracking } = require('../utils/tracking');

const SEVERITY_THRESHOLDS = { BAJO: 8, MODERADO: 16, ALTO: 24 };

const DEFAULT_QUESTIONS = [
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

function getSeverity(score) {
  if (score <= SEVERITY_THRESHOLDS.BAJO) return 'BAJO';
  if (score <= SEVERITY_THRESHOLDS.MODERADO) return 'MODERADO';
  if (score <= SEVERITY_THRESHOLDS.ALTO) return 'ALTO';
  return 'CRÍTICO';
}

function normalizeQuestions(rawQuestions) {
  if (!Array.isArray(rawQuestions) || rawQuestions.length !== 12) {
    throw new Error('Se requieren exactamente 12 preguntas.');
  }

  return rawQuestions.map((question, index) => {
    const id = String(question.id || `q${index + 1}`).trim();
    const text = String(question.text || '').trim();
    const options = Array.isArray(question.options) ? question.options : [];

    if (!id || !text || options.length < 2) {
      throw new Error(`Pregunta ${index + 1} incompleta.`);
    }

    return {
      id,
      text,
      options: options.map((option, optionIndex) => {
        const label = String(option.label || '').trim();
        const score = Number(option.score);

        if (!label || Number.isNaN(score) || score < 0 || score > 3) {
          throw new Error(`Opcion ${optionIndex + 1} invalida en pregunta ${index + 1}.`);
        }

        return { label, score };
      }),
    };
  });
}

async function getQuestionSetDocument() {
  const existing = await RescueAssessmentQuestionSet.findOne({ key: 'default' }).lean();
  if (existing) return existing;

  const created = await RescueAssessmentQuestionSet.create({
    key: 'default',
    questions: DEFAULT_QUESTIONS,
    updatedBy: 'system-default',
  });

  return created.toObject();
}

function questionSetResponse(questionSet) {
  return {
    ok: true,
    questions: questionSet.questions,
    thresholds: SEVERITY_THRESHOLDS,
    maxScore: 36,
    updatedAt: questionSet.updatedAt,
  };
}

exports.getQuestionSet = async (_req, res) => {
  try {
    const questionSet = await getQuestionSetDocument();
    return res.json(questionSetResponse(questionSet));
  } catch (err) {
    console.error('rescueAssessment.getQuestionSet error:', err);
    return res.status(500).json({ error: 'Error obteniendo preguntas.' });
  }
};

exports.updateQuestionSet = async (req, res) => {
  try {
    const questions = normalizeQuestions(req.body.questions);
    const updatedBy = req.auth?.userId || req.user?.id || '';

    const questionSet = await RescueAssessmentQuestionSet.findOneAndUpdate(
      { key: 'default' },
      { questions, updatedBy },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();

    await log('rescue-assessment', 'questions.update', { updatedBy });

    return res.json(questionSetResponse(questionSet));
  } catch (err) {
    console.error('rescueAssessment.updateQuestionSet error:', err);
    return res.status(400).json({ error: err.message || 'Error actualizando preguntas.' });
  }
};

exports.resetQuestionSet = async (req, res) => {
  try {
    const updatedBy = req.auth?.userId || req.user?.id || '';
    const questionSet = await RescueAssessmentQuestionSet.findOneAndUpdate(
      { key: 'default' },
      { questions: DEFAULT_QUESTIONS, updatedBy },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();

    await log('rescue-assessment', 'questions.reset', { updatedBy });
    return res.json(questionSetResponse(questionSet));
  } catch (err) {
    console.error('rescueAssessment.resetQuestionSet error:', err);
    return res.status(400).json({ error: err.message || 'Error restaurando preguntas.' });
  }
};

exports.submit = async (req, res) => {
  try {
    const { email, nombre, empresa, cargo, answers, tracking } = req.body;

    if (!email || !answers || !Array.isArray(answers) || answers.length !== 12) {
      return res.status(400).json({ error: 'Email y 12 respuestas son requeridos.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ error: 'Email no valido.' });
    }

    const totalScore = answers.reduce((sum, answer) => sum + (Number(answer.score) || 0), 0);
    const severity = getSeverity(totalScore);

    const assessment = await RescueAssessment.create({
      email: email.toLowerCase().trim(),
      nombre: nombre?.trim() || '',
      empresa: empresa?.trim() || '',
      cargo: cargo?.trim() || '',
      answers,
      totalScore,
      severity,
      ipAddress: req.ip || '',
      tracking: sanitizeTracking(tracking),
    });

    sendRescueAssessmentResultado({ email, nombre: nombre || email, empresa: empresa || '', severity, totalScore })
      .then(() => RescueAssessment.findByIdAndUpdate(assessment._id, { emailSent: true }))
      .catch(() => {});

    await log('rescue-assessment', 'submit', { email, severity, totalScore });

    return res.status(201).json({
      ok: true,
      severity,
      totalScore,
      assessmentId: assessment._id,
    });
  } catch (err) {
    console.error('rescueAssessment.submit error:', err);
    return res.status(500).json({ error: 'Error procesando el assessment.' });
  }
};

exports.listar = async (req, res) => {
  try {
    const { severity, limit = 100, offset = 0 } = req.query;
    const filter = severity ? { severity } : {};

    const [data, total] = await Promise.all([
      RescueAssessment.find(filter)
        .sort({ createdAt: -1 })
        .skip(Number(offset))
        .limit(Number(limit))
        .lean(),
      RescueAssessment.countDocuments(filter),
    ]);

    const counts = await RescueAssessment.aggregate([
      { $group: { _id: '$severity', count: { $sum: 1 } } },
    ]);
    const bySeverity = { BAJO: 0, MODERADO: 0, ALTO: 0, CRÍTICO: 0 };
    counts.forEach((count) => { bySeverity[count._id] = count.count; });

    return res.json({ ok: true, total, bySeverity, data });
  } catch (err) {
    console.error('rescueAssessment.listar error:', err);
    return res.status(500).json({ error: 'Error obteniendo assessments.' });
  }
};
