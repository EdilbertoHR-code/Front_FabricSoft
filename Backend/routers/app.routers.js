const express = require('express');
const router = express.Router();

const routes = {
  auth: require('../components/auth.component'),
  'agente-ia': require('../components/agenteIA.component'),
  'diagnostico-oracle': require('../components/diagnosticoOracle.component'),
};

router.get('/', (req, res) => {
  res.send('✅ API FABRI SOFT: Funcionando correctamente.');
});

Object.entries(routes).forEach(([path, routeHandler]) => {
  router.use(`/${path}`, routeHandler);
});

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
