import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'

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
