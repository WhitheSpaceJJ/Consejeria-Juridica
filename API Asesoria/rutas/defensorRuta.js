// Importamos los módulos necesarios
const express = require('express');
const servicioDefensor= require('../servicios/servicioDefensor');

// Creamos un nuevo router
const router = express.Router();


const validarPermisos = require("../utilidades/validadorPermisos");


router.route('/')
    // Obtener todos los defensores
    .get(
        validarPermisos(["AD_EMPLEADOS_SA","ALL_SA",
        "REGISTRO_ASESORIA_SA","TURNAR_ASESORIA_SA","REGISTRO_PROCESO_JUDICIAL_SD",
        "SEGUIMIENTO_PROCESO_JUDICIAL_SD","AD_USUARIOS_SA","ALL_SD","CONSULTA_PROCESO_JUDICIAL_SD"]),
         servicioDefensor.obtenerDefensores)
  

    router.route('/zona/:id').get(
        validarPermisos(["AD_EMPLEADOS_SA","ALL_SA","CONSULTA_ASESORIA_SA"]),
        servicioDefensor.obtenerDefensoresZona);

router.route('/:id')
    // Obtener un defensor por su ID
    .get(
        validarPermisos( ["AD_EMPLEADOS_SA","ALL_SA","AD_USUARIOS_SA"]),
        servicioDefensor.obtenerDefensorPorId)
 


// Exportamos el router
module.exports = router;