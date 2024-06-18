

const Observacion = require('../models/observacion')

class ObservacionDAO {

   /** 
    * Método que permite crear una observación en la base de datos
    * @param {object} observacion - Objeto que contiene los datos de la observación
    * @returns {object} Retorna el objeto de la observación creada si la operación fue exitosa, de lo contrario lanza un error
    * */


   async crearObservacion({ id_proceso_judicial, observacion }) {
      try {
         const observacionEncontrada = await Observacion.create({ id_proceso_judicial, observacion })
         return observacionEncontrada
      } catch (err) {
         console.log(err.message)

         throw err
      }
   }

   /**
    * Método que permite obtener una observación de la base de datos por su id
    * @param {number} id_observacion - ID de la observación a obtener
    * @returns {object} Retorna el objeto de la observación si la operación fue exitosa, de lo contrario lanza un error
    * */


   async obtenerObservacion(id_observacion) {
      try {
         const observacion = await Observacion.findByPk(id_observacion)
         return observacion
      } catch (err) {
         throw err
      }
   }

   /**
    * Método que permite obtener todas las observaciones de un proceso judicial
    * @param {number} id_proceso_judicial - ID del proceso judicial a obtener sus observaciones
    * @returns {array} Retorna un arreglo de objetos de observaciones si la operación fue exitosa, de lo contrario lanza un error
    * */


   async obtenerObservacionesPorProcesoJudicial(id_proceso_judicial, totalBool, pagina) {

      try {
         const limite = 10
         const offset = (parseInt(pagina, 10) - 1) * limite
         const whereClause = { id_proceso_judicial: id_proceso_judicial }
         if (totalBool) {
            return await Observacion.count({
               raw: false,
               nest: true,
               where: whereClause
            })
         } else {
            const observaciones = await Observacion.findAll({
               raw: false,
               nest: true,
               where: whereClause,
               limit: limite,
               offset: offset
            })
            if (observaciones.length > 0) {
               return observaciones
            } else {
               return null
            }
         }
      }
      catch (error) {
         throw error
      }
   }
   /** 
    * Método que permite actualizar una observación en la base de datos
    * @param {number} id_observacion - ID de la observación a actualizar
    * @param {object} observacion - Objeto que contiene los datos de la observación
    * @returns {boolean} Retorna true si la operación fue exitosa, de lo contrario lanza un error
    * */

   async actualizarObservacion(id_observacion, { observacion, id_proceso_judicial }) {
      try {
         const observacionActualizado = await Observacion.update({ observacion, id_proceso_judicial }, { where: { id_observacion: id_observacion } })
         return observacionActualizado[0] === 1
      } catch (err) {
         console.log(err.message)

         throw err
      }
   }

}

module.exports = new ObservacionDAO()