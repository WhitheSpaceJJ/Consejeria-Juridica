

const { Router } = require('express')

// Controlador de prueba que permite realizar la lógica de negocio para la tabla prueba
const {
    obtenerPruebas,
    obtenerPrueba,
    crearPrueba,
    actualizarPrueba,
    eliminarPrueba
    } = require('../controllers/prueba')


// Se crea una instancia de Router
const router = Router()


// Ruta para obtener todas las pruebas
router.get('/', obtenerPruebas)

// Ruta para obtener una prueba por su id
router.get('/:id', obtenerPrueba)

// Ruta para crear una prueba
router.post('/', crearPrueba)

// Ruta para actualizar una prueba por su id
router.put('/:id', actualizarPrueba)

// Ruta para eliminar una prueba por su id
//router.delete('/:id', eliminarPrueba)


module.exports = router