// Importamos los routers de cada entidad
const routerEscolaridad = require('./escolaridad')
const routerEstadoProcesal = require('./estado_procesal')
const routerEtnia = require('./etnia')
const routerImputado = require('./imputado')
const routerJuzgado = require('./juzgado')
const routerOcupacion = require('./ocupacion')
const routerParticipante = require('./participante')
const routerProcesoJudicial = require('./proceso_judicial')
const routerPromovente = require('./promovente')
const routerPrueba = require('./prueba')  
const routerDomicilioParticipante = require('./domicilio_participante')
const routerObservacion = require('./observacion')
const rouiterResolucion = require('./resolucion')
const routerFamiliar = require('./familiar')

// Exportamos los routers para que puedan ser utilizados en otras partes de la aplicación
module.exports = {
  routerEscolaridad,
  routerEstadoProcesal,
  routerEtnia,
  routerImputado,
  routerJuzgado,
  routerOcupacion,
  routerParticipante,
  routerProcesoJudicial,
  routerPromovente,
  routerPrueba,
  routerDomicilioParticipante,
  routerObservacion,
  rouiterResolucion,
  routerFamiliar
}