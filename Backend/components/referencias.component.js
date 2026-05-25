const express = require('express');
const router = express.Router();
const referenciasController = require('../controllers/referencias.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

router.get('/', referenciasController.listarPublicas);

router.get('/admin', requireAdminKey, referenciasController.listarAdmin);
router.put('/admin', requireAdminKey, referenciasController.actualizar);
router.post('/admin/reset', requireAdminKey, referenciasController.restaurarDefaults);

module.exports = router;
