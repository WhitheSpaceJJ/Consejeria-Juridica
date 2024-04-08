//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/ocupacion-tab.html')
).text()
template.innerHTML = html
class OcupacionTab extends HTMLElement {
  #api
  #idSeleccion

  #ocupaciones
  #ocupacion
  #estatusOcupacion
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
    this.#ocupaciones = this.shadowRoot.getElementById('table-ocupacion');
    this.#ocupacion = this.shadowRoot.getElementById('ocupacion');
    this.#estatusOcupacion = this.shadowRoot.getElementById('estatus-ocupacion');

    var ocupacionInput = this.#ocupacion;

    ocupacionInput.addEventListener('input', function () {
      if (ocupacionInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de ocupación es obligatorio, no debe estar vacío.'
        modal.title = 'Error de validación'
        modal.open = true

      }
      else if (ocupacionInput.value.length > 50) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de ocupación no puede contener más de 50 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });
  }
  fillInputs() {
    this.mostrarOcupaciones();
    this.agregarEventosBotones();
  }

  agregarEventosBotones = () => {


    const agregarOcupacionBtn = this.shadowRoot.getElementById('agregar-ocupacion');

    agregarOcupacionBtn.addEventListener('click', this.agregarOcupacion);

    const editarOcupacionBtn = this.shadowRoot.getElementById('editar-ocupacion');
    editarOcupacionBtn.addEventListener('click', this.editarOcupacion);

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-ocupacion');
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const ocupacionId = boton.dataset.id;
        console.log(ocupacionId);
        this.#idSeleccion = ocupacionId;
        this.activarBotonSeleccionar(ocupacionId);
      });
    });

    const llamarActivarBotonSeleccionar = (ocupacionId) => {
      this.activarBotonSeleccionar(ocupacionId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }
  agregarOcupacion = async () => {

      const ocupacionId = this.#idSeleccion;

      if (ocupacionId === null) {
        const ocupacionInput = this.#ocupacion.value;
        const estatusOcupacionInput = this.#estatusOcupacion.value;
        try {
          if (ocupacionInput === '') {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de ocupación es obligatorio.'
            modal.title = 'Error de validación'
            modal.open = true
          }

          if (estatusOcupacionInput === '0') {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de estatus de ocupación es obligatorio.'
            modal.title = 'Error de validación'
            modal.open = true
          }

          if (ocupacionInput !== '' && estatusOcupacionInput !== '0') {
            if (ocupacionInput.length > 50) {
              const modal = document.querySelector('modal-warning')
              modal.message = 'El campo de ocupación no puede contener más de 50 caracteres.'
              modal.title = 'Error de validación'
              modal.open = true
            }
            else {

              const nuevaOcupacion = {
                descripcion_ocupacion: ocupacionInput,
                estatus_general: estatusOcupacionInput.toUpperCase()
              };

              const response = await this.#api.postOcupacion(nuevaOcupacion);

              if (response) {
                this.#ocupacion.value = '';
                this.#estatusOcupacion.value = '0';
                this.#idSeleccion = null;
                this.mostrarOcupaciones();
              }
            }
          }
        } catch (error) {
          console.error('Error al agregar una nueva ocupación:', error);
        }
      }
      else {
        const modal = document.querySelector('modal-warning')
        modal.message = 'No se puede agregar una nueva ocupación si ya se ha seleccionado una, se eliminaran los campos.'
        modal.title = 'Error de validación'
        modal.open = true
        this.#ocupacion.value = '';
        this.#estatusOcupacion.value = '0';
        this.#idSeleccion = null;
        this.mostrarOcupaciones();
      }
  }
  editarOcupacion = async () => {

    const ocupacionID = this.#idSeleccion;

    if (this.#idSeleccion === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar una ocupación para poder editarla.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {

      const ocupacionInput = this.#ocupacion.value;
      const estatusOcupacionInput = this.#estatusOcupacion.value;

      try {
        if (ocupacionInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de ocupación es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusOcupacionInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de ocupación es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (ocupacionInput !== '' && estatusOcupacionInput !== '0') {
          if (ocupacionInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de ocupación no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            const ocupacion = {
              id_ocupacion: ocupacionID,
              descripcion_ocupacion: ocupacionInput,
              estatus_general: estatusOcupacionInput.toUpperCase()
            };


            const ocupacionObtenida = await this.#api.getOcupacionByID(ocupacionID);

            if (ocupacionObtenida.descripcion_ocupacion === ocupacion.descripcion_ocupacion && ocupacionObtenida.estatus_general === ocupacion.estatus_general) {

              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en la ocupación, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#ocupacion.value = '';
              this.#estatusOcupacion.value = '0';
              this.#idSeleccion = null;

            }
            else {

              const response = await this.#api.putOcupacion(ocupacionID, ocupacion);

              if (response) {
                this.#ocupacion.value = '';
                this.#estatusOcupacion.value = '0';
                this.#idSeleccion = null;
                this.mostrarOcupaciones();
              }

            }



          }


        }

      } catch (error) {
        console.error('Error al editar la ocupación:', error);
      }

    }
  }
  mostrarOcupaciones = async () => {

    try {
      const ocupaciones = await this.#api.getOcupaciones();
      const tableBody = this.#ocupaciones;
      tableBody.innerHTML = '';
      const lista = ocupaciones;
      const funcion =
        lista.forEach(ocupacion => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <tr id="ocupacion-${ocupacion.id_ocupacion}">
            <td class="px-6 py-4 whitespace-nowrap">${ocupacion.id_ocupacion}</td>
            <td class="px-6 py-4 whitespace-nowrap">${ocupacion.descripcion_ocupacion}</td>
            <td class="px-6 py-4 whitespace-nowrap">${ocupacion.estatus_general}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-ocupacion" onclick="llamarActivarBotonSeleccionar(this.value)" value="${ocupacion.id_ocupacion}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
          tableBody.appendChild(row);
        });
    } catch (error) {
      console.error('Error al obtener las ocupaciones:', error);
    }
  }
  activarBotonSeleccionar = async ocupacionId => {

    try {
      const ocupacionID = await this.#api.getOcupacionByID(ocupacionId);
      if (ocupacionID) {
        this.#idSeleccion = ocupacionID.id_ocupacion;
        this.#ocupacion.value = ocupacionID.descripcion_ocupacion;
        this.#estatusOcupacion.value = ocupacionID.estatus_general;
      } else {
        console.error('La ocupación con el ID proporcionado no existe.');
      }
    } catch (error) {
      console.error('Error al obtener la ocupación por ID:', error);
    }
  }
}

customElements.define('ocupacion-tab', OcupacionTab);
