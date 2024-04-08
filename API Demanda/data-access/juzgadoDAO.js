const Juzgado = require('../models/juzgado')

class JuzgadoDAO {
  /**
 * @abstract Método que permite crear un juzgado en la base de datos
 * @param {object} juzgado - Objeto que contiene los datos del juzgado
 * @returns {object} Retorna el objeto del juzgado creado si la operación fue exitosa, de lo contrario lanza un error
 */

  async crearJuzgado({ nombre_juzgado, estatus_general }) {
    try {
      const juzgado = await Juzgado.create({ nombre_juzgado, estatus_general })
      return juzgado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los juzgados de la base de datos
 * @returns {array} Retorna un arreglo de objetos de juzgados si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerJuzgados(activo) {
    try {
      if (activo !== undefined && activo !== null && activo !== "") {
        const juzgados = await Juzgado.findAll({ where: { estatus_general: "ACTIVO" } })
        return juzgados
      } else {
        const juzgados = await Juzgado.findAll()
        return juzgados
      }
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un juzgado de la base de datos por su id
 * @param {number} id - ID del juzgado a obtener
 * @returns {object} Retorna el objeto del juzgado si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerJuzgado(id) {
    try {
      const juzgado = await Juzgado.findByPk(id)
      return juzgado
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un juzgado en la base de datos
 * @param {number} id_juzgado - ID del juzgado a actualizar
 * @param {object} juzgado - Objeto que contiene los nuevos datos del juzgado
 * @returns {object} Retorna el objeto del juzgado actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarJuzgado(id_juzgado, { nombre_juzgado, estatus_general }) {
    try {
      const juzgado = await Juzgado.update({ nombre_juzgado, estatus_general }, { where: { id_juzgado } })
      return juzgado[0] == 1
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un juzgado de la base de datos
 * @param {number} id - ID del juzgado a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarJuzgado(id) {
    try {
      const juzgado = await Juzgado.destroy( { where: { id_juzgado: id } })
      return juzgado === 1
    } catch (err) {
      throw err
    }
  }
}

module.exports = new JuzgadoDAO()
