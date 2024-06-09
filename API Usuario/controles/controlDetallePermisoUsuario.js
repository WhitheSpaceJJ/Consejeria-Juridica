
const modeloDetallePermisoUsuario = require('../modelos/modeloDetallePermisoUsuario');

const crearDetallePermisoUsuario = async (detallePermisoUsuario) => { 
    try {
        return (await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.create(detallePermisoUsuario)).dataValues;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}


const eliminarDetallePermisoUsuario = async (id_usuario, id_permiso) => {
    try {
        const result= await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.destroy({ where: {
            id_usuario: id_usuario,
            id_permiso: id_permiso
         } });
        return result  
    } 

    catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}

const obtenerPermisosUsuario = async (idUsuario) => {
    try {
        return await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.findAll({
             where: { id_usuario: idUsuario },
             include: [modeloDetallePermisoUsuario.Permiso]
            });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}




module.exports = {  
    crearDetallePermisoUsuario,
    eliminarDetallePermisoUsuario,
    obtenerPermisosUsuario

}