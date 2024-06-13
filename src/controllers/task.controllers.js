const { NotFoundError, BadRequestError } = require('../errors');
const Task = require('../models/task.model');

const getTasksController = async (req, res, next) => {
  try {
    const tasksData = await Task.find(req.query);

    if (!tasksData) throw new NotFoundError('Tareas no encontradas');

    res.status(200).json(tasksData);
  } catch (error) {
    next(error);
  }
};

const postTaskController = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) throw new BadRequestError('Faltan datos o los datos son incorrectos');

    const newTask = new Task({
      title,
      description,
    });

    await newTask.save();

    res.status(201).json({ message: 'Tarea guardada con exito' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasksController, postTaskController };
