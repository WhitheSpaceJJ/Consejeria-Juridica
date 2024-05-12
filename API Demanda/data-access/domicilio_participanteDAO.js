

const DomicilioParticipante = require('../models/domicilio_participante')

class DomicilioParticipanteDAO {
   /**
    * @abstract Método que permite crear un domicilio de un participante en la base de datos
    * @param {object} domicilioParticipante - Objeto que contiene los datos del domicilio de un participante
    * @returns {object} Retorna el objeto del domicilio de un participante creado si la operación fue exitosa, de lo contrario lanza un error
    * */

    async crearDomicilioParticipante({ calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante }) {
        try {
            const domicilioParticipante = await DomicilioParticipante.create({ calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante })
            return domicilioParticipante
        } catch (err) {      console.log(err.message)

            throw err
        }
    }
  

   /**
    * @abstract Método que permite obtener un domicilio de un participante de la base de datos por el id del participante
    * @param {number} id_participante - ID del participante a obtener su domicilio
    * @returns {object} Retorna el objeto del domicilio de un participante si la operación fue exitosa, de lo contrario lanza un error
    * */

    async obtenerDomicilioParticipantePorParticipante(id_participante) {
        try {
            const domicilioParticipante = await DomicilioParticipante.findOne({ where: { id_participante: id_participante } })
            return domicilioParticipante
        } catch (err) {
            throw err
        }
    }
  
    /**
     * @abstract Método que permite actualizar un domicilio de un participante en la base de datos
     * @param {number} id_domicilio - ID del domicilio de un participante a actualizar
     * @param {object} descripcion - Objeto que contiene los nuevos datos del domicilio de un participante
     *  
     * @returns {object} Retorna el objeto del domicilio de un participante actualizado si la operación fue exitosa, de lo contrario lanza un error
     * */


    async actualizarDomicilioParticipante(id_domicilio, { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante }) {
        try {
            const domicilioParticipanteActualizado = await DomicilioParticipante.update({ calle_domicilio, 
                numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante }, { where: { id_domicilio : id_domicilio }   } )
            return domicilioParticipanteActualizado [0] === 1
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

 


}

module.exports = new DomicilioParticipanteDAO()