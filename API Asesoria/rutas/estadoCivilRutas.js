// Importamos los módulos necesarios
const express = require('express');
const servicioEstados = require('../servicios/servicioEstadosCiviles');

const { validarJSONEstadoCivilPOST, validarJSONEstadoCivilPUT, existeEstadoCivil } = require('../middlewares/middlewareEstadoCivil');

// Creamos un nuevo router
const router = express.Router();

router.route('/')
  // Obtener todos los estados civiles
  .get(servicioEstados.obtenerEstadosCiviles)
  // Agregar un nuevo estado civil
  .post(
    validarJSONEstadoCivilPOST,
    servicioEstados.agregarEstadoCivil);

router.route('/:id')
  // Obtener un estado civil por su ID
  .get(servicioEstados.obtenerEstadoCivilPorId)

  // Actualizar un estado civil por su ID
  .put(
    existeEstadoCivil, validarJSONEstadoCivilPUT,
    servicioEstados.actualizarEstadoCivil);

// Exportamos el router
module.exports = router;