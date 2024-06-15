const controlEstados = require('../controles/controlEstadoCivil');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un estado civil
 * @param {Object} req Request  
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} estado civil agregado a la base de datos
 * */
const agregarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.agregarEstadoCivil(req.body);
  if (result === false) {
    const error = new CustomeError('Error al agregar un estado civil', 400);
    return next(error);
  } else {

    res.status(201).json({
        estadoCivil:result
    });
  }
});


/**
 * @abstract Servicio  que permite obtener todos los estados civiles
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} estados civiles de la base de datos
 */

const obtenerEstadosCiviles = asyncError(async (req, res, next) => {

  const activo = req.query.activo;
  if (activo !== undefined && activo !== null && activo !== "") {
    const result = await controlEstados.obtenerEstadosCiviles(activo);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('No se encontraron estados civiles', 404);
      return next(error);
    } else {
  
      res.status(200).json({
          estadosCiviles: result
      });
    }

  }else {
    const result = await controlEstados.obtenerEstadosCiviles();
    if (result === null || result === undefined   || result.length === 0) {
      const error = new CustomeError('No se encontraron estados civiles', 404);
      return next(error);
    } else {
  
      res.status(200).json({
          estadosCiviles: result
      });
    }
    
  }



});


/**
 * @abstract Servicio  que permite actualizar un estado civil
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} estado civil actualizado en la base de datos
 */

const actualizarEstadoCivil = asyncError(async (req, res, next) => {
  const result = await controlEstados.actualizarEstadoCivil(req.body);
  if ( result === false) {
    const error = new CustomeError('Error al actualizar el estado civil', 400);
    return next(error);
  } else {
    res.status(200).json({
        estadoCivil: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un estado civil por id
 * @param {Object} req Request
 * @param {Object} res Response
 *  @param {Object} next Next
 * @returns {Object} estado civil de la base de datos
 */

const obtenerEstadoCivilPorId = asyncError(async (req, res, next) => {
  const result = await controlEstados.obtenerEstadoCivilPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el estado civil', 404);
    return next(error);
  } else {

    res.status(200).json({
        estadoCivil: result
    });
  }
});


 
const obtenerEstadosCivilesPaginacion = asyncError(async (req, res, next) => {
  const pagina = req.query.pagina;
  const total = req.query.total;
  if (total === "true") {  
      const result = await controlEstados.obtenerTotalEstadosCiviles();
    if (result === null || result === undefined) {
      const error = new CustomeError('Error al obtener el total de estados civiles', 404);
      return next(error);
    } else {
      res.status(200).json({
        totalEstadosCiviles: result
      });
    }

  } else {
    const result = await controlEstados.obtenerEstadosCivilesPaginacion(pagina);
    if (result === null || result === undefined || result.length === 0) {
      const error = new CustomeError('Error al obtener los estados civiles', 404);
      return next(error);
    } else {

      res.status(200).json({
        estadosCiviles: result
      });
    }
  }
} 
);

//Module exports
module.exports = {
  agregarEstadoCivil,
  obtenerEstadosCiviles,
  actualizarEstadoCivil,
  obtenerEstadoCivilPorId,
  obtenerEstadosCivilesPaginacion
};