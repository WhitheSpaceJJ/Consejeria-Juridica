import { ValidationError } from '../../lib/errors.js'
import { validateNonEmptyFields } from '../../lib/utils.js'
import { APIModel } from '../../models/api.model.js'
//  import '../codigo-postal/codigo-postal.js'

const template = document.createElement('template')

const html = await (
  await fetch('./components/proceso/promovente-tab.html')
).text()
template.innerHTML = html

export class PromoventeTab extends HTMLElement {

  #api
  #nombre
  #apellidoPaterno
  #apellidoMaterno
  #edad
  #sexo
  #telefono

  #españolRadioYes
  #españolRadioNo

  #etnia
  #etnias

  #escolaridad
  #escolaridades

  #ocupacion
  #ocupaciones

  #calle
  #numeroExt
  #numeroInt
  #colonia
  #cp
  #municipio
  #estado
  #ciudad

  #turno

  #promovente
  #promventeDomicilio
  #tipoJuicio

  #busquedaCp
  #generos


  static get observedAttributes() {
    return ['id', 'data']
  }


  async init() {
    this.#api = new APIModel()


    const etnias = await this.#api.getEtnias2()
    this.#etnias = etnias

    const escolaridades = await this.#api.getEscolaridades2()
    this.#escolaridades = escolaridades

    const ocupaciones = await this.#api.getOcupaciones2()
    this.#ocupaciones = ocupaciones

    const { generos } = await this.#api.getGeneros2()
    this.#generos = generos

    this.manageFormFields()
    this.fillInputs()


    var nombreInput = this.#nombre;
    var apellidoPaternoInput = this.#apellidoPaterno;
    var apellidoMaternoInput = this.#apellidoMaterno;
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

        } else if (nombreInput.value.length > 50) {
          // Si el campo tiene más de 50 caracteres, lanzar una excepción
          const modal = document.querySelector('modal-warning')
          modal.message = 'El nombre no puede tener más de 50 caracteres, por favor ingréselo correctamente.'
          modal.title = 'Error de validación'
          modal.open = true
        }
    });

    apellidoPaternoInput.addEventListener('input', function () {
      var apellidoPattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

      if (apellidoPaternoInput.value === '') {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido paterno no puede estar vacío, por favor ingréselo.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (!apellidoPattern.test(apellidoPaternoInput.value)) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido paterno solo permite letras, verifique su respuesta.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (apellidoPaternoInput.value.length > 50) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido paterno no puede tener más de 50 caracteres, por favor ingréselo correctamente.';
        modal.title = 'Error de validación';
        modal.open = true;
      }
    });

    apellidoMaternoInput.addEventListener('input', function () {
      var apellidoPattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

      if (apellidoMaternoInput.value === '') {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido materno no puede estar vacío, por favor ingréselo.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (!apellidoPattern.test(apellidoMaternoInput.value)) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido materno solo permite letras, verifique su respuesta.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (apellidoMaternoInput.value.length > 50) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido materno no puede tener más de 50 caracteres, por favor ingréselo correctamente.';
        modal.title = 'Error de validación';
        modal.open = true;
      }
    });

    var edadInput = this.#edad;

    edadInput.addEventListener('input', function () {
      var edadPattern = /^\d+$/;
      if (!edadPattern.test(edadInput.value)) {
        if (edadInput.value === '') {
          const modal = document.querySelector('modal-warning');
          modal.message = 'La edad no puede estar vacía, por favor ingresela.';
          modal.title = 'Error de validación';
          modal.open = true;
        } else {
          const modal = document.querySelector('modal-warning');
          modal.message = 'La edad solo permite números, verifique su respuesta.';
          modal.title = 'Error de validación';
          modal.open = true;
        }
      } else if (edadInput.value > 200) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'La edad no puede ser mayor a 200 años, por favor ingresela verifique su respuesta.';
        modal.title = 'Error de validación';
        modal.open = true;
      }
    });


  }
  manageFormFields() {



    this.#nombre = this.shadowRoot.getElementById('nombre')
    this.#apellidoPaterno = this.shadowRoot.getElementById('apellido-paterno')
    this.#apellidoMaterno = this.shadowRoot.getElementById('apellido-materno')
    this.#edad = this.shadowRoot.getElementById('edad')
    this.#sexo = this.shadowRoot.getElementById('sexo')
    this.#telefono = this.shadowRoot.getElementById('telefono')
    this.#españolRadioYes = this.shadowRoot.getElementById('español-radio-yes')
    this.#españolRadioNo = this.shadowRoot.getElementById('español-radio-no')
    this.#etnia = this.shadowRoot.getElementById('etnia')
    this.#escolaridad = this.shadowRoot.getElementById('escolaridad')
    this.#ocupacion = this.shadowRoot.getElementById('ocupacion')
    this.#calle = this.shadowRoot.getElementById('calle')
    this.#numeroExt = this.shadowRoot.getElementById('numero-ext')
    this.#numeroInt = this.shadowRoot.getElementById('numero-int')
    this.#colonia = this.shadowRoot.getElementById('colonia')
    this.#cp = this.shadowRoot.getElementById('codigo-postal')
    this.#municipio = this.shadowRoot.getElementById('municipio')
    this.#estado = this.shadowRoot.getElementById('estado')
    this.#ciudad = this.shadowRoot.getElementById('ciudad')
    this.#españolRadioYes = this.shadowRoot.getElementById('español-radio-yes')
    this.#españolRadioNo = this.shadowRoot.getElementById('español-radio-no')

    const yes = this.#españolRadioYes
    yes.checked = true
    /*
    this.#españolRadioNo.addEventListener('click', () => {
      this.#etnia.value = '0'
      this.#etnia.disabled = true
    })

    this.#españolRadioYes.addEventListener('click', () => {
      this.#etnia.disabled = false
    })
*/

    var nombreInput = this.#nombre;
    var apellidoPaternoInput = this.#apellidoPaterno;
    var apellidoMaternoInput = this.#apellidoMaterno;
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

        } else if (nombreInput.value.length > 50) {
          // Si el campo tiene más de 50 caracteres, lanzar una excepción
          const modal = document.querySelector('modal-warning')
          modal.message = 'El nombre no puede tener más de 50 caracteres, por favor ingréselo correctamente.'
          modal.title = 'Error de validación'
          modal.open = true
        }
    });

    apellidoPaternoInput.addEventListener('input', function () {
      var apellidoPattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

      if (apellidoPaternoInput.value === '') {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido paterno no puede estar vacío, por favor ingréselo.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (!apellidoPattern.test(apellidoPaternoInput.value)) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido paterno solo permite letras, verifique su respuesta.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (apellidoPaternoInput.value.length > 50) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido paterno no puede tener más de 50 caracteres, por favor ingréselo correctamente.';
        modal.title = 'Error de validación';
        modal.open = true;

      }
    });

    apellidoMaternoInput.addEventListener('input', function () {
      var apellidoPattern = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;

      if (apellidoMaternoInput.value === '') {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido materno no puede estar vacío, por favor ingréselo.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (!apellidoPattern.test(apellidoMaternoInput.value)) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido materno solo permite letras, verifique su respuesta.';
        modal.title = 'Error de validación';
        modal.open = true;
      } else if (apellidoMaternoInput.value.length > 50) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El apellido materno no puede tener más de 50 caracteres, por favor ingréselo correctamente.';
        modal.title = 'Error de validación';
        modal.open = true;
      }
    }
    );

    var edadInput = this.#edad;

    edadInput.addEventListener('input', function () {
      var edadPattern = /^\d+$/;
      if (!edadPattern.test(edadInput.value)) {
        if (edadInput.value === '') {
          const modal = document.querySelector('modal-warning');
          modal.message = 'La edad no puede estar vacía, por favor ingresela.';
          modal.title = 'Error de validación';
          modal.open = true;
        } else {
          const modal = document.querySelector('modal-warning');
          modal.message = 'La edad solo permite números, verifique su respuesta.';
          modal.title = 'Error de validación';
          modal.open = true;
        }
      } else if (edadInput.value > 200) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'La edad no puede ser mayor a 200 años, por favor ingresela verifique su respuesta.';
        modal.title = 'Error de validación';
        modal.open = true;
      }
    });

    var telefonoInput = this.#telefono;

    telefonoInput.addEventListener('input', function () {
      var telefonoPattern = /^\d+$/;
      if (!telefonoPattern.test(telefonoInput.value)) {
        if (telefonoInput.value === '') {
          const modal = document.querySelector('modal-warning');
          modal.message = 'El teléfono no puede estar vacío, por favor ingréselo.';
          modal.title = 'Error de validación';
          modal.open = true;
        } else {
          const modal = document.querySelector('modal-warning');
          modal.message = 'El teléfono solo permite números, verifique su respuesta.';
          modal.title = 'Error de validación';
          modal.open = true;
        }
      } else if (telefonoInput.value.length > 10) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'El teléfono no puede tener más de 10 caracteres, por favor ingréselo correctamente.';
        modal.title = 'Error de validación';
        modal.open = true;
      }
    });

  }

  fillInputs() {
    this.#etnia.innerHTML = ''

    const option = document.createElement('option')
    option.value = '0'
    option.text = 'Seleccione una etnia'
    this.#etnia.appendChild(option)

    this.#etnias.forEach(etnia => {
      const option = document.createElement('option')
      option.value = etnia.id_etnia
      option.text = etnia.nombre
      this.#etnia.appendChild(option)
    })

    this.#sexo.innerHTML = ''

    const option2 = document.createElement('option')
    option2.value = '0'
    option2.text = 'Seleccione un género'
    this.#sexo.appendChild(option2)

    this.#generos.forEach(genero => {
      const option = document.createElement('option')
      option.value = genero.id_genero
      option.text = genero.descripcion_genero
      this.#sexo.appendChild(option)
    })

    this.#escolaridad.innerHTML = ''

    const option3 = document.createElement('option')
    option3.value = '0'
    option3.text = 'Seleccione una escolaridad'
    this.#escolaridad.appendChild(option3)

    this.#escolaridades.forEach(escolaridad => {
      const option = document.createElement('option')
      option.value = escolaridad.id_escolaridad
      option.text = escolaridad.descripcion
      this.#escolaridad.appendChild(option)
    })

    this.#ocupacion.innerHTML = ''
    const option4 = document.createElement('option')
    option4.value = '0'
    option4.text = 'Seleccione una ocupación'
    this.#ocupacion.appendChild(option4)
    this.#ocupaciones.forEach(ocupacion => {
      const option = document.createElement('option')
      option.value = ocupacion.id_ocupacion
      option.text = ocupacion.descripcion_ocupacion
      this.#ocupacion.appendChild(option)
    })



    this.#turno = this.registroTab.data
    const { turno } = this.#turno;
    this.#promovente = turno.asesoria.persona
    this.#promventeDomicilio = turno.asesoria.persona.domicilio
    this.#tipoJuicio = turno.asesoria.tipos_juicio

    this.#nombre.value = this.#promovente.nombre
    this.#apellidoPaterno.value = this.#promovente.apellido_paterno
    this.#apellidoMaterno.value = this.#promovente.apellido_materno
    this.#edad.value = this.#promovente.edad
    this.#telefono.value = this.#promovente.telefono
    this.#sexo.value = this.#promovente.genero.id_genero


    this.#calle.value = this.#promventeDomicilio.calle_domicilio
    this.#numeroExt.value = this.#promventeDomicilio.numero_exterior_domicilio
    this.#numeroInt.value = this.#promventeDomicilio.numero_interior_domicilio

    this.#api.getColoniaById(this.#promventeDomicilio.id_colonia)
      .then(data => {
        const { colonia } = data
        this.#cp.value = colonia.codigo_postal.codigo_postal
        this.#municipio.value = colonia.municipio.nombre_municipio
        this.#estado.value = colonia.estado.nombre_estado
        this.#ciudad.value = colonia.ciudad.nombre_ciudad
        this.#api.getDomicilioByCP(colonia.codigo_postal.codigo_postal)
          .then(data2 => {
            const { colonias } = data2
            this.#colonia.innerHTML = ''
            colonias.colonias.forEach(colonia => {
              const option = document.createElement('option')
              option.value = colonia.id_colonia
              option.text = colonia.nombre_colonia
              this.#colonia.appendChild(option)
            })
            this.#colonia.value = this.#promventeDomicilio.id_colonia
          })
          .catch(error => {
            console.error('Error al obtener datos de la API:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
  }


  validateInputs() {
    try {
      if (this.registroTab.isComplete === false) {
        this.#showModal('No se ha seleccionado un turno, por favor seleccione uno.', 'Error de validación')
        return false
      }

      const nombre = this.#nombre.value
      const apellidoPaterno = this.#apellidoPaterno.value
      const apellidoMaterno = this.#apellidoMaterno.value
      const edad = this.#edad.value
      const sexo = this.#sexo.value
      const telefono = this.#telefono.value
      const calle = this.#calle.value
      const numeroExt = this.#numeroExt.value
      const numeroInt = this.#numeroInt.value
      const colonia = this.#colonia.value
      var nombresApellidos = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s']+$/;
      var edadPattern = /^\d+$/;


      if (nombre === '') {
        throw new ValidationError('El nombre no puede estar vacío, por favor ingréselo.')
      } else if (nombre.length > 50) {
        throw new ValidationError('El nombre no puede tener más de 50 caracteres, por favor ingréselo correctamente.')
      } else if (!nombresApellidos.test(nombre)) {
        throw new ValidationError('El nombre solo permite letras, verifique su respuesta.')
      }

      if (apellidoPaterno === '') {
        throw new ValidationError('El apellido paterno no puede estar vacío, por favor ingréselo.')
      }
      else if (apellidoPaterno.length > 50) {
        throw new ValidationError('El apellido paterno no puede tener más de 50 caracteres, por favor ingréselo correctamente.')
      } else if (!nombresApellidos.test(apellidoPaterno)) {
        throw new ValidationError('El apellido paterno solo permite letras, verifique su respuesta.')
      }

      if (apellidoMaterno === '') {
        throw new ValidationError('El apellido materno no puede estar vacío, por favor ingréselo.')

      } else if (apellidoMaterno.length > 50) {
        throw new ValidationError('El apellido materno no puede tener más de 50 caracteres, por favor ingréselo correctamente.')
      }
      else if (!nombresApellidos.test(apellidoMaterno)) {
        throw new ValidationError('El apellido materno solo permite letras, verifique su respuesta.')
      }

      if (edad === '') {
        throw new ValidationError('La edad no puede estar vacía, por favor ingresela.')
      }
      else if (!edadPattern.test(edad)) {
        throw new ValidationError('La edad solo permite números, verifique su respuesta.')
      } else if (edad > 200) {
        throw new ValidationError('La edad no puede ser mayor a 200 años, por favor ingresela verifique su respuesta.')
      }

      if (telefono === '') {
        throw new ValidationError('El teléfono no puede estar vacío, por favor ingréselo.')
      }
      else if (telefono.length > 10) {
        throw new ValidationError('El teléfono no puede tener más de 10 caracteres, por favor ingréselo correctamente.')
      }
      else if (!edadPattern.test(telefono)) {
        throw new ValidationError('El teléfono solo permite números, verifique su respuesta.')
      }

      var etnia = this.#etnia.value
      var escolaridad = this.#escolaridad.value
      var ocupacion = this.#ocupacion.value
      var espapñolRadioYes = this.#españolRadioYes.checked
      var espapñolRadioNo = this.#españolRadioNo.checked

      if (espapñolRadioNo === false && espapñolRadioYes === false) {
        throw new ValidationError('Por favor seleccione si habla español o no.')
      }

      if (etnia === '0') {
        throw new ValidationError('Por favor seleccione una etnia.')
      }
      if (escolaridad === '0') {
        throw new ValidationError('Por favor seleccione una escolaridad.')
      }
      if (ocupacion === '0') {
        throw new ValidationError('Por favor seleccione una ocupación.')
      }

      if (calle === '') {
        throw new ValidationError('La calle no puede estar vacía, por favor ingrésela.')
      }
      else if (calle.length > 100) {
        throw new ValidationError('La calle no puede tener más de 100 caracteres, por favor ingrésela correctamente.')
      }

      if (numeroExt === '') {
        throw new ValidationError('El número exterior no puede estar vacío, por favor ingréselo.')
      }
      else if (numeroExt.length > 10) {
        throw new ValidationError('El número exterior no puede tener más de 10 caracteres, por favor ingréselo correctamente.')
      }
      else if (!edadPattern.test(numeroExt)) {
        throw new ValidationError('El número exterior solo permite números, verifique su respuesta.')
      }

      if (numeroInt !== '') {
        if (numeroInt.length > 10) {
          throw new ValidationError('El número interior no puede tener más de 10 caracteres, por favor ingréselo correctamente.')
        }
        else if (!edadPattern.test(numeroInt)) {
          throw new ValidationError('El número interior solo permite números, verifique su respuesta.')
        }
      }

      if (colonia === '0') {
        throw new ValidationError('Por favor busque una colonia y selecciónela, por favor.')
      }


      return true
    } catch (error) {
      if (error instanceof ValidationError) {
        this.#showModal(error.message, 'Error de validación')
      } else {
        console.error(error)
        this.#showModal(
          'Error al validar datos , persona, domicilio, por favor intenta de nuevo',
          'Error'
        )
      }
      return false
    }
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.id = 'promovente'
    this.style.display = 'none'
    this.registroTab = document.querySelector('registro-full-tab')
    this.formCP = this.shadowRoot.getElementById('buscar-cp')

    this.formCP.addEventListener('click', (event) => {
      event.preventDefault();
      if (
        !this.#cp.value ||
        this.#cp.value.length !== 5 ||
        isNaN(this.#cp.value)
      ) {
        this.#showModal('El código postal debe tener 5 dígitos', 'Advertencia')
        return
      }
      this.searchCP()
    })
  }
  async searchCP() {
    try {
      const { colonias: data } = await this.#api.getDomicilioByCP(
        this.#cp.value
      )
      if (!data || typeof data === 'string') {
        this.#showModal('No se encontró el código postal', 'Advertencia')
        return
      }
      this.#estado.innerHTML = '';
      this.#estado.value = data.estado.nombre_estado
      this.#municipio.innerHTML = '';
      this.#municipio.value = data.municipio.nombre_municipio
      this.#ciudad.innerHTML = '';
      this.#ciudad.value = data.ciudad.nombre_ciudad
      this.#colonia.innerHTML = '';

      const option = document.createElement('option')
      option.value = '0'
      option.text = 'Seleccione una colonia'
      this.#colonia.appendChild(option)

      data.colonias.forEach(colonia => {
        const option = document.createElement('option')
        option.value = colonia.id_colonia
        option.textContent = colonia.nombre_colonia
        this.#colonia.appendChild(option)
      })
    } catch (error) {
      console.error(error)
      this.#showModal('Error al buscar el código postal', 'Error')
    }
  }

  connectedCallback() {
    this.btnNext = this.shadowRoot.getElementById('btn-promovente-next')

    this.btnNext.addEventListener('click', () => {
      if (!this.validateInputs()) return
      const event = new CustomEvent('next', {
        bubbles: true,
        composed: true,
        detail: { tabId: 'imputado' },
      })
      this.dispatchEvent(event)
    })
    document.addEventListener('tab-change', event => {
      const tabId = event.detail.tabId
      if (tabId !== 'promovente') {
        return
      }
      if (this.registroTab.isComplete === true) {
        if (this.#turnoSeleccionado === null) {
          this.#turnoSeleccionado = this.registroTab.turno
          this.init()
        }
        if (this.#turnoSeleccionado !== null && this.#turnoSeleccionado.id_turno !== this.registroTab.turno.id_turno) {
          this.#turnoSeleccionado = this.registroTab.turno
          this.resetCampos()
          this.init()
        }
      }

    })

  }

  #turnoSeleccionado = null

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
    const promovente = {
      nombre: this.#nombre.value,
      apellido_paterno: this.#apellidoPaterno.value,
      apellido_materno: this.#apellidoMaterno.value,
      edad: this.#edad.value,
      telefono: this.#telefono.value,
      id_genero: this.#sexo.value,
      id_etnia: this.#etnia.value,
      id_escolaridad: this.#escolaridad.value,
      id_ocupacion: this.#ocupacion.value,
      español: this.#españolRadioYes.checked,
      sexo: this.#sexo.options[this.#sexo.selectedIndex].text,
      etnia: this.#etnia.options[this.#etnia.selectedIndex].text,
      escolaridad: this.#escolaridad.options[this.#escolaridad.selectedIndex].text,
      ocupacion: this.#ocupacion.options[this.#ocupacion.selectedIndex].text,
      domicilio: {
        calle_domicilio: this.#calle.value,
        numero_exterior_domicilio: this.#numeroExt.value,
        numero_interior_domicilio: this.#numeroInt.value,
        id_colonia: this.#colonia.value,
        cp: this.#cp.value,
        estado: this.#estado.value,
        municipio: this.#municipio.value,
        ciudad: this.#ciudad.value,
        colonia: this.#colonia.options[this.#colonia.selectedIndex].text,
      },
    }
    return {
      promovente
    }
  }
  resetCampos() {
    this.#nombre.value = ''
    this.#apellidoPaterno.value = ''
    this.#apellidoMaterno.value = ''
    this.#edad.value = ''
    this.#telefono.value = ''
    this.#sexo.value = ''
    this.#etnia.value = ''
    this.#escolaridad.value = ''
    this.#ocupacion.value = ''
    this.#calle.value = ''
    this.#numeroExt.value = ''
    this.#numeroInt.value = ''
    this.#colonia.innerHTML = ''
    const option = document.createElement('option')
    option.value = '0'
    option.text = 'Seleccione una colonia'
    this.#colonia.appendChild(option)


    this.#cp.value = ''
    this.#municipio.value = ''
    this.#estado.value = ''
    this.#ciudad.value = ''
    this.#españolRadioYes.checked = true
    this.#españolRadioNo.checked = false
  }
  set data(value) {
    this.setAttribute('data', value)
  }
}

customElements.define('promovente-full-tab', PromoventeTab)
