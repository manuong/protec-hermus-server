// constantes
const ERROR_NAMES = require('./errorNames');

//* se crean instancias a partir de Error para manejo de errores

// para errores al no encontrar lo solicitado
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_NAMES.NOT_FOUND_ERROR;
  }
}

// para errores cuando hay errores en la petición
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_NAMES.BAD_REQUEST;
  }
}

// para errores de autenticación
class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_NAMES.AUTH_ERROR;
  }
}

module.exports = { NotFoundError, BadRequestError, AuthError };
