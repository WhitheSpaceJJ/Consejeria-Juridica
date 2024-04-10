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


    const juzgados = await this.#api.getJuzgados()
    this.#juzgados = juzgados

    const distritosJudiciales = await this.#api.getDistritos()
    this.#distritosJudiciales = distritosJudiciales

    const id_distrito_judicial = this.registroTab.data.proceso.id_distrito_judicial
    const id_municipio = this.registroTab.data.proceso.id_municipio_distrito
    this.#idDistritoJudicial = id_distrito_judicial
    this.#idMunicipio = id_municipio
    this.#idTipoJuicio = this.registroTab.data.proceso.id_tipo_juicio
    this.#id_defensor = this.registroTab.data.proceso.id_defensor
    this.#idJuzgado = this.registroTab.data.proceso.id_juzgado
    this.#controlInternoData = this.registroTab.data.proceso.control_interno
    this.#numeroExpedienteData = this.registroTab.data.proceso.numero_expediente

    const { tiposDeJuicio } = await this.#api.getTiposJuicio()
    this.#tiposDeJuicio = tiposDeJuicio


    const municipios = await this.#api.getMunicipiosByDistrito(id_distrito_judicial)
    this.#municipios = municipios

    this.manageFormFields()
    this.fillInputs()

  }
  

  #controlInternoData
  #numeroExpedienteData
  #idJuzgado

  cambioEstatus() {
    if (this.#estatusProceso.value === '1' || this.#estatusProceso.value === '2') {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Al cambiar de estatus y actualizarlo, este no podra ser moodificado, al menos que un encargado  de distritito lo haga'
      modal.title = 'Mensaje de Advertencia unico'
      modal.open = true
      this.#fecha_estatus.value = new Date().toISOString().split('T')[0]
    }
  }


  #fecha_estatus


  manageFormFields() {
    this.#fecha_estatus = this.shadowRoot.getElementById('fecha-estatus')
    this.#fechaInicio = this.shadowRoot.getElementById('fecha-inicio')
    this.#estatusProceso = this.shadowRoot.getElementById('estatus')
    this.#juzgado = this.shadowRoot.getElementById('juzgado')
    this.#numeroExpediente = this.shadowRoot.getElementById('expediente')
    this.#tipoJuicio = this.shadowRoot.getElementById('juicio')
    this.#controlInterno = this.shadowRoot.getElementById('ci')
    this.#distritoJudicial = this.shadowRoot.getElementById('distrito')
    this.#municipio = this.shadowRoot.getElementById('municipio')

    this.#estatusProceso.addEventListener('change', (e) => {
      this.cambioEstatus()
    })


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


    const estadoProcesalWC = this.#estadosProcesalesWC

    // Verificar si el componente fue encontrado
    if (estadoProcesalWC) {
      const data = this.registroTab.data.proceso.estadosProcesales;
      estadoProcesalWC.data = data;
    } else {
      console.error('No se encontró el componente web "estado-procesal" en el DOM.');
    }

    const familiarWC = this.#familiaresWC

    // Verificar si el componente fue encontrado
    if (familiarWC) {
      const data = this.registroTab.data.promovente.promovente.familiares;
      familiarWC.data = data;
    } else {
      console.error('No se encontró el componente web "familiar" en el DOM.');
    }


    const observacionWC = this.#observacionesWC

    // Verificar si el componente fue encontrado
    if (observacionWC) {
      const data = this.registroTab.data.proceso.observaciones;
      observacionWC.data = data;

    } else {
      console.error('No se encontró el componente web "observacion" en el DOM.');
    }

    const pruebaWC = this.#pruebasWC

    // Verificar si el componente fue encontrado
    if (pruebaWC) {
      const data = this.registroTab.data.proceso.pruebas;
      pruebaWC.data = data;
    } else {
      console.error('No se encontró el componente web "prueba" en el DOM.');
    }

    const resolucionWC = this.#resolucionesWC

    // Verificar si el componente fue encontrado

    if (resolucionWC) {
      const data = this.registroTab.data.proceso.resoluciones;
      resolucionWC.data = data;
    } else {
      console.error('No se encontró el componente web "resolucion" en el DOM.');
    }
    



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
        }
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
      } 
    });
  }


  fillInputs() {
    this.#juzgado.innerHTML = ''

    const optionDefault = document.createElement('option')
    optionDefault.value = '0'
    optionDefault.text = 'Seleccione un juzgado'
    this.#juzgado.appendChild(optionDefault)

    this.#juzgados.forEach(juzgado => {
      const option = document.createElement('option')
      option.value = juzgado.id_juzgado
      option.text = juzgado.nombre_juzgado
      this.#juzgado.appendChild(option)
    }) 

    
    this.#distritoJudicial.innerHTML = ''
    
    const optionDefaultDistrito = document.createElement('option')
    optionDefaultDistrito.value = '0'
    optionDefaultDistrito.text = 'Seleccione un distrito judicial'
    this.#distritoJudicial.appendChild(optionDefaultDistrito)

    
    this.#distritosJudiciales.forEach(distrito => {
      const option = document.createElement('option')
      option.value = distrito.id_distrito_judicial
      option.textContent = distrito.nombre_distrito_judicial
      this.#distritoJudicial.appendChild(option)
    })
    
    
    this.#municipio.innerHTML = ''
    
    const optionDefaultMunicipio = document.createElement('option')
    optionDefaultMunicipio.value = '0'
    optionDefaultMunicipio.text = 'Seleccione un municipio'
    this.#municipio.appendChild(optionDefaultMunicipio)
    
    this.#municipios.forEach(municipio => {
      const option = document.createElement('option')
      option.value = municipio.id_municipio_distrito
      option.text = municipio.nombre_municipio
      this.#municipio.appendChild(option)
    })


    
    this.#tipoJuicio.innerHTML = ''
    
    const optionDefaultTipoJuicio = document.createElement('option')
    optionDefaultTipoJuicio.value = '0'
    optionDefaultTipoJuicio.text = 'Seleccione un tipo de juicio'
    this.#tipoJuicio.appendChild(optionDefaultTipoJuicio)
    
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
    this.#juzgado.value = this.#idJuzgado
    this.#controlInterno.value = this.#controlInternoData
    this.#numeroExpediente.value = this.#numeroExpedienteData
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
      if (this.registroTab.data.proceso === undefined) {
        this.#showModal('No se ha seleccionado un proceso, por favor seleccione uno.', 'Error de validación')
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
      }
      if (controlInterno === '') {
        throw new ValidationError('El número de control interno es requerido')
      }
      else if (controlInterno.length > 20) {
        throw new ValidationError('El número de control interno no debe ser mayor a 20 caracteres')
      }
  
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

      if (this.#procesoSelecionado === null) {
        this.#procesoSelecionado = this.registroTab.proceso
        this.init()
      }
      if(this.#procesoSelecionado !==null && this.#procesoSelecionado.id_proceso_judicial !== this.registroTab.proceso.id_proceso_judicial){
        this.#procesoSelecionado = this.registroTab.proceso
        this.init()
      }
    })
  }
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

  #procesoSelecionado = null

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
    const estatusProceso = this.#estatusProceso.value  === '1' ? 'BAJA' : 'CONCLUIDO'
    const proceso = {
      fecha_inicio: this.#fechaInicio.value,
      fecha_estatus:this.#estatusProceso.value === '0' ? null : new Date().toISOString().split('T')[0],
      id_juzgado: this.#juzgado.value,
      juzgado: this.#juzgado.options[this.#juzgado.selectedIndex].text,
      numero_expediente: this.#numeroExpediente.value,
      control_interno: this.#controlInterno.value,
      id_defensor: this.#id_defensor,
       estatus_proceso: this.#estatusProceso.value === '0' ? 'EN_TRAMITE' : estatusProceso,
      defensor: this.registroTab.data.defensor,
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
    return { proceso: proceso }

  }
  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('proceso-full-tab', ProcesoTab)
