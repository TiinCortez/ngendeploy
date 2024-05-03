const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("node:path");
const hbs = require('hbs');
const contactosRoutes = require('./routes/contactosRoutes');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/contactos', contactosRoutes);

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

/*app.get('/contacto', (req,res) => {
    res.render('contacto', {
        style: 'contacto.css'
    });
});*/

//Notifica error al ingresar un url no identificado
app.get('/*', (req, res) => {
    res.render('error', {
        style: 'error.css'
    });
});

module.exports = app;
