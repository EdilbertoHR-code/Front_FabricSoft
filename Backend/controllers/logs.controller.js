const Log = require('../models/model.log');

exports.listar = async (req, res) => {
  try {
    const { categoria } = req.query;
    const filter = {};
    if (categoria && categoria !== 'Todas') filter.categoria = categoria;

    const data = await Log.find(filter).sort({ createdAt: -1 }).limit(300);
    res.json({ ok: true, data });
  } catch (err) {
    console.error('logs.listar error:', err);
    res.status(500).json({ error: 'Error listando logs.' });
  }
};
