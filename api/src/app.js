const express = require('express');
 const cors = require('cors');
 const cookieParser = require('cookie-parser');
 const bodyParser = require('body-parser');
 const morgan = require('morgan');
 const routes = require('./routes/index.js');
 require('./db.js');
 
 const server = express();

 
 // Habilitar CORS para solicitudes desde tu frontend
 server.use(cors({
   origin: 'https://proyecto-individual-dogs-nu.vercel.app', // Permitir solicitudes solo de tu frontend
   credentials: true, // Si estás usando cookies o headers especiales
 }));
 
 server.name = `API`;
 
 server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
 server.use(bodyParser.json({ limit: '50mb' }));
 server.use(cookieParser());
 server.use(morgan('dev'));
 server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'https://proyecto-individual-dogs-nu.vercel.app'); // update to match the domain you will make the request from
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
 });
 
 // Rutas
 server.use('/', routes);
 
 // Error catching endware.
 // Error catching endware
 server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
   const status = err.status || 500;
   const message = err.message || err;
   console.error(err);
   res.status(status).send(message);
 });
 
 module.exports = server;
