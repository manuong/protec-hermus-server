const userRoutes = require('express').Router();

const { getUsersController, registerUserController } = require('../controllers/user.controllers');
const validateSchema = require('../middlewares/validateSchema.middleware');
const userSchema = require('../schemas/user.schema');

userRoutes.get('/user', getUsersController);

userRoutes.post('/user', validateSchema(userSchema), registerUserController);

// userRoutes.put('/user');

// userRoutes.delete('/user');

module.exports = userRoutes;
