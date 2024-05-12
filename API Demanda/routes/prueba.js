

const { Router } = require('express')

// Controlador de prueba que permite realizar la lógica de negocio para la tabla prueba
const {
    obtenerPrueba,
    crearPrueba,
    actualizarPrueba,
    obtenerPruebasPorProcesoJudicial
    } = require('../controllers/prueba')

 const { existePrueba, validarJSONPruebaPOST, validarJSONPruebaPUT, 
    existeProcesoJudicial
  } 
    = require('../middlewares/middlewarePrueba')


// Se crea una instancia de Router
const router = Router()

router.get('/proceso-judicial/:id', 
existeProcesoJudicial,
obtenerPruebasPorProcesoJudicial)

// Ruta para obtener una prueba por su id
router.get('/:id', obtenerPrueba)

// Ruta para crear una prueba
router.post('/', 

validarJSONPruebaPOST,
existeProcesoJudicial,
crearPrueba)

// Ruta para actualizar una prueba por su id
router.put('/:id',
 existePrueba, 
validarJSONPruebaPUT,
existeProcesoJudicial,
actualizarPrueba)




module.exports = router