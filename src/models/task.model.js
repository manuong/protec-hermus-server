const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    discription: {
      type: String,
      trime: true,
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed', 'approved'],
      default: 'pending',
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
    delete returnedObject._v;
  },
});

// se define el esquema y se guarda en constante para exportarla y utilizarla
const Task = mongoose.model('Task', userSchema);

module.exports = Task;
