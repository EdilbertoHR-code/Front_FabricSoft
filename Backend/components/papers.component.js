const express                   = require('express');
const router                    = express.Router();
const papersController          = require('../controllers/papers.controller');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// ── Rutas públicas ─────────────────────────────────────────────────────────────
router.post('/solicitar',   papersController.solicitar);
router.post('/benchmark',   papersController.benchmarkEarlyAccess);

// ── Rutas admin ────────────────────────────────────────────────────────────────
router.get('/admin',               ClerkExpressRequireAuth(), papersController.listarAccesos);
router.get('/admin/benchmark',     ClerkExpressRequireAuth(), papersController.listarBenchmark);
router.patch('/admin/:id/status',  ClerkExpressRequireAuth(), papersController.actualizarStatus);

module.exports = router;
