const Promovente = require('../models/promovente')
const etniaDAO = require('../data-access/etniaDAO')
const escolaridadDAO = require('../data-access/escolaridadDAO')
const ocupacionDAO = require('../data-access/ocupacionDAO')
const familiarDAO = require('../data-access/familiarDAO')

class PromoventeDAO {
  /**
 * @abstract Método que permite crear un promovente en la base de datos
 * @param {object} promovente - Objeto que contiene los datos del promovente
 * @returns {object} Retorna el objeto del promovente creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearPromovente({id_promovente, español, id_escolaridad, id_etnia, id_ocupacion }) {
    try {
      const promovente = await Promovente.create({ id_promovente, español, id_escolaridad, id_etnia, id_ocupacion })
      return promovente
    } catch (err) {
      console.log(err.message)
      throw err
    }
  }



  /**
 * @abstract Método que permite obtener un promovente de la base de datos por su id
 * @param {number} id - ID del promovente a obtener
 * @returns {object} Retorna el objeto del promovente si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerPromovente(id) {
    try {
      const promovente = await Promovente.findByPk(id)
      const promvente_obejct =  JSON.parse(JSON.stringify(promovente))  
      const etnia =  await etniaDAO.obtenerEtnia(promvente_obejct.id_etnia)
      const escolaridad =  await escolaridadDAO.obtenerEscolaridadPorId(promvente_obejct.id_escolaridad)
      const ocupacion =  await ocupacionDAO.obtenerOcupacion(promvente_obejct.id_ocupacion)
      const familiares =  await familiarDAO.obtenerFamiliarPorPromovente(promvente_obejct.id_promovente)
      delete promvente_obejct.id_etnia
      delete promvente_obejct.id_escolaridad
      delete promvente_obejct.id_ocupacion    
      promvente_obejct.etnia = etnia
      promvente_obejct.escolaridad = escolaridad
      promvente_obejct.ocupacion = ocupacion
      promvente_obejct.familiares = familiares
      return promvente_obejct
    } catch (err) {
      throw err
    }
  }

 async obtenerPromoventeMiddlware(id) {
    try {
      const promovente = await Promovente.findByPk(id)
      return promovente
    } catch (err) {
      throw err
    }
 }

  /**
 * @abstract Método que permite actualizar un promovente en la base de datos
 * @param {number} idParticipante - ID del participante a actualizar
 * @param {object} promovente - Objeto que contiene los nuevos datos del promovente
 * @returns {object} Retorna el objeto del promovente actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarPromovente(id_promovente_actualizar, { espanol, id_escolaridad, id_etnia, id_ocupacion }) {
    try {
      const promoventeActualizado = await Promovente.update({  espanol, id_escolaridad, id_etnia, id_ocupacion }, { where: { id_promovente: id_promovente_actualizar }  })
      return promoventeActualizado[0] ==1
    } catch (err) {      console.log(err.message)

      throw err
    }
  }


}

module.exports = new PromoventeDAO()
