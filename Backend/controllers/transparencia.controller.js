const TransparenciaConfig = require('../models/model.transparencia');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getSingleton() {
  let doc = await TransparenciaConfig.findOne();
  if (!doc) doc = await TransparenciaConfig.create({});
  return doc;
}

function sortBy(arr) {
  return [...arr].sort((a, b) => (a.orden || 0) - (b.orden || 0));
}

// Sanitize string — trim y máximo de longitud
function str(val, max = 1000) {
  return String(val ?? '').trim().slice(0, max);
}

function sanitizePublicada(item, index) {
  return {
    label:               str(item.label, 200),
    valor:               str(item.valor, 100),
    unidad:              str(item.unidad, 100),
    metodologia:         str(item.metodologia, 2000),
    periodo:             str(item.periodo, 100),
    fuente: {
      tipo:        ['interna', 'auditoria_externa', 'cliente'].includes(item.fuente?.tipo)
                     ? item.fuente.tipo
                     : 'interna',
      descripcion: str(item.fuente?.descripcion, 300),
    },
    verificadoPor:       str(item.verificadoPor, 200),
    ultimaActualizacion: item.ultimaActualizacion
                           ? new Date(item.ultimaActualizacion)
                           : new Date(),
    visible:             Boolean(item.visible),
    verified:            Boolean(item.verified),
    orden:               Number.isFinite(Number(item.orden)) ? Number(item.orden) : index + 1,
  };
}

function sanitizeProxima(item, index) {
  return {
    label:         str(item.label, 200),
    fechaObjetivo: str(item.fechaObjetivo, 100),
    descripcion:   str(item.descripcion, 500),
    visible:       Boolean(item.visible),
    orden:         Number.isFinite(Number(item.orden)) ? Number(item.orden) : index + 1,
  };
}

function sanitizeCompromiso(item, index) {
  return {
    titulo: str(item.titulo, 200),
    cuerpo: str(item.cuerpo, 2000),
    orden:  Number.isFinite(Number(item.orden)) ? Number(item.orden) : index + 1,
  };
}

// ---------------------------------------------------------------------------
// GET /api/transparencia  — público
// Regla: publicadas solo si visible === true && verified === true
//        proximas solo si visible === true
//        compromisos todos
// ---------------------------------------------------------------------------
exports.listarPublico = async (req, res) => {
  try {
    const doc = await getSingleton();

    const publicadas = sortBy(doc.publicadas)
      .filter(p => p.visible && p.verified)
      .map((p, i) => ({
        id:                  String(i + 1).padStart(2, '0'),
        label:               p.label,
        valor:               p.valor,
        unidad:              p.unidad,
        metodologia:         p.metodologia,
        periodo:             p.periodo,
        fuente:              { tipo: p.fuente?.tipo, descripcion: p.fuente?.descripcion },
        verificadoPor:       p.verificadoPor,
        ultimaActualizacion: p.ultimaActualizacion,
      }));

    const proximas = sortBy(doc.proximas)
      .filter(p => p.visible)
      .map(p => ({
        id:            p._id,
        label:         p.label,
        fechaObjetivo: p.fechaObjetivo,
        descripcion:   p.descripcion,
      }));

    const compromisos = sortBy(doc.compromisos).map((c, i) => ({
      id:     String(i + 1).padStart(2, '0'),
      titulo: c.titulo,
      cuerpo: c.cuerpo,
    }));

    res.json({
      ok: true,
      data: {
        publicadas,
        proximas,
        compromisos,
        ultimaActualizacion: doc.updatedAt,
      },
    });
  } catch (err) {
    console.error('transparencia.listarPublico error:', err);
    res.status(500).json({ error: 'Error obteniendo datos de transparencia.' });
  }
};

// ---------------------------------------------------------------------------
// GET /api/transparencia/admin  — privado
// Devuelve todos los campos incluyendo visible, verified y _id
// ---------------------------------------------------------------------------
exports.listarAdmin = async (req, res) => {
  try {
    const doc = await getSingleton();
    res.json({
      ok: true,
      data: {
        publicadas:  sortBy(doc.publicadas),
        proximas:    sortBy(doc.proximas),
        compromisos: sortBy(doc.compromisos),
        ultimaActualizacion: doc.updatedAt,
      },
    });
  } catch (err) {
    console.error('transparencia.listarAdmin error:', err);
    res.status(500).json({ error: 'Error obteniendo datos de transparencia.' });
  }
};

// ---------------------------------------------------------------------------
// PUT /api/transparencia/admin  — privado
// ---------------------------------------------------------------------------
exports.actualizar = async (req, res) => {
  try {
    const { publicadas, proximas, compromisos } = req.body;
    const doc = await getSingleton();

    if (Array.isArray(publicadas)) {
      const clean = publicadas
        .map((item, i) => sanitizePublicada(item, i))
        .filter(item => item.label && item.valor && item.unidad);
      if (!clean.length) {
        return res.status(400).json({ error: 'publicadas no puede quedar vacío.' });
      }
      doc.publicadas = clean;
    }

    if (Array.isArray(proximas)) {
      const clean = proximas
        .map((item, i) => sanitizeProxima(item, i))
        .filter(item => item.label && item.fechaObjetivo);
      doc.proximas = clean;
    }

    if (Array.isArray(compromisos)) {
      const clean = compromisos
        .map((item, i) => sanitizeCompromiso(item, i))
        .filter(item => item.titulo && item.cuerpo);
      if (!clean.length) {
        return res.status(400).json({ error: 'compromisos no puede quedar vacío.' });
      }
      doc.compromisos = clean;
    }

    await doc.save();

    res.json({
      ok: true,
      data: {
        publicadas:  sortBy(doc.publicadas),
        proximas:    sortBy(doc.proximas),
        compromisos: sortBy(doc.compromisos),
        ultimaActualizacion: doc.updatedAt,
      },
    });
  } catch (err) {
    console.error('transparencia.actualizar error:', err);
    res.status(500).json({ error: 'Error actualizando transparencia.' });
  }
};

// ---------------------------------------------------------------------------
// POST /api/transparencia/admin/reset  — privado
// ---------------------------------------------------------------------------
exports.restaurarDefaults = async (req, res) => {
  try {
    const doc = await getSingleton();
    const defaults = TransparenciaConfig.defaults();
    doc.publicadas  = defaults.publicadas;
    doc.proximas    = defaults.proximas;
    doc.compromisos = defaults.compromisos;
    await doc.save();

    res.json({
      ok: true,
      data: {
        publicadas:  sortBy(doc.publicadas),
        proximas:    sortBy(doc.proximas),
        compromisos: sortBy(doc.compromisos),
        ultimaActualizacion: doc.updatedAt,
      },
    });
  } catch (err) {
    console.error('transparencia.restaurarDefaults error:', err);
    res.status(500).json({ error: 'Error restaurando defaults.' });
  }
};
