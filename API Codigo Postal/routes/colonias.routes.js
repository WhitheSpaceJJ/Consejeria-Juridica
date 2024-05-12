//Constante que representa el modulo express
const   express = require('express');
//Importar el servicio de colonias
const   servicesColonias = require('../services/colonias.services');

//Crear una instancia de express
const router = express.Router();

// Ruta para obtener una colonia por su id
router.get ('/:id', servicesColonias.getColonia);

//Exportar el modulo de rutas
module.exports = router;