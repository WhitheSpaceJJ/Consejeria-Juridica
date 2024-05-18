

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
    const { descripcion_ocupacion, estatus_general, ...extraData } = req.body

    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!descripcion_ocupacion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición , o la descripción de la ocupación o el estatus general esta vacio.'
        })
    }


    if (descripcion_ocupacion.length > 50) {
        return res.status(400).json({
            message: 'El campo "descripcion_ocupacion" excede el tamaño permitido.'
        });
    }


    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }



    next()
}




async function validarJSONOcupacionPUT(req, res, next) {
    const { id_ocupacion, descripcion_ocupacion, estatus_general, ...extraData } = req.body

    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!id_ocupacion || !descripcion_ocupacion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
     
    if (isNaN(id_ocupacion)) {
        return res.status(400).json({
            message: 'El id de la ocupación no es un número.'
        });
    }
    
      
    if (descripcion_ocupacion.length > 50) {
        return res.status(400).json({
            message: 'El campo "descripcion_ocupacion" excede el tamaño permitido.'
        });
    }


    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }


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