//Falta relacion de defensor y asesoria y actualizar controles
const modeloAsesoria = require('../modelos/modeloAsesoria');
const modeloDistritoJudicial = require('../modelos/modeloDistritoJudicial');

/** Operaciones Basica */
const controlPersonas = require('./controlPersonas');
const controlZonas = require('./controlZona');
const controlEstadoCivil = require('./controlEstadoCivil');
const controlMotivo = require('./controlMotivo');
const controlCatalogoRequisito = require('./controlCatalogoRequisito');
const controlDomicilios = require('./controlDomicilio');
const controlAsesorados = require('./controlAsesorados');
//const controlTurnos = require('./controlTurno');
const controlDetalleAsesoria = require('./controlDetalleAsesoria');
const controlAsesor = require('./controlAsesor');
const controlDefensor = require('./controlDefensor');
const controlEmpleado = require('./controlEmpleados');
const { Op, literal } = require("sequelize");
const Sequelize = require('sequelize');
const controlDistritoJudicial = require('./controlDistritosJudiciales');
const controlMunicipios = require('./controlMunicipioDistro');
const controlTurno = require('./controlTurno');

/**
 * @abstract Función que permite obtener asesorias por filtro
 * @returns asesorias
 */
const obtenerAsesoriasFiltro = async (filtros) => {
  try {

    const whereClause = await obtenerWhereClause(filtros);


    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          //'id_turno',
          'id_tipo_juicio']
      },
      include: [{
        model: modeloAsesoria.Asesorado,
      },
      {
        model: modeloAsesoria.DetalleAsesoriaCatalogo,
      },
      {
        model: modeloAsesoria.Turno,
      },
      {
        model: modeloAsesoria.DistritoJudicial
      },
      {
        model: modeloAsesoria.Empleado
      },

      // {
      //    model: modeloAsesoria.Empleado,
      //    include: [{
      //      model: modeloAsesoria.DistritoJudicial,
      //  }]
      //  },
      {
        model: modeloAsesoria.TipoJuicio,
      }
      ],
      where: whereClause,
    });

    const asesorias = [];

    for (const asesoria_pre of asesorias_pre) {
      asesorias.push(await formarAseoria(asesoria_pre));
    }

    return asesorias;
  } catch (error) {
    throw new Error(`Error al consultar las asesorías: ${error.message}`);
  }
};




/**
 *  @abstract Función que permite obtener todos los asesorias 
 * @returns asesorias
 */
const obtenerAsesorias = async () => {
  try {
    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          //'id_turno', 
          'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.DistritoJudicial,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ]
    });

    const asesorias = [];

    for (const asesoria_pre of asesorias_pre) {
      const asesoria_obj = await formarAseoria(asesoria_pre);
      asesorias.push(asesoria_obj);
    }

    if (asesorias.length > 0) {
      return asesorias;
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("Error Asesorias:", error.message);
    return null;
  }
};

