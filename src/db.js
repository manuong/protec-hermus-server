const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;

// conexion a la base de datos
const connectionDB = mongoose.connect(connectionString);

module.exports = connectionDB;
