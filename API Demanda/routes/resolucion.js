

const { Router } = require('express')

const {

    obtenerResolucion,
    obtenerResoluciones,
    crearResolucion,
    actualizarResolucion,
    eliminarResolucion,
    
    } = require('../controllers/resolucion')


const router = Router()

router.get('/', obtenerResoluciones)

router.get('/:id', obtenerResolucion)

router.post('/', crearResolucion)

router.put('/:id', actualizarResolucion)

//router.delete('/:id', eliminarResolucion)

module.exports = router
