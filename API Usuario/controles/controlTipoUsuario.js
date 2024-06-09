
const modeloTipoUsuario = require('../modelos/modeloTipoUsuario');

const obtenerTipoUsuarios = async () => {
    try {
        return await modeloTipoUsuario.TipoUser.findAll({
            raw: false,
            nest: true,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}
const obtenerTipoUsuarioById = async (id) => {  
    try {
        return await modeloTipoUsuario.TipoUser.findOne({
            where: {
                id_tipouser: id
            }
        });
    } catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}


module.exports = {
    obtenerTipoUsuarios, obtenerTipoUsuarioById
};