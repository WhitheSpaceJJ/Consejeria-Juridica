const e = require('express')
const estado_procesalDAO = require('../data-access/estado_procesalDAO')


/**
 * @abstract Método que permite obtener un estado procesal por su id
 * @param {number} id - ID del estado procesal a obtener
 * @returns {object} Retorna el objeto del estado procesal si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEstadoProcesal = async (req, res) => {
  try {
    const { id } = req.params
    const estado_procesal = await estado_procesalDAO.obtenerEstadoProcesal(Number(id))
    if (estado_procesal === null || estado_procesal === undefined) {
      return res.status(404).json({
        message: 'Estado procesal no encontrado'
      });
    }
    res.json(estado_procesal)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:error.message
    })
  }
}



/**
 * @abstract Método que permite crear un estado procesal
 * @param {object} estado_procesal - Objeto que contiene los datos del estado procesal
 * @returns {object} Retorna el objeto del estado procesal creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearEstadoProcesal = async (req, res) => {
  try {
    const { descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial } = req.body
    const estado_procesal = await estado_procesalDAO.crearEstadoProcesal({ descripcion_estado_procesal, fecha_estado_procesal, id_proceso_judicial })
    res.json(estado_procesal)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite actualizar un estado procesal
 * @param {object} estado_procesal - Objeto que contiene los datos del estado procesal
 * @returns {object} Retorna el objeto del estado procesal actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarEstadoProcesal = async (req, res) => {
  try {
    const { id } = req.params
    const { id_estado_procesal, ...data } = req.body
    const result= await estado_procesalDAO.actualizarEstadoProcesal(Number(id), data)
    if(result) {
      const actualizado = await estado_procesalDAO.obtenerEstadoProcesal(Number(id))
      return res.status(201).json(actualizado)
    }else{
      return res.status(500).json({ message: 'Error al realizar la actualizacion del estado procesal, datos iguales' })
    }
    
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const obtenerEstadosProcesalesPorProcesoJudicial = async (req, res) => {
  try {
    const { id } = req.params
    const estados_procesales = await estado_procesalDAO.obtenerEstadoProcesalPorProcesoJudicial(Number(id))
     if (estados_procesales === null || estados_procesales === undefined || estados_procesales.length === 0) {
      return res.status(404).json({
        message: 'Estados procesales no encontrado'
      });
    }
    res.status(200).json(estados_procesales)  
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  obtenerEstadoProcesal,
  crearEstadoProcesal,
  actualizarEstadoProcesal,
  obtenerEstadosProcesalesPorProcesoJudicial
}
