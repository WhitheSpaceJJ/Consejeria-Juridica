const { where } = require('sequelize');
const modeloTurno = require('../modelos/modeloTurno');

//Falta relacion de defensor y asesoria y actualizar controles

/**
 * @abstract Función que permite obtener todos los turnos
 * @returns turnos
 */
const obtenerTurnos = async (id_defensor, id_distrito_judicial, total, pagina) => {
  try {

    const limite = 10;
    const offset = (parseInt(pagina, 10) - 1) * limite;

    const whereClause = { estatus_general: "NO_SEGUIMIENTO" };
    if (id_defensor) whereClause.id_defensor = id_defensor;
    if (id_distrito_judicial) whereClause['$defensor.empleado.id_distrito_judicial$'] = id_distrito_judicial;

    if (total) {
      return await modeloTurno.Turno.count({
        raw: false,
        nest: true,
        where: whereClause,
        include: [
          {
            model: modeloTurno.Asesoria,
          }, 
          {
            model: modeloTurno.Defensor,
            include: [
              {
                model: modeloTurno.Empleado,
              },
            ],
          },

        ] });
    } else {
      const turnos_pre = await modeloTurno.Turno.findAll({
        raw: false,
        nest: true,
        where: whereClause,
        include: [
          {
            model: modeloTurno.Asesoria,
          }, 
          {
            model: modeloTurno.Defensor,
            include: [
              {
                model: modeloTurno.Empleado,
              },
            ],
          },

        ]
       // ,limit: limite,
      //  offset: offset
      });
    
     const controlAsesoria = require('./controlAsesoria');

      const turnos = [];

      const pageSize = 10;
      const pageNumber = parseInt(pagina, 10);
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;

       const turnosOnPage = turnos_pre.slice(startIndex, endIndex); 

      for (let i = 0; i < turnosOnPage.length; i++) {
        const turno = JSON.parse(JSON.stringify(turnosOnPage[i]));
        const asesoria = await controlAsesoria.obtenerAsesoriaPorId(turno.id_asesoria);
        delete asesoria.turno;
        delete turno.id_asesoria;
        delete turno.id_defensor;
        turno.asesoria = asesoria;
        turnos.push(turno);
      }

       if (turnos.length > 0) {
        return turnos;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error("Error turno:", error.message);
    throw error;
  }
};

/**
 * @abstract Función que permite obtener un turno por su id
 * @param {*} id id del turno
 * @returns turno
 */
const obtenerTurnoPorId = async (id) => {
  try {
    const controlAsesoria = require('./controlAsesoria');

    const turno_pre = await modeloTurno.Turno.findByPk(id, {
      raw: false,
      nest: true,
      include: [
        {
          model: modeloTurno.Asesoria,
        }, 
        {
          model: modeloTurno.Defensor,
          include: [
            {
              model: modeloTurno.Empleado,
            },
          ],
        },

      ] 
    });
    const turno = JSON.parse(JSON.stringify(turno_pre));
    const asesoria = await controlAsesoria.obtenerAsesoriaPorId(turno.id_asesoria);
    delete asesoria.turno;
    delete turno.id_asesoria;
    delete turno.id_defensor;
    turno.asesoria = asesoria;
    return turno;
  } catch (error) {
    console.log("Error turno:", error.message);
    return null;
  }
};
const obtenerTurnoPorDefensorId = async (id) => {
  try {
    const controlAsesoria = require('./controlAsesoria');

    const turno_pre = await modeloTurno.Turno.findAll({
      raw: false,
      nest: true,
      include: [
        {
          model: modeloTurno.Asesoria,
        }, 
        {
          model: modeloTurno.Defensor,
          include: [
            {
              model: modeloTurno.Empleado,
            },
          ],
        },

      ] ,
      where: { id_defensor: id, estatus_general: "NO_SEGUIMIENTO" },
    });
    const turnos = [];
    for (let i = 0; i < turno_pre.length; i++) {
      const turno = JSON.parse(JSON.stringify(turno_pre[i]));
      const asesoria = await controlAsesoria.obtenerAsesoriaPorId(turno.id_asesoria);
      delete asesoria.turno;
      delete turno.id_asesoria;
      delete turno.id_defensor;
      turno.asesoria = asesoria;
      turnos.push(turno);
    }
    return turnos;
  } catch (error) {
    console.log("Error turno:", error.message);
    return null;
  }

}

/**
 * @abstract Función que permite agregar un turno
 * @param {*} turno turno a agregar
 * @returns turno si se agrega correctamente, false si no  agregar
 * */
const agregarTurno = async (turno) => {
  try {
    return (await modeloTurno.Turno.create(turno, { raw: true, nest: true })).dataValues;
  } catch (error) {
    console.log("Error turno:", error.message);
    return false;
  }
};



/**
 * @abstract Función que permite actualizar un turno
 * @param {*} turno turno a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 */
const actualizarTurno = async (turno) => {
  try {
    const result = await modeloTurno.Turno.update(turno, { where: { id_turno: turno.id_turno } });
    return result[0] === 1;
  } catch (error) {
    console.log("Error turno:", error.message);
    return false;
  }
};


const onbtenerTurnoIDSimple = async (id) => {
  try {
    const turno = await modeloTurno.Turno.findByPk(id, {
      raw: true,
    });
    return turno;
  } catch (error) {
    console.log("Error turno:", error.message);
    return null;
  }
};

//    Module exports:
module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  agregarTurno,
  actualizarTurno,
  obtenerTurnoPorDefensorId,
  onbtenerTurnoIDSimple
};
