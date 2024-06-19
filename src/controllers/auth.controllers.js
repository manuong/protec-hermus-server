// librerías
const bcrypt = require('bcryptjs');

// configuraciones
const createAccessToken = require('../libs/jwt');

// modelo
const User = require('../models/user.model');

// errores
const { AuthError, BadRequestError } = require('../errors');

const loginController = async (req, res, next) => {
  try {
    // se extraen las credenciales
    const { username, password } = req.body;
    if (!username || !password) throw new BadRequestError('Faltan datos requeridos');

    // se verifica la inforación
    const user = await User.findOne({ username });
    if (!user) throw new AuthError('Usuario o contraseña incorrectos');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new AuthError('Usuario o contraseña incorrectos');

    // esquema de usuario para guardar en el token
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
