const modeloTurno = require('../modelos/modeloTurno');
//Falta relacion de defensor y asesoria y actualizar controles

/**
 * @abstract Función que permite obtener todos los turnos
 * @returns turnos
 */
const obtenerTurnos = async () => {
  try {
    return await modeloTurno.Turno.findAll({
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
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
    return await modeloTurno.Turno.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite agregar un turno
 * @param {*} turno turno a agregar
 * @returns turno si se agrega correctamente, false si no  agregar
 * */
const agregarTurno = async (turno) => {
  try {
    return (await modeloTurno.Turno.create(turno, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error:", error.message);
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
    console.log("Error:", error.message);
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
  const result=   await modeloTurno.Turno.update(turno, { where: { id_turno: turno.id_turno } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error:", error.message);
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
};
