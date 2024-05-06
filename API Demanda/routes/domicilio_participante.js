
const { Router } = require('express')
 
// Controlador de domicilio_participante que permite realizar la lógica de negocio para la tabla domicilio_participante
const {
    obtenerDomicilioParticipante,
    obtenerDomicilioParticipantePorParticipante,
    actualizarDomicilioParticipante,
    eliminarDomicilioParticipante, 
    obtenerDomicilioParticipantes,
    crearDomicilioParticipante
    } = require('../controllers/domicilio_participante')

// Se crea una instancia de Router

const router = Router()


// Ruta para obtener un domicilio_participante por su id
router.get('/:id', obtenerDomicilioParticipante)

//  Ruta para obtener todos los domicilios de los participantes
router.get('/', obtenerDomicilioParticipantes)

// Ruta para crear un domicilio_participante
router.post('/', crearDomicilioParticipante)

// Ruta para obtener un domicilio_participante por su id de participante
//router.get('/participante/:id', obtenerDomicilioParticipantePorParticipante)

// Ruta para actualizar un domicilio_participante por su id
router.put('/:id', actualizarDomicilioParticipante)

// Ruta para eliminar un domicilio_participante por su id
//router.delete('/:id', eliminarDomicilioParticipante)

module.exports = router
