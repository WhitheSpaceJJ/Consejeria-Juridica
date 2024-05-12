// Importamos los módulos necesarios
const express = require('express');
const servicioTiposDeJuicio = require('../servicios/servicioTiposJuicios');

const { validarJSONTipoJuicioPOST, validarJSONTipoJuicioPUT, existeTipoJuicio } = require('../middlewares/middlewareTipoJuicio');


// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los tipos de juicio
  .get(servicioTiposDeJuicio.obtenerTiposDeJuicio)
  // Agregar un nuevo tipo de juicio
  .post(
     validarJSONTipoJuicioPOST,
    servicioTiposDeJuicio.agregarTipoDeJuicio);

router.route('/:id')
  // Obtener un tipo de juicio por su ID
  .get(servicioTiposDeJuicio.obtenerTipoDeJuicioPorId)
  // Actualizar un tipo de juicio por su ID
  .put(
     existeTipoJuicio, validarJSONTipoJuicioPUT,
    servicioTiposDeJuicio.actualizarTipoDeJuicio);

// Exportamos el router
module.exports = router;
