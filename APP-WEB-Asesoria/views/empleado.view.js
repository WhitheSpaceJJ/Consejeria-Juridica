import '../components/modal-warning/modal-warning.js'
import '../components/navbar/navbar.js'
import '../components/Registros/empleados-tab.js'

class EmpleadoView {
  constructor(controller) {
    this.controller = controller;
    document.addEventListener('DOMContentLoaded', () => {
      this.controller.handleDOMContentLoaded();
      this.initNavbar();
    });
  }
  initNavbar() {
    const navbar = document.querySelector('navbar-comp');
    if (navbar) {
      navbar.permisos = this.controller.model.user.permisos;
    }
  }
}

export { EmpleadoView }