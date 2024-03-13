import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/Registros/etnia-tab.js'

class EtniaView {
  constructor(controller) {
    this.controller = controller
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded()
    )
  }
}

export { EtniaView }
