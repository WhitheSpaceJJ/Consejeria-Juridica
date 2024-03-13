const modeloDistritoJudicial = require('../modelos/modeloDistritoJudicial.js');

/**
 * @abstract Controlador que permite agregar un distrito judicial
 * @param {Object} distritoJudicial Distrito judicial
 * @returns {Object} Distrito judicial
 */
const agregarDistritoJudicial = async (distritoJudicial) => {
    const distritoJudicialNuevo = await modeloDistritoJudicial.DistritoJudicial.create(distritoJudicial);
    return distritoJudicialNuevo;
};

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
 * @abstract Controlador que permite eliminar un distrito judicial
 * @param {Number} id Id del distrito judicial
 * @returns {Object} Distrito judicial
 */
const eliminarDistritoJudicial = async (id) => {
    const result = await modeloDistritoJudicial.DistritoJudicial.destroy({
        where: {
            id_distrito_judicial: id
        }
    });
    return result === 1;
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

/**
 * @abstract Controlador que permite actualizar un distrito judicial
 *  @param {Number} id Id del distrito judicial
 * @param {Object} distritoJudicial Distrito judicial
 * @returns {Object} Distrito judicial
 */
const actualizarDistritoJudicial = async (id, distritoJudicial) => {
    const result = await modeloDistritoJudicial.DistritoJudicial.update(distritoJudicial, {
        where: {
            id_distrito_judicial: id
        }
    });
    return result[0] === 1;
};

//Module exports
module.exports = {

    agregarDistritoJudicial,
    obtenerDistritosJudiciales,
    eliminarDistritoJudicial,
    obtenerDistritoJudicial,
    actualizarDistritoJudicial
};