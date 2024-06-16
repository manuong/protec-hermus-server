const { AuthError } = require('../errors');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  try {
    let token = null;
    const { TOKEN_SECRET_KEY } = process.env;

    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }

    if (!token) throw new AuthError('Token no valido');

    jwt.verify(token, TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) throw new AuthError('Token no valido');

      req.user = decoded;
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
