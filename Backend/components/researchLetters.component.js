const express             = require('express');
const router              = express.Router();
const ctrl                = require('../controllers/researchLetters.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

// ── Pública ────────────────────────────────────────────────────────────────────
router.post('/solicitar', ctrl.solicitar);

// ── Admin ──────────────────────────────────────────────────────────────────────
router.get('/admin',              requireAdminKey, ctrl.listar);
router.get('/admin/config',       requireAdminKey, ctrl.getConfig);
router.put('/admin/config',       requireAdminKey, ctrl.actualizarConfig);
router.patch('/admin/:id/status', requireAdminKey, ctrl.actualizarStatus);

module.exports = router;
