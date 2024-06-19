// librerías
const authRoutes = require('express').Router();

// controladores
const { loginController } = require('../controllers/auth.controllers');

authRoutes.post('/login', loginController);

module.exports = authRoutes;
