const controlEmpleado = require('../controles/controlEmpleados');
const asyncError = require("../utilidades/asyncError");
const CustomeError = require("../utilidades/customeError");

/**
 * @abstract Servicio  que permite agregar un empleado
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const agregarEmpleado = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.agregarEmpleado(req.body);
    if (result === false) {
        const error = new CustomeError('Error al agregar un empleado', 400);
        return next(error);
    } else {

        res.status(201).json({
            empleado: "Empleado agregado correctamente"
        });
    }
}
);



/**
 * @abstract Servicio  que permite actualizar un empleado
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * */
const actualizarEmpleado = asyncError(async (req, res, next) => {

    const result = await controlEmpleado.actualizarEmpleado(req.params.id, req.body);
    if (result === false) {
        const error = new CustomeError('Error al actualizar el empleado, o datos iguales', 400);
        return next(error);
    } else {

        res.status(200).json({
            empleado: "Empleado actualizado correctamente"
        });
    }
}
);
/*
const obtenerEmpleados = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.obtenerEmpleados();
    if ( result === false) {
        const error = new CustomeError('Error al obtener los empleados', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            empleados: result
        });
    }
}
);

const obtenerEmpleadoPorId = asyncError(async (req, res, next) => {
    const result = await controlEmpleado.obtenerEmpleadoPorId(req.params.id);
    if ( result === false) {
        const error = new CustomeError('Error al obtener el empleado', 400);
        return next(error);
    } else {
    
        res.status(200).json({
            empleado: result
        });
    }
}
);
*/

const obtenerEmpleadosBusqueda = asyncError(async (req, res, next) => {
    const id_distrito_judicial = req.query.id_distrito_judicial;
    const pagina = req.query.pagina;
    const total = req.query.total;
    if (total === 'true') {
        const result = await controlEmpleado.obtenerEmpleadosBusqueda(id_distrito_judicial, null, true);
        if (result === false) {
            const error = new CustomeError('Error al obtener los empleados', 400);
            return next(error);
        } else {
            res.status(200).json({
                totalEmpleados: result
            });
        }
    } else {
        const result = await controlEmpleado.obtenerEmpleadosBusqueda(id_distrito_judicial, pagina, false);
        if (result === false) {
            const error = new CustomeError('Error al obtener los empleados', 400);
            return next(error);
        } else {
            res.status(200).json({
                empleados: result
            });
        }
    }
}
);

//Module exports
module.exports = {
    agregarEmpleado,
    actualizarEmpleado,
    obtenerEmpleadosBusqueda
    //obtenerEmpleados,
    //obtenerEmpleadoPorId
}