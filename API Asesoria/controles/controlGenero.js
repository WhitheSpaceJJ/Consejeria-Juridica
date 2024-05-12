
const modeloGenero = require('../modelos/modeloGenero');


/**
 *  @abstract Función que permite obtener todos los generos
 * @returns generos
 */
const obtenerGeneros = async (activo) => {
  try {
    if (activo !== undefined && activo !== null && activo !== "") {
      return await modeloGenero.Genero.findAll({
        raw: true,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });
    }else {
    return await modeloGenero.Genero.findAll({
      raw: true,
      nest: true,
    });

    }
  } catch (error) {
    console.log("Error generos:", error.message);
    return null;
  }
};


/**
 *  
 * @abstract Función que permite obtener un genero por su id
 * @param {*} id id del genero
 * @returns genero
 * */
const obtenerGeneroPorId = async (id) => {
  try {
    return await modeloGenero.Genero.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error generos:", error.message);
    return null;
  }
};

/**
 *  @abstract Función que permite agregar un genero
 * @param {*} genero genero a agregar 
 * @returns genero si se agrega correctamente, false si no  agregar
 * */
const agregarGenero = async (genero) => {
  try {
    return (await modeloGenero.Genero.create(genero, { raw: true, nest: true })).dataValues; 
  } catch (error) {
    console.log("Error generos:", error.message);
    return false;
  }
};


/**
 * @abstract Función que permite actualizar un genero
 * @param {*} genero genero a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarGenero = async (genero) => {
  try {
    const result = await modeloGenero.Genero.update(genero, { where: { id_genero: genero.id_genero } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error generos:", error.message);
    return false;
  }
};


/** Operaciones Requeridas */

module.exports = {
  obtenerGeneros,
  obtenerGeneroPorId,
  agregarGenero,
  actualizarGenero
};