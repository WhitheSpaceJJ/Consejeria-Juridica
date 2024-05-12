

const controlOcupacion = require('../data-access/ocupacionDAO')


async function existeOcupacion(req, res, next) {
    const { id } = req.params
    const ocupacion = await controlOcupacion.obtenerOcupacion(Number(id))
    if (!ocupacion) {
        return res.status(404).json({
            message: 'No existe una ocupación con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONOcupacionPOST(req, res, next) {
    const { descripcion_ocupacion, estatus_general } = req.body
    if (!descripcion_ocupacion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONOcupacionPUT(req, res, next) {
    const { id_ocupacion, descripcion_ocupacion, estatus_general } = req.body
    if (!id_ocupacion || !descripcion_ocupacion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_ocupacion !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la ocupación proporcionado no coincide con el id de la ocupación que se quiere modificar.'
        })
    }
    next()
}




module.exports = {
    existeOcupacion,
    validarJSONOcupacionPOST,
    validarJSONOcupacionPUT
}