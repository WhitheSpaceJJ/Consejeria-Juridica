

const controlFamiliar = require('../data-access/familiarDAO')
const controlPromovente = require('../data-access/promoventeDAO')


async function existePromovente (req, res, next) {
    const { id } = req.params
    const promovente = await controlPromovente.obtenerPromoventeMiddlware(Number(id))
    if (!promovente) {
        return res.status(404).json({
            message: 'No existe un promovente con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}

  
async function existeFamiliar(req, res, next) {
    const { id } = req.params
    const familiar = await controlFamiliar.obtenerFamiliar(Number(id))
    if (!familiar) {
        return res.status(404).json({
            message: 'No existe un familiar con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONFamiliarPOST(req, res, next) {
    const { nombre, nacionalidad, parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema, id_promovente } = req.body
    if (!nombre || !nacionalidad || !parentesco || !perteneceComunidadLGBT || !adultaMayor || !saludPrecaria || !pobrezaExtrema || !id_promovente) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONFamiliarPUT(req, res, next) {
    const { id_familiar, nombre, nacionalidad, parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema, id_promovente } = req.body
    if (!id_familiar || !nombre || !nacionalidad || !parentesco || !perteneceComunidadLGBT || !adultaMayor || !saludPrecaria || !pobrezaExtrema || !id_promovente) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_familiar !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del familiar proporcionado no coincide con el id del familiar que se quiere modificar.'
        })
    }
    next()
}



module.exports = {
    existeFamiliar,
    validarJSONFamiliarPOST,
    validarJSONFamiliarPUT,
    existePromovente
}