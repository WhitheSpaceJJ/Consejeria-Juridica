


const Familiar = require('../models/familiar')

class FamiliarDAO {
  /**  
   * Método que permite crear un familiar en la base de datos
   * @param {object} familiar - Objeto que contiene los datos del familiar
   * @returns {object} Retorna el objeto del familiar creado si la operación fue exitosa, de lo contrario lanza un error
   * */


  async crearFamiliar({  nombre, nacionalidad, 
    parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, 
    pobrezaExtrema, id_promovente }) {
    try {
      const familiar = await Familiar.create({ nombre, nacionalidad, parentesco, 
        perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema, id_promovente })
      return familiar
    } catch (err) {
      console.log(err.message)
      throw err
    }
  }
  /**
   * Método que permite actualizar un familiar en la base de datos
   * @param {number} id_familiar - ID del familiar a actualizar
   * @param {object} familiar - Objeto que contiene los datos del familiar
   * @returns {boolean} Retorna true si la operación fue exitosa, de lo contrario lanza un error
   * */
  
  
  async actualizarFamiliar(id_familiar, { nombre, nacionalidad, parentesco, perteneceComunidadLGBT, 
    adultaMayor, saludPrecaria, pobrezaExtrema, id_promovente }) {
    try {
      const familiar = await Familiar.update({  nombre, nacionalidad, parentesco, perteneceComunidadLGBT,
         adultaMayor, saludPrecaria, pobrezaExtrema, id_promovente }, { where: { id_familiar: id_familiar } })
      return familiar[0] === 1
    } catch (err) {
      console.log(err.message)
      throw err
    }
  }

  /**
   * Método que permite obtener todos los familiares de la base de datos
   * @returns {Array} Retorna un array con todos los familiares registrados si la operación fue exitosa, de lo contrario lanza un error
   * */

  async obtenerFamiliars() {
    try {
      const familiars = await Familiar.findAll()
      return familiars
    } catch (err) {
      throw err
    }
  }


  async obtenerFamiliar(id) {
    try {
      const familiar = await Familiar.findByPk(id)
      return familiar
    } catch (err) {
      throw err
    }
  }


  async obtenerFamiliarPorPromovente(idPromovente) {
    try {
      const familiar = await Familiar.findAll({ where: { id_promovente: idPromovente } })
      return familiar
    } catch (err) {
      throw err
    }
  }


 


  async eliminarFamiliar(id_familiar) {
    try {
      const familiar = await Familiar.destroy({ where: { id_familiar: id_familiar } })
      return familiar === 1
    } catch (err) {
      throw err
    }
  }
}



module.exports = new FamiliarDAO()