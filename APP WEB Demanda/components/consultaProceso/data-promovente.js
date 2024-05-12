import '../registroProceso/familiar.js'
const template = document.createElement('template')

const html = await (await fetch('../assets/data-promovente.html')).text()
template.innerHTML = html

export class DataPromovente extends HTMLElement {
  #familiares
  constructor(promovente) {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))
    this.promovente = promovente
    this.fillData(this.promovente)
  }

  connectedCallback() {
  }

  fillData = async () => {

    //Promovente
    this.shadowRoot.getElementById('nombre').textContent = this.promovente.nombre
    this.shadowRoot.getElementById('apellido-paterno').textContent = this.promovente.apellido_paterno
    this.shadowRoot.getElementById('apellido-materno').textContent = this.promovente.apellido_materno
    this.shadowRoot.getElementById('telefono').textContent = this.promovente.telefono
    if(this.promovente.promovente.español){
      this.shadowRoot.getElementById('espanol').textContent = "Si"
    }
    else{
      this.shadowRoot.getElementById('espanol').textContent = "No"
    }

    if(this.promovente.promovente.escolaridad){
      this.shadowRoot.getElementById('escolaridad').textContent = this.promovente.promovente.escolaridad.descripcion
    }
    else{
      this.shadowRoot.getElementById('escolaridad').textContent = this.promovente.promovente.escolaridad.estatus_general
    }

    if(this.promovente.promovente.etnia){
      this.shadowRoot.getElementById('etnia').textContent = this.promovente.promovente.etnia.nombre
    }
    else{
      this.shadowRoot.getElementById('etnia').textContent = "No"
    }

    if(this.promovente.promovente.ocupacion){
      this.shadowRoot.getElementById('ocupacion').textContent = this.promovente.promovente.ocupacion.descripcion_ocupacion
    }
    else{
      this.shadowRoot.getElementById('ocupacion').textContent = "Ninguna"
    }

    //Familiar
    this.shadowRoot.getElementById('familiares').textContent = this.promovente.promovente.familiares.map((familiar, index) => `${index + 1}. Nombre: ${familiar.nombre} , Nacionalidad: ${familiar.nacionalidad}
    , Parentesco: ${familiar.parentesco} , Pertenece a la comunidad LGBT: ${familiar.perteneceComunidadLGBT===true?'Si':'No'} , Adulto Mayor: ${familiar.adultaMayor===true? 'Si': 'No'} , Salud Precaria: ${familiar.saludPrecaria===true?'Si': 'No'} , Pobreza Extrema: ${familiar.pobrezaExtrema ===true?'Si': 'No'}`).join(', ')
  }
}

customElements.define('data-promovente', DataPromovente)