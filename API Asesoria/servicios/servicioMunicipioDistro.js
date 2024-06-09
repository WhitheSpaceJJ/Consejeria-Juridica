const controlMunicipioDistro = require('../controles/controlMunicipioDistro');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");




/**
 * @abstract Servicio  que permite obtener todos los municipios
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const obtenerMunicipios = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.obtenerMunicipios();
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron municipios', 404);
        return next(error);
    } else {
        res.status(200).json({
            municipios: result
        });
    }

}
);


const obtenerMunicipiosDistrito = asyncError(async (req, res, next) => {
    const result = await controlMunicipioDistro.obtenerMunicipiosDistrito(req.params.id);
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron municipios', 404);
        return next(error);
    } else {
        res.status(200).json({
            municipios: result
        });
    }
}
);



//Module exports
module.exports = {
    obtenerMunicipios,
    obtenerMunicipiosDistrito
}
