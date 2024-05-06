import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'

const template = document.createElement('template');
const html = await (
  await fetch('./components/Registros/generos-tab.html')
).text()
template.innerHTML = html


class GenerosTab extends HTMLElement {
  //Atributos privados de la clase GenerosTab
  #genero
  #estatusGenero
  #generos
  #idSeleccion
  #api

  // Constructor de la clase GenerosTab
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Llamada a la función init
    this.init();
  }

  // Función de inicialización de la clase GenerosTab
  async init() {
    //Inicialización de la variable de APIModel
    this.#api = new APIModel();
    //LLamada a la función manageFormFields
    this.manageFormFields();
    //LLamada a la función fillInputs
    this.fillInputs();
  }
  //Función para manejar los campos del formulario
  manageFormFields() {
    //Inicialización de los campos del formulario
    this.#genero = this.shadowRoot.getElementById('genero');
    this.#estatusGenero = this.shadowRoot.getElementById('estatus-genero');
    this.#generos = this.shadowRoot.getElementById('table-genero');
    //Llamada a la función manejadorEventosEntrada
    this.manejadorEventosEntrada();
  }

  //Manejador de eventos de entrada
  manejadorEventosEntrada() {
    //Manejador de eventos de entrada para el campo de género
    var generoInput = this.#genero;
    //Evento de entrada para el campo de género
    generoInput.addEventListener('input', function () {
      if (generoInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de género es obligatorio, no debe estar vacío.'
        modal.title = 'Error de validación'
        modal.open = true

      }
      else if (generoInput.value.length > 25) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de género no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });
  }

  //Función para llenar los campos de entrada en este caso los generos y eventos de botones
  fillInputs() {
    //Llamada a la función mostrarGeneros
    this.mostrarGeneros();
    //Llamada a la función agregarEventosBotones
    this.agregarEventosBotones();
  }
  //Función para agregar eventos a los botones
  agregarEventosBotones = () => {
    //Inicialización de los botones de agregar y editar género
    const agregarGeneroBtn = this.shadowRoot.getElementById('agregar-genero');
    //Agregar evento de click al botón de agregar género
    agregarGeneroBtn.addEventListener('click', this.agregarGenero);

    //Variable para inicializar el botón de editar género
    const editarGeneroBtn = this.shadowRoot.getElementById('editar-genero');
    //Agregar evento de click al botón de editar género
    editarGeneroBtn.addEventListener('click', this.editarGenero);

    //Variable para inicializar los botones de seleccionar género esto es con respecto al metodo de mostrarGeneros de la clase GenerosTab
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-genero');
    //Agregar evento de click a los botones de seleccionar género
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const generoId = boton.value;
        console.log(generoId);
        this.#idSeleccion = generoId;
        //Llamada a la función activarBotonSeleccionar
        this.activarBotonSeleccionar(generoId);
      });
    });

    //Función para llamar a la función activarBotonSeleccionar
    const llamarActivarBotonSeleccionar = (generoId) => {
      //Llamada a la función activarBotonSeleccionar
      this.activarBotonSeleccionar(generoId);
    };

    //Asignación de la función llamarActivarBotonSeleccionar a la variable global
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  //Función para agregar un género
  agregarGenero = async () => {
    //Variable de idSeleccion con el fin de obtener el id del género seleccionado en la tabla
    const generoID = this.#idSeleccion;
    //Validación de campos de entrada
    if (generoID === null) {
      //Variable que guarda el genero ingresado por el usuario 
      const generoInput = this.#genero.value;
      //Variable que guarda el estatus del genero ingresado por el usuario
      const estatusGeneroInput = this.#estatusGenero.value;

      try {
        //Verificación que si el genero ingresado por el usuario está vacío se muestre un mensaje de error
        if (generoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de género es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Verificación que si el estatus del genero ingresado por el usuario está vacío se muestre un mensaje de error
        if (estatusGeneroInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de género es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        //Verificación que si el genero ingresado por el usuario no está vacío y el estatus del genero ingresado por el usuario no está vacío
        if (generoInput !== '' && estatusGeneroInput !== '0') {
          //Verificación que si el genero ingresado por el usuario tiene más de 25 caracteres se muestre un mensaje de error
          if (generoInput.length > 25) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de género no puede contener más de 25 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {
            //Variable que guarda el nuevo genero ingresado por el usuario
            const nuevoGenero = {
              descripcion_genero: generoInput,
              estatus_general: estatusGeneroInput.toUpperCase()
            };
            try {
              const response = await this.#api.postGenero(nuevoGenero);

              if (response) {
                this.#genero.value = '';
                this.#estatusGenero.value = '0';
                this.#idSeleccion = null;
                this.mostrarGeneros();
              }
            } catch (error) {
              //Mensaje de error al agregar un nuevo género en caso de error y que el servidor no responda, posteriormente se redirige a la página de inicio
              console.error('Error al agregar un nuevo género:', error);
              const modal = document.querySelector('modal-warning')
              modal.setOnCloseCallback(() => {
                if (modal.open === 'false') {
                  window.location = '/index.html'
                }
              });
              modal.message = 'Error al agregar un nuevo género, por favor intente de nuevo o verifique el status del servidor.'
              modal.title = 'Error al agregar género'
              modal.open = true
            }
          }
        }

      } catch (error) {
        console.error('Error al agregar un nuevo género:', error);
      }
    } else {
      //Mensaje de error al agregar un nuevo género en caso de que ya se haya seleccionado un género
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un nuevo género si ya se ha seleccionado uno, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#genero.value = '';
      this.#estatusGenero.value = '0';
      this.#idSeleccion = null;
      this.mostrarGeneros();
    }
  }

  //Función para editar un género
  editarGenero = async () => {

    //Variable de idSeleccion con el fin de obtener el id del género seleccionado en la tabla
    const generoID = this.#idSeleccion;
    //Validación de campos de entrada
    if (generoID === null) {
      //Mensaje de error al editar un género en caso de que no se haya seleccionado un género
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un género para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Variable que guarda el genero ingresado por el usuario
      const generoInput = this.#genero.value;
      //Variable que guarda el estatus del genero ingresado por el usuario
      const estatusGeneroInput = this.#estatusGenero.value;

      try {
        //Verificación que si el genero ingresado por el usuario está vacío se muestre un mensaje de error
        if (generoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de género es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Verificación que si el estatus del genero ingresado por el usuario está vacío se muestre un mensaje de error
        if (estatusGeneroInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de género es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        // En caso de que el genero ingresado por el usuario no esté vacío y el estatus del genero ingresado por el usuario no esté vacío, se procede a realizar la edición del género 
        if (generoInput !== '' && estatusGeneroInput !== '0') {
          //Verificación que si el genero ingresado por el usuario tiene más de 25 caracteres se muestre un mensaje de error
          if (generoInput.length > 25) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de género no puede contener más de 25 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {

            //Variable que guarda el género editado por el usuario
            const genero = {
              id_genero: generoID,
              descripcion_genero: generoInput,
              estatus_general: estatusGeneroInput.toUpperCase()
            };

            const generoObtenido = await this.#api.getGeneroByID(generoID);
            //Verificación de que si el género obtenido es igual al género editado por el usuario, se muestre un mensaje de error
            if (generoObtenido.genero.descripcion_genero === genero.descripcion_genero && generoObtenido.genero.estatus_general === genero.estatus_general) {

              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en el género, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#genero.value = '';
              this.#estatusGenero.value = '0';
              this.#idSeleccion = null;

            } else {
              try {
                const response = await this.#api.putGenero(generoID, genero);

                if (response) {
                  this.#genero.value = '';
                  this.#estatusGenero.value = '0';
                  this.#idSeleccion = null;
                  this.mostrarGeneros();
                }
              } catch (error) {
                //Mensaje de error al editar un género en caso de error y que el servidor no responda, posteriormente se redirige a la página de inicio
                console.error('Error al editar el género:', error);
                const modal = document.querySelector('modal-warning')
                modal.setOnCloseCallback(() => {
                  if (modal.open === 'false') {
                    window.location = '/index.html'
                  }
                });
                modal.message = 'Error al editar el género, por favor intente de nuevo o verifique el status del servidor.'
                modal.title = 'Error al editar género'
                modal.open = true
              }
            }
          }
        }
      } catch (error) {
        console.error('Error al editar el género:', error);
      }
    }
  }

   //Función para mostrar los géneros
  mostrarGeneros = async () => {

    try {
      //Obtención de los géneros
      const generos = await this.#api.getGeneros();
      const generosTable = this.#generos;
      generosTable.innerHTML = '';
      const lista = generos.generos;
      //Función para recorrer la lista de géneros
      const funcion =
        lista.forEach(genero => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <tr id="genero-${genero.id_genero}">
            <td class="px-6 py-4 whitespace-nowrap">${genero.id_genero}</td>
            <td class="px-6 py-4 whitespace-nowrap">${genero.descripcion_genero}</td>
            <td class="px-6 py-4 whitespace-nowrap">${genero.estatus_general}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-genero" onclick="llamarActivarBotonSeleccionar(this.value)" value="${genero.id_genero}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
          generosTable.appendChild(row);
        });

    } catch (error) {
      console.error('Error al obtener los generos:', error);
      const modal = document.querySelector('modal-warning')
    //   modal.setOnCloseCallback(() => {
     //    if (modal.open === 'false') {
   //        window.location = '/index.html'
     //    }
     //  });
      modal.message = 'Error al obtener los géneros, por favor intente de nuevo o verifique el status del servidor.'
      modal.title = 'Error al obtener géneros'
      modal.open = true
    }

  }
  //Función para activar el botón de seleccionar , y que procede a rellenar los campos de género y estatus de género
  activarBotonSeleccionar = async generoId => {

    try {
      //Obtención del género por ID
      const generoID = await this.#api.getGeneroByID(generoId);
      if (generoID) {
        //Rellenar los campos de género y estatus de género
        this.#idSeleccion = generoID.genero.id_genero;
        this.#genero.value = generoID.genero.descripcion_genero;
        this.#estatusGenero.value = generoID.genero.estatus_general;
      } else {
        console.error('El genero con el ID proporcionado no existe.');
      }
    }
    catch (error) {
      console.error('Error al obtener el genero por ID:', error);
    }


  }
}

customElements.define('generos-tab', GenerosTab);
