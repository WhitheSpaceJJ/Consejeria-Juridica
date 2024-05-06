

const { Router } = require('express')

// Controlador de resolucion que permite realizar la lógica de negocio para la tabla resolucion
const {

    obtenerResolucion,
    obtenerResoluciones,
    crearResolucion,
    actualizarResolucion,
    eliminarResolucion,
    
    } = require('../controllers/resolucion')


    // Se crea una instancia de Router
    const router = Router()

// Ruta para obtener todas las resoluciones
router.get('/', obtenerResoluciones)

// Ruta para obtener una resolucion por su id
router.get('/:id', obtenerResolucion)

// Ruta para crear una resolucion
router.post('/', crearResolucion)

// Ruta para actualizar una resolucion por su id
router.put('/:id', actualizarResolucion)

// Ruta para eliminar una resolucion por su id
//router.delete('/:id', eliminarResolucion)

module.exports = router
