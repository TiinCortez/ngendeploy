import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import hbs from 'hbs';
import contactosRoutes from './routes/contactosRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import cookieParser from 'cookie-parser';

const app = express(); //Variable local

app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, 'views')); ES5
app.set('views','views');
//hbs.registerPartials(path.join(__dirname, 'views/partials')); ES5
hbs.registerPartials('views/partials');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '/public'))); ES5
app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/contactos', contactosRoutes);

app.use('/api/login', loginRoutes);

app.get('/listarAdministradores', (req,res) => {
    res.render('listarAdministradores', {
        style: 'contacto.css'
    });
});

app.get('/', (req,res) => {
    res.render('index', {
        style: 'index.css'
    });
});

app.get('/nuestraEmpresa', (req,res) => {
    res.render('nuestraEmpresa', {
        style: 'nuestraEmpresa.css'
    });
});

app.get('/servicios', (req,res) => {
    res.render('servicios', {
        style: 'servicios.css'
    });
});

app.get('/proyectos', (req,res) => {
    res.render('proyectos', {
        style: 'proyectos.css'
    });
});

app.get('/clientes', (req,res) => {
    res.render('clientes', {
        style: 'clientes.css'
    });
});

//Notifica error al ingresar un url no identificado
app.get('/*', (req, res) => {
    res.render('error', {
        style: 'error.css'
    });
});

app.get('/api/*', (req, res) => {
    res.render('error', {
        style: 'error.css'
    });
});

app.get('/api/*', (req, res) => {
    res.render('error', { 
        style: 'error.css'
    });
});

export default app