const formarAseoria = async (asesoria_pre) => {

  try {
    const asesoria_obj = JSON.parse(JSON.stringify(asesoria_pre));
    delete asesoria_obj.id_empleado;
    if (asesoria_obj.detalle_asesorias_catalogos.length > 0) {
      const recibidos = [];
      for (const detalle of asesoria_obj.detalle_asesorias_catalogos) {
        const id_catalogo = detalle.id_catalogo;
        const catalogo = await controlCatalogoRequisito.obtenerCatalogoRequisitoPorId(id_catalogo);
        recibidos.push(catalogo);
      }
      delete asesoria_obj.detalle_asesorias_catalogos;
      asesoria_obj.recibidos = recibidos;
      //  console.log("Paso recibidos");
    }
    if (asesoria_obj.turno !== null) {
      const defensor = await controlDefensor.obtenerDefensorPorId(asesoria_obj.turno.id_defensor);
      asesoria_obj.turno.defensor = defensor;
      delete asesoria_obj.turno.id_defensor;
      delete asesoria_obj.turno.id_asesoria;
      //  console.log("Paso turno");
    }
    // Add other data processing steps similar to obtenerAsesoriaPorIdAsesorado here
    const tipo_empleado = asesoria_obj.empleado.tipo_empleado;
    if (tipo_empleado === "asesor") {
      const id_empleado = asesoria_obj.empleado.id_empleado;
      const asesor = await controlAsesor.obtenerAsesorPorId(id_empleado);
      asesoria_obj.asesor = asesor;
      delete asesoria_obj.empleado;
      //    console.log("Paso asesor");
    } else if (tipo_empleado === "defensor") {
      const id_empleado = asesoria_obj.empleado.id_empleado;
      const defensor = await controlDefensor.obtenerDefensorPorId(id_empleado);
      asesoria_obj.defensor = defensor;
      delete asesoria_obj.empleado;
      //  console.log("Paso defensor");
    }
    const persona = await controlPersonas.obtenerPersonaPorId(asesoria_obj.asesorado.id_asesorado);
    asesoria_obj.persona = persona;

    if (asesoria_obj.asesorado.id_motivo !== null) {
      const motivo = await controlMotivo.obtenerMotivoPorId(asesoria_obj.asesorado.id_motivo);
      delete asesoria_obj.asesorado.id_motivo;
      asesoria_obj.asesorado.motivo = motivo;
      // console.log("Paso motivo");
    }
    const estado_civil = await controlEstadoCivil.obtenerEstadoCivilPorId(asesoria_obj.asesorado.id_estado_civil);
    delete asesoria_obj.asesorado.id_estado_civil;
    asesoria_obj.asesorado.estado_civil = estado_civil;
    const datos_asesoria = {};
    datos_asesoria.id_asesoria = asesoria_obj.id_asesoria;
    datos_asesoria.resumen_asesoria = asesoria_obj.resumen_asesoria;
    datos_asesoria.conclusion_asesoria = asesoria_obj.conclusion_asesoria;
    datos_asesoria.estatus_requisitos = asesoria_obj.estatus_requisitos;
    datos_asesoria.fecha_registro = asesoria_obj.fecha_registro;
    datos_asesoria.usuario = asesoria_obj.usuario;
    datos_asesoria.id_usuario = asesoria_obj.id_usuario;
    // datos_asesoria.id_distrito_judicial = asesoria_obj.id_distrito_judicial;
    //  datos_asesoria.id_municipio_distrito = asesoria_obj.id_municipio_distrito;
    datos_asesoria.estatus_asesoria = asesoria_obj.estatus_asesoria;
    //  console.log("Paso datos_asesoria");
    const distrito_judicial = await controlDistritoJudicial.obtenerDistritoJudicial(asesoria_obj.id_distrito_judicial);
    asesoria_obj.distrito_judicial = distrito_judicial;
    //  console.log("Paso distrito_judicial");
    const municipio = await controlMunicipios.obtenerMunicipioPorId(asesoria_obj.id_municipio_distrito);
    asesoria_obj.municipio = municipio;
    //  console.log("Paso municipio");
    asesoria_obj.datos_asesoria = datos_asesoria;

    delete asesoria_obj.id_asesoria;
    delete asesoria_obj.resumen_asesoria;
    delete asesoria_obj.conclusion_asesoria;
    delete asesoria_obj.estatus_requisitos;
    delete asesoria_obj.fecha_registro;
    delete asesoria_obj.usuario;

    delete asesoria_obj.id_usuario;
    delete asesoria_obj.id_distrito_judicial;
    delete asesoria_obj.id_municipio_distrito;
    delete asesoria_obj.estatus_asesoria;

    // console.log("Paso final");

    return asesoria_obj;
  } catch (error) {
    console.log("Error Asesorias fin 2:", error.message);
    return null;
  }


};


/**
 * @abstract Función que permite obtener un asesoria por su id
 *  @param {*} id id del asesoria
 * @returns asesoria
 *  
 *  */
