// Importamos los módulos necesarios
const express = require('express');
const servicioMotivos = require('../servicios/servicioMotivos');

const { validarJSONMotivoPOST, validarJSONMotivoPUT, existeMotivo } = require('../middlewares/middlewareMotivo');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los motivos
  .get(servicioMotivos.obtenerMotivos)
  // Agregar un nuevo motivo
  .post(
     validarJSONMotivoPOST,     
    servicioMotivos.agregarMotivo);

router.route('/:id')
  // Obtener un motivo por su ID
  .get(servicioMotivos.obtenerMotivoPorId)

  // Actualizar un motivo por su ID
  .put(
    existeMotivo, validarJSONMotivoPUT,
    servicioMotivos.actualizarMotivo);

// Exportamos el router
module.exports = router;