const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

module.exports = routes;