const obtenerAsesoriaPorId = async (id) => {
  try {
    const asesorias_pre = await modeloAsesoria.Asesoria.findByPk(id, {
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          // 'id_turno',
          'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.DistritoJudicial,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ]
    });
    return await formarAseoria(asesorias_pre);
  } catch (error) {
    console.log("Error Asesorias:", error.message);
    return null;
  }
};


/**
 * @abstract Función que permite obtener un asesoria por id del asesorado
 * @param {*} id_asesorado id del asesorado
 *  @returns asesoria
 * */
const obtenerAsesoriaPorIdAsesorado = async (id_asesorado) => {

  try {
    const asesoria_pre = await modeloAsesoria.Asesoria.findOne({
      where: { id_asesorado: id_asesorado },
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          // 'id_turno',
          'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.DistritoJudicial,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ],

    });
    return await formarAseoria(asesoria_pre);
  } catch (error) {
    console.log("Error Asesorias aqui:", error.message);
    return null;
  }
};



/**
 * @abstract Función que permite agregar un asesoria
 * @param {*} asesoria asesoria a agregar
 * @returns asesoria si se agrega correctamente, false si no  agregar
 * */
const agregarAsesoria = async (asesoria_pre) => {
  try {
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria_obj = JSON.parse(asesoria_str);

    const asesorado = asesoria_obj.asesorado;
    const datos_asesoria = asesoria_obj.datos_asesoria;
    const empleado = asesoria_obj.empleado;
    const persona = asesoria_obj.persona;
    const recibidos = asesoria_obj.recibidos;
    const tipojuicio = asesoria_obj.tipos_juicio;

    const domicilio_pre = await controlDomicilios.agregarDomicilio(persona.domicilio);
    const domicilio_str = JSON.stringify(domicilio_pre);
    const domicilio_obj = JSON.parse(domicilio_str);
    delete persona.domicilio;
    persona.id_domicilio = domicilio_obj.id_domicilio;
    persona.id_genero = persona.genero.id_genero;
    delete persona.genero;
    const persona_pre = await controlPersonas.agregarPersona(persona);


    //Asesorado
    asesorado.id_estado_civil = asesorado.estado_civil.id_estado_civil;
    delete asesorado.estado_civil;
    asesorado.id_asesorado = persona_pre.id_persona;
    if (asesorado.motivo !== null) {
      asesorado.id_motivo = asesorado.motivo.id_motivo;
      delete asesorado.motivo;

    }
    const asesorado_pre = await controlAsesorados.agregarAsesorado(asesorado)


    datos_asesoria.id_asesorado = asesorado_pre.id_asesorado;
    datos_asesoria.id_empleado = empleado.id_empleado;

    datos_asesoria.id_tipo_juicio = tipojuicio.id_tipo_juicio;

    const asesoria_cre = (await modeloAsesoria.Asesoria.create(datos_asesoria, { raw: true, nest: true })).dataValues;
    const asesoria_str2 = JSON.stringify(asesoria_cre);
    const asesoria_obj2 = JSON.parse(asesoria_str2);

    if (recibidos.length > 0) {
      for (const elemento of recibidos) {
        elemento.id_asesoria = asesoria_obj2.id_asesoria;
        await controlDetalleAsesoria.agregarDetalleAsesoriaCatalogo(elemento);
      }
    }
    return await obtenerAsesoriaPorIdAsesorado(asesoria_obj2.id_asesorado);
  } catch (error) {
    console.log("Error Asesorias:", error.message);
    return false;
  }
};


/**
 * @abstract Función que permite actualizar un asesoria
 * @param {*} asesoria asesoria a actualizar
 * @returns true si se actualiza correctamente, false si no se actualiza
 * */
