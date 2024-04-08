
const { Router } = require('express')

const {
    obtenerObservaciones,
    obtenerObservacion,
    crearObservacion,
    actualizarObservacion,
    eliminarObservacion
    } = require('../controllers/observacion')

const router = Router()

router.get('/', obtenerObservaciones)

router.get('/:id', obtenerObservacion)

router.post('/', crearObservacion)

router.put('/:id', actualizarObservacion)

//router.delete('/:id', eliminarObservacion)

module.exports = router

