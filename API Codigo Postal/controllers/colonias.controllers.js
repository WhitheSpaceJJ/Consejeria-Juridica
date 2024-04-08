// Constante que representa el modelo de Colonias
const modelColonias = require("../models/colonias.models");
// Constante que representa el modelo de Codigos Postales
const modeloCodigosPostales = require("../models/codigosPostales.models");
// Constante que representa el modelo de Ciudades
const modeloCiudades = require("../models/ciudades.models");
// Constante que representa el modelo de Municipios
const getMunicipio = require("../controllers/municipios.controller");
//const { get } = require("../routes/colonias.routes");

/**
 * Funcion que obtiene todas las colonias
 * @name getColonias
 * @function
 * @returns {Object} - Objeto con las colonias
 * @throws {Error} - Error en la consulta de colonias
 */
const getColonias = async () => {
  try {
    // Obtenemos todas las colonias
    return await modelColonias.Colonia.findAll({
      raw: true,
      attributes: {
        exclude: ["id_ciudad", "id_codigo_postal"],
      },
      nest: true,
      include: [modelColonias.Ciudad, modelColonias.CodigoPostal],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de colonias");
  }
};

/**
 * Funcion que obtiene una colonia
 * @name getColonia
 * @function
 * @param {number} id - Identificador de la colonia
 * @returns {Object} - Objeto con la colonia
 * @throws {Error} - Error en la consulta de colonia
 */
const getColonia = async (id) => {
  try {
    // Obtenemos una colonia
    const colonia_pre = await modelColonias.Colonia.findOne({
      raw: true,
      where: {
        id_colonia: id,
      },
      attributes: {
        exclude: ["id_ciudad", "id_codigo_postal"],
      },
      nest: true,
      include: [modelColonias.Ciudad, modelColonias.CodigoPostal],
    });

    //console.log(colonia_pre);
    // Obtenemos el id del municipio
    const id_municipio=colonia_pre.codigo_postal.id_municipio;
    //console.log(id_municipio);
    // Obtenemos el municipio
    const municipio=await getMunicipio.getMunicipio(id_municipio); 
    //delete colonia_pre.codigo_postal.id_municipio;  
    // Agregamos el municipio a la colonia
    colonia_pre.municipio=municipio;
    //Agregamos el estado al municipio
    colonia_pre.estado=municipio.estado;

    // Convertimos el objeto a string
    const colonia_str = JSON.stringify(colonia_pre);
    // Convertimos el string a objeto
    const result = JSON.parse(colonia_str);

    // Eliminamos los campos que no necesitamos
    delete result.municipio.estado;
    delete result.codigo_postal.id_municipio;
    delete result.id_colonia;
    delete result.nombre_colonia;

    // Obtenemos la colonia
    const colonia ={id_colonia: colonia_pre.id_colonia, nombre_colonia: colonia_pre.nombre_colonia};
    // Agregamos la colonia al objeto
    result.colonia=colonia;
    //Retornamos el objeto
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de colonias");
  }
};

// Exportamos las funciones
module.exports = {
  getColonias,
  getColonia,
};

