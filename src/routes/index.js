const routes = require('express').Router();

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

routes.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

routes.use(authRoutes);
routes.use(taskRoutes);
routes.use(userRoutes);

module.exports = routes;
