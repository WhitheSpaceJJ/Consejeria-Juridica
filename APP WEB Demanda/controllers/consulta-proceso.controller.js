import { ControllerUtils } from '../lib/controllerUtils'
import { DataAsesoria } from '../components/consultaProceso/data-asesoria'
import { DataPrueba } from '../components/consultaProceso/data-prueba'
import { DataImputado } from '../components/consultaProceso/data-imputado'
import { DataPromovente } from '../components/consultaProceso/data-promovente'
import { DataEstadosProcesales } from '../components/consultaProceso/data-estados-procesales'

class ConsultaProcesoController {
  #pagina = 1
  #numeroPaginas
  #busquedaExitosa = false
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
    // this.buttonsEventListeners()
  }
  #defensores

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    //this.getNumeroPaginas()
    // this.handleConsultarDemanda()
    this.consultarProcesos()
    this.agregarDefensores()
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleFiltros();
    });
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const defensor = document.getElementById('defensor')
      const estatus_proceso = document.getElementById('estatus_proceso')
      defensor.disabled = false
      estatus_proceso.disabled = false
      deleteButton.style.display = 'none'
      defensor.value = '0'
      estatus_proceso.value = '0'
      this.consultarProcesos()

    });
  }

  agregarDefensores = async () => {
    const { defensores } = await this.model.getDefensores()
    this.#defensores = defensores
    const defensor_select = document.getElementById('defensor')
    defensor_select.innerHTML = '';

    // Agregar el primer hijo deseado
    const firstOption = document.createElement('option');
    firstOption.value = '0';
    firstOption.text = 'Selecciona un defensor';
    firstOption.disabled = true;
    firstOption.selected = true;
    defensor_select.appendChild(firstOption);

    this.#defensores.forEach(defensor => {
      const option = document.createElement('option');
      option.value = defensor.id_defensor;
      option.text = defensor.nombre_defensor;
      defensor_select.appendChild(option);
    });

  }

  /* 
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
  */
  /**  getNumeroPaginas = async () => {
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
    this.#busquedaExitosa = false
    this.getNumeroPaginas()
    this.handleConsultarDemanda()
  }
 */
  /*
    handleConsultarDemanda = async () => {
      try {
        if (this.#busquedaExitosa === false) {
          const deleteButton = document.getElementById('deleteButton');
          deleteButton.style.display = 'none';
  
          const demandaResponse = await this.model.getTotalDemandas()
  
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
    */
  /*
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
  */
  /*
   handleConsultarDemandaById = async id => {
     try {
       const button = document.querySelector('.consulta-button')
       button.disabled = true
       const demanda = await this.model.getDemandaById(id)
       const turno = demanda.id_turno
       const idAsesoria = await this.model.getTurno(turno)
       const asesoria = await this.model.getAsesoriaById(idAsesoria.turno.id_asesoria)
 
       const modal = document.querySelector('modal-asesoria')
       const dataDemanda = new DataProceso(asesoria)
 
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
 */


  consultarProcesos = async () => {
    try {
      const procesosResponse = await this.model.getProcesosJudiciales()
      if (procesosResponse.length === 0 || procesosResponse === undefined) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'No hay procesos judiciales para mostrar';
        modal.title = 'Error'
        modal.open = true
      } else {
        const table = document.getElementById('table-body')
        table.innerHTML = ''
        procesosResponse.forEach(proceso => {
          table.appendChild(this.crearRow(proceso))
        })
      }

    } catch (error) {
      console.error('Error:', error.message)
      const modal = document.querySelector('modal-warning');
      modal.message = 'No hay procesos judiciales para mostrar';
      modal.title = 'Error'
      modal.open = true
    }
  }

  handleConsultarAsesoriaById = async id => {
    try {
      const button = document.querySelector('.consulta-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      const idTurno = proceso.id_turno
      const turno = await this.model.getTurno(idTurno)
      const asesoria = await this.model.getAsesoriaById(turno.turno.asesoria.datos_asesoria.id_asesoria)

      const modal = document.querySelector('modal-asesoria')
      const dataAsesoria = new DataAsesoria(asesoria)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataAsesoria)

      modal.title = 'Datos Asesoría'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  handleConsultarImputado = async id => {
    try {
      const button = document.querySelector('.consulta2-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso.participantes[1])
      for (var i = 0; i <= ((proceso.participantes).length)-1; i++) {
        if(proceso.participantes[i].imputado!=null) {
          this.modalImputado(proceso.participantes[i])
        }
      }
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  modalImputado = async imputado =>{
    try {
      const button = document.querySelector('.consulta2-button')
      button.disabled = true
      const modal = document.querySelector('modal-imputado')
      const dataImputado = new DataImputado(imputado)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataImputado)

      modal.title = 'Datos Imputado'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  handleConsultarPromovente = async id => {
    try {
      const button = document.querySelector('.consulta3-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log((proceso.participantes).length)
      console.log(proceso.participantes[0].promovente)
      for (var i = 0; i <= ((proceso.participantes).length)-1; i++) {
        if(proceso.participantes[i].promovente!=null) {
          this.modalPromovente(proceso.participantes[i])
        }
      }
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  modalPromovente = async promovente =>{
    try {
      const button = document.querySelector('.consulta3-button')
      button.disabled = true
      console.log(promovente)
      const modal = document.querySelector('modal-promovente')
      const dataPromovente = new DataPromovente(promovente)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataPromovente)

      modal.title = 'Datos Promovente'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  handleConsultarPrueba = async id => {
    try {
      const button = document.querySelector('.consulta4-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso)
      this.modalPrueba(proceso)
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  modalPrueba = async proceso =>{
    try {
      const button = document.querySelector('.consulta4-button')
      const modal = document.querySelector('modal-prueba')
      const dataProceso = new DataPrueba(proceso)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataProceso)

      modal.title = 'Datos'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  
  handleConsultarEstadosProcesales = async id => {
    try {
      const button = document.querySelector('.consulta5-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso)
      this.modalEstadosProcesales(proceso)
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  modalEstadosProcesales = async proceso =>{
    try {
      const button = document.querySelector('.consulta5-button')
      const modal = document.querySelector('modal-estados-procesales')
      const dataProceso = new DataEstadosProcesales(proceso)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataProceso)

      modal.title = 'Estados Procesales'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  handleFiltros = async () => {

    const defensor = document.getElementById('defensor')
    const estatus_proceso = document.getElementById('estatus_proceso')
    const botonEliminar = document.getElementById('deleteButton')


    if (defensor.disabled === false) {


      if (defensor.value === '0') {
        const modal = document.querySelector('modal-warning');
        modal.message = 'Selecciona un defensor';
        modal.title = 'Error'
        modal.open = true
      } else {
        try {
          const table = document.getElementById('table-body')
          if (estatus_proceso.value === '0') {
            await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), null).then(procesosResponse => {
              table.innerHTML = ''

              procesosResponse.forEach(proceso => {
                table.appendChild(this.crearRow(proceso))
              })
              defensor.disabled = true
              estatus_proceso.disabled = true
              botonEliminar.style.display = 'block'


            }).catch(error => {
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            })

          } else if (estatus_proceso.value === '1') {
            await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "EN_TRAMITE")
              .then(procesosResponse => {
                table.innerHTML = ''

                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              })
              .catch(error => {
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales activos para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              })

          } else if (estatus_proceso.value === '2') {
            try {
              const procesosResponse = await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "BAJA")
              if (procesosResponse.length === 0) {
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales en baja para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              } else {
                table.innerHTML = ''

                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              }

            } catch (error) {
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales en baja para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            }
          } else if (estatus_proceso.value === '3') {
            try {
              const procesosResponse = await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "CONCLUIDO")
              if (procesosResponse.length === 0) {
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales concluidos para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              } else {
                table.innerHTML = ''

                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              }

            } catch (error) {
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales concluidos para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            }
          }


        }
        catch (error) {
          console.error('Error:', error.message)
        }
      }
    }
    else {
      const modal = document.querySelector('modal-warning');
      modal.message = 'Ya se realizo una busqueda, para realizar otra, elimina la anterior';
      modal.title = 'Error'
      modal.open = true
    }
    //   }
  }

  crearRow = proceso => {
    const row = document.createElement('tr')
    row.classList.add('bg-white', 'border-b', 'hover:bg-gray-50')
    const nombre_defensor = this.#defensores.find(defensor => defensor.id_defensor === proceso.id_defensor)
    row.innerHTML = `<td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${proceso.id_proceso_judicial}
            </td>
            <td class="px-6 py-4">
                ${proceso.fecha_inicio}
            </td>
            <td class="px-6 py-4">
                ${proceso.control_interno}
            </td>
            <td class="px-6 py-4">
                ${proceso.numero_expediente}
            </td>
            <td class="px-6 py-4">
                ${proceso.fecha_estatus === null ? '' : proceso.fecha_estatus}
            </td>
            <td class="px-6 py-4">
                ${proceso.estatus_proceso}
            </td>
            <td class="px-6 py-4">
                ${nombre_defensor.nombre_defensor}
            </td>

          
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta2-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}">Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta3-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta4-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta5-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            `

    const consultarButton1 = row.querySelectorAll('.consulta-button');
    consultarButton1.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarAsesoriaById(button.getAttribute('data-id'));
      });
    });

    const consultarButton2 = row.querySelectorAll('.consulta2-button');
    consultarButton2.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarImputado(button.getAttribute('data-id'));
      });
    });

    const consultarButton3 = row.querySelectorAll('.consulta3-button');
    consultarButton3.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarPromovente(button.getAttribute('data-id'));
      });
    });

    const consultarButton4 = row.querySelectorAll('.consulta4-button');
    consultarButton4.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarPrueba(button.getAttribute('data-id'));
      });
    });

    const consultarButton5 = row.querySelectorAll('.consulta5-button');
    consultarButton5.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarEstadosProcesales(button.getAttribute('data-id'));
      });
    });

    return row
  }


}
export { ConsultaProcesoController }
