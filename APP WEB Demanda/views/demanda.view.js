import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/demanda1/tabs-header.js'
import '../components/demanda1/registro-tab.js'
import '../components/demanda1/asesorado-tab.js'
import '../components/demanda1/promovente-tab.js'
import '../components/demanda1/demanda-tab.js'
import '../components/demanda1/detalles-tab.js'

class DemandaView {
  constructor(controller) {
    this.controller = controller
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { DemandaView }
