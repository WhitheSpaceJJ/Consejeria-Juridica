//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'

 
class EscolaridadTab extends HTMLElement {
  //Variables privadas de la API
  #api
  #idSeleccion
  #escolaridades
  #escolaridad
  #estatusEscolaridad

  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('./components/Registros/escolaridad-tab.html')).text();
    template.innerHTML = html;
    return template;
  }

  //Constructro de la clase
  constructor() {
    super();
    //Llamada a la función init para inicializar las variables
    this.init();
  }

  //Función para inicializar las variables, manejador de eventos y campos del formulario
  async init() {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
    //Inicializacion de la variable de la clase APIModel
    this.#api = new APIModel();
    //Inicializacion de la variable de idSeleccion en null
    this.#idSeleccion = null;
    //Llamada a la función manageFormFields para manejar los campos del formulario
    this.manageFormFields();
    //Llamada a la función fillInputs para llenar los campos del formulario
    this.fillInputs();
  }
  //Función que maneja los campos del formulario
  manageFormFields() {
    this.#escolaridades = this.shadowRoot.getElementById('table-escolaridad');
    this.#escolaridad = this.shadowRoot.getElementById('escolaridad');
    this.#estatusEscolaridad = this.shadowRoot.getElementById('estatus-escolaridad');
   //Llamada a la función que maneja la entrada de texto en el campo de escolaridad
   this.manejadorEntradaTexto();
  }

  //Función que maneja la entrada de texto en el campo de escolaridad
manejadorEntradaTexto() {

  var escolaridadInput = this.#escolaridad;

  escolaridadInput.addEventListener('input', function () {
    if (escolaridadInput.value.length > 50) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'El campo de escolaridad no puede contener más de 50 caracteres.'
      modal.title = 'Error de validación'
      modal.open = true
    }
  });
}

