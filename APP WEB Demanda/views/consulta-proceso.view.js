import '../components/consultaProceso/modal-asesoria.js'
import '../components/consultaProceso/data-proceso.js'
import '../components/navbar/navbar.js'
import '../components/modal-warning/modal-warning.js'

class ConsultaProcesoView {
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

export { ConsultaProcesoView }
