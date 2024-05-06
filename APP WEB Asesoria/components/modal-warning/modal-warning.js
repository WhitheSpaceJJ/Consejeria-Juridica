const template = document.createElement('template')

const html = await (await fetch('../assets/modal-warning.html')).text()
template.innerHTML = html

export class Modal extends HTMLElement {
   
  //Funcion para observar los atributos de la clase modal
  static get observedAttributes() {
    return ['open', 'message', 'title', 'onClose']
  }

  //Metodo para obtener el mensaje
  get message() {
    return this.getAttribute('message')
  }

  //Metodo para asignar el mensaje
  set message(value) {
    this.shadowRoot.getElementById('mensaje-alerta').innerHTML = value
  }

  //Metodo para obtener el atributo open
  get open() {
    return this.getAttribute('open')
  }

  //Metodo para asignar el atributo open
  set open(value) {
    this.setAttribute('open', value)
  }

  //Metodo para obtener el titulo
  get title() {
    return this.getAttribute('title')
  }

  //Metodo para asignar el titulo
  set title(value) {
    this.shadowRoot.getElementById('title-alerta').innerHTML = value
  }

  //Constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this._onCloseCallback = null

    // Se inicializa la función de cierre
    this.onClose = () => {
      const alerta = this.shadowRoot.getElementById('alerta')
      alerta.style.display = 'none'
      this.setAttribute('open', 'false')

      // Si hay una función de cierre configurada, llámala
      if (typeof this._onCloseCallback === 'function') {
        this._onCloseCallback()
      }
    }
  }
 
  //Funcion connectedCallback para conectar el componente
  connectedCallback() {
    //Asignación de los elementos del DOM a las variables
    this.btnCloseAlerta = this.shadowRoot.getElementById('btn-close-alerta')
    this.idAlerta = this.shadowRoot.getElementById('alerta')
    this.btnAceptarAlerta = this.shadowRoot.getElementById('btn-aceptar-alerta')

    //Se asignan los eventos a los botones
    this.btnCloseAlerta.addEventListener('click', this.onClose)
    this.btnAceptarAlerta.addEventListener('click', this.onClose)

    //Se asigna el evento al modal para cerrar al dar click fuera del modal
    this.idAlerta.addEventListener('click', e => {
      if (e.target === this.idAlerta) {
        this.onClose()
      }
    })
  }

  //Funcion para cerrar el modal
  setOnCloseCallback(callback) {
    // Permite configurar la función de cierre desde fuera de la clase
    this._onCloseCallback = callback
  }

  //Funcion para manejar los atributos de la clase
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && newValue === 'true') {
      const alerta = this.shadowRoot.getElementById('alerta')
      alerta.style.display = 'flex'
    }
  }

}

customElements.define('modal-warning', Modal)