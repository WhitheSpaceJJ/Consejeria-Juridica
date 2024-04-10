import { APIModel } from '../../models/api.model'

const template = document.createElement('template')

const html = await (
  await fetch('/components/seguimientoProceso/familiar.html')
).text()
template.innerHTML = html

export class FamiliarPromovente extends HTMLElement {
  #api


  #idFamiliar
  #nombreFamiliar
  #parentescoFamiliar
  #nacionalidadFamilar
  #pertenceComunidadLGBTRadioYes
  #pertenceComunidadLGBTRadioNo
  #adultaMayorRadioYes
  #adultaMayorRadioNo
  #saludPrecariaRadioYes
  #saludPrecariaRadioNo
  #pobrezaExtremaRadioYes
  #pobrezaExtremaRadioNo

  #familiares
  #tableFamiliares

  #botonAgregarFamiliar
  #botonEditarFamiliar


  static get observedAttributes() {
    return ['id', 'data']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this.#api = new APIModel()
    this.#idFamiliar = null
    this.#familiares = []
    this.manageFormFields()


    this.fillInputs()
  }

  manageFormFields() {
    this.#tableFamiliares = this.shadowRoot.getElementById('table-familiar')

    this.#parentescoFamiliar = this.shadowRoot.getElementById('parentesco')
    this.#nacionalidadFamilar = this.shadowRoot.getElementById('nacionalidad')
    this.#nombreFamiliar = this.shadowRoot.getElementById('familiar')

    this.#pertenceComunidadLGBTRadioYes = this.shadowRoot.getElementById('lgbt_si')
    this.#pertenceComunidadLGBTRadioNo = this.shadowRoot.getElementById('lgbt_no')
    this.#adultaMayorRadioYes = this.shadowRoot.getElementById('adulto_si')
    this.#adultaMayorRadioNo = this.shadowRoot.getElementById('adulto_no')
    this.#saludPrecariaRadioYes = this.shadowRoot.getElementById('salud_si')
    this.#saludPrecariaRadioNo = this.shadowRoot.getElementById('salud_no')
    this.#pobrezaExtremaRadioYes = this.shadowRoot.getElementById('pobreza_si')
    this.#pobrezaExtremaRadioNo = this.shadowRoot.getElementById('pobreza_no')
    this.#botonAgregarFamiliar = this.shadowRoot.getElementById('agregar-familiar')
    this.#botonEditarFamiliar = this.shadowRoot.getElementById('editar-familiar')

    var parentescoInput = this.#parentescoFamiliar
    var nacionalidadInput = this.#nacionalidadFamilar
    var nombreInput = this.#nombreFamiliar


    parentescoInput.addEventListener('input', function () {
      if (parentescoInput.value === "") {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de parentesco es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else if (parentescoInput.value.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de parentesco no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    })

    nacionalidadInput.addEventListener('input', function () {
      if (nacionalidadInput.value === "") {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nacionalidad es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else if (nacionalidadInput.value.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nacionalidad no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    })

    nombreInput.addEventListener('input', function () {
      if (nombreInput.value === "") {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      }
      else if (nombreInput.value.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }
    })
  }
  fillInputs() {
    this.agregarEventosBotones()
  }
  agregarEventosBotones = () => {

    this.#botonAgregarFamiliar.addEventListener('click', this.agregarFamiliar)
    this.#botonEditarFamiliar.addEventListener('click', this.editarFamiliar)

    const seleccionarBotones = this.shadowRoot.querySelectorAll('.seleccionar-familiar')

    seleccionarBotones.forEach(boton => {
      boton.addEventListener('click', () => {
        const familiarId = boton.value
        this.#idFamiliar = familiarId
        this.activarBotonSeleccionarFamiliar(familiarId)
      })
    })


    const activarBotonSeleccionarFamiliar = (familiarId) => {
      this.activarBotonSeleccionarFamiliar(familiarId)
    }

    window.activarBotonSeleccionarFamiliar = activarBotonSeleccionarFamiliar
  }
  mostrarFamiliares = async () => {

    try {
      const familiares = this.#familiares
      const tableBody = this.#tableFamiliares
      tableBody.innerHTML = ''
      const lista = familiares
      const funcion =
        lista.forEach((familiar, i) => {
          const row = document.createElement('tr')
          row.innerHTML = `
            <tr id="familiar-${i + 1}">
            <td class="px-6 py-4 whitespace-nowrap">${i + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.nombre}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.nacionalidad}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.parentesco}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.perteneceComunidadLGBT ? 'si' : 'no'}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.adultaMayor ? 'si' : 'no'}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.saludPrecaria ? 'si' : 'no'}</td>
            <td class="px-6 py-4 whitespace-nowrap">${familiar.pobrezaExtrema ? 'si' : 'no'}</td>
            <td class="px-6 py-4 whitespace-nowrap">
            <button href="#" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded seleccionar-familiar" onclick="activarBotonSeleccionarFamiliar(this.value)" value="${i + 1}">
            Seleccionar
          </button>
        
            </td>
        </tr>
            `
          tableBody.appendChild(row)
        })
    } catch (error) {
      console.error('Error al obtener los familiares:', error)
    }
  }
  editarFamiliar = async () => {

    const idFamiliar = this.#idFamiliar

    if (idFamiliar === null) {
      const modal = document.querySelector('modal-warning')
      modal.message = 'Debe seleccionar un familiar para poder editarlo.'
      modal.title = 'Error de validación'
      modal.open = true
    }
    else {
      const nombre = this.#nombreFamiliar.value
      const nacionalidad = this.#nacionalidadFamilar.value
      const parentesco = this.#parentescoFamiliar.value
      const perteneceComunidadLGBT = this.#pertenceComunidadLGBTRadioYes.checked
      const adultaMayor = this.#adultaMayorRadioYes.checked
      const saludPrecaria = this.#saludPrecariaRadioYes.checked
      const pobrezaExtrema = this.#pobrezaExtremaRadioYes.checked

      if (nombre === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else if (nombre.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (nacionalidad === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nacionalidad es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else if (nacionalidad.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nacionalidad no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (parentesco === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de parentesco es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else if (parentesco.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de parentesco no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      } else {

        /**
         Verifica que los radios ya sea yex o no esten seleccionados 
         */
        if ((perteneceComunidadLGBT === true || perteneceComunidadLGBT === false) && (adultaMayor === true || adultaMayor === false) && (saludPrecaria === true || saludPrecaria === false) && (pobrezaExtrema === true || pobrezaExtrema === false)) {

         const id_familiar_si_tiene = this.#familiares[idFamiliar - 1].id_familiar
         const id_proceso_judicial_si_tiene = this.#familiares[idFamiliar - 1].id_proceso_judicial
          const familiarData = {
            id_familiar: id_familiar_si_tiene,
            id_proceso_judicial: id_proceso_judicial_si_tiene,
            nombre: nombre,
            nacionalidad: nacionalidad,
            parentesco: parentesco,
            perteneceComunidadLGBT: perteneceComunidadLGBT,
            adultaMayor: adultaMayor,
            saludPrecaria: saludPrecaria,
            pobrezaExtrema: pobrezaExtrema
          }
          this.#familiares[idFamiliar - 1] = familiarData
          this.mostrarFamiliares()
          this.#idFamiliar = null
          this.#nombreFamiliar.value = ''
          this.#nacionalidadFamilar.value = ''
          this.#parentescoFamiliar.value = ''
          this.#pertenceComunidadLGBTRadioYes.checked = false
          this.#pertenceComunidadLGBTRadioNo.checked = false
          this.#adultaMayorRadioYes.checked = false
          this.#adultaMayorRadioNo.checked = false
          this.#saludPrecariaRadioYes.checked = false
          this.#saludPrecariaRadioNo.checked = false
          this.#pobrezaExtremaRadioYes.checked = false
          this.#pobrezaExtremaRadioNo.checked = false

          this.#saludPrecariaRadioYes.checked = true
          this.#pobrezaExtremaRadioYes.checked = true
          this.#pertenceComunidadLGBTRadioYes.checked = true
          this.#adultaMayorRadioYes.checked = true
        } else {
          const modal = document.querySelector('modal-warning')
          modal.message = 'Debe seleccionar una opción en los campos de radio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
      }
    }

  }
  agregarFamiliar = async () => {

    const idFamiliar = this.#idFamiliar

    if (idFamiliar === null) {
      const nombre = this.#nombreFamiliar.value
      const nacionalidad = this.#nacionalidadFamilar.value
      const parentesco = this.#parentescoFamiliar.value
      const perteneceComunidadLGBT = this.#pertenceComunidadLGBTRadioYes.checked
      const adultaMayor = this.#adultaMayorRadioYes.checked
      const saludPrecaria = this.#saludPrecariaRadioYes.checked
      const pobrezaExtrema = this.#pobrezaExtremaRadioYes.checked

      if (nombre === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else if (nombre.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nombre no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }

      if (nacionalidad === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nacionalidad es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else if (nacionalidad.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de nacionalidad no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      }


      if (parentesco === '') {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de parentesco es obligatorio.'
        modal.title = 'Error de validación'
        modal.open = true
      } else if (parentesco.length > 100) {
        const modal = document.querySelector('modal-warning')
        modal.message = 'El campo de parentesco no puede contener más de 100 caracteres.'
        modal.title = 'Error de validación'
        modal.open = true
      } else {
        if ((perteneceComunidadLGBT === true || perteneceComunidadLGBT === false) && (adultaMayor === true || adultaMayor === false) && (saludPrecaria === true || saludPrecaria === false) && (pobrezaExtrema === true || pobrezaExtrema === false)) {

          const familiarData = {
            nombre: nombre,
            nacionalidad: nacionalidad,
            parentesco: parentesco,
            perteneceComunidadLGBT: perteneceComunidadLGBT,
            adultaMayor: adultaMayor,
            saludPrecaria: saludPrecaria,
            pobrezaExtrema: pobrezaExtrema
          }
          this.#familiares.push(familiarData)
          this.mostrarFamiliares()
          this.#nombreFamiliar.value = ''
          this.#nacionalidadFamilar.value = ''
          this.#parentescoFamiliar.value = ''
          this.#pertenceComunidadLGBTRadioYes.checked = false
          this.#pertenceComunidadLGBTRadioNo.checked = false
          this.#adultaMayorRadioYes.checked = false
          this.#adultaMayorRadioNo.checked = false
          this.#saludPrecariaRadioYes.checked = false
          this.#saludPrecariaRadioNo.checked = false
          this.#pobrezaExtremaRadioYes.checked = false
          this.#pobrezaExtremaRadioNo.checked = false

          this.#saludPrecariaRadioYes.checked = true
          this.#pobrezaExtremaRadioYes.checked = true
          this.#pertenceComunidadLGBTRadioYes.checked = true
          this.#adultaMayorRadioYes.checked = true
        } else {
          const modal = document.querySelector('modal-warning')
          modal.message = 'Debe seleccionar una opción en los campos de radio.'
          modal.title = 'Error de validación'
          modal.open = true
        }
      }
    }
    else {
      const modal = document.querySelector('modal-warning')
      modal.message = 'No se puede agregar un familiar si ha seleccionado previamente uno de la tabla, se eliminaran los campos.'
      modal.title = 'Error de validación'
      modal.open = true
      this.#idFamiliar = null
      this.#nombreFamiliar.value = ''
      this.#nacionalidadFamilar.value = ''
      this.#parentescoFamiliar.value = ''
      this.#pertenceComunidadLGBTRadioYes.checked = false
      this.#pertenceComunidadLGBTRadioNo.checked = false
      this.#adultaMayorRadioYes.checked = false
      this.#adultaMayorRadioNo.checked = false
      this.#saludPrecariaRadioYes.checked = false
      this.#saludPrecariaRadioNo.checked = false
      this.#pobrezaExtremaRadioYes.checked = false
      this.#pobrezaExtremaRadioNo.checked = false

      this.#saludPrecariaRadioYes.checked = true
      this.#pobrezaExtremaRadioYes.checked = true
      this.#pertenceComunidadLGBTRadioYes.checked = true
      this.#adultaMayorRadioYes.checked = true
    }
  }
  activarBotonSeleccionarFamiliar = async familiarId => {

    try {
      const familiar = this.#familiares[familiarId - 1]
      if (familiar) {


        this.#idFamiliar = familiarId
        this.#nombreFamiliar.value = familiar.nombre
        this.#nacionalidadFamilar.value = familiar.nacionalidad
        this.#parentescoFamiliar.value = familiar.parentesco
        if (familiar.perteneceComunidadLGBT) {
          this.#pertenceComunidadLGBTRadioYes.checked = true
        }else
        {
          this.#pertenceComunidadLGBTRadioNo.checked = true
        }

         if (familiar.adultaMayor) {
          this.#adultaMayorRadioYes.checked = true
        } else {
          this.#adultaMayorRadioNo.checked = true
        }

        if (familiar.saludPrecaria) {
          this.#saludPrecariaRadioYes.checked = true
        } else {
          this.#saludPrecariaRadioNo.checked = true
        }

        if (familiar.pobrezaExtrema) {
          this.#pobrezaExtremaRadioYes.checked = true
        } else {
          this.#pobrezaExtremaRadioNo.checked = true
        }

      } else {
        console.error('El familiar con el ID proporcionado no existe.')
      }
    } catch (error) {
      console.error('Error al obtener el familiar por ID:', error)

    }
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
    const familiares = this.#familiares
    return {
      familiares: familiares
    }
  }

  set data(value) {
    this.#familiares = value
    this.mostrarFamiliares()
    this.setAttribute('data', value)
  }
}

customElements.define('familiar-promovente', FamiliarPromovente)
