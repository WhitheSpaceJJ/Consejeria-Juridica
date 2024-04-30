const e = require('express');
const juzgadoDAO = require('../data-access/juzgadoDAO')

/**
 * @abstract Método que permite obtener todos los juzgados
 * @returns {array} Retorna un arreglo de objetos de juzgados si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerJuzgados = async (req, res) => {
  try {
    const activo = req.query.activo;
    if (activo !== undefined && activo !== null && activo !== "") {
      const juzgados = await juzgadoDAO.obtenerJuzgados(activo)
      if (juzgados.length === 0) {
        return res.status(204).json(juzgados)
      }
      res.json(juzgados)
    } else {
      const juzgados = await juzgadoDAO.obtenerJuzgados()
      if (juzgados.length === 0) {
        return res.status(204).json(juzgados)
      }
      res.json(juzgados)
    }
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

/**
 * @abstract Método que permite obtener un juzgado por su id
 * @param {number} id - ID del juzgado a obtener
 * @returns {object} Retorna el objeto del juzgado si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const juzgado = await juzgadoDAO.obtenerJuzgado(Number(id))
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite crear un juzgado
 * @param {object} juzgado - Objeto que contiene los datos del juzgado
 * @returns {object} Retorna el objeto del juzgado creado si la operación fue exitosa, de lo contrario lanza un error
 */
const crearJuzgado = async (req, res) => {
  try {
    const { nombre_juzgado, estatus_general } = req.body
    const juzgado = await juzgadoDAO.crearJuzgado({ nombre_juzgado, estatus_general })
    res.json(juzgado)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite actualizar un juzgado
 * @param {object} juzgado - Objeto que contiene los datos del juzgado
 * @returns {object} Retorna el objeto del juzgado actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre_juzgado, estatus_general } = req.body
    const result = await juzgadoDAO.actualizarJuzgado(Number(id), {
      nombre_juzgado, estatus_general
    })
    if (result) {
      const juzgado = await juzgadoDAO.obtenerJuzgado(Number(id))
      res.status(200).json(juzgado)
    } else {
      return res.status(404).json({
        message: 'Datos a actualizar completamente iguales a los datos actuales'
      })
    }
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

/**
 * @abstract Método que permite eliminar un juzgado
 * @param {number} id - ID del juzgado a eliminar
 * @returns {object} Retorna el objeto del juzgado eliminado si la operación fue exitosa, de lo contrario lanza un error
 */
const eliminarJuzgado = async (req, res) => {
  try {
    const { id } = req.params
    const juez = await juzgadoDAO.eliminarJuzgado(Number(id))
    if(juez){
      res.status(200).json({
        message: 'Juzgado eliminado'
      })
    }
     else {
      res.status(404).json({
        message: 'Juzgado no eliminado'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  obtenerJuzgados,
  obtenerJuzgado,
  crearJuzgado,
  actualizarJuzgado,
  eliminarJuzgado
}
