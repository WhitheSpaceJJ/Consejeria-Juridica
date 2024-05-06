import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/seguimientoProceso/prueba.html')
).text()
template.innerHTML = html

export class Prueba extends HTMLElement {

  //Variables privadas de la clase 
  #api

  #idPrueba
  #prueba
  #pruebas
  #tablePruebas

  #botonAgregarPrueba
  #botonEditarPrueba

   
//Metodo que se ejecuta cuando se quiere obtener el valor de un atributo 
  static get observedAttributes() {
    return ['id', 'data']
  }

  //Metodo que obtiene el valor del atributo de ID
  get id() {
    return this.getAttribute('id')
  }

  //Metodo que establece el valor del atributo de ID
  set id(value) {
    this.setAttribute('id', value)
  }

  //Metodo que retorna el valor del atributo de DATA
  get data() {
    const pruebas = this.#pruebas
    return { pruebas: pruebas }
  }

  //Metodo que establece el valor del atributo de DATA
  set data(value) {
    this.#pruebas = value
    this.mostrarPruebas()
    this.setAttribute('data', value)
  }

  //Constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    //Inicialización de las variables privadas
    this.#api = new APIModel()
    this.#idPrueba = null
    this.#pruebas = []
//Llamado al metodo que se encarga de manejar los campos del formulario
    this.manageFormFields()
    //LLamado al metodo que se encarga de llenar los campos del formulario
    this.fillInputs()
  }

