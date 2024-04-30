


const Resolucion = require('../models/resolucion')

class ResolucionDAO {
    async crearResolucion({ id_proceso_judicial, resolucion, fecha_resolucion }) {
        try {
            const resolucionCreda = await Resolucion.create({ id_proceso_judicial, resolucion, fecha_resolucion })
            return resolucionCreda
        } catch (err) {      console.log(err.message)

            throw err
        }
    }

    async obtenerResoluciones() {
        try {
            const resoluciones = await Resolucion.findAll()
            return resoluciones
        } catch (err) {
            throw err
        }
    }

    async obtenerResolucion(id_resolucion) {
        try {
            const resolucion = await Resolucion.findByPk(id_resolucion)
            return resolucion
        } catch (err) {
            throw err
        }
    }

    async obtenerResolucionesPorProcesoJudicial(id_proceso_judicial) {
        try {
            const resolucion = await Resolucion.findAll({ where: { id_proceso_judicial: id_proceso_judicial } })
            return resolucion
        } catch (err) {
            throw err
        }
    }

    async actualizarResolucion(id_resolucion, { resolucion, fecha_resolucion }) {
        try {
            const resolucionActualizado = await Resolucion.update({ resolucion, fecha_resolucion }, { where: { id_resolucion: id_resolucion } })
            return resolucionActualizado[0] === 1 
        } catch (err) {      console.log(err.message)

            throw err
        }
    }

    async eliminarResolucion(id_resolucion) {
        try {
            const resolucion = await Resolucion.destroy({ where: { id_resolucion: id_resolucion } })
            return resolucion === 1
        } catch (err) {
            throw err
        }
    }
}


module.exports = new ResolucionDAO()