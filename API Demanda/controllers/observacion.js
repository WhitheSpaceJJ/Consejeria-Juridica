



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

 const obtenerObservacionesPorProcesoJudicial = async (req, res) => { 
    try {
        let {id_proceso_judicial, total, pagina} = req.query;
        const totalBool = total === 'true';
        id_proceso_judicial = parseInt(id_proceso_judicial, 10) || null;
        pagina = parseInt(pagina, 10) || 1;
        const result = await observacionDAO.obtenerObservacionesPorProcesoJudicial(id_proceso_judicial || null, totalBool, pagina);
        if (!result || (Array.isArray(result) && result.length === 0)) {
            return res.status(404).json({ message: 'No se encontraron observaciones' });
        }
        const responseKey = totalBool ? 'totalObservaciones' : 'observaciones';
        res.status(200).json({ [responseKey]: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }


}


// Exportación de funciones



module.exports = {

    crearObservacion,
    obtenerObservacion,
    actualizarObservacion,
    obtenerObservacionesPorProcesoJudicial
}

