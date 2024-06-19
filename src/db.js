// librerías
const mongoose = require('mongoose');

// string que proporciona MongoDB para conectarse a la base de datos
const connectionString = process.env.MONGODB_URI;

// conexion a la base de datos
const connectionDB = mongoose.connect(connectionString);

module.exports = connectionDB;
