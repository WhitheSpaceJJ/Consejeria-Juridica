const proceso_judicial = require('../models/proceso_judicial')
const participanteDAO = require('../data-access/participanteDAO')
const juzgadoDAO = require('../data-access/juzgadoDAO')


const estadosProcesalesDAO = require('../data-access/estado_procesalDAO')
const observacionesDAO = require('../data-access/observacionDAO')
const resolucionesDAO = require('../data-access/resolucionDAO')
const pruebasDAO = require('../data-access/pruebaDAO')
const familiaresDAO = require('../data-access/familiarDAO')

const imputadoDAO = require('../data-access/imputadoDAO')
const promoventeDAO = require('../data-access/promoventeDAO')
const domicilioDAO = require('../data-access/domicilio_participanteDAO')




class ProcesoJudicialDAO {

  /**
 * @abstract Método que permite crear un proceso judicial en la base de datos
 * @param {object} procesoJudicial - Objeto que contiene los datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial creado si la operación fue exitosa, de lo contrario lanza un error
 */
  async crearProcesoJudicial({
    turno, promovente, imputado, proceso }) {
    try {
      const promovente_object = JSON.parse(JSON.stringify(promovente))
      const turno_object = JSON.parse(JSON.stringify(turno))
      const imputado_object = JSON.parse(JSON.stringify(imputado))
      const proceso_object = JSON.parse(JSON.stringify(proceso))


      const proceso_creado = await this.registrarProceso(proceso_object, turno_object)
      const promovente_creado = await this.registrarPromovente(promovente_object, proceso_object.familiares, proceso_creado.id_proceso_judicial)
      const imputado_creado = await this.registrarImputado(imputado_object, proceso_creado.id_proceso_judicial)
      const proces_cread_object = JSON.parse(JSON.stringify(proceso_creado))
      proces_cread_object.promovente = promovente_creado
      proces_cread_object.imputado = imputado_creado
      return await this.obtenerProcesoJudicial(proceso_creado.id_proceso_judicial)
    } catch (err) {
      throw err
    }
  }
  async registrarProceso(proceso, turno) {

    const proceso_object = JSON.parse(JSON.stringify(proceso))
    const turno_object = JSON.parse(JSON.stringify(turno))

    const { fecha_inicio, fecha_estatus, control_interno, numero_expediente, id_distrito_judicial, id_municipio_distrito, id_tipo_juicio, estatus_proceso, id_juzgado, id_defensor } = proceso_object
    const { id_turno } = turno_object

    const procesoJudicial = await proceso_judicial.create({ fecha_inicio, fecha_estatus, control_interno, numero_expediente, id_turno, id_distrito_judicial, id_municipio_distrito, id_tipo_juicio, estatus_proceso, id_juzgado, id_defensor })
 
    const proceso_judicial_object = JSON.parse(JSON.stringify(procesoJudicial))

    const pruebas = proceso_object.pruebas
    const observaciones = proceso_object.observaciones
    const resoluciones = proceso_object.resoluciones
    const estadosProcesales = proceso_object.estadosProcesales

    const pruebas_creadas = []
    const observaciones_creadas = []
    const resoluciones_creadas = []
    const estadosProcesales_creados = []

    for (let i = 0; i < pruebas.length; i++) {
      const prueba = await pruebasDAO.crearPrueba({ descripcion_prueba: pruebas[i].descripcion_prueba, id_proceso_judicial: procesoJudicial.id_proceso_judicial })
      pruebas_creadas.push(prueba)
    }

    for (let i = 0; i < observaciones.length; i++) {
      const observacion = await observacionesDAO.crearObservacion({ observacion: observaciones[i].observacion, id_proceso_judicial: procesoJudicial.id_proceso_judicial })
      observaciones_creadas.push(observacion)
    }
    for (let i = 0; i < resoluciones.length; i++) {
      const resolucion = await resolucionesDAO.crearResolucion({ resolucion: resoluciones[i].resolucion, fecha_resolucion: resoluciones[i].fecha_resolucion, id_proceso_judicial: procesoJudicial.id_proceso_judicial })
      resoluciones_creadas.push(resolucion)
    }
    for (let i = 0; i < estadosProcesales.length; i++) {
      const estadoProcesal = await estadosProcesalesDAO.crearEstadoProcesal({ descripcion_estado_procesal: estadosProcesales[i].descripcion_estado_procesal, fecha_estado_procesal: estadosProcesales[i].fecha_estado_procesal, id_proceso_judicial: procesoJudicial.id_proceso_judicial })
      estadosProcesales_creados.push(estadoProcesal)
    }

    proceso_judicial_object.pruebas = pruebas_creadas
    proceso_judicial_object.observaciones = observaciones_creadas
    proceso_judicial_object.resoluciones = resoluciones_creadas
    proceso_judicial_object.estadosProcesales = estadosProcesales_creados
    return proceso_judicial_object

  }
  async registrarImputado(imputado, id_proceso_judicial) {

    const { nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero } = imputado
    const imputado_creado = await participanteDAO.crearParticipante({ nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial })
    const imputado_object = JSON.parse(JSON.stringify(imputado_creado))

    const domicilio = imputado.domicilio
    const { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia } = domicilio

    const domicilioParticipante = await domicilioDAO.crearDomicilioParticipante({ calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante: imputado_object.id_participante })
    imputado_object.domicilio = domicilioParticipante

    const imputado_creado_oficial = await imputadoDAO.crearImputado({ id_imputado: imputado_object.id_participante })
    imputado_object.imputado = imputado_creado_oficial

    return imputado_object

  }
  async registrarPromovente(promovente, familiares, id_proceso_judicial) {


    const { nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero } = promovente
    const participante = await participanteDAO.crearParticipante({ nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_proceso_judicial })
    const participante_object = JSON.parse(JSON.stringify(participante))
    const domicilio = promovente.domicilio
    const { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia } = domicilio
     
    const domicilioParticipante = await domicilioDAO.crearDomicilioParticipante({ calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia, id_participante: participante_object.id_participante })
    participante_object.domicilio = domicilioParticipante
    const id_promovente = participante_object.id_participante
    const { español, id_escolaridad, id_etnia, id_ocupacion } = promovente


    const promovente_creado = await promoventeDAO.crearPromovente({id_promovente, español, id_escolaridad, id_etnia, id_ocupacion })
    participante_object.promovente = promovente_creado

    const familiares_creados = []
    for (let i = 0; i < familiares.length; i++) {
      const familiar = familiares[i]
      const { nombre, nacionalidad, parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema } = familiar
      const familiar_creado = await familiaresDAO.crearFamiliar({ nombre, nacionalidad, parentesco, perteneceComunidadLGBT, adultaMayor, saludPrecaria, pobrezaExtrema, id_promovente: participante_object.id_participante })
      familiares_creados.push(familiar_creado)
    }
    participante_object.familiares = familiares_creados
   
  
    return participante_object
  }



