import express from 'express';
import verificarJWT from '../middlewares/VerJWT.js';

const router = express.Router();
import { paginaContacto, 
        paginaFormulario
        } from '../controllers/contactosController.js';
        
router.get('/',paginaContacto);

router.post('/formulario',paginaFormulario);

export default router;