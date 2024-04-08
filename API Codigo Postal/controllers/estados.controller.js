//Esta constante representa el modelo de Estados
const modelEstados = require("../models/estados.models.js");

/**
 * Funcion que obtiene todos los estados
 * @name getEstados
 * @function
 * @returns {Object} - Objeto con los estados
 * @throws {Error} - Error en la consulta de estados
 */
const getEstados = async () => { 
  try {
    // Obtenemos todos los estados
    const estados = await modelEstados.Estado.findAll({
      raw: false,
      nest: true,
      include: [
        {
          model: modelEstados.Municipio,
          required: true,
        },
      ],
    });
    // Creamos un arreglo con los estados y sus municipios
    const result = [];
    // Iteramos sobre los estados para obtener sus municipios y agregarlos al arreglo
    for (const estado of estados) { 
      const municipios = []; 
      // Iteramos sobre los municipios para obtener sus nombres y agregarlos al arreglo
      for (const municipio of estado.municipios) { 
        municipios.push(municipio.nombre_municipio);
      }
      // Agregamos el estado y sus municipios al arreglo
      result.push({
        id_estado: estado.id_estado,
        nombre_estado: estado.nombre_estado,
        municipios: municipios,
      });
    }
    // Retornamos el arreglo
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

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

module.exports = {
  getEstados,
  getEstado,
};