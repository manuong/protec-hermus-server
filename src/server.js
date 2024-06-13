const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();

// para no mostrar informacion de express en el header
server.disable('x-powered-by');

// configuracion de las cors
server.use(cors());

// prefijo /api para rutas
server.use('/api', routes);

module.exports = server;
