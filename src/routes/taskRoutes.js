// librerías
const taskRoutes = require('express').Router();

// middlewares
const validateSchema = require('../middlewares/validateSchema.middleware');
const validateToken = require('../middlewares/validateToken.middleware');

// esquemas
const taskSchema = require('../schemas/task.schema');

// controladores
const {
  getTasksController,
  postTaskController,
  putTaskController,
  deleteTaskController,
  getTaskDetailController,
} = require('../controllers/task.controllers');

taskRoutes.get('/task', validateToken, getTasksController);

taskRoutes.get('/task/:taskId', validateToken, getTaskDetailController);

taskRoutes.post('/task', validateToken, validateSchema(taskSchema), postTaskController);

taskRoutes.put('/task/:taskId', validateToken, validateSchema(taskSchema), putTaskController);

taskRoutes.delete('/task/:taskId', validateToken, deleteTaskController);

module.exports = taskRoutes;
