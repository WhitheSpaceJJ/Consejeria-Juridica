// Constantes que almacenan el modulo de control para codigos postales
const   controlCodigosPostales = require('../controllers/codigosPostales.controllers.js');
//Constante que almacena el modulo de errores asincronos
const asyncError = require('../utilities/asyncError.js');
//Constante que almacena el modulo de errores personalizados
const CustomeError = require('../utilities/customeError.js');

//Funcion para obtener todos los codigos postales de la base de datos y enviarlos como respuesta en formato JSON
exports.getCodigosPostales = asyncError(async (req, res, next) => {
    const codigosPostales = await controlCodigosPostales.getCodigosPostales();
    if (!codigosPostales) {
        return next(new CustomeError('No se encontraron codigos postales', 404));
    }
    res.status(200).json({
        codigosPostales: codigosPostales
    });
});

//Funcion para obtener un codigo postal por su id y enviarlo como respuesta en formato JSON o enviar un error si no se encuentra
exports.getCodigoPostal = asyncError(async (req, res, next) => {
    const codigoPostal = await controlCodigosPostales.getCodigoPostal(req.params.id);
    if (!codigoPostal) {
        return next(new CustomeError('No se encontro el codigo postal', 404));
    }
    res.status(200).json({
        codigoPostal: codigoPostal
    });
});

//Funcion para obtener las colonias por codigo postal y enviarlas como respuesta en formato JSON o enviar un error si no se encuentran
exports.getColoniasByCodigoPostal = asyncError(async (req, res, next) => {
    const colonias = await controlCodigosPostales.getColoniasByCodigoPostal(req.params.cp);
    if (!colonias) {
        return next(new CustomeError('No se encontraron colonias', 404));
    }
    res.status(200).json({
        colonias: colonias
    });
});

