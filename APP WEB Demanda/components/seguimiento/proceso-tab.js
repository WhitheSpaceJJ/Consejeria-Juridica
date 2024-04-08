import { ValidationError } from '../../lib/errors.js'
import { validateNonEmptyFields } from '../../lib/utils.js'
import { APIModel } from '../../models/api.model.js'
import '../seguimientoProceso/estado-procesal.js'
import '../seguimientoProceso/familiar.js'
import '../seguimientoProceso/observacion.js'
import '../seguimientoProceso/prueba.js'
import '../seguimientoProceso/familiar.js'
import '../seguimientoProceso/resolucion.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/seguimiento/proceso-tab.html')
).text()
template.innerHTML = html

export class ProcesoTab extends HTMLElement {
  #estadosProcesales
  #familiares
  #observaciones
  #pruebas
  #resoluciones
  #api
  /*
  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #edad
  #sexo
  #telefono

  #españolRadioYes
  #españolRadioNo

  #etnia
  #etnias

  #escolaridad
  #escolaridades

  #ocupacion
  #ocupaciones

  #calle
  #numeroExt
  #numeroInt
  #colonia
  #cp
  #municipio
  #estado
  #ciudad

  #turno

  #promovente
  #promventeDomicilio
  #tipoJuicio

  #busquedaCp
  #generos

   */

  #fechaInicio
  #estatusProceso

  #juzgado
  #juzgados

  #numeroExpediente
  #controlInterno

  #municipio
  #municipios

  #distritoJudicial
  #distritosJudiciales

  #tipoJuicio
  #tiposDeJuicio




  #idDistritoJudicial
  #idMunicipio
  #idTipoJuicio
  #id_defensor

  #pruebasWC
  #familiaresWC
  #observacionesWC
  #resolucionesWC
  #estadosProcesalesWC

  static get observedAttributes() {
    return ['id', 'data']
  }


  async init() {
    this.#api = new APIModel()


    const juzgados = await this.#api.getJuzgados2()
    this.#juzgados = juzgados

    const distritosJudiciales = await this.#api.getDistritos()
    this.#distritosJudiciales = distritosJudiciales
/**
     const proceso = {
      id_proceso_judicial: this.#proceso.id_proceso_judicial,
      fecha_inicio: this.#proceso.fecha_inicio,
      fecha_estatus: this.#proceso.fecha_estatus,
      control_interno: this.#proceso.control_interno,
      numero_expediente: this.#proceso.numero_expediente,
      id_turno: this.#proceso.id_turno,
      id_distrito_judicial: this.#proceso.id_distrito_judicial,
      id_municipio_distrito: this.#proceso.id_municipio_distrito,
      id_tipo_juicio: this.#proceso.id_tipo_juicio,
      id_defensor: this.#proceso.id_defensor,
      estatus_proceso: this.#proceso.estatus_proceso,
      id_juzgado: this.#proceso.id_juzgado,
    }
 */
    const id_distrito_judicial = this.registroTab.data.proceso.asesoria.id_distrito_judicial
    const id_municipio = this.registroTab.data.proceso.id_municipio_distrito
    this.#idDistritoJudicial = id_distrito_judicial
    this.#idMunicipio = id_municipio
    this.#idTipoJuicio = this.registroTab.data.proceso.id_tipo_juicio
    this.#id_defensor = this.registroTab.data.proceso.id_defensor

    const { tiposDeJuicio } = await this.#api.getTiposJuicio2()
    this.#tiposDeJuicio = tiposDeJuicio


    const municipios = await this.#api.getMunicipiosByDistrito(id_distrito_judicial)
    this.#municipios = municipios


    this.manageFormFields()
    this.fillInputs()




  }
  manageFormFields() {
    this.#fechaInicio = this.shadowRoot.getElementById('fecha-inicio')
    this.#estatusProceso = this.shadowRoot.getElementById('estatus')
    this.#juzgado = this.shadowRoot.getElementById('juzgado')
    this.#numeroExpediente = this.shadowRoot.getElementById('expediente')
    this.#tipoJuicio = this.shadowRoot.getElementById('juicio')
    this.#controlInterno = this.shadowRoot.getElementById('ci')
    this.#distritoJudicial = this.shadowRoot.getElementById('distrito')
    this.#municipio = this.shadowRoot.getElementById('municipio')

    this.#estadosProcesales = this.shadowRoot.getElementById('estado-procesal')
    this.#familiares = this.shadowRoot.getElementById('familiar')
    this.#observaciones = this.shadowRoot.getElementById('observacion')
    this.#pruebas = this.shadowRoot.getElementById('prueba')
    this.#resoluciones = this.shadowRoot.getElementById('resolucion')


    this.#pruebasWC = this.shadowRoot.querySelector('prueba-promovente')
    this.#familiaresWC = this.shadowRoot.querySelector('familiar-promovente')
    this.#observacionesWC = this.shadowRoot.querySelector('observacion-promovente')
    this.#resolucionesWC = this.shadowRoot.querySelector('resolucion-promovente')
    this.#estadosProcesalesWC = this.shadowRoot.querySelector('estado-procesal')


    var numeroExpedienteInput = this.#numeroExpediente
    numeroExpedienteInput.addEventListener('input', function () {
      if (numeroExpedienteInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El número de expediente es requerido'
        modal.title = 'Error de validación'
        modal.open = true
      } else
        if (numeroExpedienteInput.value.length > 20) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El número de expediente no debe ser mayor a 20 caracteres'
          modal.title = 'Error de validación'
          modal.open = true
        } /*else if (this.value.length < 10) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El número de expediente no debe ser menor a 10 caracteres'
        modal.title = 'Error de validación'
        modal.open = true
      }
      */
    });

    var controlInternoInput = this.#controlInterno
    controlInternoInput.addEventListener('input', function () {
      if (controlInternoInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El número de control interno es requerido'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else if (controlInternoInput.value.length > 20) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El número de control interno no debe ser mayor a 20 caracteres'
        modal.title = 'Error de validación'
        modal.open = true
      } /*else if (this.value.length < 10) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El número de control interno no debe ser menor a 10 caracteres'
        modal.title = 'Error de validación'
        modal.open = true
      }*/
    });
  }


  fillInputs() {

    this.#juzgados.forEach(juzgado => {
      const option = document.createElement('option')
      option.value = juzgado.id_juzgado
      option.text = juzgado.nombre_juzgado
      this.#juzgado.appendChild(option)
    })
    this.#distritosJudiciales.forEach(distrito => {
      const option = document.createElement('option')
      option.value = distrito.id_distrito_judicial
      option.textContent = distrito.nombre_distrito_judicial
      this.#distritoJudicial.appendChild(option)
    })

    this.#municipios.forEach(municipio => {
      const option = document.createElement('option')
      option.value = municipio.id_municipio_distrito
      option.text = municipio.nombre_municipio
      this.#municipio.appendChild(option)
    })

    this.#tiposDeJuicio.forEach(tipoJuicio => {
      const option = document.createElement('option')
      option.value = tipoJuicio.id_tipo_juicio
      option.textContent = tipoJuicio.tipo_juicio
      this.#tipoJuicio.appendChild(option)
    })
    this.#proceso = this.registroTab.data.proceso
    
    this.#tipoJuicio.value = this.#idTipoJuicio
    this.#municipio.value = this.#idMunicipio
    this.#distritoJudicial.value = this.#idDistritoJudicial
    this.#fechaInicio.value = this.#proceso.fecha_inicio
  }
   #proceso
   #estadosProcesales2
    #familiares2
    #observaciones2
    #pruebas2
    #resoluciones2


  validateInputs() {
    try {
      /*
      if(this.registroTab.data.proceso === undefined){
        this.#showModal('No se ha seleccionado un proceso, por favor seleccione uno.', 'Error de validación')
        return false
      }
      
      if(this.promoventeTab.data === undefined){
        this.#showModal('No se han ingresado los datos del promovente, por favor ingreselos.', 'Error de validación')
        return false
      }

      if(this.imputadoTab.data === undefined){
        this.#showModal('No se han ingresado los datos del imputado, por favor ingreselos.', 'Error de validación')
        return false
      }
      */


      const fechaInicio = this.#fechaInicio.value
      const estatusProceso = this.#estatusProceso.value
      const juzgado = this.#juzgado.value
      const numeroExpediente = this.#numeroExpediente.value
      const controlInterno = this.#controlInterno.value
      const distritoJudicial = this.#distritoJudicial.value
      const municipio = this.#municipio.value
      const tiposJuicio = this.#tipoJuicio.value

      const fechaActual = new Date();
      fechaActual.setUTCHours(0, 0, 0, 0); // Establecer hora UTC

      // Obtener la fecha ingresada desde tu input HTML (asegúrate de obtener el valor correctamente)
      const fechaIngresada = new Date(fechaInicio);
      fechaIngresada.setUTCHours(0, 0, 0, 0); // Establecer hora UTC


      if (!fechaInicio) {
        throw new ValidationError('La fecha de inicio es requerida')
      }
      /*
      else if (fechaIngresada.valueOf() > fechaActual.valueOf()) {
        throw new ValidationError('La fecha de inicio no puede ser mayor a la fecha actual')
      } else if (fechaIngresada.valueOf() < fechaActual.valueOf()) {
        throw new ValidationError('La fecha de inicio no puede ser menor a la fecha actual')
      } */

      if (!estatusProceso) {
        throw new ValidationError('El estatus del proceso es requerido')
      }

      if (juzgado === '0') {
        throw new ValidationError('El juzgado es requerido')
      }

      if (numeroExpediente === '') {
        throw new ValidationError('El número de expediente es requerido')
      } else if (numeroExpediente.length > 20) {
        throw new ValidationError('El número de expediente no debe ser mayor a 20 caracteres')
      }/* else if (numeroExpediente.length < 10) {
        throw new ValidationError('El número de expediente no debe ser menor a 10 caracteres')
      }
      */

      if (controlInterno === '') {
        throw new ValidationError('El número de control interno es requerido')
      }
      else if (controlInterno.length > 20) {
        throw new ValidationError('El número de control interno no debe ser mayor a 20 caracteres')
      } 
      /*else if (controlInterno.length < 10) {
        throw new ValidationError('El número de control interno no debe ser menor a 10 caracteres')
      }
*/
      if (distritoJudicial === '0') {
        throw new ValidationError('El distrito judicial es requerido')
      }

      if (municipio === '0') {
        throw new ValidationError('El municipio es requerido')
      }

      if (tiposJuicio === '0') {
        throw new ValidationError('El tipo de juicio es requerido')
      }



      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        this.#showModal(error.message, 'Error de validación')
      } else {
        console.error(error)
        this.#showModal(
          'Error al validar datos , persona, domicilio, por favor intenta de nuevo',
          'Error'
        )
      }

      return false
    }
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'proceso'
    this.style.display = 'none'
    this.registroTab = document.querySelector('registro-full-tab')
    this.promoventeTab = document.querySelector('promovente-full-tab')
    this.imputadoTab = document.querySelector('imputado-full-tab')



  }

  connectedCallback() {
    this.btnNext = this.shadowRoot.getElementById('btn-proceso-next')

    this.btnNext.addEventListener('click', () => {
      if (!this.validateInputs()) return
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'detalles' },
      })
      this.dispatchEvent(event)
    })
    document.addEventListener('tab-change', event => {
      const tabId = event.detail.tabId
      if (tabId !== 'proceso') {
        return
      }

      this.init()
    })

  }
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

  get id() {
    return this.getAttribute('id')
  }

  set id(value) {
    this.setAttribute('id', value)
  }

  get isComplete() {
    return this.validateInputs()
  }

  get data() {
    const proceso ={
      fecha_inicio: this.#fechaInicio.value,
      fecha_estatus: null,
      estatus_proceso: this.#estatusProceso.value,
      id_juzgado: this.#juzgado.value,
      juzgado: this.#juzgado.options[this.#juzgado.selectedIndex].text,
      numero_expediente: this.#numeroExpediente.value,
      control_interno: this.#controlInterno.value,
      id_defensor: this.#id_defensor,
      defensor: this.registroTab.data.turno.defensor.nombre_defensor,
      id_distrito_judicial: this.#distritoJudicial.value,
      id_municipio_distrito: this.#municipio.value,
      id_tipo_juicio: this.#tipoJuicio.value,
      tipo_juicio: this.#tipoJuicio.options[this.#tipoJuicio.selectedIndex].text,
      municipio: this.#municipio.options[this.#municipio.selectedIndex].text,
      distrito_judicial: this.#distritoJudicial.options[this.#distritoJudicial.selectedIndex].text,
      pruebas: this.#pruebasWC.data.pruebas,
      familiares: this.#familiaresWC.data.familiares,
      observaciones: this.#observacionesWC.data.observaciones,
      resoluciones: this.#resolucionesWC.data.resoluciones,
      estadosProcesales: this.#estadosProcesalesWC.data.estadosProcesales,
    }
    return  {proceso : proceso}
    
  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('proceso-full-tab', ProcesoTab)
