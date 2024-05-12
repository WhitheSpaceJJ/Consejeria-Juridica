const modeloZona = require('../modelos/modeloZona');


/**
 *  @abstract Función que permite obtener todas las zonas
 * @returns zonas
 */
const obtenerZonas = async () => {
  try {
    return await modeloZona.Zona.findAll({
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error zona:", error.message);
    return null;
  }
};

/** 
 * @abstract Función que permite obtener una zona por su id
 * @param {*} id id de la zona
 * @returns zona
 * */
const obtenerZonaPorId = async (id) => {
  try {
    return await modeloZona.Zona.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error zona:", error.message);
    return null;
  }
};


//Module exports:
module.exports = {
  obtenerZonas,
  obtenerZonaPorId,
};