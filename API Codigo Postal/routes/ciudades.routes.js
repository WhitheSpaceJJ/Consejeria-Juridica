// Esta es la ruta de la API para las ciudades
const express = require('express');
//Importar el servicio de ciudades
const servicesCiudades = require('../services/ciudades.services');

//Crear una instancia de express

const router = express.Router();

// Definir las rutas de la API
// Ruta para obtener todas las ciudades
router.get ('/', servicesCiudades.getCiudades);
// Ruta para obtener una ciudad por su id
router.get ('/:id', servicesCiudades.getCiudad);

//Exportar el modulo de rutas
module.exports = router;