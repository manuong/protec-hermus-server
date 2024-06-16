const ERROR_NAMES = require('../errors/errorNames');

const handleErrors = (error, req, res, next) => {
  const errorArray = [error.message];

  if (error.name === ERROR_NAMES.NOT_FOUND_ERROR) {
    return res.status(404).json({ error: errorArray });
  }

  if (error.name === ERROR_NAMES.BAD_REQUEST) {
    return res.status(400).json({ error: errorArray });
  }

  if (error.name === ERROR_NAMES.AUTH_ERROR) {
    return res.status(401).json({ error: errorArray });
  }

  // errores con los parametros definidos en los modelos
  if (error.name === 'MongoServerError') {
    if (error.code === 11000) return res.status(409).json({ error: ['Usuario ya registrado'] });
  }

  // errores de validacion de la libreria "zod" que estamos utilizando
  if (error.name === 'ZodError') {
    const errorMessages = error.errors.map((error) => error.message);
    return res.status(400).json({ error: errorMessages });
  }

  res.status(500).json({ error: errorArray });
  console.log(error.name);
};

module.exports = handleErrors;
