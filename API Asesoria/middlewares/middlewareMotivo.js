
const controlMotivo = require('../controles/controlMotivo')


async function existeMotivo(req, res, next) {
    const { id } = req.params
    const motivo = await controlMotivo.obtenerMotivoPorId(id)
    if (!motivo) {
        return res.status(404).json({
            message: 'No existe un motivo con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONMotivoPOST(req, res, next) {
    const { descripcion_motivo, estatus_general } = req.body
    if (!descripcion_motivo || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}



async function validarJSONMotivoPUT(req, res, next) {
    const { id_motivo, descripcion_motivo, estatus_general } = req.body
    if (!id_motivo || !descripcion_motivo || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_motivo !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del motivo proporcionado no coincide con el id del motivo que se quiere modificar.'
        })
    }
    next()
}


module.exports = {
    existeMotivo,
    validarJSONMotivoPOST,
    validarJSONMotivoPUT
}