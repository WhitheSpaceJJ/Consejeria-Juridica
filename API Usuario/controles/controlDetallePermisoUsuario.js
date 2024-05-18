
const modeloDetallePermisoUsuario = require('../modelos/modeloDetallePermisoUsuario');

const crearDetallePermisoUsuario = async (detallePermisoUsuario) => { 
    try {
        return (await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.create(detallePermisoUsuario)).dataValues;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}


const eliminarDetallePermisoUsuario = async (idDetallePermisoUsuario) => {
    try {
        const result= await modeloDetallePermisoUsuario.Detalle_Permiso_Usuario.destroy({ where: { idDetallePermisoUsuario } });
        return result 
    }

    catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}

module.exports = {  
    crearDetallePermisoUsuario
}