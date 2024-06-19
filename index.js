// cargar variables de entorno
require('dotenv').config();

// base de datos
const connectionDB = require('./src/db');

// servidor
const server = require('./src/server');

const PORT = process.env.PORT || 3000;

// conenctar base de datos y despues levantar el servidor
connectionDB
  .then(() => {
    console.log('>>> Database connected');
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server lisened on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
