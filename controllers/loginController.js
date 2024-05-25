import connection from '../models/config.js';
//Import de encriptador de password
import bcrypt from 'bcrypt';
//Import del token
import generarJWT from '../middlewares/GenJWT.js';

const paginaLogin =  (req,res)=>{
    res.render('login',{
        style:'newAdmin.css'
    });
}

const paginaRegistro = (req,res) => {
    res.render('newAdmin',{
        style:'newAdmin.css'
    });
}

//Cargar datos en la base
const paginaIngreso = async (req, res) => {
    const user = req.body.user;
    const contrasena = req.body.contrasena;

    // Verificar si hay algún usuario en la base de datos
    const sqlCheckExistenceQuery = `SELECT * FROM admiUsuarios`;

    connection.query(sqlCheckExistenceQuery, (checkExistenceErr, checkExistenceResults) => {
        if (checkExistenceErr) {
            console.error("Error al verificar datos existentes:", checkExistenceErr);
            return res.status(500).json({ error: "Error del servidor" });
        }

        // Si no hay registros en la base de datos, redirigir a la página de nuevo administrador
        if (checkExistenceResults.length === 0) {
            return res.render('newAdmin', { style: 'newAdmin.css' });
        }

        // Query para seleccionar el usuario por nombre de usuario
        const sqlQuery = `SELECT * FROM admiUsuarios WHERE usuario = ?`;

        // Ejecutar la consulta SQL para buscar el usuario por nombre de usuario
        connection.query(sqlQuery, [user], async (err, result) => {
            if (err) {
                // Si hay un error en la consulta, manejarlo adecuadamente
                console.error("Error al consultar la base de datos:", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }

            // Si no se encuentra ningún usuario con el nombre de usuario
            if (result.length === 0) {
                console.error("Usuario no encontrado en la base de datos");
                const error = "Usuario no encontrado";
                return res.render(
                    'login',
                   {
                    style:'newAdmin.css',
                    error: error
                   })
            }

            // Si se encuentra el usuario, validar la contraseña
            const usuario = result[0]; // Primer usuario encontrado
            try {
                const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
                if (!contrasenaValida) {
                    // La contraseña no coincide
                    console.error("Contraseña incorrecta para el usuario:", user);
                    const error = "Contraseña incorrecta";
                    return res.render(
                        'login',
                       {
                        style:'newAdmin.css',
                        error: error
                       })
                }

                // Actualizar el último acceso del usuario
                const sqlUpdateQuery = `UPDATE admiUsuarios SET ultimo_acceso = CURRENT_TIMESTAMP() WHERE usuario = ?`;
                connection.query(sqlUpdateQuery, [user], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error("Error al actualizar el último acceso:", updateErr);
                        return res.status(500).json({ error: "Error interno del servidor" });
                    }
                    console.log("Último acceso actualizado correctamente");
                });

                // Generar el token para el usuario
                const token = await generarJWT(user);
                res.header('x-auth-token', token);
                // Las credenciales son correctas
                console.log('Inicio de sesión exitoso');
                console.log(token)
                res.render(
                    'dashboardAdmin',
                {
                    token: token,
                    user:user
                })
            } catch (error) {
                console.error("Error al comparar contraseñas:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    });
};

const paginaRegistroAdmi = async (req, res) => {
    try {
        // Agarrar los elementos del body
        const user = req.body.user;
        const contrasena = req.body.contrasena;
        const email = req.body.email;

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        console.log("Contraseña encriptada:", contrasenaEncriptada);

        // Consulta SQL para verificar si el usuario o el email ya están registrados
        const sqlCheckQuery = `SELECT * FROM admiUsuarios WHERE usuario = ? OR email = ?`;
        
        // Ejecutar la consulta SQL para buscar coincidencias
        connection.query(sqlCheckQuery, [user, email], (checkErr, checkResults) => {
            if (checkErr) {
                // Manejar errores si ocurren durante la consulta de verificación
                console.error("Error al verificar usuario/email existente:", checkErr);
                return res.status(500).send("Error interno del servidor");
            }

            // Verificar si hay algún usuario o email ya registrado
            if (checkResults.length > 0) {
                // Si se encontraron coincidencias, enviar un mensaje de error
                console.error("Usuario o email ya registrado");
                return res.status(400).send("Usuario o email ya registrado");
            }

            // Si no hay coincidencias, proceder con la inserción
            // Consulta SQL para insertar los datos en la tabla
            const sqlInsertQuery = `INSERT INTO admiUsuarios (usuario, contrasena, email) VALUES (?, ?, ?)`;

            // Valores a insertar en la consulta
            connection.query(sqlInsertQuery, [user, contrasenaEncriptada, email], (Err, results) => {
                if (Err) {
                    // Manejar errores si ocurren durante la inserción
                    console.error("Error al insertar datos:", Err);
                    return res.status(500).send("Error interno del servidor");
                }
                
                // Datos insertados correctamente
                console.log("Datos insertados correctamente:", results);
                return res.render(
                         'login',
                        {
                         style:'newAdmin.css',
                        })
            });
        });
    } catch (error) {
        // Capturar y manejar cualquier error que ocurra durante el proceso
        console.error("Error al encriptar la contraseña o verificar usuario/email existente:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const adminListar = async (req, res) => {
    const sqlQuery = `SELECT * FROM admiusuarios`

    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al leer los datos');
            console.log(err);
            res.send('Error al leer los datos');
        } else {
            console.log('Lectura de datos correctas');
            console.log(result);
            res.render(
                'listarAdministradores',
            {
                style:'contacto.css',
                administradores: result,
            })
        }
    });
}

const eliminarAdmin = (req, res) => {
    const id = req.body.idAdmin;

    console.log(id);

    const sqlQuery = `DELETE FROM admiUsuarios WHERE idUsuario = ${id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.log('Error al eliminar el contacto');
            console.log(err);
            res.send('Error al eliminar el contacto');
        } else {
            if (result.affectedRows === 0) {
                console.error("No se encontró ningún usuario con ese ID");
                res.redirect('/api/login/listarAdmin');
            } else {
                console.log('Contacto eliminado con éxito');
                console.log(`Administrador: ${id} eliminado`);
                console.log(result);
                res.redirect('/api/login/listarAdmin');
            }
        }
    });
};

//==================== CONTACTOS ====================
//Seleccionamos los datos desde la base
const paginaListar = (req, res) => {
    const sqlQuery = `SELECT * FROM persona`

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
                clientes: result,
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
            res.redirect('/api/login/listarContactos');
        }
    })
};

//funcion para actualizar contacto
const paginaActualizar = (req,res) =>{
    const id = req.body.idPersona;

    const sqlQuery = `SELECT * FROM persona WHERE idPersona = ${id}`

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

    const sqlQuery = `UPDATE persona SET ? WHERE idPersona = ${id}`

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
        res.redirect('/api/login/listarContactos')
    }
})
}

export{
    paginaLogin,
    paginaRegistroAdmi,
    paginaIngreso,
    adminListar,
    eliminarAdmin,
    paginaListar,
    paginaBorrar,
    paginaActualizar,
    paginaActualizado,
    paginaRegistro
}
