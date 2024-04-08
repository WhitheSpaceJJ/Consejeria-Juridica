// Constante que almacena el controlador de ciudades
const controlCiudades = require('../controllers/ciudades.controllers');
//Constante que almacena el manejador de errores asincronos
const asyncError = require('../utilities/asyncError.js');
//Constante que almacena el manejador de errores personalizados
const CustomeError = require('../utilities/customeError.js');

//Funcion para obtener todas las ciudades de la base de datos y enviarlas como respuesta en formato JSON
exports.getCiudades = asyncError(async (req, res, next) => {
    const ciudades = await controlCiudades.getCiudades();
    res.status(200).json({
        ciudades: ciudades
    });
});

//Funcion para obtener una ciudad por su id y enviarla como respuesta en formato JSON o enviar un error si no se encuentra
exports.getCiudad = asyncError(async (req, res, next) => {
    const ciudad = await controlCiudades.getCiudad(req.params.id);
    if (!ciudad) {
        return next(new CustomeError('No se encontró la ciudad', 404));
    }
    res.status(200).json({
        ciudad: ciudad
    });
});

