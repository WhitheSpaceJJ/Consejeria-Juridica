

const controlTipoUsuario = require('../controles/controlTipoUsuario');

const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");


const obtenerTipoUsuarios = asyncError(async (req, res, next) => {
    const result = await controlTipoUsuario.obtenerTipoUsuarios();
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron tipos de usuarios', 404);
        return next(error);
    } else {
        res.status(200).json({
            tipoUsuarios: result
        });
    }
}

);


module.exports = {
    obtenerTipoUsuarios
};
