const modeloEstadoCivil = require('../modelos/modeloEstadoCivil');

/**
 * @abstract Función que permite obtener todos los estados civiles
 * @returns estados civiles
 */
const obtenerEstadosCiviles = async (activo) => {
  try {
    if (activo !== undefined && activo !== null && activo !== "") {
      return await modeloEstadoCivil.EstadoCivil.findAll({
        raw: true,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });
    }else{
    return await modeloEstadoCivil.EstadoCivil.findAll({
      raw: true,
      nest: true,
    });
  }
  } catch (error) {
    console.log("Error estados civiles:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite obtener un estado civil por su id
 * @param {*} id id del estado civil
 * @returns estado civil
 * */
const obtenerEstadoCivilPorId = async (id) => {
  try {
    return await modeloEstadoCivil.EstadoCivil.findByPk(id, {
      raw: false,
      nest: true,
    });
  } catch (error) {
    console.log("Error estados civiles:", error.message);
    return null;
  }
};

const obtenerEstadoCivilPorPorIdMiddleware = async (id) => {
  try {
    return  await modeloEstadoCivil.EstadoCivil.findOne({
      raw: true,
      nest: true,
      where: { id_estado_civil: id, estatus_general: "ACTIVO" }
    });
    
  } catch (error) {
    console.log("Error estados civiles:", error.message);
    return null;
  }
};

/**
 *    @abstract Función que permite agregar un estado civil
 * @param {*} estadoCivil estado civil a agregar
 * @returns estado civil si se agrega correctamente, false si no  agregar
 * */
const agregarEstadoCivil = async (estadoCivil) => {
  try {
    return ( await modeloEstadoCivil.EstadoCivil.create(estadoCivil, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error estados civiles:", error.message);
    return false;
  }
};



/**
 * @abstract Función que permite actualizar un estado civil
 * @param {*} estadoCivil estado civil a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarEstadoCivil = async (estadoCivil) => {
  try {
    const result = await modeloEstadoCivil.EstadoCivil.update(estadoCivil, { where: { id_estado_civil: estadoCivil.id_estado_civil } });
    return result[0] === 1; 
  } catch (error) {
    console.log("Error estados civiles:", error.message);
    return false;
  }
};

  // Module exports:
module.exports = {
  obtenerEstadosCiviles,
  obtenerEstadoCivilPorId,
  agregarEstadoCivil,
  actualizarEstadoCivil, 
  obtenerEstadoCivilPorPorIdMiddleware

};