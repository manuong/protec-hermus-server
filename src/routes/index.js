//librerías
const routes = require('express').Router();

// rutas
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

// response de la raíz
routes.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

// índice de las rutas
routes.use(authRoutes);
routes.use(taskRoutes);
routes.use(userRoutes);

module.exports = routes;
