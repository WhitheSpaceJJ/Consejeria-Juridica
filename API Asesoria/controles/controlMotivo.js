
const modeloMotivo = require('../modelos/modeloMotivo');

/**
 * @abstract Funcion que permite obtener todos los motivos
 * @returns motivos
 */
const obtenerMotivos = async (activo) => {
  try {
    if (activo !== undefined && activo !== null && activo !== "") {
      return await modeloMotivo.Motivo.findAll({
        raw: true,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });

    } else {
      return await modeloMotivo.Motivo.findAll({
        raw: true,
        nest: true,
      });
    }
  } catch (error) {
    console.log("Error motivos:", error.message);
    return null;
  }
};


/**
 * @abstract Funcion que permite obtener un motivo por su id
 * @param {*} id id del motivo
 * @returns motivo
 */
const obtenerMotivoPorId = async (id) => {
  try {
    return await modeloMotivo.Motivo.findByPk(id, {
      raw: false,
      nest: true,
    });
  } catch (error) {
    console.log("Error motivos:", error.message);
    return null;
  }
};

/**
 * @abstract Funcion que permite agregar un motivo
 * @param {*} motivo motivo a agregar
 * @returns motivo si se agrega correctamente, false si no  agregar
 */
const agregarMotivo = async (motivo) => {
  try {
    return (await modeloMotivo.Motivo.create(motivo, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error motivos:", error.message);
    return false;
  }
};

/**
 * @abstract Funcion que permite eliminar un motivo
 * @param {*} id id del motivo a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */
const eliminarMotivo = async (id) => {
  try {
    const result = await modeloMotivo.Motivo.destroy({ where: { id_motivo: id } });
    return result === 1;
  } catch (error) {
    console.log("Error motivos:", error.message);
    return false;
  }
};

/**
 * @abstract Funcion que permite actualizar un motivo
 *  @param {*} motivo motivo a actualizar
 *  @returns true si se actualiza correctamente, false si no se actualiza
 */

const actualizarMotivo = async (motivo) => {
  try {
    const result = await modeloMotivo.Motivo.update(motivo, { where: { id_motivo: motivo.id_motivo } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error motivos:", error.message);
    return false;
  }
};

//Module exports:
module.exports = {
  obtenerMotivos,
  obtenerMotivoPorId,
  agregarMotivo,
  eliminarMotivo,
  actualizarMotivo
};