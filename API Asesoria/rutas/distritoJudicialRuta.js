// Importamos los módulos necesarios
const express = require('express');
const servicioDistritosJudiciales = require('../servicios/servicioDistritoJudicial');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
    // Obtener todos los distritos judiciales
    .get(servicioDistritosJudiciales.obtenerDistritosJudiciales)


router.route('/:id')
    // Obtener un distrito judicial por su ID
    .get(servicioDistritosJudiciales.obtenerDistritoJudicial)



// Exportamos el router
module.exports = router;