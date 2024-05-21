import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { request, response } from 'express';
//llave secreta de la app
const secreto = process.env.SECRETKEY;

const verificarToken = (req = request, res = response, next) => {
    //obtenemos el token del header
    const token = req.header('tk-seg');

    console.log('==============================');
    console.log(token);
    console.log('==============================');


    //si no hay token
    if(!token){
        return res.render('error', {
            errores: 'No hay token'
        });
    }

    try {
        //verificamos el token
        const payload = jwt.verify(token, secreto);

        //si el token es válido
        req.user = payload.user;
        
        next();

    } catch (error) {
        console.log(error);
        res.render('error', {
            errores: 'Token no válido'
        });
    }
}

export default verificarToken;