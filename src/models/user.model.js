// librerías
const mongoose = require('mongoose');

// se define el esquema de "usuarios"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    typeOfUser: {
      type: String,
      require: true,
      trim: true,
      enum: ['administrador', 'técnico', 'área'],
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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // se cambia el nombre de la propiedad que mongodb nombra por defecto
    returnedObject.id = returnedObject._id;

    // esto no modifica lo que esta guardado en la base de datos
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.removed;
  },
});

// se define el esquema y se guarda en constante para exportarla y utilizarla
const User = mongoose.model('User', userSchema);

module.exports = User;
