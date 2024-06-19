// modelo
const Task = require('../models/task.model');

// errores
const { NotFoundError, BadRequestError } = require('../errors');

// contantes
const TYPE_OF_USERS = require('../constants/typeOfUser');

const getTaskDetailController = async (req, res, next) => {
  try {
    // se extrae el id de la tarea para busqueda
    const { taskId } = req.params;

    // se busca la tarea con ese id
    const task = await Task.findById(taskId);
    if (!task) throw new NotFoundError('Terea no encontrada');

    res.status(200).json(task);
  } catch (error) {
    next(error); // se envía a middleware que maneja los errores
  }
};

const getTasksController = async (req, res, next) => {
  try {
    // que usuario esta haciendo la peticion
    const { typeOfUser } = req.user;
    const { id } = req.user;

    // filtrar dependiendo el usuario
    let filter = { ...req.query, removed: false }; // para el administrador se envian todas las tareas
    if (typeOfUser === TYPE_OF_USERS.AREA) filter = { ...filter, area: id };
    if (typeOfUser === TYPE_OF_USERS.TEC) filter = { ...filter, assigned: id };

    const tasksData = await Task.find(filter)
      .sort({ updatedAt: -1 }) // ordenar para mostar las tareas mas recientes primero
      .populate('assigned') // para incluir la info de usuario en la respuesta
      .populate('area');

    res.status(200).json(tasksData);
  } catch (error) {
    next(error); // se envía a middleware que maneja los errores
  }
};

const postTaskController = async (req, res, next) => {
  // se extrae la info de la tarea para crear tarea
  const { title, description } = req.body;

  // que usuario creo la tarea
  const { id } = req.user;

  try {
    if (!title || !description) throw new BadRequestError('Faltan datos o los datos son incorrectos');

    // se crea la instancia para la nueva tarea
    const newTask = new Task({
      title,
      description,
      area: id,
    });

    await newTask.save();

    res.status(201).json({ message: 'Tarea guardada con exito' });
  } catch (error) {
    next(error); // se envía a middleware que maneja los errores
  }
};

const putTaskController = async (req, res, next) => {
  try {
    // se extrae la info de la tarea para actualizarla
    const { assigned, status, comment } = req.body;
    // que tarea se va actualizar
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
    next(error); // se envía a middleware que maneja los errores
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    // que tarea se va a eliminar
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndUpdate(
      { _id: taskId, removed: false },
      { removed: true },
      { new: true }
    );

    if (!deletedTask) throw new NotFoundError('Tarea no encontrada o ya eliminada');

    res.status(200).json({ message: 'Tarea eliminada con exito' });
  } catch (error) {
    next(error); // se envía a middleware que maneja los errores
  }
};

module.exports = {
  getTasksController,
  postTaskController,
  putTaskController,
  deleteTaskController,
  getTaskDetailController,
};
