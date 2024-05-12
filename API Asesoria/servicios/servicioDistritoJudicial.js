const controlDistritoJudicial = require('../controles/controlDistritosJudiciales');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");



/**
 * @abstract Servicio que permite obtener todos los distritos judiciales
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * */
const obtenerDistritosJudiciales = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.obtenerDistritosJudiciales();
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron distritos judiciales', 404);
        return next(error);
    } else {
        res.status(200).json({
            distritosJudiciales: result
        });
    }

}
);



/**
 * @abstract Servicio que permite obtener un distrito judicial
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 *  
 * */
const obtenerDistritoJudicial = asyncError(async (req, res, next) => {
    const result = await controlDistritoJudicial.obtenerDistritoJudicial(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontro el distrito judicial', 404);
        return next(error);
    } else {
        res.status(200).json({
            distritoJudicial: result
        });
    }

}
);


//Module exports
module.exports = {

    obtenerDistritosJudiciales,
    obtenerDistritoJudicial,
};
