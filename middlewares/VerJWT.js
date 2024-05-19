import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { request, response } from 'express';
dotenv.config();

const secreto = process.env.SECRETKEY;

const verificarToken = (req = request, res = response, next) => {
    
    //obtenemos el token del header
    const token = req.header('X-Auth-Token');

    console.log('==============================');
    console.log(token);
    console.log('==============================');


    //si no hay token
    if(!token){
        return res.render('error', {
            errores: 'No hay token',
            style: 'error.css'
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
            errores: 'Token no válido',
            style: 'error.css'
        });
    }
}

export default verificarToken;