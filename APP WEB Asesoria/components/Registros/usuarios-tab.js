//const template = document.createElement('template');
//import { ControllerUtils } from '......./lib/controllerUtils';
import { APIModel } from '../../models/api.model'
import { ValidationError } from '../../lib/errors.js'



const template = document.createElement('template')

const html = await (
  await fetch('./components/Registros/usuarios-tab.html')
).text()
template.innerHTML = html


class UsuariosTab extends HTMLElement {
  //  Variables de clase para el manejo de la API y el id de selección
  #api
  #idSeleccion
  #empleadoRadio
  #distritoRadio
  #asesores
  #defensores
  #distritos
  #asesor
  #defensor
  #distrito
  #distrito2
  #asesorRadio
  #defensorRadio
  #bloqueOpciones
  #bloqueDistrito
  #bloqueAsesor
  #bloqueDefensor
  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #correo
  #password
  #estatusUsuario
  #usuarios

  //  Constructor de la clase
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Llamada a la función init 
    this.init();
  }

  //Funcion encargada de inicializar las variables de la clase y de llenar los campos de la tabla, etc
  async init() {
    //Inicialización de las variables de la clase
    this.#api = new APIModel();
    //Inicialización de la variable de selección de usuario
    this.#idSeleccion = null;

    //Llamada a la funcion de asignación de campos
    this.manageFormFields();
    //Llamada a la función de llenado de campos
    this.fillInputs();
    try {
      const { asesores } = await this.#api.getAsesores();
      this.#asesores = asesores;

    }
    catch (error) {
      console.error('Error al obtener los asesores:', error);
      const modal = document.querySelector('modal-warning')
      modal.setOnCloseCallback(() => {
        if (modal.open === 'false') {
          window.location = '/index.html'
        }
      })
      modal.message = 'No se pudo obtener la información de los asesores, por favor intente más tarde o verifique el status del servidor'
      modal.title = 'Error de conexión'
      modal.open = true

    }
    try {
      const { defensores } = await this.#api.getDefensores();
      this.#defensores = defensores;

    } catch (error) {
      console.error('Error al obtener los defensores:', error);
      const modal = document.querySelector('modal-warning')
      modal.setOnCloseCallback(() => {
        if (modal.open === 'false') {
          window.location = '/index.html'
        }
      })
      modal.message = 'No se pudo obtener la información de los defensores, por favor intente más tarde o verifique el status del servidor'
      modal.title = 'Error de conexión'
      modal.open = true
    }

    //Llamada a la función que obtiene los distritos judiciales
    const distritos = await this.#api.getDistritos();

    //Asignación de los distritos judiciales a la variable de clase
    this.#distritos = distritos;

    //Llenado del select de distritos judiciales
    this.#asesores.forEach(asesor => {
      const option = document.createElement('option')
      const jsonValue = JSON.stringify({
        id_asesor: asesor.id_asesor,
        id_distrito_judicial: asesor.empleado.id_distrito_judicial
      });
      option.value = jsonValue;
      option.textContent = asesor.nombre_asesor
      this.#asesor.appendChild(option)
    })

    //Llenado del select de asesores
    this.#defensores.forEach(defensor => {
      const option = document.createElement('option')
      const jsonValue = JSON.stringify({
        id_defensor: defensor.id_defensor,
        id_distrito_judicial: defensor.empleado.id_distrito_judicial
      });

      option.value = jsonValue
      option.textContent = defensor.nombre_defensor
      this.#defensor.appendChild(option)
    })

    //Llenado del select de distritos judiciales con respecto al select de distritios judiciales del defensor verificar html del asset si tiene duda
    this.#distritos.forEach(distrito => {
      const option = document.createElement('option')
      option.value = distrito.id_distrito_judicial
      option.textContent = distrito.nombre_distrito_judicial
      this.#distrito.appendChild(option)
    })

    //Llenado del select de distritos judiciales con respecto al select de distritios judiciales del asesor verificar html del asset si tiene duda
    this.#distritos.forEach(distrito => {
      const option = document.createElement('option')
      option.value = distrito.id_distrito_judicial
      option.textContent = distrito.nombre_distrito_judicial
      this.#distrito2.appendChild(option)
    })
    
     //Lladma a la funcion de manejo de eventos de radio
    this.eventosRadios();
    //Asignación de eventos a el radio de asesor
    this.#asesor.addEventListener('change', this.handleAsesorChange);
    //Asignación de eventos a el radio de defensor
    this.#defensor.addEventListener('change', this.handleDefensorChange);
  }
  //Metodo que se encarga de seleccionar el distrito judicial de un asesor
  handleAsesorChange = () => {
    const asesor = JSON.parse(this.#asesor.value);
    this.#distrito2.value = asesor.id_distrito_judicial;
  }

  //Metodo que se encarga de seleccionar el distrito judicial de un defensor
  handleDefensorChange = () => {
    const defensor = JSON.parse(this.#defensor.value);
    this.#distrito2.value = defensor.id_distrito_judicial;
  }

  //Manejador de variables con respecto a los campos del formulario
  manageFormFields() {

    this.#empleadoRadio = this.shadowRoot.getElementById('empleado');
    this.#distritoRadio = this.shadowRoot.getElementById('distrito');
    this.#asesor = this.shadowRoot.getElementById('asesor');
    this.#defensor = this.shadowRoot.getElementById('defensor');
    this.#distrito = this.shadowRoot.getElementById('distrito-judicial');
    this.#distrito2 = this.shadowRoot.getElementById('distrito-judicial2');
    this.#asesorRadio = this.shadowRoot.getElementById('asesor-option');
    this.#defensorRadio = this.shadowRoot.getElementById('defensor-option');
    this.#bloqueOpciones = this.shadowRoot.getElementById('bloque-opciones');
    this.#bloqueDistrito = this.shadowRoot.getElementById('bloque-distrito');
    this.#bloqueAsesor = this.shadowRoot.getElementById('bloque-asesor');
    this.#bloqueDefensor = this.shadowRoot.getElementById('bloque-defensor');
    this.#nombre = this.shadowRoot.getElementById('nombre');
    this.#apellidoPaterno = this.shadowRoot.getElementById('apellido-paterno');
    this.#apellidoMaterno = this.shadowRoot.getElementById('apellido-materno');
    this.#correo = this.shadowRoot.getElementById('correo-electronico');
    this.#password = this.shadowRoot.getElementById('password');
    this.#estatusUsuario = this.shadowRoot.getElementById('estatus-usuario');
    this.#usuarios = this.shadowRoot.getElementById('table-usuario');

  }
  
  //Metodo encargado de validar las entradas de texto de los campos del formulario
  manejadorEntradaTexto(){
    //Asignacion de variables para proceder con los eventos de los campos de texto
    var nombreInput = this.#nombre;
    var apellidoPaternoInput = this.#apellidoPaterno;
    var apellidoMaternoInput = this.#apellidoMaterno;
    var correoInput = this.#correo;
    var passwordInput = this.#password;

    //Evento de input en el campo de nombre y validación de longitud
    nombreInput.addEventListener('input', function () {
   if (nombreInput.value.length > 45) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre no puede contener más de 45 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });

    //Evento de input en el campo de apellido paterno y validación de longitud
    apellidoPaternoInput.addEventListener('input', function () {
     if (apellidoPaternoInput.value.length > 45) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de apellido paterno no puede contener más de 45 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });

    //Evento de input en el campo de apellido materno y validación de longitud
    apellidoMaternoInput.addEventListener('input', function () {
    if (apellidoMaternoInput.value.length > 45) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de apellido materno no puede contener más de 45 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });

    //Evento de input en el campo de correo y validación de longitud
    correoInput.addEventListener('input', function () {
  if (correoInput.value.length > 45) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de correo electrónico no puede contener más de 45 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });

    //Evento de input en el campo de contraseña y validación de longitud
    passwordInput.addEventListener('input', function () {
      if (passwordInput.value.length > 65) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de contraseña no puede contener más de 65 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    });

  }

  //Funcion encargada de mandar a llamar a la API para obtener los usuarios y mostrarlos en la tabla y de agregar los eventos a los botones
  fillInputs() {
    //Llamada a la función de mostrar usuarios
    this.agregarEventosBotones();
    //Llamada a la función de agregar eventos a los botones
    this.mostrarUsuarios();
  }


  //Manejador de eventos con resecto a los radio buttons que hay en los formularios
  eventosRadios() {
    //Encaje de verificar si 
    this.#empleadoRadio.addEventListener('change', this.handleRadioChange);
    this.#distritoRadio.addEventListener('change', this.handleRadioChange);
    this.#asesorRadio.addEventListener('change', this.handleRadioChange2);
    this.#defensorRadio.addEventListener('change', this.handleRadioChange2);
  }
  handleRadioChange2 = () => {
    // Hide or show fields based on selected radio button
    if (this.#empleadoRadio.checked) {
      if (this.#asesorRadio.checked) {
        this.#bloqueAsesor.classList.remove('hidden');
        this.#bloqueDefensor.classList.add('hidden');
      } else if (this.#defensorRadio.checked) {
        this.#bloqueDefensor.classList.remove('hidden');
        this.#bloqueAsesor.classList.add('hidden');
      }

    }

  }

  handleRadioChange = () => {
    // Hide or show fields based on selected radio button
    if (this.#empleadoRadio.checked) {
      this.#bloqueOpciones.classList.remove('hidden');
      this.#bloqueDistrito.classList.add('hidden');
    } else if (this.#distritoRadio.checked) {
      this.#bloqueOpciones.classList.add('hidden');
      this.#bloqueDistrito.classList.remove('hidden');
    }
  };
  //Funcion encargada 
  agregarEventosBotones = () => {

    //Variable que contiene el boton de agregar usuario
    const agregarUsuarioBtn = this.shadowRoot.getElementById('agregar-usuario');
    //Evento de click en el boton de agregar usuario
    agregarUsuarioBtn.addEventListener('click', this.agregarUsuario);

    //Variable que contiene el boton de editar usuario
    const editarUsuarioBtn = this.shadowRoot.getElementById('editar-usuario');
    //Evento de click en el boton de editar usuario
    editarUsuarioBtn.addEventListener('click', this.editarUsuario);

    //Variable del boton de seleccionar usuario
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-usuario');
    //Iteración de los botones de seleccionar usuario
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const usuarioId = boton.value;
        this.#idSeleccion = usuarioId;
        //Llamada a la función de activar boton seleccionar
        this.activarBotonSeleccionar(usuarioId);
      });
    });

    //Funcion que manda a llamar el metodo de activar boton seleccionar
    const llamarActivarBotonSeleccionar = (usuarioId) => {
      this.activarBotonSeleccionar(usuarioId);
    }

    //Variable que contiene la redireccion del boton de seleccionar usuario
    window.llamarActivarBotonSeleccionar = llamarActivarBotonSeleccionar;

  }


  //Funcion encargada de agregar un nuevo usuario
  agregarUsuario = async () => {

    //Variable que contiene el id de seleccion de usuario y que nos sirve para verificar si previamente se ha seleccionado un usuario
    const usuarioID = this.#idSeleccion;

    //Validación de si previamente se ha seleccionado un usuario
    if (usuarioID === null) {
      //Obtención de los valores de los campos del formulario
      const nombreInput = this.#nombre.value;
      const apellidoPaternoInput = this.#apellidoPaterno.value;
      const apellidoMaternoInput = this.#apellidoMaterno.value;
      const correoInput = this.#correo.value;
      const passwordInput = this.#password.value;
      const estatusUsuarioInput = this.#estatusUsuario.value;

      try {

        //Validacion del nombre del usuario si esta vacio se mostrara un modal de error
        if (nombreInput === '') {
          //Mensaje de error
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de nombre es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del apellido paterno del usuario si esta vacio se mostrara un modal de error
        if (apellidoPaternoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de apellido paterno es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del apellido materno del usuario si esta vacio se mostrara un modal de error
        if (apellidoMaternoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de apellido materno es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del correo del usuario si esta vacio se mostrara un modal de error
        if (correoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de correo electrónico es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion de la contraseña del usuario si esta vacio se mostrara un modal de error
        if (passwordInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de contraseña es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del estatus del usuario si esta vacio se mostrara un modal de error
        if (estatusUsuarioInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de usuario es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //En caso de que los campos no esten vacios se procede a realizar las validaciones de longitud y formato
        if (nombreInput !== '' && apellidoPaternoInput !== '' && apellidoMaternoInput !== '' && correoInput !== '' && passwordInput !== '' && estatusUsuarioInput !== '0') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          //Validacion de la longitud del nombre del usuario si es mayor a 45 caracteres se mostrara un modal de error
          if (nombreInput.length > 45) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de nombre no puede contener más de 45 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else
            //Validacion de la longitud del apellido paterno del usuario si es mayor a 45 caracteres se mostrara un modal de error
            if (apellidoPaternoInput.length > 45) {
              const modal = document.querySelector('modal-warning')
              modal.message = 'El campo de apellido paterno no puede contener más de 45 caracteres.'
              modal.title = 'Error de validación'
              modal.open = true

            } else
              //Validacion de la longitud del apellido materno del usuario si es mayor a 45 caracteres se mostrara un modal de error
              if (apellidoMaternoInput.length > 45) {
                const modal = document.querySelector('modal-warning')
                modal.message = 'El campo de apellido materno no puede contener más de 45 caracteres.'
                modal.title = 'Error de validación'
                modal.open = true
              }
              else
                //Validacion de la longitud del correo del usuario si es mayor a 45 caracteres se mostrara un modal de error
                if (correoInput.length > 45) {
                  const modal = document.querySelector('modal-warning')
                  modal.message = 'El campo de correo electrónico no puede contener más de 45 caracteres.'
                  modal.title = 'Error de validación'
                  modal.open = true
                }
                else
                  //Validacion del formato del correo del usuario si no cumple con el formato se mostrara un modal de error
                  if (!emailRegex.test(correoInput)) {
                    const modal = document.querySelector('modal-warning')
                    modal.message = 'El correo electrónico no es válido.'
                    modal.title = 'Error de validación'
                    modal.open = true

                  }
                  else
                    //Validacion de la longitud de la contraseña del usuario si es mayor a 65 caracteres se mostrara un modal de error
                    if (passwordInput.length > 65) {
                      const modal = document.querySelector('modal-warning')
                      modal.message = 'El campo de contraseña no puede contener más de 65 caracteres.'
                      modal.title = 'Error de validación'
                      modal.open = true
                    }
                    else {

                      // Esto es con el fin de verificar si has sido selecionado la opcion de empleado o encargado de distritito y asi asociar el usuario
                      if (this.#empleadoRadio.checked) {
                        //En caso de que se haya seleccionado la opcion de asesor
                        if (this.#asesorRadio.checked) {
                          //Validacion de si se ha seleccionado un asesor, se verifica si es igual a 0 se mostrara un modal de error
                          if (this.#asesor.value === '0') {
                            const modal = document.querySelector('modal-warning')
                            modal.message = 'Debe seleccionar un asesor para poder agregar un usuario.'
                            modal.title = 'Error de validación'
                            modal.open = true
                          }

                          else {
                            //Ahora se verifica si se ha seleccionado un distrito judicial, se verifica si es igual a 0 se mostrara un modal de error
                            if (this.#distrito2.value === '0') {
                              const modal = document.querySelector('modal-warning')
                              modal.message = 'Debe seleccionar un distrito judicial para poder agregar un usuario.'
                              modal.title = 'Error de validación'
                              modal.open = true
                              this.resetRadioAndSelect();

                            } else {

                              const nombre_asesor_select = await this.#api.getAsesorID(JSON.parse(this.#asesor.value).id_asesor);
                              // Construye la expresión regular para el nombre completo del asesor
                              const nombreCompletoRegex = new RegExp(
                                `${nombreInput}\\s*${apellidoMaternoInput}\\s*${apellidoPaternoInput}`
                              );
                              //El nombre del asesor seleccionado no coincide con el nombre ingresado se mostrara un modal de error
                              if (!nombreCompletoRegex.test(nombre_asesor_select.asesor.nombre_asesor)) {
                                const modal = document.querySelector('modal-warning');
                                modal.message = 'El nombre del asesor seleccionado no coincide con el nombre ingresado.';
                                modal.title = 'Error de validación';
                                modal.open = true;
                              } else {
                                // Resto del código si la validación pasa
                                const usuario = {
                                  nombre: nombreInput,
                                  paterno: apellidoPaternoInput,
                                  materno: apellidoMaternoInput,
                                  correo: correoInput,
                                  password: passwordInput,
                                  id_distrito_judicial: this.#distrito2.value,
                                  id_empleado: JSON.parse(this.#asesor.value).id_asesor,
                                  estatus_general: estatusUsuarioInput.toUpperCase(),
                                  id_tipouser: 2
                                };
                                try {
                                  const response = await this.#api.postUsuario(usuario);
                                  if (response) {
                                    this.#nombre.value = '';
                                    this.#apellidoPaterno.value = '';
                                    this.#apellidoMaterno.value = '';
                                    this.#correo.value = '';
                                    this.#password.value = '';
                                    this.#estatusUsuario.value = '0';
                                    //Llamada a la función de mostrar usuarios
                                    this.mostrarUsuarios();
                                    //Llamada a la función de reseteo de radio y select
                                    this.resetRadioAndSelect();
                                  }
                                } catch (error) {
                                  console.error('Error al agregar un nuevo usuario:', error);
                                  const modal = document.querySelector('modal-warning')
                                  modal.setOnCloseCallback(() => {
                                    if (modal.open === 'false') {
                                      window.location = '/index.html'
                                    }

                                  })
                                  modal.message = 'No se pudo agregar el usuario, por favor intente más tarde o verifique el status del servidor'
                                  modal.title = 'Error de conexión'
                                  modal.open = true
                                }
                              }
                            }
                          }
                        }
                        //En caso de que se haya seleccionado la opcion de defensor
                        else if (this.#defensorRadio.checked) {
                          //Validacion de si se ha seleccionado un defensor, se verifica si es igual a 0 se mostrara un modal de error
                          if (this.#defensor.value === '0') {
                            const modal = document.querySelector('modal-warning')
                            modal.message = 'Debe seleccionar un defensor para poder agregar un usuario.'
                            modal.title = 'Error de validación'
                            modal.open = true
                          } else {
                            //Ahora se verifica si se ha seleccionado un distrito judicial, se verifica si es igual a 0 se mostrara un modal de error
                            if (this.#distrito2.value === '0') {
                              const modal = document.querySelector('modal-warning')
                              modal.message = 'Debe seleccionar un distrito judicial para poder agregar un usuario.'
                              modal.title = 'Error de validación'
                              modal.open = true
                              //Se llama a la funcion de reseteo de radio y select
                              this.resetRadioAndSelect();
                            } else {
                              const nombre_defensor_select = await this.#api.getDefensorID(JSON.parse(this.#defensor.value).id_defensor);


                              const nombreCompletoRegex = new RegExp(
                                `${nombreInput}\\s*${apellidoMaternoInput}\\s*${apellidoPaternoInput}`
                              );

                              // Se verifica si el nombre del defensor seleccionado no coincide con el nombre ingresado se mostrara un modal de error
                              if (!nombreCompletoRegex.test(nombre_defensor_select.defensor.nombre_defensor)) {
                                const modal = document.querySelector('modal-warning');
                                modal.message = 'El nombre del defensor seleccionado no coincide con el nombre ingresado.';
                                modal.title = 'Error de validación';
                                modal.open = true;
                              } else {
                                // Resto del código si la validación pasa
                                const usuario = {
                                  nombre: nombreInput,
                                  paterno: apellidoPaternoInput,
                                  materno: apellidoMaternoInput,
                                  correo: correoInput,
                                  password: passwordInput,
                                  id_distrito_judicial: this.#distrito2.value,
                                  id_empleado: JSON.parse(this.#defensor.value).id_defensor,
                                  estatus_general: estatusUsuarioInput.toUpperCase(),
                                  id_tipouser: 3
                                };
                                try {
                                  const response = await this.#api.postUsuario(usuario);
                                  if (response) {
                                    this.#nombre.value = '';
                                    this.#apellidoPaterno.value = '';
                                    this.#apellidoMaterno.value = '';
                                    this.#correo.value = '';
                                    this.#password.value = '';
                                    this.#estatusUsuario.value = '0';
                                    this.mostrarUsuarios();
                                    this.resetRadioAndSelect();

                                  }
                                } catch (error) {
                                  console.error('Error al agregar un nuevo usuario:', error);
                                  const modal = document.querySelector('modal-warning')
                                  modal.setOnCloseCallback(() => {
                                    if (modal.open === 'false') {
                                      window.location = '/index.html'
                                    }
                                  })
                                  modal.message = 'No se pudo agregar el usuario, por favor intente más tarde o verifique el status del servidor'
                                  modal.title = 'Error de conexión'
                                  modal.open = true

                                }
                              }
                            }
                          }
                        }
                      }
                      //En caso de que se haya seleccionado la opcion de distrito judicial 
                      else if (this.#distritoRadio.checked) {
                        //Validacion de si se ha seleccionado un distrito judicial, se verifica si es igual a 0 se mostrara un modal de error
                        if (this.#distrito.value === '0') {
                          const modal = document.querySelector('modal-warning')
                          modal.message = 'Debe seleccionar un distrito judicial para poder agregar un usuario.'
                          modal.title = 'Error de validación'
                          modal.open = true
                          //Se llama a la funcion de reseteo de radio y select
                          this.resetRadioAndSelect();
                        } else {
                          //Resto del código si la validación pasa
                          const usuario = {
                            nombre: nombreInput,
                            paterno: apellidoPaternoInput,
                            materno: apellidoMaternoInput,
                            correo: correoInput,
                            password: passwordInput,
                            id_distrito_judicial: this.#distrito.value,
                            estatus_general: estatusUsuarioInput.toUpperCase(),
                            id_tipouser: 1
                          };
                          try {
                            const response = await this.#api.postUsuario(usuario);
                            if (response) {
                              this.#nombre.value = '';
                              this.#apellidoPaterno.value = '';
                              this.#apellidoMaterno.value = '';
                              this.#correo.value = '';
                              this.#password.value = '';
                              this.#estatusUsuario.value = '0';
                              this.mostrarUsuarios();
                              this.resetRadioAndSelect();
                            }
                          } catch (error) {
                            console.error('Error al agregar un nuevo usuario:', error);
                            const modal = document.querySelector('modal-warning')
                            modal.setOnCloseCallback(() => {
                              if (modal.open === 'false') {
                                window.location = '/index.html'
                              }
                            })
                            modal.message = 'No se pudo agregar el usuario, por favor intente más tarde o verifique el status del servidor'
                            modal.title = 'Error de conexión'
                            modal.open = true
                          }
                        }
                      }
                    }

        }

      } catch (error) {
        console.error('Error al agregar un nuevo usuario:', error);
      }
    } else {
      //Mensaje de error en caso de que se haya seleccionado un usuario previamente
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un nuevo usuario si ya se ha seleccionado uno, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#nombre.value = '';
      this.#apellidoPaterno.value = '';
      this.#apellidoMaterno.value = '';
      this.#correo.value = '';
      this.#password.value = '';
      this.#estatusUsuario.value = '0';
      this.#idSeleccion = null;
      this.mostrarUsuarios();
      this.resetRadioAndSelect();
      this.liberarRadioAndSelect();

    }
  }

  // Metodo que se encarga de bloquear los radio select y listas con el fin de que no se puedan modificar cuando estos se editen
  bloquearRadioAndSelect = () => {
    this.#empleadoRadio.disabled = true;
    this.#distritoRadio.disabled = true;
    this.#asesorRadio.disabled = true;
    this.#defensorRadio.disabled = true;
    this.#distrito.disabled = true;
    this.#asesor.disabled = true;
    this.#defensor.disabled = true;
    this.#distrito2.disabled = true;
  }
  // Metodo que se encarga de liberar los radio select y listas con el fin de que se puedan modificar cuando estos se editen
  liberarRadioAndSelect = () => {
    this.#empleadoRadio.disabled = false;
    this.#distritoRadio.disabled = false;
    this.#asesorRadio.disabled = false;
    this.#defensorRadio.disabled = false;
    this.#distrito.disabled = false;
    this.#asesor.disabled = false;
    this.#defensor.disabled = false;
    this.#distrito2.disabled = false;
  }

  //Funcion encargada de activar a su estado los radio y select cuando se agrega o actualiza un usuario
  resetRadioAndSelect = () => {
    this.#empleadoRadio.checked = false;
    this.#distritoRadio.checked = false;
    this.#asesorRadio.checked = false;
    this.#defensorRadio.checked = false;
    this.#distrito.value = '0';
    this.#asesor.value = '0';
    this.#defensor.value = '0';
    this.#distrito2.value = '0';

    this.#bloqueOpciones.classList.add('hidden');
    this.#bloqueDistrito.classList.add('hidden');
    this.#bloqueAsesor.classList.add('hidden');
    this.#bloqueDefensor.classList.add('hidden');

    this.#empleadoRadio.checked = true;
    this.#asesorRadio.checked = true;
    this.#bloqueOpciones.classList.remove('hidden');
    this.#bloqueAsesor.classList.remove('hidden');

  }

  //Metodo encargado de editar un usuario 
  editarUsuario = async () => {
    //Variable que contiene el id de seleccion de usuario y que nos sirve para verificar si previamente se ha seleccionado un usuario
    const usuarioID = this.#idSeleccion;
    if (usuarioID === null) {
      //Mensaje de error en caso de que no se haya seleccionado un usuario previamente
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un usuario para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //  console.log("Paso validaciones 1")
      //Variables que contienen los valores de los campos del formulario
      const nombreInput = this.#nombre.value;
      const apellidoPaternoInput = this.#apellidoPaterno.value;
      const apellidoMaternoInput = this.#apellidoMaterno.value;
      const correoInput = this.#correo.value;
      const passwordInput = this.#password.value;
      const estatusUsuarioInput = this.#estatusUsuario.value;

      try {
        //Validacion del nombre del usuario si esta vacio se mostrara un modal de error
        if (nombreInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de nombre es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del apellido paterno del usuario si esta vacio se mostrara un modal de error
        if (apellidoPaternoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de apellido paterno es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del apellido materno del usuario si esta vacio se mostrara un modal de error
        if (apellidoMaternoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de apellido materno es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }

        //Validacion del correo del usuario si esta vacio se mostrara un modal de error
        if (correoInput === '') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de correo electrónico es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }


        //Validacion del estatus del usuario si esta vacio se mostrara un modal de error
        if (estatusUsuarioInput === '0') {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de estatus de usuario es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        //   console.log("Paso validaciones 2")

        //En caso de que los campos no esten vacios se procede a realizar las validaciones de longitud y formato
        if (nombreInput !== '' && apellidoPaternoInput !== '' && apellidoMaternoInput !== '' && correoInput !== '' && estatusUsuarioInput !== '0') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          //    console.log("Paso validaciones 3")
          //Validacion de la longitud del nombre del usuario si es mayor a 45 caracteres se mostrara un modal de error
          if (nombreInput.length > 45) {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de nombre no puede contener más de 45 caracteres.'
            modal.title = 'Error de validación'
            modal.open = true
          } else
            //Validacion de la longitud del apellido paterno del usuario si es mayor a 45 caracteres se mostrara un modal de error
            if (apellidoPaternoInput.length > 45) {
              const modal = document.querySelector('modal-warning')
              modal.message = 'El campo de apellido paterno no puede contener más de 45 caracteres.'
              modal.title = 'Error de validación'
              modal.open = true

            } else
              // Validacion de la longitud del apellido materno del usuario si es mayor a 45 caracteres se mostrara un modal de error
              if (apellidoMaternoInput.length > 45) {
                const modal = document.querySelector('modal-warning')
                modal.message = 'El campo de apellido materno no puede contener más de 45 caracteres.'
                modal.title = 'Error de validación'
                modal.open = true
              }
              else
                //Validacion de la longitud del correo del usuario si es mayor a 45 caracteres se mostrara un modal de error
                if (correoInput.length > 45) {
                  const modal = document.querySelector('modal-warning')
                  modal.message = 'El campo de correo electrónico no puede contener más de 45 caracteres.'
                  modal.title = 'Error de validación'
                  modal.open = true
                }
                else
                  //Validacion del formato del correo del usuario si no cumple con el formato se mostrara un modal de error
                  if (!emailRegex.test(correoInput)) {
                    const modal = document.querySelector('modal-warning')
                    modal.message = 'El correo electrónico no es válido.'
                    modal.title = 'Error de validación'
                    modal.open = true

                  }
                  else {
                    // console.log("Paso validaciones 4")
                    //En caso de que se haya seleccionado la opcion de empleado se procedara a realizar las validaciones correspondientes
                    if (this.#empleadoRadio.checked) {
                      //En caso de que se haya seleccionado la opcion de asesor
                      if (this.#asesorRadio.checked) {

                        //Validacion de si se ha seleccionado un asesor, se verifica si es igual a 0 se mostrara un modal de error
                        if (this.#asesor.value === '0') {
                          const modal = document.querySelector('modal-warning')
                          modal.message = 'Debe seleccionar un asesor para poder editar un usuario.'
                          modal.title = 'Error de validación'
                          modal.open = true
                        }

                        else {
                          //  console.log("Paso validaciones 5")
                          //Ahora se verifica si se ha seleccionado un distrito judicial, se verifica si es igual a 0 se mostrara un modal de error
                          if (this.#distrito2.value === '0') {
                            const modal = document.querySelector('modal-warning')
                            modal.message = 'Debe seleccionar un distrito judicial para poder editar un usuario.'
                            modal.title = 'Error de validación'
                            modal.open = true

                          } else {
                            //Datos del usuario a editar
                            const usuario = {
                              id_usuario: usuarioID,
                              nombre: nombreInput,
                              paterno: apellidoPaternoInput,
                              materno: apellidoMaternoInput,
                              correo: correoInput,
                              id_distrito_judicial: parseInt(this.#distrito2.value),
                              id_empleado: JSON.parse(this.#asesor.value).id_asesor,
                              estatus_general: estatusUsuarioInput.toUpperCase(),
                              id_tipouser: 2
                            };
                            const nombre_asesor_select = await this.#api.getAsesorID(JSON.parse(this.#asesor.value).id_asesor);
                            // Construye la expresión regular para el nombre completo del asesor
                            const nombreCompletoRegex = new RegExp(
                              `${nombreInput}\\s*${apellidoMaternoInput}\\s*${apellidoPaternoInput}`
                            );

                            //El nombre del asesor seleccionado no coincide con el nombre ingresado se mostrara un modal de error
                            if (!nombreCompletoRegex.test(nombre_asesor_select.asesor.nombre_asesor)) {
                              const modal = document.querySelector('modal-warning');
                              modal.message = 'El nombre del asesor seleccionado no coincide con el nombre ingresado.';
                              modal.title = 'Error de validación';
                              modal.open = true;
                            } else {
                              //   console.log("Paso validaciones 6")
                              const usuario_pre = await this.#api.getUsuarioByID(usuarioID);
                              const usuario_objet_find = usuario_pre.usuario;

                              //Validacion de si los datos del usuario son iguales a los actuales se mostrara un modal de error
                              if (usuario.nombre === usuario_objet_find.nombre && usuario.paterno === usuario_objet_find.paterno && usuario.materno === usuario_objet_find.materno && usuario.correo === usuario_objet_find.correo && usuario.id_distrito_judicial === usuario_objet_find.id_distrito_judicial && usuario.id_empleado === usuario_objet_find.id_empleado && usuario.estatus_general === usuario_objet_find.estatus_general && usuario.id_tipouser === usuario_objet_find.tipo_user.id_tipouser) {

                                const modal = document.querySelector('modal-warning')
                                modal.message = 'No se ha realizado ningún cambio en el usuario,. ya que los datos son iguales a los actuales, se eliminaran los campos.'
                                modal.title = 'Error de validación'
                                modal.open = true
                                this.#nombre.value = '';
                                this.#apellidoPaterno.value = '';
                                this.#apellidoMaterno.value = '';
                                this.#correo.value = '';
                                this.#password.value = '';
                                this.#estatusUsuario.value = '0';
                                this.liberarRadioAndSelect();
                                this.resetRadioAndSelect();

                              }
                              else {

                                //   console.log("Paso validaciones 7")
                                try {
                                  const response = await this.#api.putUsuario(this.#idSeleccion, usuario);
                                  if (response) {
                                    this.#nombre.value = '';
                                    this.#apellidoPaterno.value = '';
                                    this.#apellidoMaterno.value = '';
                                    this.#correo.value = '';
                                    this.#password.value = '';
                                    this.#estatusUsuario.value = '0';
                                    this.mostrarUsuarios();
                                    this.liberarRadioAndSelect();
                                    this.resetRadioAndSelect();
                                  }
                                } catch (error) {
                                  console.error('Error al editar un usuario:', error);
                                  const modal = document.querySelector('modal-warning')
                                  modal.setOnCloseCallback(() => {
                                    if (modal.open === 'false') {
                                      window.location = '/index.html'
                                    }
                                  })
                                  modal.message = 'No se pudo editar el usuario, por favor intente más tarde o verifique el status del servidor'
                                  modal.title = 'Error de conexión'
                                  modal.open = true

                                }
                              }
                            }

                          }

                        }
                      }
                      else
                        //En caso de que se haya seleccionado la opcion de defensor
                        if (this.#defensorRadio.checked) {
                          //Validacion de si se ha seleccionado un defensor, se verifica si es igual a 0 se mostrara un modal de error
                          if (this.#defensor.value === '0') {
                            const modal = document.querySelector('modal-warning')
                            modal.message = 'Debe seleccionar un defensor para poder editar un usuario.'
                            modal.title = 'Error de validación'
                            modal.open = true
                          } else {
                            //Ahora se verifica si se ha seleccionado un distrito judicial, se verifica si es igual a 0 se mostrara un modal de error
                            if (this.#distrito2.value === '0') {
                              //Mensaje de error
                              const modal = document.querySelector('modal-warning')
                              modal.message = 'Debe seleccionar un distrito judicial para poder editar un usuario.'
                              modal.title = 'Error de validación'
                              modal.open = true
                            } else {
                              //Datos del usuario a editar
                              const usuario = {
                                id_usuario: usuarioID,
                                nombre: nombreInput,
                                paterno: apellidoPaternoInput,
                                materno: apellidoMaternoInput,
                                correo: correoInput,
                                id_distrito_judicial: parseInt(this.#distrito2.value),
                                id_empleado: JSON.parse(this.#defensor.value).id_defensor,
                                estatus_general: estatusUsuarioInput.toUpperCase(),
                                id_tipouser: 3
                              };

                              const nombre_defensor_select = await this.#api.getDefensorID(JSON.parse(this.#defensor.value).id_defensor);


                              const nombreCompletoRegex = new RegExp(
                                `${nombreInput}\\s*${apellidoMaternoInput}\\s*${apellidoPaternoInput}`
                              );

                              //El nombre del defensor seleccionado no coincide con el nombre ingresado se mostrara un modal de error
                              if (!nombreCompletoRegex.test(nombre_defensor_select.defensor.nombre_defensor)) {
                                const modal = document.querySelector('modal-warning');
                                modal.message = 'El nombre del defensor seleccionado no coincide con el nombre ingresado.';
                                modal.title = 'Error de validación';
                                modal.open = true;
                              } else {
                                const usuario_pre = await this.#api.getUsuarioByID(usuarioID);
                                const usuario_objet_find = usuario_pre.usuario;

                                //Validacion de si los datos del usuario son iguales a los actuales se mostrara un modal de error
                                if (usuario.nombre === usuario_objet_find.nombre && usuario.paterno === usuario_objet_find.paterno && usuario.materno === usuario_objet_find.materno && usuario.correo === usuario_objet_find.correo && usuario.id_distrito_judicial === usuario_objet_find.id_distrito_judicial && usuario.id_empleado === usuario_objet_find.id_empleado && usuario.estatus_general === usuario_objet_find.estatus_general && usuario.id_tipouser === usuario_objet_find.tipo_user.id_tipouser) {
                                  const modal = document.querySelector('modal-warning')
                                  modal.message = 'No se ha realizado ningún cambio en el usuario,. ya que los datos son iguales a los actuales, se eliminaran los campos.'
                                  modal.title = 'Error de validación'
                                  modal.open = true
                                  this.#nombre.value = '';
                                  this.#apellidoPaterno.value = '';
                                  this.#apellidoMaterno.value = '';
                                  this.#correo.value = '';
                                  this.#password.value = '';
                                  this.#estatusUsuario.value = '0';
                                  this.liberarRadioAndSelect();
                                  this.resetRadioAndSelect();
                                }
                                else {
                                  try {
                                    //Llamada a la funcion de editar usuario del api
                                    const response = await this.#api.putUsuario(this.#idSeleccion, usuario);
                                    if (response) {
                                      this.#nombre.value = '';
                                      this.#apellidoPaterno.value = '';
                                      this.#apellidoMaterno.value = '';
                                      this.#correo.value = '';
                                      this.#password.value = '';
                                      this.#estatusUsuario.value = '0';
                                      this.mostrarUsuarios();
                                      this.liberarRadioAndSelect();
                                      this.resetRadioAndSelect();

                                    }
                                  } catch (error) {
                                    console.error('Error al editar un usuario:', error);
                                    const modal = document.querySelector('modal-warning')
                                    modal.setOnCloseCallback(() => {
                                      if (modal.open === 'false') {
                                        window.location = '/index.html'
                                      }
                                    })
                                    modal.message = 'No se pudo editar el usuario, por favor intente más tarde o verifique el status del servidor'
                                    modal.title = 'Error de conexión'
                                    modal.open = true


                                  }
                                }
                              }
                            }
                          }
                        }

                    } else
                      //En caso de que se haya seleccionado la opcion de distrito judicial
                      if (this.#distritoRadio.checked) {
                        //Validacion de si se ha seleccionado un distrito judicial, se verifica si es igual a 0 se mostrara un modal de error
                        if (this.#distrito.value === '0') {
                          const modal = document.querySelector('modal-warning')
                          modal.message = 'Debe seleccionar un distrito judicial para poder editar un usuario.'
                          modal.title = 'Error de validación'
                          modal.open = true
                          this.liberarRadioAndSelect();
                          this.resetRadioAndSelect();
                        } else {
                          //Datos del usuario a editar
                          const usuario = {
                            id_usuario: usuarioID,
                            nombre: nombreInput,
                            paterno: apellidoPaternoInput,
                            materno: apellidoMaternoInput,
                            correo: correoInput,
                            id_distrito_judicial: parseInt(this.#distrito.value),
                            estatus_general: estatusUsuarioInput.toUpperCase(),
                            id_tipouser: 1
                          };
                          const usuario_pre = await this.#api.getUsuarioByID(usuarioID);
                          const usuario_objet_find = usuario_pre.usuario;

                          //Validacion de si los datos del usuario son iguales a los actuales se mostrara un modal de error
                          if (usuario.nombre === usuario_objet_find.nombre && usuario.paterno === usuario_objet_find.paterno && usuario.materno === usuario_objet_find.materno && usuario.correo === usuario_objet_find.correo && usuario.id_distrito_judicial === usuario_objet_find.id_distrito_judicial && usuario.estatus_general === usuario_objet_find.estatus_general && usuario.id_tipouser === usuario_objet_find.tipo_user.id_tipouser) {
                            const modal = document.querySelector('modal-warning')
                            modal.message = 'No se ha realizado ningún cambio en el usuario,. ya que los datos son iguales a los actuales, se eliminaran los campos.'
                            modal.title = 'Error de validación'
                            modal.open = true
                            this.#nombre.value = '';
                            this.#apellidoPaterno.value = '';
                            this.#apellidoMaterno.value = '';
                            this.#correo.value = '';
                            this.#password.value = '';
                            this.#estatusUsuario.value = '0';
                            this.liberarRadioAndSelect();
                            this.resetRadioAndSelect();
                          }
                          else {
                            try {
                              const response = await this.#api.putUsuario(this.#idSeleccion, usuario);
                              if (response) {
                                this.#nombre.value = '';
                                this.#apellidoPaterno.value = '';
                                this.#apellidoMaterno.value = '';
                                this.#correo.value = '';
                                this.#password.value = '';
                                this.#estatusUsuario.value = '0';
                                this.mostrarUsuarios();
                                this.liberarRadioAndSelect();
                                this.resetRadioAndSelect();
                              }
                            } catch (error) {
                              console.error('Error al editar un usuario:', error);
                              const modal = document.querySelector('modal-warning')
                              modal.setOnCloseCallback(() => {
                                if (modal.open === 'false') {
                                  window.location = '/index.html'
                                }
                              })
                              modal.message = 'No se pudo editar el usuario, por favor intente más tarde o verifique el status del servidor'
                              modal.title = 'Error de conexión'
                              modal.open = true
                            }
                          }
                        }
                      }

                  }

        }

      } catch (error) {
        console.error('Error al editar un usuario:', error);
      }
    }

  }

  //Metodo encargado de mostrar los usuarios en la tabla
  mostrarUsuarios = async () => {

    try { 
      //LLamada a la funcion de obtener usuarios del api 
      const usuarios = await this.#api.getUsuarios();
      const tableBody = this.#usuarios;
      tableBody.innerHTML = '';
      const lista = usuarios.usuarios;
      //Recorrido de la lista de usuarios
      const funcion =
        lista.forEach(usuario => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <tr id="usuario-${usuario.id_usuario}">
              <td class="px-6 py-4 whitespace-nowrap">${usuario.id_usuario}</td>
              <td class="px-6 py-4 whitespace-nowrap">${usuario.nombre}</td>
              <td class="px-6 py-4 whitespace-nowrap">${usuario.paterno}</td>
              <td class="px-6 py-4 whitespace-nowrap">${usuario.materno}</td>
              <td class="px-6 py-4 whitespace-nowrap">${usuario.tipo_user.tipo_usuario}</td>
              <td class="px-6 py-4 whitespace-nowrap">${usuario.id_distrito_judicial}</td>
              <td class="px-6 py-4 whitespace-nowrap">${usuario.estatus_general}</td>
              <td class="px-6 py-4 whitespace-nowrap">
              <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-usuario" onclick="llamarActivarBotonSeleccionar(this.value)" value="${usuario.id_usuario}">
              Seleccionar
            </button>
          
              </td>
          </tr>
              `;
          tableBody.appendChild(row);
        });
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }


  }

  //Metodo encargado de activar el boton de seleccionar usuario, y bloquear o esconder los radio y select correspondientes con respecto al usuario seleccionado
  activarBotonSeleccionar = async usuarioId => {

    try {

      //Llamada a la funcion de obtener usuario por id del api
      const usuarioID = await this.#api.getUsuarioByID(usuarioId);

      if (usuarioID) {
         
        //Se asigna el id de seleccion de usuario
        this.#idSeleccion = usuarioID.usuario.id_usuario;
        this.#nombre.value = usuarioID.usuario.nombre;
        this.#apellidoPaterno.value = usuarioID.usuario.paterno;
        this.#apellidoMaterno.value = usuarioID.usuario.materno;
        this.#correo.value = usuarioID.usuario.correo;
        this.#estatusUsuario.value = usuarioID.usuario.estatus_general;
        //Se verifica el tipo de usuario para activar los radio y select correspondientes con respecto al asesor
        if (usuarioID.usuario.tipo_user.tipo_usuario === 'ASESOR') {
          this.#asesorRadio.checked = true;
          this.#empleadoRadio.checked = true;
          this.#distrito2.value = usuarioID.usuario.id_distrito_judicial;
          const options = this.#asesor.options;
         //Esto con el fin de obtener o verificar el asesor seleccionado previamente
          for (let i = 0; i < options.length; i++) {
            if (i !== 0) {
              const optionValue = JSON.parse(options[i].value);
              if (optionValue.id_asesor === usuarioID.usuario.id_empleado) {
                this.#asesor.selectedIndex = i;
                break;
              }
            }
          }
          this.#bloqueOpciones.classList.remove('hidden');
          this.#bloqueDistrito.classList.add('hidden');
          this.#bloqueAsesor.classList.remove('hidden');
          this.#bloqueDefensor.classList.add('hidden');

        } else
         //Se verifica el tipo de usuario para activar los radio y select correspondientes con respecto al defensor
        if (usuarioID.usuario.tipo_user.tipo_usuario === 'DEFENSOR') {
          this.#defensorRadio.checked = true;
          this.#empleadoRadio.checked = true;
          this.#distrito2.value = usuarioID.usuario.id_distrito_judicial;
          const options = this.#defensor.options;
          //Esto con el fin de obtener o verificar el defensor seleccionado previamente
          for (let i = 0; i < options.length; i++) {
            if (i !== 0) {
              const optionValue = JSON.parse(options[i].value);
              if (optionValue.id_defensor === usuarioID.usuario.id_empleado) {
                this.#defensor.selectedIndex = i;
                break;
              }
            }
          }
          this.#bloqueOpciones.classList.remove('hidden');
          this.#bloqueDistrito.classList.add('hidden');
          this.#bloqueAsesor.classList.add('hidden');
          this.#bloqueDefensor.classList.remove('hidden');


        } else 
        //Se verifica el tipo de usuario para activar los radio y select correspondientes con respecto al distrito judicial
        if (usuarioID.usuario.tipo_user.tipo_usuario === 'SUPERVISOR') {
          this.#distritoRadio.checked = true;
          this.#distrito.value = usuarioID.usuario.id_distrito_judicial;
          this.#bloqueOpciones.classList.add('hidden');
          this.#bloqueDistrito.classList.remove('hidden');
          this.#bloqueAsesor.classList.add('hidden');
          this.#bloqueDefensor.classList.add('hidden');

        }
        //Se bloquean los radio y select para que no se puedan modificar
        this.bloquearRadioAndSelect();

      } else {
        console.error('El usuario con el ID proporcionado no existe.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
    }
  }




}

customElements.define('usuarios-tab', UsuariosTab);

