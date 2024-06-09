class Navbar extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  async init() {
    const templateContent = await this.fetchTemplate();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.content.cloneNode(true));
    this.campos();
  }

  async fetchTemplate() {
    const template = document.createElement('template');
    const html = await (await fetch('./assets/navbar.html')).text();
    template.innerHTML = html;
    return template;
  }

  campos() {
    // Selecciona los elementos dentro del Shadow DOM
    const shadowRoot = this.shadowRoot;

    const dropdownServicioLink = shadowRoot.getElementById('dropdownServicioLink');
    const dropdownNavbarServicio = shadowRoot.getElementById('dropdownNavbarServicio');
    const dropdownConsultaLink = shadowRoot.getElementById('dropdownConsultaLink');
    const dropdownNavbarConsulta = shadowRoot.getElementById('dropdownNavbarConsulta');
    const dropdownRegistrosLink = shadowRoot.getElementById('dropdownRegistrosLink');
    const dropdownNavbarRegistros = shadowRoot.getElementById('dropdownNavbarRegistros');
    const mobileMenuToggle = shadowRoot.getElementById('mobile-menu-toggle');
    const navbarDropdown = shadowRoot.getElementById('navbar-dropdown');

    // Función para mostrar u ocultar un menú desplegable
    const toggleDropdown = (dropdown, event) => {
      event.stopPropagation();
      dropdown.classList.toggle('hidden');
    };

    // Función para mostrar u ocultar el menú
    const toggleMobileMenu = event => {
      event.stopPropagation();
      navbarDropdown.classList.toggle('hidden');
    };

    // Agregar evento de clic para mostrar/ocultar el menú en dispositivos móviles
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Agregar eventos de clic para mostrar/ocultar el menú desplegable de "Servicio"
    dropdownServicioLink.addEventListener('click', event => {
      toggleDropdown(dropdownNavbarServicio, event);
      dropdownNavbarConsulta.classList.add('hidden');
      dropdownNavbarRegistros.classList.add('hidden');
    });

    // Agregar eventos de clic para mostrar/ocultar el menú desplegable de "Consulta"
    dropdownConsultaLink.addEventListener('click', event => {
      toggleDropdown(dropdownNavbarConsulta, event);
      dropdownNavbarServicio.classList.add('hidden');
      dropdownNavbarRegistros.classList.add('hidden');
    });

    // Agregar eventos de clic para mostrar/ocultar el menú desplegable de "Registros"
    dropdownRegistrosLink.addEventListener('click', event => {
      toggleDropdown(dropdownNavbarRegistros, event);
      dropdownNavbarServicio.classList.add('hidden');
      dropdownNavbarConsulta.classList.add('hidden');
    });

    // Cierra los menús desplegables si se hace clic en cualquier parte del documento
    document.addEventListener('click', event => {
      if (!shadowRoot.contains(event.target)) {
        dropdownNavbarServicio.classList.add('hidden');
        dropdownNavbarConsulta.classList.add('hidden');
        dropdownNavbarRegistros.classList.add('hidden');
        navbarDropdown.classList.add('hidden');
      }
    });

    shadowRoot.getElementById('btn-logout').addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = '../login.html';
    });
  }
}

customElements.define('navbar-comp', Navbar);
