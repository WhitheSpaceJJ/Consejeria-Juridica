

const { Router } = require('express')

// Controlador de resolucion que permite realizar la lógica de negocio para la tabla resolucion
const {

    obtenerResolucion,
    crearResolucion,
    actualizarResolucion,
     obtenerResolucionesPorProcesoJudicial
    } = require('../controllers/resolucion')

    const { existeResolucion, validarJSONResolucionPOST, validarJSONResolucionPUT,
        existeProcesoJudicial
     }
    = require('../middlewares/middlewareResolucion')
const e = require('express')

    // Se crea una instancia de Router
    const router = Router()

// Ruta para obtener todas las resoluciones
router.get('/proceso-judicial/:id',
 existeProcesoJudicial,
obtenerResolucionesPorProcesoJudicial)

// Ruta para obtener una resolucion por su id
router.get('/:id', obtenerResolucion)

// Ruta para crear una resolucion
router.post('/', 
validarJSONResolucionPOST,
existeProcesoJudicial,
crearResolucion)

// Ruta para actualizar una resolucion por su id
router.put('/:id',
existeResolucion,
validarJSONResolucionPUT,
existeProcesoJudicial,
actualizarResolucion)


module.exports = router
