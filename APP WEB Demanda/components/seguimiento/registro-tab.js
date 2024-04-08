import { ValidationError } from '../../lib/errors.js'
import { validateNonEmptyFields } from '../../lib/utils.js'
import { APIModel } from '../../models/api.model'
//import '../codigo-postal/codigo-postal.js'

const template = document.createElement('template')

const html = await (
  await fetch('./components/seguimiento/registro-tab.html')
).text()
template.innerHTML = html

export class RegistroTab extends HTMLElement {

  #api
  #defensor
  #defensores
  #idAsesoria
  #turnos
  #turnosTable
  #turno

  #procesosTable
  #procesos
  #idProceso
  #proceso
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
    const procesos = await this.#api.getProcesosJudiciales()
    this.#defensores = defensores
    this.#procesos = procesos
    //this.#turnos = turnos

    this.agregarEventosBotones()
    this.manageFormFields()
    this.fillInputs()

  }

  manageFormFields() {
    this.#procesosTable = this.shadowRoot.getElementById('table-procesos')
    // this.#idAsesoria = this.shadowRoot.getElementById('asesoria-seleccionada')
    this.#defensor = this.shadowRoot.getElementById('defensor')
    this.#idProceso = this.shadowRoot.getElementById('proceso-seleccionado')
    this.#defensor.addEventListener('change', () => {
      if (this.#defensor.value === '0') {
        this.fillInputs()

      }
      else {
        this.fillTablleWithProcesosDefensor()
      }
    })


  }
  fillTablleWithProcesosDefensor = async () => {
    try {
      const procesos = await this.#api.getProcesosJudicialesByDefensor(Number(this.#defensor.value), "EN_TRAMITE")
      if (procesos === undefined || procesos.length === 0) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'No hay procesos para el defensor seleccionado.'
        modal.title = 'Sin procesos'
        modal.open = true
        const procesos = await this.#api.getProcesosJudiciales()
        this.#procesos = procesos
        this.fillTabla()
      }
      else {
        this.fillTabla()
      }
    } catch (error) {
      console.error('Error al obtener los turnos por defensor:', error.message)
    }
  }


  fillTabla() {
    try {
      const tableBody = this.#procesosTable;
      tableBody.innerHTML = '';
      const lista = this.#procesos;
      lista.forEach(proceso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr id="proceso-${proceso.id_proceso_judicial}">
            <td class="px-6 py-4 whitespace-nowrap">${proceso.id_proceso_judicial}</td>
            <td class="px-6 py-4 whitespace-nowrap">${proceso.fecha_inicio}</td>
            <td class="px-6 py-4 whitespace-nowrap">${proceso.control_interno}</td>
            <td class="px-6 py-4 whitespace-nowrap">${proceso.numero_expediente}</td>
            <td class="px-6 py-4 whitespace-nowrap">${proceso.fecha_estatus === null ? '' : proceso.fecha_estatus}</td>
            <td class="px-6 py-4 whitespace-nowrap">${proceso.estatus_proceso}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-proceso" onclick="llamarActivarBotonSeleccionar(this.value)" value="${proceso.id_proceso_judicial}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener los procesos:', error.message);
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
        const procesoId = boton.dataset.id;
        this.#idProceso = procesoId;
        this.activarBotonSeleccionar(procesoId);
      });
    });

    const llamarActivarBotonSeleccionar = (procesoId) => {
      this.activarBotonSeleccionar(procesoId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  activarBotonSeleccionar = async procesoId => {
    try {
      const proceso = await this.#api.getProcesoJudicialById(procesoId);
      this.#proceso = proceso;
      this.#idProceso.innerHTML = proceso.id_proceso_judicial;
    } catch (error) {
      console.error('Error al obtener el turno por ID:', error);
    }
  }


  validateInputs() {

    try {

      if (this.#proceso === undefined || this.#proceso === null) {
        throw new ValidationError('Selecciona un proceso para continuar.')
      }


      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        this.#showModal(error.message, 'Error de validación')
      } else {
        console.error(error)
        this.#showModal(
          'Error al seleccionar el proceso, por favor intenta de nuevo',
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

  get data() {
    /**
     {
       "id_proceso_judicial": 1,
       "fecha_inicio": "2024-04-08",
       "fecha_estatus": null,
       "control_interno": "cccccddddd",
       "numero_expediente": "aaaaabbbbb",
       "id_turno": 2,
       "id_distrito_judicial": 1,
       "id_municipio_distrito": 60,
       "id_tipo_juicio": 10,
       "id_defensor": 13,
       "estatus_proceso": "EN_TRAMITE",
       "id_juzgado": 1,
       "participantes": [
           {
               "id_participante": 1,
               "nombre": "Juan",
               "apellido_paterno": "Pérez",
               "apellido_materno": "García",
               "edad": 25,
               "telefono": "644123456",
               "id_genero": 2,
               "id_proceso_judicial": 1,
               "promovente": {
                   "id_promovente": 1,
                   "español": true,
                   "etnia": {
                       "id_etnia": 1,
                       "nombre": "Yaqui",
                       "estatus_general": "ACTIVO"
                   },
                   "escolaridad": {
                       "id_escolaridad": 1,
                       "descripcion": "BASICA",
                       "estatus_general": "ACTIVO"
                   },
                   "ocupacion": {
                       "id_ocupacion": 1,
                       "descripcion_ocupacion": "Albañil",
                       "estatus_general": "ACTIVO"
                   },
                   "familiares": [
                       {
                           "id_familiar": 1,
                           "nombre": "Julia Antonieta",
                           "nacionalidad": "Mexicana",
                           "parentesco": "Madre",
                           "perteneceComunidadLGBT": true,
                           "adultaMayor": true,
                           "saludPrecaria": true,
                           "pobrezaExtrema": true,
                           "id_promovente": 1
                       }
                   ]
               },
               "imputado": null,
               "domicilio": {
                   "id_domicilio": 1,
                   "calle_domicilio": "Argentina",
                   "numero_exterior_domicilio": "279",
                   "numero_interior_domicilio": "",
                   "id_colonia": 21225,
                   "id_participante": 1
               }
           },
           {
               "id_participante": 2,
               "nombre": "Judith",
               "apellido_paterno": "Orozco",
               "apellido_materno": "Hernandez",
               "edad": 45,
               "telefono": "4354534545",
               "id_genero": 1,
               "id_proceso_judicial": 1,
               "imputado": {
                   "id_imputado": 2
               },
               "domicilio": {
                   "id_domicilio": 2,
                   "calle_domicilio": "Alberto Vargas",
                   "numero_exterior_domicilio": "2909",
                   "numero_interior_domicilio": "",
                   "id_colonia": 107729,
                   "id_participante": 2
               }
           }
       ],
       "juzgado": {
           "id_juzgado": 1,
           "nombre_juzgado": "Juzgado 1",
           "estatus_general": "ACTIVO"
       },
       "estados_procesales": [
           {
               "id_estado_procesal": 1,
               "descripcion_estado_procesal": "Prueba 1",
               "fecha_estado_procesal": "2024-04-07",
               "id_proceso_judicial": 1
           }
       ],
       "observaciones": [
           {
               "id_observacion": 1,
               "observacion": "Prueba 3",
               "id_proceso_judicial": 1
           }
       ],
       "resoluciones": [
           {
               "id_resolucion": 1,
               "resolucion": "Prueba 4",
               "fecha_resolucion": "2024-04-07",
               "id_proceso_judicial": 1
           }
       ],
       "pruebas": [
           {
               "id_prueba": 1,
               "descripcion_prueba": "Prueba 2",
               "id_proceso_judicial": 1
           }
       ]
   }
   este la variable de this.#proceso requiero que la separes en los objetos que se requieren para el registro de un proceso judicial
     */
    const promovente = this.#proceso.participantes.find(participante => participante.promovente !== null)
    const imputado = this.#proceso.participantes.find(participante => participante.imputado !== null)
    const proceso = {
      id_proceso_judicial: this.#proceso.id_proceso_judicial,
      fecha_inicio: this.#proceso.fecha_inicio,
      fecha_estatus: this.#proceso.fecha_estatus,
      control_interno: this.#proceso.control_interno,
      numero_expediente: this.#proceso.numero_expediente,
      id_turno: this.#proceso.id_turno,
      id_distrito_judicial: this.#proceso.id_distrito_judicial,
      id_municipio_distrito: this.#proceso.id_municipio_distrito,
      id_tipo_juicio: this.#proceso.id_tipo_juicio,
      id_defensor: this.#proceso.id_defensor,
      estatus_proceso: this.#proceso.estatus_proceso,
      id_juzgado: this.#proceso.id_juzgado,
    }
    const pruebas = this.#proceso.pruebas
    const resoluciones = this.#proceso.resoluciones
    const observaciones = this.#proceso.observaciones
    const estados_procesales = this.#proceso.estados_procesales

    return {
      proceso,
      promovente,
      imputado,
      pruebas,
      resoluciones,
      observaciones,
      estados_procesales
    }

  }

  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('registro-full-tab', RegistroTab)
