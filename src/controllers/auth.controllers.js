const { AuthError, BadRequestError } = require('../errors');
const createAccessToken = require('../libs/jwt');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new BadRequestError('Faltan datos requeridos');

    const user = await User.findOne({ username });
    if (!user) throw new AuthError('Usuario o contraseña incorrectos');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new AuthError('Usuario o contraseña incorrectos');

    const userForToken = {
      id: user._id,
      name: user.name,
      username: user.username,
      typeOfUser: user.typeOfUser,
    };

    const token = await createAccessToken(userForToken);

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginController };
