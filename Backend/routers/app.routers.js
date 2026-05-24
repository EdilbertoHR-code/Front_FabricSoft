const express = require('express');
const router = express.Router();

const authRoutes   = require('../components/auth.component');
const papersRoutes = require('../components/papers.component');
const leadsRoutes  = require('../components/leads.component');

router.get('/', (req, res) => {
  res.json({ ok: true, message: '✅ API FABRIC SOFT funcionando.' });
});

router.use('/auth',   authRoutes);
router.use('/papers', papersRoutes);
router.use('/leads',  leadsRoutes);







router.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada', 
    path: req.originalUrl 
  });
});



router.use((err, req, res, next) => {
  console.error(`⚠️ Error en ruta ${req.method} ${req.originalUrl}:`, err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    ...(process.env.NODE_ENV !== 'production' && { message: err.message })
  });
});


module.exports = router;