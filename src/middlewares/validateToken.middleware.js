// librerías
const jwt = require('jsonwebtoken');

// errors
const { AuthError } = require('../errors');

const validateToken = (req, res, next) => {
  try {
    let token = null;
    const { TOKEN_SECRET_KEY } = process.env;

    // crompobar y extraer token
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }

    if (!token) throw new AuthError('Token no valido');

    // verificar token
    jwt.verify(token, TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) throw new AuthError('Token no valido');

      req.user = decoded; // guardar información de usuario decodificada
    });

    next(); // si todo correcto, continuar
  } catch (error) {
    next(error); // enviar error a handleErrorsMiddleware
  }
};

module.exports = validateToken;
