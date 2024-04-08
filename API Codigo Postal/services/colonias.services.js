//Constante que almacena el controlador de colonias
const controlColonias = require('../controllers/colonias.controllers');
//Constante que almacena el manejador de errores asincronos
const asyncError = require('../utilities/asyncError.js');
// Constante que almacena el manejador de errores personalizados
const CustomeError = require('../utilities/customeError.js');

//Funcion para obtener todas las colonias de la base de datos y enviarlas como respuesta en formato JSON
exports.getColonias = asyncError(async (req, res, next) => {
    const colonias = await controlColonias.getColonias();
    res.status(200).json({
        colonias: colonias
    });
});

//Funcion para obtener una colonia por su id y enviarla como respuesta en formato JSON o enviar un error si no se encuentra
exports.getColonia = asyncError(async (req, res, next) => {
    const colonia = await controlColonias.getColonia(req.params.id);
    if (!colonia) {
        return next(new CustomeError(`No se encontró una colonia con el id ${req.params.id}`, 404));
    }
    res.status(200).json({
        colonia: colonia
    });
});





