

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

const obtenerPruebasPorProcesoJudicial = async (req, res) => {
 
  try {
    let { id_proceso_judicial, total, pagina } = req.query;
    const totalBool = total === 'true';
    id_proceso_judicial = parseInt(id_proceso_judicial, 10) || null;
    pagina = parseInt(pagina, 10) || 1;
    const result = await PruebaDAO.obtenerPruebasPorProcesoJudicial(id_proceso_judicial || null, totalBool, pagina);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(404).json({ message: 'No se encontraron pruebas' });
    }
    const responseKey = totalBool ? 'totalPruebas' : 'pruebas';
    res.status(200).json({ [responseKey]: result });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

    

    // Exportar todas las funciones
    module.exports = {
      crearPrueba,
      obtenerPrueba,
      actualizarPrueba,
      obtenerPruebasPorProcesoJudicial
    }

