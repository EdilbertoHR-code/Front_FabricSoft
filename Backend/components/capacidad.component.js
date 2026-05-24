const express = require('express');
const router = express.Router();
const capacidadController = require('../controllers/capacidad.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

// Público — s15 lee el estado de capacidad
router.get('/', capacidadController.get);

// Admin
router.put('/',               requireAdminKey, capacidadController.update);
router.patch('/slot/:id',     requireAdminKey, capacidadController.updateSlot);

module.exports = router;
