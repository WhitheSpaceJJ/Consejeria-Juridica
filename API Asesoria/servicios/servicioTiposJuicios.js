
const controlTiposDeJuicio = require('../controles/controlTipoJuicio');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");



/**
 * @abstract Servicio  que permite agregar un tipo de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de juicio agregado a la base de datos
 * */

const agregarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.agregarTipoDeJuicio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un tipo de juicio', 400);
    return next(error);
  } else {

    res.status(201).json({
      tipoDeJuicio: result
    });
  }
});


/**
 *  
 * @abstract Servicio  que permite obtener todos los tipos de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipos de juicio de la base de datos
 */

const obtenerTiposDeJuicio = asyncError(async (req, res, next) => {

  const activo = req.query.activo;
  if (activo !== undefined && activo !== null && activo !== "") {
    const result = await controlTiposDeJuicio.obtenerTiposDeJuicio(activo);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron tipos de juicio', 404);
      return next(error);
    } else {

      res.status(200).json({
        tiposDeJuicio: result
      });
    }
  } else {
    const result = await controlTiposDeJuicio.obtenerTiposDeJuicio(null);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron tipos de juicio', 404);
      return next(error);
    } else {

      res.status(200).json({
        tiposDeJuicio: result
      });
    }
  }
});


/**
 * @abstract Servicio  que permite actualizar un tipo de juicio
 * @param {Object} req Request
 * @param {Object} res Response
 * 
 *  @param {Object} next Next
 * @returns {Object} tipo de juicio actualizado
 */

const actualizarTipoDeJuicio = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.actualizarTipoDeJuicio(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el tipo de juicio', 400);
    return next(error);
  } else {

    res.status(200).json({
      tipoDeJuicio: req.body
    });
  }
});

/**
 *  
 * @abstract Servicio  que permite obtener un tipo de juicio por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} tipo de juicio de la base de datos
 */

const obtenerTipoDeJuicioPorId = asyncError(async (req, res, next) => {
  const result = await controlTiposDeJuicio.obtenerTipoDeJuicioPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el tipo de juicio', 404);
    return next(error);
  } else {

    res.status(200).json({
      tipoDeJuicio: result
    });
  }
});


const obtenerTiposDeJuicioPaginacion = asyncError(async (req, res, next) => {
  const pagina = req.query.pagina;
  const total = req.query.total;
  if (total === "true") { 
       const result = await controlTiposDeJuicio.obtenerTotalTiposDeJuicio();
    if (result === null || result === undefined) {
      const error = new CustomeError('Error al obtener el total de tipos de juicio', 404);
      return next(error);
    } else {
      res.status(200).json({
        totalTiposDeJuicio: result
      });
    }

  } else {
    const result = await controlTiposDeJuicio.obtenerTiposDeJuicioPaginacion(pagina);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('Error al obtener los tipos de juicio', 404);
      return next(error);
    } else {

      res.status(200).json({
        tiposDeJuicio: result
      });
    }
  }
}
);

//Module exports
module.exports = {
  agregarTipoDeJuicio,
  obtenerTiposDeJuicio,
  actualizarTipoDeJuicio,
  obtenerTipoDeJuicioPorId,
  obtenerTiposDeJuicioPaginacion
};