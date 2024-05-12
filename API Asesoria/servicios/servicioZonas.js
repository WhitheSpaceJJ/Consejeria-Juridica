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


/**
 * @abstract Servicio  que permite obtener una zona por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} zona de la base de datos
 */

const obtenerZonaPorId = asyncError(async (req, res, next) => {
  const result = await controlZonas.obtenerZonaPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener la zona', 404);
    return next(error);
  } else {

    res.status(200).json({
        zona: result
    });
  }
});

//Module exports
module.exports = {
  obtenerZonas,
  obtenerZonaPorId
};