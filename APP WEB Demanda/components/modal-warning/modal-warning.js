const template = document.createElement('template')

const html = await (await fetch('../assets/modal-warning.html')).text()
template.innerHTML = html

export class Modal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'message', 'title', 'onClose']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    this._onCloseCallback = null

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

  connectedCallback() {

/**
 <div
      class="flex items-center justify-center p-2 space-x-2 border-t border-gray-200 rounded-b hidden" id="botones-auxiliares"
    >
      <button
        type="button"
        id="btn-aceptar"
        class="px-6 text-center hidden py-2 rounded-md bg-[#a52a2a] text-white hover:bg-[#db2424] font-semibold transition duration-200"
      >
        Aceptar
      </button>
      <button
      type="button"
      id="btn-cancelar"
      class="px-6 text-center py-2  hidden rounded-md bg-[#a52a2a] text-white hover:bg-[#db2424] font-semibold transition duration-200"
    >
      Cancelar
    </button>
    </div>
 */

  // this.btnCancelar = this.shadowRoot.getElementById('btn-cancelar')  
 //   this.btnAceptar = this.shadowRoot.getElementById('btn-aceptar')

    this.btnCloseAlerta = this.shadowRoot.getElementById('btn-close-alerta')
    this.idAlerta = this.shadowRoot.getElementById('alerta')
    this.btnAceptarAlerta = this.shadowRoot.getElementById('btn-aceptar-alerta')

    this.btnCloseAlerta.addEventListener('click',  () => {
      this.#variableAxuliar = false
      this.onClose()
    })

    this.btnAceptarAlerta.addEventListener('click',  () => {
      this.#variableAxuliar = true
      this.onClose()
    })

    this.idAlerta.addEventListener('click', e => {
      if (e.target === this.idAlerta) {
        this.#variableAxuliar = false
        this.onClose()
      }
    })
/*
    this.btnCancelar.addEventListener('click', () => {
        this.#variableAxuliar = false
        this.onClose()
    } )

    this.btnAceptar.addEventListener('click', () => {
        this.#variableAxuliar = true
        this.onClose()
    })
    */

  }
  
  #variableAxuliar = false

  setOnCloseCallback(callback) {
    // Permite configurar la función de cierre desde fuera de la clase
    this._onCloseCallback = callback
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && newValue === 'true') {
      const alerta = this.shadowRoot.getElementById('alerta')
      alerta.style.display = 'flex'
    }
  }

  get message() {
    return this.getAttribute('message')
  }

  set message(value) {
    this.shadowRoot.getElementById('mensaje-alerta').innerHTML = value
  }

  get open() {
    return this.getAttribute('open')
  }

  set open(value) {
    this.setAttribute('open', value)
  }

  /*
  get activar(){
     this.btnCancelar.classList.remove('hidden')
     this.btnAceptar.classList.remove('hidden')
     return true;
  } 
  get desactivar(){ 
    this.btnCancelar.classList.add('hidden')
    this.btnAceptar.classList.add('hidden')
    return true;
  }
  */
  
  get respuesta(){  
    return this.#variableAxuliar
  }

 

  get title() {
    return this.getAttribute('title')
  }

  set title(value) {
    this.shadowRoot.getElementById('title-alerta').innerHTML = value
  }
}

customElements.define('modal-warning', Modal)
