
const controlCatalogoRequisitos = require('../controles/controlCatalogoRequisito')

async function existeCatalogoRequisitos(req, res, next) {
    const { id } = req.params
    const catalogoRequisitos = await controlCatalogoRequisitos.obtenerCatalogoRequisitosPorId(id)
    if (!catalogoRequisitos) {
        return res.status(404).json({
            message: 'No existe un catalogo de requisitos con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}


async function validarJSONCatalogoRequisitosPOST(req, res, next) {
    const { descripcion_catalogo, estatus_general } = req.body
    if (!descripcion_catalogo || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}



async function validarJSONCatalogoRequisitosPUT(req, res, next) {
    const { id_catalogo, descripcion_catalogo, estatus_general } = req.body
    if (!id_catalogo || !descripcion_catalogo || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_catalogo !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del catalogo de requisitos proporcionado no coincide con el id del catalogo de requisitos que se quiere modificar.'
        })
    }
    next()
}


module.exports = {
    existeCatalogoRequisitos,
    validarJSONCatalogoRequisitosPOST,
    validarJSONCatalogoRequisitosPUT
}