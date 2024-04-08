
const { Router } = require('express')

const {
    obtenerFamiliares,
    obtenerFamiliar,
    crearFamiliar,
    actualizarFamiliar,
    eliminarFamiliar,
    obtenerFamiliarPorPromovente
    } = require('../controllers/familiar')

const router = Router()

router.get('/', obtenerFamiliares)

router.get('/:id', obtenerFamiliar)

//router.get('/promovente/:id', obtenerFamiliarPorPromovente)

router.post('/', crearFamiliar)

router.put('/:id', actualizarFamiliar)

//router.delete('/:id', eliminarFamiliar)

module.exports = router
