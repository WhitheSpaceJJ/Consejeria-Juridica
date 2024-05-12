
const controlTipoJuicio = require('../controles/controlTipoJuicio')

async function existeTipoJuicio(req, res, next) {
    const { id } = req.params
    const tipoJuicio = await controlTipoJuicio.obtenerTipoJuicioPorId(id)
    if (!tipoJuicio) {
        return res.status(404).json({
            message: 'No existe un tipo de juicio con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}


async function validarJSONTipoJuicioPOST(req, res, next) {
    const { tipo_juicio, estatus_general } = req.body
    if (!tipo_juicio || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}



async function validarJSONTipoJuicioPUT(req, res, next) {
    const { id_tipo_juicio, tipo_juicio, estatus_general } = req.body
    if (!id_tipo_juicio || !tipo_juicio || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_tipo_juicio !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del tipo de juicio proporcionado no coincide con el id del tipo de juicio que se quiere modificar.'
        })
    }
    next()
}


module.exports = {
    existeTipoJuicio,
    validarJSONTipoJuicioPOST,
    validarJSONTipoJuicioPUT
}