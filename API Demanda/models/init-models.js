var DataTypes = require("sequelize").DataTypes;
var _imputado = require("./Imputado");
//var _demanda = require("./demanda");
//var _denuncia = require("./denuncia");
var _escolaridad = require("./escolaridad");
var _estado_procesal = require("./estado_procesal");
var _etnia = require("./etnia");
//var _juez = require("./juez");
var _juzgado = require("./juzgado");
var _ocupacion = require("./ocupacion");
var _participante = require("./participante");
var _proceso_judicial = require("./proceso_judicial");
var _promovente = require("./promovente");
var _prueba = require("./prueba");
var _ocupacion = require("./ocupacion");
var _familiar = require("./familiar");
var _resolucion = require("./resolucion");
var _observacion = require("./observacion");
var _domicilio_participante = require("./domicilio_participante");


function initModels(sequelize) {
  var imputado = _imputado(sequelize, DataTypes);
 // var demanda = _demanda(sequelize, DataTypes);
 // var denuncia = _denuncia(sequelize, DataTypes);
  var escolaridad = _escolaridad(sequelize, DataTypes);
  var estado_procesal = _estado_procesal(sequelize, DataTypes);
  var etnia = _etnia(sequelize, DataTypes);
 // var juez = _juez(sequelize, DataTypes);
  var juzgado = _juzgado(sequelize, DataTypes);
  var ocupacion = _ocupacion(sequelize, DataTypes);
  var participante = _participante(sequelize, DataTypes);
  var proceso_judicial = _proceso_judicial(sequelize, DataTypes);
  var promovente = _promovente(sequelize, DataTypes);
  var prueba = _prueba(sequelize, DataTypes);
  var ocupacion = _ocupacion(sequelize, DataTypes);
  var familiar = _familiar(sequelize, DataTypes);
  var resolucion = _resolucion(sequelize, DataTypes);
  var observacion = _observacion(sequelize, DataTypes);
  var domicilio_participante = _domicilio_participante(sequelize, DataTypes);

 participante.hasOne(domicilio_participante, {foreignKey: "id_participante"});

  promovente.hasMany(familiar, { foreignKey: "id_promovente"});

  promovente.belongsTo(escolaridad, { as: "id_escolaridad_escolaridad", foreignKey: "id_escolaridad"});

  //  escolaridad.hasMany(participante, { as: "participantes", foreignKey: "id_escolaridad"});
  
  promovente.belongsTo(etnia, { as: "id_etnia_etnium", foreignKey: "id_etnia"});

   promovente.belongsTo(ocupacion, { as: "id_ocupacion_ocupacion", foreignKey: "id_ocupacion"});

  //promovente.belongsTo(etnia, { foreignKey: "id_etnia"});
  //promovente.belongsTo(ocupacion, { foreignKey: "id_ocupacion"});
 // promovente.belongsTo(escolaridad, { foreignKey: "id_escolaridad"});
  


  
  //etnia.hasMany(participante, { as: "participantes", foreignKey: "id_etnia"});
  //denuncia.belongsTo(juez, { as: "id_juez_juez", foreignKey: "id_juez"});
  //juez.hasMany(denuncia, { as: "denuncia", foreignKey: "id_juez"});
  
  proceso_judicial.belongsTo(juzgado, { as: "id_juzgado_juzgado", foreignKey: "id_juzgado"});
  
  //juzgado.hasMany(proceso_judicial, { as: "proceso_judicials", foreignKey: "id_juzgado"});
  
  //participante.belongsTo(ocupacion, { as: "id_ocupacion_ocupacion", foreignKey: "id_ocupacion"});
  
  //ocupacion.hasMany(participante, { as: "participantes", foreignKey: "id_ocupacion"});
  
  imputado.belongsTo(participante, { as: "id_participante_participante", foreignKey: "id_participante"});
  
  participante.hasOne(imputado, { as: "Imputado", foreignKey: "id_participante"});
  
  
  promovente.belongsTo(participante, { as: "id_participante_participante", foreignKey: "id_participante"});
  
  participante.hasOne(promovente, { as: "promovente", foreignKey: "id_participante"});
  
  //demanda.belongsTo(proceso_judicial, { as: "id_proceso_judicial_proceso_judicial", foreignKey: "id_proceso_judicial"});
  //proceso_judicial.hasMany(demanda, { as: "demandas", foreignKey: "id_proceso_judicial"});
  
  //denuncia.belongsTo(proceso_judicial, { as: "id_proceso_judicial_proceso_judicial", foreignKey: "id_proceso_judicial"});
  //proceso_judicial.hasMany(denuncia, { as: "denuncia", foreignKey: "id_proceso_judicial"});
  
  
  estado_procesal.belongsTo(proceso_judicial, { as: "id_proceso_judicial_proceso_judicial", foreignKey: "id_proceso_judicial"});
  proceso_judicial.hasMany(estado_procesal, { as: "estado_procesals", foreignKey: "id_proceso_judicial"});
 
   resolucion.belongsTo(proceso_judicial, { as: "id_proceso_judicial_proceso_judicial", foreignKey: "id_proceso_judicial"});
  proceso_judicial.hasMany(resolucion, { as: "resolucions", foreignKey: "id_proceso_judicial"});

  observacion.belongsTo(proceso_judicial, { as: "id_proceso_judicial_proceso_judicial", foreignKey: "id_proceso_judicial"});
  proceso_judicial.hasMany(observacion, { as: "observacions", foreignKey: "id_proceso_judicial"});

  prueba.belongsTo(proceso_judicial, { as: "id_proceso_judicial_proceso_judicial", foreignKey: "id_proceso_judicial"});
  proceso_judicial.hasMany(prueba, { as: "pruebas", foreignKey: "id_proceso_judicial"});

  return {
    imputado,
    demanda,
    denuncia,
    escolaridad,
    estado_procesal,
    etnia,
    juez,
    juzgado,
    ocupacion,
    participante,
    proceso_judicial,
    promovente,
    prueba,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
