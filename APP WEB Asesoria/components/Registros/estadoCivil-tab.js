const template = document.createElement('template');

class EstadoTab  extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.loadHTMLContent().then(htmlContent => {
      shadow.innerHTML = htmlContent;
    });
  }

  async loadHTMLContent() {
    const response = await fetch('./components/Registros/estadoCivil-tab.html');
    if (!response.ok) {
      throw new Error(`Failed to load HTML content: ${response.statusText}`);
    }
    return await response.text();
  }
}

customElements.define('estadocivil-tab', EstadoTab);
