
const { Router } = require('express')
// Controlador de familiar que permite realizar la lógica de negocio para la tabla familiar
const {
    obtenerFamiliares,
    obtenerFamiliar,
    crearFamiliar,
    actualizarFamiliar,
    eliminarFamiliar,
    obtenerFamiliarPorPromovente
    } = require('../controllers/familiar')
 
// Se crea una instancia de Router
const router = Router()

// Ruta para obtener todos los familiares
router.get('/', obtenerFamiliares)

// Ruta para obtener un familiar por su id
router.get('/:id', obtenerFamiliar)

// Ruta para obtener un familiar por su id de promovente
//router.get('/promovente/:id', obtenerFamiliarPorPromovente)

// Ruta para crear un familiar
router.post('/', crearFamiliar)

// Ruta para actualizar un familiar por su id
router.put('/:id', actualizarFamiliar)

// Ruta para eliminar un familiar por su id
//router.delete('/:id', eliminarFamiliar)

module.exports = router
