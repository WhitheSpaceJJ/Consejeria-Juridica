import { ControllerUtils } from '../lib/controllerUtils.js'

class   EstadoCivilController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
  }
  }
  
  export {  EstadoCivilController }
  