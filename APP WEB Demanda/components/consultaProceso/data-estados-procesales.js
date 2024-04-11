const template = document.createElement('template')

const html = await (await fetch('../assets/data-estados-procesales.html')).text()
template.innerHTML = html

export class DataEstadosProcesales extends HTMLElement {
  constructor(procesoRecibido) {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.proceso = procesoRecibido
    this.fillData(this.proceso)
  }

  connectedCallback() {
  }

  fillData = async () => {
    this.shadowRoot.getElementById('estados-procesales').textContent = this.proceso.estados_procesales.map((estado, index) =>
            `${index + 1}. Estado Procesal: ${estado.descripcion_estado_procesal} , Fecha: ${estado.fecha_estado_procesal}`).join(', ')
  }
}

customElements.define('data-estados-procesales', DataEstadosProcesales)