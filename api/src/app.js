const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require('./db.js');

const app = express();

app.use(cors({
  origin: 'https://proyecto-individual-dogs-nu.vercel.app', // Permitir solicitudes solo desde tu frontend
  credentials: true, // Permitir cookies si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Headers permitidos
}));

// Tu otra configuración de middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', routes);

// Manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
