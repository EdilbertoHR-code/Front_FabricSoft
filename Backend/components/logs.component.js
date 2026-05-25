const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/logs.controller');
const { requireAdminKey } = require('../middleware/admin.middleware');

router.get('/admin', requireAdminKey, ctrl.listar);

module.exports = router;
