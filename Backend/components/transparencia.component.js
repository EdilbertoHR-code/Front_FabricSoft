const express = require('express');
const router = express.Router();
const transparenciaController = require('../controllers/transparencia.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

// Público
router.get('/', transparenciaController.listarPublico);

// Admin (requiere x-admin-key)
router.get('/admin',       requireAdminKey, transparenciaController.listarAdmin);
router.put('/admin',       requireAdminKey, transparenciaController.actualizar);
router.post('/admin/reset', requireAdminKey, transparenciaController.restaurarDefaults);

module.exports = router;
