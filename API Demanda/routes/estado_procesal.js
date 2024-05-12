// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los estados procesales
const {
  obtenerEstadoProcesal,
  crearEstadoProcesal,
  actualizarEstadoProcesal,
  obtenerEstadosProcesalesPorProcesoJudicial
} = require('../controllers/estado_procesal')

const { existeEstadoProcesal, validarJSONEstadoProcesalPOST, validarJSONEstadoProcesalPUT,
  existeProcesoJudicial 
} 
= require('../middlewares/middlewareEstadoProcesal')


// Creamos una nueva instancia de Router
const router = Router()

router.get('/proceso-judicial/:id',
 existeProcesoJudicial,
  obtenerEstadosProcesalesPorProcesoJudicial)

// Definimos la ruta para obtener un estado procesal por su id
router.get('/:id', 
 obtenerEstadoProcesal)

// Definimos la ruta para crear un nuevo estado procesal
router.post('/', 
 validarJSONEstadoProcesalPOST,
 existeProcesoJudicial,
crearEstadoProcesal)

// Definimos la ruta para actualizar un estado procesal por su id
router.put('/:id',
existeEstadoProcesal,
  validarJSONEstadoProcesalPUT,
  existeProcesoJudicial,
actualizarEstadoProcesal)



// Exportamos el router
module.exports = router