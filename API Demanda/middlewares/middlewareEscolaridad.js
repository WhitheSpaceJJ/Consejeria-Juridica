

const controlEscolaridad = require('../data-access/escolaridadDAO')


async function existeEscolaridad(req, res, next) {
    const { id } = req.params
    const escolaridad = await controlEscolaridad.obtenerEscolaridad(Number(id))
    if (!escolaridad) {
        return res.status(404).json({
            message: 'No existe una escolaridad con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONEscolaridadPOST(req, res, next) {
    const { descripcion, estatus_general } = req.body
    if (!descripcion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONEscolaridadPUT(req, res, next) {
    const { id_escolaridad, descripcion, estatus_general } = req.body
    if (!id_escolaridad || !descripcion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_escolaridad !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la escolaridad proporcionado no coincide con el id de la escolaridad que se quiere modificar.'
        })
    }
    next()
}




module.exports = {
    existeEscolaridad,
    validarJSONEscolaridadPOST,
    validarJSONEscolaridadPUT
}