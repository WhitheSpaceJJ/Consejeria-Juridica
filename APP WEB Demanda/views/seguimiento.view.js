import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/demanda2/tabs-header.js'
import '../components/demanda2/registro-tab.js'
import '../components/demanda2/asesorado-tab.js'
import '../components/demanda2/promovente-tab.js'
import '../components/demanda2/demanda-tab.js'
import '../components/demanda2/detalles-tab.js'

class SeguimientoView {
  constructor(controller) {
    this.controller = controller
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { SeguimientoView }
