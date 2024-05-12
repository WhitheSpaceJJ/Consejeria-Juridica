import { ControllerUtils } from '../lib/controllerUtils';

class AsesoriaContinuarController {
  constructor(model) {
    this.model = model;
    this.utils = new ControllerUtils(model.user);
    //document.addEventListener("DOMContentLoaded", this.handleDOMContentLoaded);
  }

  handleDOMContentLoaded = () => {
    this.utils.validatePermissions({});
  }

}

export { AsesoriaContinuarController }