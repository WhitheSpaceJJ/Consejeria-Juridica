// Constante que almacena el controlador de municipios
const controlMunicipios = require('../controllers/municipios.controller'); 
//Constante que almacena el manejador de errores asincronos
const asyncError = require('../utilities/asyncError.js');
// Constante que almacena el manejador de errores personalizados
const CustomeError = require('../utilities/customeError.js');

//Funcion para obtener todos los municipios de la base de datos y enviarlos como respuesta en formato JSON
exports.getMunicipios = asyncError(async (req, res, next) => {
    const municipios = await controlMunicipios.getMunicipios();
    res.status(200).json({
        municipios: municipios
    });
});

//Funcion para obtener un municipio por su id y enviarlo como respuesta en formato JSON o enviar un error si no se encuentra
exports.getMunicipio = asyncError(async (req, res, next) => {
    const municipio = await controlMunicipios.getMunicipio(req.params.id);
    if (!municipio) {
        return next(new CustomeError('No se encontró el municipio', 404));
    }
    res.status(200).json({
        municipio: municipio
    });
});

