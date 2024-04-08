

const { Router } = require('express')

const {
    obtenerPruebas,
    obtenerPrueba,
    crearPrueba,
    actualizarPrueba,
    eliminarPrueba
    } = require('../controllers/prueba')


const router = Router()

router.get('/', obtenerPruebas)

router.get('/:id', obtenerPrueba)

router.post('/', crearPrueba)

router.put('/:id', actualizarPrueba)

//router.delete('/:id', eliminarPrueba)


module.exports = router