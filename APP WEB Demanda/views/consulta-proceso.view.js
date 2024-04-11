import '../components/consultaProceso/modal-asesoria.js'
import '../components/consultaProceso/modal-prueba.js'
import '../components/consultaProceso/modal-imputado.js'
import '../components/consultaProceso/modal-promovente.js'
import '../components/consultaProceso/modal-estados-procesales.js'
import '../components/consultaProceso/data-prueba.js'
import '../components/consultaProceso/data-asesoria.js'
import '../components/consultaProceso/data-imputado.js'
import '../components/consultaProceso/data-promovente.js'
import '../components/consultaProceso/data-estados-procesales.js'
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
