const template = document.createElement('template')

const html = await (await fetch('../assets/data-demandado.html')).text()
template.innerHTML = html

export class DataDemandado extends HTMLElement {
  //Constructor de la clase
  constructor(demandado) {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.demandado = demandado
    this.fillData(this.demandado)
  }

  connectedCallback() {
  }
 
  //Metodo para llenar los datos del demandado
  fillData = async () => {

    //demandado
    this.shadowRoot.getElementById('nombre-demandado').textContent = this.demandado.nombre
    this.shadowRoot.getElementById('apellido-paterno-demandado').textContent = this.demandado.apellido_paterno
    this.shadowRoot.getElementById('apellido-materno-demandado').textContent = this.demandado.apellido_materno
    this.shadowRoot.getElementById('telefono').textContent = this.demandado.telefono
    this.shadowRoot.getElementById('edad').textContent = this.demandado.edad
    this.shadowRoot.getElementById('calle-domicilio').textContent = this.demandado.domicilio.calle_domicilio
    this.shadowRoot.getElementById('numero-domicilio').textContent = this.demandado.domicilio.numero_exterior_domicilio 
}
}

customElements.define('data-demandado', DataDemandado)