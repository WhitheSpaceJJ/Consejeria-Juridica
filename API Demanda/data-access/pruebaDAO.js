

const Prueba = require('../models/prueba')

class PruebaDAO {

  /**
   * Método que permite crear una prueba en la base de datos
   * @param {object} prueba - Objeto que contiene los datos de la prueba
   * @returns {object} Retorna el objeto de la prueba creada si la operación fue exitosa, de lo contrario lanza un error
   * */

  async crearPrueba({ descripcion_prueba,  id_proceso_judicial }) {
    try {
      const prueba = await Prueba.create({ descripcion_prueba, id_proceso_judicial })
      return prueba
    } catch (err) {      console.log(err.message)

      throw err
    }
  }

 /**
  * Método que permite obtener todas las pruebas de la base de datos
  *   * @returns {array} Retorna un arreglo de objetos de pruebas si la operación fue exitosa, de lo contrario lanza un error
  * */

  async obtenerPruebas() {
    try {
      const pruebas = await Prueba.findAll()
      return pruebas
    } catch (err) {
      throw err
    }
  }

  /**
   * Método que permite obtener una prueba de la base de datos por su id
   * @param {number} id_prueba - ID de la prueba a obtener
   * @returns {object} Retorna el objeto de la prueba si la operación fue exitosa, de lo contrario lanza un error
   * */
  async obtenerPrueba(id_prueba) {
    try {
      const prueba = await Prueba.findByPk(id_prueba)
      return prueba
    } catch (err) {
      throw err
    }
  }
  /**
   * Método que permite obtener todas las pruebas de un proceso judicial
   * @param {number} id_proceso_judicial - ID del proceso judicial a obtener sus pruebas
   * @returns {array} Retorna un arreglo de objetos de pruebas si la operación fue exitosa, de lo contrario lanza un error
   * */

  async obtenerPruebasPorProcesoJudicial(id_proceso_judicial) {
    try {
      const prueba = await Prueba.findAll({ where: { id_proceso_judicial: id_proceso_judicial } })
      return prueba
    } catch (err) {
      throw err
    }
  }

  /**
   * Método que permite actualizar una prueba en la base de datos
   * @param {number} id_prueba - ID de la prueba a actualizar
   * @param {object} prueba - Objeto que contiene los datos de la prueba
   * @returns {boolean} Retorna true si la operación fue exitosa, de lo contrario lanza un error
   * */
  async actualizarPrueba(id_prueba, { descripcion_prueba , id_proceso_judicial }) {
    try {
      const pruebaActualizado = await Prueba.update({ descripcion_prueba, id_proceso_judicial }, { where: { id_prueba: id_prueba } })
      return pruebaActualizado[0] === 1
    } catch (err) {      console.log(err.message)

      throw err
    }
  }
/**
 * Método que permite eliminar una prueba de la base de datos
 * @param {number} id_prueba - ID de la prueba a eliminar
 * @returns {boolean} Retorna true si la operación fue exitosa, de lo contrario lanza un error
 * */

  async eliminarPrueba(id_prueba) {
    try {
      const prueba = await Prueba.destroy({ where: { id_prueba:id_prueba} })
      return prueba === 1
    } catch (err) {
      throw err
    }
  }
}   

module.exports = new PruebaDAO ()