  /**
 * @abstract Método que permite obtener todos los procesos judiciales de la base de datos
 * @returns {array} Retorna un arreglo de objetos de procesos judiciales si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerProcesosJudiciales() {
    try {
      const procesosJudiciales = await proceso_judicial.findAll()
      const procesosJudicialesObject = JSON.parse(JSON.stringify(procesosJudiciales))
      for (let i = 0; i < procesosJudicialesObject.length; i++) {
        procesosJudicialesObject[i].participantes = await participanteDAO.obtenerParticipantesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].juzgado = await juzgadoDAO.obtenerJuzgado(procesosJudicialesObject[i].id_juzgado)
        procesosJudicialesObject[i].estados_procesales = await estadosProcesalesDAO.obtenerEstadoProcesalPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].observaciones = await observacionesDAO.obtenerObservacionesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].resoluciones = await resolucionesDAO.obtenerResolucionesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].pruebas = await pruebasDAO.obtenerPruebasPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
      }
      return procesosJudicialesObject
    } catch (err) {
      throw err
    }
  }
  async obtenerProcesosJudicialesPorDefensor(id_defensor) {
    try {
      const procesosJudiciales = await proceso_judicial.findAll({ where: { id_defensor: id_defensor } })
      const procesosJudicialesObject = JSON.parse(JSON.stringify(procesosJudiciales))
      for (let i = 0; i < procesosJudicialesObject.length; i++) {
        procesosJudicialesObject[i].participantes = await participanteDAO.obtenerParticipantesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].juzgado = await juzgadoDAO.obtenerJuzgado(procesosJudicialesObject[i].id_juzgado)
        procesosJudicialesObject[i].estados_procesales = await estadosProcesalesDAO.obtenerEstadoProcesalPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].observaciones = await observacionesDAO.obtenerObservacionesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].resoluciones = await resolucionesDAO.obtenerResolucionesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].pruebas = await pruebasDAO.obtenerPruebasPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
      }
      return procesosJudicialesObject
    } catch (err) {
      throw err
    }
  }

  async obtenerProcesosJudicialesPorDefensorEstatus(id_defensor, estatus_proceso) {
    try {
      const procesosJudiciales = await proceso_judicial.findAll({ where: { id_defensor: id_defensor, estatus_proceso: estatus_proceso } })
      const procesosJudicialesObject = JSON.parse(JSON.stringify(procesosJudiciales))
      for (let i = 0; i < procesosJudicialesObject.length; i++) {
        procesosJudicialesObject[i].participantes = await participanteDAO.obtenerParticipantesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].juzgado = await juzgadoDAO.obtenerJuzgado(procesosJudicialesObject[i].id_juzgado)
        procesosJudicialesObject[i].estados_procesales = await estadosProcesalesDAO.obtenerEstadoProcesalPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].observaciones = await observacionesDAO.obtenerObservacionesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].resoluciones = await resolucionesDAO.obtenerResolucionesPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
        procesosJudicialesObject[i].pruebas = await pruebasDAO.obtenerPruebasPorProcesoJudicial(procesosJudicialesObject[i].id_proceso_judicial)
      }
      return procesosJudicialesObject
    } catch (err) {
      throw err
    }
  }
  /**
 * @abstract Método que permite obtener un proceso judicial de la base de datos por su id
 * @param {number} id - ID del proceso judicial a obtener
 * @returns {object} Retorna el objeto del proceso judicial si la operación fue exitosa, de lo contrario lanza un error
 */
  async obtenerProcesoJudicial(id) {
    try {
      const procesoJudicial = await proceso_judicial.findByPk(id)
      const procesoJudicialObject = JSON.parse(JSON.stringify(procesoJudicial))

      procesoJudicialObject.participantes = await participanteDAO.obtenerParticipantesPorProcesoJudicial(id)
      procesoJudicialObject.juzgado = await juzgadoDAO.obtenerJuzgado(procesoJudicialObject.id_juzgado)
      procesoJudicialObject.estados_procesales = await estadosProcesalesDAO.obtenerEstadoProcesalPorProcesoJudicial(id)
      procesoJudicialObject.observaciones = await observacionesDAO.obtenerObservacionesPorProcesoJudicial(id)
      procesoJudicialObject.resoluciones = await resolucionesDAO.obtenerResolucionesPorProcesoJudicial(id)
      procesoJudicialObject.pruebas = await pruebasDAO.obtenerPruebasPorProcesoJudicial(id)
      return procesoJudicialObject
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un proceso judicial en la base de datos
 * @param {number} id_proceso_judicial - ID del proceso judicial a actualizar
 * @param {object} procesoJudicial - Objeto que contiene los nuevos datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarProcesoJudicial(id, { fecha_inicio, fecha_estatus,
    control_interno,
    numero_expediente,
    id_turno,
    id_distrito_judicial,
    id_municipio_distrito,
    id_tipo_juicio,
    estatus_proceso,
    id_juzgado, id_defensor }) {
    try {
      const procesoJudicial = await proceso_judicial.update({
        fecha_inicio, fecha_estatus,
        control_interno,
        numero_expediente,
        id_turno,
        id_distrito_judicial,
        id_municipio_distrito,
        id_tipo_juicio,
        estatus_proceso,
        id_juzgado, id_defensor
      }, { where: { id_proceso_judicial: id } })
      return procesoJudicial[0] === 1
    } catch (err) {
      throw err
    }
  }

  /**
 * @abstract Método que permite eliminar un proceso judicial de la base de datos
 * @param {number} id - ID del proceso judicial a eliminar
 * @returns {string} Retorna un mensaje de éxito si la operación fue exitosa, de lo contrario lanza un error
 */
  async eliminarProcesoJudicial(id) {
    try {
      const procesoJudicial = await proceso_judicial.destroy({ where: { id_proceso_judicial: id } })
      return procesoJudicial === 1
    } catch (err) {
      throw err
    }
  }
}

module.exports = new ProcesoJudicialDAO()
