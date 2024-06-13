import express from 'express';
import cors from 'cors';

const server = express();

// para no mostrar informacion de express en el header
server.disable('x-powered-by');

// configuracion de las cors
server.use(cors());

// prefijo /api para rutas
// server.use('/api');

export default server;
