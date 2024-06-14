const { NotFoundError, BadRequestError } = require('../errors');
const Task = require('../models/task.model');

const getTasksController = async (req, res, next) => {
  try {
    // removed: false para solo devolver las tareas no eliminadas
    const tasksData = await Task.find({ ...req.query, removed: false });

    if (tasksData.length < 1) throw new NotFoundError('Sin ningun registro');

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

const putTaskController = async (req, res, next) => {
  try {
    const { assigned, status, comment } = req.body;
    const { taskId } = req.params;

    const newTaskInfo = {
      assigned,
      status,
      comment,
    };

    const taskUpdate = await Task.findOneAndUpdate({ _id: taskId }, newTaskInfo, { new: true });

    if (!taskUpdate) throw new NotFoundError('Terea no encontrada');

    res.status(200).json({ message: 'Tarea actualizada con exito' });
  } catch (error) {
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndUpdate(
      { _id: taskId, removed: false },
      { removed: true },
      { new: true }
    );

    if (!deletedTask) throw new NotFoundError('Tarea no encontrada o ya eliminada');

    res.status(200).json({ message: 'Tarea eliminada con exito' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasksController, postTaskController, putTaskController, deleteTaskController };
