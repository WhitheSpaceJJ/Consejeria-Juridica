// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las ocupaciones
const {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
} = require('../controllers/ocupacion')


const { existeOcupacion, validarJSONOcupacionPOST, validarJSONOcupacionPUT } 
= require('../middlewares/middlewareOcupacion')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las ocupaciones
router.get('/', obtenerOcupaciones)

// Definimos la ruta para obtener una ocupación por su id
router.get('/:id',
obtenerOcupacion)

// Definimos la ruta para crear una nueva ocupación
router.post('/', 
validarJSONOcupacionPOST,
 crearOcupacion)

// Definimos la ruta para actualizar una ocupación por su id
router.put('/:id',
  existeOcupacion,
  validarJSONOcupacionPUT,
actualizarOcupacion)


// Exportamos el router
module.exports = router