const template = document.createElement('template')

class ProcesoTabs extends HTMLElement {
  #activeTab
  #tabs = ['registro', 'promovente','imputado',  'proceso', 'detalles']

  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )
 
    this.btnRegistro = this.shadowRoot.getElementById('btn-registro')
    this.btnPromovente = this.shadowRoot.getElementById('btn-promovente')
   this.btnImputado = this.shadowRoot.getElementById('btn-imputado')
    this.btnProceso = this.shadowRoot.getElementById('btn-proceso')
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
   
    this.btnPromovente.addEventListener('click', () =>  
      this.handleTabClick('promovente')
    )
    this.btnImputado.addEventListener('click', () =>
    this.handleTabClick('imputado')
  )
    this.btnProceso.addEventListener('click', () =>
      this.handleTabClick('proceso')
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
      'registro-full-tab,promovente-full-tab,imputado-full-tab,proceso-full-tab,detalles-full-tab'
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
   if (tabId === this.#activeTab) {
      return 'No se puede cambiar a la misma pestaña'
    }
    if (!this.#tabs.includes(tabId)) return 'La pestaña no existe'
    
    const registroTab = document.querySelector('registro-full-tab')
    const promoventeTab = document.querySelector('promovente-full-tab')
    const imputadoTab = document.querySelector('imputado-full-tab')
    const procesoTab = document.querySelector('proceso-full-tab')
       
    if (
      tabId === this.#tabs[1] &&
      (!registroTab.isComplete)
    ) {
      return 'No se puede cambiar de pestaña si no se han completado los datos'
    }
    if (
      tabId === this.#tabs[2] &&
      (!promoventeTab.isComplete || !registroTab.isComplete)
    ) {
      return 'No se puede cambiar de pestaña si no se han completado los datos'
    }
    if (
      tabId === this.#tabs[3] &&
      (!promoventeTab.isComplete || !imputadoTab.isComplete || !registroTab.isComplete)
    ) {
      return 'No se puede cambiar de pestaña si no se han completado los datos'
    }
    if (tabId === this.#tabs[3] || tabId === this.#tabs[2] || tabId === this.#tabs[1] || tabId === this.#tabs[0] ) {
      this.btnDetalles.classList.add('hidden')
    }

    else if (tabId === this.#tabs[4]) {
      this.btnDetalles.classList.remove('hidden')
    }


    if (
      tabId === this.#tabs[4] &&
      (!procesoTab.isComplete || !promoventeTab.isComplete || !imputadoTab.isComplete || !registroTab.isComplete)
    ) {
      return 'No se puede cambiar de pestaña si no se han completado los datos'
    }
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
    const tabs = ['btn-registro',  'btn-promovente' ,'btn-imputado', 'btn-proceso', 'btn-detalles']
    tabs.forEach(tab => {
      const isSelected = tab === `btn-${activeTab}`
      this.shadowRoot
        .getElementById(tab)
        .setAttribute('aria-selected', isSelected)
    })
  }
}

const html = await (await fetch('./components/proceso/tabs.html')).text()
template.innerHTML = html

customElements.define('proceso-tabs', ProcesoTabs)
