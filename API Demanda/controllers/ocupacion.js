const ocupacionDAO = require('../data-access/ocupacionDAO')

/**
 * @abstract Método que permite obtener todas las ocupaciones
 * @returns {array} Retorna un arreglo de objetos de ocupaciones si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerOcupaciones = async (req, res) => {
  try {
    const activo = req.query.activo;
    if (activo !== undefined && activo !== null && activo !== "") {
    const ocupaciones = await ocupacionDAO.obtenerOcupaciones(activo)
    if (ocupaciones === null || ocupaciones === undefined ||  ocupaciones.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron ocupaciones'
      });
    }
    res.json(ocupaciones)
  }else{
    const ocupaciones = await ocupacionDAO.obtenerOcupaciones()
    if (ocupaciones === null || ocupaciones === undefined || ocupaciones.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron ocupaciones'
      });
    }
    res.json(ocupaciones)
  }
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite obtener una ocupación por su id
 * @param {number} id - ID de la ocupación a obtener
 * @returns {object} Retorna el objeto de la ocupación si la operación fue exitosa, de lo contrario lanza un error
 */
const obtenerOcupacion = async (req, res) => {
  try {
    const { id } = req.params
    const ocupacion = await ocupacionDAO.obtenerOcupacion(Number(id))
    if (ocupacion === null || ocupacion === undefined) {
      return res.status(404).json({
        message: 'Ocupación no encontrada'
      });
    }
    res.json(ocupacion)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite crear una ocupación
 * @param {object} ocupacion - Objeto que contiene los datos de la ocupación
 * @returns {object} Retorna el objeto de la ocupación creada si la operación fue exitosa, de lo contrario lanza un error
 */
const crearOcupacion = async (req, res) => {
  try {
    const { descripcion_ocupacion, estatus_general } = req.body

    const ocupacion = await ocupacionDAO.crearOcupacion({ descripcion_ocupacion, estatus_general })

    res.json(ocupacion)
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}

/**
 * @abstract Método que permite actualizar una ocupación
 * @param {object} ocupacion - Objeto que contiene los datos de la ocupación
 * @returns {object} Retorna el objeto de la ocupación actualizada si la operación fue exitosa, de lo contrario lanza un error
 */
const actualizarOcupacion = async (req, res) => {
  try {
    const { id } = req.params
    const { descripcion_ocupacion } = req.body
    const { estatus_general } = req.body
    const result = await ocupacionDAO.actualizarOcupacion(Number(id), {
      descripcion_ocupacion,
      estatus_general
    })
    if (!result) {
      return res.status(404).json({
        message: 'No se encontró la ocupación a actualizar'
      })
    }
    else {
      const ocupacion = await ocupacionDAO.obtenerOcupacion(Number(id))
      res.status(200).json(ocupacion)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al realizar la consulta con bd'
    })
  }
}



module.exports = {
  obtenerOcupaciones,
  crearOcupacion,
  obtenerOcupacion,
  actualizarOcupacion,
}
