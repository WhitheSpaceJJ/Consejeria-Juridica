import { ControllerUtils } from '../lib/controllerUtils'
import { DataDemanda } from '../components/demanda/data-demanda'

class ConsultaDemandaController {
  #pagina = 1
  #numeroPaginas
  #busquedaExitosa = false
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
    this.CheckEventListeners()
    this.ComboBoxEventListeners()
    this.buttonsEventListeners()
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    this.getNumeroPaginas()
    this.handleConsultarDemandas()
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFechas();
    });

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.style.display = 'none';
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.deleteFiltros();
    });
    const excel = document.getElementById('filtros-excel');
    excel.style.display = 'none';
    const dropdownbuttonexcell = document.getElementById('dropdown-button-excell');
    dropdownbuttonexcell.addEventListener('click', (event) => {
      event.preventDefault();
      this.filtrosexcel();
    });
    /*
     Botón de descarga del reporte
      const btnDescargarReporte = document.getElementById('btnDescargarReporte');
      btnDescargarReporte.addEventListener('click', (event) => {
        event.preventDefault();
        this.descargarReporte();
      });
      */
    window.handleConsultarDemandasById = this.handleConsultarDemandasById
  }

  buttonsEventListeners = () => {
    const prev = document.getElementById('anterior')
    const next = document.getElementById('siguiente')

    prev.addEventListener('click', this.handlePrevPage)
    next.addEventListener('click', this.handleNextPage)
  }

  handlePrevPage = async () => {
    if (this.#pagina > 1) {
      this.#pagina--
      this.handleConsultarDemanda()
    }
  }

  handleNextPage = async () => {
    if (this.#pagina < this.#numeroPaginas) {
      this.#pagina++
      this.handleConsultarDemanda()
    }
  }

  getNumeroPaginas = async () => {
    const numeroDemanda = await this.model.getTotalDemanda()
    const total = document.getElementById('total')
    total.innerHTML = ' :' + numeroDemanda.totalDemanda
    this.#numeroPaginas = (numeroDemanda.totalDemanda) / 10
  }

  limpiarFiltros = () => {
    const fechaInicio = document.getElementById('fecha-inicio')
    const fechaFinal = document.getElementById('fecha-final')
    fechaInicio.value = ''
    fechaFinal.value = ''
  }

  deleteFiltros = () => {
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.style.display = 'none';
    const table = document.getElementById('table-body')
    table.innerHTML = ''
    this.limpiarFiltros()
    this.#pagina = 1
    this.#busquedaExitosa=false
    this.getNumeroPaginas()
    this.handleConsultarDemanda()
  }

  borrarAsesor = () => {
    const selectAsesor2 = document.getElementById('select-asesor')
    selectAsesor2.innerHTML = ''
    const option3 = document.createElement('option')
    option3.value = 0
    option3.text = "Selecciona una opcion"
    selectAsesor2.appendChild(option3)
  }

  borrarDefensor = () => {
    const selectdefensor2 = document.getElementById('select-defensor')
    const option2 = document.createElement('option')
    selectdefensor2.innerHTML = ''
    option2.value = 0
    option2.text = "Selecciona una opcion"
    selectdefensor2.appendChild(option2)
  }


  handleConsultarDemanda = async () => {
    try {
      if (this.#busquedaExitosa === false) {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.style.display = 'none';

        const demandaResponse = await this.model.getDemandas()
        const demanda = demandaResponse.demanda

        const table = document.getElementById('table-body')
        const rowsTable = document.getElementById('table-body').rows.length
        if (this.validateRows(rowsTable)) {
          demanda.forEach(demanda => {
            table.appendChild(this.crearRow(demanda))
          })
        }
      } else {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.style.display = 'block';

        const fechaInicio = document.getElementById('fecha-inicio')
        const fechaFinal = document.getElementById('fecha-final')

        const filtros = {
          fecha_inicio: fechaInicio.value,
          fecha_final: fechaFinal.value,
        }
        const demandaResponse = await this.model.getDemandaByFilters(filtros)
        const demanda = demandaResponse
        const table = document.getElementById('table-body')
        const rowsTable = document.getElementById('table-body').rows.length
        if (this.validateRows(rowsTable)) {
          demanda.forEach(demanda => {
            table.appendChild(this.crearRow(demanda))
          })
        }
      }

    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  validateRows = rowsTable => {
    if (rowsTable > 0) {
      this.cleanTable(rowsTable);
      return true
    } else { return true }
  }

  cleanTable = rowsTable => {
    const table = document.getElementById('table-body')
    for (let i = rowsTable - 1; i >= 0; i--) {
      table.deleteRow(i)
    }
  }

  handleConsultarDemandaById = async id => {
    try {
      const button = document.querySelector('.consulta-button')
      button.disabled = true
      const demanda = await this.model.getDemandaById(id)
      const participante = demanda.demanda
      const domicilio = await this.model.getColoniaById(
        participante.domicilio.id_colonia
      )
      const modal = document.querySelector('modal-asesoria')
      const dataDemanda = new DataDemanda(asesoria, domicilio)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataDemanda)

      modal.title = 'Datos Asesoría'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }


  handleFiltros = async () => {

    const fechaInicio = document.getElementById('fecha-inicio')
    const fechaFinal = document.getElementById('fecha-final')

  //  const table = document.getElementById('table-body')
  //  table.innerHTML = ''


    //Determinar si fecha inicial y fecha final tienen un rango correcto osea que la fecha final sea mayor a la fecha inicial
    if (fechaInicio.value > fechaFinal.value) {
      const modal = document.querySelector('modal-warning');
      modal.setOnCloseCallback(() => {
        if (modal.open === 'false') {
          this.#pagina = 1
          this.getNumeroPaginas()
          this.handleConsultarDemanda()
        }
      });
      modal.message = 'La Fecha Inicial No Puede Ser Mayor A La Fecha Final';
      modal.open = 'true'
    } else {
      const filtros = {
        fecha_inicio: fechaInicio.value,
        fecha_final: fechaFinal.value,
      }
      try {
        const demandaResponse = await this.model.getDemandaByFilters(filtros)
        const numeroDemanda = await this.model.getTotalDemandafiltro(filtros)
        console.log(numeroDemanda)
        const total = document.getElementById('total')
        total.innerHTML = ' :' + numeroDemanda.totalDemandasFiltro

        if (demandaResponse.length === 0) {
          const deleteButton = document.getElementById('deleteButton');
          deleteButton.style.display = 'none';


          const modal = document.querySelector('modal-warning');

          modal.setOnCloseCallback(() => {
            if (modal.open === 'false') {
              this.#pagina = 1
              this.getNumeroPaginas()
              this.handleConsultarDemandas()
            }
          });

          modal.message = 'No Existen Coincidencias En La Búsqueda';
          modal.open = 'true'

        }
        else {
          const deleteButton = document.getElementById('deleteButton');
          deleteButton.style.display = 'block';
          this.#busquedaExitosa = true
          this.#pagina = 1
          this.#numeroPaginas = (numeroDemanda.totalDemandasFiltro) / 10
          this.handleConsultarDemandas()
        }
      } catch (error) {
        console.error('Error:', error.message)
      }
    }
  }

  crearRow = demanda => {
    const row = document.createElement('tr')
    row.classList.add('bg-white', 'border-b', 'hover:bg-gray-50')

    row.innerHTML = `<td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${demanda.id_proceso_judicial}
            </td>
            <td class="px-6 py-4">
                ${demanda.tipo_demanda}
            </td>
            <td class="px-6 py-4">
                ${demanda.descripcion_demanda}
            </td>
            <td class="px-6 py-4">
                ${demanda.fecha_demanda}
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" onclick="handleConsultarDemandaById(this.value)" value="${demanda.id_proceso_judicial}">Consultar</button>
            </td>`

    return row
  }
}
export { ConsultaDemandaController }
