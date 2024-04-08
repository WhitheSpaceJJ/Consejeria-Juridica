
const modeloTipoJuicio = require('../modelos/modeloTipoJuicio');


/**
 * 
 * @abstract Función que permite obtener todos los tipos de juicio
 * @returns tipos de juicio
 */
const obtenerTiposDeJuicio = async (activo) => {
  try {
    if(activo !== undefined && activo !== null && activo !== ""){
      return await modeloTipoJuicio.TipoJuicio.findAll({
        raw: false,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });
    }else {
      return await modeloTipoJuicio.TipoJuicio.findAll({
        raw: false,
        nest: true
      });
    }
   
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return null;
  }
};

  
/**
 * @abstract Función que permite obtener un tipo de juicio por su id
 * @param {*} id id del tipo de juicio
 * @returns tipo de juicio  
 *  */  
const obtenerTipoDeJuicioPorId = async (id) => {
  try {
    return await modeloTipoJuicio.TipoJuicio.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite agregar un tipo de juicio
 * @param {*} tipoDeJuicio tipo de juicio a agregar
 * @returns tipo de juicio si se agrega correctamente, false si no  agregar
 * */
const agregarTipoDeJuicio = async (tipoDeJuicio) => {
  try {
    return (await modeloTipoJuicio.TipoJuicio.create(tipoDeJuicio, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un tipo de juicio
 * @param {*} id id del tipo de juicio a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 *  */
const eliminarTipoDeJuicio = async (id) => {
  try {
   const result= await modeloTipoJuicio.TipoJuicio.destroy({ where: { id_tipo_juicio: id } });
    return result === 1;
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite actualizar un tipo de juicio
 * @param {*} tipoDeJuicio tipo de juicio a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarTipoDeJuicio = async (tipoDeJuicio) => {
  try {
    const result = await modeloTipoJuicio.TipoJuicio.update(tipoDeJuicio, { where: { id_tipo_juicio: tipoDeJuicio.id_tipo_juicio } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return false;
  }
};

// Module exports
module.exports = {
  obtenerTiposDeJuicio,
  obtenerTipoDeJuicioPorId,
  agregarTipoDeJuicio,
  eliminarTipoDeJuicio,
  actualizarTipoDeJuicio
};