

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
    const { descripcion, estatus_general , ...extraData } = req.body

      // Verifica si hay datos adicionales en el cuerpo de la petición
      if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!descripcion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o la descripción de la escolaridad o el estatus general esta vacio.'
        })
    }
   //Limite 50

    if (descripcion.length > 50) {
        return res.status(400).json({
            message: 'El campo "descripcion" excede el tamaño permitido.'
        });
    }

    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }



    next()
}




async function validarJSONEscolaridadPUT(req, res, next) {
    const { id_escolaridad, descripcion, estatus_general  , ...extraData } = req.body

    
      // Verifica si hay datos adicionales en el cuerpo de la petición
      if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!id_escolaridad || !descripcion || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o la descripción de la escolaridad o el estatus general esta vacio.'
        })
    } 
    if (isNaN(id_escolaridad)) {
        return res.status(400).json({
            message: 'El campo "id_escolaridad" no acepta valores numericos.'
        });
    }


    if (descripcion.length > 50) {
        return res.status(400).json({
            message: 'El campo "descripcion" excede el tamaño permitido.'
        });

    }

    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }


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