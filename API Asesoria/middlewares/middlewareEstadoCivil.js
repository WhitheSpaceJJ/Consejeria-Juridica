
const controlEstadoCivil = require('../controles/controlEstadoCivil')


async function existeEstadoCivil(req, res, next) {
    const { id } = req.params
    const estadoCivil = await controlEstadoCivil.obtenerEstadoCivilPorId(id)
    if (!estadoCivil) {
        return res.status(404).json({
            message: 'No existe un estado civil con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}

async function validarJSONEstadoCivilPOST(req, res, next) {
    const { estado_civil, estatus_general } = req.body
    if (!estado_civil || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}



async function validarJSONEstadoCivilPUT(req, res, next) {
    const { id_estado_civil, estado_civil, estatus_general } = req.body
    if (!id_estado_civil || !estado_civil || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_estado_civil !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del estado civil proporcionado no coincide con el id del estado civil que se quiere modificar.'
        })
    }
    next()
}


module.exports = {
    existeEstadoCivil,
    validarJSONEstadoCivilPOST,
    validarJSONEstadoCivilPUT
}