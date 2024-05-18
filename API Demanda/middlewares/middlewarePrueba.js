

const controlPrueba = require('../data-access/pruebaDAO')
const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')



async function existeProcesoJudicial(req, res, next) {
    const { id } = req.params
    const procesoJudicial = await procesoJudicialDAO.obtenerProcesoJudicialMiddleware(id)
    if (!procesoJudicial) {
        return res.status(404).json({
            message: 'No existe un proceso judicial con ese id'
        })
    }
    next()
}

async function existePrueba(req, res, next) {
    const { id } = req.params
    const prueba = await controlPrueba.obtenerPrueba(Number(id))
    if (!prueba) {
        return res.status(404).json({
            message: 'No existe una prueba con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONPruebaPOST(req, res, next) {
    const { descripcion_prueba, id_proceso_judicial, ...extraData } = req.body
    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!descripcion_prueba || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o la descripción de la prueba o el id del proceso judicial esta vacio.'
        })
    }

    if (isNaN(id_proceso_judicial)) {
        return res.status(400).json({
            message: 'El id del proceso judicial no es un número.'
        })
    }

    if (descripcion_prueba.length > 200) {
        return res.status(400).json({
            message: 'El campo "descripcion_prueba" excede el tamaño permitido.'
        });
    }

    next()
}




async function validarJSONPruebaPUT(req, res, next) {
    const { id_prueba, descripcion_prueba, id_proceso_judicial, ...extraData } = req.body

    if (Object.keys(extraData).length !== 0) {
        return res.status(400).json({
            message: 'Hay datos adicionales en el cuerpo de la petición que no son permitidos.'
        });
    }

    if (!id_prueba || !descripcion_prueba || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición, o la descripción de la prueba o el id del proceso judicial esta vacio.'
        })
    }

    if (isNaN(id_prueba)) {
        return res.status(400).json({
            message: 'El id de la prueba no es un número.'
        })
    }



    if (isNaN(id_proceso_judicial)) {
        return res.status(400).json({
            message: 'El id del proceso judicial no es un número.'
        })
    }



    if (descripcion_prueba.length > 200) {
        return res.status(400).json({
            message: 'El campo "descripcion_prueba" excede el tamaño permitido.'
        });
    }

    if (id_prueba !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la prueba proporcionado no coincide con el id de la prueba que se quiere modificar.'
        })
    }
    /*
  {
      "id_prueba": 1,
      "descripcion_prueba": "aaaaaaaaaaaaa",
      "id_proceso_judicial": 1
  }
    */
    const prueba_obtenida = await controlPrueba.obtenerPrueba(Number(id_prueba))
    //Evalua que el id del proceso judicial sea el mismo que el de la prueba encontrada

    if (prueba_obtenida.id_proceso_judicial !== Number(id_proceso_judicial)) {
        return res.status(400).json({
            message: 'El id del proceso judicial proporcionado no coincide con el id del proceso judicial al que pertenece la prueba que se quiere modificar.'
        })
    }


    next()
}





module.exports = {
    existePrueba,
    validarJSONPruebaPOST,
    validarJSONPruebaPUT,
    existeProcesoJudicial
}



