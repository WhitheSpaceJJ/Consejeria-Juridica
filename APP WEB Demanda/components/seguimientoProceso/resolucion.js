import { APIModel } from '../../models/api.model'



export class Resolucion extends HTMLElement {

  //Variables privadas
  #api
  #idResolucion
  #resolucion
  #fechaResolucion
  #resoluciones
  #tableResoluciones
  #botonAgregarResolucion
  #botonEditarResolucion

  //Metodo que se encarga de observar los cambios de los atributos
  static get observedAttributes() {
    return ['id', 'data']
  }
  //Metodo que retorna el valor del atributo id
  get id() {
    return this.getAttribute('id')
  }

  //Metodo que asigna el valor del atributo id
  set id(value) {
    this.setAttribute('id', value)
  }

  //Metodo que retorna todos los datos de las resoluciones
  get data() {
    const resoluciones = this.#resoluciones
    return { resoluciones: resoluciones }
  }

  //Metodo que asigna los datos de las resoluciones
  set data(value) {
    this.#resoluciones = value
    this.mostrarResoluciones()
    this.setAttribute('data', value)
  }
  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('/components/seguimientoProceso/resolucion.html')).text();
    template.innerHTML = html;
    return template;
  }
  async init2() {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
    //Inicialización de variables
    this.#api = new APIModel()

    this.#idResolucion = null
    this.#resoluciones = []
    //Llamado al metodo que se encarga de gestionar los campos del formulario
    this.manageFormFields()
    //Llamado al metodo que se encarga de llenar los campos del formulario
    this.fillInputs()
  }
  //Constructor de la clase
  constructor() {
    super()
    this.init2()


  }
  //Metodo encargado de mandar a llamar al metodo que llena los eventos de los botones
  fillInputs() {
    //Llamado al metodo que se encarga de llenar los eventos de los botones
    this.agregarEventosBotones()
  }

  ////Metodo que se encarga de gestionar los campos del formulario
  manageFormFields() {
    this.#resolucion = this.shadowRoot.getElementById('condiciones')
    this.#fechaResolucion = this.shadowRoot.getElementById('fecha-resolucion')
    this.#tableResoluciones = this.shadowRoot.getElementById('table-resolucion')
    this.#botonAgregarResolucion = this.shadowRoot.getElementById('agregar-resolucion')
    this.#botonEditarResolucion = this.shadowRoot.getElementById('editar-resolucion')
  }

  //Metodo que se encarga de validar los campos del formulario de resolucion evento input
  manejadoeDeEntradaDeTexto() {
    var resolucionInput = this.#resolucion
    resolucionInput.addEventListener('input', function () {
      if (resolucionInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

    })
  }

  //Metodo que se encarga de validar los campos del formulario de resolucion evento input
  agregarEventosBotones = () => {

    //Se añade el evento click al boton de agregar resolucion
    this.#botonAgregarResolucion.addEventListener('click', this.agregarResolucion)
    //Se añade el evento click al boton de editar resolucion
    this.#botonEditarResolucion.addEventListener('click', this.editarResolucion)

    //Se obtienen todos los botones de seleccionar resolucion creados en la tabla  de resoluciones y se les añade el evento click
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-resolucion')

    //Se recorre cada boton de seleccionar resolucion y se le añade el evento click
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const resolucionId = boton.value
        this.#idResolucion = resolucionId
        //Se llama a la funcion que activa el boton de seleccionar resolucion
        this.activarBotonSeleccionarResolucion(resolucionId)
      })
    })

    //Creacion de la funcion que se encarga de activar el boton de seleccionar resolucion
    const activarBotonSeleccionarResolucion = (resolucionId) => {
      //Llamado a la funcion que activa el boton de seleccionar resolucion
      this.activarBotonSeleccionarResolucion(resolucionId)
    }

    //Se añade la funcion activarBotonSeleccionarResolucion al objeto window
    window.activarBotonSeleccionarResolucion = activarBotonSeleccionarResolucion
  }

  //Metodo que se encarga de agregar una resolucion
  agregarResolucion = async () => {
    //Se obtiene el id de la resolucion y asi poder saber si es posible agregar una nueva resolucion
    const resolucionID = this.#idResolucion
    //Se valida si es posible agregar una nueva resolucion
    if (resolucionID === null) {
      // Se obtienen los valores de los campos de resolucion y fecha de resolucion
      const resolucion = this.#resolucion.value
      const fechaResolucion = this.#fechaResolucion.value

      //Se valida si el campo de resolucion esta vacio
      if (resolucion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      //Se valida si el campo de resolucion tiene mas de 200 caracteres
      if (resolucion.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      //Se valida si el campo de fecha de resolucion esta vacio
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

        //En caso de que el campo de resolucion y fecha de resolucion no esten vacios se procede a agregar la resolucion
        if (resolucion !== '' && fechaResolucion !== '' && fechaResolucion !== "") {
          //Se crea un objeto con los datos de la resolucion

          /*
  const modal = document.querySelector('modal-warning')
            modal.message = 'Si esta seguro de agregar el estado procesal presione aceptar, de lo contrario presione x para cancelar.'
            modal.title = '¿Confirmacion de agregar estado procesal?'
            modal.setOnCloseCallback(() => {
              if (modal.open === 'false') {
                if (modal.respuesta === true) {
                  modal.respuesta = false
                  //Se crea un objeto con los datos del estado procesal
                  const estadoProcesalData = {
                    descripcion_estado_procesal: estadoProcesal,
                    fecha_estado_procesal: fechaEstadoProcesal
                  }
                  this.#actual++
                  //Se agrega el estado procesal al arreglo de estados procesales
                  this.#estadosProcesales.push(estadoProcesalData)
                  //Se llama a la funcion que muestra los estados procesales
                  this.mostrarEstadosProcesales()
                  //Se limpian los campos del formulario
                  this.#estadoProcesal.value = ''
                  this.#fechaEstadoProcesal.value = ''
                }
              }
            }
            );
            modal.open = true
          */

          /*
          const resolucionData = {
            resolucion: resolucion,
            fecha_resolucion: fechaResolucion
          }
          //Se añade la resolucion al arreglo de resoluciones
          this.#resoluciones.push(resolucionData)
          //Se llama a la funcion que se encarga de mostrar las resoluciones
          this.mostrarResoluciones()
          //Se limpian los campos de resolucion y fecha de resolucion
          this.#resolucion.value = ''
          this.#fechaResolucion.value = ''
          */ 
         const modal = document.querySelector('modal-warning')
          modal.message = 'Si esta seguro de agregar la resolución presione aceptar, de lo contrario presione x para cancelar.'
          modal.title = '¿Confirmacion de agregar resolución?'

          modal.setOnCloseCallback(() => {
            if (modal.open === 'false') {
              if (modal.respuesta === true) {
                modal.respuesta = false
                //Se crea un objeto con los datos de la resolucion
                const resolucionData = {
                  resolucion: resolucion,
                  fecha_resolucion: fechaResolucion
                }
                //Se añade la resolucion al arreglo de resoluciones
                this.#resoluciones.push(resolucionData)
                //Se llama a la funcion que se encarga de mostrar las resoluciones
                this.mostrarResoluciones()
                //Se limpian los campos de resolucion y fecha de resolucion
                this.#resolucion.value = ''
                this.#fechaResolucion.value = ''
              }
            }
          }
          );
          modal.open = true


        }
      }
    }
    else {
      //En caso de que se haya seleccionado una resolucion previamente se muestra un mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una resolución si ha selecionado previamente una de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idResolucion = null
      this.#resolucion.value = ''
      this.#fechaResolucion.value = ''
    }
  }

  //Metodo que se encarga de editar una resolucion
  editarResolucion = async () => {
    //Variable que almacena el id de la resolucioon el cual ha sido seleccionado, si no se ha seleccionado no se procedera a editar
    //o si se ha seleccionado una resolucion previamente se mostrara un mensaje de error
    const resolucionID = this.#idResolucion
    //Se valida si es posible editar una resolucion
    if (resolucionID === null) {
      //En caso de que no se haya seleccionado una resolucion previamente se muestra un mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar una resolución para poder editarla.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Se obtiene  el valor de los campos de resolucion y fecha de resolucion
      const resolucion = this.#resolucion.value
      const fechaResolucion = this.#fechaResolucion.value

      //Se valida si el campo de resolucion esta vacio
      if (resolucion === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      //Se valida si el campo de resolucion tiene mas de 200 caracteres
      if (resolucion.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de resolución no puede contener más de 200 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      //Se valida si el campo de fecha de resolucion esta vacio
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

        //En caso de que el campo de resolucion y fecha de resolucion no esten vacios se procede a editar la resolucion
        if (resolucion !== '' && fechaResolucion !== '' && fechaResolucion !== "") {
          //Se genera un objeto con los datos de la resolucion
          /*
          const id_resolucion_si_tiene = this.#resoluciones[resolucionID - 1].id_resolucion
          const id_proceso_judicial_si_tiene = this.#resoluciones[resolucionID - 1].id_proceso_judicial
          const resolucionData = {
            id_resolucion: id_resolucion_si_tiene,
            resolucion: resolucion,
            fecha_resolucion: fechaResolucion,
            id_proceso_judicial: id_proceso_judicial_si_tiene
          }
          //Se reemplaza la resolucion en el arreglo de resoluciones
          this.#resoluciones[resolucionID - 1] = resolucionData
          //Se llama a la funcion que se encarga de mostrar las resoluciones
          this.mostrarResoluciones()
          //Se limpian los campos de resolucion y fecha de resolucion
          this.#idResolucion = null
          this.#resolucion.value = ''
          this.#fechaResolucion.value = ''
          */
          const modal = document.querySelector('modal-warning')
          modal.message = 'Si esta seguro de editar la resolución presione aceptar, de lo contrario presione x para cancelar.'
          modal.title = '¿Confirmacion de editar resolución?'
           
          modal.setOnCloseCallback(() => {
            if (modal.open === 'false') {
              if (modal.respuesta === true) {
                modal.respuesta = false
                const id_resolucion_si_tiene = this.#resoluciones[resolucionID - 1].id_resolucion
                const id_proceso_judicial_si_tiene = this.#resoluciones[resolucionID - 1].id_proceso_judicial
                const resolucionData = {
                  id_resolucion: id_resolucion_si_tiene,
                  resolucion: resolucion,
                  fecha_resolucion: fechaResolucion,
                  id_proceso_judicial: id_proceso_judicial_si_tiene
                }
                //Se reemplaza la resolucion en el arreglo de resoluciones
                this.#resoluciones[resolucionID - 1] = resolucionData
                //Se llama a la funcion que se encarga de mostrar las resoluciones
                this.mostrarResoluciones()
                //Se limpian los campos de resolucion y fecha de resolucion
                this.#idResolucion = null
                this.#resolucion.value = ''
                this.#fechaResolucion.value = ''
              }
            }
          }
          );

          modal.open = true
        }
        // }
      }

    }
  }

  //Metodo que se encarga de activar el boton de seleccionar resolucion y que muestra los datos de la resolucion seleccionada
  activarBotonSeleccionarResolucion = (resolucionId) => {

    try {
      //Se obtiene la resolucion seleccionada
      const resolucion = this.#resoluciones[resolucionId - 1]
      //Se valida si la resolucion seleccionada existe
      if (resolucion) {
        //Se muestra la resolucion seleccionada en los campos de resolucion y fecha de resolucion
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

  //Metodo que muestra las resoluciones en la tabla de resoluciones
  mostrarResoluciones = async () => {
    try {
      //Se obtienen las resoluciones
      const resoluciones = this.#resoluciones
      //Se obtiene la tabla de resoluciones
      const tableBody = this.#tableResoluciones
      //Se limpia la tabla de resoluciones
      tableBody.innerHTML = ''
      //Se recorre cada resolucion y se muestra en la tabla de resoluciones
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
  //Metodo que muestra un mensaje de error
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }


}

customElements.define('resolucion-promovente', Resolucion)
