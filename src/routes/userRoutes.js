// librerías
const userRoutes = require('express').Router();

// middlewares
const validateSchema = require('../middlewares/validateSchema.middleware');
const validateToken = require('../middlewares/validateToken.middleware');

// esquemas
const userSchema = require('../schemas/user.schema');

// controladores
const { getUsersController, registerUserController } = require('../controllers/user.controllers');

userRoutes.get('/user', validateToken, getUsersController);

userRoutes.post('/user', validateSchema(userSchema), registerUserController);

// userRoutes.put('/user');

// userRoutes.delete('/user');

module.exports = userRoutes;
