const express = require('express');
const router = express.Router();
const { paginaContacto, 
        paginaFormulario,
        paginaListar,
        paginaBorrar,
        paginaActualizar,
        paginaActualizado
        } = require('../controllers/contactosController');

router.get('/',paginaContacto);

router.get('/listar', paginaListar);

router.post('/formulario', paginaFormulario);

router.post('/borrar', paginaBorrar);

router.post('/actualizar', paginaActualizar);

router.post('/actualizado', paginaActualizado);



module.exports = router