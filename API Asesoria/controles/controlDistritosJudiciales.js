const modeloDistritoJudicial = require('../modelos/modeloDistritoJudicial.js');


/**
 * @abstract Controlador que permite obtener todos los distritos judiciales
 * @returns {Object} Distritos judiciales
 */
const obtenerDistritosJudiciales = async () => {
    const distritosJudiciales = await modeloDistritoJudicial.DistritoJudicial.findAll({
        
        raw: false,
        nest: true,
        attributes: {
            exclude: ['id_municipio_distrito','id_zona']
        },
        include: [
            modeloDistritoJudicial.MunicipioDistro
            ,
            modeloDistritoJudicial.Zona
        ]
    });
    return distritosJudiciales;
};


/**
 * @abstract Controlador que permite obtener un distrito judicial
 * @param {Number} id Id del distrito judicial
 * @returns {Object} Distrito judicial
 */

const obtenerDistritoJudicial = async (id) => {

    try {
        const distritoJudicial = await modeloDistritoJudicial.DistritoJudicial.findByPk(id,{
         
            raw: false,
            nest: true,
            attributes: {
                exclude: ['id_municipio_distrito','id_zona']
            },
            include: [
                modeloDistritoJudicial.MunicipioDistro
                ,
                modeloDistritoJudicial.Zona
            ]
        });
        return distritoJudicial;
    } catch (error) {
        console.log(error);
    }




};

const obtenerDistritoPorPorIdMiddleware = async (id) => {
    const distritoJudicial = await modeloDistritoJudicial.DistritoJudicial.findByPk(id,{
        raw: false,
        nest: true,
    });
    return distritoJudicial;
}

//Module exports
module.exports = {
    obtenerDistritosJudiciales,
    obtenerDistritoJudicial,
    obtenerDistritoPorPorIdMiddleware
};