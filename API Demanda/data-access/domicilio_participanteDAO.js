

const DomicilioParticipante = require('../models/domicilio_participante')

class DomicilioParticipanteDAO {

    async crearDomicilioParticipante({ calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante }) {
        try {
            const domicilioParticipante = await DomicilioParticipante.create({ calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante })
            return domicilioParticipante
        } catch (err) {      console.log(err.message)

            throw err
        }
    }

    async obtenerDomicilioParticipantes() {
        try {
            const domicilioParticipantes = await DomicilioParticipante.findAll()
            return domicilioParticipantes
        } catch (err) {
            throw err
        }
    }

    async obtenerDomicilioParticipante(id) {
        try {
            const domicilioParticipante = await DomicilioParticipante.findByPk(id)
            return domicilioParticipante
        } catch (err) {
            throw err
        }
    }

    async obtenerDomicilioParticipantePorParticipante(id_participante) {
        try {
            const domicilioParticipante = await DomicilioParticipante.findOne({ where: { id_participante: id_participante } })
            return domicilioParticipante
        } catch (err) {
            throw err
        }
    }

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

    async eliminarDomicilioParticipante(id_domicilio) {
        try {
            const domicilioParticipante = await DomicilioParticipante.destroy({ where: { id_domicilio: id_domicilio } })
            return domicilioParticipante === 1
        } catch (err) {
            throw err
        }
    }



}

module.exports = new DomicilioParticipanteDAO()