const express = require('express');
const router = express.Router();
const Lead = require('../models/model.lead');

router.get('/', async (req, res) => {
  try {
    const [proyectosActivos, solicitudesEvaluadas, enListaEspera] = await Promise.all([
      Lead.countDocuments({ status: 'Aprobado' }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'WaitList' }),
    ]);

    res.json({ ok: true, data: { proyectosActivos, solicitudesEvaluadas, enListaEspera } });
  } catch (err) {
    console.error('stats error:', err);
    res.status(500).json({ error: 'Error obteniendo estadísticas.' });
  }
});

module.exports = router;
