const Etnia = require('../models/etnia')

class EtniaDAO {

  /**
   * @abstract Método que permite crear una etnia en la base de datos
   * @param {object} etnia - Objeto que contiene los datos de la etnia
   * @returns {object} Retorna el objeto de la etnia creada si la operación fue exitosa, de lo contrario lanza un error
   */
  async crearEtnia({ nombre, estatus_general }) {
    try {
      const etnia = await Etnia.create({ nombre, estatus_general })
      return etnia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener todas las etnias de la base de datos
   * @returns {array} Retorna un arreglo de objetos de etnias si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEtnias(activo) {
    try {
      if (activo !== undefined && activo !== null && activo !== "") {
        const etnias = await Etnia.findAll({ where: { estatus_general: "ACTIVO" } })
        return etnias
      } else {
        const etnias = await Etnia.findAll()
        return etnias
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite obtener una etnia de la base de datos por su id
   * @param {number} id - ID de la etnia a obtener
   * @returns {object} Retorna el objeto de la etnia si la operación fue exitosa, de lo contrario lanza un error
   */
  async obtenerEtnia(id) {
    try {
      const etnia = await Etnia.findByPk(id)
      return etnia
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite actualizar una etnia en la base de datos
   * @param {number} id_etnia - ID de la etnia a actualizar
   * @param {object} etnia - Objeto que contiene los nuevos datos de la etnia
   * @returns {object} Retorna el objeto de la etnia actualizada si la operación fue exitosa, de lo contrario lanza un error
   */
  async actualizarEtnia(id_etnia, { nombre, estatus_general }) {
    try {
      const etnia = await Etnia.update({ nombre, estatus_general }, { where: { id_etnia } })
      return etnia[0] == 1
    } catch (err) {
      throw err
    }
  }

  /**
   * @abstract Método que permite eliminar una etnia de la base de datos
   * @param {number} id - ID de la etnia a eliminar
   * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
   */
  async eliminarEtnia(id) {
    try {
      const etnia = await Etnia.destroy({ where: { id_etnia: id } })
      return etnia === 1
    } catch (err) {
      throw err
    }
  }
}

module.exports = new EtniaDAO()
