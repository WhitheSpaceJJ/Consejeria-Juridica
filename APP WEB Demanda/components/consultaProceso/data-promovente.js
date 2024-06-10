import '../registroProceso/familiar.js'
 
export class DataPromovente extends HTMLElement {
  //Variables de la clase
  #familiares

  //Constructor de la clase
  constructor(promovente) {
    super()
    this.promovente = promovente
    this.init2(promovente)

  }
  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('../assets/data-promovente.html')).text();
    template.innerHTML = html;
    return template;
  }
  async init2(promovente) {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
    this.fillData(promovente)
  }
  connectedCallback() {
  }

  //Metodo para llenar los datos del promovente
  fillData = async (promovente) => {

    //Promovente
    this.shadowRoot.getElementById('nombre').textContent = promovente.nombre
    this.shadowRoot.getElementById('apellido-paterno').textContent = promovente.apellido_paterno
    this.shadowRoot.getElementById('apellido-materno').textContent = promovente.apellido_materno
    this.shadowRoot.getElementById('telefono').textContent = promovente.telefono
    if(promovente.promovente.español){
      this.shadowRoot.getElementById('espanol').textContent = "Si"
    }
    else{
      this.shadowRoot.getElementById('espanol').textContent = "No"
    }

    if(promovente.promovente.escolaridad){
      this.shadowRoot.getElementById('escolaridad').textContent = promovente.promovente.escolaridad.descripcion
    }
    else{
      this.shadowRoot.getElementById('escolaridad').textContent = promovente.promovente.escolaridad.estatus_general
    }

    if(promovente.promovente.etnia){
      this.shadowRoot.getElementById('etnia').textContent = promovente.promovente.etnia.nombre
    }
    else{
      this.shadowRoot.getElementById('etnia').textContent = "No"
    }

    if(promovente.promovente.ocupacion){
      this.shadowRoot.getElementById('ocupacion').textContent = promovente.promovente.ocupacion.descripcion_ocupacion
    }
    else{
      this.shadowRoot.getElementById('ocupacion').textContent = "Ninguna"
    }

    //Familiar
    this.shadowRoot.getElementById('familiares').textContent = promovente.promovente.familiares.map((familiar, index) => `${index + 1}. Nombre: ${familiar.nombre} , Nacionalidad: ${familiar.nacionalidad}
    , Parentesco: ${familiar.parentesco} , Pertenece a la comunidad LGBT: ${familiar.perteneceComunidadLGBT===true?'Si':'No'} , Adulto Mayor: ${familiar.adultaMayor===true? 'Si': 'No'} , Salud Precaria: ${familiar.saludPrecaria===true?'Si': 'No'} , Pobreza Extrema: ${familiar.pobrezaExtrema ===true?'Si': 'No'}`).join(', ')
  }
}

customElements.define('data-promovente', DataPromovente)