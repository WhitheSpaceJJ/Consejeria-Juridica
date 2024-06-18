

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

const obtenerResolucionesPorProcesoJudicial = async (req, res) => {

    try {
        let { id_proceso_judicial, total, pagina } = req.query;
        const totalBool = total === 'true';
        id_proceso_judicial = parseInt(id_proceso_judicial, 10) || null;
        pagina = parseInt(pagina, 10) || 1;
        const result = await ResolucionDAO.obtenerResolucionesPorProcesoJudicial(id_proceso_judicial || null, totalBool, pagina);
        if (!result || (Array.isArray(result) && result.length === 0)) {
            return res.status(404).json({ message: 'No se encontraron resoluciones' });
        }
        const responseKey = totalBool ? 'totalResoluciones' : 'resoluciones';
        res.status(200).json({ [responseKey]: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// Exportar todas las funciones
module.exports = {
    crearResolucion,
    obtenerResolucion,
    actualizarResolucion,
    obtenerResolucionesPorProcesoJudicial
}