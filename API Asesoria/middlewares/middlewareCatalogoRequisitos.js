
const controlCatalogoRequisitos = require('../controles/controlCatalogoRequisito')

async function existeCatalogoRequisitos(req, res, next) {
    const { id } = req.params
    const catalogoRequisitos = await controlCatalogoRequisitos.obtenerCatalogoRequisitoPorId(id)
    if (!catalogoRequisitos) {
        return res.status(404).json({
            message: 'No existe un catalogo de requisitos con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}


async function validarJSONCatalogoRequisitosPOST(req, res, next) {
    const { descripcion_catalogo, estatus_general, ...extraData  } = req.body
    
    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!descripcion_catalogo || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o la descripción del catalogo de requisitos o el estatus general esta vacio.'
        })
    }
   //Limite 75

    if (descripcion_catalogo.length > 75) {
        return res.status(400).json({
            message: 'El campo "descripcion_catalogo" excede el tamaño permitido.'
        });
    }

    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }



    next()
}



async function validarJSONCatalogoRequisitosPUT(req, res, next) {
    const { id_catalogo, descripcion_catalogo, estatus_general, ...extraData } = req.body

      // Verifica si hay datos adicionales en el cuerpo de la petición
      if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }
    if (!id_catalogo || !descripcion_catalogo || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o el id del catalogo de requisitos, la descripción del catalogo de requisitos o el estatus general esta vacio.'
        })
    } 
    
   
    if (isNaN(id_catalogo)) {
        return res.status(400).json({
            message: 'El campo "id_catalogo" debe ser de tipo numérico.'
        });
    }

    if (descripcion_catalogo.length > 75) {
        return res.status(400).json({
            message: 'El campo "descripcion_catalogo" excede el tamaño permitido.'
        });
    }


    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }
    

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