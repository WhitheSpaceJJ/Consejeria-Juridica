// Importamos los módulos necesarios
const express = require('express');
const servicioDefensor= require('../servicios/servicioDefensor');

// Creamos un nuevo router
const router = express.Router();


router.route('/')
    // Obtener todos los defensores
    .get(servicioDefensor.obtenerDefensores)
  

    router.route('/zona/:id').get(servicioDefensor.obtenerDefensoresZona);

router.route('/:id')
    // Obtener un defensor por su ID
    .get(servicioDefensor.obtenerDefensorPorId)
 


// Exportamos el router
module.exports = router;