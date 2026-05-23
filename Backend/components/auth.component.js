const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const authController = require('../controllers/auth.controller');


router.get('/login', 
  ClerkExpressRequireAuth(), 
  authController.validarSesion
);


router.post('/firebase-token', 
  ClerkExpressRequireAuth(), 
  authController.getFirebaseToken
);


module.exports = router;