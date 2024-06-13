const taskRoutes = require('./taskRoutes');

const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

routes.use(taskRoutes);

module.exports = routes;
