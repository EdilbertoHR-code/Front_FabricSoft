const express = require('express');
const router = express.Router();
const Lead = require('../models/model.lead');

router.get('/', async (req, res) => {
  try {
    const [proyectosActivos, solicitudesEvaluadas] = await Promise.all([
      Lead.countDocuments({ status: 'Aprobado' }),
      Lead.countDocuments(),
    ]);

    res.json({ ok: true, data: { proyectosActivos, solicitudesEvaluadas } });
  } catch (err) {
    console.error('stats error:', err);
    res.status(500).json({ error: 'Error obteniendo estadísticas.' });
  }
});

module.exports = router;
