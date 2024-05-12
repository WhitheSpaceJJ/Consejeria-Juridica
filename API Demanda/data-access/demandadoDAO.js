const Demandado = require('../models/demandado')

class DemandadoDAO {
  /**
 * @abstract Método que permite crear un demandado en la base de datos
 * @param {object} demandado - Objeto que contiene los datos del demandado
 * @returns {object} Retorna el objeto del demandado creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearDemandado({ id_demandado }) {
    try {
      const demandado = await Demandado.create({ id_demandado })
      return demandado
    } catch (err) {      console.log(err.message)

      throw err
    }
  }


  /**
 * @abstract Método que permite obtener un demandado de la base de datos por su id
 * @param {number} id - ID del demandado a obtener
 * @returns {object} Retorna el objeto del demandado si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerDemandado(id) {
    try {
      const demandado = await Demandado.findByPk(id)
      return demandado
    } catch (err) {
      throw err
    }
  }



}

module.exports = new DemandadoDAO()
