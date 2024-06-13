import dotenv from 'dotenv';
// para variables de entorno del archivo .env
dotenv.config();

import server from './src/server.js';
import connectionDB from './src/db.js';

const { PORT } = process.env;

connectionDB
  .then(
    server.listen(PORT, () => {
      console.log(`server lisened on PORT ${PORT}`);
    })
  )
  .catch((error) => {
    console.error(error);
  });
