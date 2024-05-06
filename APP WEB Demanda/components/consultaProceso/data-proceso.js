const template = document.createElement('template')

const html = await (await fetch('../assets/data-asesoria.html')).text()
template.innerHTML = html

export class DataDemanda extends HTMLElement {

  //Constructor de la clase
  constructor(asesoria) {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    //Asignacion de la asesoria
    this.asesoria = asesoria
    //Rellenar los datos de la asesoria
    this.fillData(this.asesoria)
  }

  //Callback que se ejecuta cuando el componente es agregado al DOM
  connectedCallback() {
  }

  //Metodo que rellena los datos de la asesoria 
  fillData = async () => {
    const datosAsesoria = this.asesoria.asesoria.datos_asesoria
    const recibidos = this.asesoria.asesoria.recibidos

    
    //Aqui se verifica que si la asesoria tiene un empleado asignado y que tipo de empleado es
    if (this.asesoria.asesoria.empleado) {
      const empleado = this.asesoria.asesoria.empleado
      //Verificacion de si el empleado es asesor o defensor
      //se procede a rellenar los datos del empleado
      if (empleado.hasOwnProperty('nombre_asesor')) {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del asesor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = empleado.nombre_asesor;

      } else {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del defensor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = empleado.nombre_defensor;
      }
    } 
    //Caso contrario se verifica si la asesoria tiene un asesor o defensor asignado
    //y se procede a rellenar los datos del asesor o defensor
    else {
      if (this.asesoria.asesoria.asesor) {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del asesor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = this.asesoria.asesoria.asesor.nombre_asesor;
      } else {
        this.shadowRoot.getElementById('nombre-asesor-defensor').textContent = "Nombre del defensor:"
        this.shadowRoot.getElementById('nombre-asesor').textContent = this.asesoria.asesoria.defensor.nombre_defensor;
      }
    }
//Se rellenan los datos de la asesoria
    this.shadowRoot.getElementById('tipo-juicio').textContent = this.asesoria.asesoria.tipos_juicio.tipo_juicio

    this.shadowRoot.getElementById('resumen').textContent = datosAsesoria.resumen_asesoria
    this.shadowRoot.getElementById('conclusion').textContent = datosAsesoria.conclusion_asesoria
    //Se rellenan los datos de los catalogos recibidos
    recibidos.forEach(item => {
      const element = document.createElement('p')
      element.textContent = item.descripcion_catalogo
      this.shadowRoot.getElementById('asesorado-recibio').appendChild(element)
    })

    //Se rellena el estatus de los requisitos si este es verdadero se muestra si cumple
    if (datosAsesoria.estatus_requisitos) this.shadowRoot.getElementById('cumple-requisitos').textContent = 'Si'
    else this.shadowRoot.getElementById('cumple-requisitos').textContent = 'No'
  }
}

customElements.define('data-demanda', DataDemanda)