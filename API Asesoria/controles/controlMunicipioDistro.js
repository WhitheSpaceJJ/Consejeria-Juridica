const modeloMunicipioDistro = require('../modelos/modeloMunicipioDistro.js');

/**
 * @abstract Función que permite obtener todos los municipios
 * @returns  municipios
 * */
const obtenerMunicipios = async () => {
    try {
        return await modeloMunicipioDistro.MunicipioDistro.findAll({
            raw: false,
            nest: true,
        });
    } catch (error) {
        console.log("Error municipios distritos:", error.message);
        return null;
    }
};
const obtenerMunicipiosDistrito = async (id) => {
    try {
        return await modeloMunicipioDistro.MunicipioDistro.findAll({
            where: {
                id_distrito_judicial: id
            },
            raw: false,
            nest: true,
        });
    } catch (error) {
        console.log("Error municipios distritos:", error.message);
        return null;
    }
}

/**
 * @abstract Función que permite obtener un municipio por su id
 * @param {*} id id del municipio
 * @returns municipio
 * */
const obtenerMunicipioPorId = async (id) => {
    try {
        return await modeloMunicipioDistro.MunicipioDistro.findByPk(id, {
            raw: false,
            nest: true,
        });
    } catch (error) {
        console.log("Error municipios distritos:", error.message);
        return null;
    }
};


const obtenerMunicipioDistritoPorPorIdMiddleware = async (id) => {
    const municipio = await modeloMunicipioDistro.MunicipioDistro.findByPk(id,{
        raw: false,
        nest: true,
    });
    return municipio;
};


// Exportar los módulos
module.exports = {
    obtenerMunicipios,
    obtenerMunicipioPorId,
    obtenerMunicipiosDistrito,
    obtenerMunicipioDistritoPorPorIdMiddleware
};