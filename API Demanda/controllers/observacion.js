



const observacionDAO = require('../data-access/observacionDAO')


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





module.exports = {

    crearObservacion,
    obtenerObservaciones,
    obtenerObservacion,
    actualizarObservacion,
    eliminarObservacion
}

