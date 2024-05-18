
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


module.exports = {
    obtenerTipoUsuarios,
};