
const { Router } = require('express')

// Controlador de observacion que permite realizar la lógica de negocio para la tabla observacion
const {
    obtenerObservaciones,
    obtenerObservacion,
    crearObservacion,
    actualizarObservacion,
    eliminarObservacion
    } = require('../controllers/observacion')

// Se crea una instancia de Router
const router = Router()

// Ruta para obtener todas las observaciones
router.get('/', obtenerObservaciones)

// Ruta para obtener una observacion por su id
router.get('/:id', obtenerObservacion)

// Ruta para crear una observacion
router.post('/', crearObservacion)

// Ruta para actualizar una observacion por su id
router.put('/:id', actualizarObservacion)

// Ruta para eliminar una observacion por su id
//router.delete('/:id', eliminarObservacion)

module.exports = router

