//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/estadoCivil-tab.html')
).text()
template.innerHTML = html

class EstadoTab extends HTMLElement {
  //Variables privadas de la clase
  #api
  #estadoCivil
  #estatusEstadoCivil
  #estadoCiviles
  #idSeleccion

  //Constructor de la clase
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Esto con el fin de las vairable sea inicializada en null
    this.#idSeleccion = null;
    //Llamado a la función init
    this.init();
  }

  //Funcion que inicializa las variables y funciones de la clase como lo son lo de los campos de texto y datos
  async init() {
    //Se inicializa la variable de la clase APIModel
    this.#api = new APIModel();
    //Llamada a la función que maneja los campos de texto
    this.manageFormFields();
    //Llamada a la funcion que rellana datos
    this.fillInputs();

  }

  //Funcion que maneja los campos botones y manda a a llamar a mostrar Estados Civiles
  manageFormFields() {
    //Llamada a la funcion que agrega eventos a los botones
    this.agregarEventosBotones();
    //Llamada a la funcion que muestra los estados civiles
    this.mostrarEstadosCiviles();
  }

  //Funcion que inicializa los campos de texto con respecto a su variable
  fillInputs() {
    this.#estadoCivil = this.shadowRoot.getElementById('estado-civil');
    this.#estatusEstadoCivil = this.shadowRoot.getElementById('estatus-estado-civil');
    this.#estadoCiviles = this.shadowRoot.getElementById('table-estado-civil');
    //Llamada a la funcion que maneja los campos de texto
    this.manejadorEntradasTexto();

  }
  //Manejador de entradas de texto 
  manejadorEntradasTexto() {

    //Variable que guarda el campo de texto de estado civil
    var estadoCivilInput = this.#estadoCivil;

    //Evento que se activa cuando el campo de texto de estado civil esta vacio
    estadoCivilInput.addEventListener('input', function () {
      if (estadoCivilInput.value !== '') {
        if (estadoCivilInput.value.length > 50) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estado civil no puede contener más de 50 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        }

      }
      
    });
  }

  //Funcion que agrega eventos a los botones
  agregarEventosBotones = () => {

    //Variable que guarda el boton de agregar estado civil
    const agregarEstadoCivilBtn = this.shadowRoot.getElementById('agregar-estado-civil');
    //Evento que se activa cuando se da click en el boton de agregar estado civil
    agregarEstadoCivilBtn.addEventListener('click', this.agregarEstadoCivil);

    //Variable que guarda el boton de editar estado civil
    const editarEstadoCivilBtn = this.shadowRoot.getElementById('editar-estado-civil');
    //Evento que se activa cuando se da click en el boton de editar estado civil
    editarEstadoCivilBtn.addEventListener('click', this.editarEstadoCivil);

    //Variable que guarda los botones de seleccionar estado civil , esto es con respecto al metodo de mostrarEstadosCiviles de la clase
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-estado-civil');
    //Evento que se activa cuando se da click en los botones de seleccionar estado civil
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const estadoCivilId = boton.value;
        console.log(estadoCivilId);
        this.#idSeleccion = estadoCivilId;
        //Llamada a la funcion que activa el boton de seleccionar
        this.activarBotonSeleccionar(estadoCivilId);
      });
    });

    //Funcion que activa el boton de seleccionar
    const llamarActivarBotonSeleccionar = (estadoCivilId) => {
      //llamada a la funcion que activa el boton de seleccionar
      this.activarBotonSeleccionar(estadoCivilId);
    }
    //Redireccionamiento de la funcion para que pueda ser llamada desde el html
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  //Funcion que agrega un estado civil
  agregarEstadoCivil = async () => {

    //Variable que guarda el id del estado civil
    const estadoCivilID = this.#idSeleccion;

    //Validacion de campos vacios
    if (estadoCivilID === null) {

      //Variable que guarda el campo de texto de estado civil
      const estadoCivilInput = this.#estadoCivil.value;
      //Variable que guarda el campo de texto de estatus de estado civil
      const estatusEstadoCivilInput = this.#estatusEstadoCivil.value;

      try {
        //Validacion de campos vacios en este caso el campo de estado civil y que no este vacio
        if (estadoCivilInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estado civil es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion de campos vacios en este caso el campo de estatus de estado civil y que no este vacio
        if (estatusEstadoCivilInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de estado civil es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos no esten vacios se procede a validar que el campo de estado civil no contenga mas de 50 caracteres
        if (estadoCivilInput !== '' && estatusEstadoCivilInput !== '0') {
          //Validacion de que el campo de estado civil no contenga mas de 50 caracteres
          if (estadoCivilInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de estado civil no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {

            const nuevoEstadoCivil = {
              estado_civil: estadoCivilInput,
              estatus_general: estatusEstadoCivilInput.toUpperCase()
            };
            try {
              const response = await this.#api.postEstadosCivil(nuevoEstadoCivil);

              if (response) {
                this.#estadoCivil.value = '';
                this.#estatusEstadoCivil.value = '0';
                this.IdSeleccion = null;
                this.mostrarEstadosCiviles();
              }
            } catch (error) {
              console.error('Error al agregar un nuevo estado civil:', error);

              const modal = document.querySelector('modal-warning')
              modal.setOnCloseCallback(() => {
                if (modal.open === 'false') {
                  window.location = '/index.html'
                }
              });
              modal.message = 'Error al agregar un nuevo estado civil, por favor intente más tarde o verifique el status del servidor.'
              modal.title = 'Error al agregar estado civil'
              modal.open = true
            }
          }
        }

      } catch (error) {
        console.error('Error al agregar un nuevo estado civil:', error);
      }

    } else {
      //En caso de que ya se haya seleccionado un estado civil se muestra un mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un nuevo estado civil si ya se ha seleccionado uno, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#estadoCivil.value = '';
      this.#estatusEstadoCivil.value = '0';
      this.#idSeleccion = null;
      this.mostrarEstadosCiviles();
    }
  }

  //Funcion que edita un estado civil
  editarEstadoCivil = async () => {
    //Variable que guarda el id del estado civil
    const estadoCivilID = this.#idSeleccion;
    if (estadoCivilID === null) {
      //En caso de que no se haya seleccionado un estado civil se muestra un mensaje de error
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un estado civil para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {

      //Variable que guarda el campo de texto de estado civil
      const estadoCivilInput = this.#estadoCivil.value;
      //Variable que guarda el campo de texto de estatus de estado civil
      const estatusEstadoCivilInput = this.#estatusEstadoCivil.value;

      try {
        //Validacion de campos vacios en este caso el campo de estado civil y que no este vacio
        if (estadoCivilInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estado civil es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        //Validacion de que el estatus de estado civil no este vacio
        if (estatusEstadoCivilInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de estado civil es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos no esten vacios se procede a validar que el campo de estado civil no contenga mas de 50 caracteres
        if (estadoCivilInput !== '' && estatusEstadoCivilInput !== '0') {
          // Validacion de que el campo de estado civil no contenga mas de 50 caracteres
          if (estadoCivilInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de estado civil no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            //Variable que guarda los datos del estado civil
            const estadoCivil = {
              id_estado_civil: estadoCivilID,
              estado_civil: estadoCivilInput,
              estatus_general: estatusEstadoCivilInput.toUpperCase()
            };


            const estadoCivilObtenido = await this.#api.getEstadosCivilByID(estadoCivilID);
            //Aqui se valida si el estado civil que se quiere editar es igual al que ya esta registrado
            if (estadoCivilObtenido.estadoCivil.estado_civil === estadoCivil.estado_civil && estadoCivilObtenido.estadoCivil.estatus_general === estadoCivil.estatus_general) {
              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en el estado civil, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#estadoCivil.value = '';
              this.#estatusEstadoCivil.value = '0';
              this.#idSeleccion = null;
            }
            else {
              try {
                //Llamada a la funcion que edita el estado civil
                const response = await this.#api.putEstadosCivil(estadoCivilID, estadoCivil);
                if (response) {
                  this.#estadoCivil.value = '';
                  this.#estatusEstadoCivil.value = '0';
                  this.#idSeleccion = null;
                  this.mostrarEstadosCiviles();
                }
              } catch (error) {
                console.error('Error al editar el estado civil:', error);

                const modal = document.querySelector('modal-warning')
                modal.setOnCloseCallback(() => {
                  if (modal.open === 'false') {
                    window.location = '/index.html'
                  }
                });
                modal.message = 'Error al editar el estado civil, por favor intente más tarde o verifique el status del servidor.'
                modal.title = 'Error al editar estado civil'
                modal.open = true

              }
            }

          }

        }
      } catch (error) {
        console.error('Error al editar el estado civil:', error);
      }

    }

  }

  
  //Funcion que muestra los estados civiles
  mostrarEstadosCiviles = async () => {

    try {
      //Llamada a la funcion que obtiene los estados civiles
      const estadosCivil = await this.#api.getEstadosCiviles();
      const tableBody = this.#estadoCiviles;
      tableBody.innerHTML = '';
      //Variable que guarda la lista de estados civiles
      const lista = estadosCivil.estadosCiviles;
      //Recorrido de la lista de estados civiles
      lista.forEach(estado => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <tr id="estado-civil-${estado.id_estado_civil}">
          <td class="px-6 py-4 whitespace-nowrap">${estado.id_estado_civil}</td>
          <td class="px-6 py-4 whitespace-nowrap">${estado.estado_civil}</td>
          <td class="px-6 py-4 whitespace-nowrap">${estado.estatus_general}</td>
          <td class="px-6 py-4 whitespace-nowrap">
          <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-estado-civil" onclick="llamarActivarBotonSeleccionar(this.value)" value="${estado.id_estado_civil}">
          Seleccionar
        </button>
      
          </td>
      </tr>
          `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener los estados civil:', error);
      const modal = document.querySelector('modal-warning')
     //  modal.setOnCloseCallback(() => {
   //      if (modal.open === 'false') {
     //      window.location = '/index.html'
 //        }
    //   });
      modal.message = 'Error al obtener los estados civil, por favor intente más tarde o verifique el status del servidor.'
      modal.title = 'Error al obtener estados civil'
      modal.open = true

    }
  }

  // Función que activa el botón de seleccionar  y que rellena los campos de texto con los datos del estado civil seleccionado
  activarBotonSeleccionar = async estadoCivilId => {
    try {
      //Llamada a la funcion que obtiene el estado civil por ID 
      const estadoCivilID = await this.#api.getEstadosCivilByID(estadoCivilId);
      //Validacion de que el estado civil exista
      if (estadoCivilID) {
        this.#idSeleccion = estadoCivilID.estadoCivil.id_estado_civil;
        this.#estadoCivil.value = estadoCivilID.estadoCivil.estado_civil;
        this.#estatusEstadoCivil.value = estadoCivilID.estadoCivil.estatus_general;
      } else {
        console.error('El estado civil con el ID proporcionado no existe.');
      }
    } catch (error) {
      console.error('Error al obtener el estado civil por ID:', error);
    }

  }

}

customElements.define('estadocivil-tab', EstadoTab);
