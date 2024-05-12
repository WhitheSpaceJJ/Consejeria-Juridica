// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de las escolaridades
const {
  obtenerEscolaridades,
  obtenerEscolaridad,
  crearEscolaridad,
  actualizarEscolaridad,
} = require('../controllers/escolaridad')

const { existeEscolaridad, validarJSONEscolaridadPOST, validarJSONEscolaridadPUT }
 = require('../middlewares/middlewareEscolaridad')

// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todas las escolaridades
router.get('/', obtenerEscolaridades)

// Definimos la ruta para obtener una escolaridad por su id
router.get('/:id', 
 obtenerEscolaridad)

// Definimos la ruta para crear una nueva escolaridad
router.post('/', 
 validarJSONEscolaridadPOST,
crearEscolaridad)

// Definimos la ruta para actualizar una escolaridad por su id
router.put('/:id',
  existeEscolaridad,
  validarJSONEscolaridadPUT,
actualizarEscolaridad)



// Exportamos el router
module.exports = router