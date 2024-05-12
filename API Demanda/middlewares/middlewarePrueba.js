

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
    const { id_prueba, descripcion_prueba, id_proceso_judicial } = req.body
    if (!id_prueba || !descripcion_prueba || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONPruebaPUT(req, res, next) {
    const { id_prueba, descripcion_prueba, id_proceso_judicial } = req.body
    if (!id_prueba || !descripcion_prueba || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_prueba !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la prueba proporcionado no coincide con el id de la prueba que se quiere modificar.'
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



