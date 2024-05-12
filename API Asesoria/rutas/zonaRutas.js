// Importamos los módulos necesarios
const express = require('express');
const servicioZonas = require('../servicios/servicioZonas');


// Creamos un nuevo router
const router = express.Router();


router.route('/')
  // Obtener todas las zonas
  .get(servicioZonas.obtenerZonas)

router.route('/:id')
  // Obtener una zona por su ID
  .get(servicioZonas.obtenerZonaPorId)

// Exportamos el router
module.exports = router;