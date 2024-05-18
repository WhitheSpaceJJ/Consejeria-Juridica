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
    const { descripcion_genero, estatus_general, ...extraData } = req.body

    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }


    if (!descripcion_genero || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o el estatus general o la descripción del genero esta vacio.'
        })
    }

    if (descripcion_genero.length > 25) {
        return res.status(400).json({
            message: 'El campo "descripcion_genero" excede el tamaño permitido.'
        });
    }

    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }



    next()
}


async function validarJSONGeneroPUT(req, res, next) {
    const { id_genero, descripcion_genero, estatus_general, ...extraData } = req.body

    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }


    if (!id_genero || !descripcion_genero || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o el id del genero, el estatus general o la descripción del genero esta vacio.'
        })
    }

   if (isNaN(id_genero)) {
        return res.status(400).json({
            message: 'El campo "id_genero" debe ser un número.'
        });
    }

    if (descripcion_genero.length > 25) {
        return res.status(400).json({
            message: 'El campo "descripcion_genero" excede el tamaño permitido.'
        });

    }

    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }


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