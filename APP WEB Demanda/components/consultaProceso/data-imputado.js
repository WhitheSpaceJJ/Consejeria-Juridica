const template = document.createElement('template')

const html = await (await fetch('../assets/data-imputado.html')).text()
template.innerHTML = html

export class DataImputado extends HTMLElement {
  constructor(imputado) {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.imputado = imputado
    this.fillData(this.imputado)
  }

  connectedCallback() {
  }

  fillData = async () => {

    //Imputado
    this.shadowRoot.getElementById('nombre-imputado').textContent = this.imputado.nombre
    this.shadowRoot.getElementById('apellido-paterno-imputado').textContent = this.imputado.apellido_paterno
    this.shadowRoot.getElementById('apellido-materno-imputado').textContent = this.imputado.apellido_materno
    this.shadowRoot.getElementById('telefono').textContent = this.imputado.telefono
    this.shadowRoot.getElementById('edad').textContent = this.imputado.edad
    this.shadowRoot.getElementById('calle-domicilio').textContent = this.imputado.domicilio.calle_domicilio
    this.shadowRoot.getElementById('numero-domicilio').textContent = this.imputado.domicilio.numero_exterior_domicilio 
}
}

customElements.define('data-imputado', DataImputado)