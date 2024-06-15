const controlMotivos = require('../controles/controlMotivo');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio  que permite agregar un motivo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivo agregado a la base de datos
 * */
const agregarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.agregarMotivo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un motivo', 400);
    return next(error);
  } else {

    res.status(201).json({
        motivo: result
    });
  }
});


/**
 *  
 *  @abstract Servicio  que permite obtener todos los motivos
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivos de la base de datos
 */

const obtenerMotivos = asyncError(async (req, res, next) => {

  const activo = req.query.activo;
  if (activo !== undefined && activo !== null && activo !== "") {
    const result = await controlMotivos.obtenerMotivos(activo);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron motivos', 404);
      return next(error);
    } else {
  
      res.status(200).json({
          motivos: result
      });
    }

  }else {

    const result = await controlMotivos.obtenerMotivos();
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron motivos', 404);
      return next(error);
    } else {
  
      res.status(200).json({
          motivos: result
      });
    }
  }



});


/**
 * @abstract Servicio  que permite actualizar un motivo
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivo actualizado en la base de datos
 */
const actualizarMotivo = asyncError(async (req, res, next) => {
  const result = await controlMotivos.actualizarMotivo(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el motivo', 400);
    return next(error);
  } else {
    res.status(200).json({
        motivo: req.body
    });
  }
});

/**
 *  @abstract Servicio  que permite obtener un motivo por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} motivo de la base de datos
 */
const obtenerMotivoPorId = asyncError(async (req, res, next) => {
  const result = await controlMotivos.obtenerMotivoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el motivo', 404);
    return next(error);
  } else {

    res.status(200).json({
        motivo: result
    });
  }
});



const obtenerMotivosPaginacion = asyncError(async (req, res, next) => {
  const pagina = req.query.pagina;
  const total = req.query.total;
  if (total === "true") {
    const result = await controlMotivos.obtenerTotalMotivos();
    if (result === null || result === undefined) {
      const error = new CustomeError('Error al obtener el total de motivos', 404);
      return next(error);
    } else {
      res.status(200).json({
        totalMotivos: result
      });
    }

  } else {
    const result = await controlMotivos.obtenerMotivosPaginacion(pagina);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('Error al obtener los motivos', 404);
      return next(error);
    } else {

      res.status(200).json({
        motivos: result
      });
    }
  }
} );


//Module exports
module.exports = {
  agregarMotivo,
  obtenerMotivos,
  actualizarMotivo,
  obtenerMotivoPorId,
  obtenerMotivosPaginacion
};