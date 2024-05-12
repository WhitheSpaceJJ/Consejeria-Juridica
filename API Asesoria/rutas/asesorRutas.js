
// Importamos los módulos necesarios
const express = require('express');
const servicioAsesor = require('../servicios/servicioAsesores');

// Creamos un nuevo router
const router = express.Router();

/** Operaciones Básicas */

// Definimos las rutas y sus manejadores de solicitudes
router.route('/')
// Obtener todos los asesores
.get(servicioAsesor.obtenerAsesores);

router.route('/zona/:id')
.get(servicioAsesor.obtenerAsesoresZona);

router.route('/:id')
// Obtener un asesor por su ID
.get(servicioAsesor.obtenerAsesorPorId)


// Exportamos el router
module.exports = router;


