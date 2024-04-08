// Constante que almacena el modulo de express
const express = require('express');
//Importar el servicio de municipios
const serviceMunicipios = require('../services/municipios.services.js');

//Crear una instancia de express
const router = express.Router();

//Definir las rutas de la API
// Ruta para obtener todos los municipios
router.get('/', serviceMunicipios.getMunicipios );
// Ruta para obtener un municipio por su id
router.get('/:id', serviceMunicipios.getMunicipio );


//  Exportar el modulo de rutas
module.exports = router;