const modeloEmpleado = require('../modelos/modeloEmpleado.js');


/**
 * @abstract Función que permite obtener todos los empleados
 * @returns  empleados
 * */
const obtenerEmpleados = async () => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,
            include: [{
                model: modeloEmpleado.DistritoJudicial
            }

            ]
        });


    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
};

/**
 *  @abstract Función que permite obtener un empleado por su id
 * @param {*} id id del empleado
 * @returns empleado
 * */
const obtenerEmpleadoPorId = async (id) => {
    try {
        //La busqueda sera por el id empleado y id distrito judicial
        return await modeloEmpleado.Empleado.findByPk(id, {
            raw: false,
            nest: true,

            include: [{
                model: modeloEmpleado.DistritoJudicial
            }
            ]
        });
    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
};

const obtenerEmpleadoPorPorIdMiddleware = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findOne({
            raw: false,
            nest: true,
            where: { id_empleado: id, estatus_general: "ACTIVO" },
        });
    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
}


/**
 * @abstract Función que permite agregar un empleado
 * @param {*} empleado empleado a agregar
 * @returns empleado si se agrega correctamente, false si no  agrega
 * */
const agregarEmpleado = async (empleado) => {
    try {

        const controlAsesor = require('./controlAsesor.js');
        const controlDefensor = require('./controlDefensor.js');
        const empleado_objeto = JSON.parse(JSON.stringify(empleado));
        if (empleado_objeto.tipo_empleado === "asesor") {

            const datos_empleado = {
                id_distrito_judicial: empleado_objeto.id_distrito_judicial,
                tipo_empleado: empleado_objeto.tipo_empleado,
                estatus_general: empleado_objeto.estatus_general
            }

            const empleado_agregado = (await modeloEmpleado.Empleado.create(datos_empleado, { raw: true, nest: true })).dataValues;
            const id_empleado = empleado_agregado.id_empleado;

            const datos_asesor = {
                id_asesor: id_empleado,
                nombre_asesor: empleado_objeto.nombre,
            }
            await controlAsesor.agregarAsesor(datos_asesor);
            return await controlAsesor.obtenerAsesorPorId(id_empleado);
        }
        if (empleado_objeto.tipo_empleado === "defensor") {

            const datos_empleado = {
                id_distrito_judicial: empleado_objeto.id_distrito_judicial,
                tipo_empleado: empleado_objeto.tipo_empleado,
                estatus_general: empleado_objeto.estatus_general
            }

            const empleado_agregado = (await modeloEmpleado.Empleado.create(datos_empleado, { raw: true, nest: true })).dataValues;

            const id_empleado = empleado_agregado.id_empleado;

            const datos_defensor = {
                id_defensor: id_empleado,
                nombre_defensor: empleado_objeto.nombre,
            }

            await controlDefensor.agregarDefensor(datos_defensor);
            return await controlDefensor.obtenerDefensorPorId(id_empleado);
        }



        //return (await modeloEmpleado.Empleado.create(empleado, { raw: true, nest: true })).dataValues;
    } catch (error) {
        console.log("Error empleados:", error.message);
        return false;
    }
};



