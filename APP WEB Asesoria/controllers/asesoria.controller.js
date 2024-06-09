import { ControllerUtils } from '../lib/controllerUtils.js';

class AsesoriaController {
  constructor(model) {
    this.model = model;
    this.utils = new ControllerUtils(model.user);
    //document.addEventListener("DOMContentLoaded", this.handleDOMContentLoaded);
  }

  handleDOMContentLoaded = () => {
    this.utils.validatePermissions({});
  }

}

export { AsesoriaController }
