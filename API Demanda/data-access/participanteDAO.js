const Participante = require('../models/participante')
const promventeDAO = require('../data-access/promoventeDAO')
const imputadoDAO = require('../data-access/imputadoDAO')
const domicilioDAO = require('../data-access/domicilio_participanteDAO')
class ParticipanteDAO {
  /**
 * @abstract Método que permite crear un participante en la base de datos
 * @param {object} participante - Objeto que contiene los datos del participante
 * @returns {object} Retorna el objeto del participante creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearParticipante({ nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial   }) {
    try {
      const participante = await Participante.create({ nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial })
      return participante
    } catch (err) {      console.log(err.message)

      throw err
    }
  }

  /**
 * @abstract Método que permite obtener todos los participantes de la base de datos
 * @returns {array} Retorna un arreglo de objetos de participantes si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerParticipantes() {
    try {
      const participantes = await Participante.findAll()
      const participantes_obejct =  JSON.parse(JSON.stringify(participantes))
      for (let i = 0; i < participantes_obejct.length; i++) {
        try {
          const promovente = await promventeDAO.obtenerPromovente(participantes_obejct[i].id_participante)
          participantes_obejct[i].promovente = promovente
        } catch (err) {
        }
        try {
          const imputado = await imputadoDAO.obtenerImputado(participantes_obejct[i].id_participante)
          participantes_obejct[i].imputado = imputado
        } catch (err) {
        }
        const domicilio = await domicilioDAO.obtenerDomicilioParticipantePorParticipante(participantes_obejct[i].id_participante)
        participantes_obejct[i].domicilio = domicilio
      }
      return participantes_obejct
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite obtener un participante de la base de datos por su id
 * @param {number} id - ID del participante a obtener
 * @returns {object} Retorna el objeto del participante si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerParticipante(id) {
    try {
      const participante = await Participante.findByPk(id)
       const participante_obejct =  JSON.parse(JSON.stringify(participante))
       try {
         const promovente = await promventeDAO.obtenerPromovente(participante_obejct.id_participante)
         participante_obejct.promovente = promovente
      
        } catch (err) {
        } 
        try {
          const imputado = await imputadoDAO.obtenerImputado(participante_obejct.id_participante)
          participante_obejct.imputado = imputado
        } catch (err) {
        }
        const domicilio = await domicilioDAO.obtenerDomicilioParticipantePorParticipante(participante_obejct.id_participante)
        participante_obejct.domicilio = domicilio
      return participante_obejct
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un participante en la base de datos
 * @param {number} id_participante - ID del participante a actualizar
 * @param {object} participante - Objeto que contiene los nuevos datos del participante
 * @returns {object} Retorna el objeto del participante actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarParticipante(id_participante, {nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial }) {
    try {
      const participante = await Participante.update({ nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial }, { where: { id_participante } })
      return participante[0] === 1 
    } catch (err) {      console.log(err.message)

      throw err
    }
  }
  async obtenerParticipantesPorProcesoJudicial(id_proceso_judicial) {
    try {
      const participantes = await Participante.findAll({ where: { id_proceso_judicial :id_proceso_judicial} })
      const participantes_obejct =  JSON.parse(JSON.stringify(participantes))
      for (let i = 0; i < participantes_obejct.length; i++) {
        try {
          const promovente = await promventeDAO.obtenerPromovente(participantes_obejct[i].id_participante)
          participantes_obejct[i].promovente = promovente
        } catch (err) {
        }
        try {
          const imputado = await imputadoDAO.obtenerImputado(participantes_obejct[i].id_participante)
          participantes_obejct[i].imputado = imputado
        } catch (err) {
        }
        const domicilio = await domicilioDAO.obtenerDomicilioParticipantePorParticipante(participantes_obejct[i].id_participante)
        participantes_obejct[i].domicilio = domicilio
      }
      return participantes_obejct
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un participante de la base de datos
 * @param {number} id - ID del participante a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarParticipante(id) {
    try {
      const participante = await Participante.destroy( { where: { id_participante: id } })
      return participante === 1
    } catch (err) {
      throw err
    }
  }
}

module.exports = new ParticipanteDAO()
