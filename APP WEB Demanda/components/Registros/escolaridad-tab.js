//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/escolaridad-tab.html')
).text()
template.innerHTML = html

class EscolaridadTab extends HTMLElement {
  #api
  #idSeleccion

  #escolaridades
  #escolaridad
  #estatusEscolaridad

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.init();
  }

  async init() {
    this.#api = new APIModel();
    this.#idSeleccion = null;

    this.manageFormFields();
    this.fillInputs();

  }
  manageFormFields() {
    this.#escolaridades = this.shadowRoot.getElementById('table-escolaridad');
    this.#escolaridad = this.shadowRoot.getElementById('escolaridad');
    this.#estatusEscolaridad = this.shadowRoot.getElementById('estatus-escolaridad');

    var escolaridadInput = this.#escolaridad;

    escolaridadInput.addEventListener('input', function () {
      if (escolaridadInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de escolaridad es obligatorio, no debe estar vacío.'
        modal.title = 'Error de validación'
        modal.open = true

      }
      else if (escolaridadInput.value.length > 50) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de escolaridad no puede contener más de 50 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });
  }
  fillInputs() {
    this.mostrarEscolaridades();
    this.agregarEventosBotones();
  }

  agregarEventosBotones = () => {


    const agregarEscolaridadBtn = this.shadowRoot.getElementById('agregar-escolaridad');

    agregarEscolaridadBtn.addEventListener('click', this.agregarEscolaridad);

    const editarEscolaridadBtn = this.shadowRoot.getElementById('editar-escolaridad');
    editarEscolaridadBtn.addEventListener('click', this.editarEscolaridad);

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-escolaridad');
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const escolaridadId = boton.dataset.id;
        console.log(escolaridadId);
        this.#idSeleccion = escolaridadId;
        this.activarBotonSeleccionar(escolaridadId);
      });
    });

    const llamarActivarBotonSeleccionar = (escolaridadId) => {
      this.activarBotonSeleccionar(escolaridadId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;

  }
  agregarEscolaridad = async () => {
  

    const escolaridadID = this.#idSeleccion;
     
    if (escolaridadID === null) {
      const escolaridadInput = this.#escolaridad.value;
      const estatusEscolaridadInput = this.#estatusEscolaridad.value;

      try {
        if (escolaridadInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusEscolaridadInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (escolaridadInput !== '' && estatusEscolaridadInput !== '0') {
          if (escolaridadInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de escolaridad no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {

            const nuevaEscolaridad = {
              descripcion: escolaridadInput,
              estatus_general: estatusEscolaridadInput.toUpperCase()
            };

            const response = await this.#api.postEscolaridad(nuevaEscolaridad);

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
  editarEscolaridad = async () => {
  
    const escolaridadID = this.#idSeleccion;
    if (this.#idSeleccion === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un escolaridad para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {

      const escolaridadInput = this.#escolaridad.value;
      const estatusEscolaridadInput = this.#estatusEscolaridad.value;

      try {
        if (escolaridadInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusEscolaridadInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de escolaridad es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (escolaridadInput !== '' && estatusEscolaridadInput !== '0') {
          if (escolaridadInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de escolaridad no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            const escolaridad = {
              id_escolaridad: escolaridadID,
              descripcion: escolaridadInput,
              estatus_general: estatusEscolaridadInput.toUpperCase()
            };


            const escolaridadObtenida = await this.#api.getEscolaridadByID(escolaridadID);

            if (escolaridadObtenida.descripcion === escolaridad.descripcion && escolaridadObtenida.estatus_general === escolaridad.estatus_general) {

              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en la escolaridad, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#escolaridad.value = '';
              this.#estatusEscolaridad.value = '0';
              this.#idSeleccion = null;

            }
            else {

              const response = await this.#api.putEscolaridad(escolaridadID, escolaridad);

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
  mostrarEscolaridades = async () => {
 
    try {
      const escolaridades = await this.#api.getEscolaridades();
      const tableBody = this.#escolaridades;
      tableBody.innerHTML = '';
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
  activarBotonSeleccionar = async escolaridadId => {
    
    try {
      const escolaridadID = await this.#api.getEscolaridadByID(escolaridadId);
      if (escolaridadID) {
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
