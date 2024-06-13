import mongoose from 'mongoose';

import dotenv from 'dotenv';
// para variables de entorno del archivo .env
dotenv.config();

const connectionString = process.env.MONGODB_URI;

console.log(connectionString);

const connectionDB = mongoose.connect(connectionString).then(() => {
  console.log('>>> Database connected');
});

export default connectionDB;
