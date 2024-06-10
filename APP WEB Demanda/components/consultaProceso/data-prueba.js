 
export class DataPrueba extends HTMLElement {


  //Constructor de la clase
  constructor(procesoRecibido) {
    super()
    this.init2()
    this.proceso = procesoRecibido
    this.fillData(this.proceso)
  }
  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('../assets/data-prueba.html')).text();
    template.innerHTML = html;
    return template;
  }
  async init2() {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
  }
  connectedCallback() {
  }

  //Metodo para llenar los datos de las pruebas
  fillData = async () => {
    this.shadowRoot.getElementById('pruebas').textContent = this.proceso.pruebas.map((prueba, index) => `${index + 1}. Prueba: ${prueba.descripcion_prueba}`).join(', ')
    this.shadowRoot.getElementById('resoluciones').textContent = this.proceso.resoluciones.map((resolucion, index) => `${index + 1}. Resolucion: ${resolucion.resolucion}
    Fecha: ${resolucion.fecha_resolucion}`).join(', ')
    this.shadowRoot.getElementById('observaciones').textContent = this.proceso.observaciones.map((observacion, index) => `${index + 1}. Observacion: ${observacion.observacion}`).join(', ')

  }
}

customElements.define('data-prueba', DataPrueba)