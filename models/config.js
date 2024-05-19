import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const PORTSQL = process.env.PORTSQL;
const USERSQL= process.env.USERSQL;
const PASSWORDSQL= process.env.PASSWORDSQL; 
const HOSTSQL = process.env.HOSTSQL;
const DATASQL = process.env.DATASQL;

//PRUEBA RECONOCIMIENTO DE VARIABLES
console.log('==============');
console.log(PORT);
console.log(PORTSQL);
console.log(USERSQL);
console.log(PASSWORDSQL);
console.log(HOSTSQL);
console.log(DATASQL);
console.log('==============');

//Conexión a la base de datos
const connection = mysql.createConnection({
    port: PORTSQL,
    host: HOSTSQL,
    user:USERSQL,
    password: PASSWORDSQL,
    database: DATASQL,
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Se conecto a mi base de datos ${DATASQL}`);
});


export default connection;