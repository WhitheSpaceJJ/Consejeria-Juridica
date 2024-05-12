const modeloDetalleAsesoriaCatalogo = require('../modelos/modeloDetalleAsesoria');


/**
 * @abstract Función que permite obtener un detalle de asesoria por su id
 * @param {*} id id del detalle de asesoria
 * @returns detalle de asesoria
 * */
const obtenerDetalleAsesoriaCatalogoPorId = async (id) => {
  try {
    return await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.findByPk(id, {
      raw: true,
      nest: true
    });
  } catch (error) {
    console.log("Error detalle asesoria:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite agregar un detalle de asesoria
 * @param {*} detalle detalle de asesoria a agregar
 * @returns detalle de asesoria si se agrega correctamente, false si no  agregar
 *  */
const agregarDetalleAsesoriaCatalogo = async (detalle) => {
  try {
    return (await modeloDetalleAsesoriaCatalogo.DetalleAsesoriaCatalogo.create(detalle, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error detalle asesoria:", error.message);
    return false;
  }
};


// Module exports:
module.exports = {
  obtenerDetalleAsesoriaCatalogoPorId,
  agregarDetalleAsesoriaCatalogo,
};
