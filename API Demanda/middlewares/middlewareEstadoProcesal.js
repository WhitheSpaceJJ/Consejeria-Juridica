
const controlEstadoProcesal = require('../data-access/estado_procesalDAO')

const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')


async function existeProcesoJudicial(req, res, next) {
    const { id } = req.params
    const procesoJudicial = await procesoJudicialDAO.obtenerProcesoJudicialMiddleware(id)
    if (!procesoJudicial) {
        return res.status(404).json({
            message: 'No existe un proceso judicial con ese id'
        })
    }
    next()
}

async function existeEstadoProcesal(req, res, next) {
    const { id } = req.params
    const estadoProcesal = await controlEstadoProcesal.obtenerEstadoProcesal(Number(id))
    if (!estadoProcesal) {
        return res.status(404).json({
            message: 'No existe un estado procesal con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONEstadoProcesalPOST(req, res, next) {
    const { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial, ...extraData } = req.body

    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!descripcion_estado_procesal || !fecha_estado_procesal || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o la descripción del estado procesal o la fecha del estado procesal o el id del proceso judicial esta vacio.'
        })
    }

    if (isNaN(id_proceso_judicial)) {
        return res.status(400).json({
            message: 'El id del proceso judicial no es un número.'
        })
    }


    if (descripcion_estado_procesal.length > 200) {
        return res.status(400).json({
            message: 'El campo "descripcion_estado_procesal" excede el tamaño permitido.'
        });
    }
    
    if (isNaN(Date.parse(fecha_estado_procesal))) {
        return res.status(400).json({
            message: 'El campo "fecha_estado_procesal" no es una fecha.'
        });
    }




    next()
}




async function validarJSONEstadoProcesalPUT(req, res, next) {
    const { id_estado_procesal, descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial, ...extraData } = req.body

    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!id_estado_procesal || !descripcion_estado_procesal || !fecha_estado_procesal || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }

    if (isNaN(id_estado_procesal)) {
        return res.status(400).json({
            message: 'El campo "id_estado_procesal" no acepta valores numericos.'
        });
    }

    if (isNaN(id_proceso_judicial)) {
        return res.status(400).json({
            message: 'El campo "id_proceso_judicial" no acepta valores numericos.'
        });
    }



    if (descripcion_estado_procesal.length > 200) {
        return res.status(400).json({
            message: 'El campo "descripcion_estado_procesal" excede el tamaño permitido.'
        });
    }

    if (isNaN(Date.parse(fecha_estado_procesal))) {
        return res.status(400).json({
            message: 'El campo "fecha_estado_procesal" no es una fecha.'
        });
    }


    if (id_estado_procesal !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del estado procesal proporcionado no coincide con el id del estado procesal que se quiere modificar.'
        })
    }

    const estadoProcesal = await controlEstadoProcesal.obtenerEstadoProcesal(Number(id_estado_procesal))

    if (estadoProcesal.id_proceso_judicial !== id_proceso_judicial) {
        return res.status(400).json({
            message: 'El id del proceso judicial proporcionado no coincide con el id del proceso judicial del estado procesal, no se puede cambiar el proceso judicial del estado procesal.'
        })
    }


    next()
}



module.exports = {

    existeEstadoProcesal,
    validarJSONEstadoProcesalPOST,
    validarJSONEstadoProcesalPUT,
    existeProcesoJudicial
}