const controlTurnos = require('../controles/controlTurno');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");



/**
 *   
 * @abstract Servicio  que permite obtener todos los turnos
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} turnos de la base de datos
 */

const obtenerTurnos = asyncError(async (req, res, next) => {
  let { id_defensor, id_distrito_judicial, total, pagina } = req.query;
  const totalBool = total === 'true';

  try {
    id_defensor = parseInt(id_defensor, 10) || null;
    id_distrito_judicial = parseInt(id_distrito_judicial, 10) || null;
    const result = await controlTurnos.obtenerTurnos(id_defensor || null, id_distrito_judicial || null, totalBool, pagina);

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return next(new CustomeError('No se encontraron turnos', 404));
    }

    const responseKey = totalBool ? 'totalTurnos' : 'turnos';
    res.status(200).json({ [responseKey]: result });
  } catch (error) {
    return next(error);
  }
});


/**
 * @abstract Servicio  que permite actualizar un turno
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * @returns {Object} turno actualizado en la base de datos
 */
const actualizarTurno = asyncError(async (req, res, next) => {
  const result = await controlTurnos.actualizarTurno(req.body);
  if (result === false) {
    const error = new CustomeError('Error al actualizar el turno', 400);
    return next(error);
  } else {

    res.status(200).json({
      turno: req.body
    });
  }
});

/**
 * @abstract Servicio  que permite obtener un turno por id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object} turno de la base de datos
 */

const obtenerTurnoPorId = asyncError(async (req, res, next) => {
  const result = await controlTurnos.obtenerTurnoPorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el turno', 404);
    return next(error);
  } else {

    res.status(200).json({
      turno: result
    });
  }
});

const obtenerTurnoPorDefensorId = asyncError(async (req, res, next) => {
  const result = await controlTurnos.obtenerTurnoPorDefensorId(req.params.id);
  if (result === null || result === undefined) {
    const error = new CustomeError('Error al obtener el turno', 404);
    return next(error);
  } else {

    res.status(200).json({
      turnos: result
    });
  }
});

//Module exports
module.exports = {
  obtenerTurnos,
  actualizarTurno,
  obtenerTurnoPorId,
  obtenerTurnoPorDefensorId
};
