import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { request, response } from 'express';
//llave secreta de la app
const secreto = process.env.SECRETKEY;

const verificarToken = (req = request, res = response, next) => {
    //obtenemos el token del header
    const token = req.cookies['x-access-token'];
    console.log('==============================');
    console.log('Token:', token);
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
};

export default verificarToken;



/* 
window.localStorage.setItem('token',JSON.stringify(token));

window.localstorageGetItem('token') --> +Condicion de peticion y comparacion con el */