const express = require('express');
const router = express.Router();

const routes = {
  auth: require('../components/auth.component'),
 
};



router.get('/', (req, res) => {
  res.send('✅ API FABRI SOFT: Funcionando correctamente.');
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