import express from 'express';
const router = express.Router();
//Middleware para verificar el token de admin
import verificarToken from '../middlewares/VerJWT.js';

import { paginaLogin,
    paginaIngreso,
    paginaRegistroAdmi,
    adminListar,
    eliminarAdmin,
    paginaListar,
    paginaBorrar,
    paginaActualizar,
    paginaActualizado,
    paginaRegistro
    } from '../controllers/loginController.js';

router.get('/', paginaLogin);

router.post('/ingreso',paginaIngreso);

router.post('/registrarAdmin' ,paginaRegistroAdmi);

router.get('/listarAdmin' ,adminListar);

router.post('/borrarAdmi' ,eliminarAdmin);

router.get('/listarContactos' ,paginaListar);

router.post('/borrar' , paginaBorrar);

router.get('/newAdmin' ,paginaRegistro);

router.post('/actualizar' ,paginaActualizar);

router.post('/actualizado' ,paginaActualizado);

export default router;