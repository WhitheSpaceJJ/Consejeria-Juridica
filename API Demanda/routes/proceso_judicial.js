// Importamos el módulo de enrutamiento de Express
const { Router } = require('express')

// Importamos los controladores de los procesos judiciales
const {
  crearProcesoJudicial,
  obtenerProcesosJudiciales,
  obtenerProcesoJudicial,
  actualizarProcesoJudicial,
  eliminarProcesoJudicial,
  obtenerProcesosJudicialesPorDefensor,
  obtenerProcesosJudicialesPorTramite
  ,
} = require('../controllers/proceso_judicial')

// Creamos una nueva instancia de Router
const router = Router()
router.get('/tramite/', 
obtenerProcesosJudicialesPorTramite
)

// Definimos la ruta para crear un nuevo proceso judicial
router.post('/', 
 crearProcesoJudicial)

// Definimos la ruta para obtener todos los procesos judiciales
router.get('/', obtenerProcesosJudiciales)

// Definimos la ruta para obtener todos los procesos judiciales
router.get('/defensor/', obtenerProcesosJudicialesPorDefensor)


// Definimos la ruta para obtener un proceso judicial por su id
router.get('/:id',
 obtenerProcesoJudicial)


// Definimos la ruta para actualizar un proceso judicial por su id
router.put('/:id',
 actualizarProcesoJudicial)

// Definimos la ruta para eliminar un proceso judicial por su id
//router.delete('/:id',
 //eliminarProcesoJudicial)

// Exportamos el router
module.exports = router