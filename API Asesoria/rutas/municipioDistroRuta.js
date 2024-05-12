// Importamos los módulos necesarios
const express = require('express');
const servicioMunicipiosDistro = require('../servicios/servicioMunicipioDistro');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
    // Obtener todos los municipios
    .get(servicioMunicipiosDistro.obtenerMunicipios)
    // Obtener todos los municipios por distrito
    router.route('/distrito/:id')
    .get(servicioMunicipiosDistro.obtenerMunicipiosDistrito)


router.route('/:id')
    // Obtener un municipio por su ID
    .get(servicioMunicipiosDistro.obtenerMunicipioPorId)

// Exportamos el router
module.exports = router;