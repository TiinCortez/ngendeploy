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