const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // camprobar el esquema entrante
    next(); // si todo bien continuar
  } catch (error) {
    next(error); //  enviar error a handleErrorsMiddleware
  }
};

module.exports = validateSchema;
