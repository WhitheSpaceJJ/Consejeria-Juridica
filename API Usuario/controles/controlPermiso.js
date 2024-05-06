
const modeloPermiso = require('../modelos/modeloPermiso');

/**
 * @abstract Función que permite obtener los permisos
 * @returns permisos si se obtienen correctamente, null si no se obtienen
 */

const obtenerPermisos = async () => {
    try {
      return await modeloPermiso.Permiso.findAll({
        raw: true,
        nest: true
      });
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  } ;
  
  /**
   * @abstract Función que permite obtener un permiso por su id
   * @param {*} id id del permiso
    * @returns permiso si se obtiene correctamente, null si no se obtiene
    */
  const obtenerPermisoPorId = async (id) => {
    try {
      return await modeloPermiso.Permiso.findByPk(id, {
        raw: true,
        nest: true
      });
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  };
  

  /**
   * @abstract Función que permite agregar un permiso
   * @param {*} permiso permiso a agregar
   * @returns permiso si se agrega correctamente, false si no se agrega
   * */
  
  const agregarPermiso = async (permiso) => {
    try {
      return (await modeloPermiso.Permiso.create(permiso, { raw: true, nest: true })).dataValues;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  
  };

  
  /**
   * @abstract Función que permite eliminar un permiso
   * @param {*} id id del permiso a eliminar
   * @returns true si se elimina correctamente, false si no se elimina
   * */
  const eliminarPermiso = async (id) => {
    try {
      const result =  await modeloPermiso.Permiso.destroy({ where: { id_permiso: id } });
      return result===1;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
  
  /**
   * @abstract Función que permite actualizar un permiso
   * @param {*} permiso permiso a actualizar
   * @returns true si se actualiza correctamente, false si no se actualiza
   * */
  
  const actualizarPermiso = async (permiso) => {
    try {
     const result= await modeloPermiso.Permiso.update(permiso, { where: { id_permiso: permiso.id_permiso } });
      return result[0] === 1;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
  
  //Module exports:
  module.exports = {
    obtenerPermisos,
    obtenerPermisoPorId,
    agregarPermiso,
    eliminarPermiso,
    actualizarPermiso
  };
