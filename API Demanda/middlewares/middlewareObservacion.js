

const controlObservacion = require('../data-access/observacionDAO')
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
  

async function existeObservacion(req, res, next) {
    const { id } = req.params
    const observacion = await controlObservacion.obtenerObservacion(Number(id))
    if (!observacion) {
        return res.status(404).json({
            message: 'No existe una observacion con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}



async function validarJSONObservacionPOST(req, res, next) {
    const { observacion, id_proceso_judicial } = req.body
    if (!observacion || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONObservacionPUT(req, res, next) {
    const { id_observacion, observacion, id_proceso_judicial } = req.body
    if (!id_observacion || !observacion || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_observacion !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la observacion proporcionado no coincide con el id de la observacion que se quiere modificar.'
        })
    }
    next()
}





module.exports = {
    existeObservacion,
    validarJSONObservacionPOST,
    validarJSONObservacionPUT
    , existeProcesoJudicial
}
