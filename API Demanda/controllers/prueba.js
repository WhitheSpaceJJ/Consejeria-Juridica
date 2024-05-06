

  const PruebaDAO = require('../data-access/pruebaDAO')

  /** 
   * Función que permite crear una prueba
   * @param {Object} req Objeto de petición
   *  @param {Object} res Objeto de respuesta
   * @returns {Object} Objeto con la prueba creada
   * */
  
 
    const crearPrueba = async (req, res) => {
      try {
        const { descripcion_prueba,  id_proceso_judicial } = req.body
        const prueba = await PruebaDAO.crearPrueba({
          descripcion_prueba,
          id_proceso_judicial
        })
        res.json(prueba)
      } catch (error) {
        res.status(500).json({
          message:error.message
        })
      }
    }

    /**
     * Función que permite obtener todas las pruebas
     * @param {Object} req Objeto de petición
     * @param {Object} res Objeto de respuesta
     * @returns {Array} Array con todas las pruebas registradas
     * */

    const obtenerPruebas = async (req, res) => {
      try {
        const pruebas = await PruebaDAO.obtenerPruebas()
         if(pruebas !== null && pruebas !== undefined && pruebas.length > 0){
           res.status(200).json(pruebas)
          }else{
            res.status(404).json({
              message: 'No hay pruebas registradas'
            })
          }

      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    }

    
    /**
     * Función que permite obtener una prueba por su id
     * @param {Object} req Objeto de petición
     * @param {Object} res Objeto de respuesta
     * @returns {Object} Objeto con la prueba encontrada
     * */

    const obtenerPrueba = async (req, res) => {
      try {
        const { id } = req.params
        const prueba = await PruebaDAO.obtenerPrueba(Number(id))
        if(prueba===null || prueba===undefined){
          res.status(404).json({
            message: 'Prueba no encontrada'
          })
        }else{
          res.status(200).json(prueba)
        }
        
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    }
/**
 * Función que permite actualizar una prueba
 * @param {Object} req Objeto de petición
 * @param {Object} res Objeto de respuesta
 * @returns {Object} Objeto con la prueba actualizada
 * */


    const actualizarPrueba = async (req, res) => {
      try {
        const { id } = req.params
        const { descripcion_prueba , id_proceso_judicial } = req.body
       const result= await PruebaDAO.actualizarPrueba(Number(id), {
         descripcion_prueba,id_proceso_judicial
        })
        if (result) {
          const actualizado = await PruebaDAO.obtenerPrueba(Number(id))
          res.status(201).json(actualizado)
        } else {
          res.status(500).json({
            message: error.message
          })
        }
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    }

    /**
     * Función que permite eliminar una prueba
     * @param {Object} req Objeto de petición
     * @param {Object} res Objeto de respuesta
     * @returns {Object} Objeto con la prueba eliminada
     * */

    const eliminarPrueba = async (req, res) => {
      try {
        const { id } = req.params
        const prueba = await PruebaDAO.eliminarPrueba(Number(id))
        if (prueba) {
          res.status(200).json({
            message: 'Prueba eliminada'
          })
        } else {
          res.status(500).json({
            message: 'Error al eliminar la prueba'
          })
        }
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
    }

    // Exportar todas las funciones
    module.exports = {
      crearPrueba,
      obtenerPruebas,
      obtenerPrueba,
      actualizarPrueba,
      eliminarPrueba
    }

