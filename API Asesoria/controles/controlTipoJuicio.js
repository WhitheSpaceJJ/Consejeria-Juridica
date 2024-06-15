
const modeloTipoJuicio = require('../modelos/modeloTipoJuicio');


/**
 * 
 * @abstract Función que permite obtener todos los tipos de juicio
 * @returns tipos de juicio
 */
const obtenerTiposDeJuicio = async (activo,pagina) => {
  try {
    if(activo !== undefined && activo !== null && activo !== ""){
      return await modeloTipoJuicio.TipoJuicio.findAll({
        raw: false,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });
    }else {
       return await modeloTipoJuicio.TipoJuicio.findAll({
        raw: false,
        nest: true
      });
    }
   
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return null;
  }
};

  
/**
 * @abstract Función que permite obtener un tipo de juicio por su id
 * @param {*} id id del tipo de juicio
 * @returns tipo de juicio  
 *  */  
const obtenerTipoDeJuicioPorId = async (id) => {
  try {
    return await modeloTipoJuicio.TipoJuicio.findByPk(id, {
      raw: true,
      nest: true,
    });
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return null;
  }
};

const obtenerTipoJuicioPorPorIdMiddleware = async (id) => {
  try {
    return await modeloTipoJuicio.TipoJuicio.findOne({
      raw: true,
      nest: true,
      where: { id_tipo_juicio: id, estatus_general: "ACTIVO" }
    });
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return null;
  }
}


/**
 * @abstract Función que permite agregar un tipo de juicio
 * @param {*} tipoDeJuicio tipo de juicio a agregar
 * @returns tipo de juicio si se agrega correctamente, false si no  agregar
 * */
const agregarTipoDeJuicio = async (tipoDeJuicio) => {
  try {
    return (await modeloTipoJuicio.TipoJuicio.create(tipoDeJuicio, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return false;
  }
};



/**
 *  @abstract Función que permite actualizar un tipo de juicio
 * @param {*} tipoDeJuicio tipo de juicio a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarTipoDeJuicio = async (tipoDeJuicio) => {
  try {
    const result = await modeloTipoJuicio.TipoJuicio.update(tipoDeJuicio, { where: { id_tipo_juicio: tipoDeJuicio.id_tipo_juicio } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return false;
  }
};
const obtenerTiposDeJuicioPaginacion = async (pagina) => {
  try {
    pagina = parseInt(pagina, 10);
    const offset = (pagina - 1) * 10;
    const resultados = await modeloTipoJuicio.TipoJuicio.findAll({
      raw: false,
      nest: true,
      offset: offset,
      limit: 10
    });
    return resultados;
  } catch (error) {
    return null;
  }
};


const obtenerTotalTiposDeJuicio = async () => {
  try {
    return await modeloTipoJuicio.TipoJuicio.count();
  } catch (error) {
    console.log("Error tipo juicios:", error.message);
    return null;
  }
}
// Module exports
module.exports = {
  obtenerTiposDeJuicio,
  obtenerTipoDeJuicioPorId,
  agregarTipoDeJuicio,
  actualizarTipoDeJuicio,
  obtenerTipoJuicioPorPorIdMiddleware,
  obtenerTotalTiposDeJuicio,obtenerTiposDeJuicioPaginacion

};