const actualizarAsesoria = async (asesoria_pre) => {
  //Falta verificar
  try {

    /*
    {
        "turno": {
            "fecha_turno": "2024-05-20",
            "hora_turno": "12:12",
            "id_defensor": "10",
            "id_asesoria": 31
        },
        "distrito_judicial": {
            "id_distrito_judicial": 1,
            "nombre_distrito_judicial": "Distrito Judicial de Alamos",
            "municipio_distrito": {
                "id_municipio_distrito": 60,
                "nombre_municipio": "Álamos",
                "id_distrito_judicial": 1
            },
            "zona": {
                "id_zona": 3,
                "nombre_zona": "SUR"
            }
        },
        "tipos_juicio": {
            "id_tipo_juicio": 1,
            "tipo_juicio": "Divorcio Incausado",
            "estatus_general": "ACTIVO"
        },
        "persona": {
            "id_persona": 31,
            "nombre": "Martha",
            "apellido_materno": "Gonzalez",
            "apellido_paterno": "Lopez",
            "edad": 20,
            "telefono": "6442138093",
            "domicilio": {
                "id_domicilio": 31,
                "calle_domicilio": "13 de octubre",
                "numero_exterior_domicilio": "1130",
                "numero_interior_domicilio": "",
                "id_colonia": "197"
            },
            "genero": {
                "id_genero": 2,
                "descripcion_genero": "Femenino",
                "estatus_general": "ACTIVO"
            }
        },
        "municipio": {
            "id_municipio_distrito": 60,
            "nombre_municipio": "Álamos",
            "id_distrito_judicial": 1
        },
        "datos_asesoria": {
            "id_asesoria": 31,
            "resumen_asesoria": "En resumen la asesoria trato de como resolver el divorcio en cuestion por inconformidad de la pareja",
            "conclusion_asesoria": "Al final se pudo llegar a un acuerdo que era lo mejor se repartieron los vienes en cantidades equitativas",
            "estatus_requisitos": true,
            "fecha_registro": "2023-12-16",
            "usuario": "DPS Usuario Nueve",
            "id_usuario": 9,
            "estatus_asesoria": "TURNADA",
            "id_empleado": 17
        }
    }
    */
    const asesoria_str = JSON.stringify(asesoria_pre);
    const asesoria_obj = JSON.parse(asesoria_str);

    const persona = asesoria_obj.persona;
    const domicilio = persona.domicilio;
    const datos_asesoria = asesoria_obj.datos_asesoria;
    const turno = asesoria_obj.turno;
    const municipio = asesoria_obj.municipio;
    const distrito_judicial = asesoria_obj.distrito_judicial;
    const tipos_juicio = asesoria_obj.tipos_juicio;
    //Primero actualiza el domicilio

    const domicilio_actualizado = await controlDomicilios.actualizarDomicilio(domicilio);
    persona.id_domicilio = domicilio_actualizado.id_domicilio;
    persona.id_genero = persona.genero.id_genero;
    delete persona.genero;
    delete persona.domicilio;
    const persona_actualizada = await controlPersonas.actualizarPersona(persona);

    datos_asesoria.id_asesorado = persona_actualizada.id_persona;
    datos_asesoria.id_tipo_juicio = tipos_juicio.id_tipo_juicio;
    datos_asesoria.id_distrito_judicial = distrito_judicial.id_distrito_judicial;
    datos_asesoria.id_municipio_distrito = municipio.id_municipio_distrito;

    const asesoria_actualizada = (await modeloAsesoria.Asesoria.update(datos_asesoria, { where: { id_asesoria: datos_asesoria.id_asesoria } }));
    const turno_agregado = await controlTurno.agregarTurno(turno);
    return await obtenerAsesoriaPorId(datos_asesoria.id_asesoria);
  } catch (error) {
    console.log("Error Asesorias:", error.message);
    return false;
  }
};



//Funcion que te regrese una lista de asesorias por asi decirlo si te envian el numero 1 como paramtro te regrese las primeras 10 asesorias, y se te envia el dos que te envie las otras 10 y asi sucesivamente

