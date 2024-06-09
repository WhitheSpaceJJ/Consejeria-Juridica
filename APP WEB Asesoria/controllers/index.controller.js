import { ControllerUtils } from '../lib/controllerUtils.js'

class IndexController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
   // console.log(model.user)
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
  }
}

export { IndexController }
