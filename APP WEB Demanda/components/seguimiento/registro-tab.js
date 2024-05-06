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

  //Variables privadas
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

  #proceso = null
  
  //Metodo para obtener los atributos
  static get observedAttributes() {
    return ['id', 'data']
  }

   //Metodo para obtener el id del proceso
  get id() {
    return this.getAttribute('id')
  }

  //Metodo para establecer el id 
  set id(value) {
    this.setAttribute('id', value)
  }

  //Metodo para verificar si el proceso esta completo
  get isComplete() {
    return this.validateInputs()
  }

  //Metodo para obtener el proceso y asi poder validar si esta completo
  get isComplete2() {
    return this.#proceso
  }

  //Metodo para obtener el proceso
  get proceso() {
    return this.#proceso
  }
  
  //Metodo para obtener los datos 
  get data() {
    const promovente = this.#proceso.participantes.find(participante => participante.promovente !== null)
    const imputado = this.#proceso.participantes.find(participante => participante.imputado !== null)
    const proceso = {
      id_proceso_judicial: this.#proceso.id_proceso_judicial,
      fecha_inicio: this.#proceso.fecha_inicio,
      fecha_estatus: this.#proceso.fecha_estatus,
      control_interno: this.#proceso.control_interno,
      // quiero que obtengas el nombre del defensor en base al id del defensor localizado en el proceso y el select de defensores 
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
    const estadosProcesales = this.#proceso.estados_procesales

    proceso.pruebas = pruebas
    proceso.resoluciones = resoluciones
    proceso.observaciones = observaciones
    proceso.estadosProcesales = estadosProcesales

    return {
      proceso,
      promovente,
      imputado,
      id_proceso_judicial: this.#proceso.id_proceso_judicial,
      id_promovente: promovente.id_participante,
      id_imputado: imputado.id_participante,
    }

  }
 
  //Metodo para establecer los datos
  set data(value) {
    this.setAttribute('data', value)
  }

  //Constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Variable que determina que esta es la pestaña actual
    this.id = 'registro'
    this.style.display = 'block'
    //Llamada al metodo init
    this.init()
  }


  //Metodo que inicializa las variables, etc
  async init() {
    this.#api = new APIModel()

    //Obtener los defensores
    const { defensores } = await this.#api.getDefensores()
    this.#defensores = defensores
    //this.#turnos = turnos
    //LLamada al metodo para agregar eventos a los botones
    this.agregarEventosBotones()
    //LLamada al metodo para manejar los campos del formulario
    this.manageFormFields()
    //Lllamada al metodo para llenar los campos
    this.fillInputs()
     //Metodo para rellenar la tabla con los procesos
    this.rellenarTabla()
  }

  //Metodo para manejar los campos del formulario
  manageFormFields() {
    this.#procesosTable = this.shadowRoot.getElementById('table-procesos')
    // this.#idAsesoria = this.shadowRoot.getElementById('asesoria-seleccionada')
    this.#defensor = this.shadowRoot.getElementById('defensor')
    this.#idProceso = this.shadowRoot.getElementById('proceso-seleccionado')
    //Esto es con respecto al select del defensor y asi poder rellenar los procesos en base al defensor seleccionado
    this.#defensor.addEventListener('change', () => {
        if (this.#defensor.value === '0') {
  //Todos los procesos
          this.rellenarTabla()
      }
      else {
        //Procesos por defensor
        this.fillTablleWithProcesosDefensor()
      }
    })

  }
  //Metodo para rellenar la tabla con los procesos
  async rellenarTabla() {
    try {
      //Obtener los procesos en tramite
      const procesos = await this.#api.getProcesosJudicialesEnTramite("EN_TRAMITE")
      this.#procesos = procesos
      //Llamada al metodo para llenar la tabla
      this.fillTabla()
    } catch (error) {
      //    console.error('Error al obtener los procesos:', error.message)
    }
  }
  //Metodo para rellenar la tabla con los procesos en base al defensor seleccionado

  fillTablleWithProcesosDefensor = async () => {
    try {
      await this.#api.getProcesosJudicialesByDefensor(Number(this.#defensor.value), "EN_TRAMITE").then(procesos => {
        this.#procesos = procesos
        this.fillTabla()
      }).catch(error => {
         //En caso de que no haya procesos para el defensor seleccionado se muestra un modal de advertencia
        const modal = document.querySelector('modal-warning')
        modal.message = 'No hay procesos para el defensor seleccionado.'
        modal.title = 'Sin procesos'
        modal.open = true
        //Se rellena la tabla con todos los procesos
        this.rellenarTabla()
      })

    } catch (error) {
      //    console.error('Error al obtener los turnos por defensor:', error.message)
    }
  }

