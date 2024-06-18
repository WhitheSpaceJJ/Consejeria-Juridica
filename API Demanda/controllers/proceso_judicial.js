const procesoJudicialDAO = require('../data-access/proceso_judicialDAO')





/**
 * @abstract Método que permite crear un proceso judicial
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearProcesoJudicial = async (req, res) => {
  try {

    const { turno, promovente, demandado, proceso } = req.body

    const procesoJudicial = await procesoJudicialDAO.crearProcesoJudicial({
      turno, promovente, demandado, proceso
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
/**
 * @abstract Método que permite obtener todos los procesos judiciales por defensor
 * @returns {array} Retorna un arreglo de objetos de procesos judiciales si la operación fue exitosa, de lo contrario lanza un error
 */


const obtenerProcesosJudicialesBusqueda = async (req, res) => {
  try {
    let { id_defensor, id_distrito_judicial, total, pagina, estatus_proceso } = req.query;
    const totalBool = total === 'true';

    pagina = parseInt(pagina, 10) || 1;
    id_defensor = parseInt(id_defensor, 10) || null;
    id_distrito_judicial = parseInt(id_distrito_judicial, 10) || null;
    

    const result = await procesoJudicialDAO.obtenerProcesosJudicialesBusqueda(id_defensor, id_distrito_judicial, totalBool, pagina, estatus_proceso);

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(404).json({ message: "No hay procesos judiciales registrados" });
    }

    const responseKey = totalBool ? 'totalProcesosJudiciales' : 'procesosJudiciales';
    res.status(200).json({ [responseKey]: result });
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

    const { id } = req.params
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
  obtenerProcesosJudicialesBusqueda
  ,
  obtenerProcesosJudicialesPorTramite
}
