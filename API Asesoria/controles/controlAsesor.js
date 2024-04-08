const modeloAsesor = require('../modelos/modeloAsesor');
const controlEmpleado = require('./controlEmpleados.js');

/** 
 * @abstract Función que permite obtener todos los asesores
 * @returns  asesores
 * */
const obtenerAsesores = async (activo) => {
  try {
    if (activo !== undefined && activo !== null && activo !== "") {
      const whereClause = {};
      whereClause['$empleado.estatus_general$'] = "ACTIVO";
      return await modeloAsesor.Asesor.findAll({
        raw: false,
        nest: true,
        include: [{
          model: modeloAsesor.Empleado
        }
        ]
        ,
        where: whereClause
      });
  
    }else {
      return await modeloAsesor.Asesor.findAll({
        raw: false,
        nest: true,
        include: [{
          model: modeloAsesor.Empleado
        }
        ]
      });
      
    }


  
  } catch (error) {
    console.log("Error de asesores:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite obtener un asesor por su id
 * @param {*} id id del asesor
 *  @returns asesor
 * */

const obtenerAsesorPorId = async (id) => {
  try {
    return await modeloAsesor.Asesor.findByPk(id, {
      raw: false,
      nest: true,
      include: [{
        model: modeloAsesor.Empleado
      }
      ]
    });
  } catch (error) {
    console.log("Error de asesores:", error.message);
    return null;
  }
};

/** 
 * @abstract Función que permite agregar un asesor
 *  @param {*} asesor  asesor a agregar
 *  @returns asesor si se agrega correctamente, false si no  agrega     
 * */
const agregarAsesor = async (asesor) => {
  try {
    return (await modeloAsesor.Asesor.create(asesor, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error de asesores:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite eliminar un asesor
 *  @param {*} id id del asesor a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 * */
const eliminarAsesor = async (id) => {
  try {
    const result= await modeloAsesor.Asesor.destroy({ where: { id_asesor: id } });
    return result === 1;
  } catch (error) {
    console.log("Error de asesores:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar un asesor
 * @param {*} asesor asesor a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarAsesor = async (asesor) => {
  try {
    const result = await modeloAsesor.Asesor.update(asesor, { where: { id_asesor: asesor.id_asesor } });
    return result[0] === 1; 
  } catch (error) {
    console.log("Error de asesores:", error.message);
    return false;
  }
};

const obtenerAsesoresZona = async (id) => {
  try {
    const asesores = await controlEmpleado.obtenerEmpleadosAsesoresPorZona(id);
    if (asesores) {
      const asesoresFiltrados = [];
      for (let i = 0; i < asesores.length; i++) {
        const asesor = await obtenerAsesorPorId(asesores[i].id_empleado);
        asesoresFiltrados.push(asesor);
      }
      return asesoresFiltrados;
    }
    return null;
  } catch (error) {
    console.log("Error de asesores:", error.message);
    return null;
  }
}

//  Exportar los módulos    
module.exports = {
  obtenerAsesores,
  obtenerAsesorPorId,
  agregarAsesor,
  eliminarAsesor,
  actualizarAsesor, obtenerAsesoresZona
};
