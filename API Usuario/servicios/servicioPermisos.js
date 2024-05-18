const controlPermisos = require('../controles/controlPermisos');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

const obtenerPermisos = asyncError(async (req, res, next) => {
    const result = await controlPermisos.obtenerPermisos();
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron permisos', 404);
        return next(error);
    } else {
        res.status(200).json({
            permisos: result
        });
    }
});

module.exports = {
    obtenerPermisos
};

