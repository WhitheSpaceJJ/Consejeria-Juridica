import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/asesoria-pre/tabs-header.js'
import '../components/asesoria-pre/asesoria-tab.js'
import '../components/asesoria-pre/asesorado-tab.js'
import '../components/asesoria-pre/detalles-tab.js'

class AsesoriaPreView {
  constructor(controller) {
    this.controller = controller
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { AsesoriaPreView }
