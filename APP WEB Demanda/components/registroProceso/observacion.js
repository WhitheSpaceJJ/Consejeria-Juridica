import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/registroProceso/observacion.html')
).text()
template.innerHTML = html

export class ObservacionPromovente extends HTMLElement {
  #api

  #idObservacion
  #observacion
  #observaciones
  #tableObservaciones

  #botonAgregarObservacion
  #botonEditarObservacion

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#api = new APIModel()
    this.#idObservacion = null
    this.#observaciones = []
    this.manageFormFields()
    this.fillInputs()
  }

  manageFormFields() {
    this.#observacion = this.shadowRoot.getElementById('observacion')
    this.#tableObservaciones = this.shadowRoot.getElementById('table-observacion')
    this.#botonAgregarObservacion = this.shadowRoot.getElementById('agregar-observacion')
    this.#botonEditarObservacion = this.shadowRoot.getElementById('editar-observacion')

    var observacionInput = this.#observacion

    observacionInput.addEventListener('input', function () {
      if (observacionInput.value === "") {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else if (observacionInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    })
  }
  fillInputs() {
    this.agregarEventosBotones()
  }
  agregarEventosBotones = () => {



    this.#botonAgregarObservacion.addEventListener('click', this.agregarObservacion)
    this.#botonEditarObservacion.addEventListener('click', this.editarObservacion)

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-observacion')

    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const observacionId = boton.value
        this.#idObservacion = observacionId
        this.activarBotonSeleccionarObservacion(observacionId)
      })
    })


    const activarBotonSeleccionarObservacion = (observacionId) => {
      this.activarBotonSeleccionarObservacion(observacionId)
    }

    window.activarBotonSeleccionarObservacion = activarBotonSeleccionarObservacion
  }
  mostrarObservaciones = async () => {

    try {
      const observaciones = this.#observaciones
      const tableBody = this.#tableObservaciones
      tableBody.innerHTML = ''
      const lista = observaciones
      const funcion =
        lista.forEach((observacion, i) => {
          const row = document.createElement('tr')
          row.innerHTML = `
            <tr id="observacion-${i + 1}">
            <td class="px-6 py-4 whitespace-nowrap">${i + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">${observacion.observacion}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-observacion" onclick="activarBotonSeleccionarObservacion(this.value)" value="${i + 1}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `
          tableBody.appendChild(row)
        })
    } catch (error) {
      console.error('Error al obtener las observaciones:', error)
    }
  }
  editarObservacion = async () => {

    const observacionId = this.#idObservacion

    if (observacionId == null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Seleccione una observación para editar.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      const observacion = this.#observacion.value

      if (observacion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else
        if (observacion.length > 200) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de observación no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
          if (observacion !== '' && observacion.length <= 200) {

            const observacionData = {
              observacion: observacion
            }
            this.#observaciones[observacionId - 1] = observacionData
            this.mostrarObservaciones()
            this.#idObservacion = null
            this.#observacion.value = ''
          } else {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de observación es obligatorio.'
            modal.title = 'Error de validación'
            modal.open = true
          }
        }
    }

  }
  agregarObservacion = async () => {
    const idObservacion = this.#idObservacion

    if (idObservacion === null) {
      const observacion = this.#observacion.value

      if (observacion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else
        if (observacion.length > 200) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de observación no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
          if (observacion !== '' && observacion.length <= 200) {

            const observacionData = {
              observacion: observacion
            }
            this.#observaciones.push(observacionData)
            this.mostrarObservaciones()
            this.#observacion.value = ''
          } else {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de observación es obligatorio.'
            modal.title = 'Error de validación'
            modal.open = true
          }
        }
    }
    else {
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una observación si ha selecionado previamente una de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idObservacion = null
      this.#observacion.value = ''

    }
  }

  activarBotonSeleccionarObservacion = async observacionId => {
    try {
      const observacion = this.#observaciones[observacionId - 1]
      if (observacion) {
        this.#idObservacion = observacionId
        this.#observacion.value = observacion.observacion
      } else {
        console.error('La observacion con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener la observacion por ID:', error)
    }
  }
  connectedCallback() {

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

  get data() {
    const observaciones = this.#observaciones
    return {
      observaciones: observaciones
    }
  }

  set data(value) {
    this.#observaciones = value
    this.mostrarObservaciones()
    this.setAttribute('data', value)
  }
}

customElements.define('observacion-promovente', ObservacionPromovente)
