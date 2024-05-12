//Esta constante representa el modelo de Estados
const modelEstados = require("../models/estados.models.js");

/**
 * Funcion que obtiene un estado
 * @name getEstado  
 * @function
 * @param {number} id - Identificador del estado
 * @returns {Object} - Objeto con el estado
 * @throws {Error} - Error en la consulta de estado
 */
const getEstado = async (id) => {
  try {
    // Obtenemos un estado
    const estado = await modelEstados.Estado.findOne({
      where: {
        id_estado: id,
      },
      raw: false,
      nest: true,
      include: [
        {
          model: modelEstados.Municipio,
          required: true,
        },
      ],
    });
    if (!estado) {
      return null;
    }
    // Creamos un arreglo con los municipios del estado 
    const municipios = [];
    // Iteramos sobre los municipios para obtener sus nombres y agregarlos al arreglo
    for (const municipio of estado.municipios) {
      // Obtenemos el municipio
      municipios.push(municipio);
//      municipios.push(municipio.nombre_municipio);
    }
    // Creamos un objeto con el estado y sus municipios
    const result = {
      id_estado: estado.id_estado,
      nombre_estado: estado.nombre_estado,
      municipios: municipios,
    };
    // Retornamos el objeto
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
 // Exportamos las funciones
module.exports = {
  getEstado,
};