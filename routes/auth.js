const express = require('express');
const router = express.Router();
const authController = require('../views/auth/authController');

// Rutas de login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Rutas de registro
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Ruta de logout
router.get('/logout', authController.logout);

module.exports = router;