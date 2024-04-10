import { ValidationError } from '../../lib/errors.js'
import { validateNonEmptyFields } from '../../lib/utils.js'
import { APIModel } from '../../models/api.model'
//import '../codigo-postal/codigo-postal.js'

const template = document.createElement('template')

const html = await (
  await fetch('./components/proceso/registro-tab.html')
).text()
template.innerHTML = html

export class RegistroTab extends HTMLElement {

  #api
  #defensor
  #defensores
  #idAsesoria
  #turnos
  #turnosTable
  #turno = null

  static get observedAttributes() {
    return ['id', 'data']
  }
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'registro'
    this.style.display = 'block'
    this.init()
  }


  async init() {
    this.#api = new APIModel()

    const { defensores } = await this.#api.getDefensores()
    const { turnos } = await this.#api.getTurnos()
    this.#defensores = defensores
    this.#turnos = turnos

    this.agregarEventosBotones()
    this.manageFormFields()
    this.fillInputs()

  }

  manageFormFields() {
    this.#turnosTable = this.shadowRoot.getElementById('table-turnos')
    this.#idAsesoria = this.shadowRoot.getElementById('asesoria-seleccionada')
    this.#defensor = this.shadowRoot.getElementById('defensor')
    this.#defensor.addEventListener('change', () => {
      if (this.#defensor.value === '0') {
        this.fillInputs()

      }
      else {
        this.fillTablleWithTurnosDefensor()
      }
    })


  }
  fillTablleWithTurnosDefensor = async () => {
    try {
      const { turnos } = await this.#api.getTurnosByDefensor(this.#defensor.value)
      if (turnos === undefined || turnos.length === 0) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'No hay turnos para el defensor seleccionado.'
        modal.title = 'Sin turnos'
        modal.open = true
        const { turnos } = await this.#api.getTurnos()
        this.#turnos = turnos
        this.fillTabla()
      }
      else {
        this.#turnos = turnos
        this.fillTabla()

      }
    } catch (error) {
      console.error('Error al obtener los turnos por defensor:', error.message)
    }
  }


  fillTabla() {
    try {
      const tableBody = this.#turnosTable;
      tableBody.innerHTML = '';
      const lista = this.#turnos;
      lista.forEach(turno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr id="turno-${turno.id_turno}">
            <td class="px-6 py-4 whitespace-nowrap">${turno.id_turno}</td>
            <td class="px-6 py-4 whitespace-nowrap">${turno.defensor.nombre_defensor}</td>
            <td class="px-6 py-4 whitespace-nowrap">${turno.fecha_turno}</td>
            <td class="px-6 py-4 whitespace-nowrap">${turno.hora_turno}</td>
            <td class="px-6 py-4 whitespace-nowrap">${turno.asesoria.datos_asesoria.estatus_asesoria}</td>
            <td class="px-6 py-4 whitespace-nowrap">${turno.asesoria.tipos_juicio.tipo_juicio}</td>
            <td class="px-6 py-4 whitespace-nowrap">${turno.estatus_general}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" title="Al seleccionar de nuevo un turno, el progreso se perdera" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-turno" onclick="llamarActivarBotonSeleccionar(this.value)" value="${turno.id_turno}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener los tipos de juicio:', error.message);
    }
  }

  fillInputs() {
    // Eliminar todos los hijos del elemento #defensor
    this.#defensor.innerHTML = '';

    // Agregar el primer hijo deseado
    const firstOption = document.createElement('option');
    firstOption.value = '0';
    firstOption.text = 'Selecciona un defensor';
    firstOption.disabled = true;
    firstOption.selected = true;
    this.#defensor.appendChild(firstOption);

    this.#defensores.forEach(defensor => {
      const option = document.createElement('option');
      option.value = defensor.id_defensor;
      option.text = defensor.nombre_defensor;
      this.#defensor.appendChild(option);
    });

    this.fillTabla();
  }


  agregarEventosBotones = () => {

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-turno');
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const turnoId = boton.dataset.id;
        this.#idAsesoria = turnoId;
        this.activarBotonSeleccionar(turnoId);
      });
    });

    const llamarActivarBotonSeleccionar = (turnoId) => {
      this.activarBotonSeleccionar(turnoId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  activarBotonSeleccionar = async turnoId => {
    try {
      const { turno } = await this.#api.getTurnoById(turnoId);
      if ( this.#turno !== null) {
         if(this.#turno.id_turno !== turno.id_turno){
          const modal = document.querySelector('modal-warning');
          modal.setOnCloseCallback(() => {
            if (modal.open === 'false') {
              if (modal.respuesta === true) {
                 this.#turno = turno;
                this.#idAsesoria.innerHTML = turno.asesoria.datos_asesoria.id_asesoria;
              } 
            }
          });
          modal.message = 'Ya has seleccionado un turno. Si eliges otro, se perderá el progreso actual.';
          modal.title = 'Advertencia';
          modal.open = 'true'
         }
       
      }
      else

        if (this.#turno  === null) {
          this.#turno = turno;
          this.#idAsesoria.innerHTML = turno.asesoria.datos_asesoria.id_asesoria;
        }


    } catch (error) {
      console.error('Error al obtener el turno por ID:', error);
    }
  }





  validateInputs() {

    try {

      if (this.#turno === undefined || this.#turno === null) {
        throw new ValidationError('Selecciona un turno para continuar.')
      }


      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        this.#showModal(error.message, 'Error de validación')
      } else {
        console.error(error)
        this.#showModal(
          'Error al seleccionar el turno, por favor intenta de nuevo',
          'Error'
        )
      } return false
    }
  }



  connectedCallback() {
    this.btnNext = this.shadowRoot.getElementById('btn-registro-next')


    this.btnNext.addEventListener('click', () => {
      if (!this.validateInputs()) return
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'promovente' },
      })
      this.dispatchEvent(event)
    })
  }

  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

  get id() {
    return this.getAttribute('id')
  }

  set id(value) {
    this.setAttribute('id', value)
  }

  get isComplete() {
    return this.validateInputs()
  }

  get turno() {
    return this.#turno
  }
  get data() {

    const turno = this.#turno
    return {
      turno
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('registro-full-tab', RegistroTab)
