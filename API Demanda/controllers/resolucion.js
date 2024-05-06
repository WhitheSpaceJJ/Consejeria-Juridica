

const ResolucionDAO = require('../data-access/resolucionDAO')

/** 
 * Función que permite crear una resolucion
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la resolucion creada
 * */

const crearResolucion = async (req, res) => {
    try {
        const { id_proceso_judicial, resolucion, fecha_resolucion } = req.body
        const resolucionCreado = await ResolucionDAO.crearResolucion({
            id_proceso_judicial,
            resolucion,
            fecha_resolucion
        })
        res.status(201).json(resolucionCreado)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite obtener todas las resoluciones
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Array} Array con todas las resoluciones registradas
 * */

const obtenerResoluciones = async (req, res) => {
    try {
        const resoluciones = await ResolucionDAO.obtenerResoluciones()
        if (resoluciones !== null && resoluciones !== undefined && resoluciones.length > 0) {
            res.status(200).json(resoluciones)
        } else {
            res.status(404).json({
                message: 'No hay resoluciones registradas'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite obtener una resolucion por su id
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la resolucion encontrada
 * */

const obtenerResolucion = async (req, res) => {
    try {
        const { id } = req.params
        const resolucion = await ResolucionDAO.obtenerResolucion(Number(id))
        if (resolucion === null || resolucion === undefined) {
            res.status(404).json({
                message: 'Resolucion no encontrada'
            })
        } else {
            res.status(200).json(resolucion)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite actualizar una resolucion
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la resolucion actualizada
 * */

const actualizarResolucion = async (req, res) => {
    try {
        const { id } = req.params
        const { resolucion, fecha_resolucion } = req.body
        const result = await ResolucionDAO.actualizarResolucion(Number(id), {
            resolucion,
            fecha_resolucion
        })
        if (result) {
            const actualizado = await ResolucionDAO.obtenerResolucion(Number(id))
            res.status(201).json(actualizado)
        } else {
            res.status(500).json({
                message: 'Error al realizar la actualizacion de la resolucion, datos iguales'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 * Función que permite eliminar una resolucion
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la resolucion eliminada
 * */

const eliminarResolucion = async (req, res) => {
    try {
        const { id } = req.params
        const resolucion = await ResolucionDAO.eliminarResolucion(Number(id))
        if (resolucion) {
            res.status(200).json({
                message: 'Resolucion eliminada'
            })
        } else {
            res.status(500).json({
                message: 'Error al realizar la eliminacion de la resolucion'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Exportar todas las funciones
module.exports = {
    crearResolucion,
    obtenerResoluciones,
    obtenerResolucion,
    actualizarResolucion,
    eliminarResolucion
}