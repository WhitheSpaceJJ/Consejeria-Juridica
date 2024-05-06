

const DomicilioParticipanteDAO = require('../data-access/domicilio_participanteDAO')
 
/**
 * Función que permite crear un domicilioParticipante
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el domicilioParticipante creado
 */
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

/** 
 * Función que permite obtener todos los domicilioParticipantes
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Array} Array con todos los domicilioParticipantes registrados
 * */


const obtenerDomicilioParticipantes = async (req, res) => {
    try {
        const domicilioParticipantes = await DomicilioParticipanteDAO.obtenerDomicilioParticipantes()
        if (domicilioParticipantes.length > 0) {
            res.json(domicilioParticipantes)
        }
        else {
            res.status(404).json({
                message: 'No se encontraron domicilioParticipantes'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


/** 
 * Función que permite obtener un domicilioParticipante por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el domicilioParticipante encontrado
 * */


const obtenerDomicilioParticipante = async (req, res) => {
    try {
        const { id } = req.params
        const domicilioParticipante = await DomicilioParticipanteDAO.obtenerDomicilioParticipante(Number(id))
        if (domicilioParticipante) {
            res.json(domicilioParticipante)
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

/**
 * Función que permite obtener un domicilioParticipante por su participante
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el domicilioParticipante encontrado
 * */


const obtenerDomicilioParticipantePorParticipante = async (req, res) => {
    try {
        const { id } = req.params
        const domicilioParticipante = await DomicilioParticipanteDAO.obtenerDomicilioParticipantePorParticipante(Number(id))
        if (domicilioParticipante) {
            res.json(domicilioParticipante)
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

/**
 * Función que permite actualizar un domicilioParticipante
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el domicilioParticipante actualizado
 */




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
 
/**  
 * Función que permite eliminar un domicilioParticipante
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con el mensaje de confirmación
 * */


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

// Exportamos los módulos

module.exports = {
    crearDomicilioParticipante,
    obtenerDomicilioParticipantes,
    obtenerDomicilioParticipante,
    obtenerDomicilioParticipantePorParticipante,
    actualizarDomicilioParticipante,
    eliminarDomicilioParticipante
}