//MEtodo que manda a llamar a las funciones correspondientes de agregar eventos a los botones y mostrar las escolaridades
  fillInputs() {
    this.mostrarEscolaridades();
    this.agregarEventosBotones();
  }

  //Función que agrega eventos a los botones de la interfaz
  agregarEventosBotones = () => {
     
    //Asignacion del boton de agregar escolaridad
    const agregarEscolaridadBtn = this.shadowRoot.getElementById('agregar-escolaridad');

    //Asignación del evento click al boton de agregar escolaridad
    agregarEscolaridadBtn.addEventListener('click', this.agregarEscolaridad);

    //Asignación del boton de editar escolaridad
    const editarEscolaridadBtn = this.shadowRoot.getElementById('editar-escolaridad');

    //Asignación del evento click al boton de editar escolaridad
    editarEscolaridadBtn.addEventListener('click', this.editarEscolaridad);

    //Obtencion de todos los botones de seleccionar escolaridad creados en la tabla de escolaridades con el metodo de mostrarEscolaridades
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-escolaridad');

    //Iteración de los botones de seleccionar escolaridad para asignarles un evento click
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const escolaridadId = boton.dataset.id;
        console.log(escolaridadId);
        this.#idSeleccion = escolaridadId;
         
        //Llamada a la función de activar boton seleccionar
        this.activarBotonSeleccionar(escolaridadId);
      });
    });

    //Función que llama a la función de activar boton seleccionar
    const llamarActivarBotonSeleccionar = (escolaridadId) => {
      this.activarBotonSeleccionar(escolaridadId);
    };

    //Asignación de la función de activar boton seleccionar a la variable global de window
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;

  }
  //Metodo que agrega una escolaridad
  agregarEscolaridad = async () => {
  
    //Variable que nos ayuda a obtener el id de la escolaridad seleccionada y asi poder agregar una nueva escolaridad
    const escolaridadID = this.#idSeleccion;
     
    //Validación de si ya se ha seleccionado una escolaridad para agregar una nueva
    if (escolaridadID === null) {

      //Obtención de los valores de los campos de escolaridad y estatus de escolaridad
      const escolaridadInput = this.#escolaridad.value;
      const estatusEscolaridadInput = this.#estatusEscolaridad.value;

      try {
        //Validación de si el campo de escolaridad está vacío
        if (escolaridadInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validación de si el campo de estatus de escolaridad está vacío
        if (estatusEscolaridadInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos de escolaridad y estatus de escolaridad no estén vacíos
        if (escolaridadInput !== '' && estatusEscolaridadInput !== '0') {
          //Se prpcede a validar que el campo de escolaridad no contenga más de 50 caracteres
          if (escolaridadInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de escolaridad no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {
            //Creación de un objeto con los valores de los campos de escolaridad y estatus de escolaridad

            const nuevaEscolaridad = {
              descripcion: escolaridadInput,
              estatus_general: estatusEscolaridadInput.toUpperCase()
            };

            //Llamada a la función de postEscolaridad de la API para agregar una nueva escolaridad
            const response = await this.#api.postEscolaridad(nuevaEscolaridad);
            //En caso de que la respuesta sea exitosa se limpian los campos y se muestra la tabla de escolaridades
            if (response) {
              this.#escolaridad.value = '';
              this.#estatusEscolaridad.value = '0';
              this.IdSeleccion = null;
              this.mostrarEscolaridades();
            }
          }
        }
      } catch (error) {
        console.error('Error al agregar un nuevo escolaridad:', error);
      }
    }
    else {
      //En caso de que ya se haya seleccionado una escolaridad se muestra un mensaje de error y se limpian los campos
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un nuevo escolaridad si ya se ha seleccionado uno, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#escolaridad.value = '';
      this.#estatusEscolaridad.value = '0';
      this.#idSeleccion = null;
      this.mostrarEscolaridades();
    }

  }

  //Metodo que edita una escolaridad seleccionada
  editarEscolaridad = async () => {
  
    //Variable que nos ayuda a obtener el id de la escolaridad seleccionada y asi poder editarla
    const escolaridadID = this.#idSeleccion;
     
    //Validación de si ya se ha seleccionado una escolaridad para editarla
    if (this.#idSeleccion === null) {
      //Muetsra un mensaje de error en caso de que no se haya seleccionado una escolaridad
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un escolaridad para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Obtención de los valores de los campos de escolaridad y estatus de escolaridad

      const escolaridadInput = this.#escolaridad.value;
      const estatusEscolaridadInput = this.#estatusEscolaridad.value;

      try {
        //Validación de si el campo de escolaridad está vacío
        if (escolaridadInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validación de si el campo de estatus de escolaridad está vacío
        if (estatusEscolaridadInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos de escolaridad y estatus de escolaridad no estén vacíos
        if (escolaridadInput !== '' && estatusEscolaridadInput !== '0') {
          //Se procede a validar que el campo de escolaridad no contenga más de 50 caracteres
          if (escolaridadInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de escolaridad no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            //Creación de un objeto con los valores de los campos de escolaridad y estatus de escolaridad
            const escolaridad = {
              id_escolaridad: escolaridadID,
              descripcion: escolaridadInput,
              estatus_general: estatusEscolaridadInput.toUpperCase()
            };

            //Se obtiene la escolaridad por ID para validar si se han realizado cambios en la escolaridad
            const escolaridadObtenida = await this.#api.getEscolaridadByID(escolaridadID);

            //Se valida si es posible editar la escolaridad
            if (escolaridadObtenida.descripcion === escolaridad.descripcion && escolaridadObtenida.estatus_general === escolaridad.estatus_general) {
              //En caso de que no se hayan realizado cambios se muestra un mensaje de error y se limpian los campos
              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en la escolaridad, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#escolaridad.value = '';
              this.#estatusEscolaridad.value = '0';
              this.#idSeleccion = null;

            }
            else {
              //Llamada a la función de putEscolaridad de la API para editar la escolaridad
              const response = await this.#api.putEscolaridad(escolaridadID, escolaridad);

              //En caso de que la respuesta sea exitosa se limpian los campos y se muestra la tabla de escolaridades
              if (response) {
                this.#escolaridad.value = '';
                this.#estatusEscolaridad.value = '0';
                this.#idSeleccion = null;
                this.mostrarEscolaridades();
              }

            }

          }
        }

      } catch (error) {
        console.error('Error al editar la escolaridad:', error);
      }
    }


  }
  //Metodo que muestra las escolaridades en la tabla de escolaridades
  mostrarEscolaridades = async () => {
 
    try {
      //Llamada a la función de getEscolaridades de la API para obtener todas las escolaridades
      const escolaridades = await this.#api.getEscolaridades();
      //Obtención del cuerpo de la tabla de escolaridades
      const tableBody = this.#escolaridades;
      //Limpieza de la tabla de escolaridades
      tableBody.innerHTML = '';
      //Iteración de las escolaridades para mostrarlas en la tabla
      const lista = escolaridades;
      const funcion =
        lista.forEach(escolaridad => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <tr id="escolaridad-${escolaridad.id_escolaridad}">
            <td class="px-6 py-4 whitespace-nowrap">${escolaridad.id_escolaridad}</td>
            <td class="px-6 py-4 whitespace-nowrap">${escolaridad.descripcion}</td>
            <td class="px-6 py-4 whitespace-nowrap">${escolaridad.estatus_general}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-escolaridad" onclick="llamarActivarBotonSeleccionar(this.value)" value="${escolaridad.id_escolaridad}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
          tableBody.appendChild(row);
        });
    } catch (error) {
      console.error('Error al obtener las escolaridades:', error);
    }

  }

  //Metodo que activa el boton de seleccionar escolaridad el cual muestra la escolaridad seleccionada en los campos de escolaridad y estatus de escolaridad
  activarBotonSeleccionar = async escolaridadId => {
    
    try {
      //Llamada a la función de getEscolaridadByID de la API para obtener la escolaridad por ID
      const escolaridadID = await this.#api.getEscolaridadByID(escolaridadId);
       
      //Validación de si la escolaridad con el ID proporcionado existe
      if (escolaridadID) {
        //Asignación de los valores de la escolaridad seleccionada a los campos de escolaridad y estatus de escolaridad
        this.#idSeleccion = escolaridadID.id_escolaridad;
        this.#escolaridad.value = escolaridadID.descripcion;
        this.#estatusEscolaridad.value = escolaridadID.estatus_general;
      } else {
        console.error('La escolaridad con el ID proporcionado no existe.');
      }
    } catch (error) {
      console.error('Error al obtener la escolaridad por ID:', error);

    }
  }
}

customElements.define('escolaridad-tab', EscolaridadTab);
