const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

// Público — formulario /aplicar
router.post('/solicitar',   leadsController.solicitar);
router.post('/waitlist',    leadsController.solicitarWaitlist);
router.post('/referencia',  leadsController.solicitarReferencia);

// Admin — requiere x-admin-key
router.get('/admin',               requireAdminKey, leadsController.listarLeads);
router.patch('/admin/:id/status',  requireAdminKey, leadsController.actualizarStatus);
router.patch('/admin/:id/notas',   requireAdminKey, leadsController.actualizarNotas);

module.exports = router;
