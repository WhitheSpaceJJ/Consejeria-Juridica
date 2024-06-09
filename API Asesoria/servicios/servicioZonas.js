const controlZonas = require('../controles/controlZona');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");



/**
 * @abstract Servicio  que permite obtener todas las zonas
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} zonas  de la base de datos
 */

const obtenerZonas = asyncError(async (req, res, next) => {
  const result = await controlZonas.obtenerZonas();
  if (result === null || result === undefined || result.length === 0) {
    const error = new CustomeError('No se encontraron zonas', 404);
    return next(error);
  } else {

    res.status(200).json({
        zonas: result
    });
  }
});


//Module exports
module.exports = {
  obtenerZonas
};