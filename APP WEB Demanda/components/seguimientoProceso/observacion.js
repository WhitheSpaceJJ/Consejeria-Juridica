import { APIModel } from '../../models/api.model'

 

export class ObservacionPromovente extends HTMLElement {

  //Variables privadas
  #api
  #idObservacion
  #observacion
  #observaciones
  #tableObservaciones
  #botonAgregarObservacion
  #botonEditarObservacion

  //Metodos privado que se encarga de obtener los atributos del componente
  static get observedAttributes() {
    return ['id', 'data']
  }

  //Metodo que obtiene el valor del atributo id  
  get id() {
    return this.getAttribute('id')
  }

  //Metodo que establece el valor del atributo id
  set id(value) {
    this.setAttribute('id', value)
  }

  //Metodo que obtiene el valor del atributo data
  get data() {
    const observaciones = this.#observaciones
    return {
      observaciones: observaciones
    }
  }

  //Metodo que establece el valor del atributo data
  set data(value) {
    this.#observaciones = value
    this.mostrarObservaciones()
    this.setAttribute('data', value)
  }

  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('/components/seguimientoProceso/observacion.html')).text();
    template.innerHTML = html;
    return template;
  }
  async init2() {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
  }
  //Constructor de la clase
  constructor() {
    super()
    this.init2()

    //Inicialización de variables
    this.#api = new APIModel()
    this.#idObservacion = null
    this.#observaciones = []
    //Llamada al metodo encargado de gestionar los campos del formulario
    this.manageFormFields()
    //Llamada al metodo encargado de llenar los campos del formulario
    this.fillInputs()
  }

  //Metodo que se encarga de obtener los valores de los atributos del componente
  manageFormFields() {
    this.#observacion = this.shadowRoot.getElementById('observacion')
    this.#tableObservaciones = this.shadowRoot.getElementById('table-observacion')
    this.#botonAgregarObservacion = this.shadowRoot.getElementById('agregar-observacion')
    this.#botonEditarObservacion = this.shadowRoot.getElementById('editar-observacion')

    //Llamada al metodo que se encarga de asignar evento de  validar la longitud del campo de observacion
    this.manejadorEntradaTexto()
  }


  //Metodo que se encarga de asignar evento de  validar la longitud del campo de observacion
  manejadorEntradaTexto() {

    var observacionInput = this.#observacion
    //Evento que se encarga de validar la longitud del campo de observacion
    observacionInput.addEventListener('input', function () {
      if (observacionInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    })

  }

  //Metodo que se encagra de llamar al metodo que se encarga de llenar los eventos de los botones
  fillInputs() {
    this.agregarEventosBotones()
  }

  //Metodo que se encarga de llenar los eventos de los botones
  agregarEventosBotones = () => {
    //Se asigna el evento de click al boton de agregar observacion
    this.#botonAgregarObservacion.addEventListener('click', this.agregarObservacion)
    //Se asigna el evento de click al boton de editar observacion
    this.#botonEditarObservacion.addEventListener('click', this.editarObservacion)
    //Se obtienen todos los botones de seleccionar observacion
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-observacion')
    //Se asigna el evento de click a cada uno de los botones de seleccionar observacion
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const observacionId = boton.value
        this.#idObservacion = observacionId
        //Se llama a la funcion que se encarga de activar el boton de seleccionar observacion
        this.activarBotonSeleccionarObservacion(observacionId)
      })
    })

    //Se asigna la funcion de activar el boton de seleccionar observacion a una variable global
    const activarBotonSeleccionarObservacion = (observacionId) => {
      //Se llama a la funcion que se encarga de activar el boton de seleccionar observacion
      this.activarBotonSeleccionarObservacion(observacionId)
    }

    //Se asigna la funcion de activar el boton de seleccionar observacion a una variable global
    window.activarBotonSeleccionarObservacion = activarBotonSeleccionarObservacion
  }

  //Metodo que se encarga de mostrar las observaciones en la tabla
  mostrarObservaciones = async () => {


    try {
      //Se obtienen las observaciones
      const observaciones = this.#observaciones
      //Se obtiene el cuerpo de la tabla
      const tableBody = this.#tableObservaciones
      //Se limpia el cuerpo de la tabla
      tableBody.innerHTML = ''
      //Se recorre la lista de observaciones
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

  //Metodo que se encarga de editar una observacion
  editarObservacion = async () => {
    //Variable que nos ayuda a determinar si se ha seleccionado una observacion con el fin de editarla
    //caso contrario se mostrara un mensaje de error
    const observacionId = this.#idObservacion
    //Validacion si se ha seleccionado una observacion
    if (observacionId == null) {
      //Mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'Seleccione una observación para editar.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Se obtiene el valor del campo de observacion
      const observacion = this.#observacion.value
      //Validacion si el campo de observacion esta vacio
      if (observacion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else
        //Validacion si el campo de observacion excede los 200 caracteres
        if (observacion.length > 200) {
          //Mensaje de error
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de observación no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
          //Validacion si el campo de observacion no esta vacio y no excede los 200 caracteres
          if (observacion !== '' && observacion.length <= 200) {
            //Se obtiene el id de la observacion
            const id_observacion_si_tiene = this.#observaciones[observacionId - 1].id_observacion
            const id_proceso_judicial_si_tiene = this.#observaciones[observacionId - 1].id_proceso_judicial
            const observacionData = {
              id_observacion: id_observacion_si_tiene,
              observacion: observacion,
              id_proceso_judicial: id_proceso_judicial_si_tiene
            }
            //Se actualiza la observacion
            this.#observaciones[observacionId - 1] = observacionData
            //Se muestra la observacion en la tabla
            this.mostrarObservaciones()
            //Se limpian los campos
            this.#idObservacion = null
            //Se limpia el campo de observacion
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

  //Metodo que se encarga de agregar una observacion
  agregarObservacion = async () => {

    //Variable que nos ayuda a determinar si se ha seleccionado una observacion con el fin de agregarla

    const idObservacion = this.#idObservacion
    //Validacion si se ha seleccionado una observacion
    if (idObservacion === null) {
      //Se obtiene el valor del campo de observacion
      const observacion = this.#observacion.value

      //Validacion si el campo de observacion esta vacio 
      if (observacion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      //Validacion si el campo de observacion excede los 200 caracteres
      if (observacion.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de observación no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      } else {
        //Validacion si el campo de observacion no esta vacio y no excede los 200 caracteres
        if (observacion !== '' && observacion.length <= 200) {
          const observacionData = {
            observacion: observacion
          }
          //Se agrega la observacion
          this.#observaciones.push(observacionData)
          //Se muestra la observacion en la tabla
          this.mostrarObservaciones()
          //Se limpian los campos
          this.#observacion.value = ''
        } else {
          //Caso contrario se muestra un mensaje de error
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de observación es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
      }
    }
    else {
      //Mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una observación si ha selecionado previamente una de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idObservacion = null
      this.#observacion.value = ''

    }
  }

  //Metodo que se encarga de activar el boton de seleccionar observacion, con el fin de agregar a sus respectivos campos
  activarBotonSeleccionarObservacion = async observacionId => {
    try {
      //Se obtiene la observacion por ID
      const observacion = this.#observaciones[observacionId - 1]
      //Validacion si la observacion existe
      if (observacion) {
        //Se asigna el valor de la observacion al campo de observacion
        this.#idObservacion = observacionId

        this.#observacion.value = observacion.observacion
      } else {
        console.error('La observacion con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener la observacion por ID:', error)
    }
  }
    
   
   //Se muestra mensaje de error
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

}

customElements.define('observacion-promovente', ObservacionPromovente)
