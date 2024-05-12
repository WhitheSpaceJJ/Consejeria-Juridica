import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'

const template = document.createElement('template')

const html = await (
  await fetch('/components/Registros/empleados-tab.html')
).text()
template.innerHTML = html

class EmpleadosTab extends HTMLElement {

  // Propiedades privadas de la clase EmpleadosTab 
  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #tipoUsuario
  #estatusUsuario
  #distritoJudicial
  #empleados
  #api
  #idSeleccion
  #distritos

  // Constructor de la clase EmpleadosTab
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Establece null como valor inicial para el id de la selección
    this.#idSeleccion = null;
    // Inicializa datos de la clase
    this.init();
  }

  // Método para inicializar la clase EmpleadosTab
  async init() {
    // Crear una instancia de la clase APIModel
    this.#api = new APIModel();
    // Obtener los distritos judiciales
    this.#distritos = await this.#api.getDistritos()
    //Llamar a la función manageFormFields para manejar los campos del formulario
    this.manageFormFields();
    //Llamar a la función fillInputs para rellenar los campos del formulario
    this.fillInputs();
    //Llamada a la función manejadorEventosEntrada para manejar los eventos de entrada
    this.manejadorEventosEntrada();
  }
  //Función para manejar los eventos de entrada
  manejadorEventosEntrada() {

    var nombreInput = this.#nombre;
    // Agregar un evento 'input' al campo de entrada para validar en tiempo real
    nombreInput.addEventListener('input', function () {
      var nombrePattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

      if (nombreInput.value === '') {
        // Si el campo está vacío, lanzar una excepción
        const modal = document.querySelector('modal-warning')
        modal.message = 'El nombre no puede estar vacío, por favor ingréselo.'
        modal.title = 'Error de validación'
        modal.open = true
      } else
        if (!nombrePattern.test(nombreInput.value)) {
          // Si el campo contiene caracteres no válidos, lanzar una excepción

          const modal = document.querySelector('modal-warning')
          modal.message = 'El nombre solo permite letras, verifique su respuesta.'
          modal.title = 'Error de validación'
          modal.open = true

        } else if (nombreInput.value.length > 100) {
          // Si el campo tiene más de 50 caracteres, lanzar una excepción
          const modal = document.querySelector('modal-warning')
          modal.message = 'El nombre no puede tener más de 100 caracteres, por favor ingréselo correctamente.'
          modal.title = 'Error de validación'
          modal.open = true
        }
    });


  }

  //Función para manejar los campos del formulario
  manageFormFields() {
    this.#nombre = this.shadowRoot.getElementById('nombre');
    this.#apellidoPaterno = this.shadowRoot.getElementById('apellido-paterno');
    this.#apellidoMaterno = this.shadowRoot.getElementById('apellido-materno');
    this.#tipoUsuario = this.shadowRoot.getElementById('tipo-usuario');
    this.#estatusUsuario = this.shadowRoot.getElementById('estatus-empleado');
    this.#distritoJudicial = this.shadowRoot.getElementById('distrito-judicial');
    this.#empleados = this.shadowRoot.getElementById('table-empleado');

  }

  //Metodo que mandara a llamar a las funciones para agregar eventos a los botones, mostrar empleados y rellenar distritos judiciales
  fillInputs() {
    this.agregarEventosBotones();
    this.mostrarEmpleados();
    this.rellenarDistritosJudiciales();
  }

  //Metodo para rellenar el select de los distritos judiciales
  rellenarDistritosJudiciales = async () => {
    this.#distritos.forEach(distrito => {
      const option = document.createElement('option')
      option.value = distrito.id_distrito_judicial
      option.textContent = distrito.nombre_distrito_judicial
      this.#distritoJudicial.appendChild(option)
    })
  }

  //Metodo para agregar eventos a los botones
  agregarEventosBotones = () => {
    //Agregar boton
    const agregarEmpleadoBtn = this.shadowRoot.getElementById('agregar-empleado');

    agregarEmpleadoBtn.addEventListener('click', this.agregarEmpleado);

    //Editar boton
    const editarEmpleadoBtn = this.shadowRoot.getElementById('editar-empleado');
    editarEmpleadoBtn.addEventListener('click', this.editarEmpleado);

    //Seleccionar boton esto es con respecto al metodo mostrarEmpleados de la clase EmpleadosTab
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-empleado');

    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const empleadoId = boton.dataset.id;
        this.#idSeleccion = empleadoId;
        this.activarBotonSeleccionar(empleadoId);
      });
    });

    // Nueva función para llamar a activarBotonSeleccionar dentro del contexto de la instancia actual de JuicioController
    const llamarActivarBotonSeleccionar = (empleadoId) => {
      this.activarBotonSeleccionar(empleadoId);
    };

    // Agregar la función llamarActivarBotonSeleccionar al ámbito global para que se pueda llamar desde el atributo onclick de los botones "Seleccionar"
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;
  }

  //Metodo para agregar un empleado
  agregarEmpleado = async () => {
    //El id de seleccion nos ayude a saber si se selecciono un empleado para editar
    const idEmpleado = this.#idSeleccion;
    //Variable para mostrar un modal
    let modal;
    //Si no se selecciono un empleado para editar
    if (idEmpleado === null) {
      //Obtener los valores de los campos del formulario
      const nombreInput = this.#nombre.value;
      const tipoUsuarioInput = this.#tipoUsuario.value;
      const estatusUsuarioInput = this.#estatusUsuario.value;
      const distritoJudicialInput = this.#distritoJudicial.value;

      try {
        //Expresion regular para validar el nombre
        const nombrePattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

        //Validar si el campo de nombre esta vacio
        if (nombreInput === '') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de nombre es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Validar si el campo de tipo de usuario esta vacio
        if (tipoUsuarioInput === '0') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de tipo de usuario es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Validar si el campo de estatus de usuario esta vacio
        if (estatusUsuarioInput === '0') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de estatus de usuario es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Validar si el campo de distrito judicial esta vacio
        if (distritoJudicialInput === '0') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de distrito judicial es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Si los campos no estan vacios se procede a validar el nombre
        if (nombreInput !== '' && tipoUsuarioInput !== '0' && estatusUsuarioInput !== '0' && distritoJudicialInput !== '0') {
          //Validar si el nombre tiene mas de 100 caracteres, si es asi mostrar un modal de error
          if (nombreInput.length > 100) {
            modal = document.querySelector('modal-warning');
            modal.message = 'El campo de nombre no puede contener más de 100 caracteres.';
            modal.title = 'Error de validación';
            modal.open = true;
          } else if (!nombrePattern.test(nombreInput)) {
            modal = document.querySelector('modal-warning');
            modal.message = 'El nombre solo permite letras, verifique su respuesta.';
            modal.title = 'Error de validación';
            modal.open = true;
          } else {
            //Si el nombre es valido se procede a crear un nuevo empleado
            const nuevoEmpleado = {
              nombre: this.#nombre.value,
              tipo_empleado: this.#tipoUsuario.value,
              estatus_general: this.#estatusUsuario.value.toUpperCase(),
              id_distrito_judicial: this.#distritoJudicial.value
            };
            //    console.log(nuevoEmpleado);
            try {
              const response = await this.#api.postEmpleado(nuevoEmpleado);

              if (response) {
                this.#nombre.value = '';
                this.#tipoUsuario.value = '0';
                this.#estatusUsuario.value = '0';
                this.#distritoJudicial.value = '0';
                this.#idSeleccion = null;
                this.mostrarEmpleados();
              }
            } catch (error) {
              console.error('Error al agregar un nuevo empleado:', error);
              const modal = document.querySelector('modal-warning');
              modal.setOnCloseCallback(() => {
                if (modal.open === 'false') {
                  window.location = '/index.html'
                }
              });
              modal.message = 'Error al agregar un nuevo empleado, por favor intente de nuevo, o verifique el status del servidor';
              modal.title = 'Error al agregar empleado';
              modal.open = true;

            }
          }
        }
      } catch (error) {
        console.error('Error al agregar un nuevo empleado:', error);
      }
    } else {
      modal = document.querySelector('modal-warning');
      modal.message = 'No se puede agregar un empleado si se ha seleccionado uno para editar, se eliminará la selección.';
      modal.title = 'Error de validación';
      modal.open = true;
      this.#idSeleccion = null;
      this.#nombre.value = '';
      this.#tipoUsuario.value = '0';
      this.#estatusUsuario.value = '0';
      this.#distritoJudicial.value = '0';
      this.liberarTipoEmpleado();
    }
  };

  //Metodo para editar un empleado 
  editarEmpleado = async () => {
    //El id de seleccion nos ayude a saber si se selecciono un empleado para editar
    const idEmpleado = this.#idSeleccion;
    let modal;
    //Si no se selecciono un empleado para editar
    if (idEmpleado === null) {
      //Mostrar un modal de error
      modal = document.querySelector('modal-warning');
      modal.message = 'Por favor seleccione un empleado para editar.';
      modal.title = 'Error de validación';
      modal.open = true;
    } else {
      //Obtener los valores de los campos del formulario
      const nombreInput = this.#nombre.value;
      const tipoUsuarioInput = this.#tipoUsuario.value;
      const estatusUsuarioInput = this.#estatusUsuario.value;
      const distritoJudicialInput = this.#distritoJudicial.value;

      try {
        //Expresion regular para validar el nombre
        const nombrePattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

        //Validar si el campo de nombre esta vacio
        if (nombreInput === '') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de nombre es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Validar si el campo de tipo de usuario esta vacio
        if (tipoUsuarioInput === '0') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de tipo de usuario es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Validar si el campo de estatus de usuario esta vacio
        if (estatusUsuarioInput === '0') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de estatus de usuario es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //Validar si el campo de distrito judicial esta vacio
        if (distritoJudicialInput === '0') {
          modal = document.querySelector('modal-warning');
          modal.message = 'El campo de distrito judicial es obligatorio.';
          modal.title = 'Error de validación';
          modal.open = true;
        }

        //En caso de que los campos no esten vacios se procede a validar el nombre
        if (nombreInput !== '' && tipoUsuarioInput !== '0' && estatusUsuarioInput !== '0' && distritoJudicialInput !== '0') {
          //Validar si el nombre tiene mas de 100 caracteres, si es asi mostrar un modal de error
          if (nombreInput.length > 100) {
            modal = document.querySelector('modal-warning');
            modal.message = 'El campo de nombre no puede contener más de 100 caracteres.';
            modal.title = 'Error de validación';
            modal.open = true;
          } else if (!nombrePattern.test(nombreInput)) {
            modal = document.querySelector('modal-warning');
            modal.message = 'El nombre solo permite letras, verifique su respuesta.';
            modal.title = 'Error de validación';
            modal.open = true;
          } else {
            //Si el nombre es valido se procede a editar el empleado
            //Crear un objeto con los datos del empleado
            const empleado = {
              nombre: this.#nombre.value,
              tipo_empleado: this.#tipoUsuario.value,
              estatus_general: this.#estatusUsuario.value.toUpperCase(),
              id_distrito_judicial: parseInt(this.#distritoJudicial.value)
            };

            //Validar si el tipo de empleado es asesor o defensor y proceder a editar el empleado
            if (empleado.tipo_empleado === 'asesor') {
              //Obtener el asesor por id

              const { asesor } = await this.#api.getAsesorID(this.#idSeleccion);

              //Validar si los datos del empleado son iguales a los actuales
              if (asesor.nombre_asesor === empleado.nombre && asesor.empleado.tipo_empleado === empleado.tipo_empleado && asesor.empleado.estatus_general === empleado.estatus_general && asesor.empleado.id_distrito_judicial === empleado.id_distrito_judicial) {
                modal = document.querySelector('modal-warning');
                modal.message = 'No se realizaron cambios en el empleado, ya que los datos son iguales a los actuales.';
                modal.title = 'Error de validación';
                modal.open = true;
                this.#nombre.value = '';
                this.#tipoUsuario.value = '0';
                this.#estatusUsuario.value = '0';
                this.#distritoJudicial.value = '0';
                this.#idSeleccion = null;
                this.liberarTipoEmpleado();
              }
              else {
                //Validar si el tipo de empleado es diferente
                if (asesor.empleado.tipo_empleado !== empleado.tipo_empleado) {
                  modal = document.querySelector('modal-warning');
                  modal.message = 'No se puede cambiar el tipo de empleado de un asesor.';
                  modal.title = 'Error de validación';
                  modal.open = true;
                } else {
                  try {
                    const response = await this.#api.putEmpleado(this.#idSeleccion, empleado);
                    if (response) {
                      this.#nombre.value = '';
                      this.#tipoUsuario.value = '0';
                      this.#estatusUsuario.value = '0';
                      this.#distritoJudicial.value = '0';
                      this.#idSeleccion = null;
                      this.mostrarEmpleados();
                      this.liberarTipoEmpleado();
                    }
                  } catch (error) {
                    console.error('Error al editar el empleado:', error);
                    const modal = document.querySelector('modal-warning');
                    modal.setOnCloseCallback(() => {
                      if (modal.open === 'false') {
                        window.location = '/index.html'
                      }
                    });
                    modal.message = 'Error al editar el empleado, por favor intente de nuevo, o verifique el status del servidor';
                    modal.title = 'Error al editar empleado';
                    modal.open = true;
                  }
                }
              }
            } else {
              //Obtener el defensor por id
              const { defensor } = await this.#api.getDefensorID(this.#idSeleccion);
              //Validar si los datos del empleado son iguales a los actuales
              if (defensor.nombre_defensor === empleado.nombre && defensor.empleado.tipo_empleado === empleado.tipo_empleado && defensor.empleado.estatus_general === empleado.estatus_general && defensor.empleado.id_distrito_judicial === empleado.id_distrito_judicial) {
                modal = document.querySelector('modal-warning');
                modal.message = 'No se realizaron cambios en el empleado, ya que los datos son iguales a los actuales.';
                modal.title = 'Error de validación';
                modal.open = true;
                this.#nombre.value = '';
                this.#tipoUsuario.value = '0';
                this.#estatusUsuario.value = '0';
                this.#distritoJudicial.value = '0';
                this.#idSeleccion = null;
                this.liberarTipoEmpleado();
              }
              else {
                //Validar si el tipo de empleado es diferente
                if (defensor.empleado.tipo_empleado !== empleado.tipo_empleado) {
                  modal = document.querySelector('modal-warning');
                  modal.message = 'No se puede cambiar el tipo de empleado de un defensor.';
                  modal.title = 'Error de validación';
                  modal.open = true;
                }
                else {
                  //Si el tipo de empleado es igual se procede a editar el empleado
                  try {
                    const response = await this.#api.putEmpleado(this.#idSeleccion, empleado);

                    if (response) {
                      this.#nombre.value = '';
                      this.#tipoUsuario.value = '0';
                      this.#estatusUsuario.value = '0';
                      this.#distritoJudicial.value = '0';
                      this.#idSeleccion = null;
                      this.mostrarEmpleados();
                      this.liberarTipoEmpleado();
                    }
                  } catch (error) {
                    //Mensaje de advertencia en caso de error
                    console.error('Error al editar el empleado:', error);
                    const modal = document.querySelector('modal-warning');
                    modal.setOnCloseCallback(() => {
                      if (modal.open === 'false') {
                        window.location = '/index.html'
                      }
                    });
                    modal.message = 'Error al editar el empleado, por favor intente de nuevo, o verifique el status del servidor';
                    modal.title = 'Error al editar empleado';
                    modal.open = true;

                  }
                }
              }

            }
          }
        }
      } catch (error) {
        console.error('Error al editar el empleado:', error);
      }
    }
  };

  //Metodo para mostrar los empleados
  mostrarEmpleados = async () => {
    let validar = 0;
    const tableBody = this.#empleados;
    tableBody.innerHTML = '';
    try {
      const asesores = await this.#api.getAsesores();


      const asesoresArray = Object.values(asesores.asesores);

      asesoresArray.forEach(asesor => {

        const row = document.createElement('tr');
        row.innerHTML = `
        <tr id="empleado-${asesor.id_asesor}">
        <td class="px-6 py-4 whitespace-nowrap">${asesor.id_asesor}</td>
        <td class="px-6 py-4 whitespace-nowrap">${asesor.nombre_asesor}</td>
        <td class="px-6 py-4 whitespace-nowrap">${asesor.empleado.tipo_empleado}</td>
        <td class="px-6 py-4 whitespace-nowrap">${asesor.empleado.estatus_general}</td>
        <td class="px-6 py-4 whitespace-nowrap">${asesor.empleado.id_distrito_judicial}</td>
        <td class="px-6 py-4 whitespace-nowrap">
        <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-empleado" onclick="llamarActivarBotonSeleccionar(this.value)" value='{"id_asesor":${asesor.id_asesor},"tipo":"asesor"}'>
        Seleccionar
      </button>
    
        </td>
    </tr>
        `;
        tableBody.appendChild(row);



      });




    } catch (error) {
      console.error('Error al obtener los empleados:', error);

      validar++;

    }
    try {

      const defensores = await this.#api.getDefensores();

      const defensoresArray = Object.values(defensores.defensores);

      defensoresArray.forEach(defensor => {

        const row = document.createElement('tr');
        row.innerHTML = `
        <tr id="empleado-${defensor.id_defensor}">
        <td class="px-6 py-4 whitespace-nowrap">${defensor.id_defensor}</td>
        <td class="px-6 py-4 whitespace-nowrap">${defensor.nombre_defensor}</td>
        <td class="px-6 py-4 whitespace-nowrap">${defensor.empleado.tipo_empleado}</td>
        <td class="px-6 py-4 whitespace-nowrap">${defensor.empleado.estatus_general}</td>
        <td class="px-6 py-4 whitespace-nowrap">${defensor.empleado.id_distrito_judicial}</td>
        <td class="px-6 py-4 whitespace-nowrap">
        <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-empleado" onclick="llamarActivarBotonSeleccionar(this.value)" value='{"id_asesor":${defensor.id_defensor},"tipo":"defensor"}'>
        Seleccionar
      </button>
    
        </td>
    </tr>
        `;
        tableBody.appendChild(row);

      });



    } catch (error) {
      console.error('Error al obtener los empleados:', error.message);
      validar++;
    }

    if (validar === 2) {
      const modal = document.querySelector('modal-warning');
     //  modal.setOnCloseCallback(() => {
   //      if (modal.open === 'false') {
     //      window.location = '/index.html'
   //      }
    //   }
    //   );
      modal.message = 'Error al obtener los empleados, por favor verifique el status del servidor.';
      modal.title = 'Error al obtener empleados';
      modal.open = true;
    }

  }

  //Metodo para bloquear el campo de tipo de empleado esto con el fin de cuando se seleccione un empleado no se pueda cambiar el tipo de empleado
  bloquearTipoEmpleado = () => {
    this.#tipoUsuario.disabled = true;
  }

  //Metodo para liberar el campo de tipo de empleado esto con el fin de cuando se seleccione un empleado se pueda cambiar el tipo de empleado
  liberarTipoEmpleado = () => {
    this.#tipoUsuario.disabled = false;
  }

  //Metodo para activar el boton seleccionar
  activarBotonSeleccionar = async (empleado) => {
    try {
      const tipoEmpleado = JSON.parse(empleado).tipo;

      //Si el tipo de empleado es asesor se obtiene el asesor por id y se rellenan los campos del formulario, caso contrario se obtiene el defensor por id y se rellenan los campos del formulario
      if (tipoEmpleado === 'asesor') {
        const asesorID = JSON.parse(empleado).id_asesor;
        const { asesor } = await this.#api.getAsesorID(asesorID);
        //        console.log(asesor)
        this.#nombre.value = asesor.nombre_asesor;
        this.#tipoUsuario.value = asesor.empleado.tipo_empleado;
        this.#estatusUsuario.value = asesor.empleado.estatus_general;
        this.#distritoJudicial.value = asesor.empleado.id_distrito_judicial;
        this.#idSeleccion = asesor.id_asesor;
      }
      else {
        const defensorID = JSON.parse(empleado).id_asesor;
        const { defensor } = await this.#api.getDefensorID(defensorID);
        // console.log(defensor)
        this.#nombre.value = defensor.nombre_defensor;
        this.#tipoUsuario.value = defensor.empleado.tipo_empleado;
        this.#estatusUsuario.value = defensor.empleado.estatus_general;
        this.#distritoJudicial.value = defensor.empleado.id_distrito_judicial;
        this.#idSeleccion = defensor.id_defensor;
      }


      this.bloquearTipoEmpleado();


    } catch (error) {
      console.error('Error al obtener el empleado por ID:', error);
    }
  }

}

customElements.define('empleados-tab', EmpleadosTab);
