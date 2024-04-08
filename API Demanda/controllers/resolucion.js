

const ResolucionDAO = require('../data-access/resolucionDAO')


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
            message:error.message
        })
    }
}

const actualizarResolucion = async (req, res) => {
    try {
        const { id } = req.params
        const { resolucion, fecha_resolucion } = req.body
        const result = await ResolucionDAO.actualizarResolucion(Number(id), {
            resolucion,
            fecha_resolucion
        })
        if (result) {
            const actualizado = await ResolucionDAO.obtenerResolucionPorProcesoJudicial(Number(id))
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


module.exports = {
    crearResolucion,
    obtenerResoluciones,
    obtenerResolucion,
    actualizarResolucion,
    eliminarResolucion
}