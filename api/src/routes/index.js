const { Router } = require('express');
const DogsMiddlewares =require('./middlewares/Dogs.js');
const TempMiddlewares = require('./middlewares/Temperament.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
 router.use('/dogs' , DogsMiddlewares)
 router.use('/temperaments', TempMiddlewares)





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
