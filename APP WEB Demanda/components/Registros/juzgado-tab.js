//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/juzgado-tab.html')
).text()
template.innerHTML = html

class JuzgadoTab extends HTMLElement {
  
  // Variables privadas de la clase
  #api
  #idSeleccion
  #juzgados
  #juzgado
  #estatusJuzgado

  //Constructro de la clase
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    //Llamada a la función init para inicializar las variables
    this.init();
  }

  //Función para inicializar las variables, manejador de eventos y campos del formulario
  async init() {
    //Inicializacion de la variable de la clase APIModel
    this.#api = new APIModel();
    //Inicializacion de la variable de idSeleccion en null
    this.#idSeleccion = null;
    //Llamada a la función manageFormFields para manejar los campos del formulario
    this.manageFormFields();
    //Llamada a la función fillInputs para llenar los campos del formulario
    this.fillInputs();

  }
  
//Función para manejar los campos del formulario
  manageFormFields() {
    //Inicialización de las variables de la clase
    this.#juzgados = this.shadowRoot.getElementById('table-juzgado');
    this.#juzgado = this.shadowRoot.getElementById('juzgado');
    this.#estatusJuzgado = this.shadowRoot.getElementById('estatus-juzgado');
  //Llamada a la función manejadorEntradaTexto para manejar la entrada de texto en el campo de juzgado
    this.manejadorEntradaTexto();
  }


  //Función para manejar la entrada de texto en el campo de juzgado 
  manejadorEntradaTexto(){
    //Inicialización de la variable juzgadoInput con el campo de juzgado
    var juzgadoInput = this.#juzgado;
    //Evento input para el campo de juzgado
    juzgadoInput.addEventListener('input', function () {
      if (juzgadoInput.value.length > 50) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de juzgado no puede contener más de 50 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });
  }

  // Funcion que manda a llamar al metodo de mostrar juzgados y agrega los eventos a los botones
  fillInputs() {
    //Llamada a la función mostrarJuzgados para mostrar los juzgados
    this.mostrarJuzgados();
    //Llamada a la función agregarEventosBotones para agregar eventos a los botones
    this.agregarEventosBotones();
  }

  //Función para agregar eventos a los botones
  agregarEventosBotones = () => {

    //Obtener el botón de agregar juzgado
    const agregarJuzgadoBtn = this.shadowRoot.getElementById('agregar-juzgado');

    //Evento click para el botón de agregar juzgado
    agregarJuzgadoBtn.addEventListener('click', this.agregarJuzgado);

    //Obtener el botón de editar juzgado
    const editarJuzgadoBtn = this.shadowRoot.getElementById('editar-juzgado');

    //Evento click para el botón de editar juzgado
    editarJuzgadoBtn.addEventListener('click', this.editarJuzgado);

    //Obtener todos los botones de seleccionar juzgado creados en la tabla de juzgados del metodo mostrarJuzgados
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-juzgado');

    //Recorrer los botones de seleccionar juzgado y agregar un evento click a cada uno
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const juzgadoId = boton.dataset.id;
        console.log(juzgadoId);
        this.#idSeleccion = juzgadoId;
        //Llamada a la función activarBotonSeleccionar para activar el botón de seleccionar
        this.activarBotonSeleccionar(juzgadoId);
      });
    });

    //Función para llamar a la función activarBotonSeleccionar
    const llamarActivarBotonSeleccionar = (juzgadoId) => {
       //Llamada a la función activarBotonSeleccionar para activar el botón de seleccionar
      this.activarBotonSeleccionar(juzgadoId);
    };

    //Asignación de la función llamarActivarBotonSeleccionar a la variable global window
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  //Función para agregar un nuevo juzgado
  agregarJuzgado = async () => {
  //Variable que nos ayuda a determinar si se ha seleccionado un juzgado o no
  //esto con el fin de validar si se puede agregar un nuevo juzgado o no
    const juzgadoID = this.#idSeleccion;

    //Verificar si se ha seleccionado un juzgado
    if (juzgadoID === null) {
      //Obtener el valor del campo de juzgado
      const juzgadoInput = this.#juzgado.value;
      const estatusJuzgadoInput = this.#estatusJuzgado.value;

      try {
        //Validar si el campo de juzgado está vacío
        if (juzgadoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validar si el campo de estatus de juzgado está vacío
        if (estatusJuzgadoInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos de juzgado y estatus de juzgado no estén vacíos
        if (juzgadoInput !== '' && estatusJuzgadoInput !== '0') {
          if (juzgadoInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de juzgado no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {
            
            //Crear un nuevo juzgado con los valores de los campos de juzgado y estatus de juzgado
            const nuevoJuzgado = {
              nombre_juzgado: juzgadoInput,
              estatus_general: estatusJuzgadoInput.toUpperCase()
            };

            //Llamada al método postJuzgado de la clase APIModel para agregar un nuevo juzgado
            const response = await this.#api.postJuzgado(nuevoJuzgado);

            //Validar si se ha agregado el nuevo juzgado
            if (response) {
              //Se limpian los campos de juzgado y estatus de juzgado
              this.#juzgado.value = '';
              this.#estatusJuzgado.value = '0';
              this.IdSeleccion = null;
              //Llamada a la función mostrarJuzgados para mostrar los juzgados
              this.mostrarJuzgados();
            }
          }
        }
      } catch (error) {
        console.error('Error al agregar un nuevo juzgado:', error);
      }
    } else {
      //En caso de que se haya seleccionado un juzgado
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un nuevo juzgado si ya se ha seleccionado uno, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#juzgado.value = '';
      this.#estatusJuzgado.value = '0';
      this.#idSeleccion = null;
      this.mostrarJuzgados();
    }

  }

  //Función para editar un juzgado
  editarJuzgado = async () => {

  //Variable que nos ayuda a determinar si se ha seleccionado un juzgado o no
  //esto con el fin de validar si se puede editar un juzgado o no
    const juzgadoID = this.#idSeleccion;
    //Validar si se ha seleccionado un juzgado
    if (this.#idSeleccion === null) {
      //Mensaje de error en caso de que no se haya seleccionado un juzgado
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un juzgado para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
 //Obtener el valor del campo de juzgado
      const juzgadoInput = this.#juzgado.value;
      const estatusJuzgadoInput = this.#estatusJuzgado.value;


      try {
        //Validar si el campo de juzgado está vacío
        if (juzgadoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validar si el campo de estatus de juzgado está vacío
        if (estatusJuzgadoInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos de juzgado y estatus de juzgado no estén vacíos
        if (juzgadoInput !== '' && estatusJuzgadoInput !== '0') {
          //Validar si el campo de juzgado no contiene más de 50 caracteres
          if (juzgadoInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de juzgado no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            // Crear un objeto juzgado con los valores de los campos de juzgado y estatus de juzgado
            const juzgado = {
              id_juzgado: juzgadoID,
              nombre_juzgado: juzgadoInput,
              estatus_general: estatusJuzgadoInput.toUpperCase()
            };

//Llamada al método getJuzgadoByID de la clase APIModel para obtener un juzgado por ID
            const juzgadoObtenido = await this.#api.getJuzgadoByID(juzgadoID);

            //En caso de que se haya obtenido un juzgado por ID y que este sea igual al juzgado que se quiere editar
            if (juzgadoObtenido.nombre_juzgado === juzgado.nombre_juzgado && juzgadoObtenido.estatus_general === juzgado.estatus_general) {

              //Mensaje de error en caso de que no se haya realizado ningún cambio en el juzgado
              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en el juzgado, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#juzgado.value = '';
              this.#estatusJuzgado.value = '0';
              this.#idSeleccion = null;

            }
            else {
             //Llamada al método putJuzgado de la clase APIModel para editar un juzgado
              const response = await this.#api.putJuzgado(juzgadoID, juzgado);

              //Validar si se ha editado el juzgado
              if (response) {
                //Mensaje de éxito en caso de que se haya editado el juzgado
                this.#juzgado.value = '';
                this.#estatusJuzgado.value = '0';
                this.#idSeleccion = null;
                //Mostrar los juzgados
                this.mostrarJuzgados();
              }

            }
          }
        }

      } catch (error) {
        console.error('Error al editar el juzgado:', error);
      }
    }
  }

  //Función para mostrar los juzgados
  mostrarJuzgados = async () => {
  
    try {
      //Llamada al método getJuzgados de la clase APIModel para obtener los juzgados
      const juzgados = await this.#api.getJuzgados();
      //Inicialización de la variable tableBody con el campo de la tabla de juzgados
      const tableBody = this.#juzgados;
      //Limpiar la tabla de juzgados
      tableBody.innerHTML = '';
      //Recorrer la lista de juzgados
      const lista = juzgados;
      const funcion =
        lista.forEach(juzgado => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <tr id="juzgado-${juzgado.id_juzgado}">
            <td class="px-6 py-4 whitespace-nowrap">${juzgado.id_juzgado}</td>
            <td class="px-6 py-4 whitespace-nowrap">${juzgado.nombre_juzgado}</td>
            <td class="px-6 py-4 whitespace-nowrap">${juzgado.estatus_general}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-juzgado" onclick="llamarActivarBotonSeleccionar(this.value)" value="${juzgado.id_juzgado}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
          tableBody.appendChild(row);
        });
    } catch (error) {
      console.error('Error al obtener los juzgados:', error);
    }
  }

  // Metodo para activar el boton de seleccionar y que se muestren los datos en los campos de juzgado y estatus de juzgado
  activarBotonSeleccionar = async juzgadoId => {
 
    try {
     //Llamada al método getJuzgadoByID de la clase APIModel para obtener un juzgado por ID
      const juzgadoID = await this.#api.getJuzgadoByID(juzgadoId);
      //Validar si se ha obtenido un juzgado por ID
      if (juzgadoID) {
        //Asignar los valores del juzgado obtenido a los campos de juzgado y estatus de juzgado
        this.#idSeleccion = juzgadoID.id_juzgado;
        this.#juzgado.value = juzgadoID.nombre_juzgado;
        this.#estatusJuzgado.value = juzgadoID.estatus_general;
      } else {
        console.error('El juzgado con el ID proporcionado no existe.');
      }
    } catch (error) {
      console.error('Error al obtener el juzgado por ID:', error);
    }
  }

}

customElements.define('juzgado-tab', JuzgadoTab);
