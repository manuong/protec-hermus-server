const { NotFoundError } = require('../errors');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUsersController = async (req, res, next) => {
  try {
    const dataUsers = await User.find(req.query);

    if (dataUsers.length < 1) throw new NotFoundError('Sin ningun registro');

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
