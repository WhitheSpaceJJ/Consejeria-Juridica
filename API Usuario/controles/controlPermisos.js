
const modeloPermiso = require('../modelos/modeloPermiso');

const obtenerPermisos = async () => {
    try {
        return await modeloPermiso.Permiso.findAll({
            exclude: ["id_permiso"],
            raw: false,
            nest: true,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}

const obtenerIDPermisos =async(permisos) =>{
    try {
         let permisosReturn = [];
        for (let i = 0; i < permisos.length; i++) {
            const permiso = await modeloPermiso.Permiso.findOne({
                where: {
                    nombre_permiso: permisos[i]
                }
            });
            permisosReturn.push(permiso.id_permiso);
        }
        return permisosReturn;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }

}
const obtenerIDPermiso = async (nombre_permiso) => {
    try {
        const permiso = await modeloPermiso.Permiso.findOne({
            where: {
                nombre_permiso
            }
        });
        return permiso.id_permiso;
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}


module.exports = {
    obtenerPermisos,
    obtenerIDPermisos, 
    obtenerIDPermiso
};