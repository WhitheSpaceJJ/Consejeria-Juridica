



const observacionDAO = require('../data-access/observacionDAO')

/**
 * Función que permite crear una observacion
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la observacion creada
 * */


const crearObservacion = async (req, res) => {
    try {
        const { id_proceso_judicial, observacion } = req.body
        const observacion_creada = await observacionDAO.crearObservacion({
            id_proceso_judicial,
            observacion
        })
        res.status(200).json(observacion_creada)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite obtener todas las observaciones
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Array} Array con todas las observaciones registradas
 * */


const obtenerObservaciones = async (req, res) => {
    try {
        const observaciones = await observacionDAO.obtenerObservaciones()
        if (observaciones !== null && observaciones !== undefined && observaciones.length > 0) {
            res.status(200).json(observaciones)
        }
        else {
            res.status(404).json({
                message: 'No hay observaciones registradas'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite obtener una observacion por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la observacion encontrada
 * */


const obtenerObservacion = async (req, res) => {
    try {
        const { id } = req.params
        const observacion = await observacionDAO.obtenerObservacion(Number(id))
        if (observacion === null || observacion === undefined) {
            res.status(404).json({
                message: 'Observacion no encontrada'
            })
        }
        else {
            res.status(200).json(observacion)
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite actualizar una observacion
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la observacion actualizada
 * */




const actualizarObservacion = async (req, res) => {
    try {
        const { id } = req.params
        const { observacion, id_proceso_judicial } = req.body
        const result = await observacionDAO.actualizarObservacion(Number(id), {
            observacion, id_proceso_judicial
        })
        if (result) {
            res.status(200).json({
                message: 'Observacion actualizada'
            })
        }
        else {
            res.status(404).json({
                message: 'Observacion no actualizada,datos iguales'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite eliminar una observacion
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la observacion eliminada
 * */




const eliminarObservacion = async (req, res) => {
    try {
        const { id } = req.params
        const observacion = await observacionDAO.eliminarObservacion(Number(id))
        if (observacion) {
            res.status(200).json({
                message: 'Observacion eliminada'
            })
        }
        else {
            res.status(404).json({
                message: 'Observacion no encontrada'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



// Exportación de funciones



module.exports = {

    crearObservacion,
    obtenerObservaciones,
    obtenerObservacion,
    actualizarObservacion,
    eliminarObservacion
}

