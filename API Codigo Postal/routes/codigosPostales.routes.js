//Constante que  representa el modulo express
const express = require('express');
//Importar el servicio de codigos postales
const serviceCodigosPostales = require('../services/codigosPostales.services');

//Crear una instancia de express
const router = express.Router();


//Definir las rutas de la API
// Ruta para obtener todos los codigos postales
router.get('/', serviceCodigosPostales.getCodigosPostales);
// Ruta para obtener un codigo postal por su id
router.get('/:id', serviceCodigosPostales.getCodigoPostal);
// Ruta para obtener las colonias por codigo postal
router.get('/cp/:cp', serviceCodigosPostales.getColoniasByCodigoPostal);

//Exportar el modulo de rutas
module.exports = router;