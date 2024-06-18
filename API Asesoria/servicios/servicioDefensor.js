const controlDefensores = require('../controles/controlDefensor');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


/**
 * @abstract Servicio  que permite obtener todos los defensores
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerDefensores = asyncError(async (req, res, next) => {
    const id_distrito_judicial = req.query.id_distrito_judicial;
    const pagina = req.query.pagina;
    const result = await controlDefensores.obtenerDefensores(id_distrito_judicial, pagina);
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron defensores', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensores: result
        });
    }
});




const obtenerDefensoresByDistrito = asyncError(async (req, res, next) => {
    const {id_distrito_judicial,activo }= req.query
    const result = await controlDefensores.obtenerDefensoresByDistrito(id_distrito_judicial, activo);
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron defensores', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensores: result
        });
    }

});
/**
 * @abstract Servicio  que permite obtener un defensor por su id
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerDefensorPorId = asyncError(async (req, res, next) => {
    const result = await controlDefensores.obtenerDefensorPorId(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontró el defensor', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensor: result
        });
    }
}
);


const obtenerDefensoresZona = asyncError(async (req, res, next) => {
    const result = await controlDefensores.obtenerDefensoresZona(req.params.id);
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('Error al obtener el defensor', 404);
        return next(error);
    } else {
        res.status(200).json({
            defensor: result
        });
    }
}
);


//Module exports
module.exports = {
    obtenerDefensores,
    obtenerDefensorPorId,
    obtenerDefensoresZona,
    obtenerDefensoresByDistrito
};
