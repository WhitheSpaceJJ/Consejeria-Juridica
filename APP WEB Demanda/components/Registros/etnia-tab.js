//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/etnia-tab.html')
).text()
template.innerHTML = html

class EtniaTab extends HTMLElement {
  #api
  #idSeleccion

  #etnias
  #etnia
  #estatusEtnia

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
    this.#etnias = this.shadowRoot.getElementById('table-etnia');
    this.#etnia = this.shadowRoot.getElementById('etnia');
    this.#estatusEtnia = this.shadowRoot.getElementById('estatus-etnia');

    var etniaInput = this.#etnia;

    etniaInput.addEventListener('input', function () {
      if (etniaInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de etnia es obligatorio, no debe estar vacío.'
        modal.title = 'Error de validación'
        modal.open = true

      }
      else if (etniaInput.value.length > 50) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de etnia no puede contener más de 50 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });
  }
  fillInputs() {
    this.mostrarEtnias();
    this.agregarEventosBotones();
  }

  agregarEventosBotones = () => {
    /**
     
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
     */

    const agregarEtniaBtn = this.shadowRoot.getElementById('agregar-etnia');

    agregarEtniaBtn.addEventListener('click', this.agregarEtnia);

    const editarEtniaBtn = this.shadowRoot.getElementById('editar-etnia');
    editarEtniaBtn.addEventListener('click', this.editarEtnia);

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-etnia');
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const etniaId = boton.value;
        console.log(etniaId);
        this.#idSeleccion = etniaId;
        this.activarBotonSeleccionar(etniaId);
      });
    });

    const llamarActivarBotonSeleccionar = (etniaId) => {
      this.activarBotonSeleccionar(etniaId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;

  }
  agregarEtnia = async () => {
    /**
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
      {
      "id_etnia": 1,
      "nombre": "Yaqui",
      "estatus_general": "ACTIVO"
  }
    */

    const etniaID = this.#idSeleccion;

    if (etniaID === null) {
      const etniaInput = this.#etnia.value;
      const estatusEtniaInput = this.#estatusEtnia.value;

      try {
        if (etniaInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de etnia es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusEtniaInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de etnia es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (etniaInput !== '' && estatusEtniaInput !== '0') {
          if (etniaInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de etnia no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          }
          else {

            const nuevaEtnia = {
              nombre: etniaInput,
              estatus_general: estatusEtniaInput.toUpperCase()
            };

            const response = await this.#api.postEtnia(nuevaEtnia);

            if (response) {
              this.#etnia.value = '';
              this.#estatusEtnia.value = '0';
              this.IdSeleccion = null;
              this.mostrarEtnias();
            }
          }
        }
      } catch (error) {
        console.error('Error al agregar una nueva etnia:', error);
      }
    } else {
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una nueva etnia si ya se ha seleccionado una, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#etnia.value = '';
      this.#estatusEtnia.value = '0';
      this.#idSeleccion = null;
      this.mostrarEtnias();
    }
  }
  editarEtnia = async () => {
 
    const etniaID = this.#idSeleccion;
    if (this.#idSeleccion === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar una etnia para poder editarla.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {

      const etniaInput = this.#etnia.value;
      const estatusEtniaInput = this.#estatusEtnia.value;

      try {
        if (etniaInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de etnia es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (estatusEtniaInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de etnia es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        if (etniaInput !== '' && estatusEtniaInput !== '0') {
          if (etniaInput.length > 50) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de etnia no puede contener más de 50 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else {
            const etnia = {
              id_etnia: etniaID,
              nombre: etniaInput,
              estatus_general: estatusEtniaInput.toUpperCase()
            };


            const etniaObtenida = await this.#api.getEtniaByID(etniaID);

            if (etniaObtenida.nombre === etnia.nombre && etniaObtenida.estatus_general === etnia.estatus_general) {

              const modal = document.querySelector('modal-warning')
              modal.message = 'No se han realizado cambios en la etnia, ya que los datos son iguales a los actuales, se eliminaran los campos.'
              modal.title = 'Error de validación'
              modal.open = true
              this.#etnia.value = '';
              this.#estatusEtnia.value = '0';
              this.#idSeleccion = null;

            }
            else {

              const response = await this.#api.putEtnia(etniaID, etnia);

              if (response) {
                this.#etnia.value = '';
                this.#estatusEtnia.value = '0';
                this.#idSeleccion = null;
                this.mostrarEtnias();
              }

            }

          }

        }

      } catch (error) {
        console.error('Error al editar la etnia:', error);
      }
    }

  }
  mostrarEtnias = async () => {

    try {
      const etnias = await this.#api.getEtnias();
      const tableBody = this.#etnias;
      tableBody.innerHTML = '';
      const lista = etnias;
      const funcion =
        lista.forEach(etnia => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <tr id="etnia-${etnia.id_etnia}">
            <td class="px-6 py-4 whitespace-nowrap">${etnia.id_etnia}</td>
            <td class="px-6 py-4 whitespace-nowrap">${etnia.nombre}</td>
            <td class="px-6 py-4 whitespace-nowrap">${etnia.estatus_general}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-etnia" onclick="llamarActivarBotonSeleccionar(this.value)" value="${etnia.id_etnia}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
          tableBody.appendChild(row);
        });
    } catch (error) {
      console.error('Error al obtener las etnias:', error);
    }
  }
  activarBotonSeleccionar = async etniaId => {

    try {
      const etniaID = await this.#api.getEtniaByID(etniaId);
      if (etniaID) {
        this.#idSeleccion = etniaID.id_etnia;
        this.#etnia.value = etniaID.nombre;
        this.#estatusEtnia.value = etniaID.estatus_general;
      } else {
        console.error('La etnia con el ID proporcionado no existe.');
      }
    } catch (error) {
      console.error('Error al obtener la etnia por ID:', error);
    }
  }
}

customElements.define('etnia-tab', EtniaTab);
