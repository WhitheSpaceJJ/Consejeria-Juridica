// Constante que representa el modelo de Ciudades
const modelCiudades = require('../models/ciudades.models');

/**
 * Funcion que obtiene todas las ciudades y sus colonias
 * @name getCiudades
 * @function
 * @returns {Object} - Objeto con las ciudades y sus colonias
 */
const getCiudades = async () => {
    try {
        //Obtenemos todas las ciudades y sus colonias
        const ciudades = await modelCiudades.Ciudad.findAll({
            raw: false,
            nest: true,
            include: [{
                model: modelCiudades.Colonia,
                required: true
            },
        ],
        });
        //Creamos un arreglo con las ciudades y sus colonias
        const result =[];
        //Iteramos sobre las ciudades para obtener sus colonias y agregarlas al arreglo
        for (const ciudad of ciudades) {
            const colonias = [];
            for (const colonia of ciudad.colonias) {
                colonias.push(colonia.nombre_colonia);
            }
            result.push({
                id_ciudad: ciudad.id_ciudad,
                nombre_ciudad: ciudad.nombre_ciudad,
                colonias: colonias

            });
        }
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de ciudades');
    }
};

/**
 * Funcion que obtiene una ciudad y sus colonias
 * @name getCiudad
 * @function
 * @param {number} id - Identificador de la ciudad
 * @returns {Object} - Objeto con la ciudad y sus colonias
 */
const getCiudad = async (id) => {
    try {
        //Obtenemos la ciudad y sus colonias
        const ciudad = await modelCiudades.Ciudad.findOne( {
            where: {
                id_ciudad: id,
            },
            raw: false,
            nest: true,
            include: [{
                model: modelCiudades.Colonia,
                required: true
            },
        ],
        });
        //Creamos un arreglo con las colonias de la ciudad
        const colonias = [];
        for (const colonia of ciudad.colonias) {
            colonias.push(colonia.nombre_colonia);
        }
        //Creamos un objeto con la ciudad y sus colonias
        const result = {
            ciudad: ciudad.nombre_ciudad,
            colonias: colonias
        };
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de ciudades');
    }
};

module.exports = {
    getCiudades,
    getCiudad
};







        
