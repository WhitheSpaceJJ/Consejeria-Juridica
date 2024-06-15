const etniaDAO = require('../data-access/etniaDAO')

/**
 * @abstract Método que permite obtener todas las etnias
 * @returns {array} Retorna un arreglo de objetos de etnias si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEtnias = async (req, res) => {
  try {
    const activo = req.query.activo;
    if (activo !== undefined && activo !== null && activo !== "") {
      const etnias = await etniaDAO.obtenerEtnias(activo)
      if ( etnias === null || etnias === undefined ||  etnias.length === 0) {
        return res.status(404).json({
          message: 'No se encontraron etnias'
        });
      }
      res.json(etnias)
    } else {
      const etnias = await etniaDAO.obtenerEtnias()
      if (etnias === null || etnias === undefined ||  etnias.length === 0) {
         return res.status(404).json({
          message: 'No se encontraron etnias'
        });
      }
      res.json(etnias)
    }
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

/**
 * @abstract Método que permite obtener una etnia por su id
 * @param {number} id - ID de la etnia a obtener
 * @returns {object} Retorna el objeto de la etnia si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerEtnia = async (req, res) => {
  try {
    const { id } = req.params
    const etnia = await etniaDAO.obtenerEtnia(Number(id))
    if (etnia === null || etnia === undefined) {
      return res.status(404).json({
        message: 'Etnia no encontrada'
      });
    }
    res.json(etnia)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite crear una etnia
 * @param {object} etnia - Objeto que contiene los datos de la etnia
 * @returns {object} Retorna el objeto de la etnia creada si la operación fue exitosa, de lo contrario lanza un error
 */
const crearEtnia = async (req, res) => {
  try {
    const { nombre, estatus_general } = req.body
    const etnia = await etniaDAO.crearEtnia({ nombre, estatus_general })
    res.json(etnia)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * @abstract Método que permite actualizar una etnia
 * @param {object} etnia - Objeto que contiene los datos de la etnia
 * @returns {object} Retorna el objeto de la etnia actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarEtnia = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, estatus_general } = req.body
    const result = await etniaDAO.actualizarEtnia(Number(id), {
      nombre, estatus_general
    })
    if (!result) {
      return res.status(404).json({
        message: error.message
      })
    } else {
      const actualizado = await etniaDAO.obtenerEtnia(Number(id))
      res.status(200).json(actualizado)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const obtenerEtniasPaginacion = async (req, res) => {
  try {
    const pagina = req.query.pagina;
    const total = req.query.total;
    if (total === "true") {      const result = await etniaDAO.obtenerTotalEtnias();
      if (result === null || result === undefined) {
        return res.status(404).json({
          message: 'Error al obtener el total de etnias'
        });
      } else {
        res.status(200).json({
          totalEtnias: result
        });
      }

    } else {
      const result = await etniaDAO.obtenerEtniasPaginacion(pagina);
      if (result === null || result === undefined || result.length === 0) {
        return res.status(404).json({
          message: 'Error al obtener las etnias'
        });
      } else {

        res.status(200).json({
          etnias: result
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}




module.exports = {
  obtenerEtnias,
  obtenerEtnia,
  crearEtnia,
  actualizarEtnia,
  obtenerEtniasPaginacion
}
