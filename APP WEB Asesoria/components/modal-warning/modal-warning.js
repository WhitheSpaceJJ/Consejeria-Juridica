export class Modal extends HTMLElement {

  // Función para observar los atributos de la clase modal
  static get observedAttributes() {
    return ['open', 'message', 'title']
  }

  // Método para obtener el mensaje
  get message() {
    return this.getAttribute('message')
  }

  // Método para asignar el mensaje
  set message(value) {
    this.shadowRoot.getElementById('mensaje-alerta').innerHTML = value
  }

  // Método para obtener el atributo open
  get open() {
    return this.getAttribute('open') === 'true'
  }

  // Método para asignar el atributo open
  set open(value) {
    this.setAttribute('open', value ? 'true' : 'false')
  }

  // Método para obtener el título
  get title() {
    return this.getAttribute('title')
  }

  // Método para asignar el título
  set title(value) {
    this.shadowRoot.getElementById('title-alerta').innerHTML = value
  }

  // Constructor de la clase
  constructor() {
    super()
    this.init()
  }

  // Método para inicializar el componente
  async init() {
    const templateContent = await this.fetchTemplate()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(templateContent.content.cloneNode(true))
    this.campos()
  }

  // Método para obtener la plantilla
  async fetchTemplate() {
    const template = document.createElement('template')
    const html = await (await fetch('../assets/modal-warning.html')).text()
    template.innerHTML = html
    return template
  }

  // Método para asignar los campos del componente
  campos() {
    const shadowRoot = this.shadowRoot

    // Asignación de los elementos del DOM a las variables
    this.btnCloseAlerta = shadowRoot.getElementById('btn-close-alerta')
    this.idAlerta = shadowRoot.getElementById('alerta')
    this.btnAceptarAlerta = shadowRoot.getElementById('btn-aceptar-alerta')

    // Se asignan los eventos a los botones
    this.btnCloseAlerta.addEventListener('click', () => this.onClose())
    this.btnAceptarAlerta.addEventListener('click', () => this.onClose())

    // Se asigna el evento al modal para cerrar al dar click fuera del modal
    this.idAlerta.addEventListener('click', e => {
      if (e.target === this.idAlerta) {
        this.onClose()
      }
    })

    this._onCloseCallback = null
  }

  // Función para cerrar el modal
  onClose() {
    const alerta = this.shadowRoot.getElementById('alerta')
    alerta.style.display = 'none'
    this.open = false

    // Si hay una función de cierre configurada, llámala
    if (typeof this._onCloseCallback === 'function') {
      this._onCloseCallback()
    }
  }

  // Función para configurar la función de cierre desde fuera de la clase
  setOnCloseCallback(callback) {
    this._onCloseCallback = callback
  }

  // Función para manejar los atributos de la clase
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      const alerta = this.shadowRoot.getElementById('alerta')
      if (newValue === 'true') {
        alerta.style.display = 'flex'
      } else {
        alerta.style.display = 'none'
      }
    } else if (name === 'message') {
      this.message = newValue
    } else if (name === 'title') {
      this.title = newValue
    }
  }
}

customElements.define('modal-warning', Modal)
