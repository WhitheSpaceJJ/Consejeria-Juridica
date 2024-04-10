

const Observacion = require('../models/observacion')

class ObservacionDAO {

   async crearObservacion({ id_proceso_judicial, observacion }) {
      try {
         const observacionEncontrada = await Observacion.create({ id_proceso_judicial, observacion })
         return observacionEncontrada
      } catch (err) {      console.log(err.message)

         throw err
      }
   }

   async obtenerObservaciones() {
      try {
         const observaciones = await Observacion.findAll()
         return observaciones
      } catch (err) {
         throw err
      }
   }

   async obtenerObservacion(id_observacion) {
      try {
         const observacion = await Observacion.findByPk(id_observacion)
         return observacion
      } catch (err) {
         throw err
      }
   }

   async obtenerObservacionesPorProcesoJudicial(id_proceso_judicial) {
      try {
         const observacion = await Observacion.findAll({ where: { id_proceso_judicial: id_proceso_judicial } })
         return observacion
      } catch (err) {
         throw err
      }
   }

   async actualizarObservacion(id_observacion, { observacion, id_proceso_judicial }) {
      try {
         const observacionActualizado = await Observacion.update({ observacion,  id_proceso_judicial }, { where: { id_observacion: id_observacion } })
         return observacionActualizado[0] === 1
      } catch (err) {      console.log(err.message)

         throw err
      }
   }

   async eliminarObservacion( id_observacion) {
      try {
         const observacion = await Observacion.destroy({ where: { id_observacion: id_observacion } })
         return observacion === 1
      } catch (err) {
         throw err
      }
   }
}

module.exports = new ObservacionDAO()