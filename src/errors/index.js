const ERROR_NAMES = require('./errorNames');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_NAMES.NOT_FOUND_ERROR;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_NAMES.BAD_REQUEST;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = ERROR_NAMES.AUTH_ERROR;
  }
}

module.exports = { NotFoundError, BadRequestError, AuthError };
