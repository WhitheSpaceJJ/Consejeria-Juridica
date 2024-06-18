


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
   
 

  async obtenerFamiliarPorPromovente(id_promovente, totalBool, pagina) {

    try {
      const limite = 10
      const offset = (parseInt(pagina, 10) - 1) * limite
      const whereClause = { id_promovente: id_promovente }
      if (totalBool) {
        return await Familiar.count({
          raw: false,
          nest: true,
          where: whereClause
        })
      } else {
        const familiares = await Familiar.findAll({
          raw: false,
          nest: true,
          where: whereClause,
          limit: limite,
          offset: offset
        })
        if (familiares.length > 0) {
          return familiares
        } else {
          return null
        }
      }
    } catch (error) {
      throw error
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




}



module.exports = new FamiliarDAO()