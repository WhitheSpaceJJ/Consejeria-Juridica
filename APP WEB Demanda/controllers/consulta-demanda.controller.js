import { ControllerUtils } from '../lib/controllerUtils'
import { DataDemanda } from '../components/demanda/data-demanda'

class ConsultaDemandaController {
  #pagina = 1
  #numeroPaginas
  #busquedaExitosa = false
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
    this.buttonsEventListeners()
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    //this.getNumeroPaginas()
    this.handleConsultarDemanda()
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleFechas();
    });
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

 /**  getNumeroPaginas = async () => {
    const numeroDemanda = await this.model.getTotalDemanda()
    const total = document.getElementById('total')
    total.innerHTML = ' :' + numeroDemanda.totalDemanda
    this.#numeroPaginas = (numeroDemanda.totalDemanda) / 10
  } */

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

  handleConsultarDemanda = async () => {
    try {
      if (this.#busquedaExitosa === false) {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.style.display = 'none';

        const demandaResponse = await this.model.getTotalDemandas()
        console.log(demandaResponse)
        const demanda = demandaResponse

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
      const turno = demanda.id_turno
      const idAsesoria = await this.model.getTurno(turno)
      const asesoria = await this.model.getAsesoriaById(idAsesoria.turno.id_asesoria)

      const modal = document.querySelector('modal-asesoria')
      const dataDemanda = new DataDemanda(asesoria)

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
                ${demanda.fecha_inicio}
            </td>
            <td class="px-6 py-4">
                ${demanda.fecha_proceso}
            </td>
            <td class="px-6 py-4">
                ${demanda.fecha_conclusion}
            </td>
            <td class="px-6 py-4">
                ${demanda.area_seguimiento}
            </td>
            <td class="px-6 py-4">
                ${demanda.numero_expediente}
            </td>
            <td class="px-6 py-4">
                ${demanda.id_turno}
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" data-id="${demanda.id_proceso_judicial}">Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta2-button font-medium text-[#db2424] hover:underline" value="${demanda.id_proceso_judicial}">Consultar Datos</button>
            </td>`

            const consultarButtons = row.querySelectorAll('.consulta-button');
            consultarButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.handleConsultarDemandaById(button.getAttribute('data-id'));
                });
            });

    return row
  }


}
export { ConsultaDemandaController }
