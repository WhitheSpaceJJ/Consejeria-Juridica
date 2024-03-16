const template = document.createElement('template')

class DemandaTabs extends HTMLElement {
  #activeTab
  #tabs = ['registro', 'asesorado', 'promovente', 'demanda', 'detalles']

  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )
//Realizar el cambio de los botones para que se muestren en el componente
/*
 btn-registro
    btn-asesorado
    btn-promovente
    btn-demanda
    btn-detalles

*/


   
 
    this.btnRegistro = this.shadowRoot.getElementById('btn-registro')
   this.btnAsesorado = this.shadowRoot.getElementById('btn-asesorado')
    this.btnPromovente = this.shadowRoot.getElementById('btn-promovente')
    this.btnDemanda = this.shadowRoot.getElementById('btn-demanda')
    this.btnDetalles = this.shadowRoot.getElementById('btn-detalles')

    this.#activeTab = 'registro'

    this.addClickEventListeners()
  }

  connectedCallback() {
    document.addEventListener('next', event => {
      const tabId = event.detail.tabId
      this.handleTabClick(tabId)
    })
  }

  addClickEventListeners() {
    this.btnRegistro.addEventListener('click', () =>
      this.handleTabClick('registro')
    )
    this.btnAsesorado.addEventListener('click', () =>
    this.handleTabClick('asesorado')
  )
    this.btnPromovente.addEventListener('click', () =>  
      this.handleTabClick('promovente')
    )
    this.btnDemanda.addEventListener('click', () =>
      this.handleTabClick('demanda')
    )
    this.btnDetalles.addEventListener('click', () =>
      this.handleTabClick('detalles')
    )
  }

  handleTabClick(tabId) {
    try {
      this.dispatchEventTabChangeEvent(tabId)
      this.showTabSection(tabId)
      this.updateAriaAttributes(tabId)
    } catch (error) {}
  }

  showTabSection(tabId) {
    const tabSections = document.querySelectorAll(
      'registro-full-tab,asesorado-full-tab,promovente-full-tab,demanda-full-tab,detalles-full-tab'
    )

    tabSections.forEach(section => {
      section.style.display = 'none'
    })

    let tabToDisplay
    tabSections.forEach(section => {
      return section.id === tabId && (tabToDisplay = section)
    })
    tabToDisplay.style.display = 'block'
    this.#activeTab = tabId
  }

  verifyChange = tabId => {
   /* if (tabId === this.#activeTab) {
      return 'No se puede cambiar a la misma pestaña'
    }
    if (!this.#tabs.includes(tabId)) return 'La pestaña no existe'

    const asesoradoTab = document.querySelector('asesorado-full-tab')
    const asesoriaTab = document.querySelector('asesoria-tab')

    if (
      tabId === this.#tabs[2] &&
      (!asesoradoTab.isComplete || !asesoriaTab.isComplete)
    ) {
      return 'No se puede cambiar de pestaña si no se han completado los datos'
    }
    */
  }

  dispatchEventTabChangeEvent(tabId) {
    const msg = this.verifyChange(tabId)
    if (msg) throw new Error(msg)

    const indexCurrentTab = this.#tabs.indexOf(this.#activeTab)
    const indexTab = this.#tabs.indexOf(tabId)

    const event = new CustomEvent('tab-change', {
      bubbles: true,
      composed: true,
      detail: { indexCurrentTab, indexTab, tabId },
    })
    this.dispatchEvent(event)
  }

  updateAriaAttributes(activeTab) {
    const tabs = ['btn-registro', 'btn-asesorado', 'btn-promovente' , 'btn-demanda', 'btn-detalles']
    tabs.forEach(tab => {
      const isSelected = tab === `btn-${activeTab}`
      this.shadowRoot
        .getElementById(tab)
        .setAttribute('aria-selected', isSelected)
    })
  }
}

const html = await (await fetch('./components/demanda1/tabs.html')).text()
template.innerHTML = html

customElements.define('demanda-tabs', DemandaTabs)