const obtenerAsesoriasPorPagina = async (pageNumber) => {
  try {
    // const total = await modeloAsesoria.Asesoria.count();
    const page = pageNumber || 1; // Página actual, predeterminada: 1
    const pageSize = 10; // Cantidad de productos por página
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          //'id_turno',
          'id_tipo_juicio']
      },
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.DistritoJudicial,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ],
      where: {
        id_asesoria: { [Sequelize.Op.not]: null } // Excluir registros eliminados
      },
      offset: offset,
      limit: limit
    });

    const asesorias = [];

    for (const asesoria_pre of asesorias_pre) {
      asesorias.push(await formarAseoria(asesoria_pre));
    }
    if (asesorias.length > 0) {
      return asesorias;
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("Error Asesorias:", error.message);
    return null;
  }
};


const obtenerWhereClause = async (filtros) => {
  const whereClause = {};

  //if (filtros.fecha_registro) {
  //  whereClause.fecha_registro = filtros.fecha_registro;
  //} else 


  if (filtros['fecha-inicio'] !== "null" && filtros['fecha-final'] !== "null") {
    whereClause.fecha_registro = {
      [Op.between]: [filtros['fecha-inicio'], filtros['fecha-final']],
    };
  }



  if (filtros.id_distrito_judicial) {
    whereClause.id_distrito_judicial = filtros.id_distrito_judicial;
  }

  if (filtros.fecha_registro !== "null") {
    whereClause.fecha_registro = filtros.fecha_registro;
  }

  if (filtros.id_asesor && filtros.id_defensor) {
    whereClause[Op.or] = [
      { id_empleado: filtros.id_asesor },
      { id_empleado: filtros.id_defensor },
    ];
  } else if (filtros.id_asesor) {
    whereClause.id_empleado = filtros.id_asesor;
  } else if (filtros.id_defensor) {
    whereClause.id_empleado = filtros.id_defensor;
  }

  if (filtros.id_municipio) {

    whereClause.id_municipio_distrito = filtros.id_municipio;
    // Asegúrate de que la relación entre Empleado y Municipio esté definida
    // y ajusta el nombre del modelo y la clave foránea según sea necesario
    //  whereClause['$empleado.distrito_judicial.id_municipio_distrito$'] = filtros.id_municipio;
  }
  if (filtros.id_distrito_judicial) {
    whereClause.id_distrito_judicial = filtros.id_distrito_judicial;
  }

  if (filtros.id_zona) {
    // Asegúrate de que la relación entre Empleado y Zona esté definida
    // y ajusta el nombre del modelo y la clave foránea según sea necesario
    whereClause['$distrito_judicial.id_zona$'] = filtros.id_zona;
  }
  // Resto del código...
  return whereClause;

};



//Funcion que te regrese una lista de asesorias por asi decirlo si te envian el numero 1 como paramtro te regrese las primeras 10 asesorias, y se te envia el dos que te envie las otras 10 y asi sucesivamente

