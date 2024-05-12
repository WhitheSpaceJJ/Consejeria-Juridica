


const controlResolucion = require('../data-access/resolucionDAO')
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
  
async function existeResolucion(req, res, next) {
    const { id } = req.params
    const resolucion = await controlResolucion.obtenerResolucion(Number(id))
    if (!resolucion) {
        return res.status(404).json({
            message: 'No existe una resolución con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}




async function validarJSONResolucionPOST(req, res, next) {
    const { resolucion, fecha_resolucion, id_proceso_judicial } = req.body
    if (!resolucion || !fecha_resolucion || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONResolucionPUT(req, res, next) {
    const { id_resolucion, resolucion, fecha_resolucion, id_proceso_judicial } = req.body
    if (!id_resolucion || !resolucion || !fecha_resolucion || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_resolucion !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id de la resolución proporcionado no coincide con el id de la resolución que se quiere modificar.'
        })
    }
    next()
}





module.exports = {
    existeResolucion,
    validarJSONResolucionPOST,
    validarJSONResolucionPUT,
    existeProcesoJudicial
}