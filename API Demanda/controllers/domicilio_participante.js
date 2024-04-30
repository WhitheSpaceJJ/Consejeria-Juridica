

const DomicilioParticipanteDAO = require('../data-access/domicilio_participanteDAO')


const crearDomicilioParticipante = async (req, res) => {

    try {
        const { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante } = req.body
        const domicilioParticipante = await DomicilioParticipanteDAO.crearDomicilioParticipante({
            calle_domicilio,
            numero_exterior_domicilio,
            numero_interior_domicilio,
            id_colonia,
            id_participante
        })
        res.json(domicilioParticipante)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const obtenerDomicilioParticipantes = async (req, res) => {
    try {
        const domicilioParticipantes = await DomicilioParticipanteDAO.obtenerDomicilioParticipantes()
        res.json(domicilioParticipantes)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const obtenerDomicilioParticipante = async (req, res) => {
    try {
        const { id } = req.params
        const domicilioParticipante = await DomicilioParticipanteDAO.obtenerDomicilioParticipante(Number(id))
        res.json(domicilioParticipante)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const obtenerDomicilioParticipantePorParticipante = async (req, res) => {
    try {
        const { id } = req.params
        const domicilioParticipante = await DomicilioParticipanteDAO.obtenerDomicilioParticipantePorParticipante(Number(id))
        res.json(domicilioParticipante)
    } catch (error) {
        res.status(500).json({
            message: error.message
                })
    }
}


const actualizarDomicilioParticipante = async (req, res) => {
    try {
        const { id } = req.params
        const { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante } = req.body
        const result= await DomicilioParticipanteDAO.actualizarDomicilioParticipante(Number(id), {
            calle_domicilio,
            numero_exterior_domicilio,
            numero_interior_domicilio,
            id_colonia,
            id_participante
        })
        console.log(result)
         if(result){
            res.status(200).json({
                message: 'DomicilioParticipante actualizado'
            })
        }
        else{
            res.status(404).json({
                message: 'DomicilioParticipante no actualizado,datos iguales'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



const eliminarDomicilioParticipante = async (req, res) => {
    try {
        const { id } = req.params
        const domicilioParticipante = await DomicilioParticipanteDAO.eliminarDomicilioParticipante(Number(id))
        if (domicilioParticipante) {
            res.status(200).json({
                message: 'DomicilioParticipante eliminado'
            })
        }
        else {
            res.status(404).json({
                message: 'DomicilioParticipante no encontrado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    crearDomicilioParticipante,
    obtenerDomicilioParticipantes,
    obtenerDomicilioParticipante,
    obtenerDomicilioParticipantePorParticipante,
    actualizarDomicilioParticipante,
    eliminarDomicilioParticipante
}