
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

module.exports = {
    obtenerPermisos,
};