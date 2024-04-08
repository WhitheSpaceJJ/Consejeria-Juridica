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
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
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
        return await modeloEmpleado.Empleado.findByPk(id, {
            raw: false,
            nest: true,
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
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
 * @abstract Función que permite agregar un empleado
 * @param {*} empleado empleado a agregar
 * @returns empleado si se agrega correctamente, false si no  agrega
 * */
const agregarEmpleado = async (empleado) => {
    try {
        /*
        Ejemplo de empleado
             const empleado = {
        nombre: nombreInput,
        tipo_empleado: tipoUsuarioInput,
        estatus_general: estatusUsuarioInput.toUpperCase(),
        id_distrito_judicial: distritoJudicialInput
      };

         */
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
 * @abstract Función que permite eliminar un empleado
 * @param {*} id id del empleado a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarEmpleado = async (id) => {
    try {
        const result = await modeloEmpleado.Empleado.destroy({ where: { id_empleado: id } });
        return result === 1;
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

        /*
    Ejemplo de empleado
         const empleado = {
            id_empleado: id,
    nombre: nombreInput,
    tipo_empleado: tipoUsuarioInput,
    estatus_general: estatusUsuarioInput.toUpperCase(),
    id_distrito_judicial: distritoJudicialInput
  };

     */

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
            }else {
                const datos_asesor = {
                    id_asesor: id,
                    nombre_asesor: empleado_objeto.nombre,
                }
                return   await controlAsesor.actualizarAsesor(datos_asesor);
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
                //   return await controlDefensor.obtenerDefensorPorId(defensor_actualizado.id_defensor);
            }else {
                const datos_defensor = {
                    id_defensor: id,
                    nombre_defensor: empleado_objeto.nombre,
                }
                return   await controlDefensor.actualizarDefensor(datos_defensor);
            }
        }
        return false;
        //return (await modeloEmpleado.Empleado.update(empleado, { where: { id_empleado: id } }))[0] === 1;



        //   const result= await modeloEmpleado.Empleado.update(empleado, { where: { id_empleado: id } });
        //    return result[0] === 1; 
    } catch (error) {
        console.log("Error empleados:", error.message);
        return false;
    }
};

const obtenerEmpleadosAsesoresPorZona = async (id) => {
    try {
        return await modeloEmpleado.Empleado.findAll({
            raw: false,
            nest: true,
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
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
            attributes: {
                exclude: ["id_distrito_judicial"]
            },
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
module.exports = {
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    agregarEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    obtenerEmpleadosAsesoresPorZona, obtenerEmpleadosDefensoresPorZona

};