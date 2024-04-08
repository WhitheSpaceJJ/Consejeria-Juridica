// Constante que almacena el controlador de estados
const controlEstados = require('../controllers/estados.controller.js'); 
// Constante que almacena el manejador de errores asincronos
const asyncError = require('../utilities/asyncError.js');
// Constante que almacena el manejador de errores personalizados
const CustomeError = require('../utilities/customeError.js');

// Funcion para obtener todos los estados de la base de datos y enviarlos como respuesta en formato JSON
exports.getEstados = asyncError(async (req, res, next) => { 
    const estados = await controlEstados.getEstados();
    res.status(200).json({
        estados: estados
    });
});

// Funcion para obtener un estado por su id y enviarlo como respuesta en formato JSON o enviar un error si no se encuentra
exports.getEstado = asyncError(async (req, res, next) => {
    const estado = await controlEstados.getEstado(req.params.id);
    if (!estado) {
        return next(new CustomeError('No se encontró el estado', 404)); 
    }
    res.status(200).json({ 
        estado: estado
    });
    });
    

