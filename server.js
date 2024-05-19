//import del servidor 
import app from './index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

import connection from './models/config.js';

const server = app.listen(PORT, () => (
    console.log(`Servidor situadio de 'server.js' en http://localhost:${PORT}`)
));
