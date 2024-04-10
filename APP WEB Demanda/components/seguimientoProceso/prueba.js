import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/seguimientoProceso/prueba.html')
).text()
template.innerHTML = html

export class Prueba extends HTMLElement {
  #api

  #idPrueba
  #prueba
  #pruebas
  #tablePruebas

  #botonAgregarPrueba
  #botonEditarPrueba



  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#api = new APIModel()
    this.#idPrueba = null
    this.#pruebas = []

    this.manageFormFields()
    this.fillInputs()

  }
  fillInputs() {
    this.agregarEventosBotones()
  }

  agregarEventosBotones = () => {


    this.#botonAgregarPrueba.addEventListener('click', this.agregarPrueba)
    this.#botonEditarPrueba.addEventListener('click', this.editarPrueba)

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-prueba')

    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const pruebaId = boton.value
        this.#idPrueba = pruebaId
        this.activarBotonSeleccionarPrueba(pruebaId)
      })
    })


    const activarBotonSeleccionarPrueba = (pruebaId) => {
      this.activarBotonSeleccionarPrueba(pruebaId)
    }

    window.activarBotonSeleccionarPrueba = activarBotonSeleccionarPrueba


  }

  agregarPrueba = async () => {

    const idPrueba = this.#idPrueba

    if (idPrueba === null) {
      const prueba = this.#prueba.value

      if (prueba === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de prueba es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else

        if (prueba.length > 200) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de prueba no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
          if (prueba !== '' && prueba.length <= 200) {
            const pruebaData = {
              descripcion_prueba: prueba
            }
            this.#pruebas.push(pruebaData)
            this.mostrarPruebas()
            this.#prueba.value = ''
          } else {
            const modal = document.querySelector('modal-warning')
            modal.message = 'El campo de prueba es obligatorio.'
            modal.title = 'Error de validación'
            modal.open = true
          }
        }
    }
    else {
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar una prueba si ha selecionado previamente una de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idPrueba = null
      this.#prueba.value = ''
    }
  }
  editarPrueba = async () => {
    const idPrueba = this.#idPrueba
    if (idPrueba === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar una prueba para poder editarla.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      const prueba = this.#prueba.value

      if (prueba === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de prueba es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else

        if (prueba.length > 200) {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de prueba no puede contener más de 200 caracteres.'
          modal.title = 'Error de validación'
          modal.open = true
        } else {
          /**
           Mejora esto;      try {
                const id_prueba_si_tiene = this.#pruebas[idPrueba - 1].id_prueba
                const pruebaData = {
                  id_prueba: id_prueba_si_tiene,
                  descripcion_prueba: prueba
                }
                this.#pruebas[idPrueba - 1] = pruebaData
                this.mostrarPruebas()
                this.#idPrueba = null
                this.#prueba.value = ''
              } catch (error) {
                console.error('Error al editar la prueba:', error)
              }
              const pruebaData = {
                descripcion_prueba: prueba
              }
              this.#pruebas[idPrueba - 1] = pruebaData
              this.mostrarPruebas()
              this.#idPrueba = null
              this.#prueba.value = ''
           */

              if (prueba !== '' && prueba.length <= 200) {
          const id_prueba_si_tiene = this.#pruebas[idPrueba - 1].id_prueba
          const id_proceso_judicial_si_tiene = this.#pruebas[idPrueba - 1].id_proceso_judicial
          const pruebaData = {
            id_prueba: id_prueba_si_tiene,
            descripcion_prueba: prueba,
            id_proceso_judicial: id_proceso_judicial_si_tiene
          }
          this.#pruebas[idPrueba - 1] = pruebaData
          this.mostrarPruebas()
          this.#idPrueba = null
          this.#prueba.value = ''
        } else {
          const modal = document.querySelector('modal-warning')
          modal.message = 'El campo de prueba es obligatorio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
        }
    }
  }
  mostrarPruebas = async () => {


    try {
      const pruebas = this.#pruebas
      const tableBody = this.#tablePruebas
      tableBody.innerHTML = ''
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
  activarBotonSeleccionarPrueba = async pruebaId => {

    try {
      const prueba = this.#pruebas[pruebaId - 1]
      if (prueba) {
        this.#idPrueba = pruebaId
        this.#prueba.value = prueba.descripcion_prueba
      } else {
        console.error('La prueba con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener la prueba por ID:', error)
    }
  }
  manageFormFields() {
    this.#prueba = this.shadowRoot.getElementById('prueba')
    this.#tablePruebas = this.shadowRoot.getElementById('table-prueba')

    this.#botonAgregarPrueba = this.shadowRoot.getElementById('agregar-prueba')
    this.#botonEditarPrueba = this.shadowRoot.getElementById('editar-prueba')

    var pruebaInput = this.#prueba
    pruebaInput.addEventListener('input', function () {
      if (pruebaInput.value === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo prueba no puede estar vacío'
        modal.title = 'Error'
        modal.open = true
      } else if (pruebaInput.value.length > 200) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo prueba no puede tener más de 200 caracteres'
        modal.title = 'Error'
        modal.open = true
      }
    })

  }

  connectedCallback() {

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

  get data() {
    const pruebas = this.#pruebas
    return { pruebas: pruebas }
  }

  set data(value) {
    this.#pruebas = value
    this.mostrarPruebas()
    this.setAttribute('data', value)
  }
}

customElements.define('prueba-promovente', Prueba)