/**
 * @abstract Función que permite actualizar un empleado
 * @param {*} id id del empleado a actualizar
 * @param {*} empleado empleado a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarEmpleado = async (id, empleado) => {
    try {
        //       realiza algo similar con respect al metodo de agregar pero ahora en actualizar
        const controlAsesor = require('./controlAsesor.js');
        const controlDefensor = require('./controlDefensor.js');
        const empleado_objeto = JSON.parse(JSON.stringify(empleado));
        if (empleado_objeto.tipo_empleado === "asesor") {

            const datos_empleado = {
                id_distrito_judicial: empleado_objeto.id_distrito_judicial,
                tipo_empleado: empleado_objeto.tipo_empleado,
                estatus_general: empleado_objeto.estatus_general,
                id_empleado: id

            }

            const empleado_actualizado = (await modeloEmpleado.Empleado.update(datos_empleado, { where: { id_empleado: id } }))[0];
            if (empleado_actualizado === 1) {
                const datos_asesor = {
                    id_asesor: id,
                    nombre_asesor: empleado_objeto.nombre,
                }
                await controlAsesor.actualizarAsesor(datos_asesor);
                return true
            } else {
                const datos_asesor = {
                    id_asesor: id,
                    nombre_asesor: empleado_objeto.nombre,
                }
                return await controlAsesor.actualizarAsesor(datos_asesor);
            }
        }
        if (empleado_objeto.tipo_empleado === "defensor") {

            const datos_empleado = {
                id_distrito_judicial: empleado_objeto.id_distrito_judicial,
                tipo_empleado: empleado_objeto.tipo_empleado,
                estatus_general: empleado_objeto.estatus_general,
                id_empleado: id
            }

            const empleado_actualizado = (await modeloEmpleado.Empleado.update(datos_empleado, { where: { id_empleado: id } }))[0];
            if (empleado_actualizado === 1) {

                const datos_defensor = {
                    id_defensor: id,
                    nombre_defensor: empleado_objeto.nombre,
                }
                await controlDefensor.actualizarDefensor(datos_defensor);
                return true
            } else {
                const datos_defensor = {
                    id_defensor: id,
                    nombre_defensor: empleado_objeto.nombre,
                }
                return await controlDefensor.actualizarDefensor(datos_defensor);
            }
        }
        return false;
    } catch (error) {
        return false;
    }
};

const obtenerEmpleadosAsesoresPorZona = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,

            include: [{
                model: modeloEmpleado.DistritoJudicial,
                where: { id_zona: id }
            }
            ], where: { tipo_empleado: "asesor" }
        });
    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
}
const obtenerEmpleadosDefensoresPorZona = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,

            include: [{
                model: modeloEmpleado.DistritoJudicial,
                where: { id_zona: id }
            }
            ], where: { tipo_empleado: "defensor" }
        });
    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
}

const obtenerEmpleadoIDAndDistrito = async (req) => {
    try {
        const req_objeto = JSON.parse(JSON.stringify(req));
        const objeto_encontrado = await modeloEmpleado.Empleado.findOne({
            raw: false,
            nest: true,
            where: { id_empleado: req_objeto.id_empleado, id_distrito_judicial: req_objeto.id_distrito_judicial }
        });
        const pre_objeto = JSON.parse(JSON.stringify(objeto_encontrado));

        if (pre_objeto.tipo_empleado === "asesor" && req_objeto.id_tipouser === "2") {
            return pre_objeto;
        }
        if (pre_objeto.tipo_empleado === "defensor" && req_objeto.id_tipouser === "3") {
            return pre_objeto;
        }
        return null;
    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
}

const obtenerEmpleadosBusqueda = async (id_distrito_judicial, pagina, total) => {
    try {
        if (total === true) {
            return await modeloEmpleado.Empleado.count({
                where: { id_distrito_judicial: id_distrito_judicial }
            });
        } else {
            pagina = parseInt(pagina, 10);
            const limite = 10;
            const offset = (pagina - 1) * 10;
            const empleados_pre = await modeloEmpleado.Empleado.findAll({
                raw: false,
                nest: true,
                include: [{
                    model: modeloEmpleado.DistritoJudicial
                }

                ], where: { id_distrito_judicial: id_distrito_judicial }
                , limit: limite,
                offset: offset
            });
            //obtenerDefensorPorId
            //obtenerAsesorPorId
            //recorre ciclo for y dependiendo del tipo de empleado se obtiene el empleado
            const empleados = [];
            const controlAsesor = require('./controlAsesor.js');
            const controlDefensor = require('./controlDefensor.js');
            for (let i = 0; i < empleados_pre.length; i++) {
                const empleado = JSON.parse(JSON.stringify(empleados_pre[i]));
                if (empleado.tipo_empleado === "asesor") {
                    const asesor = await controlAsesor.obtenerAsesorPorId(empleado.id_empleado);
                    empleados.push(asesor);
                }
                if (empleado.tipo_empleado === "defensor") {
                    const defensor = await controlDefensor.obtenerDefensorPorId(empleado.id_empleado);
                    empleados.push(defensor);
                }
            }
            return empleados;

        }

    } catch (error) {
        console.log("Error empleados:", error.message);
        return null;
    }
}



module.exports = {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    agregarEmpleado,
    actualizarEmpleado,
    obtenerEmpleadosAsesoresPorZona, obtenerEmpleadosDefensoresPorZona,
    obtenerEmpleadoPorPorIdMiddleware, obtenerEmpleadoIDAndDistrito, obtenerEmpleadosBusqueda

};