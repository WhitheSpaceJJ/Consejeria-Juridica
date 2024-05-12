const controlAsesores = require('../controles/controlAsesor');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");



/**
 * @abstract Servicio  que permite obtener todos los asesores
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesores   de la base de datos
 */
const obtenerAsesores = asyncError(async (req, res, next) => {
  
  const activo = req.query.activo;
  if (activo !== undefined && activo !== null && activo !== "") {
    const result = await controlAsesores.obtenerAsesores(activo);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron asesores', 404);
      return next(error);
    } else {
      res.status(200).json({
       
          asesores: result
      });
    }
  }else {
    const result = await controlAsesores.obtenerAsesores();
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron asesores', 404);
      return next(error);
    } else {
      res.status(200).json({
       
          asesores: result
      });
    }
    
  }




});




/**
 *  @abstract Servicio  que permite obtener un asesor por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} asesor  de la base de datos
 */
const obtenerAsesorPorId = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesorPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el asesor', 404);
    return next(error);
  } else {
 
    res.status(200).json({
        asesor: result
    });
  }
});

const obtenerAsesoresZona = asyncError(async (req, res, next) => {
  const result = await controlAsesores.obtenerAsesoresZona(req.params.id);
  if (result === null || result === undefined || result.length === 0) {
    const error = new CustomeError('Error al obtener el asesor', 404);
    return next(error);
  } else {
 
    res.status(200).json({
        asesores: result
    });
  }
}
);
//Module exports  
module.exports = {
  obtenerAsesores,
  obtenerAsesorPorId,
  obtenerAsesoresZona
};
