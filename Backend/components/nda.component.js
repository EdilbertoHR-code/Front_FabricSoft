const express = require('express');
const router = express.Router();
const ndaController = require('../controllers/nda.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

router.post('/solicitar', ndaController.solicitar);

router.get('/admin', requireAdminKey, ndaController.listar);
router.patch('/admin/:id/status', requireAdminKey, ndaController.actualizarStatus);
router.post('/admin/:id/aprobar-enviar', requireAdminKey, ndaController.aprobarYEnviar);

module.exports = router;
