const template = document.createElement('template');

class EtniaTab  extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.loadHTMLContent().then(htmlContent => {
      shadow.innerHTML = htmlContent;
    });
  }

  async loadHTMLContent() {
    const response = await fetch('./components/Registros/etnia-tab.html'); 
    if (!response.ok) { 
      throw new Error(`Failed to load HTML content: ${response.statusText}`);
    }
    return await response.text();
  }
}

customElements.define('etnia-tab', EtniaTab);
