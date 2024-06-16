const {
  getTasksController,
  postTaskController,
  putTaskController,
  deleteTaskController,
} = require('../controllers/task.controllers');

const validateSchema = require('../middlewares/validateSchema.middleware');
const validateToken = require('../middlewares/validateToken.middleware');
const taskSchema = require('../schemas/task.schema');
const taskRoutes = require('express').Router();

taskRoutes.get('/task', validateToken, getTasksController);

taskRoutes.post('/task', validateToken, validateSchema(taskSchema), postTaskController);

taskRoutes.put('/task/:taskId', validateToken, validateSchema(taskSchema), putTaskController);

taskRoutes.delete('/task/:taskId', validateToken, deleteTaskController);

module.exports = taskRoutes;
