const express                   = require('express');
const router                    = express.Router();
const papersController          = require('../controllers/papers.controller');
const { requireAdminKey }       = require('../middleware/admin.middleware');

// ── Rutas públicas ─────────────────────────────────────────────────────────────
router.post('/solicitar',   papersController.solicitar);
router.post('/benchmark',   papersController.benchmarkEarlyAccess);

// ── Rutas admin ────────────────────────────────────────────────────────────────
router.get('/admin',               requireAdminKey, papersController.listarAccesos);
router.get('/admin/benchmark',     requireAdminKey, papersController.listarBenchmark);
router.patch('/admin/:id/status',  requireAdminKey, papersController.actualizarStatus);

module.exports = router;
