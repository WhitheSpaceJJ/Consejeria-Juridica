// Importamos los módulos necesarios
const express = require('express');
const servicioEmpleado = require('../servicios/servicioEmpleado');

// Creamos un nuevo router
const router = express.Router();

const { validarJSONEmpleadoPOST,
    validarJSONEmpleadoPUT,
    existeDistritoJudicial,
    existeEmpleado
 } = require('../middlewares/middlewareEmpleado');





router.route('/')
     /* .get(servicioEmpleado.obtenerEmpleados) */


    // Agregar un nuevo empleado
    .post(
          existeDistritoJudicial,
          validarJSONEmpleadoPOST,
        servicioEmpleado.agregarEmpleado);

router.route('/:id')
 /*    .get(existeEmpleado, 
        servicioEmpleado.obtenerEmpleadoPorId) */
    // Actualizar un empleado por su ID
    .put(
        existeEmpleado,
        existeDistritoJudicial,
        validarJSONEmpleadoPUT,
        servicioEmpleado.actualizarEmpleado);  


// Exportamos el router
module.exports = router;