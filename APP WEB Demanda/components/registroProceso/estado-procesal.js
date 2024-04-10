import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/registroProceso/estado-procesal.html')
).text()
template.innerHTML = html

export class EstadoProcesal extends HTMLElement {
  #api


  #idEstadoProcesal
  #estadoProcesal
  #fechaEstadoProcesal
  #estadosProcesales
  #tableEstadosProcesales

  #botonAgregarEstadoProcesal
  #botonEditarEstadoProcesal

  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#api = new APIModel()
    this.#idEstadoProcesal = null
    this.#estadosProcesales = []
    this.manageFormFields()
    this.fillInputs()

  }

  manageFormFields() {

    this.#estadoProcesal = this.shadowRoot.getElementById('estado')
    this.#fechaEstadoProcesal = this.shadowRoot.getElementById('fecha-estado')
    this.#tableEstadosProcesales = this.shadowRoot.getElementById('table-estado')

    this.#botonAgregarEstadoProcesal = this.shadowRoot.getElementById('agregar-estado')
    this.#botonEditarEstadoProcesal = this.shadowRoot.getElementById('editar-estado')
    var estadoProcesalInput = this.#estadoProcesal
    estadoProcesalInput.addEventListener('input', function () {
      if (estadoProcesalInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo estado procesal no puede estar vacío'
        modal.title = 'Error'
        modal.open = true
      } else if (estadoProcesalInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo estado procesal no puede tener más de 200 caracteres'
        modal.title = 'Error'
        modal.open = true
      }
    })
  }
  fillInputs() {
    this.agregarEventosBotones()
  }
  agregarEventosBotones = () => {

    this.#botonAgregarEstadoProcesal.addEventListener('click', this.agregarEstadoProcesal)
    this.#botonEditarEstadoProcesal.addEventListener('click', this.editarEstadoProcesal)

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-estado')

    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const estadoProcesalId = boton.dataset.id
        this.#idEstadoProcesal = estadoProcesalId
        this.llamarActivarBotonSeleccionarEstado(estadoProcesalId)
      })
    })



    const llamarActivarBotonSeleccionarEstado = (estadoProcesalId) => {
      this.llamarActivarBotonSeleccionarEstado(estadoProcesalId)
    }

    window.llamarActivarBotonSeleccionarEstado = llamarActivarBotonSeleccionarEstado

  }

  agregarEstadoProcesal = async () => {

    const estadoProcesalID = this.#idEstadoProcesal
    if (estadoProcesalID === null) {
      const estadoProcesal = this.#estadoProcesal.value
      const fechaEstadoProcesal = this.#fechaEstadoProcesal.value

      if (estadoProcesal === '') {
        this.#showModal('El campo estado procesal no puede estar vacío', 'Error')
      } else if (estadoProcesal.length > 200) {
        this.#showModal('El campo estado procesal no puede tener más de 200 caracteres', 'Error')
      }


      const fechaActual = new Date();
      fechaActual.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
      
      // Obtener la fecha ingresada desde tu input HTML (asegúrate de obtener el valor correctamente)
      const fechaIngresada = new Date(fechaEstadoProcesal);
      fechaIngresada.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
      
   
      /*
            if (fechaIngresada.getFullYear() < fechaActual.getFullYear()) {
              this.#showModal('La fecha de estado procesal no puede ser menor al año actual', 'Error')
            }
            */
      if (fechaEstadoProcesal === '') {
        this.#showModal('La fecha de estado procesal no puede estar vacia', 'Error')
      }
      else {
        /*
              if (fechaIngresada.getFullYear() < 1900) {
                this.#showModal('La fecha de estado procesal no puede ser menor al año 1900', 'Error')
                return
              }
        */
   // if(fechaIngresada.valueOf() < fechaActual.valueOf()){

      //          this.#showModal('La fecha de estado procesal no puede ser menor a la fecha actual', 'Error')

    //    }
     //   else {

          //Verififcar json
          const estadoProcesalData = {
            descripcion_estado_procesal: estadoProcesal,
            fecha_estado_procesal: fechaEstadoProcesal
          }

          this.#estadosProcesales.push(estadoProcesalData)
          this.mostrarEstadosProcesales()
          this.#estadoProcesal.value = ''
          this.#fechaEstadoProcesal.value = ''
      //  }
      }
    }
    else {
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un estado procesal si ha selecionado previamente uno de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idEstadoProcesal = null
      this.#estadoProcesal.value = ''
      this.#fechaEstadoProcesal.value = ''
    }


  }


  editarEstadoProcesal = async () => {
    const estadoProcesalID = this.#idEstadoProcesal
    if (estadoProcesalID === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un estado procesal para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      const estadoProcesal = this.#estadoProcesal.value
      const fechaEstadoProcesal = this.#fechaEstadoProcesal.value

      if (estadoProcesal === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de estado procesal es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else

        if (estadoProcesal.length > 100) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estado procesal no puede contener más de 100 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        }

      if (fechaEstadoProcesal === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de fecha de estado procesal es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else {

      
        const fechaActual = new Date();
        fechaActual.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
        
        // Obtener la fecha ingresada desde tu input HTML (asegúrate de obtener el valor correctamente)
        const fechaIngresada = new Date(fechaEstadoProcesal);
        fechaIngresada.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
        
     //   if(fechaIngresada.valueOf() < fechaActual.valueOf()){
     //     const modal = document.querySelector('modal-warning')
     //     modal.message = 'La fecha de estado procesal no puede ser menor a la fecha actual.'
     //     modal.title = 'Error de validación'
     //     modal.open = true
      //  } else {
          /*
          if (fechaIngresada.getFullYear() < fechaActual.getFullYear()) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'La fecha de estado procesal no puede ser menor al año actual.'
            modal.title = 'Error de validación'
            modal.open = true
          }
    
          if (fechaIngresada.getFullYear() < 1900) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'La fecha de estado procesal no puede ser menor al año 1900.'
            modal.title = 'Error de validación'
            modal.open = true
          }*7
    
          /**
            De alguna manera con respecto al id del estado procesal seleccionado se debe de modificar el arreglo de estados procesales  
           */
          const estadoProcesalData = {
            descripcion_estado_procesal: estadoProcesal,
            fecha_estado_procesal: fechaEstadoProcesal

          }
          this.#estadosProcesales[estadoProcesalID - 1] = estadoProcesalData
          this.mostrarEstadosProcesales()
          this.#idEstadoProcesal = null
          this.#estadoProcesal.value = ''
          this.#fechaEstadoProcesal.value = ''
      //  }
      }
    }
  }
  mostrarEstadosProcesales = async () => {

    try {
      const estadosProcesales = this.#estadosProcesales
      const tableBody = this.#tableEstadosProcesales
      tableBody.innerHTML = ''
      const lista = estadosProcesales
      const funcion =
        lista.forEach((estadoProcesal, i) => {
          const row = document.createElement('tr')
          row.innerHTML = `
            <tr id="estado-${i + 1}">
            <td class="px-6 py-4 whitespace-nowrap">${i + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">${estadoProcesal.descripcion_estado_procesal}</td>
            <td class="px-6 py-4 whitespace-nowrap">${estadoProcesal.fecha_estado_procesal}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-estado" onclick="llamarActivarBotonSeleccionarEstado(this.value)" value="${i + 1}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `
          tableBody.appendChild(row)
        })
    } catch (error) {
      console.error('Error al obtener los estados procesales:', error)
    }


  }

  llamarActivarBotonSeleccionarEstado = async estadoProcesalId => {

    try {
      const estadoProcesal = this.#estadosProcesales[estadoProcesalId - 1]
      if (estadoProcesal) {
        this.#idEstadoProcesal = estadoProcesalId
        this.#estadoProcesal.value = estadoProcesal.estado_procesal
        this.#fechaEstadoProcesal.value = estadoProcesal.fecha_estado_procesal
      } else {
        console.error('El estado procesal con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener el estado procesal por ID:', error)
    }
  }
  /*
  connectedCallback() {

  }
  */


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
    const estadosProcesales = this.#estadosProcesales
    return { estadosProcesales: estadosProcesales }
  }

  set data(value) {
    this.#estadosProcesales = value
    this.mostrarEstadosProcesales()
    this.setAttribute('data', value)
  }
}

customElements.define('estado-procesal', EstadoProcesal)
