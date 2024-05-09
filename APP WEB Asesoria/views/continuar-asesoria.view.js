import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/asesoria-continuacion/tabs-header.js'
import '../components/asesoria-continuacion/asesoria-tab.js'
import '../components/asesoria-continuacion/asesorado-tab.js'
import '../components/asesoria-continuacion/detalles-tab.js'

class AsesoriaContinuacionView {
  constructor(controller) {
    this.controller = controller
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { AsesoriaContinuacionView }
