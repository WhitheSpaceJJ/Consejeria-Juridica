

const controlPermiso = require('../controles/controlPermiso');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**	
 * @abstract Función que permite agregar un permiso 
 * @param {*} req => Request
    * @param {*} res => Response
    * @param {*} next => Next
    * @returns permiso si se agrega correctamente, false si no se agrega

    */

const agregarPermiso = asyncError(async (req, res, next) => {
    const result = await controlPermiso.agregarPermiso(req.body);
    if (result === false) {
        const error = new CustomeError('Error al agregar un permiso', 400);
        return next(error);
    } else {
        res.status(201).json({
            permiso: result
        });
    }
}
);


/**
 * @abstract Función que permite obtener todos los permisos
 * @param {*} req => Request
    * @param {*} res => Response
    * @param {*} next => Next
    * @returns permisos si se obtienen correctamente, false si no se obtienen
    */

const obtenerPermisos = asyncError(async (req, res, next) => {
    const result = await controlPermiso.obtenerPermisos();
    if (result === null || result === undefined || result.length === 0) {
        const error = new CustomeError('No se encontraron permisos', 404);
        return next(error);
    } else {
        res.status(200).json({
            permisos: result
        });
    }
}
);


/**
 * @abstract Función que permite eliminar un permiso
 * @param {*} req => Request
    * @param {*} res => Response
    * @param {*} next => Next
    * @returns true si se elimina correctamente, false si no se elimina
    */


const eliminarPermiso = asyncError(async (req, res, next) => {
    const result = await controlPermiso.eliminarPermiso(req.params.id);
    if (result === false) {
        const error = new CustomeError('Error al eliminar el permiso', 400);
        return next(error);
    } else {
        res.status(200).json({
            message: 'Permiso eliminado correctamente'
        });
    }
}
);



/**
 * @abstract Función que permite obtener un permiso por su id
 * @param {*} req => Request
    * @param {*} res => Response
    * @param {*} next => Next
    * @returns permiso si se obtiene correctamente, null si no se obtiene
    */


const obtenerPermisoPorId = asyncError(async (req, res, next) => {
    const result = await controlPermiso.obtenerPermisoPorId(req.params.id);
    if (result === null || result === undefined) {
        const error = new CustomeError('No se encontró el permiso', 404);
        return next(error);
    } else {
        res.status(200).json({
            permiso: result
        });
    }
}
);


/**
 * @abstract Función que permite actualizar un permiso
 * @param {*} req => Request
    * @param {*} res => Response
    * @param {*} next => Next
    * @returns permiso si se actualiza correctamente, false si no se actualiza
    */

const actualizarPermiso = asyncError(async (req, res, next) => {
    const result = await controlPermiso.actualizarPermiso(req.body);
    if (result === false) {
        const error = new CustomeError('Error al actualizar el permiso', 400);
        return next(error);
    } else {
        res.status(200).json({
            permiso: req.body
        });
    }
}
);

//Module exports
module.exports = {
    agregarPermiso,
    obtenerPermisos,
    eliminarPermiso,
    obtenerPermisoPorId,
    actualizarPermiso
};

