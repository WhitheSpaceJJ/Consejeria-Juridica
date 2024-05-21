import { APIModel } from '../../models/api.model'
import { DataAsesoria } from './data-asesoria'
const template = document.createElement('template')

const html = await (
  await fetch('./components/asesoria/detalles-tab.html')
).text()
template.innerHTML = html

export class DetallesTab extends HTMLElement {
  //Variable privada que almacena la informacion de la asesoria
  //Variable que almacena la instancia de la clase APIModel,en la cual se realizan las peticiones a la API
  #api
  //Variable que almacena la informacion de la asesoria
  #asesoria

  // Se crea el constructor de la clase
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    //ID del componente con respecto a la pestaña de detalles y se oculta
    this.id = 'detalles'
    this.style.display = 'none'

    //Se obtienen los componentes de asesorado y asesoria
    this.asesoradoTab = document.querySelector('asesorado-full-tab')
    this.asesoriaTab = document.querySelector('asesoria-tab')
  }



  //Metodo que se encarga de inicializar el componente
  async init() {
    //Se crea una instancia de la clase APIModel
    this.#api = new APIModel()
    //Se obtiene el elemento del DOM que representa la seccion de datos
    const $section = this.shadowRoot.getElementById('data')

    //Se obtiene la informacion de la asesoria

    //La informacion que se obtiene de los tabs tiene un formato especifico  que la API del sistema 
    //espera, por lo que cambios que se le hagan a la informacion o la data, se deben de realizar en la API
    this.#asesoria = {
      ...this.asesoradoTab.data,
      ...this.asesoriaTab.data,
    }

    //Se obtiene la colonia por medio del id de la colonia esto con el fin de obtener la informacion de la colonia estado, municipio, ciudad y codigo postal
    // const domicilio = await this.#api.getColoniaById(
    //    this.#asesoria.persona.domicilio.id_colonia
    //  )
    
    if (this.#asesoria.persona.domicilio.id_colonia !== '') {
      const domicilio = await this.#api.getColoniaById(
        this.#asesoria.persona.domicilio.id_colonia
      )
      //Se crea una instancia de la clase DataAsesoria y se le pasa la informacion de la asesoria y el domicilio y asi poder rellenar el html con la informacion
      const dataAsesoria = new DataAsesoria(
        { asesoria: this.#asesoria },
        domicilio
      )

      //Se limpia la seccion de datos y se agrega la informacion de la asesoria
      $section.innerHTML = ''

      //Se agrega la informacion de la asesoria a la seccion de datos
      $section.appendChild(dataAsesoria)

      this.#asesoria.datos_asesoria = {
        ...this.#asesoria.datos_asesoria,
        id_empleado: this.#asesoria.empleado.id_empleado,
      }
    } else {

      //Se crea una instancia de la clase DataAsesoria y se le pasa la informacion de la asesoria y el domicilio y asi poder rellenar el html con la informacion
      const dataAsesoria = new DataAsesoria(
        { asesoria: this.#asesoria },
        {}
      )

      //Se limpia la seccion de datos y se agrega la informacion de la asesoria
      $section.innerHTML = ''

      //Se agrega la informacion de la asesoria a la seccion de datos
      $section.appendChild(dataAsesoria)

      this.#asesoria.datos_asesoria = {
        ...this.#asesoria.datos_asesoria,
        id_empleado: this.#asesoria.empleado.id_empleado,
      }
    }
  }

  //Metodo que se ejecuta cuando el componente es agregado al DOM
  connectedCallback() {
    this.btnCrearAsesoria = this.shadowRoot.getElementById('btn-crear-asesoria')

    //Se agrega el evento de click al boton de crear asesoria
    this.btnCrearAsesoria.addEventListener('click', async () => {
      try {
        //Creacion de la asesoria por medio de la API
        console.log(this.#asesoria)
        /* await this.#api.postAsesoria(this.#asesoria)
         this.#showModal(
           'La asesoría se ha creado correctamente',
           'Asesoría creada',
           () => {
             location.href = '/'
           }
         )
         */
      } catch (error) {
        console.error(error)
        this.#showModal(
          'Ocurrió un error al crear la asesoría, verifique los datos o el servidor',
          'Error al crear asesoría'
        )
      }
    })
    //Evento que se dispara cuando se cambia de pestaña
    document.addEventListener('tab-change', event => {
      const tabId = event.detail.tabId
      if (tabId !== 'detalles') {
        return
      }
      this.init()
    })
  }

  //Metodo que se encarga de mostrar un modal con un mensaje y un titulo de error
  #showModal(message, title, onCloseCallback) {
    const modal = document.querySelector('modal-warning')
    modal.message = message
    modal.title = title
    modal.open = true
    modal.setOnCloseCallback(onCloseCallback)
  }
}

customElements.define('detalles-tab', DetallesTab)
