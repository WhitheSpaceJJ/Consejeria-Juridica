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

  //Varianbles de clase
  #api
  #defensor
  #defensores
  #idAsesoria
  #turnos
  #turnosTable
  #turno = null

  //Metodo get que establece los atributos observados y los retorna
  static get observedAttributes() {
    return ['id', 'data']
  }

  //Metodo get que retorna el valor del atributo id
  get id() {
    return this.getAttribute('id')
  }

  //Metodo get que retorna el valor del atributo data
  set id(value) {
    this.setAttribute('id', value)
  }

  //Metodo que se encarga de verificar si el componente esta completo
  get isComplete() {
    return this.validateInputs()
  }

  //Metodo que devuelve el turno seleccionado
  get turno() {
    return this.#turno
  }

  //Metodo que devuelve el valor del atributo data
  get data() {

    const turno = this.#turno
    return {
      turno
    }
  }

  //Metodo que establece el valor del atributo data
  set data(value) {
    this.setAttribute('data', value)
  }

  //Constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Id que nos ayuda a identificar el componente
    this.id = 'registro'
    this.style.display = 'block'
    //Llamada al metodo init
    this.init()
  }


  //MEtodo que inicializa las variables de la clase etc
  async init() {
    this.#api = new APIModel()
  //Llamada al metodo que obtiene los datos de la API
    await this.obtencionDatos()
 //Llamada a los metodos que se encargan de agregar eventos a los botones, manejar los campos del formulario y llenar los inputs
 //Metodo que se encarga de agregar eventos a los botones
    this.agregarEventosBotones()
    //Lllamda al metodo que se encarga de manejar los campos del formulario
    this.manageFormFields()
    //Llamada al metodo que se encarga de llenar los inputs
    this.fillInputs()

  }

//Metodo que se encarga de obtener los datos de la API
  async obtencionDatos(){
    const { defensores } = await this.#api.getDefensores()
    const { turnos } = await this.#api.getTurnos()
    this.#defensores = defensores
    this.#turnos = turnos
  }
  //Metodo que se encarga de manejar los campos del formulario
  manageFormFields() {
    this.#turnosTable = this.shadowRoot.getElementById('table-turnos')
    this.#idAsesoria = this.shadowRoot.getElementById('asesoria-seleccionada')
    this.#defensor = this.shadowRoot.getElementById('defensor')
    //Aqui se agrega el evento de change correspondiente al select de defensor
    this.#defensor.addEventListener('change', () => {
      if (this.#defensor.value === '0') {
        this.fillInputs()

      }
      else {
        this.fillTablleWithTurnosDefensor()
      }
    })


  }
  //Metodo que se encarga de llenar la tabla con los turnos del defensor seleccionado
  fillTablleWithTurnosDefensor = async () => {
    try {
      //Obtencion de los turnos por defensor
      const { turnos } = await this.#api.getTurnosByDefensor(this.#defensor.value)
      //Validacion de si hay turnos para el defensor seleccionado
      if (turnos === undefined || turnos.length === 0) {
        //Mensaje de advertencia
        const modal = document.querySelector('modal-warning')
        modal.message = 'No hay turnos para el defensor seleccionado.'
        modal.title = 'Sin turnos'
        modal.open = true
        const { turnos } = await this.#api.getTurnos()
        this.#turnos = turnos
        this.fillTabla()
      }
      else {
        //Si hay turnos para el defensor seleccionado se llenara la tabla con los turnos
        this.#turnos = turnos
        this.fillTabla()

      }
    } catch (error) {
      console.error('Error al obtener los turnos por defensor:', error.message)
    }
  }

//Metodo que se encarga de llenar la tabla con los turnos
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

  //Metodo que se encarga de llenar los inputs
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

    // Agregar los demás hijos
    this.#defensores.forEach(defensor => {
      const option = document.createElement('option');
      option.value = defensor.id_defensor;
      option.text = defensor.nombre_defensor;
      this.#defensor.appendChild(option);
    });

    this.fillTabla();
  }


  //Metodo que se encarga de agregar eventos a los botones , muy similar a las seccion de administraciones de campos
  agregarEventosBotones = () => {

    // Seleccionar todos los botones con la clase .seleccionar-turno esto es en la creacion de la tabla
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-turno');
     

    // Agregar un evento click a cada botón
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const turnoId = boton.dataset.id;
        this.#idAsesoria = turnoId;
        //Llamar a la función que activa el botón de seleccionar
        this.activarBotonSeleccionar(turnoId);
      });
    });

    // Definir la función que activa el botón de seleccionar
    const llamarActivarBotonSeleccionar = (turnoId) => {
      this.activarBotonSeleccionar(turnoId);
    };

    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  //Metodo que se encarga de activar el boton de seleccionar y rellenar el input de asesoria seleccionada
  activarBotonSeleccionar = async turnoId => {
    try {
      // Obtener el turno por ID
      const { turno } = await this.#api.getTurnoById(turnoId);
      if ( this.#turno !== null) {
         //Si el turno seleccionado es diferente al turno actual se mostrara un mensaje de advertencia y se preguntara si se desea cambiar de turno
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
//Si el turno seleccionado es igual al turno actual se rellenara el input de asesoria seleccionada
        if (this.#turno  === null) {
          this.#turno = turno;
          this.#idAsesoria.innerHTML = turno.asesoria.datos_asesoria.id_asesoria;
        }


    } catch (error) {
      console.error('Error al obtener el turno por ID:', error);
    }
  }




   //Metodo que se encarga de validar los inputs
  validateInputs() {

    try {

      //Validacion de si el turno es nulo o indefinido
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


  //Se conecta el callback de la clase e inicializa el boton de next
  connectedCallback() {
    //Asignacon de la variable btnNext 
    this.btnNext = this.shadowRoot.getElementById('btn-registro-next')


    //Evento click del boton next
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

  //Metodo que se encarga de mostrar el modal de advertencia
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }


}

customElements.define('registro-full-tab', RegistroTab)
