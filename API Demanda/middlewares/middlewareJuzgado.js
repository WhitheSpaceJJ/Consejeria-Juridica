
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
    const { nombre_juzgado, estatus_general, ...extraData } = req.body

    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }


    if (!nombre_juzgado || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o el nombre del juzgado o el estatus general esta vacio.'
        })
    }


    if (nombre_juzgado.length > 50) {
        return res.status(400).json({
            message: 'El campo "nombre_juzgado" excede el tamaño permitido.'
        });
    }


    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }


    next()
}




async function validarJSONJuzgadoPUT(req, res, next) {
    const { id_juzgado, nombre_juzgado, estatus_general, ...extraData } = req.body

    // Verifica si hay datos adicionales en el cuerpo de la petición
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!id_juzgado || !nombre_juzgado || !estatus_general) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o el id del juzgado, el nombre del juzgado o el estatus general esta vacio.'
        })
    }
    
    if (isNaN(id_juzgado)) {
        return res.status(400).json({
            message: 'El campo "id_juzgado" no acepta valores numericos.'
        });
    }

    if (nombre_juzgado.length > 50) {
        return res.status(400).json({
            message: 'El campo "nombre_juzgado" excede el tamaño permitido.'
        });
    }

    if (estatus_general !== 'ACTIVO' && estatus_general !== 'INACTIVO') {
        return res.status(400).json({
            message: 'El campo "estatus_general" solo acepta los valores "ACTIVO" o "INACTIVO".'
        });
    }


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