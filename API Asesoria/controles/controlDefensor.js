const modeloDefensor = require('../modelos/modeloDefensor.js');
const controlEmpleado = require('./controlEmpleados.js');
//Falta relacion de defensor y asesoria y actualizar controles

/**	
 * @abstract Función que permite obtener todos los defensores
 * @returns  defensores
 * */

const obtenerDefensores = async (activo) => {
    try {
        if (activo !== undefined && activo !== null && activo !== "") {
            const whereClause = {};
            whereClause['$empleado.estatus_general$'] = "ACTIVO";
            return await modeloDefensor.Defensor.findAll({
                raw: false,
                nest: true,
                include: [{
                    model: modeloDefensor.Empleado
                }
                ],
                where: whereClause
            });
        } else {
            return await modeloDefensor.Defensor.findAll({
                raw: false,
                nest: true,
                include: [{
                    model: modeloDefensor.Empleado
                }
                ]
            });
        }



    } catch (error) {
        console.log("Error defensor:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite obtener un defensor por su id
 * @param {*} id id del defensor
 * @returns defensor
 * */
const obtenerDefensorPorId = async (id) => {
    try {
        return await modeloDefensor.Defensor.findByPk(id, {
            raw: false,
            nest: true,
            include: [{
                model: modeloDefensor.Empleado
            }
            ]
        });
    } catch (error) {
        console.log("Error defensor:", error.message);
        return null;
    }
};

/**
 * @abstract Función que permite agregar un defensor
 * @param {*} defensor defensor a agregar
 * @returns defensor si se agrega correctamente, false si no  agrega
 * */
const agregarDefensor = async (defensor) => {
    try {
        return (await modeloDefensor.Defensor.create(defensor, { raw: true, nest: true })).dataValues;
    } catch (error) {
        console.log("Error defensor:", error.message);
        return false;
    }
};

/**
 *  @abstract Función que permite eliminar un defensor
 * @param {*} id id del defensor a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */

const eliminarDefensor = async (id) => {
    try {
        const result = await modeloDefensor.Defensor.destroy({ where: { id_defensor: id } });
        return result === 1;
    } catch (error) {
        console.log("Error defensor:", error.message);
        return false;
    }
};

/**
 * @abstract Función que permite actualizar un defensor
 * @param {*} id id del defensor a actualizar
 * @param {*} defensor defensor a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarDefensor = async (id, defensor) => {
    try {
        const result = await modeloDefensor.Defensor.update(defensor, { where: { id_defensor: id } });
        return result[0] === 1;
    } catch (error) {
        console.log("Error defensor:", error.message);
        return false;
    }
};

const obtenerDefensoresZona = async (id) => {
    try {
        const defensores = await controlEmpleado.obtenerEmpleadosDefensoresPorZona(id);
        if (defensores) {
            const defensoresReturn = [];
            for (let i = 0; i < defensores.length; i++) {
                defensores[i] = defensores[i];
                const defensor = await obtenerDefensorPorId(defensores[i].id_empleado);
                defensoresReturn.push(defensor);
            }
            return defensoresReturn;
        }
        return null;
    } catch (error) {
        console.log("Error defensor:", error.message);
        return null;
    }
};

// Exportar los módulos
module.exports = {
    obtenerDefensores,
    obtenerDefensorPorId,
    agregarDefensor,
    eliminarDefensor,
    actualizarDefensor,
    obtenerDefensoresZona
};