//Metodo que se encarga de llamar al metodo que se encarga de llenar los eventos de los botones
  fillInputs() {
    this.agregarEventosBotones()
  }


  //Metodo que se encarga de llenar los eventos de los botones
  agregarEventosBotones = () => {

    //Se añaade el evento de click al boton de agregar prueba
    this.#botonAgregarPrueba.addEventListener('click', this.agregarPrueba)
    //Se añaade el evento de click al boton de editar prueba
    this.#botonEditarPrueba.addEventListener('click', this.editarPrueba)
     //Obtenemos todos los botones de seleccionar prueba creados en el metodo de mostrarPruebas
    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-prueba')

    //Se recorre cada boton de seleccionar prueba y se le añade un evento de click
    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const pruebaId = boton.value
        this.#idPrueba = pruebaId
        //Se llama al metodo que activa el boton de seleccionar prueba
        this.activarBotonSeleccionarPrueba(pruebaId)
      })
    })

   //Metodo que se encarga de activar el boton de seleccionar prueba
    const activarBotonSeleccionarPrueba = (pruebaId) => {
      //Llamado al metodo que se encarga de activar el boton de seleccionar prueba
      this.activarBotonSeleccionarPrueba(pruebaId)
    }

    //Se añade la funcion al objeto window para que pueda ser llamada desde el html
    window.activarBotonSeleccionarPrueba = activarBotonSeleccionarPrueba
  }

  //Metodo que se encarga de agregar una prueba
  agregarPrueba = async () => {
//Variable que nos ayuda a determinar se se ha selecionado una prueba de la tabla, y asi poder agregar una nueva o no
    const idPrueba = this.#idPrueba

     //Validamos si se ha seleccionado una prueba de la tabla
    if (idPrueba === null) {
      //Obtenemos el valor del campo de prueba
      const prueba = this.#prueba.value

      //Validamos si el campo de prueba esta vacio
      if (prueba === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de prueba es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else
       //Validamos si el campo de prueba tiene mas de 200 caracteres

        if (prueba.length > 200) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de prueba no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
          //Validamos si el campo de prueba no esta vacio y tiene menos de 200 caracteres
          if (prueba !== '' && prueba.length <= 200) {
            //Creamos un objeto con la descripcion de la prueba
            const pruebaData = {
              descripcion_prueba: prueba
            }
            //Añadimos la prueba al arreglo de pruebas
            this.#pruebas.push(pruebaData)
            //Llamamos al metodo que se encarga de mostrar las pruebas
            this.mostrarPruebas()
            //Limpiamos los campos del formulario
            this.#prueba.value = ''
          } else {
            //Mostramos un mensaje de error si el campo de prueba esta vacio
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de prueba es obligatorio.'
            modal.title = 'Error de validación'
            modal.open = true
          }
        }
    }
    else {
      //Mostramos un mensaje de error si se ha seleccionado una prueba de la tabla
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una prueba si ha selecionado previamente una de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idPrueba = null
      this.#prueba.value = ''
    }
  }

  //Metodo que se encarga de editar una prueba
  editarPrueba = async () => {
    //Obtenemos el id de la prueba seleccionada y asi poder editarla o no
    const idPrueba = this.#idPrueba
    //Validamos si se ha seleccionado una prueba de la tabla
    if (idPrueba === null) {
      //Mostramos un mensaje de error si no se ha seleccionado una prueba de la tabla
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar una prueba para poder editarla.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      //Obtenemos el valor del campo de prueba
      const prueba = this.#prueba.value

      //Validamos si el campo de prueba esta vacio
      if (prueba === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de prueba es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else
//Validamos si el campo de prueba tiene mas de 200 caracteres
        if (prueba.length > 200) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de prueba no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
               
//Validamos si el campo de prueba no esta vacio y tiene menos de 200 caracteres
              if (prueba !== '' && prueba.length <= 200) {
                //Validamos si la prueba seleccionada de la tabla tiene un id de prueba y un id de proceso judicial
          const id_prueba_si_tiene = this.#pruebas[idPrueba - 1].id_prueba
          const id_proceso_judicial_si_tiene = this.#pruebas[idPrueba - 1].id_proceso_judicial
          const pruebaData = {
            id_prueba: id_prueba_si_tiene,
            descripcion_prueba: prueba,
            id_proceso_judicial: id_proceso_judicial_si_tiene
          }
          //Editamos la prueba seleccionada de la tabla
          this.#pruebas[idPrueba - 1] = pruebaData
          //Llamamos al metodo que se encarga de mostrar las pruebas
          this.mostrarPruebas()
          //Limpiamos los campos del formulario
          this.#idPrueba = null
          this.#prueba.value = ''
        } else {
          //Mostramos un mensaje de error si el campo de prueba esta vacio
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de prueba es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        }
    }
  }

  //Metodo que se encarga de mostrar las pruebas
  mostrarPruebas = async () => {


    try {
      //Obtenemos las pruebas
      const pruebas = this.#pruebas
      //Obtenemos el cuerpo de la tabla de pruebas
      const tableBody = this.#tablePruebas
      //Limpiamos el cuerpo de la tabla de pruebas
      tableBody.innerHTML = ''
      //Recorremos las pruebas y las mostramos en la tabla
      const lista = pruebas
      const funcion =
        lista.forEach((prueba, i) => {
          const row = document.createElement('tr')
          row.innerHTML = `
            <tr id="prueba-${i + 1}">
            <td class="px-6 py-4 whitespace-nowrap">${i + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">${prueba.descripcion_prueba}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-prueba" onclick="activarBotonSeleccionarPrueba(this.value)" value="${i + 1}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `
          tableBody.appendChild(row)
        })
    } catch (error) {
      console.error('Error al obtener las pruebas:', error)
    }
  }

  //Metodo que se encarga de activar el boton de seleccionar prueba y asi poder mostrar los datos de la prueba seleccionada
  activarBotonSeleccionarPrueba = async pruebaId => {

    try {
      //Obtenemos la prueba seleccionada
      const prueba = this.#pruebas[pruebaId - 1]
      //Validamos si la prueba seleccionada existe
      if (prueba) {
        //Mostramos los datos de la prueba seleccionada
        this.#idPrueba = pruebaId
        this.#prueba.value = prueba.descripcion_prueba
      } else {
        console.error('La prueba con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener la prueba por ID:', error)
    }
  }

  //Metodo que se encarga de manejar los campos del formulario
  manageFormFields() {
    //Obtenemos los campos del formulario
    this.#prueba = this.shadowRoot.getElementById('prueba')
    this.#tablePruebas = this.shadowRoot.getElementById('table-prueba')
    this.#botonAgregarPrueba = this.shadowRoot.getElementById('agregar-prueba')
    this.#botonEditarPrueba = this.shadowRoot.getElementById('editar-prueba')
//Llamado al metodo que se encarga de manejar la entrada de texto     
    this.manejadorEntradaTexto()
  }

  //Metodo que se encarga de manejar la entrada de texto en el campo de prueba
  manejadorEntradaTexto(){
    var pruebaInput = this.#prueba
    pruebaInput.addEventListener('input', function () {
      if (pruebaInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo prueba no puede tener más de 200 caracteres'
        modal.title = 'Error'
        modal.open = true
      }
    })
  }

  //Metodo que se encarga de mostrar un modal de advertencia
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }

 
}

customElements.define('prueba-promovente', Prueba)
