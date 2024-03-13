const {Asesoria,Empleado,Asesorado,
   DetalleAsesoriaCatalogo,TipoJuicio,DistritoJudicial}=require("../utilidades/modelosBase");


//Empleado.belongsTo(DistritoJudicial, { foreignKey: "id_distrito_judicial" });

Asesoria.belongsTo(Empleado, { foreignKey: "id_empleado" })
Asesoria.belongsTo(Asesorado, { foreignKey: "id_asesorado"})
Asesoria.hasMany(DetalleAsesoriaCatalogo,{foreignKey:"id_asesoria"});
Asesoria.belongsTo(TipoJuicio, { foreignKey: "id_tipo_juicio" })
Asesoria.hasOne(DistritoJudicial, { foreignKey: "id_distrito_judicial" })


module.exports = {Asesoria

  ,Asesorado,Empleado,
  DetalleAsesoriaCatalogo,TipoJuicio,
  DistritoJudicial
};