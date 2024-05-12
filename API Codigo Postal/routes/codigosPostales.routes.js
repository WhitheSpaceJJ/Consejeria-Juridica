//Constante que  representa el modulo express
const express = require('express');
//Importar el servicio de codigos postales
const serviceCodigosPostales = require('../services/codigosPostales.services');

//Crear una instancia de express
const router = express.Router();

// Ruta para obtener las colonias por codigo postal
router.get('/cp/:cp', serviceCodigosPostales.getColoniasByCodigoPostal);

//Exportar el modulo de rutas
module.exports = router;