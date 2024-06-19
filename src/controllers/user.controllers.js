// librerías
const bcrypt = require('bcryptjs');

// modelo
const User = require('../models/user.model');

// errores
const { AuthError } = require('../errors');

// constantes
const TYPE_OF_USERS = require('../constants/typeOfUser');

const getUsersController = async (req, res, next) => {
  try {
    // se obtiene el tipo de usuario para validar permisos
    const { typeOfUser } = req.user;
    if (typeOfUser !== TYPE_OF_USERS.ADMIN) throw new AuthError('Sin permiso para acceder');

    // se pasan querys para una búsqueda de usuario especifica
    const dataUsers = await User.find(req.query);

    res.status(200).json(dataUsers);
  } catch (error) {
    next(error); // se envía a middleware que maneja los errores
  }
};

const registerUserController = async (req, res, next) => {
  try {
    // información de usuario extraída para guardar
    const { name, username, password, typeOfUser } = req.body;

    // se encripta la contraseña
    const passwordHash = await bcrypt.hash(password, 9);

    // se crea la instancia para el nuevo usuario
    const newUser = new User({
      name,
      username,
      password: passwordHash,
      typeOfUser,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con exito' });
  } catch (error) {
    next(error); // se envía a middleware que maneja los errores
  }
};

module.exports = { getUsersController, registerUserController };
