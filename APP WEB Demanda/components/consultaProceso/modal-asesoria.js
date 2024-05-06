const template = document.createElement('template')

const html = await (await fetch('../assets/modal-asesoria.html')).text()
template.innerHTML = html

export class ModalAsesoria extends HTMLElement {

  //Metodo encargado de definir los atributos que se observaran
  static get observedAttributes() {
    return ['open', 'title', 'onClose']
  }

  //Metodo que se obtiene el valor del atributo open
  get open() {
    return this.getAttribute('open')
  }

  //Metodo que establece el valor del atributo open
  set open(value) {
    this.setAttribute('open', value)
  }

  //Metodo que obtiene el valor del atributo title
  get title() {
    return this.getAttribute('title')
  }

  //Metodo que establece el valor del atributo title
  set title(value) {
    this.shadowRoot.getElementById('title-alerta').innerHTML = value
  }

  //Constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.onClose = () => {
      const modal = this.shadowRoot.getElementById('modal')
      modal.style.display = 'none'
      this.setAttribute('open', 'false')
      const onCloseEvent = new CustomEvent('onClose')
      this.dispatchEvent(onCloseEvent)

      // También puedes llamar a la función de cierre proporcionada desde fuera de la clase, si está configurada
      if (typeof this._onCloseCallback === 'function') {
        this._onCloseCallback()
      }
    }
  }

  //Callback que se ejecuta cuando el componente es agregado al DOM
  connectedCallback() {
    // Se obtienen los elementos del DOM que se van a utilizar en este caso los botones de cerrar y aceptar
    this.btnClose = this.shadowRoot.getElementById('btn-close')
    this.modal = this.shadowRoot.getElementById('modal')
    this.btnAceptar = this.shadowRoot.getElementById('btn-aceptar')

    // Se añaden los eventos a los botones
    this.btnClose.addEventListener('click', this.onClose)
    this.btnAceptar.addEventListener('click', this.onClose)

    // Se añade el evento para cerrar el modal al hacer click fuera de él
    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) {
        this.onClose()
      }
    })
  }

  //Metodo que se ejecuta cuando se elimina el componente del DOM
  setOnCloseCallback(callback) {
    // Permite configurar la función de cierre desde fuera de la clase
    this._onCloseCallback = callback
  }

  //Metodo que se encarga de observar los cambios en los atributos del componente
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && newValue === 'true') {
      const alerta = this.shadowRoot.getElementById('modal')
      alerta.style.display = 'flex'
    }
  }

  
}

customElements.define('modal-asesoria', ModalAsesoria)
