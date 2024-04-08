const { where } = require('sequelize');
const modeloTurno = require('../modelos/modeloTurno');

//Falta relacion de defensor y asesoria y actualizar controles

/**
 * @abstract Función que permite obtener todos los turnos
 * @returns turnos
 */
const obtenerTurnos = async () => {
  try {
    const controlAsesoria = require('./controlAsesoria');
    const controlDefensor = require('./controlDefensor');

    const turnos = await modeloTurno.Turno.findAll({
      raw: false,
      nest: true,
      where: { estatus_general: "NO_SEGUIMIENTO" },
    });
    const turnos_regreso = [];
    for (let i = 0; i < turnos.length; i++) {
      const turno = JSON.parse(JSON.stringify(turnos[i]));
      const asesoria = await controlAsesoria.obtenerAsesoriaPorId(turno.id_asesoria);
      delete asesoria.turno;
      const defensor = await controlDefensor.obtenerDefensorPorId(turno.id_defensor);
      delete turno.id_asesoria;
      delete turno.id_defensor;
      turno.asesoria = asesoria;
      turno.defensor = defensor;
      turnos_regreso.push(turno);
    }
    return turnos_regreso;
  } catch (error) {
    console.log("Error turno:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite obtener un turno por su id
 * @param {*} id id del turno
 * @returns turno
 */
const obtenerTurnoPorId = async (id) => {
  try {
    const controlAsesoria = require('./controlAsesoria');
    const controlDefensor = require('./controlDefensor');

    const turno_pre = await modeloTurno.Turno.findByPk(id, {
      raw: false,
      nest: true,
    });
    const turno = JSON.parse(JSON.stringify(turno_pre));
    const asesoria = await controlAsesoria.obtenerAsesoriaPorId(turno.id_asesoria);
    delete asesoria.turno;
    const defensor = await controlDefensor.obtenerDefensorPorId(turno.id_defensor);
    delete turno.id_asesoria;
    delete turno.id_defensor;
    turno.asesoria = asesoria;
    turno.defensor = defensor;
    return turno;
  } catch (error) {
    console.log("Error turno:", error.message);
    return null;
  }
};
const obtenerTurnoPorDefensorId = async (id) => {
  try {
    const controlAsesoria = require('./controlAsesoria');
    const controlDefensor = require('./controlDefensor');

    const turno_pre = await modeloTurno.Turno.findAll({
      raw: false,
      nest: true,
      where: { id_defensor: id , estatus_general: "NO_SEGUIMIENTO"},
    });
    const turnos = [];
    for (let i = 0; i < turno_pre.length; i++) {
      const turno = JSON.parse(JSON.stringify(turno_pre[i]));
      const asesoria = await controlAsesoria.obtenerAsesoriaPorId(turno.id_asesoria);
      delete asesoria.turno;
      const defensor = await controlDefensor.obtenerDefensorPorId(turno.id_defensor);
      delete turno.id_asesoria;
      delete turno.id_defensor;
      turno.asesoria = asesoria;
      turno.defensor = defensor;
      turnos.push(turno);
    }
    return turnos;
  } catch (error) {
    console.log("Error turno:", error.message);
    return null;
  }

}

/**
 * @abstract Función que permite agregar un turno
 * @param {*} turno turno a agregar
 * @returns turno si se agrega correctamente, false si no  agregar
 * */
const agregarTurno = async (turno) => {
  try {
    return (await modeloTurno.Turno.create(turno, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error turno:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un turno
 * @param {*} id id del turno a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */
const eliminarTurno = async (id) => {
  try {
    const result = await modeloTurno.Turno.destroy({ where: { id_turno: id } });
    return result === 1;
  } catch (error) {
    console.log("Error turno:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un turno
 * @param {*} turno turno a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarTurno = async (turno) => {
  try {
    console.log("turno", turno);
    const result = await modeloTurno.Turno.update(turno, { where: { id_turno: turno.id_turno } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error turno:", error.message);
    return false;
  }
};

//    Module exports:
module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  agregarTurno,
  eliminarTurno,
  actualizarTurno,
  obtenerTurnoPorDefensorId
};
