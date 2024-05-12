
const { Router } = require('express')
// Controlador de familiar que permite realizar la lógica de negocio para la tabla familiar
const {
    obtenerFamiliar,
    crearFamiliar,
    actualizarFamiliar,
    obtenerFamiliaresPorPromovente
    } = require('../controllers/familiar')
 
const { existeFamiliar, validarJSONFamiliarPOST, validarJSONFamiliarPUT,
    existePromovente
 }
= require('../middlewares/middlewareFamiliar')

// Se crea una instancia de Router
const router = Router()

router.get('/promovente/:id', 
existePromovente,
obtenerFamiliaresPorPromovente)

// Ruta para obtener un familiar por su id
router.get('/:id', obtenerFamiliar)

// Ruta para crear un familiar
router.post('/', 
validarJSONFamiliarPOST,
crearFamiliar)

// Ruta para actualizar un familiar por su id
router.put('/:id', 
existeFamiliar,
validarJSONFamiliarPUT,
actualizarFamiliar)



module.exports = router
