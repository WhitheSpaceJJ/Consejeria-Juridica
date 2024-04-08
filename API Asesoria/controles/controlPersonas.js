const modeloPersona = require('../modelos/modeloPersona');
const { Op } = require("sequelize");
/**
 * @abstract Función que permite obtener todas las personas
 * @returns personas
 */
const obtenerPersonas = async () => {
  try {
    return await modeloPersona.Persona.findAll({
      raw: true,
      nest: true
      ,
      attributes: {
        exclude: ['id_domicilio', 'id_genero']
      },
      include: [modeloPersona.Domicilio, modeloPersona.Genero]
    });
  } catch (error) {
    console.log("Error personas:", error.message);
    return null;
  }
};

/**
 *  @abstract Función que permite obtener una persona por su id
 * @param {*} id id de la persona
 * @returns persona
 */
const obtenerPersonaPorId = async (id) => {
  try {
    return await modeloPersona.Persona.findByPk(id, {
      raw: false,
      nest: true
      , attributes: {
        exclude: ['id_domicilio', 'id_genero']
      },
      include: [modeloPersona.Domicilio, modeloPersona.Genero]
    });
  } catch (error) {
    console.log("Error personas:", error.message);
    return null;
  }
};

/**
 *  @abstract Función que permite agregar una persona
 * @param {*} persona persona a agregar
 *  @returns persona si se agrega correctamente, false si no  agregar
 */
const agregarPersona = async (persona) => {
  try {

    return (await modeloPersona.Persona.create(persona, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error personas:", error.message);
    return false;
  }
};

/**
 *  @abstract Función que permite eliminar una persona
 * @param {*} id id de la persona a eliminar
 * @returns true si se elimina correctamente, false si no se elimina
 */
const eliminarPersona = async (id) => {
  try {
    const result= await modeloPersona.Persona.destroy({ where: { id_persona: id } });
    return  result === 1; 
  } catch (error) {
    console.log("Error personas:", error.message);
    return false;
  }
};

/**
 * @abstract Función que permite actualizar una persona
 * @param {*} persona persona a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarPersona = async (persona) => {
  try {
    const result = await modeloPersona.Persona.update(persona, { where: { id_persona: persona.id_persona } });
    return result[0] === 1; 
  } catch (error) {
    console.log("Error personas:", error.message);
    return false;
  }
};


/**
 *  @abstract Función que permite obtener una persona por su nombre
 * @param {*} nombre nombre de la persona
 * @param {*} apellido_paterno apellido paterno de la persona
 * @param {*} apellido_materno apellido materno de la persona
 * @returns persona
 * */
const obtenerPersonasNombre = async (nombre, apellido_paterno, apellido_materno) => {
  try {
    const whereClause = {};
    if (nombre) {
      whereClause.nombre = { [Op.like]: `%${nombre}%` };
    }
    if (apellido_paterno) {
      whereClause.apellido_paterno = { [Op.like]: `%${apellido_paterno}%` };
    }
    if (apellido_materno) {
      whereClause.apellido_materno = { [Op.like]: `%${apellido_materno}%` };
    }

    const personas_pre = await modeloPersona.Persona.findAll({
      where: whereClause,
      raw: true,
      nest: true,
      attributes: {
        exclude: ['id_domicilio', 'id_genero']
      },
      include: [modeloPersona.Domicilio, modeloPersona.Genero]
    });

    const personas = personas_pre.map(persona_pre => persona_pre.id_persona);

    if (personas.length === 0) {
      return null;
    } else {
      return personas;
    }
  } catch (error) {
    console.log("Error personas:", error.message);
    return null;
  }
};



//Module exports
module.exports = {
  obtenerPersonas,
  obtenerPersonaPorId,
  agregarPersona,
  eliminarPersona,
  actualizarPersona,
  obtenerPersonasNombre
};
