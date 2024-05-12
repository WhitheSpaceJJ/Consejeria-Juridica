


const Resolucion = require('../models/resolucion')

class ResolucionDAO {

/**
 * Método que permite crear una resolución en la base de datos
 * @param {object} resolucion - Objeto que contiene los datos de la resolución
 * @returns {object} Retorna el objeto de la resolución creada si la operación fue exitosa, de lo contrario lanza un error
 * */


    async crearResolucion({ id_proceso_judicial, resolucion, fecha_resolucion }) {
        try {
            const resolucionCreda = await Resolucion.create({ id_proceso_judicial, resolucion, fecha_resolucion })
            return resolucionCreda
        } catch (err) {      console.log(err.message)

            throw err
        }
    }

 

    /**
     * Método que permite obtener una resolución de la base de datos por su id
     * @param {number} id_resolucion - ID de la resolución a obtener
     * @returns {object} Retorna el objeto de la resolución si la operación fue exitosa, de lo contrario lanza un error
     * */

    async obtenerResolucion(id_resolucion) {
        try {
            const resolucion = await Resolucion.findByPk(id_resolucion)
            return resolucion
        } catch (err) {
            throw err
        }
    }
/**
 * Método que permite obtener todas las resoluciones de un proceso judicial
 * @param {number} id_proceso_judicial - ID del proceso judicial a obtener sus resoluciones
 * @returns {array} Retorna un arreglo de objetos de resoluciones si la operación fue exitosa, de lo contrario lanza un error
 * */

    async obtenerResolucionesPorProcesoJudicial(id_proceso_judicial) {
        try {
            const resolucion = await Resolucion.findAll({ where: { id_proceso_judicial: id_proceso_judicial } })
            return resolucion
        } catch (err) {
            throw err
        }
    }

    /**
     * Método que permite actualizar una resolución en la base de datos
     * @param {number} id_resolucion - ID de la resolución a actualizar
     * @param {object} resolucion - Objeto que contiene los datos de la resolución
     * @returns {boolean} Retorna true si la operación fue exitosa, de lo contrario lanza un error
     * */

    async actualizarResolucion(id_resolucion, { resolucion, fecha_resolucion }) {
        try {
            const resolucionActualizado = await Resolucion.update({ resolucion, fecha_resolucion }, { where: { id_resolucion: id_resolucion } })
            return resolucionActualizado[0] === 1 
        } catch (err) {      console.log(err.message)

            throw err
        }
    }

}


module.exports = new ResolucionDAO()