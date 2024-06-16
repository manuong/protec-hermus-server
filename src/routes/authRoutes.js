const { loginController } = require('../controllers/auth.controllers');

const authRoutes = require('express').Router();

authRoutes.post('/login', loginController);

module.exports = authRoutes;
