import { ControllerUtils } from '../lib/controllerUtils.js'

class UsuarioController {
  #acceptablePermissions = ['ALL_SA', 'AD_USUARIOS_SA']
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    const permiso= this.utils.validatePermissions({})
    if (permiso) {
       const userPermissions = this.model.user.permisos; 
       const acceptablePermissions = this.#acceptablePermissions; 
       const hasPermission = (userPermissions, acceptablePermissions) => {
         return userPermissions.some(permission => acceptablePermissions.includes(permission));
       };
       if (!hasPermission(userPermissions, acceptablePermissions)) {
         window.location.href = 'login.html';
       }
    }
  }
}

export { UsuarioController }
