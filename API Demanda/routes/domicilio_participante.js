
const { Router } = require('express')

const {
    obtenerDomicilioParticipante,
    obtenerDomicilioParticipantePorParticipante,
    actualizarDomicilioParticipante,
    eliminarDomicilioParticipante, 
    obtenerDomicilioParticipantes,
    crearDomicilioParticipante
    } = require('../controllers/domicilio_participante')

const router = Router()

router.get('/:id', obtenerDomicilioParticipante)

router.get('/', obtenerDomicilioParticipantes)

router.post('/', crearDomicilioParticipante)

//router.get('/participante/:id', obtenerDomicilioParticipantePorParticipante)

router.put('/:id', actualizarDomicilioParticipante)

//router.delete('/:id', eliminarDomicilioParticipante)

module.exports = router
