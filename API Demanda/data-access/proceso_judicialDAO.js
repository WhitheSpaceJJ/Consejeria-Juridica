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


    const promovente_creado = await promoventeDAO.crearPromovente({ id_promovente, español, id_escolaridad, id_etnia, id_ocupacion })
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
  async actualizarProcesoJudicial(proceso_judicial_ob, promovente) {
 
    const proceso_object = JSON.parse(JSON.stringify(proceso_judicial_ob))
    const promovente_object = JSON.parse(JSON.stringify(promovente))
     const id_proceso_judicial = proceso_object.id_proceso_judicial
      const estatus_proceso = proceso_object.estatus_proceso

     if(estatus_proceso !== "EN_TRAMITE"){
      const {  fecha_inicio, fecha_estatus, estatus_proceso, id_juzgado, numero_expediente, control_interno, id_defensor, id_distrito_judicial, id_municipio_distrito, id_tipo_juicio } = proceso_object

      const procesoJudicial = await proceso_judicial.update({ fecha_inicio, fecha_estatus, estatus_proceso, id_juzgado, numero_expediente, control_interno, id_defensor, id_distrito_judicial, id_municipio_distrito, id_tipo_juicio }, { where: { id_proceso_judicial: proceso_object.id_proceso_judicial } })
     }else {
      const {  fecha_inicio, fecha_estatus, estatus_proceso, id_juzgado, numero_expediente, control_interno, id_defensor, id_distrito_judicial, id_municipio_distrito, id_tipo_juicio } = proceso_object
      const estatus_proceso_ = "EN_TRAMITE"
      const fecha_estatus_ = null
      const procesoJudicial = await proceso_judicial.update({ fecha_inicio, fecha_estatus_, estatus_proceso_, id_juzgado, numero_expediente, control_interno, id_defensor, id_distrito_judicial, id_municipio_distrito, id_tipo_juicio }, { where: { id_proceso_judicial: proceso_object.id_proceso_judicial } })
    
     }

   
    const pruebas = proceso_object.pruebas
    const observaciones = proceso_object.observaciones
    const resoluciones = proceso_object.resoluciones
    const estadosProcesales = proceso_object.estadosProcesales
    const familiares = proceso_object.familiares 

    const pruebas_actualizadas = []
    const observaciones_actualizadas = []
    const resoluciones_actualizadas = []
    const estadosProcesales_actualizados = []
   const familiares_actualizados = []
    
 

    for (let i = 0; i < pruebas.length; i++) {
       if (pruebas[i].id_prueba) {
        
        const prueba = await pruebasDAO.actualizarPrueba(pruebas[i].id_prueba, { descripcion_prueba: pruebas[i].descripcion_prueba, id_proceso_judicial })
        pruebas_actualizadas.push(pruebas[i])
      } else {
        const prueba = await pruebasDAO.crearPrueba({ descripcion_prueba: pruebas[i].descripcion_prueba, id_proceso_judicial: id_proceso_judicial })
        pruebas_actualizadas.push(prueba)
      }
    }
     
    for (let i = 0; i < observaciones.length; i++) {
      if (observaciones[i].id_observacion) {
       
        const observacion = await observacionesDAO.actualizarObservacion(observaciones[i].id_observacion, { observacion: observaciones[i].observacion, id_proceso_judicial })
        observaciones_actualizadas.push(observaciones[i])
      } else {
       
        const observacion = await observacionesDAO.crearObservacion({ id_proceso_judicial, observacion: observaciones[i].observacion })
        observaciones_actualizadas.push(observacion)
      }
    }

    for (let i = 0; i < resoluciones.length; i++) {
      if (resoluciones[i].id_resolucion) {
       
        const resolucion = await resolucionesDAO.actualizarResolucion(resoluciones[i].id_resolucion, { resolucion: resoluciones[i].resolucion, fecha_resolucion: resoluciones[i].fecha_resolucion })
        resoluciones_actualizadas.push(resoluciones[i])
      } else {
    
         const { resolucion, fecha_resolucion } = resoluciones[i]
        const resolucion_creada = await resolucionesDAO.crearResolucion({ id_proceso_judicial, resolucion, fecha_resolucion })
        resoluciones_actualizadas.push(resolucion_creada)
      }
    }

    for (let i = 0; i < estadosProcesales.length; i++) {
      if (estadosProcesales[i].id_estado_procesal) {
        const estadoProcesal = await estadosProcesalesDAO.actualizarEstadoProcesal(estadosProcesales[i].id_estado_procesal, { descripcion_estado_procesal: estadosProcesales[i].descripcion_estado_procesal, fecha_estado_procesal: estadosProcesales[i].fecha_estado_procesal, id_proceso_judicial })
        estadosProcesales_actualizados.push(estadosProcesales[i])
      } else {
        const estadoProcesal = await estadosProcesalesDAO.crearEstadoProcesal({ descripcion_estado_procesal: estadosProcesales[i].descripcion_estado_procesal, fecha_estado_procesal: estadosProcesales[i].fecha_estado_procesal, id_proceso_judicial })
        estadosProcesales_actualizados.push(estadoProcesal)
      }
    }
  
    for (let i = 0; i < familiares.length; i++) {

       if (familiares[i].id_familiar) {
        const familiar = await familiaresDAO.actualizarFamiliar(familiares[i].id_familiar, { nombre: familiares[i].nombre, nacionalidad: familiares[i].nacionalidad, parentesco: familiares[i].parentesco, perteneceComunidadLGBT: familiares[i].perteneceComunidadLGBT, adultaMayor: familiares[i].adultaMayor, saludPrecaria: familiares[i].saludPrecaria, pobrezaExtrema: familiares[i].pobrezaExtrema, id_promovente: familiares[i].id_promovente })
        familiares_actualizados.push( familiares[i])
      } else {
        const familiar = await familiaresDAO.crearFamiliar({ nombre: familiares[i].nombre, nacionalidad: familiares[i].nacionalidad, parentesco: familiares[i].parentesco, perteneceComunidadLGBT: familiares[i].perteneceComunidadLGBT, adultaMayor: familiares[i].adultaMayor, saludPrecaria: familiares[i].saludPrecaria, pobrezaExtrema: familiares[i].pobrezaExtrema, id_promovente: promovente_object.id_promovente })
        familiares_actualizados.push(familiar)
      }
    }

    const proceso_judicial_sin_datos  = this.obtenerProcesoJudicialNormal(id_proceso_judicial)
    const proceso_judicial_object_pre = JSON.parse(JSON.stringify(proceso_judicial_sin_datos))
   
    proceso_judicial_object_pre.familiares = familiares_actualizados
    proceso_judicial_object_pre.pruebas = pruebas_actualizadas
    proceso_judicial_object_pre.observaciones = observaciones_actualizadas
    proceso_judicial_object_pre.resoluciones = resoluciones_actualizadas
    proceso_judicial_object_pre.estados_procesales = estadosProcesales_actualizados
    return proceso_judicial_object_pre
  }

  async actualizarImputado(imputado) {
  
    const imputado_object = JSON.parse(JSON.stringify(imputado))
    const { id_imputado, nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero } = imputado_object
    const imputado_ = await participanteDAO.actualizarParticipante(id_imputado, { nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero })
    const domicilio = imputado_object.domicilio
    const { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia } = domicilio
    const domicilioParticipante = await domicilioDAO.actualizarDomicilioParticipante(domicilio.id_domicilio, { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia })
    return imputado_object
  }

  async actualizarPromovente(promovente) {

    const promovente_object = JSON.parse(JSON.stringify(promovente))
    const { id_promovente, nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero, id_escolaridad, id_etnia, id_ocupacion, español } = promovente_object
    const promovente_ = await promoventeDAO.actualizarPromovente(id_promovente, {español, id_escolaridad, id_etnia, id_ocupacion  })
    const participante_actualizado = await participanteDAO.actualizarParticipante(id_promovente, { nombre, apellido_paterno, apellido_materno, edad, telefono, id_genero })
    const domicilio = promovente_object.domicilio
    const { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia } = domicilio
    const domicilioParticipante = await domicilioDAO.actualizarDomicilioParticipante(domicilio.id_domicilio, { calle_domicilio, numero_exterior_domicilio, numero_interior_domicilio, id_colonia })
    return promovente_object
    
  }
  async obtenerProcesoJudicialNormal(id) {
    try {
      const procesoJudicial = await proceso_judicial.findByPk(id)
      return procesoJudicial
    } catch (err) {
      throw err
    }
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
      console.log(err.message)

      throw err
    }
  }

  /**
 * @abstract Método que permite actualizar un proceso judicial en la base de datos
 * @param {number} id_proceso_judicial - ID del proceso judicial a actualizar
 * @param {object} procesoJudicial - Objeto que contiene los nuevos datos del proceso judicial
 * @returns {object} Retorna el objeto del proceso judicial actualizado si la operación fue exitosa, de lo contrario lanza un error
 */
  async actualizarProcesoJudicialOficial(id, { promovente, imputado, proceso }) {
    try {

      const promovente_object = JSON.parse(JSON.stringify(promovente))
      const imputado_object = JSON.parse(JSON.stringify(imputado))
      const proceso_object = JSON.parse(JSON.stringify(proceso))

      const proceso_actualizado = await this.actualizarProcesoJudicial(proceso_object, promovente_object)
      const promovente_actualizado = await this.actualizarPromovente(promovente_object)
      const imputado_actualizado = await this.actualizarImputado(imputado_object)
      return await this.obtenerProcesoJudicial(id)
    } catch (err) {
      console.log(err.message)
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
  async obtenerProcesosJudicialesPorTramite(estatus_proceso){
    try {
      const procesosJudiciales = await proceso_judicial.findAll({ where: {estatus_proceso: estatus_proceso } })
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
}

module.exports = new ProcesoJudicialDAO()
