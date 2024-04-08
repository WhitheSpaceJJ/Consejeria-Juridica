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
  #api
  #idSeleccion

  #juzgados
  #juzgado
  #estatusJuzgado

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
    this.#juzgados = this.shadowRoot.getElementById('table-juzgado');
    this.#juzgado = this.shadowRoot.getElementById('juzgado');
    this.#estatusJuzgado = this.shadowRoot.getElementById('estatus-juzgado');

    var juzgadoInput = this.#juzgado;

    juzgadoInput.addEventListener('input', function () {
      if (juzgadoInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de juzgado es obligatorio, no debe estar vacío.'
        modal.title = 'Error de validación'
        modal.open = true

      }
      else if (juzgadoInput.value.length > 50) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de juzgado no puede contener más de 50 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });


  }

  fillInputs() {
    this.mostrarJuzgados();
    this.agregarEventosBotones();
  }

  agregarEventosBotones = () => {

    const agregarJuzgadoBtn = this.shadowRoot.getElementById('agregar-juzgado');

    agregarJuzgadoBtn.addEventListener('click', this.agregarJuzgado);

    const editarJuzgadoBtn = this.shadowRoot.getElementById('editar-juzgado');
    editarJuzgadoBtn.addEventListener('click', this.editarJuzgado);

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-juzgado');
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const juzgadoId = boton.dataset.id;
        console.log(juzgadoId);
        this.#idSeleccion = juzgadoId;
        this.activarBotonSeleccionar(juzgadoId);
      });
    });

    const llamarActivarBotonSeleccionar = (juzgadoId) => {
      this.activarBotonSeleccionar(juzgadoId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  agregarJuzgado = async () => {
  
    const juzgadoID = this.#idSeleccion;

    if (juzgadoID === null) {
      const juzgadoInput = this.#juzgado.value;
      const estatusJuzgadoInput = this.#estatusJuzgado.value;

      try {
        if (juzgadoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusJuzgadoInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (juzgadoInput !== '' && estatusJuzgadoInput !== '0') {
          if (juzgadoInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de juzgado no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {

            const nuevoJuzgado = {
              nombre_juzgado: juzgadoInput,
              estatus_general: estatusJuzgadoInput.toUpperCase()
            };

            const response = await this.#api.postJuzgado(nuevoJuzgado);

            if (response) {
              this.#juzgado.value = '';
              this.#estatusJuzgado.value = '0';
              this.IdSeleccion = null;
              this.mostrarJuzgados();
            }
          }
        }
      } catch (error) {
        console.error('Error al agregar un nuevo juzgado:', error);
      }
    } else {
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

  editarJuzgado = async () => {

    const juzgadoID = this.#idSeleccion;
    if (this.#idSeleccion === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un juzgado para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {

      const juzgadoInput = this.#juzgado.value;
      const estatusJuzgadoInput = this.#estatusJuzgado.value;

      try {
        if (juzgadoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusJuzgadoInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de juzgado es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (juzgadoInput !== '' && estatusJuzgadoInput !== '0') {
          if (juzgadoInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de juzgado no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            const juzgado = {
              id_juzgado: juzgadoID,
              nombre_juzgado: juzgadoInput,
              estatus_general: estatusJuzgadoInput.toUpperCase()
            };


            const juzgadoObtenido = await this.#api.getJuzgadoByID(juzgadoID);

            if (juzgadoObtenido.nombre_juzgado === juzgado.nombre_juzgado && juzgadoObtenido.estatus_general === juzgado.estatus_general) {

              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en el juzgado, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#juzgado.value = '';
              this.#estatusJuzgado.value = '0';
              this.#idSeleccion = null;

            }
            else {

              const response = await this.#api.putJuzgado(juzgadoID, juzgado);

              if (response) {
                this.#juzgado.value = '';
                this.#estatusJuzgado.value = '0';
                this.#idSeleccion = null;
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

  mostrarJuzgados = async () => {
  
    try {
      const juzgados = await this.#api.getJuzgados();
      const tableBody = this.#juzgados;
      tableBody.innerHTML = '';
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

  activarBotonSeleccionar = async juzgadoId => {
 
    try {
      const juzgadoID = await this.#api.getJuzgadoByID(juzgadoId);
      if (juzgadoID) {
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
