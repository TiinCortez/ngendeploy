import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secreto = process.env.SECRETKEY;

const generarJWT = (user) => {

    return new Promise((resolve, reject) => {
        
        const payload = { user };

        jwt.sign(payload, secreto, {
            expiresIn: '4h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}


export default generarJWT;