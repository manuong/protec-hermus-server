const TYPE_OF_USERS = require('../constants/typeOfUser');
const { AuthError } = require('../errors');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUsersController = async (req, res, next) => {
  try {
    const { typeOfUser } = req.user;
    if (typeOfUser !== TYPE_OF_USERS.ADMIN) throw new AuthError('Sin permiso para acceder');

    const dataUsers = await User.find(req.query);

    res.status(200).json(dataUsers);
  } catch (error) {
    next(error);
  }
};

const registerUserController = async (req, res, next) => {
  try {
    const { name, username, password, typeOfUser } = req.body;

    const passwordHash = await bcrypt.hash(password, 9);

    const newUser = new User({
      name,
      username,
      password: passwordHash,
      typeOfUser,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con exito' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsersController, registerUserController };
