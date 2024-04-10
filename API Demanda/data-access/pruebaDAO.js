

const Prueba = require('../models/prueba')

class PruebaDAO {

  async crearPrueba({ descripcion_prueba,  id_proceso_judicial }) {
    try {
      const prueba = await Prueba.create({ descripcion_prueba, id_proceso_judicial })
      return prueba
    } catch (err) {      console.log(err.message)

      throw err
    }
  }

  async obtenerPruebas() {
    try {
      const pruebas = await Prueba.findAll()
      return pruebas
    } catch (err) {
      throw err
    }
  }

  async obtenerPrueba(id_prueba) {
    try {
      const prueba = await Prueba.findByPk(id_prueba)
      return prueba
    } catch (err) {
      throw err
    }
  }

  async obtenerPruebasPorProcesoJudicial(id_proceso_judicial) {
    try {
      const prueba = await Prueba.findAll({ where: { id_proceso_judicial: id_proceso_judicial } })
      return prueba
    } catch (err) {
      throw err
    }
  }

  async actualizarPrueba(id_prueba, { descripcion_prueba , id_proceso_judicial }) {
    try {
      const pruebaActualizado = await Prueba.update({ descripcion_prueba, id_proceso_judicial }, { where: { id_prueba: id_prueba } })
      return pruebaActualizado[0] === 1
    } catch (err) {      console.log(err.message)

      throw err
    }
  }

  async eliminarPrueba(id_prueba) {
    try {
      const prueba = await Prueba.destroy({ where: { id_prueba:id_prueba} })
      return prueba === 1
    } catch (err) {
      throw err
    }
  }
}   

module.exports = new PruebaDAO ()