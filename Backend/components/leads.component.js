const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Público — formulario /aplicar
router.post('/solicitar',   leadsController.solicitar);
router.post('/waitlist',    leadsController.solicitarWaitlist);
router.post('/referencia',  leadsController.solicitarReferencia);
router.post('/cloud-comparator',    leadsController.solicitarCloudComparator);
router.post('/migration-roadmap',   leadsController.solicitarMigrationRoadmap);
router.post('/readiness-score',     leadsController.solicitarReadinessScore);
router.post('/office-hours',        leadsController.solicitarOfficeHours);

// Admin
router.get('/admin',               ClerkExpressRequireAuth(), leadsController.listarLeads);
router.patch('/admin/:id/status',  ClerkExpressRequireAuth(), leadsController.actualizarStatus);
router.patch('/admin/:id/notas',   ClerkExpressRequireAuth(), leadsController.actualizarNotas);

module.exports = router;
