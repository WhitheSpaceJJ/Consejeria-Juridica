// Constantes que almacenan el modulo de control para codigos postales
const   controlCodigosPostales = require('../controllers/codigosPostales.controllers.js');
//Constante que almacena el modulo de errores asincronos
const asyncError = require('../utilities/asyncError.js');
//Constante que almacena el modulo de errores personalizados
const CustomeError = require('../utilities/customeError.js');


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

