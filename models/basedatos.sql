-- Comentarios para consultas en SQL --
-- Creamos una base de datos --
create database ngen_contactos;

-- Seleccionamos la base de datos con la que vamos a laburar --
use ngen_contactos;

create table Persona(
nombre varchar(120),
apellido varchar(100),
telefono int,
email varchar(80),
comentario varchar(300)
);


CREATE TABLE admiUsuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario VARCHAR(255) NOT NULL,
contraseña VARCHAR(255) NOT NULL,
fecha_de_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultimo_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);