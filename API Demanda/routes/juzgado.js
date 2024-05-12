// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los juzgados
const {
  obtenerJuzgados,
  obtenerJuzgado,
  crearJuzgado,
  actualizarJuzgado,
} = require('../controllers/juzgado')

 
const { existeJuzgado, validarJSONJuzgadoPOST, validarJSONJuzgadoPUT }
  = require('../middlewares/middlewareJuzgado')


// Creamos una nueva instancia de Router
const router = Router()

// Definimos la ruta para obtener todos los juzgados
router.get('/', obtenerJuzgados)

// Definimos la ruta para obtener un juzgado por su id
router.get('/:id', 
 obtenerJuzgado)

// Definimos la ruta para crear un nuevo juzgado
router.post('/', 
validarJSONJuzgadoPOST,
crearJuzgado)

// Definimos la ruta para actualizar un juzgado por su id
router.put('/:id',
  existeJuzgado,
  validarJSONJuzgadoPUT,
actualizarJuzgado)


// Exportamos el router
module.exports = router