const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')





/**
 * @abstract Método que permite crear un proceso judicial
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearProcesoJudicial = async (req, res) => {
  try {

 const { turno, promovente, imputado, proceso } = req.body

  const procesoJudicial = await procesoJudicialDAO.crearProcesoJudicial({
    turno, promovente, imputado, proceso
  })
  res.json(procesoJudicial)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite obtener todos los procesos judiciales
 * @returns {array} Retorna un arreglo de objetos de procesos judiciales si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerProcesosJudiciales = async (req, res) => {
  try {
    const procesosJudiciales = await procesoJudicialDAO.obtenerProcesosJudiciales()
    if (procesosJudiciales === null || procesosJudiciales.length === 0) {
      res.status(404).json({
        message: "No hay procesos judiciales registrados"
      })
    }
    else {
      res.status(200).json(procesosJudiciales)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
const obtenerProcesosJudicialesPorDefensor = async (req, res) => {
  try {
    const estatus_proceso = req.query.estatus_proceso
    const id_defensor = req.query.id_defensor
    if (estatus_proceso === undefined || estatus_proceso === null || estatus_proceso === "") {
      const procesosJudiciales = await procesoJudicialDAO.obtenerProcesosJudicialesPorDefensor(id_defensor)
      if (procesosJudiciales === null || procesosJudiciales.length === 0) {
        res.status(404).json({
          message: "No hay procesos judiciales registrados"
        })
      }
      else {
        res.status(200).json(procesosJudiciales)
      }
    } else {
      const procesosJudiciales = await procesoJudicialDAO.obtenerProcesosJudicialesPorDefensorEstatus(id_defensor, estatus_proceso)
      if (procesosJudiciales === null || procesosJudiciales.length === 0) {
        res.status(404).json({
          message: "No hay procesos judiciales registrados"
        })
      }
      else {
        res.status(200).json(procesosJudiciales)
      }
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite obtener un proceso judicial por su id
 * @param {number} id - ID del proceso judicial a obtener
 * @returns {object} Retorna el objeto del proceso judicial si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerProcesoJudicial = async (req, res) => {
  try {
    const { id } = req.params
    const procesoJudicial = await procesoJudicialDAO.obtenerProcesoJudicial(Number(id))
    if (procesoJudicial === null) {
      res.status(404).json({
        message: "Proceso judicial no encontrado"
      })
    }
    else {
      res.status(200).json(procesoJudicial)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite actualizar un proceso judicial
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarProcesoJudicial = async (req, res) => {
  try {
  
    const {id} = req.params
    const { promovente, imputado, proceso } = req.body
    const procesoJudicial = await procesoJudicialDAO.actualizarProcesoJudicialOficial(Number(id), {
      promovente, imputado, proceso
    })
    res.json(procesoJudicial)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite eliminar un proceso judicial
 * @param {number} id - ID del proceso judicial a eliminar
 * @returns {object} Retorna el objeto del proceso judicial eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarProcesoJudicial = async (req, res) => {
  try {
    const { id } = req.params
    const procesoJudicial = await procesoJudicialDAO.eliminarProcesoJudicial(Number(id))
    if (procesoJudicial === false) {
      res.status(404).json({
        message: "Proceso judicial no  eliminado"
      })
    }
    else {
      res.status(200).json({ message: "Proceso judicial eliminado con éxito" })
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const obtenerProcesosJudicialesPorTramite = async (req, res) => {
  try {
    const estatus_proceso = req.query.estatus_proceso
    const procesosJudiciales = await procesoJudicialDAO.obtenerProcesosJudicialesPorTramite(estatus_proceso)
    if (procesosJudiciales === null || procesosJudiciales === undefined) {
      res.status(404).json({
        message: "No hay proceso judiciales en estatus de tramite"
      })
    }
    else {
      res.status(200).json(procesosJudiciales)
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  crearProcesoJudicial,
  obtenerProcesosJudiciales,
  obtenerProcesoJudicial,
  actualizarProcesoJudicial,
  eliminarProcesoJudicial,
  obtenerProcesosJudicialesPorDefensor
  ,
  obtenerProcesosJudicialesPorTramite
}
