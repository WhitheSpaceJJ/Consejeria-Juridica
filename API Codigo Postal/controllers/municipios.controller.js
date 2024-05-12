//Constante que representa el modelo de Municipios
const modelMunicipios = require('../models/municipios.models');

/**
 * Funcion que obtiene un municipio
 * @name getMunicipio
 * @function
 * @param {number} id - Identificador del municipio
 * @returns {Object} - Objeto con el municipio
 * @throws {Error} - Error en la consulta de municipio
 */

const getMunicipio = async (id) => {
    try {
        //Obtenemos un municipio
        return await modelMunicipios.Municipio.findOne({
            raw: true,
            where: {
                id_municipio: id
            },
            attributes:{
                exclude:['id_estado']
            },
            nest: true,
            include: [modelMunicipios.Estado]
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error en la consulta de municipios');
    }
};

// Exportamos las funciones
module.exports = {
    getMunicipio,
};
