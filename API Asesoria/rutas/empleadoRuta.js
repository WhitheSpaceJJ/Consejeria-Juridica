// Importamos los módulos necesarios
const express = require('express');
const servicioEmpleado = require('../servicios/servicioEmpleado');

// Creamos un nuevo router
const router = express.Router();


router.route('/')

    // Agregar un nuevo empleado
    .post(servicioEmpleado.agregarEmpleado);

router.route('/:id')

    // Actualizar un empleado por su ID
    .put(servicioEmpleado.actualizarEmpleado);  


// Exportamos el router
module.exports = router;