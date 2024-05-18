//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/catalogos-tab.html')
).text()
template.innerHTML = html

class CatalogosTab extends HTMLElement {
  //IdSeleccion es una variable privada que se utiliza para almacenar el id del catalogo seleccionado
  #idSeleccion
  //Variables privadas de la clase 
  #api
  #catalogo
  #estatusCatalogo
  #catalogos

  //Constructor de la clase
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Llamada a la función init
    this.init();
  }

  //Función init que se encarga de inicializar las variables de la clase y de llamar a las funciones que se encargan de llenar los campos del formulario
  async init() {
    //Creación de una instancia de la clase APIModel
    this.#api = new APIModel();
    //Inicialización de las variables
    this.#idSeleccion = null;
    //Llamada a la función manageFormFields
    this.manageFormFields();
    //Llamada a la función manejadorEventos
    this.manejadorEventos();
    //Llamada a la función fillInputs
    this.fillInputs();
  }

  //Función manageFormFields que se encarga de inicializar las variables de la clase
  manageFormFields() {
    this.#catalogo = this.shadowRoot.getElementById('catalogo');
    this.#estatusCatalogo = this.shadowRoot.getElementById('estatus-catalogo');
    this.#catalogos = this.shadowRoot.getElementById('table-catalogo');
  }

  //Función manejadorEventos que se encarga de manejar los eventos de los campos del formulario
  manejadorEventos() {
    var catalogoInput = this.#catalogo;
    catalogoInput.addEventListener('input', function () {
      if (catalogoInput.value !== '') {
        if (catalogoInput.value.length > 75) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de catalogo no puede contener más de 75 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        }
      }

    });
  }
  //Función fillInputs que se encarga de llenar los campos del formulario, agregar eventos a los botones y mostrar los catalogos
  fillInputs() {
    this.agregarEventosBotones();
    this.mostrarCatalogos();
  }

  //Función agregarEventosBotones que se encarga de agregar eventos a los botones del formulario
  agregarEventosBotones = () => {
    //Obtención del botón de agregar catalogo
    const agregarCatalogoBtn = this.shadowRoot.getElementById('agregar-catalogo');
    //Evento de clic para agregar un catalogo
    agregarCatalogoBtn.addEventListener('click', this.agregarCatalogo);
    //Obtención del botón de editar catalogo
    const editarCatalogoBtn = this.shadowRoot.getElementById('editar-catalogo');
    //Evento de clic para editar un catalogo
    editarCatalogoBtn.addEventListener('click', this.editarCatalogo);

    //Obtención de los botones de seleccionar catalogo los cuales estan relacionados con la tabla creada y los elementos de la misma la funcion de mostrarCatalogos
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-catalogo');
    //Iteración de los botones de seleccionar catalogo para agregar un evento de clic a cada uno
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const catalogoId = boton.value;
        console.log(catalogoId);
        this.#idSeleccion = catalogoId;
        //Llamada a la función activarBotonSeleccionar
        this.activarBotonSeleccionar(catalogoId);
      });
    });


    //Función llamarActivarBotonSeleccionar que se encarga de llamar a la función activarBotonSeleccionar, que se encarga de activar el botón de seleccionar el cual rellena los campos del formulario
    const llamarActivarBotonSeleccionar = (catalogoId) => {
      //Llamada a la función activarBotonSeleccionar
      this.activarBotonSeleccionar(catalogoId);
    };

    //Asignación de la función llamarActivarBotonSeleccionar a la variable global window
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  //Función agregarCatalogo que se encarga de agregar un catalogo
  agregarCatalogo = async () => {
    //Como se menciono idSeleccion es una variable privada que se utiliza para almacenar el id del catalogo seleccionado y asi verificar si se puede agregar un nuevo catalogo
    const catalogoID = this.#idSeleccion;
    if (catalogoID === null) {
      //Obtención del valor del campo de catalogo
      const catalogoInput = this.#catalogo.value;
      const estatusCatalogoInput = this.#estatusCatalogo.value;
      try {
        //Validación de los campos del formulario en este caso el campo de catalogo y el campo de estatus de catalogo
        //Mensaje de error si el campo de catalogo esta vacio
        if (catalogoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de catalogo es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        //Mensaje de error si el campo de estatus de catalogo esta vacio
        if (estatusCatalogoInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de catalogo es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        //En caso de que los campos no esten vacios se procede a agregar un nuevo catalogo pero antes se valida que el campo de catalogo no tenga más de 75 caracteres
        if (catalogoInput !== '' && estatusCatalogoInput !== '0') {
          //Mensaje de error si el campo de catalogo tiene más de 75 caracteres
          if (catalogoInput.length > 75) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de catalogo no puede contener más de 75 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {
            //Creación de un nuevo catalogo con los datos ingresados en el formulario
            const nuevoCatalogo = {
              descripcion_catalogo: catalogoInput,
              estatus_general: estatusCatalogoInput.toUpperCase()
            };

            try {
              //Llamada a la función postCatalogos de la clase APIModel para agregar un nuevo catalogo
              const response = await this.#api.postCatalogos(nuevoCatalogo);
              //En caso de que se haya agregado un nuevo catalogo se limpian los campos del formulario y se muestran los catalogos
              if (response) {
                this.#catalogo.value = '';
                this.#estatusCatalogo.value = '0';
                this.#idSeleccion = null;
                this.mostrarCatalogos();
              }
            } catch (error) {
              //Se muestra un mensaje de error en caso de que no se haya podido agregar un nuevo catalogo y redirige a la página principal
              console.error('Error al agregar un nuevo catalogo:', error);
              const modal = document.querySelector('modal-warning')
              modal.setOnCloseCallback(() => {
                if (modal.open === 'false') {
                  window.location = '/index.html'
                }
              });
              modal.message = 'Error al agregar un nuevo catalogo, intente nuevamente o verifique el estatus del servidor.'
              modal.title = 'Error de validación'
              modal.open = true
            }
          }
        }

      } catch (error) {
        console.error('Error al agregar un nuevo catalogo:', error);
      }
    } else {
      //Mensaje de error si ya se ha seleccionado un catalogo
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un nuevo catalogo si ya se ha seleccionado uno, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#catalogo.value = '';
      this.#estatusCatalogo.value = '0';
      this.#idSeleccion = null;
      this.mostrarCatalogos();
    }
  }

  //Función editarCatalogo que se encarga de editar un catalogo
  editarCatalogo = async () => {
    //Obtención del id del catalogo seleccionado para poder editarlo, idSeleccion es una variable privada que se utiliza para almacenar el id del catalogo seleccionado y en este caso se utiliza para verificar si se puede editar un catalogo
    const catalogoID = this.#idSeleccion;
    //Mensaje de error si no se ha seleccionado un catalogo
    if (catalogoID === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un catalogo para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Obtención del valor del campo de catalogo
      const catalogoInput = this.#catalogo.value;
      const estatusCatalogoInput = this.#estatusCatalogo.value;

      try {
        //Validación de los campos del formulario en este caso el campo de catalogo y el campo de estatus de catalogo
        //Mensaje de error si el campo de catalogo esta vacio
        if (catalogoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de catalogo es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Mensaje de error si el campo de estatus de catalogo esta vacio
        if (estatusCatalogoInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de catalogo es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos no esten vacios se procede a editar el catalogo seleccionado pero antes se valida que el campo de catalogo no tenga más de 75 caracteres
        if (catalogoInput !== '' && estatusCatalogoInput !== '0') {
          //Mensaje de error si el campo de catalogo tiene más de 75 caracteres
          if (catalogoInput.length > 75) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de catalogo no puede contener más de 75 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            //Creación de un nuevo catalogo con los datos ingresados en el formulario
            const catalogo = {
              id_catalogo: catalogoID,
              descripcion_catalogo: catalogoInput,
              estatus_general: estatusCatalogoInput.toUpperCase()
            };


            try {
              const catalogoObtenido = await this.#api.getCatalogosByID(catalogoID);
              if (catalogoObtenido.requisitoCatalogo.descripcion_catalogo === catalogo.descripcion_catalogo && catalogoObtenido.requisitoCatalogo.estatus_general === catalogo.estatus_general) {
                const modal = document.querySelector('modal-warning')
                modal.message = 'No se han realizado cambios en el catalogo, ya que los datos son iguales a los actuales, se eliminaran los campos.'
                modal.title = 'Error de validación'
                modal.open = true
                this.#catalogo.value = '';
                this.#estatusCatalogo.value = '0';
                this.#idSeleccion = null;
              }
              else {
                const response = await this.#api.putCatalogos(catalogoID, catalogo);
                if (response) {
                  this.#catalogo.value = '';
                  this.#estatusCatalogo.value = '0';
                  this.#idSeleccion = null;
                  this.mostrarCatalogos();
                }

              }
            } catch (error) {
              //Se muestra un mensaje de error en caso de que no se haya podido editar el catalogo y redirige a la página principal
              console.error('Error al editar el catalogo:', error);
              const modal = document.querySelector('modal-warning')
              modal.setOnCloseCallback(() => {
                if (modal.open === 'false') {
                  window.location = '/index.html'
                }
              });
              modal.message = 'Error al editar el catalogo, intente nuevamente o verifique el estatus del servidor.'
              modal.title = 'Error de validación'
              modal.open = true
            }

          }
        }
      } catch (error) {
        console.error('Error al editar el catalogo:', error);

      }
    }


  }

  //Función mostrarCatalogos que se encarga de mostrar los catalogos en una tabla
  mostrarCatalogos = async () => {
    try {

      const catalogos = await this.#api.getCatalogos();
      const tableBody = this.#catalogos;
      tableBody.innerHTML = '';
      const lista = catalogos.requisitosCatalogo;
      //Iteración de los catalogos para mostrarlos en la tabla
      const funcion =
        lista.forEach(catalogo => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <tr id="catalogo-${catalogo.id_catalogo}">
              <td class="px-6 py-4 whitespace-nowrap">${catalogo.id_catalogo}</td>
              <td class="px-6 py-4 whitespace-nowrap">${catalogo.descripcion_catalogo}</td>
              <td class="px-6 py-4 whitespace-nowrap">${catalogo.estatus_general}</td>
              <td class="px-6 py-4 whitespace-nowrap">
              <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-catalogo" onclick="llamarActivarBotonSeleccionar(this.value)" value="${catalogo.id_catalogo}">
              Seleccionar
            </button>          
              </td>
          </tr>
              `;
          tableBody.appendChild(row);
        });
    } catch (error) {
      //Se muestra un mensaje de error en caso de que no se hayan podido obtener los catalogos y redirige a la página principal
      console.error('Error al obtener los catalogos:', error);
      const modal = document.querySelector('modal-warning')
      //    modal.setOnCloseCallback(() => {
      //      if (modal.open === 'false') {
      //       window.location = '/index.html'
      //      }
      //   });
      modal.message = 'Error al obtener los catalogos, intente nuevamente o verifique el estatus del servidor.'
      modal.title = 'Error de validación'
      modal.open = true
    }

  }

  //Función activarBotonSeleccionar que se encarga de activar el botón de seleccionar el cual rellena los campos del formulario
  activarBotonSeleccionar = async catalogoId => {
    try {
      //Llamada a la función getCatalogosByID de la clase APIModel para obtener un catalogo por ID
      const catalogoID = await this.#api.getCatalogosByID(catalogoId);
      console.log(catalogoID);
      //En caso de que el catalogo exista se rellenan los campos del formulario con los datos del catalogo seleccionado
      if (catalogoID) {
        this.#idSeleccion = catalogoID.requisitoCatalogo.id_catalogo;
        this.#catalogo.value = catalogoID.requisitoCatalogo.descripcion_catalogo;
        this.#estatusCatalogo.value = catalogoID.requisitoCatalogo.estatus_general;
      } else {
        console.error('El catalogo con el ID proporcionado no existe.');
      }
    } catch (error) {
      //Se muestra un mensaje de error en caso de que no se haya podido obtener el catalogo por ID y redirige a la página principal
      console.error('Error al obtener el catalogo por ID:', error);
      const modal = document.querySelector('modal-warning')
      modal.setOnCloseCallback(() => {
        if (modal.open === 'false') {
          window.location = '/index.html'
        }
      });
      modal.message = 'Error al obtener el catalogo por ID, intente nuevamente o verifique el estatus del servidor.'
      modal.title = 'Error de validación'
      modal.open = true
    }

  }
}

customElements.define('catalogo-tab', CatalogosTab);
