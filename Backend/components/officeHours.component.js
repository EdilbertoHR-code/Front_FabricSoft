const express = require('express');
const router = express.Router();
const officeHoursController = require('../controllers/officeHours.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

// Público
router.post('/book',         officeHoursController.book);
router.get('/slots-ocupados', officeHoursController.slotsOcupados);

// Admin
router.get('/admin',               requireAdminKey, officeHoursController.listar);
router.patch('/admin/:id/status',  requireAdminKey, officeHoursController.actualizarStatus);

module.exports = router;
