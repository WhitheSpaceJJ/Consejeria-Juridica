import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/registroProceso/resolucion.html')
).text()
template.innerHTML = html

export class Resolucion extends HTMLElement {
  #api




  #idResolucion
  #resolucion
  #fechaResolucion
  #resoluciones
  #tableResoluciones

  #botonAgregarResolucion
  #botonEditarResolucion



  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#api = new APIModel()

    this.#idResolucion = null
    this.#resoluciones = []
    this.manageFormFields()
    this.fillInputs()
  }
  fillInputs() {

    this.agregarEventosBotones()
  }

  manageFormFields() {




    this.#resolucion = this.shadowRoot.getElementById('condiciones')
    this.#fechaResolucion = this.shadowRoot.getElementById('fecha-resolucion')
    this.#tableResoluciones = this.shadowRoot.getElementById('table-resolucion')

    this.#botonAgregarResolucion = this.shadowRoot.getElementById('agregar-resolucion')
    this.#botonEditarResolucion = this.shadowRoot.getElementById('editar-resolucion')

    var resolucionInput = this.#resolucion

    resolucionInput.addEventListener('input', function () {
      if (resolucionInput.value === "") {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else if (resolucionInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

    })

  }

  agregarEventosBotones = () => {

    this.#botonAgregarResolucion.addEventListener('click', this.agregarResolucion)
    this.#botonEditarResolucion.addEventListener('click', this.editarResolucion)

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-resolucion')

    seleccionarBotones.forEach(boton => {

      boton.addEventListener('click', () => {
        const resolucionId = boton.value
        this.#idResolucion = resolucionId
        this.activarBotonSeleccionarResolucion(resolucionId)
      })
    })

    const activarBotonSeleccionarResolucion = (resolucionId) => {
      this.activarBotonSeleccionarResolucion(resolucionId)
    }

    window.activarBotonSeleccionarResolucion = activarBotonSeleccionarResolucion
  }

  agregarResolucion = async () => {

    const resolucionID = this.#idResolucion
    if (resolucionID === null) {
      const resolucion = this.#resolucion.value
      const fechaResolucion = this.#fechaResolucion.value

      if (resolucion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (resolucion.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (fechaResolucion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de fecha de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else {


 
        const fechaActual = new Date();
        fechaActual.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
        
        // Obtener la fecha ingresada desde tu input HTML (asegúrate de obtener el valor correctamente)
        const fechaIngresada = new Date(fechaResolucion);
        fechaIngresada.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
        

    //    if (fechaIngresada.valueOf() < fechaActual.valueOf()) {
   //       const modal = document.querySelector('modal-warning')
    //      modal.message = 'La fecha de resolución no puede ser mayor a la fecha actual.'
     //     modal.title = 'Error de validación'
     //     modal.open = true
      //  }
      /* else if (fechaIngresada === null) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de fecha de resolución es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        } */


 //       else {
          /*
          if (fechaIngresada.getFullYear() < fechaActual.getFullYear()) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'La fecha de resolución no puede ser menor al año actual.'
            modal.title = 'Error de validación'
            modal.open = true
          }
    
          if (fechaIngresada.getFullYear() < 1900) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'La fecha de resolución no puede ser menor al año 1900.'
            modal.title = 'Error de validación'
            modal.open = true
          }
    */
          const resolucionData = {
            resolucion: resolucion,
            fecha_resolucion: fechaResolucion

          }
          this.#resoluciones.push(resolucionData)
          this.mostrarResoluciones()
          this.#resolucion.value = ''
          this.#fechaResolucion.value = ''
      //  }
      }
    }
    else {
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una resolución si ha selecionado previamente una de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idResolucion = null
      this.#resolucion.value = ''
      this.#fechaResolucion.value = ''
    }
  }

  editarResolucion = async () => {
    const resolucionID = this.#idResolucion
    if (resolucionID === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar una resolución para poder editarla.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      const resolucion = this.#resolucion.value
      const fechaResolucion = this.#fechaResolucion.value

      if (resolucion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (resolucion.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (fechaResolucion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de fecha de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else {



        const fechaActual = new Date();
        fechaActual.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
        
        // Obtener la fecha ingresada desde tu input HTML (asegúrate de obtener el valor correctamente)
        const fechaIngresada = new Date(fechaResolucion);
        fechaIngresada.setUTCHours(0, 0, 0, 0); // Establecer hora UTC
   //     if (fechaIngresada.valueOf() < fechaActual.valueOf()) {
   //       const modal = document.querySelector('modal-warning')
    //      modal.message = 'La fecha de resolución no puede ser mayor a la fecha actual.'
    //      modal.title = 'Error de validación'
    //      modal.open = true
    //    } else {
          /*
          if (fechaIngresada.getFullYear() < fechaActual.getFullYear()) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'La fecha de resolución no puede ser menor al año actual.'
            modal.title = 'Error de validación'
            modal.open = true
          }
    
          if (fechaIngresada.getFullYear() < 1900) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'La fecha de resolución no puede ser menor al año 1900.'
            modal.title = 'Error de validación'
            modal.open = true
          }
    */
          const resolucionData = {
            resolucion: resolucion,
            fecha_resolucion: fechaResolucion

          }

          this.#resoluciones[resolucionID - 1] = resolucionData
          this.mostrarResoluciones()
          this.#idResolucion = null
          this.#resolucion.value = ''
          this.#fechaResolucion.value = ''
       // }
      }

    }
  }

  activarBotonSeleccionarResolucion = (resolucionId) => {

    try {
      const resolucion = this.#resoluciones[resolucionId - 1]
      if (resolucion) {
        this.#idResolucion = resolucionId
        this.#resolucion.value = resolucion.resolucion
        this.#fechaResolucion.value = resolucion.fecha_resolucion
      } else {
        console.error('La resolución con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener la resolución por ID:', error)

    }
  }

  mostrarResoluciones = async () => {

    try {
      const resoluciones = this.#resoluciones
      const tableBody = this.#tableResoluciones
      tableBody.innerHTML = ''
      const lista = resoluciones
      const funcion =
        lista.forEach((resolucion, i) => {
          const row = document.createElement('tr')
          row.innerHTML = `
          <tr id="resolucion-${i + 1}">
          <td class="px-6 py-4 whitespace-nowrap">${i + 1}</td>
          <td class="px-6 py-4 whitespace-nowrap">${resolucion.resolucion}</td>
          <td class="px-6 py-4 whitespace-nowrap">${resolucion.fecha_resolucion}</td>
          <td class="px-6 py-4 whitespace-nowrap">
          <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-resolucion" onclick="activarBotonSeleccionarResolucion(this.value)" value="${i + 1}">
          Seleccionar
        </button>
      
          </td>
      </tr>
          `
          tableBody.appendChild(row)
        })

    } catch (error) {
      console.error('Error al obtener las resoluciones:', error)
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
 const resoluciones = this.#resoluciones
    return {  resoluciones : resoluciones }
  }

  set data(value) {
    this.#resoluciones = value
    this.mostrarResoluciones()
    this.setAttribute('data', value)
  }
}

customElements.define('resolucion-promovente', Resolucion)
