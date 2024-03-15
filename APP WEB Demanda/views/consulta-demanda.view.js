import '../components/demanda/modal-asesoria.js'
import '../components/demanda/data-demanda.js'
import '../components/navbar/navbar.js'
import '../components/modal-warning/modal-warning.js'

class ConsultaDemandaView {
  constructor(controller) {
    this.controller = controller
    this.filtrosForm = document.getElementById('filtros-form')

    this.filtrosForm.addEventListener('submit', e => {
      e.preventDefault()
      this.controller.handleFiltros()
    })

    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { ConsultaDemandaView }
