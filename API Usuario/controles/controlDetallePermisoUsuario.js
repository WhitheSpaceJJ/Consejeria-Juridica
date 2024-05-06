/**
 const modeloTipoUsuario = require('../modelos/modeloTipoUsuario');

const obtenerTiposUsuario = async () => {
    try {
      return await modeloTipoUsuario.TipoUser.findAll({
        raw: true,
        nest: true
      });
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  } ;
  

  const obtenerTipoUsuarioPorId = async (id) => {
    try {
      return await modeloTipoUsuario.TipoUser.findByPk(id, {
        raw: true,
        nest: true
      });
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  };
  

  
  const agregarTipoUsuario = async (tipoUsuario) => {
    try {
      return (await modeloTipoUsuario.TipoUser.create(tipoUsuario, { raw: true, nest: true })).dataValues;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  
  };

  
  const eliminarTipoUsuario = async (id) => {
    try {
      const result =  await modeloTipoUsuario.TipoUser.destroy({ where: { id_tipo_usuario: id } });
      return result===1;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
  

  
  const actualizarTipoUsuario = async (tipoUsuario) => {
    try {
     const result= await modeloTipoUsuario.TipoUser.update(tipoUsuario, { where: { id_tipo_usuario: tipoUsuario.id_tipo_usuario } });
      return result[0] === 1;
    } catch (error) {
      console.log("Error:", error.message);
      return false;
    }
  };
  
  //Module exports:
  module.exports = {
    obtenerTiposUsuario,
    obtenerTipoUsuarioPorId,
    agregarTipoUsuario,
    eliminarTipoUsuario,
    actualizarTipoUsuario
  };


const Detalle_Permiso_Usuario = sequelize.define("detalle_permiso_usuario", {
  id_detalle_permisos
    : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
  id_permiso: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
}, {
  timestamps: false,
  tableName: "detalle_permiso_usuario"
});

 */
 

const modeloDetallePermisoUsuario = require('../modelos/modeloDetallePermisoUsuario');


/**
 * @abstract Función que permite obtener los detalles de permisos de usuario
 * @returns detalles de permisos de usuario si se obtienen correctamente, null si no se obtienen
 */

const obtenerDetallesPermisosUsuario = async () => {
    try {
      return await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.findAll({
        raw: true,
        nest: true
      });
    } catch (error) {
      console.log("Error:", error.message);
      return null;
    }
  }


    /**
     * @abstract Función que permite obtener un detalle de permiso de usuario por su id
     * @param {*} id id del detalle de permiso de usuario
     * @returns detalle de permiso de usuario si se obtiene correctamente, null si no se obtiene
     * */
    const obtenerDetallePermisoUsuarioPorId = async (id) => {
        try {
        return await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.findByPk(id, {
            raw: true,
            nest: true
        });
        } catch (error) {
        console.log("Error:", error.message);
        return null;
        }
    };

 
    /**
     * @abstract Función que permite agregar un detalle de permiso de usuario
     * @param {*} detallePermisoUsuario detalle de permiso de usuario a agregar
     * @returns detalle de permiso de usuario si se agrega correctamente, false si no se agrega
     * */

    const agregarDetallePermisoUsuario = async (detallePermisoUsuario) => {
        try {
        return (await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.create(detallePermisoUsuario, { raw: true, nest: true })).dataValues;
        } catch (error) {
        console.log("Error:", error.message);
        return false;
        }
    };


    /**
     * @abstract Función que permite eliminar un detalle de permiso de usuario
     * @param {*} id id del detalle de permiso de usuario a eliminar
     * @returns true si se elimina correctamente, false si no se elimina
     * */

    const eliminarDetallePermisoUsuario = async (id) => {
        try {
        const result =  await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.destroy({ where: { id_detalle_permisos: id } });
        return result===1;
        } catch (error) {
        console.log("Error:", error.message);
        return false;
        }
    };


    /**
     * @abstract Función que permite actualizar un detalle de permiso de usuario
     * @param {*} detallePermisoUsuario detalle de permiso de usuario a actualizar
     * @returns true si se actualiza correctamente, false si no se actualiza
     * */
    

    const actualizarDetallePermisoUsuario = async (detallePermisoUsuario) => {
        try {
        const result= await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.update(detallePermisoUsuario, { where: { id_detalle_permisos: detallePermisoUsuario.id_detalle_permisos } });
        return result[0] === 1;
        } catch (error) {
        console.log("Error:", error.message);
        return false;
        }
    };



    //Module exports:
    module.exports = {
        obtenerDetallesPermisosUsuario,
        obtenerDetallePermisoUsuarioPorId,
        agregarDetallePermisoUsuario,
        eliminarDetallePermisoUsuario,
        actualizarDetallePermisoUsuario
    };
