const {
  getTasksController,
  postTaskController,
  putTaskController,
  deleteTaskController,
} = require('../controllers/task.controllers');

const validateSchema = require('../middlewares/validateSchema.middleware');
const taskSchema = require('../schemas/task.schema');
const taskRoutes = require('express').Router();

taskRoutes.get('/task', getTasksController);

taskRoutes.post('/task', validateSchema(taskSchema), postTaskController);

taskRoutes.put('/task/:taskId', validateSchema(taskSchema), putTaskController);

taskRoutes.delete('/task/:taskId', deleteTaskController);

module.exports = taskRoutes;
