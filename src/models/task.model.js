// librerías
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
    },
    description: {
      type: String,
      trime: true,
      require: true,
    },
    // relacion con tabla user para asignacion de tecnico
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // relacion con tabla user para quien emite la tarea
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed', 'approved'],
      default: 'pending',
    },
    comment: {
      type: String,
      trim: true,
    },
    // implementando un borrado logico
    removed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Para configurar el "toJSON" como respuesta que devuelve el servido

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // se cambia el nombre de la propiedad que mongodb nombra por defecto
    returnedObject.id = returnedObject._id;

    // esto no modifica lo que esta guardado en la base de datos
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.removed;
  },
});

// se define el esquema y se guarda en constante para exportarla y utilizarla
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
