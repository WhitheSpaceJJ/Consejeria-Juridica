// Importamos los módulos necesarios
const express = require('express');
const servicioGeneros = require('../servicios/servicioGenero');

//Importamos el middleware
const {
  existeGenero,
  validarJSONGeneroPOST,
  validarJSONGeneroPUT
} = require('../middlewares/middlewareGenero');


// Creamos un nuevo router
const router = express.Router();


router.route('/')
  // Obtener todos los géneros
  .get(servicioGeneros.obtenerGeneros)
  // Agregar un nuevo género
  .post(
    validarJSONGeneroPOST,
    servicioGeneros.agregarGenero);

router.route('/:id')
  // Obtener un género por su ID
  .get(servicioGeneros.obtenerGeneroPorId)
 
  // Actualizar un género por su ID
  .put(
    existeGenero,
    validarJSONGeneroPUT,
    servicioGeneros.actualizarGenero);


// Exportamos el router
module.exports = router;