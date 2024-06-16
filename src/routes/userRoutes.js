const userRoutes = require('express').Router();

const { getUsersController, registerUserController } = require('../controllers/user.controllers');
const validateSchema = require('../middlewares/validateSchema.middleware');
const validateToken = require('../middlewares/validateToken.middleware');
const userSchema = require('../schemas/user.schema');

userRoutes.get('/user', validateToken, getUsersController);

userRoutes.post('/user', validateToken, validateSchema(userSchema), registerUserController);

// userRoutes.put('/user');

// userRoutes.delete('/user');

module.exports = userRoutes;
