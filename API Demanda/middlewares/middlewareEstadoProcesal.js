
const controlEstadoProcesal = require('../data-access/estado_procesalDAO')

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

async function existeEstadoProcesal(req, res, next) {
    const { id } = req.params
    const estadoProcesal = await controlEstadoProcesal.obtenerEstadoProcesal(Number(id))
    if (!estadoProcesal) {
        return res.status(404).json({
            message: 'No existe un estado procesal con el id proporcionado, asi que no se puede continuar con la petición.'
        })
    }
    next()
}


     
async function validarJSONEstadoProcesalPOST(req, res, next) {
    const { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial } = req.body
    if (!descripcion_estado_procesal || !fecha_estado_procesal || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    }
    next()
}




async function validarJSONEstadoProcesalPUT(req, res, next) {
    const { id_estado_procesal, descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial } = req.body
    if (!id_estado_procesal || !descripcion_estado_procesal || !fecha_estado_procesal || !id_proceso_judicial) {
        return res.status(400).json({
            message: 'Faltan datos en el cuerpo de la petición.'
        })
    } else
    if (id_estado_procesal !== Number(req.params.id)) {
        return res.status(400).json({
            message: 'El id del estado procesal proporcionado no coincide con el id del estado procesal que se quiere modificar.'
        })
    }
    next()
}



module.exports = {

    existeEstadoProcesal,
    validarJSONEstadoProcesalPOST,
    validarJSONEstadoProcesalPUT,
    existeProcesoJudicial
}