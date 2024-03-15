//import { ValidationError } from '../../lib/errors.js'
//import { validateNonEmptyFields } from '../../lib/utils.js'
//import { APIModel } from '../../models/api.model'
//import '../codigo-postal/codigo-postal.js'

const template = document.createElement('template')

const html = await (
  await fetch('./components/demanda2/registro-tab.html')
).text()
template.innerHTML = html

export class RegistroTab extends HTMLElement {
 /* #api
  #generos
  #motivos
  #estadosCiviles

  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #edad
  #sexo
  #telefono
  #estatusTrabajo
  #ingreso
  #motivo
  #estadoCivil
  #numeroHijos
  #domicilio

  static get observedAttributes() {
    return ['id', 'data']
  }
*/
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'registro'
    this.style.display = 'block'
  //  this.init()
  }

  /*
  async init() {
    this.#api = new APIModel()

    const { generos } = await this.#api.getGeneros()
    this.#generos = generos

    const { motivos } = await this.#api.getMotivos()
    this.#motivos = motivos

    const { estadosCiviles } = await this.#api.getEstadosCiviles()
    this.#estadosCiviles = estadosCiviles

    this.manageFormFields()
    this.fillInputs()
  }

  manageFormFields() {
    this.#nombre = this.shadowRoot.getElementById('nombre')
    this.#apellidoPaterno = this.shadowRoot.getElementById('apellido-paterno')
    this.#apellidoMaterno = this.shadowRoot.getElementById('apellido-materno')
    this.#edad = this.shadowRoot.getElementById('edad')
    this.#sexo = this.shadowRoot.getElementById('sexo')
    this.#telefono = this.shadowRoot.getElementById('telefono')
    this.#motivo = this.shadowRoot.getElementById('motivo')
    this.#estadoCivil = this.shadowRoot.getElementById('estado-civil')
    this.#numeroHijos = this.shadowRoot.getElementById('numero-hijos')
    this.#domicilio = this.shadowRoot.querySelector('cp-comp')
  }

  fillInputs() {
    this.#generos.forEach(genero => {
      const option = document.createElement('option')
      option.value = genero.id_genero
      option.text = genero.descripcion_genero
      this.#sexo.appendChild(option)
    })

    this.#motivos.forEach(motivo => {
      const option = document.createElement('option')
      option.value = motivo.id_motivo
      option.text = motivo.descripcion_motivo
      this.#motivo.appendChild(option)
    })

    this.#estadosCiviles.forEach(estadoCivil => {
      const option = document.createElement('option')
      option.value = estadoCivil.id_estado_civil
      option.text = estadoCivil.estado_civil
      this.#estadoCivil.appendChild(option)
    })
  }

  validateInputs() {
    this.#estatusTrabajo = this.shadowRoot.querySelector(
      'input[name="rb-trabajo"]:checked'
    )?.value
    this.#ingreso = this.shadowRoot.querySelector(
      'input[name="rb-ingreso"]:checked'
    )?.value
    const inputs = [
      this.#nombre.value,
      this.#apellidoPaterno.value,
      this.#apellidoMaterno.value,
      this.#edad.value,
      this.#sexo.value,
      this.#telefono.value,
      this.#estatusTrabajo,
      this.#estadoCivil.value,
      this.#numeroHijos.value,
      this.#domicilio.data.calle,
      this.#domicilio.data.numeroExt,
      this.#domicilio.data.colonia,
    ]
    try {
      var nombrePattern = /^[A-Za-z]+$/;
      if(this.#nombre.value ===''){
        throw new ValidationError('El nombre no puede estar vacío, por favor ingreselo.')
      }
      else if (!nombrePattern.test(this.#nombre.value)) {
        throw new ValidationError('El nombre solo permite letras, verifique su respuesta.')
       } else if (this.#nombre.value.length > 50) {
        throw new ValidationError('El nombre no puede tener más de 50 caracteres, por favor ingreselo correctamente.')
      }



      if(this.#apellidoPaterno.value ===''){
        throw new ValidationError('El apellido paterno no puede estar vacío, por favor ingreselo.')
      }
      else if (!nombrePattern.test(this.#apellidoPaterno.value)) {
        throw new ValidationError('El apellido paterno solo permite letras, verifique su respuesta.')
      }else if (this.#apellidoPaterno.value.length > 50) {
        throw new ValidationError('El apellido paterno no puede tener más de 50 caracteres, por favor ingreselo correctamente.')
      }

      if(this.#apellidoMaterno.value ===''){
        throw new ValidationError('El apellido materno no puede estar vacío, por favor ingreselo.')
      }
      else if (!nombrePattern.test(this.#apellidoMaterno.value)) {
        throw new ValidationError('El apellido materno solo permite letras, verifique su respuesta.')
      } else if (this.#apellidoMaterno.value.length > 50) {
        throw new ValidationError('El apellido materno no puede tener más de 50 caracteres, por favor ingreselo correctamente.')
      }

       
      if(this.#edad.value ===''){
        throw new ValidationError('La edad no puede estar vacía, por favor ingresela.')
      }else if(this.#edad.value > 200){
        throw new ValidationError('La edad no puede ser mayor a 200 años, por favor ingresela verifique su respuesta.')
      }


      if(this.#sexo.value ===''){
        throw new ValidationError('El sexo es obligatorio, por favor seleccione uno.')
      }
      /*
      if(this.#telefono.value ===''){
        throw new ValidationError('El teléfono no puede estar vacío, por favor ingreselo.')
      }
      else 
    
      if(this.#telefono.value !==''){
        if(this.#telefono.value.length > 10){
          throw new ValidationError('El teléfono no debe tener 10 dígitos, por favor ingreselo correctamente.')
        }
      }
   
      if (
        (this.#estatusTrabajo === 'yes' && !this.#ingreso) ||
        (this.#estatusTrabajo === 'no' && !this.#motivo)
      ) {
        throw new ValidationError(
          'Seleccione una opción para el ingreso o el motivo de no trabajar.'
        )
      }
      
      if (this.#estadoCivil.value ===''){
        throw new ValidationError('El estado civil es obligatorio, por favor seleccione uno.')
      }
      if(this.#numeroHijos.value ===''){
        throw new ValidationError('El número de hijos no puede estar vacío, por favor ingreselo.')
      }
      if(this.#domicilio.data.calle ===''){
        throw new ValidationError('La calle no puede estar vacía, por favor ingresela.')
      } else if (this.#domicilio.data.calle.length > 75) {  
        throw new ValidationError('La calle no puede tener más de 75 caracteres, por favor ingresela correctamente.')
      }

      if(this.#domicilio.data.numeroExt ===''){
        throw new ValidationError('El número exterior no puede estar vacío, por favor ingreselo.')
      }else if ( nombrePattern.test(this.#domicilio.data.numeroExt)) {
        throw new ValidationError('El número exterior solo permite números, verifique su respuesta.')
      }else       if(this.#domicilio.data.numeroExt.length > 10){
        throw new ValidationError('El número exterior no debe tener más de 10 dígitos, por favor ingreselo correctamente.')
      }
      if(this.#domicilio.data.numeroInt !==''){
        if (nombrePattern.test(this.#domicilio.data.numeroInt)) {
          throw new ValidationError('El número interior solo permite números, verifique su respuesta.')
        }else
        if (this.#domicilio.data.numeroInt.length > 10) {
          throw new ValidationError('El número interior no puede tener más de 10 caracteres, por favor ingreselo correctamente.')
        }
      }

      if(this.#domicilio.data.colonia ===''){
        throw new ValidationError('La colonia es obligatoria, por favor seleccione una.')
      }

 /*
      if (!validateNonEmptyFields(inputs)) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }
      if (
        (this.#estatusTrabajo === 'yes' && !this.#ingreso) ||
        (this.#estatusTrabajo === 'no' && !this.#motivo)
      ) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      } 

      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        this.#showModal(error.message, 'Error de validación')
      } else {
        console.error(error)
        this.#showModal(
          'Error al registrar el turno, por favor intenta de nuevo',
          'Error'
        )
      }

      return false
    }
  }
  */
  
  connectedCallback() {
     /*
    this.btnNext = this.shadowRoot.getElementById('btn-asesorado-next')
    const radioButtons = this.shadowRoot.querySelectorAll(
      'input[name="rb-trabajo"]'
    )
    const ingresoContainer = this.shadowRoot.getElementById('ingreso-container')
    const motivoContainer = this.shadowRoot.getElementById('motivo-container')

    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', event => {
        if (event.target.value === 'yes') {
          ingresoContainer.classList.remove('hidden')
          ingresoContainer.classList.add('flex')
          motivoContainer.classList.add('hidden')
        } else {
          ingresoContainer.classList.add('hidden')
          ingresoContainer.classList.remove('flex')
          motivoContainer.classList.remove('hidden')
          motivoContainer.classList.add('flex')
        }
      })
    })
  */

  /*
  Este nos sirve para el manejo de tabs
    this.btnNext.addEventListener('click', () => {
      if (!this.validateInputs()) return
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'asesoria' },
      })
      this.dispatchEvent(event)
    })
    */
  }
