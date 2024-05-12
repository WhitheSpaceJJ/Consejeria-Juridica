
const controlJuzgado = require('../data-access/juzgadoDAO')


async function existeJuzgado(req, res, next) {
    const { id } = req.params
    const juzgado = await controlJuzgado.obtenerJuzgado(Number(id))
    if (!juzgado) {
        return res.status(404).json({
            message: 'No existe un juzgado con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONJuzgadoPOST(req, res, next) {
    const { nombre_juzgado, estatus_general } = req.body
    if (!nombre_juzgado || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONJuzgadoPUT(req, res, next) {
    const { id_juzgado, nombre_juzgado, estatus_general } = req.body
    if (!id_juzgado || !nombre_juzgado || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_juzgado !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del juzgado proporcionado no coincide con el id del juzgado que se quiere modificar.'
        })
    }
    next()
}




module.exports = {
    existeJuzgado,
    validarJSONJuzgadoPOST,
    validarJSONJuzgadoPUT
}