// Metodo para rellenar la tabla con los procesos
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
            <td class="px-6 py-4 whitespace-nowrap">${this.#defensores.find(defensor => defensor.id_defensor === proceso.id_defensor).nombre_defensor
          }</td>
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
      //  console.error('Error al obtener los procesos:', error.message);
    }
  }

  //Metodo que llena en est ecaos el select con los defensores
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

    // Agregar los defensores al select
    this.#defensores.forEach(defensor => {
      const option = document.createElement('option');
      option.value = defensor.id_defensor;
      option.text = defensor.nombre_defensor;
      this.#defensor.appendChild(option);
    });

  }

//Metodo que agrega eventos a los botones de la tabla
  agregarEventosBotones = () => {

    // Seleccionar botones de la tabla
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-proceso');
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const procesoId = boton.dataset.id;
        this.#idProceso = procesoId;
        //Metodo para activar el boton de seleccionar
        this.activarBotonSeleccionar(procesoId);
      });
    });

    // Seleccionar botones de la tabla
    const llamarActivarBotonSeleccionar = (procesoId) => {
      //Llamada al metodo para activar el boton de seleccionar
      this.activarBotonSeleccionar(procesoId);
    };

     
    // Seleccionar botones de la tabla
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

//Metodo para activar el boton de seleccionar el cual se activa al seleccionar un proceso  
  activarBotonSeleccionar = async procesoId => {
    try {
 
      const proceso = await this.#api.getProcesoJudicialById(procesoId);
      //En caso de que el proceso sea diferente al proceso seleccionado se muestra un modal de advertencia
      if (this.#proceso !== null) {
        //Si el proceso seleccionado es diferente al proceso actual se muestra un modal de advertencia ya que se perdera el progreso actual
        if (this.#proceso.id_proceso_judicial !== proceso.id_proceso_judicial) {
          const modal = document.querySelector('modal-warning');
          modal.setOnCloseCallback(() => {
            if (modal.open === 'false') {
              if (modal.respuesta === true) {
                this.#proceso = proceso;
                this.#idProceso.innerHTML = proceso.id_proceso_judicial;
              }
            }
          });
          modal.message = 'Ya has seleccionado un proceso. Si eliges otro, se perderá el progreso actual.';
          modal.title = 'Advertencia';
          modal.open = 'true'
        }

      }
      else
      //En caso de que el proceso sea igual al proceso seleccionado se muestra un modal de advertencia
        if (this.#proceso === null) {
          this.#proceso = proceso;
          this.#idProceso.innerHTML = proceso.id_proceso_judicial;
        }

    } catch (error) {
      console.error('Error al obtener el turno por ID:', error);
    }
  }

//Metodo para validar los campos en este caso la seleccion del proceso
  validateInputs() {

    try {

      //En caso de que no se haya seleccionado un proceso se muestra un modal de advertencia
      if (this.#proceso === undefined || this.#proceso === null) {
        throw new ValidationError('Selecciona un proceso para continuar, y de click en siguiente')
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


   //Metodo para manejar los eventos 
  connectedCallback() {
    //Obtencion del boton siguiente
    this.btnNext = this.shadowRoot.getElementById('btn-registro-next')
    //Evento para el boton siguiente
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

  //Modal de advertencia
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

}

customElements.define('registro-full-tab', RegistroTab)