/*
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
    const asesorado = {
      estatus_trabajo: this.#estatusTrabajo === 'yes',
      numero_hijos: Number(this.#numeroHijos.value),
      ingreso_mensual: Number(this.#ingreso) || null,
      motivo: {
        id_motivo: Number(this.#motivo.value),
      },
      estado_civil: {
        id_estado_civil: Number(this.#estadoCivil.value),
        estado_civil:
          this.#estadoCivil.options[this.#estadoCivil.selectedIndex].text,
      },
    }
    const persona = {
      nombre: this.#nombre.value,
      apellido_paterno: this.#apellidoPaterno.value,
      apellido_materno: this.#apellidoMaterno.value,
      edad: Number(this.#edad.value),
      telefono: this.#telefono.value,
      domicilio: {
        calle_domicilio: this.#domicilio.data.calle,
        numero_exterior_domicilio: this.#domicilio.data.numeroExt,
        numero_interior_domicilio: this.#domicilio.data.numeroInt,
        id_colonia: this.#domicilio.data.colonia,
      },
      genero: {
        id_genero: Number(this.#sexo.value),
        descripcion_genero: this.#sexo.options[this.#sexo.selectedIndex].text,
      },
    }

    return {
      asesorado,
      persona,
    }
  }

  set data(value) {
    this.setAttribute('data', value)
  }
  */
}

customElements.define('registro-full-tab', RegistroTab)
