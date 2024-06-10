 
export class DataEstadosProcesales extends HTMLElement {

  //Constructor de la clase
  constructor(procesoRecibido) {
    super()
    this.proceso = procesoRecibido
    this.init2(procesoRecibido)

  }
  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('../assets/data-estados-procesales.html')).text();
    template.innerHTML = html;
    return template;
  }
  async init2(procesoRecibido) {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
    this.fillData(procesoRecibido)
  }
  connectedCallback() {
  }

  //Metodo para llenar los datos de los estados procesales
  fillData = async (procesoRecibido) => {
    this.shadowRoot.getElementById('estados-procesales').textContent = procesoRecibido.estados_procesales.map((estado, index) =>
            `${index + 1}. Estado Procesal: ${estado.descripcion_estado_procesal} , Fecha: ${estado.fecha_estado_procesal}`).join(', ')
  }
}

customElements.define('data-estados-procesales', DataEstadosProcesales)