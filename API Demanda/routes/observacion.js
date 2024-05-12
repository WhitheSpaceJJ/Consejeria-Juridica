
const { Router } = require('express')

// Controlador de observacion que permite realizar la lógica de negocio para la tabla observacion
const {
    obtenerObservacion,
    crearObservacion,
    actualizarObservacion,
    obtenerObservacionesPorProcesoJudicial
    } = require('../controllers/observacion')

const { existeObservacion, validarJSONObservacionPOST, validarJSONObservacionPUT 
 , existeProcesoJudicial

} 
= require('../middlewares/middlewareObservacion')
const e = require('express')

// Se crea una instancia de Router
const router = Router()
// Ruta para obtener todas las observaciones de un proceso judicial por su id
router.get('/proceso-judicial/:id', 
 existeProcesoJudicial,
obtenerObservacionesPorProcesoJudicial)


// Ruta para obtener una observacion por su id
router.get('/:id', obtenerObservacion)

// Ruta para crear una observacion
router.post('/', 
validarJSONObservacionPOST,
existeProcesoJudicial,
crearObservacion)

// Ruta para actualizar una observacion por su id
router.put('/:id', 
existeObservacion,
validarJSONObservacionPUT,
existeProcesoJudicial,
actualizarObservacion)


module.exports = router

