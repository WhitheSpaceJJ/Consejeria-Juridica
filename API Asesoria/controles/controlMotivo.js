
const modeloMotivo = require('../modelos/modeloMotivo');

/**
 * @abstract Funcion que permite obtener todos los motivos
 * @returns motivos
 */
const obtenerMotivos = async (activo) => {
  try {
    if (activo !== undefined && activo !== null && activo !== "") {
      return await modeloMotivo.Motivo.findAll({
        raw: true,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });

    } else {
      return await modeloMotivo.Motivo.findAll({
        raw: true,
        nest: true,
      });
    }
  } catch (error) {
    console.log("Error motivos:", error.message);
    return null;
  }
};


/**
 * @abstract Funcion que permite obtener un motivo por su id
 * @param {*} id id del motivo
 * @returns motivo
 */
const obtenerMotivoPorId = async (id) => {
  try {
    return await modeloMotivo.Motivo.findByPk(id, {
      raw: false,
      nest: true,
    });
  } catch (error) {
    console.log("Error motivos:", error.message);
    return null;
  }
};

const obtenerMotivoPorPorIdMiddleware = async (id) => {
  try {
    return  await modeloMotivo.Motivo.findOne({
      raw: true,
      nest: true,
      where: { id_motivo: id, estatus_general: "ACTIVO" }
    });
    
  } catch (error) {
    console.log("Error motivos:", error.message);
    return null;
  }
}

/**
 * @abstract Funcion que permite agregar un motivo
 * @param {*} motivo motivo a agregar
 * @returns motivo si se agrega correctamente, false si no  agregar
 */
const agregarMotivo = async (motivo) => {
  try {
    return (await modeloMotivo.Motivo.create(motivo, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error motivos:", error.message);
    return false;
  }
};



/**
 * @abstract Funcion que permite actualizar un motivo
 *  @param {*} motivo motivo a actualizar
 *  @returns true si se actualiza correctamente, false si no se actualiza
 */

const actualizarMotivo = async (motivo) => {
  try {
    const result = await modeloMotivo.Motivo.update(motivo, { where: { id_motivo: motivo.id_motivo } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error motivos:", error.message);
    return false;
  }
};
 


const obtenerMotivosPaginacion = async (pagina) => {
  try {
    pagina = parseInt(pagina, 10);
    const offset = (pagina - 1) * 10;
    const resultados = await modeloMotivo.Motivo.findAll({
      raw: false,
      nest: true,
      offset: offset,
      limit: 10
    });
    return resultados;
  } catch (error) {
    return null;
  }
}


const obtenerTotalMotivos = async () => {
  try {
    return await modeloMotivo.Motivo.count();
  } catch (error) {
    console.log("Error motivos:", error.message);
    return null;
  }
}



//Module exports:
module.exports = {
  obtenerMotivos,
  obtenerMotivoPorId,
  agregarMotivo,
  actualizarMotivo,
  obtenerMotivoPorPorIdMiddleware ,
  obtenerMotivosPaginacion,
  obtenerTotalMotivos
};