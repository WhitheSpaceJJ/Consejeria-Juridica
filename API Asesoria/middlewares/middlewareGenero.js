const controlGenero = require('../controles/controlGenero')


async function existeGenero(req, res, next) {
    const { id } = req.params
    const genero = await controlGenero.obtenerGeneroPorId(id)
    if (!genero) {
        return res.status(404).json({
            message: 'No existe un genero con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}

async function validarJSONGeneroPOST(req, res, next) {
    const { descripcion_genero, estatus_general } = req.body
    if (!descripcion_genero || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}


async function validarJSONGeneroPUT(req, res, next) {
    const { id_genero, descripcion_genero, estatus_general } = req.body
    if (!id_genero || !descripcion_genero || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_genero !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del genero proporcionado no coincide con el id del genero que se quiere modificar.'
        })
    }
    next()
}

module.exports = {
    existeGenero,
    validarJSONGeneroPOST,
    validarJSONGeneroPUT
}