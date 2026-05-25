const express = require('express');
const router = express.Router();
const metricasController = require('../controllers/metricas.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

// Público — el home puede leer las métricas visibles
router.get('/', metricasController.get);

// Admin — actualiza una métrica por id
router.patch('/:id', requireAdminKey, metricasController.updateOne);

module.exports = router;
