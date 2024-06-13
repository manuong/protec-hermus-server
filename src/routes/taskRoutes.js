const { getTasksController, postTaskController } = require('../controllers/task.controllers');

const taskRoutes = require('express').Router();

taskRoutes.get('/task', getTasksController);

taskRoutes.post('/task', postTaskController);

// taskRoutes.put('/task');

// taskRoutes.delete('/task');

module.exports = taskRoutes;
