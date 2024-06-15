const modeloCatalogoRequisito = require('../modelos/modeloCatalogoRequisito');

  
/**
 *  @abstract Función que permite obtener todos los catalogos de requisitos
 * @returns catalogos de requisitos
 */
const obtenerCatalogoRequisitos = async (activo) => {
  try {
    if(activo !== undefined && activo !== null && activo !== ""){
      return await modeloCatalogoRequisito.CatalogoRequisito.findAll({
        raw: false,
        nest: true,
        where: { estatus_general: "ACTIVO" }
      });
    }else {
      return await modeloCatalogoRequisito.CatalogoRequisito.findAll({
        raw: false,
        nest: true
      });
    }
  } catch (error) {
    console.log("Error de catalogo requisito:", error.message);
    return null;
  }
};

/**
 * @abstract Función que permite obtener un catalogo de requisito por su id
 * @param {*} id id del catalogo de requisito
 * @returns catalogo de requisito
 *  */
const obtenerCatalogoRequisitoPorId = async (id) => {
  try {
      return await modeloCatalogoRequisito.CatalogoRequisito.findByPk(id,{
        raw: false,
        nest: true
      });
  
  } catch (error) {
    console.log("Error de catalogo requisito:", error.message);
    return null;
  }
};

const obtenerDocumentoPorPorIdMiddleware = async (id) => {
  try {
    return await modeloCatalogoRequisito.CatalogoRequisito.findOne({
      raw: false,
      nest: true,
      where: { id_catalogo: id, estatus_general: "ACTIVO" }
    });
  } catch (error) {
    console.log("Error de catalogo requisito:", error.message);
    return null;
  }
}


/**
 * @abstract Función que permite agregar un catalogo de requisito
 * @param {*} catalogoRequisito catalogo de requisito a agregar
 * @returns catalogo de requisito si se agrega correctamente, false si no  agregar
 * */
const agregarCatalogoRequisito = async (catalogoRequisito) => {
  try {
 
    return (await modeloCatalogoRequisito.CatalogoRequisito.create(catalogoRequisito, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error de catalogo requisito:", error.message);
    return false;
  }
};



/**
 *  @abstract Función que permite actualizar un catalogo de requisito
 * @param {*} catalogoRequisito catalogo de requisito a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarCatalogoRequisito = async (catalogoRequisito) => {
  try {
   const result= await modeloCatalogoRequisito.CatalogoRequisito.update(catalogoRequisito, { where: { id_catalogo: catalogoRequisito.id_catalogo } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error de catalogo requisito:", error.message);
    return false;
  }
};


const obtenerCatalogoRequisitosPaginacion = async (pagina) => {
  try {
    pagina = parseInt(pagina, 10);
    const offset = (pagina - 1) * 10;
    const resultados = await modeloCatalogoRequisito.CatalogoRequisito.findAll({
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

const obtenerTotalCatalogoRequisitos = async () => {
  try {
    return await modeloCatalogoRequisito.CatalogoRequisito.count();
  } catch (error) {
    console.log("Error de catalogo requisito:", error.message);
    return null;
  }
}







  // Modulos exportados 
module.exports = {
  obtenerCatalogoRequisitos,
  obtenerCatalogoRequisitoPorId,
  agregarCatalogoRequisito,
  actualizarCatalogoRequisito,
  obtenerDocumentoPorPorIdMiddleware,
  obtenerCatalogoRequisitosPaginacion,
  obtenerTotalCatalogoRequisitos
};
