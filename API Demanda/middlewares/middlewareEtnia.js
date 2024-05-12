

const controlEtnia = require('../data-access/etniaDAO')


async function existeEtnia(req, res, next) {
    const { id } = req.params
    const etnia = await controlEtnia.obtenerEtnia(Number(id))
    if (!etnia) {
        return res.status(404).json({
            message: 'No existe una etnia con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONEtniaPOST(req, res, next) {
    const { nombre, estatus_general } = req.body
    if (!nombre || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONEtniaPUT(req, res, next) {
    const { id_etnia, nombre, estatus_general } = req.body
    if (!id_etnia || !nombre || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_etnia !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la etnia proporcionado no coincide con el id de la etnia que se quiere modificar.'
        })
    }
    next()
}




module.exports = {
    existeEtnia,
    validarJSONEtniaPOST,
    validarJSONEtniaPUT
}