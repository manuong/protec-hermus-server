const ERROR_NAMES = require('../errors/errorNames');

const handleErrors = (error, req, res, next) => {
  if (error.name === ERROR_NAMES.NOT_FOUND_ERROR) {
    res.status(404).json({ error: error.message });
  }

  if (error.name === ERROR_NAMES.BAD_REQUEST) {
    res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: error.message });
  console.log(error.name);
};

module.exports = handleErrors;
