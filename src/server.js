const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors.middleware');
const morgan = require('morgan');

const server = express();

// para no mostrar informacion de express en el header
server.disable('x-powered-by');

// configuracion de las cors
server.use(cors());

// visualizar en consola las peticiones realizadas
server.use(morgan('dev'));

// para recivir los datos por body
server.use(express.json());

// prefijo /api para rutas
server.use('/api', routes);

// middle para manejar los errores
server.use(handleErrors);

module.exports = server;
