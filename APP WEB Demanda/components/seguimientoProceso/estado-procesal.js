import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/seguimientoProceso/estado-procesal.html')
).text()
template.innerHTML = html

export class EstadoProcesal extends HTMLElement {
  //Variables privadas de la clase
  #api
  #idEstadoProcesal
  #estadoProcesal
  #fechaEstadoProcesal
  #estadosProcesales
  #tableEstadosProcesales

  #botonAgregarEstadoProcesal
  #botonEditarEstadoProcesal
  #registroTab

 
  //Metodo que obtiene  los atributos que se le pasan al componente
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
    const estadosProcesales = this.#estadosProcesales
    return { estadosProcesales: estadosProcesales }
  }

  //Metodo que establece el valor del atributo data
  set data(value) {
    this.#estadosProcesales = value
    this.mostrarEstadosProcesales()
    this.setAttribute('data', value)
  }

  //Constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    //Inicializacion de las variables privadas 
    this.#api = new APIModel()
    this.#idEstadoProcesal = null
    this.#estadosProcesales = []
    //Llamada al metodo que maneja los campos del formulario
    this.manageFormFields()
    //Llamada al metodo que llena los campos del formulario
    this.fillInputs()

  }

  //Metodo encargado de manejar los campos del formulario
  manageFormFields() {
    //Obtencion de los campos del formulario
    this.#estadoProcesal = this.shadowRoot.getElementById('estado')
    this.#fechaEstadoProcesal = this.shadowRoot.getElementById('fecha-estado')
    this.#tableEstadosProcesales = this.shadowRoot.getElementById('table-estado')
    this.#botonAgregarEstadoProcesal = this.shadowRoot.getElementById('agregar-estado')
    this.#botonEditarEstadoProcesal = this.shadowRoot.getElementById('editar-estado')
  }

  //Llamada al metodo que maneja los eventos de los campos del formulario , en este caso eventos del tipo input
  manejadorEntradaTexto(){
    var estadoProcesalInput = this.#estadoProcesal
    estadoProcesalInput.addEventListener('input', function () {
      if (estadoProcesalInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo estado procesal no puede tener más de 200 caracteres'
        modal.title = 'Error'
        modal.open = true
      }
    })

  }

  //Metodo que manda a llamar al metodo que llena los eventos de los botones
  fillInputs() {
    //Llamada al metodo que llena los eventos de los botones
    this.agregarEventosBotones()
  }

  //Metodo que agrega los eventos a los botones
  agregarEventosBotones = () => {

    //Evento que se ejecuta cuando se da click en el boton de agregar estado procesal
    this.#botonAgregarEstadoProcesal.addEventListener('click', this.agregarEstadoProcesal)
    //Evento que se ejecuta cuando se da click en el boton de editar estado procesal
    this.#botonEditarEstadoProcesal.addEventListener('click', this.editarEstadoProcesal)

    //Se obtienen todos los botones de seleccionar estado procesal crados en el metodo mostrarEstadosProcesales
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-estado')

    //Se recorre cada boton de seleccionar estado procesal y se le agrega un evento de click
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const estadoProcesalId = boton.dataset.id
        this.#idEstadoProcesal = estadoProcesalId
        //Llamada al metodo que activa el boton de seleccionar estado procesal
        this.llamarActivarBotonSeleccionarEstado(estadoProcesalId)
      })
    })
      
    //Se agregan eventos de input a los campos del formulario
    const llamarActivarBotonSeleccionarEstado = (estadoProcesalId) => {
      this.llamarActivarBotonSeleccionarEstado(estadoProcesalId)
    }

    window.llamarActivarBotonSeleccionarEstado = llamarActivarBotonSeleccionarEstado

  }

  //Metodo que se ejecuta cuando se agrega un estado procesal
  agregarEstadoProcesal = async () => {

    //Se obtiene el id del estado procesal, esto con el fin de verificar si se ha seleccionado 
    //previamente un estado procesal de la tabla con el fin de añaadir uno nuevo o no
    const estadoProcesalID = this.#idEstadoProcesal
    //Si no se ha seleccionado un estado procesal de la tabla se procede a agregar uno nuevo
    if (estadoProcesalID === null) {
      //Se obtienen los valores de los campos del formulario
      const estadoProcesal = this.#estadoProcesal.value
      const fechaEstadoProcesal = this.#fechaEstadoProcesal.value

      //Se verifica si el campo de estado procesal esta vacio, o si tiene mas de 200 caracteres
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
      
      //Se verifica si el campo de fecha de estado procesal esta vacio
      if (fechaEstadoProcesal === '') {
        this.#showModal('La fecha de estado procesal no puede estar vacia', 'Error')
      }
      else {

          //Verififcar json en este caso que el estado procesal no sea vacio y que la fecha no sea vacia, y que el estado procesal no tenga mas de 100 caracteres
          if( estadoProcesal !== '' && fechaEstadoProcesal !== '' && estadoProcesal.length <= 100) {

            //Se crea un objeto con los datos del estado procesal
          const estadoProcesalData = {
            descripcion_estado_procesal: estadoProcesal,
            fecha_estado_procesal: fechaEstadoProcesal
          }
          //Se agrega el objeto al arreglo de estados procesales
          this.#estadosProcesales.push(estadoProcesalData)
          //Se llama al metodo que muestra los estados procesales
          this.mostrarEstadosProcesales()
          //Se reinician los campos del formulario
          this.#estadoProcesal.value = ''
          this.#fechaEstadoProcesal.value = ''
        }
      //  }
      }
    }
    else {
      //Caso contrario se muestra un mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un estado procesal si ha selecionado previamente uno de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idEstadoProcesal = null
      this.#estadoProcesal.value = ''
      this.#fechaEstadoProcesal.value = ''
    }


  }
 
  //Metodo que se ejecuta cuando se edita un estado procesal
  editarEstadoProcesal = async () => {
    //Se obtiene el id del estado procesal, esto con el fin de verificar si se ha seleccionado
    const estadoProcesalID = this.#idEstadoProcesal
    //Si no se ha seleccionado un estado procesal de la tabla se muestra un mensaje de error
    if (estadoProcesalID === null) {
      //Mostrar mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un estado procesal para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Obtener los valores de los campos del formulario
      const estadoProcesal = this.#estadoProcesal.value
      const fechaEstadoProcesal = this.#fechaEstadoProcesal.value

      //Verificar si el campo de estado procesal esta vacio o si tiene mas de 100 caracteres
      if (estadoProcesal === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de estado procesal es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else

       //Verificar si el campo de estado procesal tiene mas de 100 caracteres
        if (estadoProcesal.length > 100) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estado procesal no puede contener más de 100 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        }

    //Verificar si el campo de fecha de estado procesal esta vacio
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
        
 
    
          /**
            De alguna manera con respecto al id del estado procesal seleccionado se debe de modificar el arreglo de estados procesales  
           */
          //Verificar json en este caso que el estado procesal no sea vacio y que la fecha no sea vacia, y que el estado procesal no tenga mas de 100 caracteres
            if( estadoProcesal !== '' && fechaEstadoProcesal !== '' && estadoProcesal.length <= 100) {

               //Esto es con el fin de buscar si el estado procesal seleccionado tiene un id de estado procesal y un id de proceso judicial
               //ya que si tiene un id de estado procesal y un id de proceso judicial se debe de modificar el arreglo de estados procesales
           const id_estado_procesal_si_tiene = this.#estadosProcesales[estadoProcesalID - 1].id_estado_procesal 
           const id_proceso_judicial_si_tiene = this.#estadosProcesales[estadoProcesalID - 1].id_proceso_judicial
          const estadoProcesalData = {
            id_estado_procesal: id_estado_procesal_si_tiene,
            descripcion_estado_procesal: estadoProcesal,
            fecha_estado_procesal: fechaEstadoProcesal,
            id_proceso_judicial: id_proceso_judicial_si_tiene

          }
          //Se modifica el arreglo de estados procesales
          this.#estadosProcesales[estadoProcesalID - 1] = estadoProcesalData
          //Se llama al metodo que muestra los estados procesales
          this.mostrarEstadosProcesales()
          //Se reinician los campos del formulario
          this.#idEstadoProcesal = null
          this.#estadoProcesal.value = ''
          this.#fechaEstadoProcesal.value = ''
        }
      //  }
      }
    }
  }

  //Metodo que muestra los estados procesales
  mostrarEstadosProcesales = async () => {

    try {
      //Se obtiene el arreglo de estados procesales
      const estadosProcesales = this.#estadosProcesales
      //Se obtiene el cuerpo de la tabla de estados procesales
      const tableBody = this.#tableEstadosProcesales
      //Se limpia el cuerpo de la tabla
      tableBody.innerHTML = ''
      //Se recorre el arreglo de estados procesales
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

  //Metodo que se ejecuta cuando se selecciona un estado procesal y que activa el boton de seleccionar estado procesal, para
  //asi poder mostrar los datos del estado procesal seleccionado
  llamarActivarBotonSeleccionarEstado = async estadoProcesalId => {

    try {
//Obtencion del estado procesal por id
      const estadoProcesal = this.#estadosProcesales[estadoProcesalId - 1]
      //Se valida si el estado procesal existe
      if (estadoProcesal) {
        //Se asignan los valores del estado procesal a los campos del formulario
        this.#idEstadoProcesal = estadoProcesalId
        this.#estadoProcesal.value = estadoProcesal.descripcion_estado_procesal
        this.#fechaEstadoProcesal.value = estadoProcesal.fecha_estado_procesal
      } else {
        console.error('El estado procesal con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener el estado procesal por ID:', error)
    }
  }
 

   //Metodo que muestra mensajes de error
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

  
}

customElements.define('estado-procesal', EstadoProcesal)
