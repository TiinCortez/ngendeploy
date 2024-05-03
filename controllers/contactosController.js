//Importamos la conexion a la base
const connection = require ('../models/config')

const paginaContacto =  (req,res)=>{
    res.render('contacto',{
        style:'contacto.css'
    });
}


//Cargar datos en la base
const paginaFormulario = (req,res) =>{
    //Agarro los elementos del body para la base y al tel lo paso a int:
    const nombreCompleto = req.body.nombreCompleto;
    const telefono = parseInt(req.body.telefono);
    const email = req.body.email;
    const mensaje = req.body.mensaje;

    /*Conjunto al json para la consulta
    const persona={
        nombreCompleto,
        email,
        mensaje
    } = req.body;
    */
    //Verificacion en consola de datos:
    //console.log (`Los datos ingresados son: ${persona.nombreCompleto}, ${persona.telefono},${persona.mensaje}`);
    //Verificacion de carga de datos con el post de json:
    /*    res.json({
            nombreCompleto: nombreCompleto,
            email: email,
            telefono: telefono,
            mensaje: mensaje,
        })
    */
    const sqlQuery = 'INSERT INTO PERSONA SET ?'
    const datosSql = {
        nombreCompleto: nombreCompleto,
        email: email,
        telefono: telefono,
        mensaje: mensaje,
    }
    //Ejecuto una consulta a la base de datos con el metodo query
    connection.query( sqlQuery, datosSql, (err,result) => {
        if (err) {
            console.log('Error al insertar los datos');
            console.log(err);
            res.send('Error al insertar los datos');
        } else{
            console.log('Datos insertados correctamente');
            res.redirect('/api/contactos');
        }
        })
    };


//Seleccionamos los datos desde la base
const paginaListar = (req, res) => {
    const sqlQuery = `SELECT * FROM PERSONA`

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al leer los datos');
            console.log(err);
            res.send('Error al leer los datos');
        } else {
            console.log('Lectura de datos correctas');
            console.log(result);
            res.render(
                'listarContactos',
            {
                style:'contacto.css',
                clientes: result
            })
        }
    });
}

const paginaBorrar = (req,res) => {
    const id = req.body.idPersona

    console.log(id);

    const sqlQuery = `DELETE FROM persona WHERE idPersona = ${id}`
    connection.query(sqlQuery,(err,result) =>{
        if (err){
            console.log('Error al eliminar el contacto');
            console.log(err);
            res.send('Error al eliminar el contacto')
        } else {
            console.log('Contacto eliminado con exito');
            console.log(`Contacto: ${id} eliminado`);
            console.log(result);
            res.redirect('/api/contactos/listar');
        }
    })
};

//funcion para actualizar contacto
const paginaActualizar = (req,res) =>{
    const id = req.body.idPersona;

    const sqlQuery = `SELECT * FROM PERSONA WHERE idPersona = ${id}`

    connection.query(sqlQuery,(err,result)=>{
        if (err){
            console.log('Error al buscar el ID seleccionado');
            console.log(err);
            res.send('Error al leer los datos');
        } else {
            console.log('Lectura de datos correctas');
            console.log(result[0]);
            res.render('editarContactos',{
                style:'contacto.css',
                persona: result[0]
            })
        }
})};

const paginaActualizado = (req,res) =>{
    const nombreCompleto = req.body.nombreCompleto;
    const email = req.body.email;
    const telefono = parseInt(req.body.telefono);
    const id = req.body.idPersona;

    console.log(nombreCompleto);
    console.log(email);
    console.log(telefono);
    console.log(id);

    const sqlQuery = `UPDATE PERSONA SET ? WHERE idPersona = ${id}`

    const datosSql ={
        nombreCompleto: nombreCompleto,
        email: email,
        telefono: telefono
    }

    connection.query(sqlQuery,datosSql, (err, result) => {
    if (err) {
        console.log('Error al insertar los datos');
        console.log(err);
        res.send('Error al insertar los datos');
    } else{
        console.log('Datos insertados correctamente');
        console.log(result);
        res.redirect('/api/contactos/listar')
    }
})
}


module.exports = {
    paginaContacto,
    paginaFormulario,
    paginaListar,
    paginaBorrar,
    paginaActualizar,
    paginaActualizado
}

//Las peticiones de Routers

//En caso de ser mas funciones crear Services