const obtenerAsesoriasFiltroPagina = async (pageNumber, filtros) => {
  try {

    const whereClause = await obtenerWhereClause(filtros);


    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          //'id_turno',
          'id_tipo_juicio']
      },
      include: [{
        model: modeloAsesoria.Asesorado,
      },
      {
        model: modeloAsesoria.DetalleAsesoriaCatalogo,
      },
      {
        model: modeloAsesoria.Turno,
      },
      {
        model: modeloAsesoria.DistritoJudicial
      },
      {
        model: modeloAsesoria.Empleado
      },

      // {
      //    model: modeloAsesoria.Empleado,
      //    include: [{
      //      model: modeloAsesoria.DistritoJudicial,
      //  }]
      //  },
      {
        model: modeloAsesoria.TipoJuicio,
      }
      ],
      where: whereClause,
    });

    const asesorias = [];
    const pageSize = 10;
    pageNumber = parseInt(pageNumber, 10);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Obtener las asesorías según la página usando slice
    const asesoriasOnPage = asesorias_pre.slice(startIndex, endIndex);

    // Formar las asesorías usando async/await dentro de un bucle for
    for (const asesoria of asesoriasOnPage) {
      asesorias.push(await formarAseoria(asesoria));
    }

    if (asesorias.length > 0) {
      return asesorias;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error al consultar las asesorías: ${error.message}`);
  }
};


/**
 * @abstract Función que permite obtener asesorias por ids de los asesorados
 * @param {*} id_asesorado id de los asesorados
 *  @returns asesorias
 * */
const obtenerAsesoriaPorIdAsesorados = async (ids_asesorados) => {

  try {
    //Recorre el arreglo ids_asesorados y manda a llamar la funcion obtenerAsesoriaPorIdAsesorado y retorna un arreglo de asesorias con todos las asesorias de los asesorados
    const asesorias = [];
    for (const id_asesorado of ids_asesorados) {
      const asesoria = await obtenerAsesoriaPorIdAsesorado(id_asesorado);
      asesorias.push(asesoria);
    }
    if (asesorias.length > 0) {
      return asesorias;
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("Error asesorias:", error.message);
    return null;
  }
};

const obtenerAsesoriasNombre = async (nombre, apellido_paterno, apellido_materno, pagina, total) => {

  try {
    if (total === "true") {
      const whereClause = {};

      whereClause.estatus_asesoria = "NO_TURNADA";
      if (nombre || apellido_paterno || apellido_materno) {
        whereClause['$asesorado.persona.nombre$'] = nombre ? { [Op.like]: `%${nombre}%` } : { [Op.not]: null };
        whereClause['$asesorado.persona.apellido_paterno$'] = apellido_paterno ? { [Op.like]: `%${apellido_paterno}%` } : { [Op.not]: null };
        whereClause['$asesorado.persona.apellido_materno$'] = apellido_materno ? { [Op.like]: `%${apellido_materno}%` } : { [Op.not]: null };
      }
      const asesoria_pre = await modeloAsesoria.Asesoria.count({
        raw: false,
        nest: true,
        attributes: {
          exclude: ['id_asesorado',
            'id_tipo_juicio']
        },
        include: [
          {
            model: modeloAsesoria.Asesorado,
            include: [{
              model: modeloAsesoria.Persona,
            }]
          }
          ,
          {
            model: modeloAsesoria.DetalleAsesoriaCatalogo,
          },
          {
            model: modeloAsesoria.Turno,
          },
          {
            model: modeloAsesoria.DistritoJudicial,
          },
          {
            model: modeloAsesoria.Empleado,
          },
          {
            model: modeloAsesoria.TipoJuicio,
          }

        ],
        where: whereClause
      });
      return asesoria_pre;
    } else {

      const whereClause = {};

      whereClause.estatus_asesoria = "NO_TURNADA";

      // Construir el whereClause para la tabla Persona
      if (nombre || apellido_paterno || apellido_materno) {
        whereClause['$asesorado.persona.nombre$'] = nombre ? { [Op.like]: `%${nombre}%` } : { [Op.not]: null };
        whereClause['$asesorado.persona.apellido_paterno$'] = apellido_paterno ? { [Op.like]: `%${apellido_paterno}%` } : { [Op.not]: null };
        whereClause['$asesorado.persona.apellido_materno$'] = apellido_materno ? { [Op.like]: `%${apellido_materno}%` } : { [Op.not]: null };
      }


      const asesoria_pre = await modeloAsesoria.Asesoria.findAll({
        raw: false,
        nest: true,
        attributes: {
          exclude: ['id_asesorado',
            // 'id_turno',
            'id_tipo_juicio']
        },
        include: [
          {
            model: modeloAsesoria.Asesorado,
            include: [{
              model: modeloAsesoria.Persona,
            }]
          }
          ,
          {
            model: modeloAsesoria.DetalleAsesoriaCatalogo,
          },
          {
            model: modeloAsesoria.Turno,
          },
          {
            model: modeloAsesoria.DistritoJudicial,
          },
          {
            model: modeloAsesoria.Empleado,
          },
          {
            model: modeloAsesoria.TipoJuicio,
          }

        ],
        where: whereClause
      });
      const asesorias = [];
      const pageSize = 10;
      pagina = parseInt(pagina, 10);
      const startIndex = (pagina - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Obtener las asesorías según la página usando slice
      const asesoriasOnPage = asesoria_pre.slice(startIndex, endIndex);

      // Formar las asesorías usando async/await dentro de un bucle for
      for (const asesoria of asesoriasOnPage) {
        asesorias.push(await formarAseoria(asesoria));
      }

      if (asesorias.length > 0) {
        return asesorias;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log("Error Asesorias aqui:", error.message);
    return null;
  }
};




/**
 * @abstract Función que permite obtener el total de asesorías por filtro
 * @returns total de asesorías
 */
const obtenerTotalAsesorias = async (filtros) => {
  try {


    const whereClause = await obtenerWhereClause(filtros);


    const asesorias_pre = await modeloAsesoria.Asesoria.findAll({
      raw: false,
      nest: true,
      attributes: {
        exclude: ['id_asesorado',
          //'id_turno',
          'id_tipo_juicio']
      },
      include: [{
        model: modeloAsesoria.Asesorado,
      },
      {
        model: modeloAsesoria.DetalleAsesoriaCatalogo,
      },
      {
        model: modeloAsesoria.Turno,
      },
      {
        model: modeloAsesoria.DistritoJudicial
      },
      {
        model: modeloAsesoria.Empleado
      },

      // {
      //    model: modeloAsesoria.Empleado,
      //    include: [{
      //      model: modeloAsesoria.DistritoJudicial,
      //  }]
      //  },
      {
        model: modeloAsesoria.TipoJuicio,
      }
      ],
      where: whereClause,
    });

    return asesorias_pre.length;
  } catch (error) {
    throw new Error(`Error al consultar las asesorías: ${error.message}`);
  }
};

/**
 *  @abstract Función que permite obtener el total de asesorías en el sistema
 * @returns total de asesorías
 */
const obtenerTotalAsesoriasSistema = async () => {
  try {
    const totalAsesorias = await modeloAsesoria.Asesoria.count();
    return totalAsesorias;
  } catch (error) {
    console.log("Error asesorias:", error.message);
    return null;
  }
};

const obtenerAsesoriaIDSimpleMiddleware = async (id) => {
  try {
    const asesoria = await modeloAsesoria.Asesoria.findByPk(id);
    return asesoria;
  } catch (error) {
    console.log("Error asesorias:", error.message);
    return null;
  }
};

const obtenerAsesoriaIDSimpleMiddleware2WithData = async (id) => {
  try {
    const asesoria = await modeloAsesoria.Asesoria.findByPk(id, {
      raw: false,
      nest: true,
      include: [
        modeloAsesoria.Asesorado,
        modeloAsesoria.DetalleAsesoriaCatalogo,
        modeloAsesoria.Turno,
        modeloAsesoria.DistritoJudicial,
        modeloAsesoria.Empleado,
        modeloAsesoria.TipoJuicio
      ]
    });
    return asesoria;
  } catch (error) {
    console.log("Error asesorias:", error.message);
    return null;
  }
}

// Export model functions and routes  
module.exports = {
  obtenerAsesoriaPorIdAsesorados,
  obtenerAsesorias,
  obtenerAsesoriaPorId,
  obtenerAsesoriaPorIdAsesorado,
  agregarAsesoria,
  actualizarAsesoria,
  obtenerAsesoriasFiltro,
  obtenerAsesoriasPorPagina
  ,
  obtenerTotalAsesoriasSistema,
  obtenerTotalAsesorias
  ,
  obtenerAsesoriasFiltroPagina,
  obtenerAsesoriasNombre,
  obtenerAsesoriaIDSimpleMiddleware
};
