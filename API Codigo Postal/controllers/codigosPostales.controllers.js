//Esta modelo representa el Codigo  Postal 
const modelCodigosPostales = require("../models/codigosPostales.models");
// Constante encargada de obtener las colonias o denominado controlador
const getColonias = require("../controllers/colonias.controllers");


/**
 * Funcion que obtiene todos los codigos postales
 * @name getCodigosPostales
 * @function
 * @returns {Object} - Objeto con los codigos postales
 * @throws {Error} - Error en la consulta de codigos postales
 */
const getCodigosPostales = async () => {
  try {
     //  Obtenemos todos los codigos postales
    return await modelCodigosPostales.CodigoPostal.findAll({
      raw: true,
      attributes: {
        exclude: ["id_municipio"],
      },
      nest: true,
      include: [modelCodigosPostales.Municipio],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de codigos postales");
  }
};

/**
 * Funcion que obtiene un codigo postal
 * @name getCodigoPostal
 * @function
 * @param {number} id - Identificador del codigo postal
 * @returns {Object} - Objeto con el codigo postal
 * @throws {Error} - Error en la consulta de codigo postal
 */
const getCodigoPostal = async (id) => {
  try {
    // Obtenemos un codigo postal
    return await modelCodigosPostales.CodigoPostal.findOne({
      raw: true,
      where: {
        id_codigo_postal: id,
      },
      attributes: {
        exclude: ["id_municipio"],
      },
      nest: true,
      include: [modelCodigosPostales.Municipio],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error en la consulta de codigo postal");
  }
};
/**
 *  Funcion que obtiene las colonias por codigo postal
 * @param {*} cp  Codigo Postal
 * @returns  {Object} - Objeto con el codigo postal y sus colonias
 */
const getColoniasByCodigoPostal = async (cp) => {
  try {
     // Obtenemos el codigo postal y sus colonias
    const codigoPostal_pre = await modelCodigosPostales.CodigoPostal.findOne({
      where: {
        codigo_postal: cp,
      },
      raw: false,
      nest: true,
      include: [
        {
          model: modelCodigosPostales.Colonia,
          attributes: {
            exclude: ["id_ciudad", "id_codigo_postal"],
            },
          required: true,
        },
      ],
    });
    // Creamos un arreglo con las colonias del codigo postal
    const colonias = [];
    // Recorremos las colonias
    for (const colonia of codigoPostal_pre.colonias) {
      // Obtenemos la colonia y la agregamos al arreglo
      colonias.push(colonia);
    }
    
    // Obtenemos la colonia
    const id_colonia = colonias[0].id_colonia;
    // Obtenemos la colonia por id
    const colonia = await getColonias.getColonia(id_colonia);
    
    // Eliminamos los campos id_ciudad e id_codigo_postal
    colonias.forEach((colonia) => {
        delete colonia.id_ciudad;
        delete colonia.id_codigo_postal;

    });
    // Realizamos el parseo de los objetos
    const codigoPstal_str = JSON.stringify(codigoPostal_pre);
    const codigoPostal = JSON.parse(codigoPstal_str);

    // Eliminamos los campos id_municipio y colonias
    delete codigoPostal.colonias;
    delete codigoPostal.id_municipio;

    // Realizamos el parseo de los objetos municipio y eliminamos el campo estado
    const municipio_str = JSON.stringify(colonia.municipio);
    const municipio = JSON.parse(municipio_str);
    delete municipio.estado;

    
    // Creamos un objeto con el codigo postal y sus colonias
    const result = {
      //id_codigo_postal: codigoPostal_pre.id_codigo_postal,
      codigo_postal: codigoPostal,//.codigo_postal,
      colonias:  colonias,
      ciudad: colonia.ciudad,
      municipio: municipio,
      estado: colonia.estado,
    };
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

// Exportamos las funciones
module.exports = {
  getCodigosPostales,
  getCodigoPostal,
  getColoniasByCodigoPostal,
};
