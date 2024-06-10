 
export class DataAsesoria extends HTMLElement {

  //Contructor de la clase
  constructor(asesoria) {
     super()
    this.init2()

    this.asesoria = asesoria
    this.fillData(this.asesoria)
  }
  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('../assets/data-asesoria.html')).text();
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

  //Metodo para llenar los datos de la asesoria
  fillData = async () => {
    const datosAsesoria = this.asesoria.asesoria.datos_asesoria
    const recibidos = this.asesoria.asesoria.recibidos

    
    if (this.asesoria.asesoria.empleado) {
      const empleado = this.asesoria.asesoria.empleado
      if (empleado.hasOwnProperty('nombre_asesor')) {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del asesor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = empleado.nombre_asesor;

      } else {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del defensor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = empleado.nombre_defensor;
      }
    } else {
      if (this.asesoria.asesoria.asesor) {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del asesor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = this.asesoria.asesoria.asesor.nombre_asesor;
      } else {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del defensor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = this.asesoria.asesoria.defensor.nombre_defensor;
      }
    }

    this.shadowRoot.getElementById('tipo-juicio').textContent = this.asesoria.asesoria.tipos_juicio.tipo_juicio

    this.shadowRoot.getElementById('resumen').textContent = datosAsesoria.resumen_asesoria
    this.shadowRoot.getElementById('conclusion').textContent = datosAsesoria.conclusion_asesoria
    recibidos.forEach(item => {
      const element = document.createElement('p')
      element.textContent = item.descripcion_catalogo
      this.shadowRoot.getElementById('asesorado-recibio').appendChild(element)
    })

    if (datosAsesoria.estatus_requisitos) this.shadowRoot.getElementById('cumple-requisitos').textContent = 'Si'
    else this.shadowRoot.getElementById('cumple-requisitos').textContent = 'No'
  }
}

customElements.define('data-asesoria', DataAsesoria)